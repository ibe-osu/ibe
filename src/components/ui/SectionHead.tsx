import { Box, Typography } from "@mui/material";
import Label from "./Label";

interface SectionHeadProps {
  label?: string;
  title: string;
  lede?: React.ReactNode;
  id?: string;
  as?: "h2" | "h3";
  align?: "center" | "left";
}

export default function SectionHead({ label, title, lede, id, as = "h2", align = "center" }: SectionHeadProps) {
  const centered = align === "center";
  return (
    <Box
      sx={{
        display: "grid",
        gap: 1.25,
        justifyItems: centered ? "center" : "start",
        textAlign: centered ? "center" : "left",
        mb: { xs: 3, md: 4 },
      }}
    >
      {label && <Label>{label}</Label>}
      <Typography variant="h2" component={as} id={id} sx={{ maxWidth: "22ch" }}>
        {title}
      </Typography>
      {lede && (
        <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: "58ch", fontSize: { md: "1.125rem" } }}>
          {lede}
        </Typography>
      )}
    </Box>
  );
}
