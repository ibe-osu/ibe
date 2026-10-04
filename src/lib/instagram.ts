import { z } from "zod";

export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/ohiostateibe/";

export interface InstagramPost {
  id: string;
  caption: string;
  /** A still image for every post type — videos use their thumbnail. */
  imageUrl: string;
  permalink: string;
  timestamp: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

const mediaSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      caption: z.string().optional(),
      media_type: z.enum(["IMAGE", "VIDEO", "CAROUSEL_ALBUM"]),
      media_url: z.string().optional(),
      thumbnail_url: z.string().optional(),
      permalink: z.string(),
      timestamp: z.string(),
    }),
  ),
});

/**
 * Every 6 hours, not every hour: Instagram's CDN URLs are re-signed on each
 * API call, so every refresh hands next/image a fresh set of source images to
 * optimize. Six hours keeps that well inside Vercel's free image quota and is
 * still same-day for a program account that posts a few times a week.
 */
const REVALIDATE_SECONDS = 6 * 60 * 60;

/**
 * Latest posts from @ohiostateibe via the Instagram API (Instagram Login).
 *
 * Returns null — never throws — when the token is missing, expired, or the
 * API is down, so the page falls back to its static photos instead of
 * failing to build. Token setup and renewal: docs/INSTAGRAM.md.
 */
export async function getInstagramPosts(
  limit = 6,
): Promise<InstagramPost[] | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
  );
  // Over-fetch a little: a carousel that opens on a video has no still
  // image, and gets skipped below.
  url.searchParams.set("limit", String(limit + 4));
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      // The body names the problem (e.g. code 190 = expired token) and never
      // echoes the token back, so it's safe to log.
      console.error(
        `Instagram feed: HTTP ${res.status} ${await res.text()}`,
      );
      return null;
    }

    const parsed = mediaSchema.safeParse(await res.json());
    if (!parsed.success) {
      console.error("Instagram feed: unexpected response shape", parsed.error);
      return null;
    }

    const posts = parsed.data.data.flatMap((m): InstagramPost[] => {
      const imageUrl =
        m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url;
      if (!imageUrl || new URL(imageUrl).pathname.endsWith(".mp4")) return [];
      return [
        {
          id: m.id,
          caption: m.caption ?? "",
          imageUrl,
          permalink: m.permalink,
          timestamp: m.timestamp,
          mediaType: m.media_type,
        },
      ];
    });

    return posts.length > 0 ? posts.slice(0, limit) : null;
  } catch (error) {
    // Message only: the error object can carry the request URL, token and all.
    console.error(
      "Instagram feed: request failed:",
      error instanceof Error ? error.message : "unknown error",
    );
    return null;
  }
}
