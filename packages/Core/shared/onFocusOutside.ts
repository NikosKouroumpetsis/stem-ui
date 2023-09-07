import { onMounted, onUnmounted, Ref } from "vue";

type MaybeElementRef = HTMLElement | null | Ref<HTMLElement | null>;

function unrefElement(element: MaybeElementRef): HTMLElement | null {
  return element && "value" in element
    ? (element as Ref<HTMLElement | null>).value
    : (element as HTMLElement | null);
}

export function onFocusOutside(
  element: MaybeElementRef,
  handler: (event: FocusEvent) => void
) {
  const handleFocusOut = (ev: FocusEvent) => {
    const el = unrefElement(element);
    if (!ev.relatedTarget) return;
    const isFocusInsideElement = el?.contains(ev.relatedTarget as Node);

    if (!isFocusInsideElement) handler(ev);
  };

  onMounted(() => {
    const el = unrefElement(element);
    el?.addEventListener("focusout", handleFocusOut);
  });

  onUnmounted(() => {
    const el = unrefElement(element);
    el?.removeEventListener("focusout", handleFocusOut);
  });
}
