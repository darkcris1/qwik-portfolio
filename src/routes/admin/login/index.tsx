import { component$ } from "@qwik.dev/core";
import { Form, routeAction$, routeLoader$, useLocation } from "@qwik.dev/router";
import { createSupabase, getAdmin, isSupabaseConfigured } from "~/lib/supabase";

export const useRedirectIfSignedIn = routeLoader$(async (requestEv) => {
  if (await getAdmin(requestEv)) throw requestEv.redirect(302, "/admin/");
  return null;
});

export const useGoogleSignIn = routeAction$(async (_, requestEv) => {
  if (!isSupabaseConfigured(requestEv)) {
    return requestEv.fail(500, { message: "Supabase isn't configured. Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY." });
  }
  const supabase = createSupabase(requestEv);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${requestEv.url.origin}/admin/auth/callback/`,
      queryParams: { prompt: "select_account" },
    },
  });
  if (error || !data.url) {
    return requestEv.fail(500, { message: "Couldn't start Google sign-in. Check the Supabase Google provider settings." });
  }
  throw requestEv.redirect(303, data.url);
});

const errorMessages: Record<string, string> = {
  not_allowed: "That Google account isn't allowed to manage this blog.",
  auth_failed: "Sign-in didn't complete. Try again.",
};

export default component$(() => {
  useRedirectIfSignedIn();
  const signIn = useGoogleSignIn();
  const loc = useLocation();
  const errorKey = loc.url.searchParams.get("error");
  const message = signIn.value?.message ?? (errorKey ? errorMessages[errorKey] ?? errorMessages.auth_failed : null);

  return (
    <main class="grid min-h-screen place-items-center px-4">
      <div class="w-full max-w-sm rounded-3xl border border-line bg-white p-8 text-center shadow-2xl shadow-ink/5">
        <img src="/favicon.png" alt="" width={48} height={48} class="mx-auto h-12 w-12 rounded-xl object-cover" />
        <h1 class="mt-5 font-display text-xl font-bold tracking-tight text-ink">Blog admin</h1>
        <p class="mt-2 text-sm text-muted">Sign in with the owner's Google account.</p>

        {message && (
          <p role="alert" class="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {message}
          </p>
        )}

        <Form action={signIn} class="mt-6">
          <button
            type="submit"
            disabled={signIn.isRunning}
            class="flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-white px-4 py-3 font-semibold text-ink shadow-sm transition-colors hover:border-brand disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" class="h-5 w-5" aria-hidden="true">
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z" />
              <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
              <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1z" />
              <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.8 3.6-4.9 6.7-4.9z" />
            </svg>
            {signIn.isRunning ? "Redirecting…" : "Continue with Google"}
          </button>
        </Form>

        <a href="/" class="mt-6 inline-block text-sm text-muted transition-colors hover:text-ink">
          ← Back to site
        </a>
      </div>
    </main>
  );
});
