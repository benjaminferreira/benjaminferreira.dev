/**
 * Navbar - a full-width navigation bar that hovers above the page.
 * - Blurs content that scrolls beneath it.
 * - Has an active state dot indicator that animates.
 */

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

/**
 * Nav links (non-title/icons)
 */
const navLinks = [
	{ label: "Home", href: "#", colorClass: "bg-paper-md-dark/70" },
	{ label: "Projects", href: "#projects", colorClass: "bg-dot-grey/70" },
	{ label: "About", href: "#about", colorClass: "bg-margin/70" },
	{ label: "Design System", href: "#design-system", colorClass: "bg-dot-blue/70" }, // TODO: update with real page
];

const linkClasses =
	"text-base px-4 py-2.5 text-ink z-10 rounded-xl hover:text-ink/80 focus-visible:text-ink/80 active:text-charcoal";

/**
 * TODO
 *
 * @example
 * TODO
 */
export default function Navbar() {
	const reduce = useReducedMotion();
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 py-1 px-1 backdrop-blur-xs bg-paper/70 border-b border-ink">
			<nav className="flex items-center justify-between h-full">
				<a
					href="#"
					draggable={false}
					className="font-heading text-lg text-charcoal px-4 py-2.5"
				>
					Benjamin Ferreira
				</a>
				<ul className="flex items-center">
					{navLinks.map((item, i) => (
						<li
							key={item.href}
							className="relative flex flex-col items-center"
						>
							{item.href.startsWith("#") ? (
								<a
									href={item.href}
									draggable={false}
									onClick={() => setActiveIndex(i)}
									className={linkClasses}
								>
									{item.label}
								</a>
							) : (
								<Link
									href={item.href}
									draggable={false}
									onClick={() => setActiveIndex(i)}
									className={linkClasses}
								>
									{item.label}
								</Link>
							)}
							{/* motion-powered active dot marker span beneath the active nav item */}
							{activeIndex === i && (
								<motion.span
									layoutId="active-dot"
									transition={
										reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }
									}
									className={`absolute bottom-1 h-8.5 w-8.5 rounded-[1000px] ${item.colorClass}`}
								/>
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
