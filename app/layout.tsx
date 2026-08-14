import type { Metadata } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import { getHeader } from "@/services/header";
import Footer from "@/components/Footer";
import { getFooter } from "@/services/footer";

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jost",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Raymond Careers",
  description: "Raymond Careers Website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = await getHeader();

  const footer = await getFooter().catch(
    (error) => {
      console.error(
        "Failed to load footer:",
        error
      );
      return null;
    }
  );

  return (
    <html lang="en">
      <body className={`${jost.className} ${playfair.variable}`}>
        <Header data={header} />
        {children}
        {footer && <Footer data={footer} />}
      </body>
    </html>
  );
}