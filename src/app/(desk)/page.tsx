"use client";

import Button from "@/components/Button";
import { HighlightGroup, HighlightText } from "@/components/HighlightGroup";
import portrait from "@/images/ben-ferreira-portrait.jpg";
import Image from "next/image";
import { useRef } from "react";
import { useInView } from "motion/react";

export default function HomePage() {
	const boxRef = useRef<HTMLDivElement>(null);
	const boxInView = useInView(boxRef, { once: true, margin: "-20% 0px" });

	return (
		<div className="flex flex-col gap-6">
			{/* Hero/Intro Section */}
			<HighlightGroup>
				<section
					id="intro"
					aria-labelledby="intro-heading"
					className="flex flex-col min-h-dvh gap-6 justify-center"
				>
					<div className="flex flex-col gap-8">
						<h1
							id="intro-heading"
							className="text-4xl md:text-7xl font-heading text-charcoal"
						>
							<HighlightText>Benjamin Ferreira</HighlightText>
						</h1>
						<div className="space-y-4">
							<Image
								src={portrait}
								alt=""
								priority
								placeholder="blur"
								sizes="(min-width: 768px) 18rem, 7rem"
								className="float-right mb-4 ml-4 w-28 rotate-1 md:mb-6 md:ml-8 md:w-72 md:rotate-2"
							/>

							<p className="text-lg md:text-xl text-ink">
								Senior software engineer specializing in{" "}
								<HighlightText color="var(--color-mild-blue)">front-end</HighlightText>. Accessibility,{" "}
								<HighlightText color="var(--color-mild-blue)">design systems</HighlightText>, and
								data-heavy product UI.
							</p>
							<div className="flex flex-wrap gap-4">
								<Button href="#projects">View projects</Button>
								<Button
									download
									variant="secondary"
								>
									Download resume
								</Button>
							</div>
						</div>
					</div>
				</section>
			</HighlightGroup>
			<section
				id="projects"
				className="space-y-4"
			>
				<div className="flex justify-between">
					<h2 className="text-3xl font-heading text-charcoal uppercase">Project #1:</h2>
					<span
						ref={boxRef}
						data-shaded={boxInView || undefined}
						className="border border-ink highlight-shade [--stroke-color:var(--color-mild-blue)] [--stroke-w:0.5rem] [--stroke-draw:400ms] p-6 w-sm"
					>
						This project has some details you're going to want to see! Take a look in this highlighted,
						drawn-looking box for more details.
					</span>
				</div>
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
