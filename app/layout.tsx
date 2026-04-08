import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Next.js standard way to use Google Fonts
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Grow Business Solutions BD",
  description: "Obsidian Software Agency",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className={`${inter.className} bg-[#0b0c18] antialiased`}>
        {children}
      </body>
    </html>
  );
}
