import Canvas from "@/components/Canvas";

export default function NotebookLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-divider flex flex-col p-12">
			{/* Tab Navigation - fixed to top */}
			<nav>{/* Your index tabs go here */}</nav>

			{/* Notebook Body */}
			<div className="flex flex-1">
				{/* Binding edge (left) */}
				<aside className="bg-amber-200">
					{/* Stitches/spine visual */}
					<div
						className="pointer-events-none w-7 opacity-75 h-full"
						style={{
							backgroundImage: "url('/textures/lines.png')",
							backgroundSize: "4px",
						}}
					></div>
				</aside>

				{/* Page Content Area */}
				<Canvas
					variant="paper-md"
					pattern="ruled"
					raised
					className="flex-1 rounded-r-2xl"
				>
					{children}
				</Canvas>

				{/* Page edge (right) - optional shadow/visual */}
			</div>

			{/* Footer - back cover */}
			<footer>{/* Colophon content */}</footer>
		</div>
	);
}
