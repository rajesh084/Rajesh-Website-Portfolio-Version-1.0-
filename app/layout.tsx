import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const siteFont = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-site",
});

export const metadata: Metadata = {
  title: "Rajesh R G | Solutions Engineer",
  description: "Portfolio website for Rajesh R G, Solutions Engineer focused on HPE Aruba, cloud, cybersecurity, and pre-sales engineering.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={siteFont.variable}>
      <body className={`${siteFont.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
