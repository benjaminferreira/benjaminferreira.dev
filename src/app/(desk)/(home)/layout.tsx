import { restoreScript } from "@/components/paperStackRestore";

/**
 * Homepage-only layout that puts the scroll restore script ahead of the stack so it runs before painting.
 */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<script dangerouslySetInnerHTML={{ __html: restoreScript }} />
			{children}
		</>
	);
}
