import { ref, computed, ComponentPublicInstance } from "vue";

export function usePrimitiveElement() {
  const primitiveElement = ref<ComponentPublicInstance>();

  // Χρησιμοποιήστε την computed για να δημιουργήσετε έναν αυτόματα ενημερωμένο τύπο ComputedRef
  const currentElement = computed(() => {
    const element = primitiveElement.value;
    return element?.$el.nodeName === "#text"
      ? (element.$el.nextElementSibling as HTMLElement)
      : (element?.$el as HTMLElement);
  });

  return {
    primitiveElement,
    currentElement,
  };
}
