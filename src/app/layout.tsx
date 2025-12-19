import type { Metadata } from "next";
import { PT_Serif_Caption } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../theme/ThemeProvider";
import Header from "../components/general/Header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Footer from "@/components/general/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ptSerifCaption = PT_Serif_Caption({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pt-serif-caption",
});

export const metadata: Metadata = {
  title: {
    default: "IBE Honors Program | Ohio State",
    template: "%s | IBE Honors Program",
  },
  description:
    "The Integrated Business & Engineering (IBE) Honors Program at The Ohio State University prepares students to lead at the intersection of business and technology.",

  metadataBase: new URL("https://ibeosu.com"), // change if different domain

  openGraph: {
    title:
      "Integrated Business & Engineering Honors Program | The Ohio State University",
    description:
      "A four-year interdisciplinary honors program at Ohio State combining business, engineering, and leadership.",
    url: "https://ibeosu.com",
    siteName: "IBE Honors Program",
    images: [
      {
        url: "/altLogo.png", // LOCAL image (important)
        width: 778,
        height: 262,
        alt: "IBE Honors Program at The Ohio State University",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Integrated Business & Engineering Honors Program",
    description:
      "Preparing the next generation of business and technology leaders at Ohio State.",
    images: ["/altLogo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ptSerifCaption.variable}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <Header />
            {children}
            <Analytics />
            <SpeedInsights />
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
