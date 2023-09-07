<script lang="ts">
import type { InjectionKey, Ref } from "vue";

export const SWITCH_INJECTION_KEY =
  Symbol() as InjectionKey<SwitchProvideValue>;

export interface SwitchProvideValue {
  checked?: Ref<boolean>;
  toggleCheck: () => void;
  disabled: Ref<boolean>;
}
</script>

<script setup lang="ts">
import { computed, provide, toRefs } from "vue";

import { Primitive, usePrimitiveElement } from "../../Core/primitive";
import { BaseSwitchProps, BaseSwitchEmits } from "./types";

const props = withDefaults(defineProps<BaseSwitchProps>(), {
  as: "button",
  asChild: false,
  disabled: false,
  defaultOpen: false,
  value: "on",
});
const emit = defineEmits<BaseSwitchEmits>();
const { disabled } = toRefs(props);

function useCustomVModel(
  props: any,
  propName: string,
  emit: Function,
  options: any
) {
  const modelRef = ref(props[propName] ?? options.defaultValue);

  watch(
    () => props[propName],
    (newVal) => {
      if (newVal !== modelRef.value) {
        modelRef.value = newVal;
      }
    },
    { immediate: true }
  );

  watch(modelRef, (newVal) => {
    if (newVal !== props[propName]) {
      emit(`update:${propName}`, newVal);
    }
  });

  return modelRef;
}

const checked = useCustomVModel(props, "checked", emit, {
  defaultValue: props.defaultChecked,
});

function toggleCheck() {
  if (disabled.value) return;

  checked.value = !checked.value;
}

const { primitiveElement, currentElement } = usePrimitiveElement();
// We set this to true by default so that events bubble to forms without JS (SSR)
const isFormControl = computed(() =>
  currentElement.value ? Boolean(currentElement.value.closest("form")) : true
);
const ariaLabel = computed(() =>
  props.id && currentElement.value
    ? (document.querySelector(`[for=${props.id}]`) as HTMLLabelElement)
        ?.innerText
    : undefined
);

provide<SwitchProvideValue>(SWITCH_INJECTION_KEY, {
  checked,
  toggleCheck,
  disabled,
});
</script>

<template>
  <Primitive
    v-bind="$attrs"
    :id="id"
    ref="primitiveElement"
    role="switch"
    :type="as === 'button' ? 'button' : undefined"
    :value="value"
    :aria-label="$attrs['aria-label'] || ariaLabel"
    :aria-checked="checked"
    :aria-required="required"
    :data-state="checked ? 'checked' : 'unchecked'"
    :data-disabled="disabled ? '' : undefined"
    :as-child="asChild"
    :as="as"
    :disabled="disabled"
    @click="toggleCheck"
    @keydown.enter.prevent="toggleCheck"
  >
    <slot />
  </Primitive>

  <input
    v-if="isFormControl"
    :checked="checked"
    type="checkbox"
    :name="name"
    tabindex="-1"
    aria-hidden
    :disabled="disabled"
    :required="required"
    :data-state="checked ? 'checked' : 'unchecked'"
    :data-disabled="disabled ? '' : undefined"
    :style="{
      transform: 'translateX(-100%)',
      position: 'absolute',
      pointerEvents: 'none',
      opacity: 0,
      margin: 0,
    }"
  />
</template>
