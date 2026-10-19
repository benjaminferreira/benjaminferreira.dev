/**
 * Navbar - a full-width navigation bar that hovers above the page.
 * - Blurs content that scrolls beneath it.
 * - Has an active state dot indicator that animates.
 */

"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { sections } from "@/content/sections";
import { useActiveSheetId } from "@/components/ActiveSheet";
import { SunIcon, MoonStarsIcon } from "@phosphor-icons/react";

const linkClasses =
	"px-4 py-2.5 text-ink z-10 rounded-full hover:text-ink/80 focus-visible:text-ink/80 active:text-charcoal";

// bar look on every sheet after the hero
const solidBar = "backdrop-blur-xs bg-paper/70 border-ink";
// on the hero: see-through
const clearBar = "border-transparent";

/**
 * A full-width navigation bar fixed above the page. Links point at the homepage sheets
 * (PaperStack handles the scrolling) and a dot sits under whichever sheet is on top.
 * The bar is see-through while the hero sheet is on top and blurs in for every sheet after it.
 *
 * @example
 * <ActiveSheetProvider>
 *   <Navbar />
 *   <main>{children}</main>
 * </ActiveSheetProvider>
 */
export default function Navbar() {
	const reduce = useReducedMotion();
	const activeId = useActiveSheetId();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const onHero = activeId === sections[0].id;

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 py-1 px-1 border-b border-dashed motion-safe:transition-[background-color,border-color,backdrop-filter] motion-safe:duration-200 ${onHero ? clearBar : solidBar}`}
		>
			<nav className="flex items-center justify-between h-full whitespace-nowrap">
				<a
					href="#intro"
					draggable={false}
					className="font-heading text-lg text-charcoal px-4 py-2.5"
				>
					Benjamin Ferreira
				</a>
				<ul className="flex items-center">
					{sections.map((s) => (
						<li
							key={s.id}
							className="relative flex flex-col items-center"
						>
							<a
								href={`#${s.id}`}
								draggable={false}
								className={linkClasses}
							>
								{s.label}
							</a>
							{/* motion-powered active dot marker span beneath the active nav item */}
							{activeId === s.id && (
								<motion.span
									layoutId="active-dot"
									transition={
										reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }
									}
									className="absolute bottom-1 h-2 w-2 rounded-full border border-ink"
									style={{ backgroundColor: `var(--color-accent-${s.accent})` }}
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
