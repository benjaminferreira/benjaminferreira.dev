/**
 * Navbar - a full-width navigation bar that hovers above the page.
 * Blurs content that scrolls beneath it.
 */

"use client";

import Link from "next/link";

/**
 * Nav items/locations
 */
const navItems = [
	{ label: "Projects", href: "#projects" },
	{ label: "About", href: "#about" },
	{ label: "Design System", href: "/sandbox" }, // TODO: update with real page
];

const linkClasses = "text-sm text-ink hover:text-pen-shinkai focus-visible:text-pen-shinkai active:text-charcoal";

/**
 * TODO
 *
 * @example
 * TODO
 */
export default function Navbar() {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xs bg-paper/70 border-b border-ink">
			<nav className="flex items-center justify-between px-5 py-3 md:px-8">
				<Link
					href="/"
					className="font-heading text-lg text-charcoal hover:opacity-80"
				>
					Benjamin Ferreira
				</Link>
				<ul className="flex items-center gap-6">
					{navItems.map((item) => (
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
							Dark Mode
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
