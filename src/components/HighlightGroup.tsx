"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Entry = { el: Element; activate: () => void; duration: number };

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
		}, next.duration + gap);
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
export function useHighlight<T extends Element>(duration = 600) {
	const register = useContext(SequenceContext);
	const ref = useRef<T>(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (!register || !ref.current) return; // no group: hover/focus only
		return register({ el: ref.current, activate: () => setActive(true), duration });
	}, [register, duration]);

	return { ref, active };
}

/** Text with a highlighter sweep; reveals on hover/focus, or in sequence inside a HighlightGroup. */
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
	const [duration, setDuration] = useState(300);
	const { ref, active } = useHighlight<HTMLSpanElement>(duration);

	// draw time tracks width, so the sweep speed stays constant
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const measure = () => {
			const w = el.getBoundingClientRect().width;
			if (w > 0) setDuration(Math.max(120, Math.round((w / speed) * 1000)));
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, [ref, speed]);

	const style = {
		"--hl-draw": `${duration}ms`,
		...(color ? { "--hl": color } : {}),
	} as React.CSSProperties;

	return (
		<span
			ref={ref}
			data-hl={active || undefined}
			style={style}
			className={`highlight ${className}`}
		>
			{children}
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
	const { ref, active } = useHighlight<HTMLDivElement>(draw.x + gap + draw.y);

	// each edge draws in length/speed, so bigger boxes take longer
	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const measure = () => {
			const r = el.getBoundingClientRect();
			setDraw({
				x: Math.max(100, Math.round((r.width / speed) * 1000)),
				y: Math.max(100, Math.round((r.height / speed) * 1000)),
			});
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
