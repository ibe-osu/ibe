import { Box, type BoxProps } from "@mui/material";

interface PanelProps extends BoxProps {
  /** "lift" adds the one soft shadow reserved for floating things. */
  lift?: boolean;
  /** Use the deeper panel tint instead of paper. */
  tone?: "paper" | "panel";
}

/**
 * The site's basic container: a hairline border on a panel tint with an
 * 8px radius. Everything that needs to read as "one object" sits in one.
 */
export default function Panel({ lift = false, tone = "paper", sx, children, ...rest }: PanelProps) {
  return (
    <Box
      {...rest}
      sx={[
        {
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          backgroundColor: tone === "panel" ? "background.panel" : "background.paper",
          overflow: "hidden",
          boxShadow: lift
            ? "0 1px 0 rgba(18,17,20,0.04), 0 12px 32px -20px rgba(18,17,20,0.35)"
            : "none",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Box>
  );
}
