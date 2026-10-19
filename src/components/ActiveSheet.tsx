"use client";

import { sections, type SectionId } from "@/content/sections";
import { createContext, useContext, useState } from "react";

// Split into two: the paper stack only needs the setter so it doesn't re-render when activeid changes.
const ActiveIdContext = createContext<SectionId | null>(null);
const SetActiveIdContext = createContext<((id: SectionId) => void) | null>(null);
const OnHeroContext = createContext<boolean | null>(null);
const SetOnHeroContext = createContext<((onHero: boolean) => void) | null>(null);

/**
 * Shares which homepage sheet is on the top.
 *      - Set by PaperStack and read by the Navbar.
 */
export function ActiveSheetProvider({ children }: { children: React.ReactNode }) {
	const [activeId, setActiveId] = useState<SectionId>(sections[0].id);
	const [onHero, setOnHero] = useState(true);

	return (
		<SetActiveIdContext value={setActiveId}>
			<SetOnHeroContext value={setOnHero}>
				<ActiveIdContext value={activeId}>
					<OnHeroContext value={onHero}>{children}</OnHeroContext>
				</ActiveIdContext>
			</SetOnHeroContext>
		</SetActiveIdContext>
	);
}

/**
 * ID of the sheet currently on top
 */
export function useActiveSheetId() {
	const id = useContext(ActiveIdContext);
	if (id === null) {
		throw new Error("useActiveSheetId needs ActiveSheetProvider");
	}
	return id;
}

/**
 * Stable setter for the active sheet (the useState setter doesn't change)
 */
export function useSetActiveSheet() {
	const set = useContext(SetActiveIdContext);
	if (!set) {
		throw new Error("useSetActiveSheet needs ActiveSheetProvider");
	}
	return set;
}

/**
 * Whether the hero sheet is what's actually on screen (ignores the nav click lock)
 */
export function useOnHero() {
	const onHero = useContext(OnHeroContext);
	if (onHero === null) {
		throw new Error("useOnHero needs ActiveSheetProvider");
	}
	return onHero;
}

/**
 * Stable setter for useOnHero (the useState setter doesn't change)
 */
export function useSetOnHero() {
	const set = useContext(SetOnHeroContext);
	if (!set) {
		throw new Error("useSetOnHero needs ActiveSheetProvider");
	}
	return set;
}
