"use client";

import { Button } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function NavButton({ children, href }: NavButtonProps) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Button
      variant="text"
      color="inherit"
      component={Link}
      href={href}
      aria-current={active ? "page" : undefined}
      sx={{
        position: "relative",
        color: active ? "primary.main" : "text.primary",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        backgroundColor: "transparent",
        transition: "color 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        padding: "0.5rem 0.5rem",
        minWidth: 0,
        "&::after": {
          content: '""',
          position: "absolute",
          left: "0.5rem",
          right: "0.5rem",
          bottom: 4,
          height: "1.5px",
          backgroundColor: "primary.main",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
        },
        "&:hover::after": {
          transform: "scaleX(1)",
        },
        "&:hover": {
          color: "primary.main",
          backgroundColor: "transparent",
        },
      }}
    >
      {children}
    </Button>
  );
}
