// The members calendar frame's height, shared with its loading skeleton
// (src/app/members/loading.tsx) so the swap doesn't jump. It lives outside
// MembersCalendar because that's a client module: a Server Component that
// imports a constant from one gets a client reference, not the value.

/**
 * Everything on the page above the calendar frame, in px, on a desktop
 * viewport: sticky header (72) + page top padding (32) + title block
 * (~78 + 16 margin) + view toggle row (~36 + 12 margin) + the caption
 * below the frame (~28) + bottom breathing room (~16). The frame takes
 * whatever is left of the viewport, within sane bounds, so the whole
 * calendar sits on one screen instead of forcing a page scroll.
 */
const DESKTOP_CHROME_PX = 290;

// Viewport-relative so the grid fits on one screen; clamped so a short laptop
// window still gets a usable grid and a tall monitor doesn't stretch Google's
// layout past what it's designed for.
export const CALENDAR_FRAME_HEIGHT = {
  xs: "68svh",
  md: `clamp(440px, calc(100svh - ${DESKTOP_CHROME_PX}px), 720px)`,
};
