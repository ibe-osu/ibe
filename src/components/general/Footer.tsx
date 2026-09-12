import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import Link from "next/link";
import { serifFamily } from "@/theme/fonts";

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
        border: "1px solid rgba(255, 255, 255, 0.22)",
        borderRadius: 0,
        width: 44,
        height: 44,
        transition:
          "background-color 0.2s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        "&:hover": {
          backgroundColor: "primary.main",
          borderColor: "primary.main",
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
        color: "rgba(255, 255, 255, 0.78)",
        width: "fit-content",
        lineHeight: 1.4,
        letterSpacing: "0.01em",
        backgroundImage: "linear-gradient(currentColor, currentColor)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 100%",
        backgroundSize: "0% 1px",
        transition:
          "background-size 0.28s cubic-bezier(0.22, 1, 0.36, 1), color 0.2s cubic-bezier(0.25, 1, 0.5, 1)",
        "&:hover": {
          color: "#fff",
          backgroundSize: "100% 1px",
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
        backgroundColor: "ink.main",
        color: "#fff",
        pt: { xs: 7, md: 10 },
        pb: { xs: 3, md: 4 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, md: 4, lg: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
            alignItems: "end",
            gap: { xs: 3, md: 6 },
            pb: { xs: 4, md: 5 },
            borderBottom: "1px solid",
            borderColor: "primary.main",
          }}
        >
          <Typography
            component="p"
            sx={{
              fontFamily: serifFamily,
              fontSize: "clamp(4.5rem, 12vw, 11rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "#fff",
              userSelect: "none",
            }}
            aria-label="IBE"
          >
            IBE
          </Typography>
          <Typography
            variant="h4"
            component="p"
            sx={{
              color: "rgba(255, 255, 255, 0.86)",
              maxWidth: "26ch",
              lineHeight: 1.3,
              textWrap: "balance",
            }}
          >
            Integrated Business &amp; Engineering Honors Program at The Ohio
            State University
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "6fr 3fr 3fr" },
            gap: { xs: 4, md: 6 },
            py: { xs: 4, md: 6 },
          }}
        >
          <Box sx={{ gridColumn: { xs: "1 / -1", md: "auto" } }}>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.72)",
                maxWidth: "44ch",
                lineHeight: 1.7,
                letterSpacing: "0.005em",
              }}
            >
              Preparing the next generation of leaders at the intersection of
              business and technology — one cohort of 72, two colleges, four
              years.
            </Typography>
          </Box>

          <Box>
            <Typography
              variant="overline"
              component="p"
              sx={{ color: "rgba(255, 255, 255, 0.55)", mb: 2 }}
            >
              Explore
            </Typography>
            <Stack component="nav" aria-label="Footer" spacing={1.25}>
              <PageLink to="" text="Home" />
              <PageLink to="about" text="About" />
              <PageLink to="recruitment" text="Join Us" />
              <PageLink to="alumni" text="Alumni" />
              <PageLink to="student-life" text="Student Life" />
            </Stack>
          </Box>

          <Box>
            <Typography
              variant="overline"
              component="p"
              sx={{ color: "rgba(255, 255, 255, 0.55)", mb: 2 }}
            >
              Connect
            </Typography>
            <Stack direction="row" spacing={1.25}>
              <SocialIcon
                href="https://www.instagram.com/ohiostateibe/"
                label="IBE on Instagram"
              >
                <InstagramIcon sx={{ fontSize: "1.375rem" }} />
              </SocialIcon>
              <SocialIcon
                href="https://www.linkedin.com/company/ibeprogram/"
                label="IBE on LinkedIn"
              >
                <LinkedInIcon sx={{ fontSize: "1.375rem" }} />
              </SocialIcon>
              <SocialIcon
                href="https://www.facebook.com/ohiostateibe/"
                label="IBE on Facebook"
              >
                <FacebookIcon sx={{ fontSize: "1.375rem" }} />
              </SocialIcon>
            </Stack>
            <Typography
              variant="body2"
              sx={{ mt: 2.5, color: "rgba(255, 255, 255, 0.72)" }}
            >
              Columbus, Ohio
            </Typography>
          </Box>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            pt: 3,
            borderTop: "1px solid rgba(255, 255, 255, 0.14)",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.62)" }}>
            © {new Date().getFullYear()} IBE Honors Program · The Ohio State
            University
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.62)" }}>
            Made with ❤️ in Columbus
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
