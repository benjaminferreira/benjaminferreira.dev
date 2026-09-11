"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type Entry = { el: Element; activate: () => void; duration: number };

const SequenceContext = createContext<((entry: Entry) => () => void) | null>(null);

/**
 * Groups highlight marks so they reveal one at a time, top to bottom, as each scrolls
 * into view, like one pen going down the section. Covers both `highlight` text sweeps
 * and `highlight-shade` boxes. Marks register through {@link useHighlight}; only
 * descendants of a group are sequenced. `gap` is the pause between strokes in ms.
 */
export function HighlightGroup({ gap = 120, children }: { gap?: number; children: React.ReactNode }) {
	const reduce = useReducedMotion();
	const entriesRef = useRef<Entry[]>([]);
	const seenRef = useRef<Set<Element>>(new Set());
	const pointerRef = useRef(0);
	const runningRef = useRef(false);
	const observerRef = useRef<IntersectionObserver | null>(null);

	const drawNext = useCallback(() => {
		const entries = entriesRef.current;

		if (reduce) {
			entries.forEach((e) => e.activate());
			pointerRef.current = entries.length;
			return;
		}
		if (runningRef.current) return;

		const next = entries[pointerRef.current];
		if (!next || !seenRef.current.has(next.el)) return;

		runningRef.current = true;
		next.activate();
		window.setTimeout(() => {
			pointerRef.current += 1;
			runningRef.current = false;
			drawNext();
		}, next.duration + gap);
	}, [gap, reduce]);

	useEffect(() => {
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
		entriesRef.current.sort(
			(a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top,
		);
		observerRef.current?.observe(entry.el);
		return () => {
			entriesRef.current = entriesRef.current.filter((e) => e !== entry);
			observerRef.current?.unobserve(entry.el);
			seenRef.current.delete(entry.el);
		};
	}, []);

	return <SequenceContext.Provider value={register}>{children}</SequenceContext.Provider>;
}

/**
 * Registers an element with its enclosing {@link HighlightGroup}. Attach the returned
 * `ref`, and wire `active` to the mark's reveal attribute: `data-hl` for `highlight`,
 * `data-shaded` for `highlight-shade`. `duration` is the stroke time in ms and paces the
 * next mark, so pass the mark's real draw time. No-ops outside a HighlightGroup.
 */
export function useHighlight<T extends Element>(duration = 600) {
	const register = useContext(SequenceContext);
	const ref = useRef<T>(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (!register || !ref.current) return;
		return register({ el: ref.current, activate: () => setActive(true), duration });
	}, [register, duration]);

	return { ref, active };
}

/**
 * Text with a highlighter sweep. A `<span>` using the `highlight` utility: reveals on
 * hover/focus anywhere, and additionally sequences on scroll inside a {@link HighlightGroup}.
 * `color` is any CSS colour/var. `speed` is the draw velocity in px/sec, so a longer run
 * takes proportionally longer to draw. Decorative by default; wrap it in <mark> when the
 * highlight denotes relevance.
 */
export function HighlightText({
	children,
	color,
	speed = 1100,
	className = "",
}: {
	children: React.ReactNode;
	color?: string;
	speed?: number;
	className?: string;
}) {
	// draw time tracks pixel width, so every stroke moves at the same speed
	const [duration, setDuration] = useState(300);
	const { ref, active } = useHighlight<HTMLSpanElement>(duration);

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
