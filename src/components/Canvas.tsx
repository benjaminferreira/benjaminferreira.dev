/**
 * Themed surface component for the Japanese stationery design system.
 * Provides paper-like backgrounds with optional texture and pattern overlays.
 */

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

/**
 * Canvas material-type variant classes
 */
const variantClasses: Record<NonNullable<CanvasProps["variant"]>, string> = {
	paper: "bg-paper",
	kraft: "bg-kraft",
	divider: "bg-divider",
	white: "bg-white",
};

/**
 * Canvas texture overlay CSS style mappings
 */
const textureStyles: Record<string, React.CSSProperties> = {
	cream: { backgroundImage: "url('/textures/cream-paper.png')", backgroundSize: "200px" },
	beige: { backgroundImage: "url('/textures/beige-paper.png')", backgroundSize: "200px" },
	handmade: { backgroundImage: "url('/textures/handmade-paper.png')", backgroundSize: "200px" },
};

/**
 * Canvas line/dot/grid pattern overlay CSS style mappings
 */
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
					}}
				/>
				<div
					className="absolute inset-0 pointer-events-none"
					style={{
						backgroundImage: "radial-gradient(circle, var(--color-campus-dot) 1px, transparent 1px)",
						backgroundSize: "24px 24px",
						backgroundPosition: "0 -11px",
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
 *
 * @example
 * <Canvas variant="paper" texture="handmade" pattern="dotgrid" padding="p-10">
 *   <p>Content on textured paper</p>
 * </Canvas>
 */
export default function Canvas({
	variant = "paper",
	texture = "none",
	pattern = "none",
	padding = "p-6",
	rounded = false,
	className = "",
	children,
}: CanvasProps) {
	return (
		<div
			className={`relative overflow-hidden ${variantClasses[variant]} ${padding} ${rounded ? "rounded-3xl" : ""} ${className}`}
		>
			{texture !== "none" && (
				<div
					className="absolute inset-0 opacity-[0.35] pointer-events-none"
					style={textureStyles[texture]}
				/>
			)}
			{pattern !== "none" && renderPattern(pattern)}

			{/* Content layer - sits on top of texture/pattern */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}
