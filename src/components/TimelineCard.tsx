import { component$, Slot, useSignal, useVisibleTask$ } from "@qwik.dev/core";

interface TimelineCardProps {
  alignment: "left" | "right";
  classes?: string;
}

export const TimelineCard = component$<TimelineCardProps>(({ alignment, classes = "" }) => {
  const ref = useSignal<HTMLDivElement>();
  const inView = useSignal(false);

  // Slide the card in once it is 100px inside the viewport.
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView.value = true;
          observer.disconnect();
        }
      },
      { rootMargin: "-100px" },
    );
    if (ref.value) observer.observe(ref.value);
    cleanup(() => observer.disconnect());
  });

  const hidden = alignment === "left" ? "opacity-0 -translate-x-12" : "opacity-0 translate-x-12";

  return (
    <div
      ref={ref}
      class={`${classes} transition-all duration-700 ease-out ${inView.value ? "opacity-100 translate-x-0" : hidden}`}
    >
      <Slot />
    </div>
  );
});
