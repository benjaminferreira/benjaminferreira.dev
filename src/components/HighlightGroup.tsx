"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Entry = { el: Element; activate: () => void; getDuration: () => number };
type Line = { left: number; top: number; width: number; height: number; dur: number; delay: number };

const SequenceContext = createContext<((entry: Entry) => () => void) | null>(null);

/** Draws its marks one at a time, top to bottom, as each scrolls into view. */
export function HighlightGroup({ gap = 120, children }: { gap?: number; children: React.ReactNode }) {
	const reduce = useReducedMotion();
	const entriesRef = useRef<Entry[]>([]); // marks, top to bottom
	const seenRef = useRef<Set<Element>>(new Set()); // marks that have scrolled in
	const pointerRef = useRef(0); // whose turn is next
	const runningRef = useRef(false); // a stroke is mid-draw
	const observerRef = useRef<IntersectionObserver | null>(null);

	const drawNext = useCallback(() => {
		const entries = entriesRef.current;

		// reduced motion: reveal all, no sequence
		if (reduce) {
			entries.forEach((e) => e.activate());
			pointerRef.current = entries.length;
			return;
		}
		if (runningRef.current) return; // one at a time

		const next = entries[pointerRef.current];
		if (!next || !seenRef.current.has(next.el)) return; // wait until it's in view

		runningRef.current = true;
		next.activate();
		// move on once this stroke has had time to finish
		window.setTimeout(() => {
			pointerRef.current += 1;
			runningRef.current = false;
			drawNext();
		}, next.getDuration() + gap);
	}, [gap, reduce]);

	useEffect(() => {
		// note marks as they enter view, then try to draw
		const io = new IntersectionObserver(
			(records) => {
				for (const r of records) {
					if (r.isIntersecting) seenRef.current.add(r.target);
				}
				drawNext();
			},
			{ rootMargin: "0px 0px -25% 0px" },
		);
		observerRef.current = io;
		entriesRef.current.forEach((e) => io.observe(e.el));
		return () => io.disconnect();
	}, [drawNext]);

	const register = useCallback((entry: Entry) => {
		entriesRef.current.push(entry);
		// keep the list top to bottom so the pen moves downward
		entriesRef.current.sort((a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top);
		observerRef.current?.observe(entry.el);
		return () => {
			entriesRef.current = entriesRef.current.filter((e) => e !== entry);
			observerRef.current?.unobserve(entry.el);
			seenRef.current.delete(entry.el);
		};
	}, []);

	return <SequenceContext.Provider value={register}>{children}</SequenceContext.Provider>;
}

/** Enrolls an element in its HighlightGroup; returns a ref and whether it is its turn. */
export function useHighlight<T extends Element>(getDuration: () => number) {
	const register = useContext(SequenceContext);
	const ref = useRef<T>(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (!register || !ref.current) return; // no group: hover/focus only
		return register({ el: ref.current, activate: () => setActive(true), getDuration });
	}, [register, getDuration]);

	return { ref, active };
}

