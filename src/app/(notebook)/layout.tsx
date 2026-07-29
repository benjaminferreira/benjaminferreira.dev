import Canvas from "@/components/Canvas";

export default function NotebookLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen bg-divider flex flex-col">
			{/* Notebook Area */}
			<main className="flex-1 py-8 px-4 sm:px-12 min-h-0">
				{/* Notebook Itself (the content) */}
				<article className="h-full max-w-4xl mx-auto flex flex-col">
					{/* Tab Navigation - index tabs fixed to top of notebook */}
					<nav></nav>

					{/* Notebook Body */}
					<section className="flex flex-1 min-h-0 shadow-md rounded-r-2xl">
						{/* Binding edge (left) */}
						<aside className="bg-amber-200 shadow-[2px_0_6px_-1px_rgba(0,0,0,0.06)] z-20">
							{/* Stitches/spine visual */}
							<div
								className="pointer-events-none w-7 opacity-75 h-full"
								style={{
									backgroundImage: "url('/textures/lines.png')",
									backgroundSize: "6px",
								}}
							></div>
						</aside>

						{/* Canvas: Notebook Page */}
						<Canvas
							variant="paper-md"
							texture="handmade"
							pattern="dotruled"
							scrollable
							className="flex-1 rounded-r-2xl"
						>
							{children}
						</Canvas>
					</section>
				</article>
			</main>

			{/* Footer - back cover or leather pad or something */}
			<footer>
				<Canvas
					variant="paper-md"
					texture="leather"
				>
					<div className="grid grid-cols-3 place-items-center tracking-wider text-sm text-graphite-2b">
						<div className="flex-col">
							<div>Contact me!</div>
							<div>This</div>
							<div>Is</div>
							<div>Test</div>
						</div>
						<div className="flex-col">
							<div>Data to</div>
							<div>Show how</div>
							<div>A footer</div>
							<div>Might look</div>
						</div>
						<div className="flex-col">
							<div>Like.</div>
							<div>Subscribe.</div>
							<div>Follow.</div>
							<div>Heart.</div>
						</div>
					</div>
				</Canvas>
			</footer>
		</div>
	);
}
