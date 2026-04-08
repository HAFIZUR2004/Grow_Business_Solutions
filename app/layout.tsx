export const metadata = {
  title: "Grow Business Solutions BD",
  description: "Obsidian Software Agency",
};

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}