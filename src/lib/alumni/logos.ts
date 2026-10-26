/**
 * Square logos for employers and schools in the alumni directory, from
 * Google's favicon service by domain (no API key; the CSP in next.config.ts
 * allows it). Only names below get a logo: a guessed "<name>.com" can show
 * the wrong company, so anything unmapped falls back to an initials tile.
 *
 * Seeded from ibe-connect's companyDomain.ts, plus the employers and grad
 * schools in the verified data. Add a line when a new employer shows up.
 * The public/companies SVGs aren't used: they are wide wordmarks for the
 * homepage marquee and unreadable at icon size.
 */
import { wholeWords } from "./match";

const DOMAINS: Record<string, string> = {
  // Tech
  google: "google.com",
  microsoft: "microsoft.com",
  amazon: "amazon.com",
  "amazon web services": "aws.amazon.com",
  apple: "apple.com",
  meta: "meta.com",
  facebook: "meta.com",
  instagram: "instagram.com",
  netflix: "netflix.com",
  nvidia: "nvidia.com",
  oracle: "oracle.com",
  salesforce: "salesforce.com",
  ibm: "ibm.com",
  intel: "intel.com",
  cisco: "cisco.com",
  adobe: "adobe.com",
  sap: "sap.com",
  workday: "workday.com",
  servicenow: "servicenow.com",
  palantir: "palantir.com",
  snowflake: "snowflake.com",
  databricks: "databricks.com",
  stripe: "stripe.com",
  uber: "uber.com",
  lyft: "lyft.com",
  airbnb: "airbnb.com",
  doordash: "doordash.com",
  linkedin: "linkedin.com",
  tiktok: "tiktok.com",
  zoom: "zoom.us",
  atlassian: "atlassian.com",
  github: "github.com",
  intuit: "intuit.com",
  paypal: "paypal.com",
  tesla: "tesla.com",
  rivian: "rivian.com",
  zoox: "zoox.com",
  epic: "epic.com",
  garmin: "garmin.com",
  "pure storage": "purestorage.com",
  justworks: "justworks.com",
  nielseniq: "nielseniq.com",
  decagon: "decagon.ai",
  flowcode: "flowcode.com",
  "84.51": "8451.com",
  "ccc intelligent solutions": "cccis.com",
  // Finance
  "goldman sachs": "goldmansachs.com",
  "morgan stanley": "morganstanley.com",
  jpmorgan: "jpmorganchase.com",
  jpmorganchase: "jpmorganchase.com",
  "jp morgan": "jpmorganchase.com",
  "j.p. morgan": "jpmorganchase.com",
  chase: "chase.com",
  "bank of america": "bankofamerica.com",
  "wells fargo": "wellsfargo.com",
  citi: "citi.com",
  citigroup: "citi.com",
  barclays: "barclays.com",
  ubs: "ubs.com",
  blackrock: "blackrock.com",
  blackstone: "blackstone.com",
  kkr: "kkr.com",
  carlyle: "carlyle.com",
  citadel: "citadel.com",
  "two sigma": "twosigma.com",
  "jane street": "janestreet.com",
  fidelity: "fidelity.com",
  vanguard: "vanguard.com",
  "charles schwab": "schwab.com",
  "capital one": "capitalone.com",
  "american express": "americanexpress.com",
  visa: "visa.com",
  mastercard: "mastercard.com",
  "fifth third": "53.com",
  huntington: "huntington.com",
  keybank: "key.com",
  pnc: "pnc.com",
  cibc: "cibc.com",
  rbc: "rbc.com",
  nationwide: "nationwide.com",
  "piper sandler": "pipersandler.com",
  "bain capital": "baincapital.com",
  "belvedere trading": "belvederetrading.com",
  schonfeld: "schonfeld.com",
  "jmi equity": "jmi.com",
  "grant street group": "grantstreet.com",
  "fort washington investment advisors": "fortwashington.com",
  pitchbook: "pitchbook.com",
  // Consulting and accounting
  mckinsey: "mckinsey.com",
  bain: "bain.com",
  bcg: "bcg.com",
  "boston consulting group": "bcg.com",
  deloitte: "deloitte.com",
  pwc: "pwc.com",
  "strategy&": "strategyand.pwc.com",
  kpmg: "kpmg.com",
  ey: "ey.com",
  "ernst & young": "ey.com",
  accenture: "accenture.com",
  "oliver wyman": "oliverwyman.com",
  "booz allen": "boozallen.com",
  kearney: "kearney.com",
  alixpartners: "alixpartners.com",
  ankura: "ankura.com",
  crowe: "crowe.com",
  guidehouse: "guidehouse.com",
  slalom: "slalom.com",
  captech: "captechconsulting.com",
  // Industrial and engineering
  boeing: "boeing.com",
  "lockheed martin": "lockheedmartin.com",
  raytheon: "rtx.com",
  "northrop grumman": "northropgrumman.com",
  "general electric": "ge.com",
  ge: "ge.com",
  "ge aerospace": "geaerospace.com",
  "ge appliances": "geappliances.com",
  honeywell: "honeywell.com",
  "3m": "3m.com",
  caterpillar: "caterpillar.com",
  siemens: "siemens.com",
  emerson: "emerson.com",
  "parker hannifin": "parker.com",
  ford: "ford.com",
  "general motors": "gm.com",
  gm: "gm.com",
  honda: "honda.com",
  toyota: "toyota.com",
  spacex: "spacex.com",
  eaton: "eaton.com",
  cummins: "cummins.com",
  battelle: "battelle.org",
  "owens corning": "owenscorning.com",
  whirlpool: "whirlpool.com",
  "united airlines": "united.com",
  "pratt & whitney": "prattwhitney.com",
  aecom: "aecom.com",
  allegion: "allegion.com",
  // Healthcare
  "johnson & johnson": "jnj.com",
  pfizer: "pfizer.com",
  merck: "merck.com",
  abbott: "abbott.com",
  medtronic: "medtronic.com",
  stryker: "stryker.com",
  "boston scientific": "bostonscientific.com",
  "cardinal health": "cardinalhealth.com",
  mckesson: "mckesson.com",
  "eli lilly": "lilly.com",
  medpace: "medpace.com",
  medline: "medline.com",
  "cleveland clinic": "clevelandclinic.org",
  // Energy
  exxonmobil: "exxonmobil.com",
  "exxon mobil": "exxonmobil.com",
  chevron: "chevron.com",
  shell: "shell.com",
  bp: "bp.com",
  "marathon petroleum": "marathonpetroleum.com",
  "duke energy": "duke-energy.com",
  aep: "aep.com",
  "american electric power": "aep.com",
  // Consumer and retail
  "procter & gamble": "pg.com",
  "p&g": "pg.com",
  "kraft heinz": "kraftheinz.com",
  "general mills": "generalmills.com",
  pepsico: "pepsico.com",
  unilever: "unilever.com",
  nestle: "nestle.com",
  colgate: "colgatepalmolive.com",
  "levi strauss": "levistrauss.com",
  nike: "nike.com",
  target: "target.com",
  walmart: "walmart.com",
  kroger: "kroger.com",
  costco: "costco.com",
  "mcdonald's": "mcdonalds.com",
  starbucks: "starbucks.com",
  "sherwin-williams": "sherwin-williams.com",
  ecolab: "ecolab.com",
  mccormick: "mccormick.com",
  disney: "disney.com",
  // Grad schools (Ohio State has its own tile, see isOhioState)
  "harvard business school": "hbs.edu",
  "harvard law school": "hls.harvard.edu",
  harvard: "harvard.edu",
  "mit sloan": "mitsloan.mit.edu",
  "massachusetts institute of technology": "mit.edu",
  mit: "mit.edu",
  "carnegie mellon": "cmu.edu",
  columbia: "columbia.edu",
  cornell: "cornell.edu",
  "georgia institute of technology": "gatech.edu",
  "johns hopkins": "jhu.edu",
  kellogg: "kellogg.northwestern.edu",
  northwestern: "northwestern.edu",
  "chicago booth": "chicagobooth.edu",
  "booth school of business": "chicagobooth.edu",
  "university of chicago": "uchicago.edu",
  "university of texas at austin": "utexas.edu",
  "university of toledo": "utoledo.edu",
  ucla: "ucla.edu",
  "university of california, berkeley": "berkeley.edu",
  "university of cincinnati": "uc.edu",
  "university of maryland global campus": "umgc.edu",
  "university of michigan": "umich.edu",
  "wright state": "wright.edu",
  "kansas state": "k-state.edu",
  "ball state": "bsu.edu",
  baruch: "baruch.cuny.edu",
  "stockholm school of economics": "hhs.se",
};

