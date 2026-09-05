import { Suspense } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Metadata } from "next";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log In",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <Container maxWidth="xs" sx={{ py: { xs: 8, md: 12 } }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
          Log In
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          For IBE members.
        </Typography>
      </Box>
      {/* useSearchParams() (reading ?reason=) needs a Suspense boundary. */}
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </Container>
  );
}
