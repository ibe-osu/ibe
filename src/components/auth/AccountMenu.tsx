"use client";

import { useState, type MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuthState } from "@/lib/auth/useAuthState";
import { createClient } from "@/lib/supabase/client";

// Matches the "Log In" button's footprint so the loading state doesn't
// cause a layout shift once the real auth state resolves.
const PLACEHOLDER_WIDTH = 84;

export default function AccountMenu() {
  const auth = useAuthState();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  async function handleSignOut() {
    closeMenu();
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (auth.status === "loading") {
    return <Box sx={{ width: PLACEHOLDER_WIDTH, height: 36.5 }} />;
  }

  if (auth.status === "signed-out") {
    return (
      <Button
        component={Link}
        href="/login"
        variant="outlined"
        color="primary"
        sx={{ ml: { xs: 0.5, md: 1 } }}
      >
        Log In
      </Button>
    );
  }

  return (
    <>
      <IconButton
        onClick={openMenu}
        aria-label="Account menu"
        aria-controls={anchorEl ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? "true" : undefined}
        sx={{ ml: { xs: 0.5, md: 1 }, color: "text.primary" }}
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {/*
          MUI's Menu walks its children directly to manage focus and keyboard
          navigation, so children must be a flat array — a Fragment breaks it
          ("The Menu component doesn't accept a Fragment as a child").
          Hence an explicit array with keys rather than `<>...</>`.
        */}
        {[
          ...(auth.email
            ? [
                <Box key="identity" sx={{ px: 2, py: 1 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Signed in as
                  </Typography>
                  <Typography variant="body2">{auth.email}</Typography>
                </Box>,
                <Divider key="divider" />,
              ]
            : []),
          <MenuItem key="signout" onClick={handleSignOut}>
            Sign out
          </MenuItem>,
        ]}
      </Menu>
    </>
  );
}
