import type { Metadata } from "next";
import {
	Fira_Code,
	Hanken_Grotesk,
	IBM_Plex_Mono,
	IBM_Plex_Sans,
	Inter,
	JetBrains_Mono,
	Libre_Baskerville,
	Noto_Sans,
	Noto_Serif,
	Source_Serif_4,
} from "next/font/google";
import "./globals.css";

/**
 * Headings
 */
const notoSans = Noto_Sans({
	variable: "--font-noto-sans",
	subsets: ["latin"],
});

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
	variable: "--font-ibm-plex-sans",
	subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
	variable: "--font-hanken-grotesk",
	subsets: ["latin"],
});

/**
 * Body text
 */
const notoSerif = Noto_Serif({
	variable: "--font-serif",
	subsets: ["latin"],
});

const sourceSerif4 = Source_Serif_4({
	variable: "--font-source-serif-4",
	subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
	variable: "--font-libre-baskerville",
	subsets: ["latin"],
});

/**
 * Monospace
 */
const jetBrainsMono = JetBrains_Mono({
	variable: "--font-jetbrains-mono",
	subsets: ["latin"],
});

const firaCode = Fira_Code({
	variable: "--font-fira-code",
	subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
	variable: "--font-ibm-plex-mono",
	subsets: ["latin"],
	weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
	title: "benjaminferreira.dev",
	description: "Benjamin Ferreira - Portfolio",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${notoSans.variable} ${inter.variable} ${ibmPlexSans.variable} ${hankenGrotesk.variable} ${notoSerif.variable} ${sourceSerif4.variable} ${libreBaskerville.variable} ${jetBrainsMono.variable} ${firaCode.variable} ${ibmPlexMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
