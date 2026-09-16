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

// an inline SVG data URL for the torn edge mask (white = visible, transparent = torn away)
const tornEdge =
	"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 100' preserveAspectRatio='none'%3E%3Cpath d='M10 0 L10 100 L0 100 L2 93 L0 87 L3 80 L1 73 L3 67 L0 60 L2 53 L1 47 L3 40 L0 33 L2 27 L0 20 L3 13 L1 7 L2 0 Z' fill='white'/%3E%3C/svg%3E";

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
			{/* left edge mask */}
			<span
				className={`absolute left-0 top-0 h-full w-2.5 -translate-x-full ${colorClasses[color]}`}
				style={{
					maskImage: `url("${tornEdge}")`,
					maskSize: "100% 100%",
					WebkitMaskImage: `url("${tornEdge}")`,
					WebkitMaskSize: "100% 100%",
				}}
			/>
			{/* body content (label text if any) */}
			{children && (
				<span className={`px-3 font-mono text-ink ${size === "slim" ? "text-xs" : "text-sm"}`}>{children}</span>
			)}
			{/* right edge mask */}
			<span
				className={`absolute right-0 top-0 h-full w-2.5 translate-x-full -scale-x-100 ${colorClasses[color]}`}
				style={{
					maskImage: `url("${tornEdge}")`,
					maskSize: "100% 100%",
					WebkitMaskImage: `url("${tornEdge}")`,
					WebkitMaskSize: "100% 100%",
				}}
			/>
		</div>
	);
}
