/**
 * Builds the SQL that loads the alumni directory (migration 0005) from the
 * verified import CSVs. Officer tool, run by hand; see README.md here for
 * how to run it and what the SQL does.
 *
 *   node scripts/alumni/build-seed.ts \
 *     private/alumni-db-import.csv private/experience-db-import.csv \
 *     private/alumni-seed.sql
 *
 * Only the columns the directory shows are read: phone and gender are never
 * touched, and an email flagged as bounced is left out. The output holds
 * personal data, so the script refuses to write it anywhere git would track.
 */
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

type Row = Record<string, string>;

// RFC 4180: quoted fields may hold commas, newlines and "" escapes.
function parseCsv(text: string): Row[] {
  const records: string[][] = [];
  let record: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        field += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      record.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      record.push(field);
      records.push(record);
      record = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field || record.length) {
    record.push(field);
    records.push(record);
  }

  const [header, ...rows] = records;
  const keys = header.map((h) => h.replace(/^﻿/, "").trim());
  return rows
    .filter((r) => r.some((v) => v.trim()))
    .map((r) => Object.fromEntries(keys.map((k, i) => [k, r[i] ?? ""])));
}

const text = (v: string | undefined) => v?.trim() || null;
const list = (...values: (string | undefined)[]) =>
  values.flatMap((v) => (v ?? "").split(";").map((s) => s.trim()).filter(Boolean));
const year = (v: string | undefined) => {
  const m = v?.match(/\b(\d{4})\b/);
  return m ? Number(m[1]) : null;
};