// Ignored when matching ("Pure Storage, Inc." matches "pure storage").
const SUFFIXES = /\b(inc|llc|corp|corporation|co|ltd|plc|lp|the)\b\.?/g;

const normalize = (name: string) =>
  name.toLowerCase().replace(SUFFIXES, " ").replace(/[,.]+$/, "").replace(/\s+/g, " ").trim();

// One pass per name. Longest names first, so "Bain Capital" wins over "Bain"
// and "GE Aerospace" over "GE"; the matched text is the DOMAINS key.
const KNOWN = wholeWords(Object.keys(DOMAINS).sort((a, b) => b.length - a.length), "u");

const cache = new Map<string, string | null>();

/** Logo URL for a company or school name, or null when it isn't mapped. */
export function logoUrl(name: string | null): string | null {
  if (!name) return null;
  const cached = cache.get(name);
  if (cached !== undefined) return cached;
  const match = normalize(name).match(KNOWN)?.[0];
  const url = match ? `https://www.google.com/s2/favicons?domain=${DOMAINS[match]}&sz=64` : null;
  cache.set(name, url);
  return url;
}

/**
 * Ohio State gets the scarlet "O" tile instead of a favicon. A bare "OSU"
 * counts only as the whole name, since other schools are OSU too.
 */
const OHIO_STATE = wholeWords(["ohio state"]);
export const isOhioState = (name: string) => OHIO_STATE.test(name) || name.trim().toUpperCase() === "OSU";
