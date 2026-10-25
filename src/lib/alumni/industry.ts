/**
 * Industry for the directory's filter, inferred from a person's current role.
 * Adapted from ibe-connect's inferIndustry(), with two changes that matter on
 * the verified data: keywords match whole words (substring matching put
 * "Associate" under Government via "state" and "Development" under Technology
 * via "pm"), and the employer is checked before the title, because "Analyst at
 * Kraft Heinz" is consumer goods, not finance.
 */

export const INDUSTRIES = [
  "Consulting",
  "Finance & Banking",
  "Technology",
  "Consumer Goods & Retail",
  "Engineering & Manufacturing",
  "Healthcare",
  "Energy",
  "Government & Nonprofit",
  "Law",
  "Graduate School",
  "Other",
] as const;

export type Industry = (typeof INDUSTRIES)[number];

type KeywordMap = [Industry, string[]][];

// Checked first. Order matters only where one company could fit two buckets.
const EMPLOYERS: KeywordMap = [
  ["Consulting", ["mckinsey", "bain & company", "bcg", "boston consulting", "accenture", "deloitte", "kpmg", "pwc", "ey", "ernst & young", "captech", "booz allen", "oliver wyman", "kearney", "alixpartners", "ankura", "guidehouse", "huron", "slalom", "west monroe", "amend", "kalypso", "zs associates", "strategy&", "roland berger", "l.e.k."]],
  ["Finance & Banking", ["goldman sachs", "morgan stanley", "jpmorgan", "jpmorganchase", "jp morgan", "j.p. morgan", "chase", "wells fargo", "citi", "citigroup", "bank of america", "barclays", "ubs", "blackrock", "blackstone", "kkr", "carlyle", "citadel", "jane street", "two sigma", "capital one", "american express", "fifth third", "huntington", "pnc", "keybank", "nationwide", "fidelity", "vanguard", "charles schwab", "piper sandler", "william blair", "baird", "jefferies", "houlihan lokey", "lazard", "evercore", "moelis", "pitchbook", "svb", "bain capital", "belvedere trading", "fort washington", "schonfeld", "nomura", "crowe", "capital", "capital partners", "equity", "asset management", "investments", "investors"]],
  ["Technology", ["google", "microsoft", "amazon", "aws", "meta", "apple", "oracle", "salesforce", "ibm", "intel", "nvidia", "cisco", "adobe", "intuit", "uber", "lyft", "airbnb", "stripe", "palantir", "snowflake", "databricks", "workday", "servicenow", "doordash", "linkedin", "tesla", "zoox", "decagon", "qualtrics", "cohere", "openai", "epic", "garmin", "justworks", "84.51", "software", "technologies", "robotics"]],
  ["Consumer Goods & Retail", ["procter & gamble", "p&g", "kraft heinz", "general mills", "pepsico", "coca-cola", "unilever", "nestle", "mondelez", "kellogg", "mars", "colgate", "clorox", "kimberly-clark", "l'oréal", "l'oreal", "levi strauss", "nike", "target", "walmart", "kroger", "costco", "abercrombie", "mcdonald's", "starbucks", "wendy's", "bath & body works", "victoria's secret", "j.m. smucker", "smucker", "scotts miracle-gro", "ecolab", "sherwin-williams", "good culture", "mccormick"]],
  ["Engineering & Manufacturing", ["honda", "general motors", "gm", "ford", "stellantis", "boeing", "lockheed martin", "raytheon", "rtx", "northrop grumman", "general electric", "ge aerospace", "ge appliances", "caterpillar", "3m", "honeywell", "siemens", "emerson", "parker hannifin", "rockwell", "eaton", "cummins", "john deere", "battelle", "owens corning", "whirlpool", "spacex", "blue origin", "pratt & whitney", "aerospace", "norfolk southern", "railway"]],
  ["Healthcare", ["johnson & johnson", "pfizer", "merck", "abbott", "medtronic", "stryker", "boston scientific", "baxter", "becton dickinson", "cardinal health", "mckesson", "cencora", "eli lilly", "medpace", "cleveland clinic", "nationwide children's", "cincinnati children's", "mayo clinic", "medvet", "health", "healthcare"]],
  ["Energy", ["exxonmobil", "exxon", "chevron", "shell", "bp", "conocophillips", "marathon petroleum", "duke energy", "aep", "american electric power", "nextera", "dominion energy", "energy"]],
  ["Law", ["llp", "law firm", "dechert", "jones day", "kirkland", "latham", "sidley", "baker hostetler", "squire patton boggs", "vorys", "hubay dougherty"]],
  ["Government & Nonprofit", ["government", "federal reserve", "department of", "city of", "county", "state of", "u.s. army", "u.s. navy", "u.s. air force", "nasa", "peace corps", "americorps", "teach for america", "foundation"]],
];

// Fallback when the employer isn't recognized.
const TITLES: KeywordMap = [
  ["Graduate School", ["student", "candidate", "graduate teaching assistant", "graduate research assistant", "phd", "mba", "jd", "md"]],
  ["Law", ["attorney", "lawyer", "law clerk", "associate attorney", "paralegal"]],
  ["Consulting", ["consultant", "consulting", "advisory"]],
  ["Finance & Banking", ["investment banking", "private equity", "venture capital", "equity research", "trader", "trading", "wealth", "portfolio", "credit analyst", "financial analyst", "banker", "accountant", "audit", "tax"]],
  ["Technology", ["software", "developer", "data scientist", "data engineer", "machine learning", "product manager", "it manager", "information technology", "cybersecurity", "devops"]],
  ["Healthcare", ["clinical", "physician", "nurse", "medical", "biomedical", "pharmacist", "health"]],
  ["Energy", ["energy", "petroleum", "oil", "renewable", "solar"]],
  ["Engineering & Manufacturing", ["mechanical engineer", "manufacturing", "process engineer", "quality engineer", "supply chain", "operations engineer", "chemical engineer", "industrial engineer", "plant", "design engineer", "systems engineer", "engineer"]],
];

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Whole-word match: letters or digits on either side mean "inside a word".
function compile(map: KeywordMap): [Industry, RegExp][] {
  return map.map(([industry, words]) => [
    industry,
    new RegExp(`(?<![\\p{L}\\p{N}])(?:${words.map(escape).join("|")})(?![\\p{L}\\p{N}])`, "iu"),
  ]);
}

const EMPLOYER_PATTERNS = compile(EMPLOYERS);
const TITLE_PATTERNS = compile(TITLES);

const firstMatch = (patterns: [Industry, RegExp][], text: string | null) =>
  text ? patterns.find(([, re]) => re.test(text))?.[0] : undefined;

export function inferIndustry(
  title: string | null,
  employer: string | null,
  inGradSchool: boolean,
): Industry {
  // A current job wins over an in-progress degree: someone working at
  // Microsoft through a part-time MS belongs under Technology.
  return (
    firstMatch(EMPLOYER_PATTERNS, employer) ??
    firstMatch(TITLE_PATTERNS, title) ??
    (inGradSchool ? "Graduate School" : "Other")
  );
}
