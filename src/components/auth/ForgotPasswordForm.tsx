"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z.email("Enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;

const REASON_MESSAGES: Record<string, string> = {
  expired:
    "That reset link has expired or was already used. Enter your email to get a new one.",
};

export default function ForgotPasswordForm() {
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const [formError, setFormError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit({ email }: FormValues) {
    setFormError(null);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      // See LoginForm — missing env vars shouldn't look like a dead button.
      setFormError(
        "Password reset isn't available right now. Please let an IBE officer know.",
      );
      return;
    }

    // Lands on /auth/callback as type=recovery, which signs them in and
    // continues to /reset-password. No ?next= here: the email template
    // appends its own query string to this URL.
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    });

    if (error) {
      setFormError(error.message);
      return;
    }

    setSentTo(email);
  }

  if (sentTo) {
    // Worded for both cases on purpose: Supabase reports success whether or
    // not the email has an account, so this can't say which.
    return (
      <Alert severity="success">
        If there&apos;s an account for <strong>{sentTo}</strong>, we&apos;ve
        emailed it a link to choose a new password. It can take a few minutes;
        check spam if it doesn&apos;t show up.
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2.5}>
        {reason && REASON_MESSAGES[reason] && (
          <Alert severity="info">{REASON_MESSAGES[reason]}</Alert>
        )}
        {formError && <Alert severity="error">{formError}</Alert>}

        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          fullWidth
          error={!!errors.email}
          helperText={
            errors.email?.message ?? "The email you used to create your account."
          }
          {...register("email")}
        />

        <Button type="submit" size="large" disabled={isSubmitting} fullWidth>
          {isSubmitting ? "Sending…" : "Send Reset Link"}
        </Button>

        <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
          Remembered it?{" "}
          <Link href="/login" style={{ color: "inherit", fontWeight: 600 }}>
            Log in
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}
