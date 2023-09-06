<script lang="ts">
import { Primitive } from "../../Core/primitive";
import type { DataOrientation } from "../../Core/shared/types";

import type { InjectionKey, Ref } from "vue";

interface RadioGroupProvideValue {
  modelValue?: Readonly<Ref<string | undefined>>;
  changeModelValue: (value?: string) => void;
  disabled: Ref<boolean>;
  loop: Ref<boolean>;
  orientation: Ref<DataOrientation | undefined>;
  name?: string;
  required: Ref<boolean>;
}
export type BaseRadioGroupEmits = {
  "update:modelValue": [payload: string];
};

export const RADIO_GROUP_INJECTION_KEY =
  Symbol() as InjectionKey<RadioGroupProvideValue>;
</script>

<script setup lang="ts">
import { BaseRadioGroupProps } from "./types";
import { ref, watchEffect, provide, toRefs } from "vue";
import { BaseRovingFocusGroup } from "../BaseRovingFocus";

const props = withDefaults(defineProps<BaseRadioGroupProps>(), {
  disabled: false,
  required: false,
  orientation: undefined,
  dir: "ltr",
  loop: true,
});

const emits = defineEmits<BaseRadioGroupEmits>();
const modelValue = ref(props.modelValue);

watchEffect(() => {
  modelValue.value = props.modelValue;
});

function changeModelValue(value?: string) {
  modelValue.value = value;
  if (value !== undefined) {
    emits("update:modelValue", value);
  }
}

const { disabled, loop, orientation, name, required } = toRefs(props);
provide<RadioGroupProvideValue>(RADIO_GROUP_INJECTION_KEY, {
  modelValue,
  changeModelValue,
  disabled,
  loop,
  orientation,
  name: name?.value,
  required,
});
</script>

<template>
  <BaseRovingFocusGroup
    as-child
    :orientation="orientation"
    :dir="dir"
    :loop="loop"
  >
    <Primitive
      role="radiogroup"
      :data-disabled="disabled ? '' : undefined"
      :as-child="asChild"
      :as="as"
      :required="required"
      :aria-orientation="orientation"
      :aria-required="required"
      :dir="dir"
      :name="name"
    >
      <slot />
    </Primitive>
  </BaseRovingFocusGroup>
</template>
