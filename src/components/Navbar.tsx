/**
 * Navbar - a full-width navigation bar that hovers above the page.
 * - Blurs content that scrolls beneath it.
 * - Has an active state dot indicator that animates.
 */

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { SunIcon, MoonStarsIcon } from "@phosphor-icons/react";

/**
 * Nav links (non-title/icons)
 */
const navLinks = [
	{ label: "Home", href: "#", colorClass: "bg-mild-yellow" },
	{ label: "Projects", href: "#projects", colorClass: "bg-mild-green" },
	{ label: "About", href: "#about", colorClass: "bg-mild-pink" },
	{ label: "Design System", href: "#design-system", colorClass: "bg-mild-blue" }, // TODO: update with real page
];

const linkClasses =
	"px-4 py-2.5 text-ink z-10 rounded-full hover:text-ink/80 focus-visible:text-ink/80 active:text-charcoal";

/**
 * TODO
 *
 * @example
 * TODO
 */
export default function Navbar() {
	const reduce = useReducedMotion();
	const [activeIndex, setActiveIndex] = useState(0);
	const [isDarkMode, setIsDarkMode] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 z-50 py-1 px-1 backdrop-blur-xs bg-paper/70 border-b border-ink">
			<nav className="flex items-center justify-between h-full">
				<a
					href="#"
					draggable={false}
					onClick={() => setActiveIndex(0)}
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
										reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }
									}
									className={`absolute bottom-1 h-2 w-2 rounded-full border border-ink ${item.colorClass}`}
								/>
							)}
						</li>
					))}
					{/* dark-mode toggle placeholder */}
					<li className="px-1.5">
						<button
							type="button"
							aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
							title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"} // TODO - placeholder until we implement themed hocus tooltips
							onClick={() => setIsDarkMode(!isDarkMode)}
							className="text-base px-2.5 py-2.5 text-ink z-10 rounded-full cursor-pointer hover:text-ink/80 focus-visible:text-ink/80 active:text-charcoal"
						>
							{isDarkMode ? (
								<SunIcon
									size={26}
									weight="light"
								/>
							) : (
								<MoonStarsIcon
									size={26}
									weight="light"
								/>
							)}
						</button>
					</li>
				</ul>
			</nav>
		</header>
	);
}
