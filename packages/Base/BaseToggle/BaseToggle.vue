<script lang="ts">
import {
  ComputedRef,
  InjectionKey,
  Ref,
  computed,
  ref,
  watchEffect,
} from "vue";
import { BaseToggleProps } from "./types";

export type ToggleEmits = {
  "update:pressed": [value: boolean];
};

export const TOGGLE_INJECTION_KEY =
  Symbol() as InjectionKey<ToggleProvideValue>;

export interface ToggleProvideValue {
  modelValue?: Readonly<Ref<BaseToggleProps["pressed"]>>;
  dataState: ComputedRef<DataState>;
}

export type DataState = "on" | "off";
</script>

<script setup lang="ts">
import { Primitive } from "../../Core/primitive";

const props = withDefaults(defineProps<BaseToggleProps>(), {
  pressed: undefined,
  disabled: false,
  as: "button",
});

const emits = defineEmits<ToggleEmits>();

const pressed = ref(props.pressed);

watchEffect(() => {
  pressed.value = props.pressed;
});

function togglePressed() {
  const newValue = !pressed.value;
  pressed.value = newValue;
  emits("update:pressed", newValue);
}

const dataState = computed<DataState>(() => {
  return pressed.value ? "on" : "off";
});
</script>

<template>
  <Primitive
    :type="as === 'button' ? 'button' : undefined"
    :as-child="props.asChild"
    :as="as"
    :aria-pressed="pressed"
    :data-state="dataState"
    :data-disabled="disabled ? '' : undefined"
    :disabled="disabled"
    @click="togglePressed"
    @keydown.enter="togglePressed"
  >
    <slot />
  </Primitive>
</template>
./BaseTogleProps ../../Primitive
