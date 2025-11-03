import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import theme from "@/theme/theme";

export default function RecruitmentHero() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 6,
        alignItems: "flex-start",
        overflow: "visible",
        px: { xs: 2, md: 10 },
        py: { xs: 4, md: 8 },
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box sx={{ flex: 1, maxWidth: { md: "60ch" } }}>
        <Typography
          variant="h2"
          sx={{ mb: 2, fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" }, lineHeight: { xs: 1.15 } }}
        >
          Recruitment
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          Application to the IBE program is open to prospective students
          previously admitted into the Ohio State University Max M. Fisher
          College of Business or College of Engineering Honors programs. From
          this group of talented individuals, we select a class of up to 72
          (36 per focus area) students. Our two-stage admission process allows
          us to focus on selectively admitting talented individuals.
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: 600, sm: 480, md: 600 },
            aspectRatio: "4/3",
            position: "relative",
            mx: "auto",
            mb: { xs: 3, md: 0 },
            display: { xs: "block", md: "none" },
          }}
        >
          <Image
            src="/recruitment/welcome.jpeg"
            alt="Recruitment"
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width:900px) 100vw, 600px"
          />
        </Box>

        <Box sx={{ borderTop: "4px solid", borderColor: theme.palette.common.black, mt: 3, mb: 3 }} />

        <Typography
          variant="h4"
          sx={{ mb: 2, fontWeight: 700, color: theme.palette.primary.main }}
        >
          Fall 2025 Applications are Now Open!
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Application to the IBE Honors Program is restricted to incoming
          first-year business & engineering students previously admitted to
          University Honors in the Fisher College of Business or College of
          Engineering. Please access the application at the links below:
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
          <Button
            href="#"
            variant="contained"
            sx={{ px: 3, py: 1, textTransform: "none", boxShadow: 4 }}
          >
            Engineering Application
          </Button>

          <Button
            href="#"
            variant="contained"
            sx={{ px: 3, py: 1, textTransform: "none", boxShadow: 4 }}
          >
            Business Application
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: 600, sm: 480, md: 600 },
          aspectRatio: "4/3",
          position: "relative",
          mx: "auto",
          mb: { xs: 3, md: 0 },
          display: { xs: "none", md: "flex" },
          flex: { xs: "none", md: "0 0 48%" },
          justifyContent: { md: "center" },
          alignSelf: { md: "center" },
          overflow: "visible",
        }}
      >
        <Image
          src="/recruitment/welcome.jpeg"
          alt="Recruitment"
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width:900px) 100vw, 600px"
        />
      </Box>
    </Box>
  );
}
