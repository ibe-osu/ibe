import Roster from "./Roster";

const PEOPLE = [
  { name: "Kristina Kennedy", role: "Senior Program Director", email: "kennedy.443@osu.edu" },
  { name: "Michael Leiblein", role: "Founding Director", email: "leiblein.1@osu.edu" },
  { name: "Heather Shepherd", role: "Program Manager", email: "shepherd.550@osu.edu" },
];

export default function SeniorLeadership() {
  return <Roster id="senior-leadership" label="Faculty and staff" title="Senior leadership" people={PEOPLE} columns={{ xs: 1, sm: 3, md: 3 }} />;
}
