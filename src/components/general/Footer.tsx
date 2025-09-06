import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import CircleIcon from "@mui/icons-material/Circle";
import Link from "next/link";

interface SocialIconProps {
  href: string;
  children: React.ReactNode;
}

const SocialIcon = (props: SocialIconProps) => {
  return (
    <Link href={props.href}>
      <IconButton>{props.children}</IconButton>
    </Link>
  );
};

interface PageLinkProps {
  text: string;
  to: string;
}

const PageLink = (props: PageLinkProps) => {
  return (
    <Button
      variant="text"
      color="inherit"
      sx={{ p: "0.375rem 0.75rem", borderRadius: 1 }}
    >
      <Link href={`/${props.to}`}>{props.text}</Link>
    </Button>
  );
};

export default function Footer() {
  return (
    <Stack
      spacing={1.75}
      sx={{
        color: "secondary.main",
        backgroundColor: "primary.main",
        direction: "column",
        p: "1rem",
      }}
    >
      <Stack direction="row" spacing={4} sx={{ justifyContent: "center" }}>
        <SocialIcon href="https://www.instagram.com/ohiostateibe/#">
          <InstagramIcon color="secondary" sx={{ fontSize: "2.5rem" }} />
        </SocialIcon>
        <SocialIcon href="https://www.linkedin.com/company/ibeprogram/">
          <LinkedInIcon color="secondary" sx={{ fontSize: "2.5rem" }} />
        </SocialIcon>
        <SocialIcon href="https://www.facebook.com/ohiostateibe/">
          <FacebookIcon color="secondary" sx={{ fontSize: "2.5rem" }} />
        </SocialIcon>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: "center", alignItems: "center" }}
        divider={<CircleIcon sx={{ fontSize: "0.25rem" }} />}
      >
        <PageLink to="" text="Home" />
        <PageLink to="about" text="About" />
        <PageLink to="prospective-students" text="Join Us" />
        <PageLink to="alumni" text="Alumni" />
        <PageLink to="student-life" text="Student Life" />
      </Stack>

      <Box>
        <Typography variant="body2" align="center">
          Made with ❤️ in Columbus
        </Typography>
      </Box>
    </Stack>
  );
}
