import Canvas from "@/components/Canvas";

export default function NotebookLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-birch flex flex-col">
			{/* Notebook Area */}
			<main className="h-screen py-8 px-4 sm:px-12 min-h-0">
				{/* Notebook Itself (the content) */}
				<article className="h-full max-w-4xl mx-auto flex flex-col">
					{/* Tab Navigation - index tabs fixed to top of notebook */}
					<nav></nav>

					{/* Notebook Body */}
					<section className="flex flex-1 min-h-0 shadow-md rounded-r-2xl">
						{/* Binding edge (left) */}
						<aside className="bg-amber-200 shadow-[1px_0_6px_-1px_rgba(0,0,0,0.06)] z-20">
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
				{/* Stitch line - recessed channel */}
				<div
					className="h-2 bg-paper-md-dark"
					style={{
						backgroundImage:
							"repeating-linear-gradient(90deg, var(--color-paper-md) 0px, var(--color-paper-md) 10px, transparent 8px, transparent 16px)",
						backgroundSize: "16px 1px",
						backgroundRepeat: "repeat-x",
						backgroundPosition: "center bottom",
					}}
				/>

				{/* Pad surface - puffs up above the stitching */}
				<Canvas
					variant="paper-md"
					texture="leather"
					padding="p-0"
					className="relative shadow-[0_-4px_6px_-2px_rgba(0,0,0,0.1)]"
				>
					<div
						className="absolute top-0 left-0 right-0 h-5 pointer-events-none z-20"
						style={{
							background:
								"linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.04) 50%, transparent 100%)",
						}}
					/>
					<div className="py-5 grid grid-cols-3 place-items-center tracking-wider text-sm text-graphite-2b">
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
