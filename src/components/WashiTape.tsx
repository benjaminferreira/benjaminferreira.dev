/**
 * WashiTape - a regular or thin strip of colored paper tape you can write on.
 * NOTE: Due to its material, it is somewhat transparent
 */

export interface WashiTapeProps {
	color?: "usuzumi" | "sakura" | "matcha" | "kinari" | "asagi" | "fuji" | "kitsune" | "sumi";
	size?: "default" | "slim";
	edge?: "torn" | "cut" | "flag";
	className?: string; // rotation, positioning
	children?: React.ReactNode; // text written on the tape (label case)
}

/**
 * Real-world washi tape colors (based on Japanese "mt"-brand muted colors)
 */
const colorClasses: Record<NonNullable<WashiTapeProps["color"]>, string> = {
	usuzumi: "bg-tape-usuzumi/80",
	sakura: "bg-tape-sakura/80",
	matcha: "bg-tape-matcha/80",
	kinari: "bg-tape-kinari/80",
	asagi: "bg-tape-asagi/80",
	fuji: "bg-tape-fuji/80",
	kitsune: "bg-tape-kitsune/80",
	sumi: "bg-tape-sumi/80",
};

/**
 * Real-world washi tape widths (regular or slim)
 */
const sizeClasses: Record<NonNullable<WashiTapeProps["size"]>, string> = {
	default: "h-(--tape-h)",
	slim: "h-(--tape-h-slim)",
};

// Inline SVG data URL for the torn/flag edge masks (white = visible, transparent = invisible)
const tornEdgeLeft =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 100' preserveAspectRatio='none'%3E%3Cpath d='M10 0 L10 100 L0 100 L2 93 L0 87 L3 80 L1 73 L3 67 L0 60 L2 53 L1 47 L3 40 L0 33 L2 27 L0 20 L3 13 L1 7 L2 0 Z' fill='white'/%3E%3C/svg%3E";

const tornEdgeRight =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L0 100 L10 100 L8 91 L10 84 L7 78 L9 70 L7 63 L10 55 L8 48 L10 42 L7 35 L9 28 L7 22 L10 15 L8 8 L9 0 Z' fill='white'/%3E%3C/svg%3E";

const flagEdge =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L16 0 L0 50 L16 100 L0 100 Z' fill='white'/%3E%3C/svg%3E";

const flagEdgeSlim =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 L10 0 L0 50 L10 100 L0 100 Z' fill='white'/%3E%3C/svg%3E";

const tornMask = (svg: string) =>
	({
		maskImage: `url("${svg}")`,
		maskSize: "10px 48px",
		maskRepeat: "repeat-y",
		WebkitMaskImage: `url("${svg}")`,
		WebkitMaskSize: "10px 48px",
		WebkitMaskRepeat: "repeat-y",
	}) as React.CSSProperties;

const flagMask = (size: NonNullable<WashiTapeProps["size"]>) =>
	({
		maskImage: `url("${size === "slim" ? flagEdgeSlim : flagEdge}")`,
		maskSize: "100% 100%",
		WebkitMaskImage: `url("${size === "slim" ? flagEdgeSlim : flagEdge}")`,
		WebkitMaskSize: "100% 100%",
	}) as React.CSSProperties;

/**
 * A strip of washi tape used to stick something down, separate sections,
 * or be written upon/used as a label.
 *
 * @example
 * <WashiTape color="matcha" edge="flag">
 *   <p>Me and my dog - 9/12</p>
 * </WashiTape>
 */
export default function WashiTape({
	color = "kinari",
	size = "default",
	edge = "torn",
	className = "",
	children,
}: WashiTapeProps) {
	return (
		<div
			className={`relative flex items-center mix-blend-multiply ${colorClasses[color]} ${sizeClasses[size]} ${className}`}
		>
			{/* torn edges */}
			{edge === "torn" && (
				<>
					<span
						className={`absolute left-0 top-0 h-full w-2.5 -translate-x-full mix-blend-multiply ${colorClasses[color]}`}
						style={tornMask(tornEdgeLeft)}
					/>
					<span
						className={`absolute right-0 top-0 h-full w-2.5 translate-x-full mix-blend-multiply ${colorClasses[color]}`}
						style={tornMask(tornEdgeRight)}
					/>
				</>
			)}
			{/* cut edges */}
			{edge === "cut" && (
				<>
					<span
						className={`absolute left-0 top-0 h-full w-2.5 -translate-x-full mix-blend-multiply ${colorClasses[color]}`}
					/>
					<span
						className={`absolute right-0 top-0 h-full w-2.5 translate-x-full mix-blend-multiply ${colorClasses[color]}`}
					/>
				</>
			)}
			{/* flag edge: torn left, flag-notch right */}
			{edge === "flag" && (
				<>
					<span
						className={`absolute left-0 top-0 h-full w-2.5 -translate-x-full mix-blend-multiply ${colorClasses[color]}`}
						style={tornMask(tornEdgeLeft)}
					/>
					<span
						className={`absolute right-0 top-0 h-full ${size === "slim" ? "w-2.5" : "w-4"} translate-x-full mix-blend-multiply ${colorClasses[color]}`}
						style={flagMask(size)}
					/>
				</>
			)}
			{/* body content (label text if any) */}
			{children && (
				<span className={`relative px-3 font-mono text-ink ${size === "slim" ? "text-xs" : "text-sm"}`}>
					{children}
				</span>
			)}
		</div>
	);
}
