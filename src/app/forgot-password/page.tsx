import { Suspense } from "react";
import { Box, Container, Typography } from "@mui/material";
import { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <Container maxWidth="xs" sx={{ py: { xs: 8, md: 12 } }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
          Reset Password
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          We&apos;ll email you a link to choose a new one.
        </Typography>
      </Box>
      {/* useSearchParams() (reading ?reason=) needs a Suspense boundary. */}
      <Suspense fallback={null}>
        <ForgotPasswordForm />
      </Suspense>
    </Container>
  );
}
