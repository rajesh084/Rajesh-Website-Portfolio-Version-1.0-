import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Rajesh R G | Interactive Networking Portfolio",
  description: "Interactive portfolio for Rajesh R G, a Networking Solutions Specialist focused on HPE Aruba, pre-sales, cloud, cybersecurity, and solution architecture.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-helvetica">{children}</body>
    </html>
  )
}
