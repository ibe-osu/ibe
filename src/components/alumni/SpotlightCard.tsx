import { Box, IconButton, Typography } from "@mui/material";
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

  return (
    <>
      <Box
        sx={{
          p: "1rem",
          backgroundColor: "secondary.main",
          flex: "1 1 0",
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            mb: "1rem",
          }}
        >
          <Box
            sx={{
              width: {
                xs: "140px", // mobile
                sm: "180px", // small tablet
                md: "220px", // laptop
                lg: "260px", // large screens
                xl: "300px", // big desktop (your current size)
              },
              aspectRatio: "1",
              position: "relative",
              flexShrink: 0,
              borderRadius: "0.25rem",
              overflow: "hidden",
              backgroundColor: "secondary.dark", // prevents layout shift before load
            }}
          >
            <Image
              src={imageUrl}
              alt={`${name}'s spotlight`}
              fill
              sizes="(max-width: 600px) 140px, (max-width: 900px) 180px, (max-width: 1200px) 220px, (max-width: 1536px) 260px, 300px"
              style={{
                objectFit: "cover",
                objectPosition: "top center",
                pointerEvents: "none",
              }}
            />
          </Box>

          <Box>
            <Typography variant="h5" sx={{ mb: "0.5rem" }}>
              {name}, &apos;{graduationYear}
            </Typography>
            <Typography variant="body1">
              Major: {major}
              <Box component="span" sx={{ display: "block", height: "1rem" }} />
              {minors.length > 0 && (
                <>
                  Minor{minors.length > 1 ? "s" : ""}:{" "}
                  {minors.length === 2
                    ? `${minors[0]} and ${minors[1]}`
                    : minors.join(", ")}
                  <Box
                    component="span"
                    sx={{ display: "block", height: "1rem" }}
                  />
                </>
              )}
              Current Position: {currentPosition} @ {currentCompany}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1">{spotlightText}</Typography>
        <Box
          sx={{
            mt: "auto",
            mb: "-0.5rem",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Link href={linkedinUrl} target="_blank">
            <IconButton sx={{ color: "secondary.dark" }}>
              <LinkedInIcon color="inherit" sx={{ fontSize: "2.5rem" }} />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </>
  );
}
