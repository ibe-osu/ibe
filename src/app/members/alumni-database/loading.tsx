import { Box, Container, Skeleton, Typography } from "@mui/material";

// Placeholder while the directory query runs: the same title block, filter
// column and card grid as AlumniDirectory, so nothing jumps when it lands.
export default function AlumniDatabaseLoading() {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 5 } }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="overline" component="p" sx={{ color: "primary.main" }}>
          Members
        </Typography>
        <Typography variant="h3" component="h1">
          Alumni Database
        </Typography>
        <Skeleton sx={{ maxWidth: "62ch", mt: 1 }} />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "240px minmax(0, 1fr)" },
          columnGap: 5,
          alignItems: "start",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ display: { xs: "none", md: "block" }, height: 480 }}
        />
        <Box>
          <Skeleton variant="rectangular" sx={{ height: 48 }} />
          <Box
            sx={{
              mt: 2.5,
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            }}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <Skeleton key={i} variant="rectangular" sx={{ height: 180 }} />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
