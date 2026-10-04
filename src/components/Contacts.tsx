import { component$, useSignal,  $ } from "@qwik.dev/core";
import { MailIcon } from "qwik-feather-icons";


export default component$(({ action }: { action: any }) => {
  const name = useSignal("");
  const email = useSignal("");
  const body = useSignal("");
  const showToast = useSignal(false);
  const isLoading = useSignal(false);
  const actionErrors = useSignal<{[key:string]: any} | null>(null)


  const handleSubmit = $(async (e: Event) => {
    e.preventDefault();
    isLoading.value = true;
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          body: body.value
        })
      });
      const data = await res.json()
  
      if (res.ok) {
        name.value = ''
        email.value = ''
        body.value = ''
        actionErrors.value = null;
        showToast.value = true;
        setTimeout(() => (showToast.value = false), 3000);
      }else {
        actionErrors.value = data['errors'];
      }
    } finally {
      isLoading.value = false;
    }
  })



  const field =
    "block w-full rounded-xl border border-line bg-ice/60 px-4 py-3 text-ink placeholder:text-muted transition-colors focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/15";

  return (
    <section id="contacts" class="w-full bg-ice">
      <div
        role="status"
        class={
          "fixed left-1/2 top-24 z-[60] -translate-x-1/2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-white shadow-2xl shadow-ink/30 transition-all duration-300 " +
          (showToast.value ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0")
        }
      >
        {/* Text is added on show so screen readers announce it. */}
        {showToast.value ? "Message sent. I'll get back to you by email." : ""}
      </div>

      <div class="mx-auto grid max-w-6xl gap-12 px-4 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:py-32">
        <div>
          <p class="eyebrow">Contact</p>
          <h2 class="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
            Tell me what you're building.
          </h2>
          <p class="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Send a message with the form, or email me directly.
          </p>
          <dl class="mt-10 space-y-5">
            <div>
              <dt class="font-mono text-xs uppercase tracking-[0.18em] text-muted">Email</dt>
              <dd class="mt-1.5">
                <a
                  href="mailto:crisfandino1@gmail.com"
                  class="inline-flex items-center gap-2 text-lg font-semibold text-ink underline-offset-4 hover:text-brand-ink hover:underline"
                >
                  <MailIcon class="h-5 w-5 text-brand" />
                  crisfandino1@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt class="font-mono text-xs uppercase tracking-[0.18em] text-muted">Location</dt>
              <dd class="mt-1.5 text-lg font-semibold text-ink">Philippines</dd>
            </div>
          </dl>
        </div>

        <form
          onSubmit$={handleSubmit}
          preventdefault:submit
          class="space-y-5 rounded-3xl border border-line bg-white p-6 shadow-2xl shadow-ink/5 md:p-8"
        >
          {!isLoading.value && actionErrors.value && (
            <div role="alert" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {(() => {
                const errors = actionErrors.value;
                if (typeof errors === "string") return errors;
                if (Array.isArray(errors)) return errors[0];
                if (typeof errors === "object" && errors !== null) {
                  if ("detail" in errors && errors.detail) return errors.detail;
                  const firstKey = Object.keys(errors)[0];
                  const val = errors[firstKey];
                  if (Array.isArray(val)) return val[0];
                  return val;
                }
                return null;
              })()}
            </div>
          )}
          <div class="grid gap-5 sm:grid-cols-2">
            <div>
              <label for="name" class="mb-2 block text-sm font-semibold text-ink">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                autocomplete="name"
                class={field}
                placeholder="Your name"
                value={name.value}
                onInput$={(e) => (name.value = (e.target as HTMLInputElement).value)}
              />
              <small class="text-red-600">{action.errors}</small>
            </div>
            <div>
              <label for="email" class="mb-2 block text-sm font-semibold text-ink">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                autocomplete="email"
                class={field}
                placeholder="you@example.com"
                value={email.value}
                onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)}
              />
            </div>
          </div>
          <div>
            <label for="message" class="mb-2 block text-sm font-semibold text-ink">
              Message
            </label>
            <textarea
              id="message"
              name="body"
              rows={5}
              required
              class={field}
              placeholder="What are you building, and where can I help?"
              value={body.value}
              onInput$={(e) => (body.value = (e.target as HTMLTextAreaElement).value)}
            ></textarea>
          </div>
          <button type="submit" disabled={isLoading.value} class="btn-primary w-full justify-center disabled:opacity-70">
            {isLoading.value ? (
              <>
                <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
                Sending…
              </>
            ) : (
              "Send message"
            )}
          </button>
        </form>
      </div>
    </section>
  );
});
