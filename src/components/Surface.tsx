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

	/** Tailwind padding class (default: "p-6") */
	padding?: string;

	/** Notebook-style top margin */
	pageTop?: boolean;
}

/**
 * Props interface for Surface component.
 * Surface is a material/surface only. It handles what things LOOK like.
 * Object components (Sheet, StickyNote, etc.) handle behavior (raised, interactive, etc.)
 */
interface SurfaceProps extends SurfaceMaterialProps {
	/** Additional Tailwind classes (escape hatch for one-off styling) */
	className?: string;

	/** Content inside the Surface */
	children: React.ReactNode;
}

/**
 * Ruling pitch per pattern, in px. This is used by both the --rule-pitch variable and the pageTop math.
 */
const patternPitch: Record<NonNullable<SurfaceProps["pattern"]>, number> = {
	none: 24,
	ruled: 24,
	dotruled: 24,
	dotgrid: 20,
	grid: 20,
};

/** Real notebook top margin (25.4mm) divided by line spacing (7.1mm) */
const PAGE_TOP = "calc(var(--rule-pitch) * 3.5775)";

/** Dots inset by their own 2px, grid by its 1px line, so neither prints flush on an edge. Ruled stays full width. */
const DOT_INSET = "2px";
const GRID_INSET = "1px";

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
 * Renders the pattern layer(s). Ruling starts at the header under pageTop, else a bit
 * down so the top isn't a line. Dots keep their 2px shape and sit 1px below the lines.
 * Dots and grid inset from the edges; ruled lines stay full width.
 */
function renderPattern(pattern: NonNullable<SurfaceProps["pattern"]>, pageTop: boolean) {
	const box = "absolute pointer-events-none";
	const top = pageTop ? "var(--page-top)" : "0";
	// row phase: on the header under pageTop, else nudged down so the top edge isn't a line
	const rowY = pageTop ? "0px" : "calc(var(--rule-pitch) / 2 - 1px)";
	const lineBg = `0 ${rowY}`;
	const dotBg = `0 calc(${rowY} + 1px - var(--rule-pitch) / 2)`;

	const lineImg = "linear-gradient(var(--color-lines) 1px, transparent 1px)";
	const campusLineImg = "linear-gradient(var(--color-campus-dot) 1px, transparent 1px)";
	const dotImg = (c: string) => `radial-gradient(circle, ${c} 1px, transparent 1px)`;

	if (pattern === "ruled") {
		return (
			<div
				className={box}
				style={{
					top,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundImage: lineImg,
					backgroundSize: "100% var(--rule-pitch)",
					backgroundPosition: lineBg,
				}}
			/>
		);
	}

	if (pattern === "grid") {
		return (
			<div
				className={box}
				style={{
					top: pageTop ? "var(--page-top)" : GRID_INSET,
					left: GRID_INSET,
					right: GRID_INSET,
					bottom: GRID_INSET,
					backgroundImage:
						"linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)",
					backgroundSize: "var(--rule-pitch) var(--rule-pitch)",
				}}
			/>
		);
	}

	if (pattern === "dotgrid") {
		return (
			<div
				className={box}
				style={{
					top,
					left: DOT_INSET,
					right: DOT_INSET,
					bottom: DOT_INSET,
					backgroundImage: dotImg("var(--color-dot-grey)"),
					backgroundSize: "var(--rule-pitch) var(--rule-pitch)",
					backgroundPosition: dotBg,
				}}
			/>
		);
	}

	// dotruled: full-width lines plus dots 1px below them
	if (pattern === "dotruled") {
		return (
			<>
				<div
					className={`${box} opacity-65`}
					style={{
						top,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundImage: campusLineImg,
						backgroundSize: "100% var(--rule-pitch)",
						backgroundPosition: lineBg,
					}}
				/>
				<div
					className={box}
					style={{
						top,
						left: DOT_INSET,
						right: DOT_INSET,
						bottom: DOT_INSET,
						backgroundImage: dotImg("var(--color-campus-dot)"),
						backgroundSize: "var(--rule-pitch) var(--rule-pitch)",
						backgroundPosition: dotBg,
					}}
				/>
			</>
		);
	}

	return null;
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
	pageTop = false,
	className = "",
	children,
}: SurfaceProps) {
	return (
		<div
			className={`relative overflow-hidden ${bgColor !== "" ? bgColor : variantClasses[variant]} ${padding} ${className}`}
			style={
				{
					"--rule-pitch": `${patternPitch[pattern]}px`,
					"--page-top": PAGE_TOP,
				} as React.CSSProperties
			}
		>
			{/* Texture layer - full bleed, so the top margin is still textured paper */}
			<div
				className={`absolute inset-0 ${textureOpacity[texture]} pointer-events-none`}
				style={textureStyles[texture]}
			/>

			{/* Pattern layer - starts below the top margin when pageTop is set */}
			{pattern !== "none" && renderPattern(pattern, pageTop)}

			{/* Header rule at the top-margin boundary */}
			{pageTop && (
				<div
					aria-hidden="true"
					className="border-t border-campus-line pointer-events-none absolute inset-x-0 "
					style={{ top: "var(--page-top)" }}
				/>
			)}

			{/*
				Content layer. Intentionally NOT padded for pageTop: the consumer owns that,
				so a full-height margin line can run through the header band while only the
				content below it is pushed down. Consumers read var(--page-top).
			*/}
			<div className="relative z-10 h-full">{children}</div>
		</div>
	);
}
