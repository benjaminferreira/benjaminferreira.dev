import Canvas from "@/components/Canvas";
import Sheet from "@/components/Sheet";

export default function NotebookLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-desk-oak relative min-h-screen">
			<div className="absolute top-20 right-20">
				<Sheet
					pattern="dotruled"
					className="rotate-2 w-2xs"
				>
					<h2 className="font-heading text-charcoal text-3xl">Test note 1 😏</h2>
					<p>I'm underneath the transparent desk pad!</p>
				</Sheet>
			</div>

			<Canvas variant="tracing">{children}</Canvas>
			<div className="absolute top-65 right-20 z-20">
				<Sheet
					pattern="dotruled"
					className="-rotate-1 w-2xs"
					raised
					interactive
				>
					<h2 className="font-heading text-charcoal text-3xl">Test note 2 😳</h2>
					<p>I'm on top of the transparent desk pad!</p>
				</Sheet>
			</div>
		</div>
	);
}
