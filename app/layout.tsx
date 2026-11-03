
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PixelLab — Creative Studio",
    template: "%s | PixelLab",
  },
  description:
    "Your creative playground for stunning gradients, color palettes, typography, and production-ready CSS.",
  applicationName: "PixelLab",
  keywords: [
    "gradient generator",
    "color palette",
    "CSS tools",
    "typography playground",
    "design studio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
