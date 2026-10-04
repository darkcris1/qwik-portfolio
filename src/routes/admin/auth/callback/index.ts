import type { RequestHandler } from "@qwik.dev/router";
import { createSupabase } from "~/lib/supabase";

// Supabase sends the user back here with a one-time code that we swap for a session.
export const onGet: RequestHandler = async (requestEv) => {
  const code = requestEv.url.searchParams.get("code");
  if (!code) throw requestEv.redirect(302, "/admin/login/?error=auth_failed");

  const supabase = createSupabase(requestEv);
  const flowId = requestEv.url.searchParams.get("sb_flow_id") ?? undefined;
  const { data, error } = await supabase.auth.exchangeCodeForSession(code, { flowId });
  if (error) throw requestEv.redirect(302, "/admin/login/?error=auth_failed");

  const adminEmail = requestEv.env.get("ADMIN_EMAIL")?.toLowerCase();
  if (!adminEmail || data.user.email?.toLowerCase() !== adminEmail) {
    await supabase.auth.signOut();
    throw requestEv.redirect(302, "/admin/login/?error=not_allowed");
  }

  throw requestEv.redirect(302, "/admin/");
};
