import { Box, IconButton, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";
import Image from "next/image";
import Wrap from "@/components/ui/Wrap";
import Label from "@/components/ui/Label";

const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <IconButton
    component="a"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    size="small"
    sx={{
      width: 36,
      height: 36,
      border: "1px solid",
      borderColor: "divider",
      color: "text.secondary",
      "&:hover": { color: "text.primary", borderColor: "text.primary" },
    }}
  >
    {children}
  </IconButton>
);

const FootLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Typography
    component={Link}
    href={href}
    variant="body2"
    sx={{ color: "text.secondary", width: "fit-content", "&:hover": { color: "text.primary" } }}
  >
    {children}
  </Typography>
);

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: "1px solid", borderColor: "divider", mt: { xs: 8, md: 12 }, py: { xs: 5, md: 7 } }}>
      <Wrap>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1.5fr 1fr 1fr 1fr" },
            gap: { xs: 4, md: 5 },
          }}
        >
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "auto" } }}>
            <Image
              src="/altLogo.png"
              alt="IBE Honors Program at The Ohio State University"
              width={131}
              height={44}
              className="invert-on-dark"
              style={{ height: 38, width: "auto", marginBottom: 12 }}
            />
            <Typography variant="body2" sx={{ color: "text.secondary", maxWidth: "36ch" }}>
              Integrated Business &amp; Engineering Honors Program at The Ohio State University. Columbus, Ohio.
            </Typography>
          </Box>

          <Box>
            <Label sx={{ mb: 1.5 }}>Explore</Label>
            <Stack component="nav" aria-label="Footer" spacing={0.75}>
              <FootLink href="/">Home</FootLink>
              <FootLink href="/about">About</FootLink>
              <FootLink href="/recruitment">Join Us</FootLink>
              <FootLink href="/alumni">Alumni</FootLink>
              <FootLink href="/student-life">Student Life</FootLink>
            </Stack>
          </Box>

          <Box>
            <Label sx={{ mb: 1.5 }}>Contact</Label>
            <Stack spacing={0.75}>
              <FootLink href="mailto:ohiostateibe@osu.edu">ohiostateibe@osu.edu</FootLink>
              <FootLink href="https://forms.gle/hbkbG9sRqqBhPeag8">IBE Interest Form ↗</FootLink>
              <FootLink href="/login">Member log in</FootLink>
            </Stack>
          </Box>

          <Box>
            <Label sx={{ mb: 1.5 }}>Connect</Label>
            <Stack direction="row" spacing={1}>
              <SocialIcon href="https://www.instagram.com/ohiostateibe/" label="IBE on Instagram">
                <InstagramIcon sx={{ fontSize: 18 }} />
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/company/ibeprogram/" label="IBE on LinkedIn">
                <LinkedInIcon sx={{ fontSize: 18 }} />
              </SocialIcon>
              <SocialIcon href="https://www.facebook.com/ohiostateibe/" label="IBE on Facebook">
                <FacebookIcon sx={{ fontSize: 18 }} />
              </SocialIcon>
            </Stack>
          </Box>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ mt: { xs: 4, md: 5 }, pt: 2.5, borderTop: "1px solid", borderColor: "divider", justifyContent: "space-between" }}
        >
          <Typography variant="body2" sx={{ color: "text.disabled" }}>
            © {new Date().getFullYear()} IBE Honors Program · The Ohio State University
          </Typography>
          <Typography variant="body2" sx={{ color: "text.disabled" }}>
            Made with ❤️ in Columbus
          </Typography>
        </Stack>
      </Wrap>
    </Box>
  );
}
