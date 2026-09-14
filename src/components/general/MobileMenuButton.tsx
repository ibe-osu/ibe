"use client";

import { Box, Button, IconButton, Drawer, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "@/lib/auth/useAuthState";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { displayFamily } from "@/theme/fonts";

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  const auth = useAuthState();
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/alumni", label: "Alumni" },
    { href: "/student-life", label: "Student Life" },
    // Signed-in-only links follow the same cosmetic rule as the desktop
    // nav (src/components/auth/AuthNavLinks.tsx); the real gate is on the
    // /members pages themselves.
    ...(auth.status === "signed-in"
      ? [
          { href: "/members", label: "Resources" },
          { href: "/members/alumni-database", label: "Alumni Database" },
        ]
      : []),
  ];

  async function signOut() {
    setOpen(false);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        aria-label="open menu"
        size="small"
        sx={{ width: 34, height: 34, color: "text.primary", border: "1px solid", borderColor: "divider" }}
      >
        <MenuIcon sx={{ fontSize: 20 }} />
      </IconButton>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: "100vw" } }}>
        <Box sx={{ px: 2.5, pb: 4, minHeight: "100%", display: "flex", flexDirection: "column" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 64, mb: 2 }}>
            <Image
              src="/altLogo.png"
              alt="IBE Honors Program at The Ohio State University"
              width={112}
              height={38}
              className="invert-on-dark"
              style={{ height: 34, width: "auto" }}
            />
            <IconButton onClick={() => setOpen(false)} aria-label="close menu" sx={{ color: "text.primary", mr: -1 }}>
              <CloseIcon sx={{ fontSize: 26 }} />
            </IconButton>
          </Box>

          <List component="nav" aria-label="Mobile" disablePadding sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  sx={{ px: 0, py: 1.75, borderBottom: "1px solid", borderColor: "divider" }}
                >
                  <Typography
                    component="span"
                    sx={{ fontFamily: displayFamily, fontWeight: 600, fontSize: "1.75rem", letterSpacing: "-0.02em", lineHeight: 1.1 }}
                  >
                    {link.label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: "auto", pt: 4, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button component={Link} href="/recruitment" onClick={() => setOpen(false)} size="large">
              Join Us
            </Button>
            {auth.status === "signed-in" ? (
              <Button variant="outlined" size="large" onClick={signOut}>
                Sign Out
              </Button>
            ) : (
              <Button component={Link} href="/login" variant="outlined" size="large" onClick={() => setOpen(false)}>
                Log In
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
