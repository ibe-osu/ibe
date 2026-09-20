/**
 * The shared IBE Google Calendar (public, read-only). Officers manage the
 * events in Google Calendar itself; this file only knows where it lives.
 * Swap CALENDAR_ID if the program ever moves to a new calendar — every
 * link and the embed on /members derive from it.
 */
export const CALENDAR_ID =
  "cbc71796f2db924d45e1df0763f79f2224d2ff9944da9bb0145ab9c9c83b17df@group.calendar.google.com";

export const CALENDAR_TIMEZONE = "America/New_York";

const encodedId = encodeURIComponent(CALENDAR_ID);

/** "Add to my Google Calendar" — subscribes the signed-in Google account. */
export const CALENDAR_ADD_URL = `https://calendar.google.com/calendar/u/0/r?cid=${encodedId}`;

/** iCal feed for Apple Calendar, Outlook, and anything else that speaks .ics. */
export const CALENDAR_ICS_URL = `https://calendar.google.com/calendar/ical/${encodedId}/public/basic.ics`;

export type CalendarMode = "MONTH" | "WEEK" | "AGENDA";

/**
 * The embed URL for a given view. The show* flags strip Google's chrome
 * (title bar, print button, view tabs, calendar list, timezone footer) so
 * the frame reads as part of the page rather than a widget dropped into it;
 * the view switcher lives in our own UI instead (MembersCalendar.tsx).
 */
export function calendarEmbedUrl(
  mode: CalendarMode,
  { chrome = false }: { chrome?: boolean } = {},
) {
  const params = new URLSearchParams({
    src: CALENDAR_ID,
    ctz: CALENDAR_TIMEZONE,
    mode,
    wkst: "1",
  });
  if (!chrome) {
    for (const flag of ["showTitle", "showPrint", "showTabs", "showCalendars", "showTz"]) {
      params.set(flag, "0");
    }
  }
  return `https://calendar.google.com/calendar/embed?${params.toString()}`;
}

/** Google's own full-page view of the calendar, chrome and all. */
export const CALENDAR_PAGE_URL = calendarEmbedUrl("MONTH", { chrome: true });
