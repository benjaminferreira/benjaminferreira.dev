import Navbar from "@/components/Navbar";
import { ActiveSheetProvider } from "@/components/ActiveSheet";

export default function DeskLayout({ children }: { children: React.ReactNode }) {
	return (
		<ActiveSheetProvider>
			{/* Header navbar */}
			<Navbar />
			<main>{children}</main>
		</ActiveSheetProvider>
	);
}
