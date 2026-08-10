/**
 * StickyNote - a small, usually square piece of colored paper that is sticky on one side.
 * Uses Surface internally for the surface material.
 * Handles behavior: elevation, interactivity, scrollability.
 */
"use client";

import { useState } from "react";
import Surface, { SurfaceMaterialProps } from "./Surface";

/**
 * Props interface for StickyNote component.
 * Extends SurfaceMaterialProps to pass material options through to Surface.
 */
interface StickyNoteProps extends SurfaceMaterialProps {
	// /** Whether the stickynote is raised off the surface with a shadow */
	// raised?: boolean;

	/** Enables hover lift + active press physics */
	interactive?: boolean;

	/** Additional Tailwind classes (escape hatch for one-off styling) */
	className?: string;

	/** Content inside the StickyNote */
	children: React.ReactNode;
}

/**
 * A stickynote with a flat (stuck) top side where the rest is slightly lifted
 * Renders a Surface internally for the surface material, and handles
 * object-level behavior: elevation, interactivity, and scrollability.
 *
 * @example

 */
export default function StickyNote({
	// raised = false,
	interactive = false,
	className = "",
	children,
	...surfaceProps
}: StickyNoteProps) {
	const [lifted, setLifted] = useState(false);
	const [pressed, setPressed] = useState(false);

	const elevationClass = "shadow-md";

	// Interactive states:
	// - hover: gentle shadow appears (CSS class)
	// - mousedown (pressed): paper presses flat, shadow disappears
	// - mouseup/click (lifted): paper lifts up with big shadow
	// - blur: paper floats back down
	const interactiveStyle: React.CSSProperties = interactive
		? pressed
			? {
					transform: "translateY(1px) scale(0.995)",
					boxShadow: "0 1px 2px 0 rgba(0,0,0,0.04)",
					transition: "all 100ms ease-in",
				}
			: lifted
				? {
						transform: "translateY(-6px) rotate(0.4deg)",
						boxShadow: "0 12px 28px -4px rgba(0,0,0,0.16), 0 6px 10px -2px rgba(0,0,0,0.08)",
						transition: "transform 200ms cubic-bezier(0.2, 0.9, 0.3, 1), box-shadow 200ms ease-out",
					}
				: {
						transition: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
					}
		: {};

	const interactiveHoverClass =
		interactive && !lifted && !pressed
			? "[&:hover]:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08)] cursor-pointer"
			: interactive
				? "cursor-pointer"
				: "";

	return (
		<div
			className={`${elevationClass} ${interactiveHoverClass} ${className}`}
			style={interactiveStyle}
			{...(interactive && {
				tabIndex: 0,
				onMouseDown: () => setPressed(true),
				onMouseUp: () => {
					setPressed(false);
					setLifted(true);
				},
				onBlur: () => {
					setLifted(false);
					setPressed(false);
				},
			})}
		>
			<Surface
				className="h-full"
				{...surfaceProps}
			>
				{children}
			</Surface>
		</div>
	);
}
