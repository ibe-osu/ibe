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
        overflow: "hidden",
        color: active ? "primary.main" : "inherit",
        fontWeight: 600,
        backgroundColor: "transparent",
        transition: "color 0.25s ease",
        padding: "0.5rem 0.5rem",
        "&::after": {
          content: '""',
          position: "absolute",
          left: "50%",
          bottom: 4,
          transform: active
            ? "translateX(-50%) scaleX(1)"
            : "translateX(-50%) scaleX(0)",
          transformOrigin: "center",
          width: "100%",
          height: "2px",
          backgroundColor: "primary.main",
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        },
        "&:hover::after": {
          transform: "translateX(-50%) scaleX(1)",
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
