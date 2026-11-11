"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { createClient } from "@/lib/supabase/client";
import {
  PASSWORD_MIN_LENGTH,
  newPassword,
  passwordsMatch,
} from "@/lib/auth/password";

const schema = z
  .object({ password: newPassword, confirmPassword: z.string() })
  .refine(...passwordsMatch);

type FormValues = z.infer<typeof schema>;

export default function ResetPasswordForm() {
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);
  // See LoginForm: keeps the button busy until /members has rendered.
  const [navigating, startNavigation] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const busy = isSubmitting || navigating;

  async function onSubmit({ password }: FormValues) {
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

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setFormError(
        error.code === "same_password"
          ? "That's your current password. Choose a different one."
          : error.message,
      );
      return;
    }

    // The reset link already signed them in, so there's nothing to log
    // in to; go straight to the members area. No refresh needed (unlike
    // LoginForm): who's signed in hasn't changed.
    startNavigation(() => router.push("/members"));
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2.5}>
        {formError && <Alert severity="error">{formError}</Alert>}

        <TextField
          label="New password"
          type="password"
          autoComplete="new-password"
          fullWidth
          error={!!errors.password}
          helperText={
            errors.password?.message ?? `At least ${PASSWORD_MIN_LENGTH} characters.`
          }
          {...register("password")}
        />
        <TextField
          label="Confirm new password"
          type="password"
          autoComplete="new-password"
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button type="submit" size="large" disabled={busy} fullWidth>
          {busy ? "Saving…" : "Save Password"}
        </Button>
      </Stack>
    </Box>
  );
}
