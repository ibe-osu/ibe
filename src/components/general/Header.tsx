import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import NavButton from "./NavButton";
import MobileMenuButton from "./MobileMenuButton";

export default function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: { xs: 64, md: 72 },
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", userSelect: "none" }}>
          <Link href="/" aria-label="IBE Honors Program home">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/altLogo.png"
                alt="IBE Honors Program at The Ohio State University"
                width={131}
                height={44}
                priority
              />
            </Box>
          </Link>
        </Box>

        {/* Desktop Nav */}
        <Box
          component="nav"
          aria-label="Primary"
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            gap: { xs: 0.5, md: 3 },
          }}
        >
          <NavButton href="/about">About</NavButton>
          <NavButton href="/alumni">Alumni</NavButton>
          <NavButton href="/student-life">Student Life</NavButton>
          <Button
            component={Link}
            href="/recruitment"
            color="primary"
            sx={{
              ml: { xs: 0.5, md: 1 },
              px: "1.25rem",
              py: "0.5rem",
            }}
          >
            Join Us
          </Button>
        </Box>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: "block", sm: "none" } }}>
          <MobileMenuButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
