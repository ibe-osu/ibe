import { Box, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import Panel from "@/components/ui/Panel";
import Label from "@/components/ui/Label";

interface IProps {
  name: string;
  graduationYear: number;
  major: string;
  minors: string[];
  currentPosition: string;
  currentCompany: string;
  spotlightText: string;
  imageUrl: string;
  linkedinUrl: string;
}

/** One alumni spotlight panel: portrait, a small major/minors/now table, the story, LinkedIn. */
export default function SpotlightCard(props: IProps) {
  const { name, graduationYear, major, minors, currentPosition, currentCompany, spotlightText, imageUrl, linkedinUrl } = props;

  const minorsLabel = `Minor${minors.length > 1 ? "s" : ""}`;
  const minorsValue = minors.length === 2 ? `${minors[0]} and ${minors[1]}` : minors.join(", ");
  const facts = [
    { label: "Major", value: major },
    ...(minors.length > 0 ? [{ label: minorsLabel, value: minorsValue }] : []),
    { label: "Now", value: `${currentPosition} @ ${currentCompany}` },
  ];

  return (
    <Panel sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
      <Box sx={{ display: "grid", gridTemplateColumns: "6.5rem 1fr", gap: 2.5, p: { xs: 2.5, md: 3 }, borderBottom: "1px solid", borderColor: "divider", alignItems: "center" }}>
        <Box sx={{ position: "relative", aspectRatio: "1", overflow: "hidden", borderRadius: 1, backgroundColor: "background.panel" }}>
          <Image
            src={imageUrl}
            alt={`Portrait of ${name}, IBE class of 20${graduationYear}`}
            fill
            sizes="104px"
            style={{ objectFit: "cover", objectPosition: "top center" }}
          />
        </Box>
        <Box sx={{ display: "grid", gap: 0.25, minWidth: 0 }}>
          <Label sx={{ color: "signal.main" }}>Class of 20{graduationYear}</Label>
          <Typography variant="h3" component="h3">
            {name}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ p: { xs: 2.5, md: 3 }, display: "grid", gap: 2.5, alignContent: "start" }}>
        <Box component="dl" sx={{ m: 0, display: "grid", gridTemplateColumns: "5rem 1fr", columnGap: 2, rowGap: 0.75 }}>
          {facts.map((fact) => (
            <Box key={fact.label} sx={{ display: "contents" }}>
              <Label component="dt" sx={{ pt: "0.3em" }}>
                {fact.label}
              </Label>
              <Typography component="dd" variant="body2" sx={{ m: 0, fontWeight: 600 }}>
                {fact.value}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="body2" sx={{ color: "text.secondary", textWrap: "pretty" }}>
          {spotlightText}
        </Typography>
        <Typography
          component="a"
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          variant="body2"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            fontWeight: 600,
            color: "signal.main",
            width: "fit-content",
            "& svg": { fontSize: 18 },
            "&:hover": { textDecoration: "underline", textUnderlineOffset: "3px" },
          }}
        >
          <LinkedInIcon /> LinkedIn
        </Typography>
      </Box>
    </Panel>
  );
}
