export default function HomePage() {
	return (
		<div className="space-y-8 max-w-lg mx-auto">
			<section className="space-y-6">
				<h1 className="text-5xl font-heading text-ink">Hello!</h1>
				<h2 className="text-3xl font-heading text-ink">
					My name is{" "}
					<span className="relative z-0 inline-block after:content-[''] after:absolute after:bottom-1 after:-left-0.5 after:w-0 hover:after:w-[calc(100%+4px)] after:h-5/7 after:bg-mild-yellow/70 after:-rotate-1 after:-z-10 after:transition-all after:duration-1000">
						Benjamin Ferreira
					</span>{" "}
					.
				</h2>
				<p className="font-mono">A bit about me...</p>
			</section>
			<section className="space-y-4">
				<h3 className="text-2xl font-heading text-ink uppercase">Project #1:</h3>
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
