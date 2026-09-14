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
      component={Link}
      href={href}
      aria-current={active ? "page" : undefined}
      sx={{
        color: active ? "text.primary" : "text.secondary",
        fontSize: "0.9rem",
        fontWeight: active ? 600 : 500,
        px: 1.25,
        py: 0.75,
        minWidth: 0,
        borderRadius: 999,
        backgroundColor: active ? "action.hover" : "transparent",
        "&:hover": { color: "text.primary", backgroundColor: "action.hover", transform: "none" },
      }}
    >
      {children}
    </Button>
  );
}
