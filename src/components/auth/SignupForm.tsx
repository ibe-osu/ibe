"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { createClient } from "@/lib/supabase/client";
import {
  looksLikeInviteCode,
  normalizeInviteCode,
} from "@/lib/auth/inviteCode";

const schema = z
  .object({
    inviteCode: z
      .string()
      .transform(normalizeInviteCode)
      .refine(
        looksLikeInviteCode,
        "That doesn't look like a valid code (IBE-XXXX-XXXX).",
      ),
    email: z.email("Enter a valid email address."),
    // 10 to match the minimum configured in the Supabase dashboard — if
    // that setting ever changes, update this too, or a rejected password
    // will look like it passed client-side only to fail on submit.
    password: z.string().min(10, "Password must be at least 10 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function SignupForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setFormError(null);

    let supabase;
    try {
      supabase = createClient();
    } catch {
      // See LoginForm — missing env vars shouldn't look like a dead button.
      setFormError(
        "Account creation isn't available right now. Please let an IBE officer know.",
      );
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        // Without this, Supabase sends people to the project's Site URL —
        // the bare homepage — and the ?code= it appends lands on a page
        // that has no idea what to do with it. Point it at the route that
        // actually exchanges the code for a session.
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        // Read server-side by the before_user_created hook and the
        // handle_new_user() trigger (supabase/migrations/0002_invite_codes.sql).
        // The client-side format check above is just UX — this is the real
        // check, and it fails closed if the code is wrong in any way.
        data: { invite_code: values.inviteCode },
      },
    });

    if (error) {
      setFormError(error.message);
      return;
    }

    setSubmittedEmail(values.email);
  }

  if (submittedEmail) {
    return (
      <>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
            Check your email
          </Typography>
        </Box>
        <Alert severity="success">
          Check <strong>{submittedEmail}</strong> for a confirmation link to
          finish creating your account.
        </Alert>
      </>
    );
  }

  return (
    <>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
          Create Account
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          You&apos;ll need the membership code from an IBE officer.
        </Typography>
      </Box>
      <Box
        component="form"
        // The second callback runs when THIS submit attempt fails client-side
        // validation. Without it, a server-side error from an earlier submit
        // (e.g. "email rate limit exceeded") stays on screen indefinitely
        // alongside a new, unrelated field error — two errors from two
        // different moments, both stale-looking to the user.
        onSubmit={handleSubmit(onSubmit, () => setFormError(null))}
        noValidate
      >
        <Stack spacing={2.5}>
          {formError && <Alert severity="error">{formError}</Alert>}

          <TextField
            label="Membership code"
            placeholder="IBE-XXXX-XXXX"
            fullWidth
            error={!!errors.inviteCode}
            helperText={
              errors.inviteCode?.message ?? "Given to you by an IBE officer."
            }
            {...register("inviteCode")}
          />
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            label="Password"
            type="password"
            autoComplete="new-password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register("password")}
          />
          <TextField
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button type="submit" size="large" disabled={isSubmitting} fullWidth>
            {isSubmitting ? "Creating account…" : "Create Account"}
          </Button>

          <Typography
            variant="body2"
            sx={{ color: "text.secondary", textAlign: "center" }}
          >
            Already have an account?{" "}
            <Link href="/login" style={{ color: "inherit", fontWeight: 600 }}>
              Log in
            </Link>
          </Typography>
        </Stack>
      </Box>
    </>
  );
}
