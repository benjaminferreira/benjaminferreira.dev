/**
 * Navbar - a full-width navigation bar that hovers above the page.
 * Blurs content that scrolls beneath it.
 */

"use client";

import Link from "next/link";

/**
 * Nav links (non-title/icons)
 */
const navLinks = [
	{ label: "Projects", href: "#projects" },
	{ label: "About", href: "#about" },
	{ label: "Design System", href: "/sandbox" }, // TODO: update with real page
];

const linkClasses =
	"text-sm px-4 py-2.5 text-ink hover:text-pen-shinkai focus-visible:text-pen-shinkai active:text-charcoal";

/**
 * TODO
 *
 * @example
 * TODO
 */
export default function Navbar() {
	return (
		<header className="fixed top-0 left-0 right-0 h-13.25 z-50 px-1 backdrop-blur-xs bg-paper/70 border-b border-ink">
			<nav className="flex items-center justify-between h-full">
				<Link
					href="/"
					className="font-heading text-lg text-charcoal px-4 py-2"
				>
					Benjamin Ferreira
				</Link>
				<ul className="flex items-center">
					{navLinks.map((item) => (
						<li key={item.href}>
							{item.href.startsWith("#") ? (
								<a
									href={item.href}
									className={linkClasses}
								>
									{item.label}
								</a>
							) : (
								<Link
									href={item.href}
									className={linkClasses}
								>
									{item.label}
								</Link>
							)}
						</li>
					))}
					{/* dark-mode toggle placeholder */}
					<li>
						<button
							type="button"
							className={linkClasses}
						>
							🌙
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
