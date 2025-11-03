import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import theme from "@/theme/theme";

export default function RecruitmentHero() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 6,
          alignItems: "flex-start",
          overflow: "visible",
          px: { xs: 4, md: 10 },
          py: { xs: 4, md: 8 },
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box sx={{ flex: 1, maxWidth: { md: "60ch" } }}>
          <Typography variant="h2" sx={{ mb: 2 }}>
            Recruitment
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            Application to the IBE program is open to prospective students
            previously admitted into the Ohio State University Max M. Fisher
            College of Business or College of Engineering Honors programs. From
            this group of talented individuals, we select a class of up to 72
            (36 per focus area) students. Our two-stage admission process allows
            us to focus on selectively admitting talented individuals.
          </Typography>

          <Box
            sx={{
              borderTop: "4px solid",
              borderColor: theme.palette.common.black,
              mt: 3,
              mb: 3,
            }}
          />

          <Typography
            variant="h4"
            sx={{ color: theme.palette.primary.main, mb: 2, fontWeight: 700 }}
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
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "common.white",
                px: 3,
                py: 1,
                textTransform: "none",
                boxShadow: 4,
                "&:hover": { bgcolor: theme.palette.primary.light },
              }}
            >
              Engineering Application
            </Button>

            <Button
              href="#"
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "common.white",
                px: 3,
                py: 1,
                textTransform: "none",
                boxShadow: 4,
                "&:hover": { bgcolor: theme.palette.primary.light },
              }}
            >
              Business Application
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            flex: { xs: "none", md: "0 0 48%" },
            display: "flex",
            justifyContent: "center",
            alignSelf: { md: "center" },
            transform: { md: "translateX(6rem)" },
            overflow: "visible",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: 600 },
              maxWidth: { md: 800 },
              aspectRatio: "4/3",
              position: "relative",
            }}
          >
            <Image
              src="/recruitment/welcome.jpeg"
              alt="Recruitment"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width:600px) 100vw, 480px"
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          bgcolor: "primary.main",
          color: "common.white",
          textAlign: "center",
          py: { xs: 4, md: 6 },
          mt: 6,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontFamily: theme.typography.fontFamily,
            color: "common.white",
          }}
        >
          Learn More About IBE
        </Typography>
      </Box>
    </>
  );
}
