import Roster from "./Roster";

const PEOPLE = [
  { name: "Katie Dunn", role: "President", email: "dunn.973@osu.edu" },
  { name: "Carlo Polisena", role: "Executive VP", email: "polisena.6@osu.edu" },
  { name: "Riley Angel", role: "VP of Recruitment", email: "angel.146@osu.edu" },
  { name: "Anya Mehta", role: "VP of Alumni Relations", email: "mehta.684@osu.edu" },
  { name: "Owen Blevins", role: "VP of Membership Development", email: "blevins.348@osu.edu" },
  { name: "Emma Cheng", role: "VP of Corporate Relations", email: "cheng.2066@osu.edu" },
  { name: "Devhuti Patel", role: "VP of Operations", email: "patel.5493@osu.edu" },
  { name: "Charles Hite", role: "VP of Marketing", email: "hite.189@osu.edu" },
  { name: "Asha Segall", role: "Treasurer", email: "segall.22@osu.edu" },
  { name: "Yuvraj Atre", role: "VP of Technology", email: "atre.7@osu.edu" },
];

export default function StudentLeadership() {
  return (
    <Roster
      id="student-leadership"
      label="Elected board"
      title="Student leadership"
      lede="The elected student board behind recruitment, alumni and corporate relations, membership, marketing, operations, and technology."
      people={PEOPLE}
      columns={{ xs: 2, sm: 3, md: 5 }}
    />
  );
}
