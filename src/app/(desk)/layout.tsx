import Surface from "@/components/Surface";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function DeskLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* Header navbar */}
			<Navbar />
			{/* Main Sheet */}
			<Surface
				variant="paper"
				pattern="dotruled"
				texture="default"
				padding="p-0"
				pageTop
				className="min-h-dvh"
			>
				<main className="mx-auto max-w-5xl px-5 md:px-8">
					<div className="border-l-2 border-margin pl-3 md:pl-8">{children}</div>
				</main>
			</Surface>
		</>
	);
}
