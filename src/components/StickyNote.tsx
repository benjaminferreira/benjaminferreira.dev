/**
 * StickyNote - a small, usually square piece of colored paper that is sticky on one side.
 * Uses Surface internally for the surface material.
 * Handles behavior: elevation, interactivity, scrollability.
 */
"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import Surface, { SurfaceMaterialProps } from "./Surface";

/**
 * Props interface for StickyNote component.
 * Extends SurfaceMaterialProps to pass material options through to Surface.
 */
interface StickyNoteProps extends SurfaceMaterialProps {
	// /** Whether the stickynote is raised off the surface with a shadow */
	// raised?: boolean;

	/** The physical size of the note (default: "standard") */
	format?: "small" | "standard" | "large";

	/** Enables hover lift + active press physics */
	interactive?: boolean;

	/** Additional Tailwind classes (escape hatch for one-off styling) */
	className?: string;

	/** Content inside the StickyNote */
	children: React.ReactNode;
}

/**
 * Real-world sticky note formats, sized true to life.
 * CSS defines 1in as 96px, which is 6rem at the default root font size,
 * so 1 inch = 6rem here (w-24). Using rem keeps them scaling with root font size.
 *
 * small    2in x 2in      brief annotations
 * standard 3in x 3in      the classic
 * large    4in x 4in      brainstorming, diagrams
 */
const formatClasses: Record<NonNullable<StickyNoteProps["format"]>, string> = {
	small: "w-48 aspect-square",
	standard: "w-72 aspect-square",
	large: "w-96 aspect-square",
};

/**
 * Contact shadow drawn on the paper itself (the part still touching the wall).
 * Transparent until lifted, but every variant declares all 4 values (x / y / blur / spread)
 * so Motion can interpolate it in both directions. If only some variants declare it,
 * the shadow never animates back off.
 */
const contactShadow = {
	stuck: "0 0px 0px 0px rgba(0,0,0,0)",
	nudge: "0 0px 0px 0px rgba(0,0,0,0)",
	lifted: "0 3px 5px -1px rgba(0,0,0,0.14)",
};

/** The paper. Pivots from its glued top edge, so positive rotateX peels the bottom up. */
const noteVariants: Variants = {
	stuck: {
		rotateX: 0,
		y: 0,
		scale: 1,
		rotate: 0,
		boxShadow: contactShadow.stuck,
	},
	nudge: {
		rotateX: 5,
		boxShadow: contactShadow.nudge,
		transition: { duration: 0.25, ease: "easeOut" },
	},
	lifted: {
		// bottom curls first, then the whole note unsticks and floats up
		rotateX: [0, 18, 2],
		y: [0, 0, -12],
		scale: [1, 1, 1.04],
		boxShadow: contactShadow.lifted,
		transition: { duration: 0.333, times: [0, 0.45, 1], ease: "easeOut" },
	},
};

/** Reduced motion: keep the shadow feedback, drop the 3D movement. */
const noteVariantsReduced: Variants = {
	stuck: { boxShadow: contactShadow.stuck },
	nudge: { boxShadow: contactShadow.nudge },
	lifted: { boxShadow: contactShadow.lifted },
};

/**
 * The cast shadow, as a sibling of the paper so it never tilts along with it.
 * originY 1 pins its bottom edge to the note's bottom, so scaleY grows it upward.
 * At lifted it reaches the full height of the note, since a fully peeled note is
 * off the wall entirely and casts a complete shadow.
 */
const shadowVariants: Variants = {
	stuck: {
		opacity: 0,
		scaleY: 0,
		y: 0,
		transition: { duration: 0.3, ease: "easeOut" },
	},
	nudge: {
		opacity: 0.3,
		scaleY: 1,
		y: 6,
		transition: { duration: 0.25, ease: "easeOut" },
	},
	lifted: {
		opacity: 0.34,
		scaleY: 1.5,
		y: 0,
		transition: { duration: 0.333, ease: "easeOut" },
	},
};

/**
 * A stickynote with a flat (stuck) top side where the rest is slightly lifted
 * Renders a Surface internally for the surface material, and handles
 * object-level behavior: elevation, interactivity, and scrollability.
 *
 * @example
 * <StickyNote format="standard" bgColor="bg-mild-yellow" interactive>
 *   <p>Remember to water the plants</p>
 * </StickyNote>
 */
export default function StickyNote({
	format = "standard",
	interactive = false,
	className = "",
	children,
	...surfaceProps
}: StickyNoteProps) {
	const [lifted, setLifted] = useState(false);
	const reduceMotion = useReducedMotion();

	function clickHandler() {
		setLifted((v) => !v);
	}

	return (
		// Stage: perspective and gestures. Variants propagate to both children.
		<motion.div
			className={`relative ${formatClasses[format]} ${interactive ? "cursor-pointer" : ""} ${className}`}
			style={{ perspective: 900 }}
			initial="stuck"
			{...(interactive && {
				tabIndex: 0,
				animate: lifted ? "lifted" : "stuck",
				whileHover: lifted ? undefined : "nudge", // Don't nudge while already lifted
				onClick: clickHandler,
				role: "button",
				"aria-pressed": lifted,
				onKeyDown: (e: React.KeyboardEvent) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault(); // Prevent spacebar from scrolling down page.
						clickHandler();
					}
				},
			})}
		>
			{/* Cast shadow layer - starts at bottom and only reaches partway up so the stuck top casts nothing */}
			<motion.div
				aria-hidden="true"
				variants={shadowVariants}
				style={{ originY: 1 }}
				className="pointer-events-none absolute inset-x-1 top-1/3 rounded-t-2xl bottom-0 z-0 bg-black blur-md"
			/>

			{/* The paper itself */}
			<motion.div
				variants={reduceMotion ? noteVariantsReduced : noteVariants}
				style={{ transformOrigin: "top center" }}
				className="relative z-10 h-full"
			>
				<Surface
					className="h-full"
					{...surfaceProps}
				>
					{children}
				</Surface>
			</motion.div>
		</motion.div>
	);
}
