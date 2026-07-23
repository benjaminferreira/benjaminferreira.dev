import React from "react";
import Canvas from "@/components/Canvas";

export default function page() {
	return (
		<main className="p-8 bg-divider space-y-12">
			<h1 className="text-3xl font-heading text-ink">Design Sandbox</h1>

			{/* ===== SECTION: Typography System ===== */}
			<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Canvas Component Test</h2>
			<Canvas
				variant="paper"
				texture="grain"
				pattern="grid"
				padding="p-10"
				rounded
				raised
			>
				<div className="space-y-6">
					<div>
						<p className="text-xs text-graphite-hb mb-1">Heading - Instrument Serif</p>
						<p className="text-4xl font-heading text-ink">Benjamin Ferreira - Portfolio / Design System</p>
					</div>
					<div>
						<p className="text-xs text-graphite-hb mb-1">Body - Work Sans</p>
						<p className="text-base font-body text-ink">
							Working on building my own design system, creating UI components themed after Japanese
							stationery. Should be fun :)
						</p>
					</div>
					<div>
						<p className="text-xs text-graphite-hb mb-1">Mono - Fira Code</p>
						<p className="text-sm font-mono text-ink">
							const theme = &quot;stationery&quot;; // 0O1lI =&gt; !=={" "}
						</p>
					</div>
				</div>
			</Canvas>

			<section className="bg-white p-8 space-y-8 rounded">
				{/* ===== SECTION: Color Palette - Main ===== */}
				<section className="space-y-2">
					<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">
						Color Palette - Paper & Canvas{" "}
						<span className="normal-case font-mono text-[10px] text-graphite-hb/60">
							--color-{"{name}"}
						</span>
					</h2>
					<div className="flex gap-4 flex-wrap">
						<div className="w-24 h-24 bg-paper rounded border border-ink/10 flex items-end p-2">
							<span className="text-xs text-graphite-hb">Paper</span>
						</div>
						<div className="w-24 h-24 bg-divider rounded flex items-end p-2">
							<span className="text-xs text-graphite-hb">Divider</span>
						</div>
						<div className="w-24 h-24 bg-kraft rounded flex items-end p-2">
							<span className="text-xs text-graphite-hb">Kraft</span>
						</div>
						<div className="w-24 h-24 bg-tracing rounded border border-ink/10 flex items-end p-2">
							<span className="text-xs text-graphite-hb">Tracing</span>
						</div>
						<div className="w-24 h-24 bg-ink rounded flex items-end p-2">
							<span className="text-xs text-paper">Ink</span>
						</div>
						<div className="w-24 h-24 bg-charcoal rounded flex items-end p-2">
							<span className="text-xs text-paper">Charcoal</span>
						</div>
					</div>
				</section>

				{/* ===== SECTION: Color Palette - Graphite ===== */}
				<section className="space-y-2">
					<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">
						Color Palette - Graphite (Text & Borders){" "}
						<span className="normal-case font-mono text-[10px] text-graphite-hb/60">
							--color-graphite-{"{grade}"}
						</span>
					</h2>
					<div className="flex gap-4 flex-wrap">
						<div className="w-24 h-24 bg-graphite-2b rounded flex items-end p-2">
							<span className="text-xs text-paper">2B Pencil</span>
						</div>
						<div className="w-24 h-24 bg-graphite-hb rounded flex items-end p-2">
							<span className="text-xs text-paper">HB Pencil</span>
						</div>
						<div className="w-24 h-24 bg-graphite-guide rounded border border-ink/10 flex items-end p-2">
							<span className="text-xs text-graphite-2b">Mech Guide</span>
						</div>
					</div>
				</section>

				{/* ===== SECTION: Color Palette - Fountain Pen Inks ===== */}
				<section className="space-y-2">
					<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">
						Color Palette - Fountain Pen Inks (Actions){" "}
						<span className="normal-case font-mono text-[10px] text-graphite-hb/60">
							--color-pen-{"{name}"}
						</span>
					</h2>
					<div className="flex gap-4 flex-wrap">
						<div className="w-24 h-24 bg-pen-shinkai rounded flex items-end p-2">
							<span className="text-xs text-paper">Shin-kai</span>
						</div>
						<div className="w-24 h-24 bg-pen-tsutsuji rounded flex items-end p-2">
							<span className="text-xs text-paper">Tsutsuji</span>
						</div>
						<div className="w-24 h-24 bg-pen-kujaku rounded flex items-end p-2">
							<span className="text-xs text-paper">Ku-jaku</span>
						</div>
					</div>
				</section>

				{/* ===== SECTION: Color Palette - Structure/Grid ===== */}
				<section className="space-y-2">
					<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">
						Color Palette - Structure/Grid{" "}
						<span className="normal-case font-mono text-[10px] text-graphite-hb/60">
							--color-{"{name}"}
						</span>
					</h2>
					<div className="flex gap-4 flex-wrap">
						<div className="w-24 h-24 bg-dot-grey rounded border border-ink/10 flex items-end p-2">
							<span className="text-xs text-graphite-hb">Dot Grey</span>
						</div>
						<div className="w-24 h-24 bg-dot-blue rounded border border-ink/10 flex items-end p-2">
							<span className="text-xs text-graphite-hb">Dot Blue</span>
						</div>
						<div className="w-24 h-24 bg-margin rounded flex items-end p-2">
							<span className="text-xs text-graphite-hb">Margin</span>
						</div>
						<div className="w-24 h-24 bg-lines rounded border border-ink/10 flex items-end p-2">
							<span className="text-xs text-graphite-hb">Lines</span>
						</div>
						<div className="w-24 h-24 bg-grid rounded border border-ink/10 flex items-end p-2">
							<span className="text-xs text-graphite-hb">Grid</span>
						</div>
					</div>
				</section>

				{/* ===== SECTION: Color Palette - Accents ===== */}
				<section className="space-y-2">
					<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">
						Color Palette - Mildliner Accents{" "}
						<span className="normal-case font-mono text-[10px] text-graphite-hb/60">
							--color-mild-{"{name}"}
						</span>
					</h2>
					<div className="flex gap-4 flex-wrap">
						<div className="w-24 h-24 bg-mild-pink rounded flex items-end p-2">
							<span className="text-xs text-ink">Mild Pink</span>
						</div>
						<div className="w-24 h-24 bg-mild-blue rounded flex items-end p-2">
							<span className="text-xs text-ink">Mild Blue</span>
						</div>
						<div className="w-24 h-24 bg-mild-yellow rounded flex items-end p-2">
							<span className="text-xs text-ink">Mild Yellow</span>
						</div>
						<div className="w-24 h-24 bg-mild-grey rounded flex items-end p-2">
							<span className="text-xs text-ink">Mild Grey</span>
						</div>
					</div>
				</section>
			</section>

			{/* ===== SECTION: Buttons ===== */}
			<section className="space-y-2">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Button Variants</h2>
				<Canvas
					pattern="dotgrid"
					padding="p-6"
					raised
				>
					<div className="flex gap-3 flex-wrap">
						<button className="px-4 py-2 rounded-md bg-pen-shinkai text-paper text-sm font-medium">
							Navigate
						</button>
						<button className="px-4 py-2 rounded-md bg-pen-tsutsuji text-paper text-sm font-medium">
							Submit
						</button>
						<button className="px-4 py-2 rounded-md bg-pen-kujaku text-paper text-sm font-medium">
							Save
						</button>
						<button className="px-4 py-2 rounded-md border border-graphite-guide text-ink text-sm font-medium">
							Cancel
						</button>
					</div>
				</Canvas>
			</section>

			{/* ===== SECTION: Highlighted Headings/Text ===== */}
			<section className="space-y-2">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Highlighted Headings/Text</h2>
				<Canvas
					pattern="ruled"
					padding="p-6"
					raised
				>
					<div className="space-y-8">
						<div>
							<p className="text-xs text-graphite-hb mb-2">Option 1: Inline span with bg</p>
							<h3 className="text-4xl font-heading text-ink">
								<span className="bg-mild-yellow/70 px-1">Heading Example</span>
							</h3>
							<p className="text-base text-ink mt-2">
								This is a section of body text with a{" "}
								<span className="bg-mild-yellow/70 px-1">highlighted phrase</span> inside it.
							</p>
						</div>
						<div>
							<p className="text-xs text-graphite-hb mb-2">Option 2: Inset box-shadow underline</p>
							<h3 className="text-4xl font-heading text-ink">
								<span className="shadow-[inset_0_-0.25em_0_var(--color-mild-yellow)]">
									Heading Example
								</span>
							</h3>
							<p className="text-base text-ink mt-2">
								This is a section of body text with a{" "}
								<span className="shadow-[inset_0_-0.25em_0_var(--color-mild-yellow)]">
									highlighted phrase
								</span>{" "}
								inside it.
							</p>
						</div>
						<div>
							<p className="text-xs text-graphite-hb mb-2">
								Option 3: ::after pseudo-element (rotated bar)
							</p>
							<h3 className="text-4xl font-heading text-ink">
								<span className="relative z-0 inline-block after:content-[''] after:absolute after:bottom-1 after:-left-0.5 after:w-[calc(100%+4px)] after:h-5/7 after:bg-mild-yellow/70 after:-rotate-1 after:-z-10">
									Heading Example
								</span>
							</h3>
							<p className="text-base text-ink mt-2">
								This is a section of body text with a{" "}
								<span className="relative z-0 inline-block after:content-[''] after:absolute after:bottom-1 after:-left-0.5 after:w-[calc(100%+4px)] after:h-5/7 after:bg-mild-yellow/70 after:-rotate-1 after:-z-10">
									highlighted phrase
								</span>{" "}
								inside it.
							</p>
						</div>
						<div>
							<p className="text-xs text-graphite-hb mb-2">
								Option 4: ::after with hover transition (left to right)
							</p>
							<h3 className="text-4xl font-heading text-ink">
								<span className="relative z-0 inline-block after:content-[''] after:absolute after:bottom-1 after:-left-0.5 after:w-0 hover:after:w-[calc(100%+4px)] after:h-5/7 after:bg-mild-yellow/70 after:-rotate-1 after:-z-10 after:transition-all after:duration-1000">
									Heading Example
								</span>
							</h3>
							<p className="text-base text-ink mt-2">
								This is a section of body text with a{" "}
								<span className="relative z-0 inline-block after:content-[''] after:absolute after:bottom-1 after:-left-0.5 after:w-0 hover:after:w-[calc(100%+4px)] after:h-5/7 after:bg-mild-yellow/70 after:-rotate-1 after:-z-10 after:transition-all after:duration-1000">
									highlighted phrase
								</span>{" "}
								inside it.
							</p>
						</div>
					</div>
				</Canvas>
			</section>

			{/* ===== SECTION: Canvas Variants ===== */}
			<section className="space-y-4">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Canvas Variants</h2>

				{/* Textures */}
				<p className="text-xs text-graphite-hb">Textures (default / grain / handmade)</p>
				<div className="grid grid-cols-3 gap-4">
					<Canvas padding="p-4">
						<span className="text-xs text-graphite-hb">default</span>
					</Canvas>
					<Canvas
						texture="grain"
						padding="p-4"
					>
						<span className="text-xs text-graphite-hb">grain</span>
					</Canvas>
					<Canvas
						texture="handmade"
						padding="p-4"
					>
						<span className="text-xs text-graphite-hb">handmade</span>
					</Canvas>
				</div>

				{/* Patterns */}
				<p className="text-xs text-graphite-hb">Patterns (dotgrid / ruled / grid / dotruled)</p>
				<div className="grid grid-cols-4 gap-4">
					<Canvas
						pattern="dotgrid"
						padding="p-4"
						className="h-32"
					>
						<span className="text-xs text-graphite-hb">dotgrid</span>
					</Canvas>
					<Canvas
						pattern="ruled"
						padding="p-4"
						className="h-32"
					>
						<span className="text-xs text-graphite-hb">ruled</span>
					</Canvas>
					<Canvas
						pattern="grid"
						padding="p-4"
						className="h-32"
					>
						<span className="text-xs text-graphite-hb">grid</span>
					</Canvas>
					<Canvas
						pattern="dotruled"
						padding="p-4"
						className="h-32"
					>
						<span className="text-xs text-graphite-hb">dotruled</span>
					</Canvas>
				</div>

				{/* Variants */}
				<p className="text-xs text-graphite-hb">Materials (paper / kraft / tracing / white)</p>
				<div className="grid grid-cols-4 gap-4">
					<Canvas
						padding="p-4"
						className="h-24"
					>
						<span className="text-xs text-graphite-hb">paper</span>
					</Canvas>
					<Canvas
						variant="kraft"
						padding="p-4"
						className="h-24"
					>
						<span className="text-xs text-graphite-2b">kraft</span>
					</Canvas>
					<Canvas
						variant="tracing"
						padding="p-4"
						className="h-24"
					>
						<span className="text-xs text-graphite-hb">tracing</span>
					</Canvas>
					<Canvas
						variant="white"
						padding="p-4"
						className="h-24"
					>
						<span className="text-xs text-graphite-hb">white</span>
					</Canvas>
				</div>

				{/* Tracing overlay test */}
				<p className="text-xs text-graphite-hb">Tracing paper overlay (text showing through)</p>
				<div className="relative bg-pen-shinkai p-6">
					<p className="text-xl font-heading text-white">This text is underneath the tracing paper.</p>
					<p className="text-base text-white mt-2">
						You should see this dimmed through the translucent overlay.
					</p>
					<div className="absolute top-4">
						<Canvas
							variant="tracing"
							padding="p-10"
						>
							<p className="text-ink font-bold">This is on tracing paper, layered on top.</p>
						</Canvas>
					</div>
				</div>

				{/* Elevation + Interactive */}
				<p className="text-xs text-graphite-hb">Elevation and interaction (hover and click these)</p>
				<div className="grid grid-cols-4 gap-4">
					<Canvas padding="p-4" className="h-40">
						<span className="text-xs text-graphite-hb">flat (default)</span>
					</Canvas>
					<Canvas
						raised
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">raised</span>
					</Canvas>
					<Canvas
						interactive
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">flat + interactive</span>
					</Canvas>
					<Canvas
						raised
						interactive
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">raised + interactive</span>
					</Canvas>
				</div>

				{/* Combos */}
				<p className="text-xs text-graphite-hb">Combinations</p>
				<div className="grid grid-cols-2 gap-4">
					<Canvas
						texture="handmade"
						pattern="ruled"
						raised
						interactive
						padding="p-6"
						className="h-40"
					>
						<p className="text-sm text-ink">Handmade texture + ruled + raised + interactive</p>
					</Canvas>
					<Canvas
						variant="kraft"
						texture="grain"
						pattern="dotgrid"
						raised
						padding="p-6"
						className="h-40"
					>
						<p className="text-sm text-graphite-2b">Kraft + grain + dotgrid + raised</p>
					</Canvas>
				</div>
			</section>
		</main>
	);
}