// The CSV has a dozen LinkedIn URL shapes (http, no scheme, /mwlite/, share
// tracking parameters). The schema only accepts the canonical one.
function linkedinUrl(raw: string, sourceRow: number) {
  if (!raw.trim()) return null;
  const slug = raw.match(/linkedin\.com\/(?:mwlite\/)?in\/([^/?#\s]+)/i)?.[1];
  if (!slug) throw new Error(`source row ${sourceRow}: unrecognized LinkedIn URL`);
  return `https://www.linkedin.com/in/${slug}`;
}

// Bounced addresses are left out; anything that isn't shaped like an email
// stops the build here rather than failing the SQL (the row number, never the
// address, goes in the error).
function personalEmail(r: Row, sourceRow: number) {
  if (r.emailInvalid?.trim().toUpperCase() === "YES") return null;
  const email = text(r.personalEmail);
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new Error(`source row ${sourceRow}: malformed personal email`);
  }
  return email;
}

// "MBA (in progress)" -> "MBA", "MS, CS (part-time, in progress)" -> "MS, CS
// (part-time)", "MBA (Finance) - in progress" -> "MBA (Finance)". The flag
// moves to alumni_education.in_progress.
function gradProgram(raw: string, sourceRow: number) {
  const program = raw
    .replace(/\s*\(in progress\)/i, "")
    .replace(/,\s*in progress\)/i, ")")
    .replace(/\s*-\s*in progress$/i, "");
  if (/in progress/i.test(program)) {
    throw new Error(`source row ${sourceRow}: unrecognized "in progress" phrasing`);
  }
  return { program: text(program), in_progress: program !== raw };
}

function refuseTrackedOutput(path: string) {
  try {
    execFileSync("git", ["check-ignore", "-q", path], { cwd: dirname(path) });
  } catch (err) {
    // 1 = inside a repo and not ignored. 128 = not in a repo at all, fine.
    if ((err as { status?: number }).status === 1) {
      throw new Error(`${path} is not git-ignored; write the seed into private/`);
    }
  }
}

const [alumniCsv, jobsCsv, outArg] = process.argv.slice(2);
if (!alumniCsv || !jobsCsv || !outArg) {
  console.error("usage: node scripts/alumni/build-seed.ts <alumni-db-import.csv> <experience-db-import.csv> <out.sql>");
  process.exit(1);
}
const out = resolve(outArg);
refuseTrackedOutput(out);

const alumni = [];
const education = [];
for (const r of parseCsv(readFileSync(alumniCsv, "utf8"))) {
  const sourceRow = Number(r.sourceRow);
  if (!Number.isInteger(sourceRow)) throw new Error(`bad sourceRow "${r.sourceRow}"`);
  alumni.push({
    source_row: sourceRow,
    first_name: text(r.firstName),
    last_name: text(r.lastName),
    class_year: year(r.classYear),
    college: text(r.college),
    majors: list(r.major, r.otherMajor),
    minors: list(r.minor, r.otherMinor),
    linkedin_url: linkedinUrl(r.linkedin, sourceRow),
    current_title: text(r.currentJobTitle),
    current_employer: text(r.currentEmployer),
    current_city: text(r.currentJobCity),
    current_state: text(r.currentJobState),
    involvements: list(r.involvements),
    ibe_evidence: text(r.ibeEvidence),
    email: personalEmail(r, sourceRow),
  });
  if (text(r.graduateSchool)) {
    education.push({
      source_row: sourceRow,
      institution: text(r.graduateSchool),
      ...gradProgram(r.graduateSchoolProgram, sourceRow),
      year: year(r.graduateSchoolYear),
    });
  }
}

const known = new Set(alumni.map((a) => a.source_row));
if (known.size !== alumni.length) throw new Error("duplicate sourceRow in the alumni CSV");

const jobs = parseCsv(readFileSync(jobsCsv, "utf8")).map((r) => {
  const sourceRow = Number(r.row);
  if (!known.has(sourceRow)) throw new Error(`job row for unknown source row ${r.row}`);
  const title = text(r.title);
  const company = text(r.company);
  return {
    source_row: sourceRow,
    position: Number(r.order),
    title,
    company,
    start_label: text(r.start),
    end_label: text(r.end),
    location: text(r.location),
    // Rows with neither title nor company are notes, e.g. older roles
    // LinkedIn hid behind "Load more".
    note: title || company ? null : text(r.raw),
  };
});

function jsonLiteral(value: unknown) {
  const json = JSON.stringify(value);
  if (json.includes("$seed$")) throw new Error("data contains the $seed$ quote tag");
  return `$seed$${json}$seed$::jsonb`;
}

// The alumni object's keys are the column list, so the SQL can't drift from
// it. source_row is the conflict key, so it is inserted but never updated.
const columns = Object.keys(alumni[0]);
const updated = columns.filter((c) => c !== "source_row");

const sql = `-- Generated by scripts/alumni/build-seed.ts. Holds personal data: never commit.
-- ${alumni.length} alumni, ${jobs.length} job rows, ${education.length} grad-school rows.
begin;

create temp table seed_alumni on commit drop as
select ${columns.join(", ")}
from jsonb_populate_recordset(null::public.alumni, ${jsonLiteral(alumni)});

insert into public.alumni (${columns.join(", ")})
select ${columns.join(", ")} from seed_alumni
on conflict (source_row) do update set
  ${updated.map((c) => `${c} = excluded.${c}`).join(",\n  ")},
  -- Every run stamps every row, so the directory's "Last updated" date is
  -- the last load, including loads that only changed job history.
  updated_at = now();

delete from public.alumni where source_row not in (select source_row from seed_alumni);

-- Every remaining alum is in the seed, so replace their history wholesale.
delete from public.alumni_jobs;
delete from public.alumni_education;

insert into public.alumni_jobs (
  alumni_id, position, title, company, start_label, end_label, location, note
)
select a.id, j.position, j.title, j.company, j.start_label, j.end_label, j.location, j.note
from jsonb_to_recordset(${jsonLiteral(jobs)}) as j(
  source_row int, position int, title text, company text, start_label text,
  end_label text, location text, note text
)
join public.alumni a using (source_row);

insert into public.alumni_education (alumni_id, institution, program, year, in_progress)
select a.id, e.institution, e.program, e.year, e.in_progress
from jsonb_to_recordset(${jsonLiteral(education)}) as e(
  source_row int, institution text, program text, in_progress boolean, year int
)
join public.alumni a using (source_row);

do $check$
begin
  if (select count(*) from public.alumni) <> ${alumni.length}
     or (select count(*) from public.alumni_jobs) <> ${jobs.length}
     or (select count(*) from public.alumni_education) <> ${education.length} then
    raise exception 'row counts do not match the CSV; rolled back';
  end if;
end
$check$;

commit;

select
  (select count(*) from public.alumni) as alumni,
  (select count(*) from public.alumni_jobs) as job_rows,
  (select count(*) from public.alumni_jobs where note is null) as jobs,
  (select count(*) from public.alumni_education) as grad_schools;
`;

writeFileSync(out, sql);
console.log(
  `wrote ${out}: ${alumni.length} alumni, ${jobs.length} job rows ` +
    `(${jobs.filter((j) => j.note).length} notes), ${education.length} grad-school rows`,
);
