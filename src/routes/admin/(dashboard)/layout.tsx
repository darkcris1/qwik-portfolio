import { component$, Slot } from "@qwik.dev/core";
import { Form, routeAction$, routeLoader$, type RequestHandler } from "@qwik.dev/router";
import { createSupabase, getAdmin, type AdminUser } from "~/lib/supabase";

export const onRequest: RequestHandler = async (requestEv) => {
  const admin = await getAdmin(requestEv);
  if (!admin) throw requestEv.redirect(302, "/admin/login/");
  requestEv.sharedMap.set("admin", admin);
};

export const useAdmin = routeLoader$((requestEv) => {
  return requestEv.sharedMap.get("admin") as AdminUser;
});

export const useSignOut = routeAction$(async (_, requestEv) => {
  await createSupabase(requestEv).auth.signOut();
  throw requestEv.redirect(303, "/admin/login/");
});

export default component$(() => {
  const admin = useAdmin();
  const signOut = useSignOut();

  return (
    <>
      <header class="sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
        <div class="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <a href="/admin/" class="flex items-center gap-2.5 font-display text-sm font-medium">
            <img src="/favicon.png" alt="" width={28} height={28} class="h-7 w-7 rounded-lg object-cover" />
            Blog admin
          </a>
          <div class="flex items-center gap-3 text-sm">
            <a href="/blog/" target="_blank" rel="noopener noreferrer" class="hidden text-mist transition-colors hover:text-white sm:inline">
              View blog ↗
            </a>
            <span class="hidden text-mist md:inline">{admin.value.email}</span>
            <Form action={signOut}>
              <button type="submit" class="rounded-lg border border-white/15 px-3 py-1.5 font-medium transition-colors hover:border-sky">
                Sign out
              </button>
            </Form>
          </div>
        </div>
      </header>
      <main class="mx-auto max-w-6xl px-4 py-10 md:py-14">
        <Slot />
      </main>
    </>
  );
});
