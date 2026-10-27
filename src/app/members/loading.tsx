import { Box, Container, Skeleton, Typography } from "@mui/material";
import { CALENDAR_FRAME_HEIGHT } from "@/components/members/calendarFrame";

// Shown the moment someone lands on /members (straight after logging in,
// say) while the server checks their membership, so the click visibly does
// something. Mirrors the page's title block and calendar frame.
export default function MembersLoading() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: { xs: 2.5, md: 2 } }}>
        <Typography variant="overline" component="p" sx={{ color: "primary.main" }}>
          Members
        </Typography>
        <Typography variant="h3" component="h1">
          IBE Calendar
        </Typography>
      </Box>
      <Skeleton variant="rectangular" sx={{ height: CALENDAR_FRAME_HEIGHT }} />
    </Container>
  );
}
