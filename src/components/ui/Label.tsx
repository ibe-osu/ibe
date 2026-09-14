import { Typography, type TypographyProps } from "@mui/material";

/** Small tracked mono label: section kickers, table heads, metadata. */
export default function Label({ sx, children, ...rest }: TypographyProps) {
  return (
    <Typography
      variant="overline"
      component="span"
      {...rest}
      sx={[{ display: "block", color: "text.disabled" }, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      {children}
    </Typography>
  );
}
