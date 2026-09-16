"use client";

import Button from "@/components/Button";
import WashiTape from "@/components/WashiTape";
import { HighlightBox, HighlightGroup, HighlightText } from "@/components/HighlightGroup";
import portrait from "@/images/ben-ferreira-portrait.jpg";
import Image from "next/image";

export default function HomePage() {
	return (
		<div className="flex flex-col gap-6">
			{/* Hero/Intro Section */}
			<HighlightGroup>
				<section
					id="intro"
					aria-labelledby="intro-heading"
					className="flex flex-col min-h-dvh gap-8 justify-center"
				>
					<div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-12">
						<div className="@container min-w-0 flex flex-col gap-8 md:gap-12 md:flex-1">
							<div className="flex flex-col gap-4">
								<h1
									id="intro-heading"
									className="text-display-fluid whitespace-nowrap font-heading text-charcoal"
								>
									<HighlightText>Benjamin Ferreira</HighlightText>
								</h1>
								<p className="text-base md:text-xl text-ink">
									Senior software engineer specializing in front-end. I make complex, data-heavy
									software <HighlightText color="var(--color-mild-blue)">intuitive</HighlightText> and{" "}
									<HighlightText color="var(--color-mild-pink)">accessible</HighlightText>.
								</p>
							</div>
							<WashiTape>Test label on a full sized washi tape strip... </WashiTape>
							<div className="grid grid-cols-2 gap-3 md:flex md:gap-4 flex-wrap">
								<Button href="#projects">View projects</Button>
								<Button
									download
									variant="secondary"
								>
									Download resume
								</Button>
							</div>
						</div>
						<div className="flex justify-center rotate-0 md:w-80 md:rotate-1 md:flex-none md:justify-end">
							<Image
								src={portrait}
								alt=""
								priority
								placeholder="blur"
								sizes="(min-width: 768px) 20rem, 66vw"
								className="h-auto w-full"
							/>
						</div>
					</div>
				</section>
			</HighlightGroup>
			<HighlightGroup>
				<section
					id="projects"
					className="space-y-4"
				>
					<div className="flex justify-between gap-4">
						<h2 className="text-3xl font-heading text-charcoal uppercase">
							<HighlightText color="var(--color-mild-green)">Project #1:</HighlightText>
						</h2>
						<HighlightBox
							color="var(--color-mild-green)"
							className="p-6 w-sm"
						>
							This project has some details you're going to want to see! Take a look in this highlighted,
							drawn-looking box for more details.
						</HighlightBox>
					</div>
					<p className="font-mono">[TEST CONTENT - PLACEHOLDER ONLY]</p>
					<p className="font-body">
						The Midnight Garden Observatory is an experimental platform for tracking bioluminescent fungi
						across temperate rainforests in the Pacific Northwest. Built during a series of particularly
						rainy weekends, the application allows field researchers to log sightings, upload spectral
						photographs, and cross-reference species data against a community-maintained database of over
						12,000 catalogued organisms.
					</p>
					<p className="font-body">
						The core mapping interface renders terrain data in real-time, overlaying fungal colony density
						heat maps with seasonal rainfall patterns. Users can draw custom boundary polygons to define
						research zones, and the system automatically generates growth prediction models based on soil
						composition, canopy coverage, and ambient moisture levels collected from distributed sensor
						networks.
					</p>
					<p className="font-body">
						One of the more interesting technical challenges involved synchronizing offline field data with
						the central database when researchers returned to connectivity. The conflict resolution system
						uses a timestamp-based merge strategy with manual override capabilities for contested
						observations. This was particularly important during the 2024 autumn bloom season when multiple
						research teams were simultaneously documenting the same rare Panellus stipticus colonies.
					</p>
					<p className="font-body">
						The notification system sends weekly digest emails summarizing new sightings within a
						researcher's defined areas of interest, along with automatically generated statistical
						comparisons against historical data for the same geographic regions. A companion mobile
						application provides simplified logging capabilities with GPS-tagged photo capture and
						voice-to-text field notes for use during nighttime observation sessions when screen brightness
						must be minimized to avoid disturbing photosensitive specimens.
					</p>
				</section>
			</HighlightGroup>
		</div>
	);
}
