import React from "react";
import Surface from "@/components/Surface";
import Sheet from "@/components/Sheet";
import StickyNote from "@/components/StickyNote";

export default function page() {
	return (
		<main className="p-8 bg-desk-grey space-y-12">
			<h1 className="text-3xl font-heading text-ink">Design Sandbox</h1>

			{/* ===== SECTION: Typography System ===== */}
			<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Typography System</h2>
			<Surface
				variant="paper"
				texture="handmade"
				pattern="grid"
				padding="p-10"
				// rounded
				// raised
			>
				<div className="space-y-6">
					<div>
						<p className="text-xs text-graphite-hb mb-1">Heading - local display font (font-heading)</p>
						<p className="text-4xl font-heading text-ink">Benjamin Ferreira - Portfolio / Design System</p>
					</div>
					<div>
						<p className="text-xs text-graphite-hb mb-1">Body - Work Sans (font-body)</p>
						<p className="text-base font-body text-ink">
							Working on building my own design system, creating UI components themed after Japanese
							stationery. Should be fun :)
						</p>
					</div>
					<div>
						<p className="text-xs text-graphite-hb mb-1">Mono - Fira Code (font-mono)</p>
						<p className="text-sm font-mono text-ink">
							const theme = &quot;stationery&quot;; // 0O1lI =&gt; !=={" "}
						</p>
					</div>
				</div>
			</Surface>

			<section className="bg-white p-8 space-y-8 rounded">
				{/* ===== SECTION: Color Palette - Main ===== */}
				<section className="space-y-2">
					<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">
						Color Palette - Paper & Surface{" "}
						<span className="normal-case font-mono text-[10px] text-graphite-hb/60">
							--color-{"{name}"}
						</span>
					</h2>
					<div className="flex gap-4 flex-wrap">
						<div className="w-24 h-24 bg-paper rounded border border-ink/10 flex items-end p-2">
							<span className="text-xs text-graphite-hb">Paper</span>
						</div>
						<div className="w-24 h-24 bg-paper-md rounded border border-ink/10 flex items-end p-2">
							<span className="text-xs text-graphite-hb">Paper MD</span>
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
						<div className="w-24 h-24 bg-mild-green rounded flex items-end p-2">
							<span className="text-xs text-ink">Mild Green</span>
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
				<Surface
					pattern="dotgrid"
					padding="p-6"
					// raised
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
				</Surface>
			</section>

			{/* ===== SECTION: Highlighted Headings/Text ===== */}
			<section className="space-y-2">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Highlighted Headings/Text</h2>
				<Surface
					pattern="dotruled"
					padding="p-6"
					// raised
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
				</Surface>
			</section>

			{/* ===== SECTION: Surface Variants ===== */}
			<section className="space-y-4">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Surface Variants</h2>

				{/* Textures */}
				<p className="text-xs text-graphite-hb">Textures (default / grain / handmade)</p>
				<div className="grid grid-cols-3 gap-4">
					<Surface padding="p-4">
						<span className="text-xs text-graphite-hb">default</span>
					</Surface>
					<Surface
						texture="grain"
						padding="p-4"
					>
						<span className="text-xs text-graphite-hb">grain</span>
					</Surface>
					<Surface
						texture="handmade"
						padding="p-4"
					>
						<span className="text-xs text-graphite-hb">handmade</span>
					</Surface>
				</div>

				{/* Patterns */}
				<p className="text-xs text-graphite-hb">Patterns (dotgrid / ruled / grid / dotruled)</p>
				<div className="grid grid-cols-4 gap-4">
					<Surface
						pattern="dotgrid"
						padding="p-4"
						className="h-32"
					>
						<span className="text-xs text-graphite-hb">dotgrid</span>
					</Surface>
					<Surface
						pattern="ruled"
						padding="p-4"
						className="h-32"
					>
						<span className="text-xs text-graphite-hb">ruled</span>
					</Surface>
					<Surface
						pattern="grid"
						padding="p-4"
						className="h-32"
					>
						<span className="text-xs text-graphite-hb">grid</span>
					</Surface>
					<Surface
						pattern="dotruled"
						padding="p-4"
						className="h-32"
					>
						<span className="text-xs text-graphite-hb">dotruled</span>
					</Surface>
				</div>

				{/* Variants */}
				<p className="text-xs text-graphite-hb">Materials (paper / paper-md / kraft / tracing / white)</p>
				<div className="grid grid-cols-5 gap-4">
					<Surface
						padding="p-4"
						className="h-24"
					>
						<span className="text-xs text-graphite-hb">paper</span>
					</Surface>
					<Surface
						variant="paper-md"
						padding="p-4"
						className="h-24"
					>
						<span className="text-xs text-graphite-hb">paper-md</span>
					</Surface>
					<Surface
						variant="kraft"
						padding="p-4"
						className="h-24"
					>
						<span className="text-xs text-graphite-2b">kraft</span>
					</Surface>
					<Surface
						variant="tracing"
						padding="p-4"
						className="h-24"
					>
						<span className="text-xs text-graphite-hb">tracing</span>
					</Surface>
					<Surface
						variant="white"
						padding="p-4"
						className="h-24"
					>
						<span className="text-xs text-graphite-hb">white</span>
					</Surface>
				</div>

				{/* Tracing overlay test */}
				<p className="text-xs text-graphite-hb">Tracing paper overlay (text showing through)</p>
				<div className="relative bg-pen-shinkai p-6">
					<p className="text-xl font-heading text-white">This text is underneath the tracing paper.</p>
					<p className="text-base text-white mt-2">
						You should see this dimmed through the translucent overlay.
					</p>
					<div className="absolute top-4">
						<Surface
							variant="tracing"
							padding="p-10"
						>
							<p className="text-ink font-bold">This is on tracing paper, layered on top.</p>
						</Surface>
					</div>
				</div>

				{/* Elevation + Interactive */}
				<p className="text-xs text-graphite-hb">Elevation and interaction (hover and click these)</p>
				<div className="grid grid-cols-4 gap-4">
					<Surface
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">flat (default)</span>
					</Surface>
					<Surface
						// raised
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">raised</span>
					</Surface>
					<Surface
						// interactive
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">flat + interactive</span>
					</Surface>
					<Surface
						// raised
						// interactive
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">raised + interactive</span>
					</Surface>
				</div>

				{/* Combos */}
				<p className="text-xs text-graphite-hb">Combinations</p>
				<div className="grid grid-cols-2 gap-4">
					<Surface
						texture="handmade"
						pattern="ruled"
						// raised
						// interactive
						padding="p-6"
						className="h-40"
					>
						<p className="text-sm text-ink">Handmade texture + ruled + raised + interactive</p>
					</Surface>
					<Surface
						variant="paper-md"
						texture="grain"
						pattern="dotruled"
						// raised
						// rounded
						padding="p-6"
						className="h-40"
					>
						<p className="text-sm text-graphite-2b">Paper-md + grain + dotruled + raised + rounded</p>
					</Surface>
				</div>
			</section>

			{/* ===== SECTION: Desk Layout Tests ===== */}
			<section className="space-y-4">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Desk Layout Tests</h2>
				<p className="text-xs text-graphite-hb">Layering: desk surface → items → optional tracing desk pad</p>

				{/* Mini desk test area */}
				<div className="bg-desk-oak relative min-h-125 rounded-lg overflow-hidden">
					{/* Note under tracing layer */}
					<div className="absolute top-8 right-8 z-10">
						<Surface
							pattern="dotruled"
							className="rotate-2 w-2xs"
							// rounded
						>
							<h2 className="font-heading text-charcoal text-xl">Under the pad</h2>
							<p className="text-sm text-graphite-2b">
								This note is between the desk and the tracing layer.
							</p>
						</Surface>
					</div>

					{/* Tracing desk pad layer */}
					<Surface
						variant="tracing"
						className="relative z-15 mx-auto max-w-2xl min-h-100"
						padding="p-8"
					>
						<p className="text-graphite-2b text-sm">
							Content inside the tracing desk pad. Items below this z-index show through.
						</p>
					</Surface>

					{/* Note on top of tracing layer */}
					<div className="absolute top-40 right-8 z-20">
						<Surface
							pattern="dotruled"
							className="-rotate-1 w-2xs"
							// rounded
							// raised
							// interactive
						>
							<h2 className="font-heading text-charcoal text-xl">On top of pad</h2>
							<p className="text-sm text-graphite-2b">This note sits above the tracing layer.</p>
						</Surface>
					</div>

					{/* Note on desk, no pad, left side */}
					<div className="absolute bottom-8 left-8 z-20">
						<Surface
							variant="paper-md"
							texture="grain"
							pattern="ruled"
							className="rotate-1 w-2xs"
							// raised
						>
							<p className="text-sm text-ink">A ruled note sitting directly on the desk.</p>
						</Surface>
					</div>
				</div>
			</section>

			{/* ===== SECTION: Sheet Component ===== */}
			<section className="space-y-4">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Sheet Component</h2>
				<p className="text-xs text-graphite-hb">
					Behavior wrapper around Surface. Material props pass straight through, Sheet adds raised,
					interactive and scrollable.
				</p>

				<p className="text-xs text-graphite-hb">Elevation and interaction (hover and click these)</p>
				<div className="grid grid-cols-4 gap-4">
					<Sheet
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">flat (default)</span>
					</Sheet>
					<Sheet
						raised
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">raised</span>
					</Sheet>
					<Sheet
						interactive
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">interactive</span>
					</Sheet>
					<Sheet
						raised
						interactive
						padding="p-4"
						className="h-40"
					>
						<span className="text-xs text-graphite-hb">raised + interactive</span>
					</Sheet>
				</div>

				<p className="text-xs text-graphite-hb">
					scrollable (left scrolls, right clips, both are the same fixed height and content)
				</p>
				<div className="grid grid-cols-2 gap-4">
					<Sheet
						raised
						scrollable
						pattern="ruled"
						padding="p-6"
						className="h-48"
					>
						<p className="text-sm text-ink">
							I&apos;m a sheet with more to say than I have room for, so I scroll 📜
						</p>
						<p className="text-sm text-ink mt-3">
							Keep going. There is more of me down here, and you can reach it.
						</p>
						<p className="text-sm text-ink mt-3">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.
						</p>
						<p className="text-sm text-ink mt-3">Made it to the bottom 🎉</p>
					</Sheet>
					<Sheet
						raised
						pattern="ruled"
						padding="p-6"
						className="h-48"
					>
						<p className="text-sm text-ink">
							I&apos;m the same sheet, but I clip instead, so whatever runs past my edge is gone ✂️
						</p>
						<p className="text-sm text-ink mt-3">
							Keep going. There is more of me down here, and you can reach it.
						</p>
						<p className="text-sm text-ink mt-3">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
							labore et dolore magna aliqua.
						</p>
						<p className="text-sm text-ink mt-3">You should never see this line 👀</p>
					</Sheet>
				</div>

				<p className="text-xs text-graphite-hb">Materials, passed through to Surface</p>
				<div className="grid grid-cols-3 gap-4">
					<Sheet
						variant="kraft"
						texture="grain"
						raised
						padding="p-6"
						className="h-32"
					>
						<p className="text-sm text-graphite-2b">kraft + grain</p>
					</Sheet>
					<Sheet
						variant="paper-md"
						texture="grain"
						pattern="dotruled"
						raised
						padding="p-6"
						className="h-32"
					>
						<p className="text-sm text-ink">paper-md + grain + dotruled</p>
					</Sheet>
					<Sheet
						variant="white"
						texture="handmade"
						raised
						padding="p-6"
						className="h-32"
					>
						<p className="text-sm text-ink">white + handmade</p>
					</Sheet>
				</div>
			</section>

			{/* ===== SECTION: StickyNote Component ===== */}
			<section className="space-y-4">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">StickyNote Component</h2>
				<p className="text-xs text-graphite-hb">
					Formats are sized true to life at 6rem per inch, since CSS defines 1in as 96px. Size comes from the
					format, not from className.
				</p>

				<p className="text-xs text-graphite-hb">small 2in / standard 3in / large 4in</p>
				<div className="flex flex-wrap items-start gap-6">
					<StickyNote
						format="small"
						bgColor="bg-mild-pink"
						padding="p-4"
						interactive
					>
						<p className="font-body text-ink text-sm">small, 2 inches square 🐞</p>
					</StickyNote>
					<StickyNote
						format="standard"
						bgColor="bg-mild-yellow"
						interactive
					>
						<h3 className="font-heading text-charcoal text-2xl">standard</h3>
						<p className="font-body text-ink mt-2">
							3 inches square, the classic. Here for important or temporary info!
						</p>
					</StickyNote>
					<StickyNote
						format="large"
						bgColor="bg-mild-green"
						padding="p-8"
						interactive
					>
						<h3 className="font-heading text-charcoal text-3xl">large</h3>
						<p className="font-body text-ink mt-2">
							4 inches square. Room for brainstorming, lists, or a quick diagram.
						</p>
					</StickyNote>
				</div>

				<p className="text-xs text-graphite-hb">
					Peel: hover for the nudge, click to lift and stay lifted. Enter and Space also work, and the whole
					3D peel collapses to shadow only under prefers-reduced-motion.
				</p>
				{/* extra top and bottom room so the lift and the cast shadow are not clipped by the section */}
				<div className="flex flex-wrap items-start gap-6 pt-6 pb-10">
					<StickyNote
						format="standard"
						bgColor="bg-mild-blue"
						interactive
						className="-rotate-2"
					>
						<h3 className="font-heading text-charcoal text-2xl">interactive</h3>
						<p className="font-body text-ink mt-2">Click me. I peel from the top edge and stay up.</p>
					</StickyNote>
					<StickyNote
						format="standard"
						bgColor="bg-mild-grey"
						className="rotate-1"
					>
						<h3 className="font-heading text-charcoal text-2xl">not interactive</h3>
						<p className="font-body text-ink mt-2">
							No hover, no click, no focus stop, no pointer cursor. For comparison.
						</p>
					</StickyNote>
				</div>
			</section>

			{/* ===== SECTION: Desk Layering with Objects ===== */}
			<section className="space-y-4">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Desk Layering with Objects</h2>
				<p className="text-xs text-graphite-hb">
					The same layering idea as the desk layout, built with Sheet and StickyNote instead of raw Surface.
					Items below the pad z-index show through it.
				</p>
				{/*
					Absolute positioning is fine in here: this is a fixed-size demo box, not page layout.
					Real page sections use normal flow plus transforms so they collapse to a single column
					on mobile without overlapping.
				*/}
				<div className="bg-desk-cork relative min-h-150 overflow-hidden rounded-lg p-8">
					{/* under the pad */}
					<div className="absolute top-8 right-8 z-10">
						<Sheet
							pattern="dotruled"
							className="rotate-2 w-2xs"
						>
							<h3 className="font-heading text-charcoal text-xl">Under the pad</h3>
							<p className="text-sm text-graphite-2b">
								I&apos;m underneath the transparent desk pad, between it and the desk.
							</p>
						</Sheet>
					</div>

					{/* the tracing desk pad */}
					<Surface
						variant="tracing"
						pattern="dotgrid"
						padding="p-8"
						className="relative z-15 mx-auto min-h-100 max-w-xl rounded-3xl"
					>
						<p className="text-graphite-2b text-sm">
							The tracing desk pad. Anything with a lower z-index sits under it and shows through dimmed.
						</p>
					</Surface>

					{/* on top of the pad */}
					<div className="absolute top-44 right-8 z-20">
						<Sheet
							pattern="dotruled"
							raised
							interactive
							className="-rotate-1 w-2xs"
						>
							<h3 className="font-heading text-charcoal text-xl">On top of the pad</h3>
							<p className="text-sm text-graphite-2b">I&apos;m above the tracing layer 😳</p>
						</Sheet>
					</div>

					{/* sticky notes straight on the desk */}
					<div className="absolute top-16 left-8 z-20">
						<StickyNote
							format="standard"
							bgColor="bg-mild-yellow"
							interactive
							className="-rotate-3"
						>
							<h3 className="font-heading text-charcoal text-2xl">Stuck to the desk ✏️</h3>
							<p className="font-body text-ink mt-2">
								Peel me. My shadow grows out from under the bottom edge.
							</p>
						</StickyNote>
					</div>

					<div className="absolute bottom-10 left-28 z-20">
						<StickyNote
							format="small"
							bgColor="bg-mild-pink"
							padding="p-4"
							interactive
							className="rotate-1"
						>
							<p className="font-body text-ink text-sm">Smaller, but I can still be here 🐞</p>
						</StickyNote>
					</div>
				</div>
			</section>
		</main>
	);
}
