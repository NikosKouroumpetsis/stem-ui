import { Ref, watch, onUnmounted } from "vue";

type MaybeElementRef = HTMLElement | Ref<HTMLElement | null> | null;

function unrefElement(target: MaybeElementRef): HTMLElement | null {
  return target && "value" in target
    ? target.value
    : (target as HTMLElement | null);
}

function hideOthers(target: HTMLElement): () => void {
  const hiddenElements: HTMLElement[] = [];
  document.querySelectorAll("body > *").forEach((el) => {
    if (el !== target && el.hasAttribute("aria-hidden")) {
      hiddenElements.push(el as HTMLElement);
      el.setAttribute("aria-hidden", "true");
    }
  });

  return () => {
    hiddenElements.forEach((el) => {
      el.removeAttribute("aria-hidden");
    });
  };
}

export function useHideOthers(target: MaybeElementRef) {
  let undo: ReturnType<typeof hideOthers>;

  watch(
    () => unrefElement(target),
    (el) => {
      if (el) {
        undo = hideOthers(el);
      } else if (undo) {
        undo();
      }
    }
  );

  onUnmounted(() => {
    if (undo) {
      undo();
    }
  });
}
