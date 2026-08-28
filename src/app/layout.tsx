import type { Metadata } from "next";
import { Fira_Code, Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const heading = localFont({
	src: "./fonts/display-heading.ttf",
	variable: "--font-serif",
	weight: "500",
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
			className={`${heading.variable} ${workSans.variable} ${firaCode.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
