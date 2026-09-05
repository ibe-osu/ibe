"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export type AuthState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "signed-in"; email: string | null };

/**
 * Client-side auth state for the header nav ONLY. This is cosmetic — it
 * decides whether to show "Log In" or "Resources" / "Alumni Database" /
 * an account menu. It is never the security boundary: someone could forge
 * "signed-in" here and get nothing more than a link that 302s them to
 * /login, because every page under /members independently re-verifies via
 * requireMember() (src/lib/auth/guards.ts), and RLS enforces access at the
 * database level regardless of what this hook reports.
 *
 * Starts at "loading" so the header can render a fixed-width placeholder
 * and avoid a layout shift once the real state resolves.
 */
export function useAuthState(): AuthState {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setState(
        user
          ? { status: "signed-in", email: user.email ?? null }
          : { status: "signed-out" },
      );
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState(
        session?.user
          ? { status: "signed-in", email: session.user.email ?? null }
          : { status: "signed-out" },
      );
    });

    return () => subscription.unsubscribe();
  }, []);

  return state;
}
