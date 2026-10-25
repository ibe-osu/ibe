import { INDUSTRIES, type Industry } from "./industry";

/**
 * What the alumni directory page sends to the browser: display fields only.
 * Built on the server in src/app/members/alumni-database/page.tsx from the
 * member's RLS-scoped query. Nothing here is a contact detail except the
 * LinkedIn URL.
 */
export interface DirectoryJob {
  title: string | null;
  company: string | null;
  start: string | null;
  end: string | null;
  location: string | null;
}

export interface DirectoryEducation {
  institution: string;
  program: string | null;
  year: number | null;
  inProgress: boolean;
}

export interface DirectoryAlum {
  id: string;
  firstName: string;
  lastName: string;
  classYear: number | null;
  college: "UENG" | "UBUS" | null;
  majors: string[];
  minors: string[];
  linkedinUrl: string | null;
  currentTitle: string | null;
  currentEmployer: string | null;
  currentCity: string | null;
  currentState: string | null;
  involvements: string[];
  /** Most recent first. */
  jobs: DirectoryJob[];
  education: DirectoryEducation[];
  industry: Industry;
}

export const COLLEGE_LABELS = {
  UENG: { short: "Engineering", long: "College of Engineering" },
  UBUS: { short: "Business", long: "Fisher College of Business" },
} as const;

const STATE_NAMES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri",
  MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey",
  NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio",
  OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina",
  SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont",
  VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  DC: "Washington, D.C.",
};

/** current_state holds a US state code, or a country for people abroad. */
const locationLabel = (value: string) => STATE_NAMES[value] ?? value;

export const fullName = (a: DirectoryAlum) => `${a.firstName} ${a.lastName}`;

export const initials = (a: DirectoryAlum) =>
  `${a.firstName[0] ?? ""}${a.lastName[0] ?? ""}`.toUpperCase();

export const currentLocation = (a: DirectoryAlum) =>
  [a.currentCity, a.currentState].filter(Boolean).join(", ");

export const currentRole = (a: DirectoryAlum) =>
  [a.currentTitle, a.currentEmployer].filter(Boolean).join(", ");

/** "Class of 2022 · Engineering" */
export const classLine = (a: DirectoryAlum) =>
  [a.classYear ? `Class of ${a.classYear}` : "Class year unknown", a.college && COLLEGE_LABELS[a.college].short]
    .filter(Boolean)
    .join(" · ");

// ─── Facets ──────────────────────────────────────────────────────────────────
// One definition per filter drives the sidebar, the chips, the search
// suggestions and the matching, so adding a filter is one entry here.

export type FacetKey =
  | "classYear"
  | "college"
  | "industry"
  | "major"
  | "company"
  | "location"
  | "gradSchool"
  | "involvement";

export interface Facet {
  key: FacetKey;
  label: string;
  /** Every value this person has for the facet; a filter matches any of them. */
  values: (a: DirectoryAlum) => string[];
  display?: (value: string) => string;
  /** Checkbox list for short fixed sets, a typeahead for long ones. */
  control: "checkbox" | "autocomplete";
  /** Most common first, A to Z, newest year first, or a fixed list. */
  order: "count" | "alpha" | "newest" | readonly string[];
}

const unique = (values: (string | null)[]) =>
  Array.from(new Set(values.filter((v): v is string => Boolean(v))));

/** Current employer plus every past one. */
const companies = (a: DirectoryAlum) => unique([a.currentEmployer, ...a.jobs.map((j) => j.company)]);

