import { Box } from "@mui/material";
import Wrap from "@/components/ui/Wrap";
import Panel from "@/components/ui/Panel";
import SectionHead from "@/components/ui/SectionHead";
import IndividualCard from "./IndividualCard";

interface Person {
  name: string;
  role: string;
  email: string;
}

interface RosterProps {
  id: string;
  label: string;
  title: string;
  lede?: string;
  people: Person[];
  columns?: { xs: number; sm: number; md: number };
}

/** A group of people as one ruled panel (1px gaps over the divider draw the grid). */
export default function Roster({ id, label, title, lede, people, columns = { xs: 2, sm: 3, md: 3 } }: RosterProps) {
  return (
    <Box component="section" aria-labelledby={id} sx={{ pt: { xs: 8, md: 12 } }}>
      <Wrap sx={{ display: "grid", gap: { xs: 3, md: 4 } }}>
        <SectionHead id={id} label={label} title={title} lede={lede} />
        <Panel
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: `repeat(${columns.xs}, minmax(0, 1fr))`,
              sm: `repeat(${columns.sm}, minmax(0, 1fr))`,
              md: `repeat(${columns.md}, minmax(0, 1fr))`,
            },
            gap: "1px",
            backgroundColor: "divider",
          }}
        >
          {people.map((person) => (
            <IndividualCard key={person.email} {...person} />
          ))}
        </Panel>
      </Wrap>
    </Box>
  );
}
