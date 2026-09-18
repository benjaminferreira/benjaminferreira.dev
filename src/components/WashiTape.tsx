/**
 * WashiTape - a strip of colored paper tape you can write on.
 * One element with a composite mask for the edges.
 * NOTE: Due to its material, it is somewhat transparent
 */

export interface WashiTapeProps {
	color?: "usuzumi" | "sakura" | "matcha" | "kinari" | "asagi" | "fuji" | "kitsune" | "sumi";
	size?: "default" | "slim";
	edge?: "torn" | "cut" | "flag";
	absolute?: boolean; // position over a relative parent (e.g. taping a photo)
	className?: string; // rotation, positioning
	children?: React.ReactNode; // text written on the tape (label case)
}

/* mt-inspired muted colors, mapped to CSS custom properties with opacity */
const tapeColors: Record<NonNullable<WashiTapeProps["color"]>, string> = {
	usuzumi: "var(--color-tape-usuzumi)",
	sakura: "var(--color-tape-sakura)",
	matcha: "var(--color-tape-matcha)",
	kinari: "var(--color-tape-kinari)",
	asagi: "var(--color-tape-asagi)",
	fuji: "var(--color-tape-fuji)",
	kitsune: "var(--color-tape-kitsune)",
	sumi: "var(--color-tape-sumi)",
};

/* tape widths */
const sizeClasses: Record<NonNullable<WashiTapeProps["size"]>, string> = {
	default: "h-(--tape-h)",
	slim: "h-(--tape-h-slim)",
};

/* torn edge SVGs (white = visible, transparent = torn away) */
const tornLeft =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 48'%3E%3Cpath d='M10 0 L10 48 L0 48 L2 44.6 L0 41.8 L3 38.4 L1 35 L3 32.2 L0 28.8 L2 25.4 L1 22.6 L3 19.2 L0 15.8 L2 13 L0 9.6 L3 6.2 L1 3.4 L2 0 Z' fill='white'/%3E%3C/svg%3E";

const tornRight =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 48'%3E%3Cpath d='M0 0 L0 48 L10 48 L8 43.7 L10 40.3 L7 37.4 L9 33.6 L7 30.2 L10 26.4 L8 23 L10 20.2 L7 16.8 L9 13.4 L7 10.6 L10 7.2 L8 3.8 L9 0 Z' fill='white'/%3E%3C/svg%3E";

/* flag notch SVGs */
const flagRight =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L16 0 L0 50 L16 100 L0 100 Z' fill='white'/%3E%3C/svg%3E";

const flagRightSlim =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L10 0 L0 50 L10 100 L0 100 Z' fill='white'/%3E%3C/svg%3E";

/* solid white fill for the middle of the mask */
const solid = "linear-gradient(white,white)";

/**
 * Builds the composite mask style for a given edge and size.
 * Three mask layers: left edge, solid middle, right edge.
 */
function edgeMask(
	edge: NonNullable<WashiTapeProps["edge"]>,
	size: NonNullable<WashiTapeProps["size"]>,
): React.CSSProperties {
	if (edge === "cut") return {}; // plain rectangle, no mask

	const left = `url("${tornLeft}")`;
	const isSlim = size === "slim";
	const rightW = edge === "flag" ? (isSlim ? "10px" : "16px") : "10px";
	const right = edge === "flag" ? `url("${isSlim ? flagRightSlim : flagRight}")` : `url("${tornRight}")`;

	const rightH = edge === "flag" ? "100%" : "48px";

	const img = `${left}, ${solid}, ${right}`;
	const sz = `10px 48px, calc(100% - 9px - ${rightW} + 1px) 100%, ${rightW} ${rightH}`;
	const pos = `left top, 9px top, right top`;
	const rep = edge === "flag" ? "repeat-y, no-repeat, no-repeat" : "repeat-y, no-repeat, repeat-y";

	return {
		maskImage: img,
		maskSize: sz,
		maskPosition: pos,
		maskRepeat: rep,
		maskComposite: "add",
		WebkitMaskImage: img,
		WebkitMaskSize: sz,
		WebkitMaskPosition: pos,
		WebkitMaskRepeat: rep,
		WebkitMaskComposite: "source-over",
	} as React.CSSProperties;
}

/**
 * A strip of washi tape used to stick something down, separate sections,
 * or be written upon/used as a label.
 *
 * @example
 * <WashiTape color="matcha" edge="flag">
 *   <p>Me and Charlie - 9/12</p>
 * </WashiTape>
 */
export default function WashiTape({
	color = "kinari",
	size = "default",
	edge = "torn",
	absolute = false,
	className = "",
	children,
}: WashiTapeProps) {
	const tapeColor = tapeColors[color];

	return (
		<div className={`${absolute ? "absolute" : "relative"} ${sizeClasses[size]} ${className}`}>
			{/* tape body: color + texture + mask, blended onto the page */}
			<div
				className="absolute inset-0 mix-blend-multiply"
				style={{
					backgroundColor: tapeColor,
					backgroundImage: "url('/textures/handmade-paper.png')",
					backgroundSize: "100px",
					backgroundBlendMode: "overlay",
					opacity: 0.8,
					...edgeMask(edge, size),
				}}
			/>
			{/* label text sits above the blend so ink shows its full darkness */}
			{children && (
				<span
					className={`relative flex items-center h-full px-5 font-mono text-ink ${size === "slim" ? "text-xs" : "text-sm"}`}
				>
					{children}
				</span>
			)}
		</div>
	);
}
