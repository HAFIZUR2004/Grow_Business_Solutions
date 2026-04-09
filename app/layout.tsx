import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Grow Business Solutions BD",
  description: "A concern of Taqwa Supplies",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} bg-[#0b0c18] antialiased text-white flex flex-col min-h-screen`}
        suppressHydrationWarning={true}
      >
        <Navbar />

        {/* flex-grow ensures this area fills space so footer stays at the bottom */}
        <main className="flex-grow">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
