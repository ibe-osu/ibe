import { Box, Grid, Typography } from "@mui/material";

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <Grid
      size={{ xs: 8, sm: 7, md: 6, xl: 3 }}
      sx={{
        px: "1rem",
        borderRight: {
          xs: "none",
          xl: "2px solid white",
        },
        borderBottom: {
          xs: "2px solid white",
          md: "none",
        },
        py: { xs: "1rem", lg: 0 },
        "&:nth-of-type(-n+2)": {
          pb: { lg: "2rem", xl: 0 }, // Add padding below for the first two items on lg screens
        },
        "&:last-child": {
          borderRight: "none",
          borderBottom: "none",
          pb: "0rem",
        },
      }}
    >
      <Typography variant="h2">{value}</Typography>
      <Typography variant="h4">{label}</Typography>
    </Grid>
  );
}

export default function OurStats() {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "secondary.main",
        py: "3rem",
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ pb: { xs: "0rem", lg: "1rem" } }}>
        Our Statistics:
      </Typography>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <Stat value="3.77" label="Average GPA" />
        <Stat value="34" label="Average ACT" />
        <Stat value="100%" label="Job Placement" />
        <Stat value="$93k" label="Avg. Starting Salary" />
      </Grid>
    </Box>
  );
}
