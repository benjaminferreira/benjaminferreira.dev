/**
 * Themed surface component for the Japanese stationery design system.
 * Provides paper-like backgrounds with optional texture and pattern overlays.
 */
"use client";

import { useState } from "react";

/**
 * Props interface for Canvas component
 */
interface CanvasProps {
	/** The base material/background of the canvas */
	variant?: "paper" | "paper-md" | "kraft" | "tracing" | "white";

	/** Surface texture overlay (default has a faint paper grain) */
	texture?: "default" | "grain" | "handmade";

	/** Optional line, grid or pattern overlay */
	pattern?: "none" | "ruled" | "grid" | "dotgrid" | "dotruled";

	/** Whether the canvas is raised off the surface with a shadow */
	raised?: boolean;

	/** Enables hover lift + active press physics */
	interactive?: boolean;

	/** Tailwind padding class (default: "p-6") */
	padding?: string;

	/** Whether corners are rounded (default: false)
	 *      NOTE: Most paper is not rounded, though some sticky notes etc. might be) */
	rounded?: boolean;

	/** Additional Tailwind classes (escape hatch for one-off styling) */
	className?: string;

	/** Content inside the Canvas */
	children: React.ReactNode;
}

/**
 * Canvas material-type variant classes
 */
const variantClasses: Record<NonNullable<CanvasProps["variant"]>, string> = {
	paper: "bg-paper",
	"paper-md": "bg-paper-md",
	kraft: "bg-kraft",
	tracing: "bg-tracing",
	white: "bg-white",
};

/**
 * Canvas texture overlay CSS style mappings
 */
const textureStyles: Record<NonNullable<CanvasProps["texture"]>, React.CSSProperties> = {
	default: { backgroundImage: "url('/textures/cream-paper.png')", backgroundSize: "200px" },
	grain: { backgroundImage: "url('/textures/beige-paper.png')", backgroundSize: "200px" },
	handmade: { backgroundImage: "url('/textures/handmade-paper.png')", backgroundSize: "200px" },
};

/**
 * Texture opacity per type (default is subtle, grain/handmade are more visible)
 */
const textureOpacity: Record<NonNullable<CanvasProps["texture"]>, string> = {
	default: "opacity-[0.25]",
	grain: "opacity-[0.50]",
	handmade: "opacity-[0.75]",
};

/**
 * Canvas line/dot/grid pattern overlay CSS style mappings
 */
const patternStyles: Record<string, React.CSSProperties> = {
	dotgrid: {
		backgroundImage: "radial-gradient(circle, var(--color-dot-grey) 1px, transparent 1px)",
		backgroundSize: "20px 20px",
	},
	ruled: {
		backgroundImage: "linear-gradient(var(--color-lines) 1px, transparent 1px)",
		backgroundSize: "100% 24px",
		backgroundPosition: "0 -13px",
	},
	grid: {
		backgroundImage:
			"linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)",
		backgroundSize: "20px 20px",
	},
};

/**
 * Function to render the pattern prop selected
 * @param pattern Pattern prop to return associated JSX
 * @returns JSX to render the pattern layer
 */
function renderPattern(pattern: NonNullable<CanvasProps["pattern"]>) {
	// Dotruled pattern needs its own special render since it uses two layers.
	if (pattern === "dotruled") {
		return (
			<>
				<div
					className="absolute inset-0 opacity-[0.65] pointer-events-none"
					style={{
						backgroundImage: "linear-gradient(var(--color-campus-dot) 1px, transparent 1px)",
						backgroundSize: "100% 24px",
						backgroundPosition: "0 -13px",
					}}
				/>
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						backgroundImage: "radial-gradient(circle, var(--color-campus-dot) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
					}}
				/>
			</>
		);
	}

	const style = patternStyles[pattern];
	if (!style) return null;
	return (
		<div
			className="absolute inset-0 pointer-events-none"
			style={style}
		/>
	);
}

/**
 * A themed surface component inspired by physical paper media.
 * Renders a background with optional texture and pattern overlays.
 * Supports physical interaction states (lift on hover, press on click).
 *
 * @example
 * <Canvas variant="paper" texture="grain" pattern="dotgrid" raised interactive>
 *   <p>Content on textured paper</p>
 * </Canvas>
 */
export default function Canvas({
	variant = "paper",
	texture = "default",
	pattern = "none",
	raised = false,
	interactive = false,
	padding = "p-6",
	rounded = false,
	className = "",
	children,
}: CanvasProps) {
	const [lifted, setLifted] = useState(false);
	const [pressed, setPressed] = useState(false);

	const elevationClass = raised ? "shadow-md" : "";

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
			className={`relative overflow-hidden ${variantClasses[variant]} ${padding} ${elevationClass} ${interactiveHoverClass} ${rounded ? "rounded-3xl" : ""} ${className}`}
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
			{/* Texture layer */}
			<div
				className={`absolute inset-0 ${textureOpacity[texture]} pointer-events-none`}
				style={textureStyles[texture]}
			/>

			{/* Pattern layer */}
			{pattern !== "none" && renderPattern(pattern)}

			{/* Content layer - sits on top of texture/pattern */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}
