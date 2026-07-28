import Canvas from "@/components/Canvas";

export default function NotebookLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-divider flex flex-col">
			{/* Tab Navigation - fixed to top */}
			<nav>{/* Your index tabs go here */}</nav>

			{/* Notebook Body */}
			<div className="flex flex-1 m-12 shadow-md rounded-r-2xl">
				{/* Binding edge (left) */}
				<aside className="bg-amber-200">
					{/* Stitches/spine visual */}
					<div
						className="pointer-events-none w-7 opacity-75 h-full"
						style={{
							backgroundImage: "url('/textures/lines.png')",
							backgroundSize: "6px",
						}}
					></div>
				</aside>

				{/* Page Content Area */}
				<Canvas
					variant="paper-md"
					texture="handmade"
					pattern="ruled"
					className="flex-1 rounded-r-2xl"
				>
					{children}
				</Canvas>

				{/* Page edge (right) - optional shadow/visual */}
			</div>

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
