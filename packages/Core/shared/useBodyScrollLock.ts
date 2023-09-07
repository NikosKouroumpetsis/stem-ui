import { computed, onBeforeUnmount, ref, nextTick } from "vue";

let globalStackCount = 0;

export function useBodyScrollLock(initialState?: boolean | undefined) {
  const stackCount = ref(globalStackCount);
  const locked = ref(false);

  const writableLock = computed<boolean>({
    get() {
      return locked.value;
    },
    set(newLocked) {
      if (typeof window === "undefined") return;

      if (newLocked) {
        const verticalScrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;

        if (verticalScrollbarWidth > 0) {
          document.body.style.paddingRight = `${verticalScrollbarWidth}px`;
        }

        // let dismissibleLayer set previous pointerEvent first
        nextTick(() => {
          document.body.style.pointerEvents = "none";
          locked.value = true;
        });
      } else {
        document.body.style.paddingRight = "";
        document.body.style.pointerEvents = "";
        locked.value = false;
      }
    },
  });

  if (initialState) {
    stackCount.value++;
    globalStackCount++;
    writableLock.value = initialState;
  }

  onBeforeUnmount(() => {
    if (!initialState) return;

    stackCount.value--;
    globalStackCount--;

    if (stackCount.value === 0) {
      document.body.style.paddingRight = "";
      document.body.style.pointerEvents = "";
    }
  });

  return writableLock;
}
