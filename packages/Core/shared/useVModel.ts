import { ref, watch, Ref, isRef } from "vue";

export function useVModel<T>(
  props: Record<string, any>,
  propName: string,
  emit: (...args: any[]) => void,
  options: { defaultValue?: T; passive?: boolean } = {}
): Ref<T> {
  const propValue = props[propName];
  const state = isRef(propValue)
    ? propValue
    : ref(propValue ?? options.defaultValue);

  watch(
    () => props[propName],
    (newVal) => {
      if (newVal !== undefined) {
        if (isRef(newVal)) {
          state.value = newVal.value;
        } else {
          state.value = newVal;
        }
      }
    },
    { immediate: true }
  );

  watch(
    state,
    (newValue) => {
      emit(`update:${propName}`, newValue);
    },
    { immediate: options.passive }
  );

  return state;
}
