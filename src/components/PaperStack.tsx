"use client";

import {
	Children,
	createContext,
	isValidElement,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { useReducedMotion } from "motion/react";
import Surface, { type SurfaceMaterialProps } from "./Surface";
import { useSetActiveSheet } from "./ActiveSheet";
//import { POS_KEY, HIDE_STYLE_ID } from "./paperStackRestore"; // added in step 5
import type { SectionId } from "@/content/sections";

// shadow layers inset this far inside of paper and spread this far out by the same amount
const SHADOW_INSET = 40;

// keeps a number between 0 and 1
const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Slides and fades one shadow block. Writes straight to the elem, no React render.
 * @param el Shadow HTML Element to place
 * @param y How far downward to place shadow element
 * @param opacity Shadow opacity
 */
function placeShadow(el: HTMLElement | null, y: number, opacity: number) {
	if (!el) return;
	el.style.transform = `translateY(${y}px)`;
	el.style.opacity = `${opacity}`;
}

/**
 * Props interface based on Surface Material Props
 */
interface PaperStackSheetProps extends SurfaceMaterialProps {
	// Becomes the section id, must match ids in sections.ts
	id: SectionId;
	// Tilt in degrees while the sheet slides in (ignored on sheet #1)
	rotate?: number;
	// Draws the red notebook paper margin line
	hasMargin?: boolean;
	// ID of the heading that names this section - for screen readers
	labelledBy?: string;
	// Replaces the default padding (pt-24 pb-[40vh])
	contentClassName?: string;
	children: React.ReactNode;
}

/**
 * Functions that hand a sheet's elems to the parent
 */
interface SheetRefs {
	section: (el: HTMLElement | null) => void;
	sticky: (el: HTMLDivElement | null) => void;
	wrapper: (el: HTMLDivElement | null) => void;
	shadowMain: (el: HTMLDivElement | null) => void;
	shadowContact: (el: HTMLDivElement | null) => void;
}

/**
 * Everything that one sheet gets from the stack
 */
interface SheetSlot {
	index: number;
	height: string;
	refs: SheetRefs;
}
const SheetSlotContext = createContext<SheetSlot | null>(null);

/**
 * A stack of sheets that each pin while they're read, then get covered by the next one sliding in.
 * Handles measuring, the scroll animation, which sheet is on top, and links to sheets.
 * Sheets must be direct children.
 *
 * @example
 * <PaperStack>
 *   <PaperStack.Sheet id="intro" pattern="dotruled" labelledBy="intro-heading">
 *     <h1 id="intro-heading">Benjamin Ferreira</h1>
 *   </PaperStack.Sheet>
 *   <PaperStack.Sheet id="projects" pattern="ruled" rotate={1.5} hasMargin labelledBy="projects-heading">
 *     <h2 id="projects-heading">Projects</h2>
 *   </PaperStack.Sheet>
 * </PaperStack>
 */
function PaperStack({ children }: { children: React.ReactNode }) {
	const reduce = useReducedMotion();
	const setActiveId = useSetActiveSheet();

	// 1. collect the sheets from children
	const sheets = Children.toArray(children).filter((c): c is React.ReactElement<PaperStackSheetProps> =>
		isValidElement(c),
	);

	// 2. refs and state
	const sectionRefs = useRef<(HTMLElement | null)[]>([]);
	const stickyRefs = useRef<(HTMLDivElement | null)[]>([]);
	const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
	const shadowMainRefs = useRef<(HTMLDivElement | null)[]>([]);
	const shadowContactRefs = useRef<(HTMLDivElement | null)[]>([]);

	// numbers that the scroll code will need. Using refs so changing them doesn't redraw anything.
	const topsRef = useRef<number[]>([]);
	const lockRef = useRef(false);
	const unlockRef = useRef<number | undefined>(undefined);
	const restoredRef = useRef(false);

	// these change the HTML (section heights) so they use State
	const [overflows, setOverflows] = useState<number[]>([]);
	const [measured, setMeasured] = useState(false);

	// 3. measure how far each sheet's content runs past the bottom of the screen
	useEffect(() => {
		const measure = () => {
			const vh = window.innerHeight;
			// the wraper's own height is the full content height, even within the clip
			setOverflows(wrapperRefs.current.map((el) => Math.max(0, (el?.offsetHeight ?? 0) - vh)));
			setMeasured(true);
		};

		measure();
		const ro = new ResizeObserver(measure);
		wrapperRefs.current.forEach((el) => el && ro.observe(el));
		window.addEventListener("resize", measure);

		return () => {
			ro.disconnect();
			window.removeEventListener("resize", measure);
		};
	}, [sheets.length]);

	// 4. read section tops once per measure instead of every frame
	useLayoutEffect(() => {
		topsRef.current = sectionRefs.current.map((el) => el?.offsetTop ?? 0);
	}, [overflows]);

	// 5. runs on every scroll event to read cached numbers, write styles etc.
	const onScroll = useCallback(() => {
		const vh = window.innerHeight;
		const y = window.scrollY;
		const tops = topsRef.current;

		sheets.forEach((sheet, i) => {
			const top = tops[i] ?? 0;
			const overflow = overflows[i] ?? 0;

			// reading: slide the content up inside the pinned paper by 0 to overflow px
			const read = overflow > 0 ? clamp((y - top) / overflow) : 0;
			const wrapper = wrapperRefs.current[i];
			if (wrapper) wrapper.style.transform = `translateY(${-read * overflow}px)`;

			if (i === 0) return; // nothing should slide in under the first sheet in the stack

			// approach: t goes from 0 to 1 while the sheet's top travels from the bottom of the
			//      screen to 25% up it. Reduced motion skips straight to the settled state.
			const t = reduce ? 1 : clamp((y - (top - vh)) / (vh * 0.25));
			const sticky = stickyRefs.current[i];
			if (sticky) {
				const tilt = (sheet.props.rotate ?? 0) * (1 - t);
				sticky.style.transform = `rotate(${tilt}deg) scale(${1.1 - 0.1 * t})`;
			}

			// shadow casts upward while it enters and settles just above the sheet edge
			placeShadow(shadowMainRefs.current[i], -10 + 8 * t, 0.2 - 0.05 * t);
			placeShadow(shadowContactRefs.current[i], -5 + 5 * t, 0.12 - 0.02 * t);
		});

		// scroll-spy: the last sheet whose top has passed 60% up the screen is "on top"
		if (!lockRef.current) {
			let active = 0;
			for (let i = tops.length - 1; i >= 0; i--) {
				if (tops[i] - y <= vh * 0.4) {
					active = i;
					break;
				}
			}
			const id = sheets[active]?.props.id;
			if (id) setActiveId(id);
		}
	}, [sheets, overflows, reduce, setActiveId]);

	// attach the onScroll: re-attaches whenever onScroll is rebuilt (after each measure)
	useEffect(() => {
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll(); // place everything now, even before the first scroll.
		return () => window.removeEventListener("scroll", onScroll);
	}, [onScroll]);

	// 6. smooth (or instant) scroll to a sheet, then hand it keyboard focus like a real # jump would
	const scrollToSheet = useCallback(
		(i: number) => {
			setActiveId(sheets[i].props.id);
			lockRef.current = true;
			window.clearTimeout(unlockRef.current);
			window.scrollTo({ top: topsRef.current[i], behavior: reduce ? "instant" : "smooth" });
			sectionRefs.current[i]?.focus({ preventScroll: true });
			// keep the navbar dot from flicking through every sheet on the way there
			unlockRef.current = window.setTimeout(() => {
				lockRef.current = false;
			}, 1200);
		},
		[sheets, reduce, setActiveId],
	);

	// any same-page link to a sheet (navbar, hero button, links in a copy) goes through scrollToSheet above ^
	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			// leaving new tab, new window, and download clicks to the browser
			if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
			const link = (e.target as Element).closest?.("a[href]");
			if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;
			const url = new URL(link.href);
			if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
			const i = sheets.findIndex((s) => `#${s.props.id}` === url.hash);
			if (i < 0) return;
			e.preventDefault();
			scrollToSheet(i);
		};
		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, [sheets, scrollToSheet]);

	// 7. sheetRange, restore effect, save effect - TODO

	// 8. slotFor(i), then return the markup
	const slotFor = (i: number): SheetSlot => {
		const overflow = overflows[i] ?? 0;
		const isLast = i === sheets.length - 1;

		return {
			index: i,
			// Last sheet's height is only its own content, where earlier sheets hold the extra 100dvh from the upcoming sheet.
			height: isLast ? `calc(100dvh + ${overflow}px)` : `calc(200dvh + ${overflow}px)`,
			refs: {
				section: (el) => {
					sectionRefs.current[i] = el;
				},
				sticky: (el) => {
					stickyRefs.current[i] = el;
				},
				wrapper: (el) => {
					wrapperRefs.current[i] = el;
				},
				shadowMain: (el) => {
					shadowMainRefs.current[i] = el;
				},
				shadowContact: (el) => {
					shadowContactRefs.current[i] = el;
				},
			},
		};
	};

	// One context provider per sheet, so each sheet can find its own slot.
	return (
		<div
			data-paper-stack
			className="motion-safe:transition-opacity motion-safe:duration-150"
		>
			{sheets.map((sheet, i) => (
				<SheetSlotContext
					key={sheet.props.id}
					value={slotFor(i)}
				>
					{sheet}
				</SheetSlotContext>
			))}
		</div>
	);
}

