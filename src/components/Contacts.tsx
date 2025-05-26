import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { MailIcon } from "qwik-feather-icons";


export default component$(({ action }: { action: any }) => {
  const name = useSignal("");
  const email = useSignal("");
  const body = useSignal("");
  const showToast = useSignal(false);

  useTask$(({ track }) => {
    track(() => action.value);
    if (action.value && !action.value.errors) {
      name.value = "";
      email.value = "";
      body.value = "";
      showToast.value = true;
      setTimeout(() => (showToast.value = false), 3000);
    }
  });

  return (
    <section id="contacts" class="w-full max-w-xl mx-auto py-12 px-4">
      <h2 class="text-2xl font-bold mb-6 text-gray-900 text-center">Get in Touch</h2>
      {/* Toast Message */}
      {showToast.value && (
        <div class="fixed top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-50 transition-opacity animate-fadeInUp">
          Message sent successfully!
        </div>
      )}
      {/* Social Media Links - Horizontal */}
      <div class="flex justify-center items-center gap-6 mb-8">
        <a
          href="mailto:crisfandino1@gmail.com"
          class="text-gray-600 hover:text-red-600 transition-colors"
          aria-label="Send Email"
        >
          <MailIcon class="w-7 h-7" />
        </a>
      </div>
      <p class="text-center text-gray-600 mb-2">Location: Philippines</p>
      <Form action={action} class="space-y-4 mt-8">
        {action.value?.errors && (
        <div class="text-red-500 text-sm mt-1">
            {(() => {
              const errors = action.value.errors;
              if (typeof errors === 'string') return errors;
              if (Array.isArray(errors)) return errors[0];
              if (typeof errors === 'object' && errors !== null) {
                if ('detail' in errors && errors.detail) return errors.detail;
                const firstKey = Object.keys(errors)[0];
                const val = errors[firstKey];
                if (Array.isArray(val)) return val[0];
                return val;
              }
              return null;
            })()}
          </div>
        )}
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Your Name"
            value={name.value}
            onInput$={e => (name.value = (e.target as HTMLInputElement).value)}
          />
          <small class="text-red-500">{action.errors}</small>
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="you@example.com"
            value={email.value}
            onInput$={e => (email.value = (e.target as HTMLInputElement).value)}
          />
        </div>
        <div>
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            name="body"
            rows={4}
            required
            class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Your message..."
            value={body.value}
            onInput$={e => (body.value = (e.target as HTMLTextAreaElement).value)}
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            disabled={action.isRunning}
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
          >
            {action.isRunning ? (
              <div class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </Form>
    </section>
  );
});