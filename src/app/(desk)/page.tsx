import portrait from "@/images/ben-ferreira-portrait.jpg";
import Image from "next/image";

export default function HomePage() {
	return (
		<div className="flex flex-col gap-6">
			{/* Hero/Intro Section */}
			<section
				id="intro"
				aria-labelledby="intro-heading"
				className="flex flex-col min-h-dvh gap-6 justify-center"
			>
				<div className="flex flex-col gap-8">
					<h1
						id="intro-heading"
						className="text-4xl md:text-7xl font-heading text-ink"
					>
						Benjamin Ferreira
					</h1>
					<div className="space-y-4">
						<Image
							src={portrait}
							alt=""
							priority
							placeholder="blur"
							sizes="(min-width: 768px) 18rem, 7rem"
							className="float-right mb-4 ml-4 w-28 rotate-2 md:mb-6 md:ml-8 md:w-72 md:rotate-3"
						/>

						<p className="text-lg md:text-xl text-ink">
							Senior software engineer specializing in front-end. Accessibility, design systems, and
							data-heavy product UI.
						</p>
						<p className="font-mono">A bit about me...</p>
					</div>
				</div>
			</section>
			<section className="space-y-4">
				<h2 className="text-2xl font-heading text-ink uppercase">Project #1:</h2>
				<p className="font-mono">[TEST CONTENT - PLACEHOLDER ONLY]</p>
				<p className="font-body">
					The Midnight Garden Observatory is an experimental platform for tracking bioluminescent fungi across
					temperate rainforests in the Pacific Northwest. Built during a series of particularly rainy
					weekends, the application allows field researchers to log sightings, upload spectral photographs,
					and cross-reference species data against a community-maintained database of over 12,000 catalogued
					organisms.
				</p>
				<p className="font-body">
					The core mapping interface renders terrain data in real-time, overlaying fungal colony density heat
					maps with seasonal rainfall patterns. Users can draw custom boundary polygons to define research
					zones, and the system automatically generates growth prediction models based on soil composition,
					canopy coverage, and ambient moisture levels collected from distributed sensor networks.
				</p>
				<p className="font-body">
					One of the more interesting technical challenges involved synchronizing offline field data with the
					central database when researchers returned to connectivity. The conflict resolution system uses a
					timestamp-based merge strategy with manual override capabilities for contested observations. This
					was particularly important during the 2024 autumn bloom season when multiple research teams were
					simultaneously documenting the same rare Panellus stipticus colonies.
				</p>
				<p className="font-body">
					The notification system sends weekly digest emails summarizing new sightings within a researcher's
					defined areas of interest, along with automatically generated statistical comparisons against
					historical data for the same geographic regions. A companion mobile application provides simplified
					logging capabilities with GPS-tagged photo capture and voice-to-text field notes for use during
					nighttime observation sessions when screen brightness must be minimized to avoid disturbing
					photosensitive specimens.
				</p>
			</section>
		</div>
	);
}
