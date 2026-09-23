/**
 * Navbar - a full-width navigation bar that hovers above the page.
 * - Blurs content that scrolls beneath it.
 * - Has an active state dot indicator that animates.
 */

"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SunIcon, MoonStarsIcon } from "@phosphor-icons/react";

/**
 * Nav links (non-title/icons)
 */
const navLinks = [
	{ label: "Intro", href: "#intro", colorClass: "bg-mild-yellow" },
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
	const observerRef = useRef<IntersectionObserver | null>(null);
	const isClickScrolling = useRef(false);

	// Hook to set active index state on scroll location
	useEffect(() => {
		// Parse section names from navLinks
		const sectionIds = navLinks.map((item) => item.href.replace("#", ""));

		// Get list of HTML section elements from the DOM
		const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];

		// Create intersection observer
		const io = new IntersectionObserver(
			(entries) => {
				// If the user clicked on a nav link, ignore changes while scrolling to that section
				if (isClickScrolling.current) return;

				// Loop through each change and set active index when isIntersecting
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const index = sectionIds.indexOf(entry.target.id);
						if (index !== -1) {
							setActiveIndex(index);
						}
					}
				}
			},
			{ rootMargin: "-40% 0px -55% 0px" },
		);

		sections.forEach((el) => io.observe(el));
		observerRef.current = io;
		return () => io.disconnect();
	}, []);

	/**
	 * Navbar item click handler - updates scroll location and active index
	 * @param i index of navbar item clicked
	 */
	const handleNavClick = (i: number, e: React.MouseEvent) => {
		e.preventDefault();
		setActiveIndex(i);
		isClickScrolling.current = true;

		// Smooth scroll on nav item click
		if (i === 0) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		} else {
			const id = navLinks[i].href.replace("#", "");
			document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		}

		setTimeout(() => {
			isClickScrolling.current = false;
		}, 800);
	};

	return (
		<header className="fixed top-0 left-0 right-0 z-50 py-1 px-1 backdrop-blur-xs bg-paper/70 border-b border-ink">
			<nav className="flex items-center justify-between h-full whitespace-nowrap">
				<a
					href="#intro"
					draggable={false}
					onClick={(e) => handleNavClick(0, e)}
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
									onClick={(e) => handleNavClick(i, e)}
									className={linkClasses}
								>
									{item.label}
								</a>
							) : (
								<Link
									href={item.href}
									draggable={false}
									onClick={(e) => handleNavClick(i, e)}
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
