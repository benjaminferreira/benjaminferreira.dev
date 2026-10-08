"use client";

import { sections, type SectionId } from "@/content/sections";
import { createContext, useContext, useState } from "react";

// Split into two: the paper stack only needs the setter so it doesn't re-render when activeid changes.
const ActiveIdContext = createContext<SectionId | null>(null);
const SetActiveIdContext = createContext<((id: SectionId) => void) | null>(null);

/**
 * Shares which homepage sheet is on the top.
 *      - Set by PaperStack and read by the Navbar.
 */
export function ActiveSheetProvider({ children }: { children: React.ReactNode }) {
	const [activeId, setActiveId] = useState<SectionId>(sections[0].id);

	return (
		<SetActiveIdContext value={setActiveId}>
			<ActiveIdContext value={activeId}>{children}</ActiveIdContext>
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
