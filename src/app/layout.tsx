import type { Metadata } from "next";
import {
	Fira_Code,
	Instrument_Serif,
	Work_Sans,
} from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
	variable: "--font-instrument-serif",
	subsets: ["latin"],
	weight: ["400"],
});

const workSans = Work_Sans({
	variable: "--font-work-sans",
	subsets: ["latin"],
});

const firaCode = Fira_Code({
	variable: "--font-fira-code",
	subsets: ["latin"],
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
			className={`${instrumentSerif.variable} ${workSans.variable} ${firaCode.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
