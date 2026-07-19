import type { Metadata, Viewport } from "next";
import { PT_Serif_Caption, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../theme/ThemeProvider";
import Header from "../components/general/Header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Footer from "@/components/general/Footer";
import HeroPrefetch from "@/components/general/HeroPrefetch";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ptSerifCaption = PT_Serif_Caption({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pt-serif-caption",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IBE Honors Program | Ohio State",
    template: "%s | IBE Honors Program",
  },
  description:
    "The Integrated Business & Engineering (IBE) Honors Program at The Ohio State University prepares students to lead at the intersection of business and technology.",

  metadataBase: new URL("https://ibeosu.com"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "IBE",
    "Integrated Business and Engineering",
    "Ohio State Honors Program",
    "OSU honors",
    "business and engineering program",
    "Fisher College of Business",
    "Ohio State College of Engineering",
  ],

  openGraph: {
    title:
      "Integrated Business & Engineering Honors Program | The Ohio State University",
    description:
      "A four-year interdisciplinary honors program at Ohio State combining business, engineering, and leadership.",
    url: "https://ibeosu.com",
    siteName: "IBE Honors Program",
    locale: "en_US",
    images: [
      {
        url: "/altLogo.png",
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

export const viewport: Viewport = {
  themeColor: "#ba0c2f",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Integrated Business & Engineering Honors Program",
  alternateName: "IBE Honors Program",
  url: "https://ibeosu.com",
  logo: "https://ibeosu.com/altLogo.png",
  description:
    "A four-year interdisciplinary honors program at The Ohio State University combining business, engineering, and leadership.",
  parentOrganization: {
    "@type": "CollegeOrUniversity",
    name: "The Ohio State University",
    url: "https://www.osu.edu",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Columbus",
    addressRegion: "OH",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.instagram.com/ohiostateibe/",
    "https://www.linkedin.com/company/ibeprogram/",
    "https://www.facebook.com/ohiostateibe/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ptSerifCaption.variable} ${sourceSans.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <AppRouterCacheProvider>
          <ThemeProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Header />
            <main id="main-content">{children}</main>
            <HeroPrefetch />
            <Analytics />
            <SpeedInsights />
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
