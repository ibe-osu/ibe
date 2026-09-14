import { Box, type SxProps, type Theme } from "@mui/material";

interface WrapProps {
  children: React.ReactNode;
  /** "text" narrows to a 68ch reading column. */
  width?: "site" | "text";
  sx?: SxProps<Theme>;
  component?: React.ElementType;
  id?: string;
}

const WIDTHS = { site: "1120px", text: "68ch" } as const;

export default function Wrap({ children, width = "site", sx, component = "div", id }: WrapProps) {
  return (
    <Box
      id={id}
      component={component}
      sx={[
        {
          width: "100%",
          maxWidth: WIDTHS[width],
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Box>
  );
}
