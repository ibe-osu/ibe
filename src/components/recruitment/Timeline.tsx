import Box from "@mui/material/Box";

export default function TimelineIllustration() {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 10 } }}>
      <Box
        component="img"
        src="/recruitment/timeline.svg"
        alt="Application Timeline"
        sx={{ display: "block", width: "100%", height: "auto", maxWidth: 1400, mx: "auto" }}
      />
    </Box>
  );
}
