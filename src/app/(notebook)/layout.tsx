import Surface from "@/components/Surface";
import Sheet from "@/components/Sheet";
import StickyNote from "@/components/StickyNote";

export default function NotebookLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-desk-oak relative min-h-screen">
			<div className="absolute top-20 right-20">
				<Sheet
					pattern="dotruled"
					className="rotate-2 w-2xs"
				>
					<h2 className="font-heading text-charcoal text-3xl">Test sheet 1 😏</h2>
					<p>I'm underneath the transparent desk pad!</p>
				</Sheet>
			</div>

			<Surface variant="tracing">{children}</Surface>
			<div className="absolute top-65 right-20 z-20">
				<Sheet
					pattern="dotruled"
					raised
					interactive
					className="-rotate-1 w-2xs"
				>
					<h2 className="font-heading text-charcoal text-3xl">Test sheet 2 😳</h2>
					<p>I'm on top of the transparent desk pad!</p>
				</Sheet>
			</div>
			<div className="absolute top-45 left-20 z-20">
				<StickyNote
					bgColor="bg-mild-yellow"
					interactive
					className="-rotate-3 w-2xs aspect-square"
				>
					<h2 className="font-heading text-charcoal text-3xl">Test stickynote 1 ✏️</h2>
					<p>I'm a stickynote, so I'm here for some important or temporary info!</p>
				</StickyNote>
			</div>
		</div>
	);
}
