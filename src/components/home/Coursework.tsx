import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Reveal from "@/components/general/Reveal";

export default function Coursework() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          component="h2"
          sx={{ textAlign: "center", mb: { xs: 3, md: 5 } }}
        >
          IBE Coursework
        </Typography>

        <Grid
          container
          spacing={{ xs: 4, lg: 8 }}
          justifyContent="center"
          alignItems="center"
        >
          {/* Left: coursework diagram */}
          <Grid>
            <Reveal variant="scale">
              <picture>
                <source
                  media="(max-width:800px)"
                  srcSet="/coursework/coursework-vertical.svg"
                />
                <Image
                  src="/coursework/coursework.svg"
                  alt="Diagram of the IBE four-year coursework plan across business and engineering"
                  width={700}
                  height={300}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </picture>
            </Reveal>
          </Grid>

          {/* Right: track details */}
          <Grid
            sx={{
              textAlign: { xs: "center", lg: "left" },
              maxWidth: "420px",
            }}
          >
            <Reveal variant="stagger">
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h3" sx={{ mb: 0.5 }}>
                  IBE
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  <strong>Engineering Majors</strong> — Business Minor
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  <strong>Business Majors</strong> — Engineering Sciences Minor
                </Typography>
              </Box>

              <Box>
                <Typography variant="h5" component="h3" sx={{ mb: 0.5 }}>
                  IBE-SI
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  <strong>Computer Science Engineering (CSE) Majors</strong> —
                  Business Minor
                </Typography>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  <strong>Business and Non-CSE</strong> — Computer Science Minor
                </Typography>
              </Box>
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
