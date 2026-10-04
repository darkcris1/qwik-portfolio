import { $, component$, useSignal, useVisibleTask$, type QRL } from "@qwik.dev/core";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "qwik-feather-icons";

interface LightboxProps {
  title: string;
  images: string[];
  startIndex: number;
  onClose$: QRL<() => void>;
}

export const Lightbox = component$<LightboxProps>(({ title, images, startIndex, onClose$ }) => {
  const current = useSignal(startIndex);
  const closeRef = useSignal<HTMLButtonElement>();
  const dialogRef = useSignal<HTMLDivElement>();
  const count = images.length;

  const go = $((step: number) => {
    if (count > 0) current.value = (current.value + step + count) % count;
  });

  // Lock page scroll, focus the dialog and handle keys while it's open.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.value?.focus();

    // A plain listener so preventDefault on Tab runs synchronously.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose$();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key !== "Tab" || !dialogRef.value) return;
      const focusable = dialogRef.value.querySelectorAll<HTMLElement>("button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    cleanup(() => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    });
  });

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      class="lightbox-in fixed inset-0 z-[80] flex flex-col bg-ink/95 text-white backdrop-blur-sm"
      onClick$={(e, el) => {
        if (e.target === el) onClose$();
      }}
    >
      <div class="flex items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div class="min-w-0">
          <p class="truncate font-display text-sm font-medium md:text-base">{title}</p>
          <p class="font-mono text-xs text-mist" aria-live="polite">
            {current.value + 1} / {count}
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close screenshots"
          class="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 transition-colors hover:border-sky hover:bg-white/5"
          onClick$={onClose$}
        >
          <XIcon class="h-5 w-5" />
        </button>
      </div>

      <div
        class="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20"
        onClick$={(e, el) => {
          if (e.target === el) onClose$();
        }}
      >
        <img
          key={images[current.value]}
          src={images[current.value]}
          alt={`${title} screenshot ${current.value + 1} of ${count}`}
          width={1600}
          height={1000}
          class="lightbox-img max-h-full max-w-full rounded-xl object-contain shadow-2xl shadow-black/50"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous screenshot"
              class="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink/80 transition-colors hover:border-sky md:left-6"
              onClick$={() => go(-1)}
            >
              <ChevronLeftIcon class="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next screenshot"
              class="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink/80 transition-colors hover:border-sky md:right-6"
              onClick$={() => go(1)}
            >
              <ChevronRightIcon class="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <ul class="flex justify-center gap-2 overflow-x-auto px-4 py-4">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                aria-label={`Show screenshot ${i + 1}`}
                aria-current={i === current.value ? "true" : undefined}
                data-index={i}
                class={
                  "block overflow-hidden rounded-lg border-2 transition " +
                  (i === current.value ? "border-sky opacity-100" : "border-transparent opacity-50 hover:opacity-90")
                }
                onClick$={(_, el) => (current.value = Number(el.dataset.index))}
              >
                <img src={src} alt="" width={96} height={60} class="h-12 w-20 object-cover object-top md:h-14 md:w-24" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
