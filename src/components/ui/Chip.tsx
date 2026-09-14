import { Box } from "@mui/material";
import { monoFamily } from "@/theme/fonts";

/** Pill with a scarlet dot: the hero kicker and small status tags. */
export default function Chip({ children }: { children: React.ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 999,
        px: 1.5,
        py: 0.6,
        fontFamily: monoFamily,
        fontSize: "0.7rem",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "text.secondary",
        backgroundColor: "background.paper",
        textAlign: "center",
        lineHeight: 1.4,
        "&::before": {
          content: '""',
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "signal.main",
          flexShrink: 0,
        },
      }}
    >
      {children}
    </Box>
  );
}
