import { Box, Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import NavButton from "./NavButton";
import MobileMenuButton from "./MobileMenuButton";
import AuthNavLinks from "@/components/auth/AuthNavLinks";
import AccountMenu from "@/components/auth/AccountMenu";
import ThemeToggle from "@/components/ui/ThemeToggle";

/**
 * Floating pill navigation. Fixed to the top of the viewport and centered,
 * so every page opens with the same quiet chrome.
 */
export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: { xs: 10, md: 14 },
        left: 0,
        right: 0,
        zIndex: "appBar",
        display: "flex",
        justifyContent: "center",
        px: { xs: 1.5, sm: 2 },
        pointerEvents: "none",
      }}
    >
      <Box
        sx={{
          pointerEvents: "auto",
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, md: 2.5 },
          pl: { xs: 1.5, md: 2 },
          pr: { xs: 1, md: 1 },
          py: 0.75,
          borderRadius: 999,
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "color-mix(in srgb, var(--mui-palette-background-paper) 90%, transparent)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          boxShadow: "0 1px 0 rgba(18,17,20,0.04), 0 12px 32px -20px rgba(18,17,20,0.35)",
          maxWidth: "100%",
        }}
      >
        <Link href="/" aria-label="IBE Honors Program home" style={{ display: "flex" }}>
          <Image
            src="/altLogo.png"
            alt="IBE Honors Program at The Ohio State University"
            width={112}
            height={38}
            priority
            className="invert-on-dark"
            style={{ height: 34, width: "auto" }}
          />
        </Link>

        <Box
          component="nav"
          aria-label="Primary"
          sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.5 }}
        >
          <NavButton href="/about">About</NavButton>
          <NavButton href="/alumni">Alumni</NavButton>
          <NavButton href="/student-life">Student Life</NavButton>
          <AuthNavLinks />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: { md: 0.5 } }}>
          <ThemeToggle />
          <Button
            component={Link}
            href="/recruitment"
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              borderRadius: 999,
              px: 2,
              py: 0.9,
              fontSize: "0.9rem",
            }}
          >
            Join Us
          </Button>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <AccountMenu />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <MobileMenuButton />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