export const FACETS: Facet[] = [
  {
    key: "classYear",
    label: "Class year",
    values: (a) => (a.classYear ? [String(a.classYear)] : []),
    display: (v) => `Class of ${v}`,
    control: "autocomplete",
    order: "newest",
  },
  {
    key: "college",
    label: "College",
    values: (a) => (a.college ? [a.college] : []),
    display: (v) => COLLEGE_LABELS[v as keyof typeof COLLEGE_LABELS]?.short ?? v,
    control: "checkbox",
    order: "alpha",
  },
  {
    key: "industry",
    label: "Industry",
    values: (a) => [a.industry],
    control: "checkbox",
    // Fixed so "Other" stays last however big it is.
    order: INDUSTRIES,
  },
  { key: "major", label: "Major", values: (a) => a.majors, control: "autocomplete", order: "count" },
  {
    key: "company",
    label: "Company (any role)",
    values: companies,
    control: "autocomplete",
    order: "count",
  },
  {
    key: "location",
    label: "Location (current)",
    values: (a) => (a.currentState ? [a.currentState] : []),
    display: locationLabel,
    control: "autocomplete",
    order: "count",
  },
  {
    key: "gradSchool",
    label: "Grad school",
    values: (a) => unique(a.education.map((e) => e.institution)),
    control: "autocomplete",
    order: "count",
  },
  {
    key: "involvement",
    label: "Club or organization",
    values: (a) => a.involvements,
    control: "autocomplete",
    order: "count",
  },
];

export type Filters = Record<FacetKey, string[]>;

export const emptyFilters = (): Filters =>
  Object.fromEntries(FACETS.map((f) => [f.key, []])) as unknown as Filters;

export const displayValue = (facet: Facet, value: string) => facet.display?.(value) ?? value;

export interface FacetOption {
  value: string;
  count: number;
}

const ORDERS: Record<"count" | "alpha" | "newest", (x: FacetOption, y: FacetOption) => number> = {
  count: (x, y) => y.count - x.count || x.value.localeCompare(y.value),
  alpha: (x, y) => x.value.localeCompare(y.value),
  newest: (x, y) => Number(y.value) - Number(x.value),
};

