import { redirect } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Choose a New Password",
  robots: { index: false, follow: false },
};

// Reached from a password-reset email via /auth/callback, which has already
// signed the person in. Without that session there's no account to update,
// so send them back to request a fresh link.
export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims.sub) {
    redirect("/forgot-password?reason=expired");
  }

  return (
    <Container maxWidth="xs" sx={{ py: { xs: 8, md: 12 } }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
          Choose a New Password
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          You&apos;ll use it to log in from now on.
        </Typography>
      </Box>
      <ResetPasswordForm />
    </Container>
  );
}
