/**
 * Homepage sections in stack order. Main page and Navbar both read from this, so they stay synced.
 */
export const sections = [
	{ id: "intro", label: "Intro", accent: 1 },
	{ id: "projects", label: "Projects", accent: 2 },
	{ id: "about", label: "About", accent: 3 },
	{ id: "design-system", label: "Design System", accent: 4 },
] as const;

export type SectionId = (typeof sections)[number]["id"];
