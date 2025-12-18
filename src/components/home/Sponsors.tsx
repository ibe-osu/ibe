import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { SPONSORS } from "@/data/sponsors";

export default function Sponsors() {
  return (
    <Box
      sx={{
        py: "3rem",
        px: { xs: "1rem", md: "4rem" },
        textAlign: "center",
      }}
    >
      <Typography variant="h3" sx={{ pb: { xs: "0rem", lg: "1rem" } }}>
        Program Sponsors:
      </Typography>
      <Grid container justifyContent="space-evenly" alignItems="center">
        {SPONSORS.map((sponsor) => (
          <Box
            key={sponsor.name}
            sx={{ py: { xs: "0rem", md: "0.5rem" }, p: "0.5rem" }}
          >
            <Image
              src={sponsor.logoUrl}
              alt={sponsor.name}
              width={150}
              height={100}
              style={{ maxWidth: "150px", maxHeight: "100px" }}
            />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
