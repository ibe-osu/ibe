"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Alert, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { createClient } from "@/lib/supabase/client";

const schema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Enter your password."),
});

type FormValues = z.infer<typeof schema>;

const REASON_MESSAGES: Record<string, string> = {
  inactive:
    "Your account isn't active yet. If you think this is a mistake, contact an IBE officer.",
  "confirm-failed":
    "That confirmation link didn't work — it may have expired. Try signing in, or request a new link from Signup.",
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setFormError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(values);

    if (error) {
      setFormError("That email or password isn't right. Try again.");
      return;
    }

    router.push("/members");
    router.refresh();
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
          helperText={errors.email?.message}
          {...register("email")}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          fullWidth
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" size="large" disabled={isSubmitting} fullWidth>
          {isSubmitting ? "Signing in…" : "Log In"}
        </Button>

        <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center" }}>
          New here?{" "}
          <Link href="/signup" style={{ color: "inherit", fontWeight: 600 }}>
            Create an account
          </Link>
        </Typography>
      </Stack>
    </Box>
  );
}