/** Text with a highlighter sweep; single line uses the CSS utility, wrapped text draws line by line. */
export function HighlightText({
	children,
	color,
	speed = 600,
	className = "",
}: {
	children: React.ReactNode;
	color?: string;
	speed?: number;
	className?: string;
}) {
	const reduce = useReducedMotion();
	const textRef = useRef<HTMLSpanElement>(null);
	const overlayRef = useRef<HTMLSpanElement>(null);
	const [lines, setLines] = useState<Line[]>([]);
	const [total, setTotal] = useState(300);
	const [hovered, setHovered] = useState(false);
	const [resizing, setResizing] = useState(false);
	const durationRef = useRef(300);
	const getDuration = useCallback(() => durationRef.current, []);
	const { ref, active } = useHighlight<HTMLSpanElement>(getDuration);

	// measure one band per visual line so wrapped text draws line by line at a constant speed
	useEffect(() => {
		const text = textRef.current;
		const overlay = overlayRef.current;
		if (!text || !overlay) return;
		const measure = () => {
			const origin = overlay.getBoundingClientRect();
			const fs = parseFloat(getComputedStyle(text).fontSize);
			const thickness = parseFloat(getComputedStyle(document.documentElement).fontSize) * 0.75;
			const bottom = fs * 0.16;
			const over = fs * 0.1;
			const range = document.createRange();
			range.selectNodeContents(text);
			// getClientRects gives a rect per run, so merge them into one box per line
			const rows: { top: number; bottom: number; left: number; right: number }[] = [];
			for (const r of Array.from(range.getClientRects())) {
				if (r.width === 0) continue;
				const row = rows.find((x) => Math.abs(x.top - r.top) < r.height * 0.5);
				if (row) {
					row.left = Math.min(row.left, r.left);
					row.right = Math.max(row.right, r.right);
					row.bottom = Math.max(row.bottom, r.bottom);
				} else {
					rows.push({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
				}
			}
			let delay = 0;
			const next = rows.map((row) => {
				const width = row.right - row.left + over * 2;
				const dur = Math.max(120, Math.round((width / speed) * 1000));
				const line = {
					left: row.left - origin.left - over,
					top: row.bottom - origin.top - bottom - thickness,
					width,
					height: thickness,
					dur,
					delay,
				};
				delay += dur + 40; // small lift between lines
				return line;
			});
			setLines(next);
			durationRef.current = Math.max(120, delay);
			setTotal(durationRef.current);
		};
		measure();
		let first = true;
		let settle: number | undefined;
		const ro = new ResizeObserver(() => {
			if (first) {
				first = false;
				return; // ignore the initial observe callback
			}
			setResizing(true); // hide while the layout is in flux
			clearTimeout(settle);
			settle = window.setTimeout(() => {
				measure();
				setResizing(false);
			}, 200);
		});
		ro.observe(overlay);
		return () => {
			clearTimeout(settle);
			ro.disconnect();
		};
	}, [speed]);

	const multiLine = lines.length > 1;
	const drawn = active || hovered;

	return (
		<span
			ref={ref}
			data-hl={(!multiLine && active) || undefined}
			onMouseEnter={multiLine ? () => setHovered(true) : undefined}
			onMouseLeave={multiLine ? () => setHovered(false) : undefined}
			style={
				multiLine
					? undefined
					: ({ "--hl-draw": `${total}ms`, ...(color ? { "--hl": color } : {}) } as React.CSSProperties)
			}
			className={multiLine ? `relative ${className}` : `highlight ${className}`}
		>
			<span ref={textRef}>{children}</span>
			<span
				ref={overlayRef}
				aria-hidden
				className="pointer-events-none absolute inset-0"
			>
				{multiLine &&
					lines.map((ln, i) => (
						<span
							key={i}
							style={{
								position: "absolute",
								left: ln.left,
								top: ln.top,
								width: ln.width,
								height: ln.height,
								backgroundColor: color ?? "var(--color-mild-yellow)",
								mixBlendMode: "multiply",
								transformOrigin: "left",
								transform: drawn ? "scaleX(1)" : "scaleX(0)",
								opacity: resizing ? 0 : drawn ? 1 : 0,
								transition: resizing
									? "none"
									: reduce
										? "none"
										: drawn
											? `opacity 0ms, transform ${ln.dur}ms linear ${ln.delay}ms`
											: "opacity 250ms linear, transform 0ms linear 250ms",
							}}
						/>
					))}
			</span>
		</span>
	);
}

/** Box with the shade edge strokes, drawn at the same speed as the text. Assumes 1px box border. */
export function HighlightBox({
	children,
	color,
	speed = 600,
	gap = 50,
	className = "",
}: {
	children: React.ReactNode;
	color?: string;
	speed?: number;
	gap?: number;
	className?: string;
}) {
	const [draw, setDraw] = useState({ x: 200, y: 200 });
	const durationRef = useRef(450);
	const getDuration = useCallback(() => durationRef.current, []);
	const { ref, active } = useHighlight<HTMLDivElement>(getDuration);

	// each edge draws in length/speed, so bigger boxes take longer
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const measure = () => {
			const r = el.getBoundingClientRect();
			const x = Math.max(100, Math.round((r.width / speed) * 1000));
			const y = Math.max(100, Math.round((r.height / speed) * 1000));
			setDraw({ x, y });
			durationRef.current = x + gap + y;
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, [ref, speed]);

	const style = {
		"--stroke-draw-x": `${draw.x}ms`,
		"--stroke-draw-y": `${draw.y}ms`,
		"--stroke-gap": `${gap}ms`,
		...(color ? { "--stroke-color": color } : {}),
	} as React.CSSProperties;

	return (
		<div
			ref={ref}
			data-shaded={active || undefined}
			style={style}
			className={`highlight-shade border border-ink ${className}`}
		>
			{children}
		</div>
	);
}
