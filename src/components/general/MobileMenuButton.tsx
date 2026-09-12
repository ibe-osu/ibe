"use client";

import {
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import Image from "next/image";
import { useAuthState } from "@/lib/auth/useAuthState";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { serifFamily } from "@/theme/fonts";

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false);
  const auth = useAuthState();
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/alumni", label: "Alumni" },
    { href: "/student-life", label: "Student Life" },
    // "Resources" and "Alumni Database" are signed-in-only, same rule as
    // the desktop nav (src/components/auth/AuthNavLinks.tsx) — nothing
    // security-sensitive rides on this list, just what's shown.
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

  const linkSx = {
    px: 0,
    py: 2,
    borderBottom: "1px solid",
    borderColor: "divider",
    "&:hover": { backgroundColor: "transparent", color: "primary.main" },
  };

  const labelSx = {
    fontFamily: serifFamily,
    fontSize: "2rem",
    lineHeight: 1.1,
    letterSpacing: "-0.01em",
    color: "inherit",
  };

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        aria-label="open menu"
        sx={{ py: 2.5, color: "text.primary" }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: "100vw", borderTop: "3px solid", borderColor: "primary.main" },
        }}
      >
        <Box
          sx={{
            px: 2.5,
            pb: 4,
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: 61,
              mb: 2,
            }}
          >
            <Image
              src="/altLogo.png"
              alt="IBE Honors Program at The Ohio State University"
              width={131}
              height={44}
              priority
            />
            <IconButton
              onClick={() => setOpen(false)}
              aria-label="close menu"
              sx={{ color: "text.primary", mr: -1 }}
            >
              <CloseIcon sx={{ fontSize: 28 }} />
            </IconButton>
          </Box>

          <List
            component="nav"
            aria-label="Mobile"
            disablePadding
            sx={{ borderTop: "1px solid", borderColor: "divider" }}
          >
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  sx={linkSx}
                >
                  <Typography component="span" sx={labelSx}>
                    {link.label}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ mt: "auto", pt: 4, display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button
              component={Link}
              href="/recruitment"
              onClick={() => setOpen(false)}
              size="large"
              sx={{ py: "0.9rem" }}
            >
              Join Us
            </Button>
            {auth.status === "signed-in" ? (
              <Button variant="outlined" onClick={signOut} sx={{ py: "0.9rem" }}>
                Sign Out
              </Button>
            ) : (
              <Button
                component={Link}
                href="/login"
                variant="outlined"
                onClick={() => setOpen(false)}
                sx={{ py: "0.9rem" }}
              >
                Log In
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
