import React from "react";

export default function page() {
	return (
		<main className="p-8 bg-divider space-y-12">
			<h1 className="text-3xl font-heading text-ink">Design Sandbox</h1>

			{/* ===== SECTION: Typography System ===== */}
			<section className="space-y-2">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Typography System</h2>
				<div className="bg-paper p-6 space-y-6">
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
			</section>

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
				<div className="bg-paper p-6 flex gap-3 flex-wrap">
					<button className="px-4 py-2 rounded-md bg-pen-shinkai text-paper text-sm font-medium">
						Navigate
					</button>
					<button className="px-4 py-2 rounded-md bg-pen-tsutsuji text-paper text-sm font-medium">
						Submit
					</button>
					<button className="px-4 py-2 rounded-md bg-pen-kujaku text-paper text-sm font-medium">Save</button>
					<button className="px-4 py-2 rounded-md border border-graphite-guide text-ink text-sm font-medium">
						Cancel
					</button>
				</div>
			</section>

			{/* ===== SECTION: Highlighted Headings/Text ===== */}
			<section className="space-y-2">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">Highlighted Headings/Text</h2>
				<div className="bg-paper p-6 space-y-8">
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
							<span className="shadow-[inset_0_-0.25em_0_var(--color-mild-yellow)]">Heading Example</span>
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
						<p className="text-xs text-graphite-hb mb-2">Option 3: ::after pseudo-element (rotated bar)</p>
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
			</section>

			{/* ===== SECTION: Textures & Patterns ===== */}
			<section className="space-y-2">
				<h2 className="text-sm uppercase tracking-wide text-graphite-hb mb-4">
					Textures & Patterns{" "}
					<span className="normal-case font-mono text-[10px] text-graphite-hb/60">
						(will use Canvas component)
					</span>
				</h2>
				<div className="grid grid-cols-3 gap-4">
					{/* Cream paper grain texture (PNG) */}
					<div className="h-40 bg-paper relative overflow-hidden flex items-end p-3">
						<div
							className="absolute inset-0 opacity-[0.25]"
							style={{ backgroundImage: "url('/textures/cream-paper.png')", backgroundSize: "200px" }}
						/>
						<span className="text-xs text-graphite-hb relative z-10">Cream Paper (PNG)</span>
					</div>

					{/* Beige paper texture (PNG) */}
					<div className="h-40 bg-paper relative overflow-hidden flex items-end p-3">
						<div
							className="absolute inset-0 opacity-[0.25]"
							style={{ backgroundImage: "url('/textures/beige-paper.png')", backgroundSize: "200px" }}
						/>
						<span className="text-xs text-graphite-hb relative z-10">Beige Paper (PNG)</span>
					</div>

					{/* Handmade paper texture (PNG) */}
					<div className="h-40 bg-paper relative overflow-hidden flex items-end p-3">
						<div
							className="absolute inset-0 opacity-[0.25]"
							style={{ backgroundImage: "url('/textures/handmade-paper.png')", backgroundSize: "200px" }}
						/>
						<span className="text-xs text-graphite-hb relative z-10">Handmade Paper (PNG)</span>
					</div>

					{/* Dot grid (CSS) */}
					<div
						className="h-40 bg-paper relative overflow-hidden flex items-end p-3"
						style={{
							backgroundImage: "radial-gradient(circle, var(--color-dot-grey) 1px, transparent 1px)",
							backgroundSize: "20px 20px",
						}}
					>
						<span className="text-xs text-graphite-hb">Dot Grid (CSS)</span>
					</div>

					{/* Ruled lines (CSS) */}
					<div
						className="h-40 bg-paper relative overflow-hidden flex items-end p-3"
						style={{
							backgroundImage: "linear-gradient(var(--color-lines) 1px, transparent 1px)",
							backgroundSize: "100% 24px",
						}}
					>
						<span className="text-xs text-graphite-hb">Ruled Lines (CSS)</span>
					</div>

					{/* Square grid (CSS) */}
					<div
						className="h-40 bg-paper relative overflow-hidden flex items-end p-3"
						style={{
							backgroundImage:
								"linear-gradient(var(--color-grid) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid) 1px, transparent 1px)",
							backgroundSize: "20px 20px",
						}}
					>
						<span className="text-xs text-graphite-hb">Square Grid (CSS)</span>
					</div>

					{/* Dot B Ruled - Campus style (CSS) - dots sit ON the lines */}
					<div className="h-40 bg-paper relative overflow-hidden flex items-end p-3">
						<div
							className="absolute inset-0 opacity-[0.65]"
							style={{
								backgroundImage: "linear-gradient(var(--color-campus-dot) 1px, transparent 1px)",
								backgroundSize: "100% 24px",
							}}
						/>
						<div
							className="absolute inset-0"
							style={{
								backgroundImage: "radial-gradient(circle, var(--color-campus-dot) 1px, transparent 1px)",
								backgroundSize: "24px 24px",
								backgroundPosition: "0 -11px",
							}}
						/>
						<span className="text-xs text-graphite-hb relative z-10">Dot B Ruled - Campus (CSS)</span>
					</div>

					{/* Cream texture + Dot grid combo */}
					<div className="h-40 bg-paper relative overflow-hidden flex items-end p-3">
						<div
							className="absolute inset-0 opacity-[0.25]"
							style={{ backgroundImage: "url('/textures/cream-paper.png')", backgroundSize: "200px" }}
						/>
						<div
							className="absolute inset-0"
							style={{
								backgroundImage: "radial-gradient(circle, var(--color-dot-grey) 1px, transparent 1px)",
								backgroundSize: "20px 20px",
							}}
						/>
						<span className="text-xs text-graphite-hb relative z-10">Cream Texture + Dot Grid</span>
					</div>

					{/* Handmade texture + Ruled lines combo */}
					<div className="h-40 bg-paper relative overflow-hidden flex items-end p-3">
						<div
							className="absolute inset-0 opacity-[0.25]"
							style={{ backgroundImage: "url('/textures/handmade-paper.png')", backgroundSize: "200px" }}
						/>
						<div
							className="absolute inset-0"
							style={{
								backgroundImage: "linear-gradient(var(--color-lines) 1px, transparent 1px)",
								backgroundSize: "100% 24px",
							}}
						/>
						<span className="text-xs text-graphite-hb relative z-10">Handmade Texture + Ruled</span>
					</div>

					{/* Dot grid on kraft (CSS) */}
					<div
						className="h-40 bg-kraft relative overflow-hidden flex items-end p-3"
						style={{
							backgroundImage:
								"radial-gradient(circle, var(--color-graphite-guide) 1px, transparent 1px)",
							backgroundSize: "20px 20px",
						}}
					>
						<span className="text-xs text-graphite-2b">Dot Grid on Kraft</span>
					</div>
				</div>
			</section>
		</main>
	);
}
