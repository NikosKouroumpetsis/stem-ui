<script lang="ts">
import type { InjectionKey, Ref } from "vue";
import type { DataOrientation, Direction } from "../../Core/shared/types";
import { useSingleOrMultipleValue } from "../../Core/shared/useSingleOrMultipleValue";
import { BaseRovingFocusGroup } from "../BaseRovingFocus";

type TypeEnum = "single" | "multiple";

export const TOGGLE_GROUP_INJECTION_KEY =
  Symbol() as InjectionKey<ToggleGroupProvideValue>;

interface ToggleGroupProvideValue {
  type: TypeEnum;
  modelValue: Ref<string | string[] | undefined>;
  changeModelValue: (value: string) => void;
  dir?: Ref<Direction>;
  orientation?: DataOrientation;
  loop: Ref<boolean>;
  rovingFocus: Ref<boolean>;
  disabled?: Ref<boolean>;
}
</script>

<script setup lang="ts">
import { provide, toRefs } from "vue";
import { Primitive } from "../../Core/primitive";
import { BaseToggleGroupProps, BaseToggleGroupEmits } from "./types";

const props = withDefaults(defineProps<BaseToggleGroupProps>(), {
  type: "single",
  loop: true,
  dir: "ltr",
  orientation: "horizontal",
  rovingFocus: true,
  disabled: false,
});
const emits = defineEmits<BaseToggleGroupEmits>();

const { loop, rovingFocus, disabled, dir } = toRefs(props);

const { modelValue, changeModelValue } = useSingleOrMultipleValue(props, emits);

provide(TOGGLE_GROUP_INJECTION_KEY, {
  type: props.type,
  modelValue,
  changeModelValue,
  dir,
  orientation: props.orientation,
  loop,
  rovingFocus,
  disabled,
});
</script>

<template>
  <component
    :is="rovingFocus ? BaseRovingFocusGroup : Primitive"
    as-child
    :orientation="rovingFocus ? orientation : undefined"
    :dir="dir"
    :loop="rovingFocus ? loop : undefined"
  >
    <Primitive role="group" :as-child="asChild" :as="as">
      <slot :model-value="modelValue" />
    </Primitive>
  </component>
</template>
