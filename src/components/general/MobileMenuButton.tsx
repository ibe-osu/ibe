"use client";

import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import Image from "next/image";

export default function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/recruitment", label: "Join Us" },
    { href: "/alumni", label: "Alumni" },
    { href: "/student-life", label: "Student Life" },
  ];

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        aria-label="open menu"
        sx={{ py: 2.5 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: "100vw" } }}
      >
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
            <IconButton onClick={() => setOpen(false)} aria-label="close menu">
              <CloseIcon sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>

          <List>
            {navLinks.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={link.href}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText
                    primary={link.label}
                    sx={{
                      textAlign: "right",
                      "& .MuiTypography-root": {
                        fontSize: "2rem",
                        fontWeight: 700,
                        color: "primary.main",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
