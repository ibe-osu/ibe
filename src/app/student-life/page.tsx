import StudentLife from "@/components/student-life/StudentLife";
import KeynoteSpeakers from "@/components/student-life/KeynoteSpeakers";
import { Box } from "@mui/material";

export default function About() {
  return (
    // Keep the hero at the top and let the keynote module absorb leftover height
    // so the page fills the viewport even when the carousel is still under construction.
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <StudentLife />
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <KeynoteSpeakers />
      </Box>
    </Box>
  );
}
