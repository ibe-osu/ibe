import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Flip to `true` to enforce the CSP rather than only report violations.
 *
 * Leave it off until previews have been walked with the console open and are
 * clean — enforcing a wrong policy silently breaks pages. This is the entire
 * diff for that change.
 */
const enforceCsp = false;

/**
 * Supabase's URL is only known once the project exists, so it's read from the
 * environment rather than hardcoded. Absent (as it is today, and in CI), the
 * connect-src entry is simply omitted.
 */
const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL;

/**
 * Content Security Policy.
 *
 * Deliberately static rather than nonce-based. Next.js requires *dynamic
 * rendering* to inject a nonce, which would turn every static marketing page
 * into a per-request render and lose CDN caching — a bad trade for a site whose
 * public pages are its front door. MUI's AppRouterCacheProvider also can't take
 * a nonce (mui/material-ui#45774), so a nonce would mean hand-rolling an Emotion
 * cache too.
 *
 * `'unsafe-inline'` in script-src is the cost of that decision. It's acceptable
 * here because React escapes by default, nothing renders user-generated HTML,
 * and there is no dangerouslySetInnerHTML outside the static JSON-LD blob in
 * layout.tsx. Revisit if that ever stops being true.
 */
const contentSecurityPolicy = [
  `default-src 'self'`,

  // 'unsafe-inline': Next inlines its bootstrap and the RSC flight payload.
  // 'unsafe-eval': React Fast Refresh / Turbopack, dev only.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com`,

  // Emotion injects <style> tags at runtime; there is no nonce-free alternative.
  `style-src 'self' 'unsafe-inline'`,

  // CSP3 does NOT cover inline style="" attributes under style-src. MUI's sx prop
  // and every GSAP tween write inline styles — omit this and animations die silently.
  `style-src-attr 'unsafe-inline'`,

  // next/font/google self-hosts at build time, so no fonts.gstatic.com entry is needed.
  `font-src 'self' data:`,

  `img-src 'self' blob: data:`,

  // The homepage embeds a YouTube video (src/components/home/IBEVideo.tsx),
  // and /members embeds the IBE Google Calendar (src/data/calendar.ts).
  // Without these, default-src would block them. Swap in youtube-nocookie.com
  // here and in the component if you'd rather not set cookies for visitors.
  `frame-src https://www.youtube.com https://calendar.google.com`,

  [
    `connect-src 'self'`,
    `https://vitals.vercel-insights.com`,
    supabaseOrigin ?? "",
    isDev ? "ws://localhost:* http://127.0.0.1:54321" : "",
  ]
    .filter(Boolean)
    .join(" "),

  `frame-ancestors 'none'`,
  `form-action 'self'`,
  `base-uri 'self'`,
  `object-src 'none'`,

  // Browsers ignore this in report-only mode and log a console warning for every
  // page load, which would drown out the real violations we're here to find.
  ...(enforceCsp ? [`upgrade-insecure-requests`] : []),
]
  .filter(Boolean)
  .join("; ");

const securityHeaders = [
  {
    // Report-only until `enforceCsp` is flipped: violations surface in the
    // browser console without actually breaking anything.
    key: enforceCsp
      ? "Content-Security-Policy"
      : "Content-Security-Policy-Report-Only",
    value: contentSecurityPolicy,
  },
  {
    // 2 years. includeSubDomains covers every *.ibeosu.com — if any subdomain is
    // ever served over plain HTTP, drop that directive.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" }, // legacy companion to frame-ancestors
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
