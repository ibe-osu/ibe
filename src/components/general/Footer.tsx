import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

const SocialIcon = (props: SocialIconProps) => {
  return (
    <IconButton
      component="a"
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props.label}
      sx={{
        color: "#fff",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: 0,
        transition: "background-color 0.2s ease, border-color 0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          borderColor: "rgba(255, 255, 255, 0.6)",
        },
      }}
    >
      {props.children}
    </IconButton>
  );
};

interface PageLinkProps {
  text: string;
  to: string;
}

const PageLink = (props: PageLinkProps) => {
  return (
    <Typography
      component={Link}
      href={`/${props.to}`}
      variant="body1"
      sx={{
        color: "rgba(255, 255, 255, 0.85)",
        width: "fit-content",
        transition: "color 0.2s ease",
        "&:hover": {
          color: "#fff",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        },
      }}
    >
      {props.text}
    </Typography>
  );
};

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "#fff",
        pt: { xs: 5, md: 7 },
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr 1fr" },
            gap: { xs: 4, md: 6 },
            pb: { xs: 4, md: 6 },
          }}
        >
          {/* Program identity */}
          <Box>
            <Typography
              variant="h4"
              component="p"
              sx={{ mb: 1.5, color: "#fff" }}
            >
              IBE Honors Program
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.85)", maxWidth: "42ch" }}
            >
              The Integrated Business &amp; Engineering Honors Program at The
              Ohio State University — preparing the next generation of leaders
              at the intersection of business and technology.
            </Typography>
          </Box>

          {/* Explore */}
          <Box>
            <Typography
              variant="h6"
              component="p"
              sx={{ mb: 1.5, color: "#fff" }}
            >
              Explore
            </Typography>
            <Stack component="nav" aria-label="Footer" spacing={1}>
              <PageLink to="" text="Home" />
              <PageLink to="about" text="About" />
              <PageLink to="recruitment" text="Join Us" />
              <PageLink to="alumni" text="Alumni" />
              <PageLink to="student-life" text="Student Life" />
            </Stack>
          </Box>

          {/* Connect */}
          <Box>
            <Typography
              variant="h6"
              component="p"
              sx={{ mb: 1.5, color: "#fff" }}
            >
              Connect
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <SocialIcon
                href="https://www.instagram.com/ohiostateibe/"
                label="IBE on Instagram"
              >
                <InstagramIcon sx={{ fontSize: "1.5rem" }} />
              </SocialIcon>
              <SocialIcon
                href="https://www.linkedin.com/company/ibeprogram/"
                label="IBE on LinkedIn"
              >
                <LinkedInIcon sx={{ fontSize: "1.5rem" }} />
              </SocialIcon>
              <SocialIcon
                href="https://www.facebook.com/ohiostateibe/"
                label="IBE on Facebook"
              >
                <FacebookIcon sx={{ fontSize: "1.5rem" }} />
              </SocialIcon>
            </Stack>
            <Typography
              variant="body2"
              sx={{ mt: 2, color: "rgba(255, 255, 255, 0.85)" }}
            >
              Columbus, Ohio
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.25)" }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            pt: 2.5,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
            © {new Date().getFullYear()} IBE Honors Program · The Ohio State
            University
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.85)" }}>
            Made with ❤️ in Columbus
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
