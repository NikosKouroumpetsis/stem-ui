import { watchEffect } from "vue";

let count = 0;

export function useFocusGuards() {
  watchEffect((cleanupFn) => {
    const isClient = typeof window !== "undefined";
    if (!isClient) return;

    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement(
      "afterbegin",
      edgeGuards[0] ?? createFocusGuard()
    );
    document.body.insertAdjacentElement(
      "beforeend",
      edgeGuards[1] ?? createFocusGuard()
    );
    count++;

    cleanupFn(() => {
      if (count === 1) {
        document
          .querySelectorAll("[data-radix-focus-guard]")
          .forEach((node) => node.remove());
      }
      count--;
    });
  });
}

function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.cssText =
    "outline: none; opacity: 0; position: fixed; pointer-events: none";
  return element;
}
