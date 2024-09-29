import type { Metadata, Viewport } from "next";

import { Inter, Fira_Code } from "next/font/google";
import { cn } from "@/utils/cn";

import "@/styles/globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter-sans",
});

const firacode = Fira_Code({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-fira-mono",
});

const metadata: Metadata = {
  title: "Trackr",
  description: "Track your expenses and monthly bills with ease.",
};

const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(inter.variable, firacode.variable)}>
      <body>{children}</body>
    </html>
  );
}

export { metadata, viewport };
export default RootLayout;
