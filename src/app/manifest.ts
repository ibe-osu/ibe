import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IBE Honors Program | The Ohio State University",
    short_name: "IBE",
    description:
      "The Integrated Business & Engineering Honors Program at The Ohio State University.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ba0c2f",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
