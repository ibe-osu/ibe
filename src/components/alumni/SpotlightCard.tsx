import { Box, IconButton, Typography } from "@mui/material";
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

  return (
    <Box
      sx={{
        p: { xs: 2.5, md: 3 },
        backgroundColor: "#fff",
        flex: "1 1 0",
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, md: 2.5 },
          mb: 2.5,
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            width: { xs: "120px", sm: "150px", lg: "180px" },
            aspectRatio: "1",
            position: "relative",
            flexShrink: 0,
            overflow: "hidden",
            backgroundColor: "grey.100",
          }}
        >
          <Image
            src={imageUrl}
            alt={`Portrait of ${name}, IBE class of 20${graduationYear}`}
            fill
            sizes="(max-width: 600px) 120px, (max-width: 1200px) 150px, 180px"
            style={{
              objectFit: "cover",
              objectPosition: "top center",
              pointerEvents: "none",
            }}
          />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography variant="h5" component="h3" sx={{ mb: 1 }}>
            {name}&nbsp;&rsquo;{graduationYear}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography variant="body2">
              <Box component="span" sx={{ fontWeight: 700 }}>
                Major:
              </Box>{" "}
              {major}
            </Typography>
            {minors.length > 0 && (
              <Typography variant="body2">
                <Box component="span" sx={{ fontWeight: 700 }}>
                  {minorsLabel}:
                </Box>{" "}
                {minorsValue}
              </Typography>
            )}
            <Typography variant="body2">
              <Box component="span" sx={{ fontWeight: 700 }}>
                Now:
              </Box>{" "}
              {currentPosition} @ {currentCompany}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          borderTop: "1px solid",
          borderColor: "divider",
          pt: 2,
        }}
      >
        {spotlightText}
      </Typography>

      <Box sx={{ mt: "auto", pt: 1.5, display: "flex" }}>
        <IconButton
          component="a"
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} on LinkedIn`}
          sx={{
            color: "primary.main",
            ml: "-0.5rem",
            "&:hover": { color: "primary.dark" },
          }}
        >
          <LinkedInIcon color="inherit" sx={{ fontSize: "2.25rem" }} />
        </IconButton>
      </Box>
    </Box>
  );
}
