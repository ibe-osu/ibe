import theme from "@/theme/theme";
import { Button } from "@mui/material";
import Link from "next/link";

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function NavButton({ children, href }: NavButtonProps) {
  return (
    <Button
      variant="text"
      color="inherit"
      component={Link}
      href={href}
      sx={{
        position: "relative",
        overflow: "hidden",
        color: "inherit",
        backgroundColor: "transparent",
        transition: "color 0.3s ease",
        padding: "0.5rem 0.5rem",
        "&::after": {
          content: '""',
          position: "absolute",
          left: "50%",
          bottom: 4,
          transform: "translateX(-50%) scaleX(0)",
          transformOrigin: "center",
          width: "100%",
          height: "3px",
          backgroundColor: theme.palette.primary.main,
          transition: "transform 0.3s ease 0.05s",
        },
        "&:hover::after": {
          transform: "translateX(-50%) scaleX(1)", // grow outwards evenly
        },
        "&:hover": {
          color: theme.palette.primary.main,
        },
      }}
    >
      {children}
    </Button>
  );
}
