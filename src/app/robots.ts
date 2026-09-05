import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Gated (each also carries its own robots: { index: false } in
      // metadata — belt and suspenders) or auth-flow routes with nothing
      // for a crawler to index anyway.
      disallow: ["/members", "/login", "/signup", "/auth"],
    },
    sitemap: "https://ibeosu.com/sitemap.xml",
  };
}
