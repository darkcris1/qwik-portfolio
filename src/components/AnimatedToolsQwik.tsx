import { component$, Slot, useSignal, useVisibleTask$ } from "@qwik.dev/core";

interface AnimatedToolsProps {
  class?: string;
  // Starting x offset in px; the row slides from here to 0 as you scroll.
  xDistance?: number;
  speed?: number;
}

export const AnimatedTools = component$<AnimatedToolsProps>(
  ({ class: className = "", xDistance = -300, speed = 1 }) => {
    const outerRef = useSignal<HTMLDivElement>();
    const innerRef = useSignal<HTMLDivElement>();
    const startX = xDistance * speed;

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
      let frame = 0;
      let lastX = NaN;
      let near = false;
      const update = () => {
        frame = 0;
        const outer = outerRef.value;
        const inner = innerRef.value;
        if (!outer || !inner) return;
        // 0 when the row's top enters the viewport bottom, 1 when its bottom reaches the center.
        const rect = outer.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh / 2 + rect.height)));
        const x = Math.round(startX * (1 - progress));
        if (x === lastX) return;
        lastX = x;
        inner.style.transform = `translate3d(${x}px, 0, 0)`;
      };
      const onScroll = () => {
        if (near && !frame) frame = requestAnimationFrame(update);
      };
      // Only track scroll while the row is on or near the screen.
      const observer = new IntersectionObserver(
        ([entry]) => {
          near = entry.isIntersecting;
          if (near) onScroll();
        },
        { rootMargin: "200px 0px" },
      );
      if (outerRef.value) observer.observe(outerRef.value);
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      cleanup(() => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      });
    });

    return (
      <div ref={outerRef} class={className}>
        <div
          ref={innerRef}
          class="w-full will-change-transform"
          style={{ transform: `translate3d(${startX}px, 0, 0)` }}
        >
          <Slot />
        </div>
      </div>
    );
  },
);
