import { Box, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";

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

/**
 * One alumni spotlight as an editorial row on the scarlet band: portrait,
 * a small ledger of major / minors / current role, the story, and a
 * LinkedIn link. Rows are separated by white hairlines, not boxes.
 */
export default function SpotlightCard(props: IProps) {
  const {
    name,
    graduationYear,
    major,
    minors,
    currentPosition,
    currentCompany,
    spotlightText,
    imageUrl,
    linkedinUrl,
  } = props;

  const minorsLabel = `Minor${minors.length > 1 ? "s" : ""}`;
  const minorsValue =
    minors.length === 2 ? `${minors[0]} and ${minors[1]}` : minors.join(", ");

  const facts = [
    { label: "Major", value: major },
    ...(minors.length > 0 ? [{ label: minorsLabel, value: minorsValue }] : []),
    { label: "Now", value: `${currentPosition} @ ${currentCompany}` },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 4fr) minmax(0, 8fr)" },
        columnGap: { xs: 3, md: 5 },
        rowGap: 3,
        alignItems: "start",
        py: { xs: 4, md: 5 },
        borderTop: "1px solid rgba(255, 255, 255, 0.28)",
        "&:last-of-type": {
          borderBottom: "1px solid rgba(255, 255, 255, 0.28)",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: { xs: "14rem", sm: "none" },
            aspectRatio: "1",
            overflow: "hidden",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
          }}
        >
          <Image
            src={imageUrl}
            alt={`Portrait of ${name}, IBE class of 20${graduationYear}`}
            fill
            sizes="(max-width: 600px) 224px, (max-width: 900px) 30vw, 260px"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
              pointerEvents: "none",
            }}
          />
        </Box>
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ color: "#fff", mb: 2.5 }}
        >
          {name}&nbsp;&rsquo;{graduationYear}
        </Typography>

        <Box
          component="dl"
          sx={{
            m: 0,
            mb: 3,
            display: "grid",
            gridTemplateColumns: "5rem 1fr",
            columnGap: 2,
            rowGap: 0.75,
          }}
        >
          {facts.map((fact) => (
            <Box key={fact.label} sx={{ display: "contents" }}>
              <Typography
                component="dt"
                variant="overline"
                sx={{ color: "rgba(255, 255, 255, 0.72)", pt: "0.25em" }}
              >
                {fact.label}
              </Typography>
              <Typography
                component="dd"
                variant="body1"
                sx={{ m: 0, color: "#fff", fontWeight: 600 }}
              >
                {fact.value}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: "62ch",
            lineHeight: 1.7,
            letterSpacing: "0.005em",
            textWrap: "pretty",
          }}
        >
          {spotlightText}
        </Typography>

        <Typography
          component="a"
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.75,
            mt: 3,
            color: "#fff",
            fontWeight: 600,
            backgroundImage: "linear-gradient(currentColor, currentColor)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 100%",
            backgroundSize: "0% 1px",
            transition: "background-size 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
            "&:hover": { backgroundSize: "100% 1px" },
            "& svg": { fontSize: "1.25rem" },
          }}
        >
          <LinkedInIcon /> LinkedIn
        </Typography>
      </Box>
    </Box>
  );
}