/**
 * One sheet in a PaperStack. Reads its slot from context and renders
 * section > sticky > shadows > clip > wrapper > Surface comp. The parent does all the math.
 *
 * @example
 * <PaperStack.Sheet id="about" variant="paper" pattern="ruled" rotate={1} hasMargin labelledBy="about-heading">
 *   <h2 id="about-heading">About</h2>
 * </PaperStack.Sheet>
 */
function PaperStackSheet({
	id,
	rotate,
	hasMargin,
	labelledBy,
	contentClassName,
	children,
	...surface
}: PaperStackSheetProps) {
	const slot = useContext(SheetSlotContext);
	if (!slot) throw new Error("PaperStack.Sheet must be a direct child of PaperStack");
	const { index, height, refs } = slot;

	return (
		<section
			id={id}
			aria-labelledby={labelledBy}
			ref={refs.section}
			tabIndex={-1}
			className="relative outline-none"
			style={{ height, marginTop: index > 0 ? "-100dvh" : undefined, zIndex: index + 1 }}
		>
			<div
				ref={refs.sticky}
				className="sticky top-0 h-dvh origin-top-left"
			>
				{index > 0 && <ShadowLayers refs={refs} />}
				<div className="relative h-full overflow-clip">
					<div ref={refs.wrapper}>
						<Surface
							padding="p-0"
							className="min-h-dvh"
							{...surface}
						>
							<div className="mx-auto max-w-5xl px-5 md:px-8">
								<div
									className={`${hasMargin ? "border-l-2 border-margin pl-3 md:pl-8" : ""} ${contentClassName ?? "pt-24 pb-[40vh]"}`}
								>
									{children}
								</div>
							</div>
						</Surface>
					</div>
				</div>
			</div>
		</section>
	);
}

/**
 * The incoming sheet's shadow: two soft blocks that the scroll handler slides and fades in/out
 * @param refs The sheet's refs
 */
function ShadowLayers({ refs }: { refs: SheetRefs }) {
	return (
		<>
			{/* Shadow Main: main larger, blurrier shadow */}
			<div
				ref={refs.shadowMain}
				aria-hidden
				className="absolute pointer-events-none will-change-[transform,opacity]"
				style={{ inset: SHADOW_INSET, boxShadow: `0 0 6px ${SHADOW_INSET}px rgb(60 50 40)`, opacity: 0 }}
			/>
			{/* Shadow Contact: smaller, less blurry shadow right at the paper's edge for more definition */}
			<div
				ref={refs.shadowContact}
				aria-hidden
				className="absolute pointer-events-none will-change-[transform,opacity]"
				style={{ inset: SHADOW_INSET, boxShadow: `0 0 3px ${SHADOW_INSET}px rgb(60 50 40)`, opacity: 0 }}
			/>
		</>
	);
}

PaperStack.Sheet = PaperStackSheet;
export default PaperStack;
