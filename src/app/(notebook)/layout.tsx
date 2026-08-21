import Surface from "@/components/Surface";
import Sheet from "@/components/Sheet";
import StickyNote from "@/components/StickyNote";

export default function NotebookLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-desk-cork relative min-h-screen">
			<Sheet
				pattern="dotruled"
				className="rotate-2 w-2xs absolute top-20 right-20"
			>
				<h2 className="font-heading text-charcoal text-3xl">Test sheet 1 😏</h2>
				<p>I'm underneath the transparent desk pad!</p>
			</Sheet>

			<Surface
				variant="tracing"
				pattern="dotgrid"
				className="min-h-screen"
			>
				<Sheet
					variant="paper-md"
					pattern="grid"
					texture="grain"
					padding="p-20"
					className="max-w-2xl mx-auto"
				>
					{children}
				</Sheet>
			</Surface>
			<Sheet
				pattern="dotruled"
				raised
				interactive
				className="-rotate-1 w-2xs absolute top-65 right-20 z-20"
			>
				<h2 className="font-heading text-charcoal text-3xl">Test sheet 2 😳</h2>
				<p>I'm on top of the transparent desk pad!</p>
			</Sheet>
			<div className="absolute top-45 left-20 z-20 -rotate-3">
				<StickyNote
					format="standard"
					bgColor="bg-mild-yellow"
					interactive
				>
					<h2 className="font-heading text-charcoal text-3xl">Test stickynote 1 ✏️</h2>
					<br></br>
					<p className="text-xl">I'm a stickynote, so I'm here for some important or temporary info!</p>
				</StickyNote>
			</div>
			<div className="absolute top-145 left-26 z-20 rotate-1">
				<StickyNote
					format="small"
					bgColor="bg-mild-pink"
					padding="p-4"
					interactive
				>
					<h2 className="font-heading text-charcoal text-3xl">stickynote2</h2>
					<br></br>
					<p>I'm a smaller stickynote... but I can still be here 🐞</p>
				</StickyNote>
			</div>
		</div>
	);
}
