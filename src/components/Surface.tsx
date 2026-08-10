/**
 * Themed surface component for the Japanese stationery design system.
 * Provides paper-like backgrounds with optional texture and pattern overlays.
 */

/**
 * Material props shared by Surface and all object components that use it.
 * Export this so object components (Sheet, StickyNote, etc.) can extend it.
 */
export interface SurfaceMaterialProps {
	/** The base material/background of the surface */
	variant?: "paper" | "paper-md" | "kraft" | "tracing" | "white";

	/** Surface texture overlay (default has a faint paper grain) */
	texture?: "default" | "grain" | "handmade" | "lines" | "leather";

	/** Optional line, grid or pattern overlay */
	pattern?: "none" | "ruled" | "grid" | "dotgrid" | "dotruled";

	/** Background color override */
	bgColor?: string;
}

/**
 * Props interface for Surface component.
 * Surface is a material/surface only. It handles what things LOOK like.
 * Object components (Sheet, StickyNote, etc.) handle behavior (raised, interactive, etc.)
 */
interface SurfaceProps extends SurfaceMaterialProps {
	/** Tailwind padding class (default: "p-6") */
	padding?: string;

	/** Additional Tailwind classes (escape hatch for one-off styling) */
	className?: string;

	/** Content inside the Surface */
	children: React.ReactNode;
}

/**
 * Surface material-type variant classes
 */
const variantClasses: Record<NonNullable<SurfaceProps["variant"]>, string> = {
	paper: "bg-paper",
	"paper-md": "bg-paper-md",
	kraft: "bg-kraft",
	tracing: "bg-tracing",
	white: "bg-white",
};

/**
 * Surface texture overlay CSS style mappings
 */
const textureStyles: Record<NonNullable<SurfaceProps["texture"]>, React.CSSProperties> = {
	default: { backgroundImage: "url('/textures/cream-paper.png')", backgroundSize: "158px 144px" },
	grain: { backgroundImage: "url('/textures/beige-paper.png')", backgroundSize: "200px" },
	handmade: { backgroundImage: "url('/textures/handmade-paper.png')", backgroundSize: "100px" },
	lines: { backgroundImage: "url('/textures/lines.png')", backgroundSize: "4px" },
	leather: { backgroundImage: "url('/textures/leather.png')", backgroundSize: "300px" },
};

/**
 * Texture opacity per type (default is subtle, grain/handmade are more visible)
 */
const textureOpacity: Record<NonNullable<SurfaceProps["texture"]>, string> = {
	default: "opacity-35",
	grain: "opacity-50",
	handmade: "opacity-75",
	lines: "opacity-75",
	leather: "opacity-100",
};

/**
 * Surface line/dot/grid pattern overlay CSS style mappings
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
function renderPattern(pattern: NonNullable<SurfaceProps["pattern"]>) {
	// Dotruled pattern needs its own special render since it uses two layers.
	if (pattern === "dotruled") {
		return (
			<>
				<div
					className="absolute inset-0 opacity-65 pointer-events-none"
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
 * This is a material/surface only, handling what things look like.
 * For behavior (raised, interactive, etc.), use object components (Sheet, StickyNote, etc.)
 *
 * @example
 * <Surface variant="paper-md" texture="grain" pattern="dotgrid">
 *   <p>Content on textured paper</p>
 * </Surface>
 */
export default function Surface({
	variant = "paper",
	texture = "default",
	pattern = "none",
	bgColor = "",
	padding = "p-6",
	className = "",
	children,
}: SurfaceProps) {
	return (
		<div
			className={`relative overflow-hidden ${bgColor !== "" ? bgColor : variantClasses[variant]} ${padding} ${className}`}
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