/** Each facet's values across the whole directory, with how many people have each. */
export function facetOptions(alumni: DirectoryAlum[]): Record<FacetKey, FacetOption[]> {
  const out = {} as Record<FacetKey, FacetOption[]>;
  for (const facet of FACETS) {
    const counts = new Map<string, number>();
    for (const a of alumni) {
      for (const v of facet.values(a)) counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    const options = Array.from(counts, ([value, count]) => ({ value, count }));
    const { order } = facet;
    options.sort(
      typeof order === "string"
        ? ORDERS[order]
        : (x, y) => order.indexOf(x.value) - order.indexOf(y.value),
    );
    out[facet.key] = options;
  }
  return out;
}

// ─── Search ──────────────────────────────────────────────────────────────────
// Ported from ibe-connect's src/lib/search.ts: every word of the query must
// appear as a substring of the person's searchable text. No fuzzy matching:
// it put "health" next to "wealth".

const ABBREVIATIONS: Record<string, string> = {
  swe: "software engineer",
  pm: "product manager",
  ib: "investment banking",
  pe: "private equity",
  vc: "venture capital",
  ml: "machine learning",
  cs: "computer science",
  me: "mechanical engineering",
  bme: "biomedical engineering",
  "chem e": "chemical engineering",
  ops: "operations",
  ise: "integrated systems engineering",
  cse: "computer science engineering",
  mis: "information systems",
  ece: "electrical and computer engineering",
  acct: "accounting",
};

// Any one alternative matches.
const OR_ABBREVIATIONS: Record<string, { label: string; alternatives: string[] }> = {
  mbb: { label: "McKinsey / Bain / BCG", alternatives: ["mckinsey", "bain", "bcg", "boston consulting"] },
  jpmc: { label: "JPMorgan Chase", alternatives: ["jpmorgan", "jp morgan", "j.p. morgan"] },
};

export interface ParsedQuery {
  /** Every term must match... */
  allOf: string[];
  /** ...or, for an OR abbreviation, any one of these. */
  anyOf: string[];
  /** Shown as "Searching for ..." when an abbreviation was expanded. */
  expandedTo: string | null;
}

export function parseQuery(query: string): ParsedQuery {
  const lower = query.toLowerCase().trim();
  if (!lower) return { allOf: [], anyOf: [], expandedTo: null };

  const or = OR_ABBREVIATIONS[lower];
  if (or) return { allOf: [], anyOf: or.alternatives, expandedTo: or.label };

  const expanded = ABBREVIATIONS[lower] ?? lower.split(/\s+/).map((w) => ABBREVIATIONS[w] ?? w).join(" ");
  return {
    allOf: expanded.split(/\s+/).filter(Boolean),
    anyOf: [],
    expandedTo: expanded === lower ? null : expanded,
  };
}

export function searchableText(a: DirectoryAlum): string {
  return [
    a.firstName,
    a.lastName,
    a.classYear && `class of ${a.classYear}`,
    a.college && COLLEGE_LABELS[a.college].long,
    ...a.majors,
    ...a.minors,
    a.currentTitle,
    a.currentEmployer,
    a.currentCity,
    a.currentState && locationLabel(a.currentState),
    a.industry,
    ...a.jobs.flatMap((j) => [j.title, j.company, j.location]),
    ...a.education.flatMap((e) => [e.institution, e.program]),
    ...a.involvements,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function matchesQuery(text: string, q: ParsedQuery): boolean {
  if (q.anyOf.length) return q.anyOf.some((t) => text.includes(t));
  return q.allOf.every((t) => text.includes(t));
}

/**
 * Why a card matched when the reason isn't on the card: a past role or a
 * club. Without it, a search for "goldman" shows people whose card says
 * "Bain" and nothing else.
 */
export function matchContext(a: DirectoryAlum, q: ParsedQuery): string | null {
  if (!q.allOf.length && !q.anyOf.length) return null;
  const hits = (s: string) => matchesQuery(s, q);

  const onCard = [fullName(a), a.currentTitle, a.currentEmployer, ...a.majors].join(" ").toLowerCase();
  if (hits(onCard)) return null;

  const pastJob = a.jobs.slice(1).find((j) => hits(`${j.title ?? ""} ${j.company ?? ""}`.toLowerCase()));
  if (pastJob) return `Previously ${[pastJob.title, pastJob.company].filter(Boolean).join(", ")}`;
  const club = a.involvements.find((i) => hits(i.toLowerCase()));
  if (club) return club;
  const school = a.education.find((e) => hits(`${e.institution} ${e.program ?? ""}`.toLowerCase()));
  return school ? [school.program, school.institution].filter(Boolean).join(", ") : null;
}

// ─── Suggestions ─────────────────────────────────────────────────────────────
// Ported from ibe-connect's entityIndex.ts: typing "goog" offers
// "Google · 6 people" as a filter, not just a text match.

export interface Suggestion {
  facet: FacetKey;
  facetLabel: string;
  value: string;
  label: string;
  count: number;
}

const SUGGESTED_FACETS: FacetKey[] = ["company", "location", "involvement", "industry", "major", "gradSchool"];

export function suggestions(
  options: Record<FacetKey, FacetOption[]>,
  query: string,
  limit = 6,
): Suggestion[] {
  const q = query.toLowerCase().trim();
  if (q.length < 2) return [];
  const found: Suggestion[] = [];
  for (const facet of FACETS.filter((f) => SUGGESTED_FACETS.includes(f.key))) {
    for (const { value, count } of options[facet.key]) {
      const label = displayValue(facet, value);
      if (`${label} ${value}`.toLowerCase().includes(q)) {
        found.push({ facet: facet.key, facetLabel: facet.label, value, label, count });
      }
    }
  }
  // Prefix matches first, then the most common.
  const prefix = (s: Suggestion) => Number(s.label.toLowerCase().startsWith(q));
  return found.sort((x, y) => prefix(y) - prefix(x) || y.count - x.count).slice(0, limit);
}

// ─── Similar alumni ──────────────────────────────────────────────────────────
// Ported from ibe-connect's profile modal: shared employer 4, shared club 2,
// shared major 3, same college 1, same class 1.

export function similarAlumni(target: DirectoryAlum, all: DirectoryAlum[], count = 3): DirectoryAlum[] {
  const employers = new Set(companies(target));
  const clubs = new Set(target.involvements);
  const majors = new Set(target.majors);
  return all
    .filter((a) => a.id !== target.id)
    .map((a) => {
      let score = 0;
      for (const e of companies(a)) if (employers.has(e)) score += 4;
      for (const c of a.involvements) if (clubs.has(c)) score += 2;
      if (a.majors.some((m) => majors.has(m))) score += 3;
      if (a.college && a.college === target.college) score += 1;
      if (a.classYear && a.classYear === target.classYear) score += 1;
      return { a, score };
    })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, count)
    .map((x) => x.a);
}
