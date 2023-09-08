<script lang="ts">
import type { InjectionKey, Ref } from "vue";
import { useVModel } from "../../Core/shared";
import { provide, toRefs } from "vue";
import type { DataOrientation, Direction } from "../../Core/shared/types";
import { useId } from "../../Core/shared";

export const TABS_INJECTION_KEY = Symbol() as InjectionKey<TabsProvideValue>;
</script>

<script setup lang="ts">
import { Primitive } from "../../Core/primitive";
import { BaseTabsProps, BaseTabsEmits } from "./types";

export interface TabsProvideValue {
  modelValue: Ref<string | undefined>;
  changeModelValue: (value: string) => void;
  orientation: Ref<DataOrientation>;
  dir: Ref<Direction>;
  activationMode: "automatic" | "manual";
  baseId: string;
}

const props = withDefaults(defineProps<BaseTabsProps>(), {
  orientation: "horizontal",
  dir: "ltr",
  activationMode: "automatic",
});
const emits = defineEmits<BaseTabsEmits>();
const { orientation, dir } = toRefs(props);

const modelValue = useVModel(props, "modelValue", emits, {
  defaultValue: props.defaultValue,
  passive: true,
});

provide<TabsProvideValue>(TABS_INJECTION_KEY, {
  modelValue,
  changeModelValue: (value: string) => {
    modelValue.value = value;
  },
  orientation,
  dir,
  activationMode: props.activationMode,
  baseId: useId(),
});
</script>

<template>
  <Primitive
    :dir="dir"
    :data-orientation="orientation"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </Primitive>
</template>
