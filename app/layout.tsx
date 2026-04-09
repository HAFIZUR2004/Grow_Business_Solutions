import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // আপনার Navbar এর সঠিক পাথ দিন
import Footer from "@/components/Footer"; // আপনার Footer এর সঠিক পাথ দিন

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
      <body className={`${inter.className} bg-[#0b0c18] antialiased text-white`}>
        {/* Navbar এখানে থাকলে হোম এবং এবাউট সব পেজে পাবে */}
        <Navbar />
        
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer এখানে থাকলে সব পেজে পাবে */}
        <Footer />
      </body>
    </html>
  );
}