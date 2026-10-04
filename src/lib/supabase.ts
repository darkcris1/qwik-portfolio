import type { RequestEventBase } from "@qwik.dev/router";
import { createServerClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const getConfig = (requestEv: RequestEventBase) => {
  const url = requestEv.env.get("SUPABASE_URL");
  const key = requestEv.env.get("SUPABASE_PUBLISHABLE_KEY");
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be set");
  }
  return { url, key };
};

export const isSupabaseConfigured = (requestEv: RequestEventBase) =>
  !!requestEv.env.get("SUPABASE_URL") && !!requestEv.env.get("SUPABASE_PUBLISHABLE_KEY");

// Server-side client that keeps the auth session in Qwik's cookies.
export const createSupabase = (requestEv: RequestEventBase): SupabaseClient => {
  const { url, key } = getConfig(requestEv);

  return createServerClient(url, key, {
    cookieOptions: {
      httpOnly: true,
      secure: requestEv.url.protocol === "https:",
      sameSite: "lax",
      path: "/",
    },
    cookies: {
      getAll() {
        // Cookies cleared earlier in this request come back as null, so skip them.
        return Object.entries(requestEv.cookie.getAll())
          .filter(([, cookie]) => cookie != null)
          .map(([name, cookie]) => ({ name, value: cookie.value }));
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          requestEv.cookie.set(name, value, {
            path: options.path ?? "/",
            domain: options.domain,
            maxAge: options.maxAge,
            expires: options.expires,
            httpOnly: options.httpOnly,
            secure: options.secure,
            sameSite: options.sameSite as "lax" | "strict" | "none" | undefined,
          });
        }
      },
    },
  });
};

// Cookieless client for public pages, so they never refresh or set a session.
export const createPublicSupabase = (requestEv: RequestEventBase): SupabaseClient => {
  const { url, key } = getConfig(requestEv);
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
};

// Secret-key client that bypasses RLS, only for trusted server jobs.
export const createServiceSupabase = (requestEv: RequestEventBase): SupabaseClient => {
  const url = requestEv.env.get("SUPABASE_URL");
  const key = requestEv.env.get("SUPABASE_SECRET_KEY");
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SECRET_KEY must be set");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
};

export interface AdminUser {
  email: string;
}

// Returns the signed-in owner, or null for anyone else.
export const getAdmin = async (requestEv: RequestEventBase): Promise<AdminUser | null> => {
  const adminEmail = requestEv.env.get("ADMIN_EMAIL")?.toLowerCase();
  if (!adminEmail || !isSupabaseConfigured(requestEv)) return null;

  try {
    const { data, error } = await createSupabase(requestEv).auth.getClaims();
    if (error || !data?.claims) return null;
    const email = String(data.claims.email ?? "").toLowerCase();
    return email === adminEmail ? { email } : null;
  } catch (err) {
    console.error("Couldn't verify the admin session", err);
    return null;
  }
};
