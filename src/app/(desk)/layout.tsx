import Surface from "@/components/Surface";
import Link from "next/link";

export default function DeskLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{/* Header navbar */}
			<header className="fixed top-0 z-50">
				<Link href="/">Benjamin Ferreira</Link>
				<Link href="/sandbox">Sandbox</Link>
				<Link href="/sandbox/skeleton">Skeleton Test</Link>
			</header>
			{/* Main Sheet */}
			<Surface
				variant="paper"
				pattern="dotruled"
				texture="default"
				padding="p-0"
				className="min-h-dvh"
			>
				<main className="mx-auto max-w-4xl px-6">{children}</main>
			</Surface>
		</>
	);
}
