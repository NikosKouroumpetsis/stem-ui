import { ref, onMounted, Ref, computed } from "vue";

export function useSize(element: Ref<HTMLElement | null>) {
  const size = ref<{ width: number; height: number } | null>(null);

  const width = computed(() => size.value?.width ?? 0);
  const height = computed(() => size.value?.height ?? 0);

  onMounted(() => {
    const el = element.value;

    if (el) {
      size.value = { width: el.offsetWidth, height: el.offsetHeight };

      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) return;

        if (!entries.length) return;

        const entry = entries[0];
        let newWidth: number;
        let newHeight: number;

        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry.borderBoxSize;
          const borderSize = Array.isArray(borderSizeEntry)
            ? borderSizeEntry[0]
            : borderSizeEntry;
          newWidth = borderSize.inlineSize;
          newHeight = borderSize.blockSize;
        } else {
          newWidth = el.offsetWidth;
          newHeight = el.offsetHeight;
        }

        size.value = { width: newWidth, height: newHeight };
      });

      resizeObserver.observe(el, { box: "border-box" });

      return () => {
        resizeObserver.unobserve(el);
      };
    } else {
      size.value = null;
    }
  });

  return {
    width,
    height,
  };
}
