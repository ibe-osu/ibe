import { AppBar, Box, Toolbar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import LoginButton from "./LoginButton";
import NavButton from "./NavButton";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", userSelect: "none" }}>
          <Link href="/">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Image
                src="/altLogo.png"
                alt="IBE Logo"
                width={131}
                height={44}
                priority
              />
            </Box>
          </Link>
        </Box>

        {/* Navigation Links & Login Button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0, md: 4 },
          }}
        >
          <NavButton href="/about">About</NavButton>
          <NavButton href="/recruitment">Join Us</NavButton>
          <NavButton href="/alumni">Alumni</NavButton>
          <NavButton href="/student-life">Student Life</NavButton>
          <LoginButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
