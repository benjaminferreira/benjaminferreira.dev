import React from "react";

export default function page() {
	return (
		<>
			<main>
				<h1>Design Sandbox</h1>
				<section className="bg-paper p-6">
					<h2 className="font-heading text-ink p-2">Experiment 1</h2>
					<p className="font-body text-ink-muted p-2">Experiment 1.5</p>
				</section>
				<section className="bg-kraft p-6">
					<h2 className="font-heading text-accent-coral p-2">Experiment 2</h2>
					<code className="font-mono text-accent-blue p-2">Experiment 2.5</code>
				</section>
			</main>
		</>
	);
}
