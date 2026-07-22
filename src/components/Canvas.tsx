/**
 * Canvas Component
 */

import React from "react";

/**
 * Props interface for Canvas component
 */
interface CanvasProps {
	/** The base background color of the canvas */
	variant?: "paper" | "kraft" | "divider" | "white";

	/** Optional texture overlay on top of the base color */
	texture?: "none" | "cream" | "beige" | "handmade";

	/** Optional line, grid or pattern overlay */
	pattern?: "none" | "ruled" | "grid" | "dotgrid" | "dotruled";

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

// ============================================================
// 3. HELPER FUNCTIONS / CONSTANTS
// ============================================================
// Put any lookup maps, utility functions, or constants that the
// component uses here - OUTSIDE the component function so they
// don't get recreated on every render.

//Example: map variant names to Tailwind classes
const variantClasses: Record<string, string> = {
	paper: "bg-paper",
	kraft: "bg-kraft",
	divider: "bg-divider",
	white: "bg-white",
};

// Example: map texture names to CSS background styles
const textureStyles: Record<string, React.CSSProperties> = {
	cream: { backgroundImage: "url('/textures/cream-paper.png')", backgroundSize: "200px" },
	beige: { backgroundImage: "url('/textures/beige-paper.png')", backgroundSize: "200px" },
	handmade: { backgroundImage: "url('/textures/handmade-paper.png')", backgroundSize: "200px" },
};

const patternStyles: Record<string, React.CSSProperties> = {
	dotgrid: {
		backgroundImage: "radial-gradient(circle, var(--color-dot-grey) 1px, transparent 1px)",
		backgroundSize: "20px 20px",
	},
	ruled: { backgroundImage: "linear-gradient(var(--color-lines) 1px, transparent 1px)", backgroundSize: "100% 24px" },
	grid: {
		backgroundImage:
			"linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)",
		backgroundSize: "20px 20px",
	},
	// Need to add dotruled pattern style as well
};

// ============================================================
// 4. THE COMPONENT FUNCTION
// ============================================================
// - Use default values in the destructured props (the = "value" syntax)
// - The function body should:
//   a) Compute any derived values from props
//   b) Return JSX

export default function Canvas({
	variant = "paper",
	texture = "none",
	pattern = "none",
	padding = "p-6",
	rounded = false,
	className = "",
	children,
}: CanvasProps) {
	// --------------------------------------------------------
	// 4a. DERIVED VALUES / LOGIC
	// --------------------------------------------------------
	// Compute class strings, styles, etc. from props here.
	// Keep this section short - if it gets complex, extract
	// into helper functions (section 3 above).

	// Example:
	// const baseClasses = variantClasses[variant] || "bg-paper";
	// const roundedClass = rounded ? "rounded" : "";
	// const combinedClasses = `${baseClasses} ${padding} ${roundedClass} ${className}`;
	// const textureStyle = textureStyles[texture] || {};

	// --------------------------------------------------------
	// 4b. RETURN JSX
	// --------------------------------------------------------
	// The component's visual output.
	// For a component with a texture overlay, you'll need:
	//   - An outer wrapper (relative positioning)
	//   - A texture layer (absolute, low opacity, covers the wrapper)
	//   - Content layer (relative, on top of texture via z-index)

	return (
		<section className={`relative ${padding} ${rounded ? "rounded" : ""} ${className}`}>
			{/* Texture overlay layer (if texture !== "none") */}
			{/* <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={textureStyle} /> */}

			{/* Content layer - sits on top of texture */}
			<div className="relative z-10">{children}</div>
		</section>
	);
}

// ============================================================
// 5. NOTES ON PATTERNS YOU'LL USE ACROSS COMPONENTS
// ============================================================
//
// - "Record<string, string>" is a TypeScript utility type meaning
//   "an object where keys are strings and values are strings"
//
// - "React.ReactNode" means "anything renderable" - strings, JSX,
//   arrays of elements, null, etc.
//
// - The "className" escape hatch prop is standard practice - it lets
//   consumers add one-off styling without needing a new prop for every case.
//
// - "pointer-events-none" on the texture layer means clicks pass through
//   to the content below - the texture is purely visual.
//
// - For textures: PNG files go in public/textures/ and are referenced
//   as "/textures/filename.png" in CSS/style (the public/ part is implicit).
//
// - For CSS-generated patterns (dots, lines, grids): use background-image
//   with gradients - no image file needed, infinitely scalable, lighter.
//
