import { Box, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import Link from "next/link";

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

function formatMinors(minors: string[]): string {
  if (minors.length === 2) return `${minors[0]} and ${minors[1]}`;
  return minors.join(", ");
}

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

  const meta: { label: string; value: string }[] = [
    { label: "Major", value: major },
    ...(minors.length > 0
      ? [
          {
            label: minors.length > 1 ? "Minors" : "Minor",
            value: formatMinors(minors),
          },
        ]
      : []),
    { label: "Now", value: `${currentPosition} @ ${currentCompany}` },
  ];

  return (
    <Box
      component="article"
      sx={{
        p: { xs: "1.5rem", md: "2rem" },
        backgroundColor: "secondary.main",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: "1.25rem", md: "1.5rem" },
          mb: "1.5rem",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: { xs: "108px", sm: "132px", md: "148px" },
            aspectRatio: "1",
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
            backgroundColor: "grey.200", // prevents layout shift before load
          }}
        >
          <Image
            src={imageUrl}
            alt={`Portrait of ${name}`}
            fill
            sizes="(max-width: 600px) 108px, (max-width: 900px) 132px, 148px"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
              pointerEvents: "none",
            }}
          />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h5" sx={{ mb: "0.75rem" }}>
            {name}{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              &rsquo;{graduationYear}
            </Box>
          </Typography>
          <Box component="dl" sx={{ m: 0 }}>
            {meta.map(({ label, value }) => (
              <Box key={label} sx={{ mb: "0.625rem" }}>
                <Typography
                  component="dt"
                  sx={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    color: "text.secondary",
                    lineHeight: 1.4,
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  component="dd"
                  variant="body2"
                  sx={{ m: 0, color: "text.primary", lineHeight: 1.5 }}
                >
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box sx={{ height: "1px", backgroundColor: "grey.300", mb: "1.25rem" }} />

      <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
        {spotlightText}
      </Typography>

      <Box sx={{ mt: "auto", pt: "1.5rem" }}>
        <Typography
          component={Link}
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="body2"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: 600,
            color: "primary.main",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.main",
              outlineOffset: "2px",
            },
          }}
        >
          <LinkedInIcon sx={{ fontSize: "1.375rem" }} aria-hidden />
          Connect with {name.split(" ")[0]} on LinkedIn
        </Typography>
      </Box>
    </Box>
  );
}
