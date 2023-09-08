<script setup lang="ts">
import { computed, inject } from "vue";
import { TOGGLE_GROUP_INJECTION_KEY } from "./BaseToggleGroup.vue";
import { BaseToggle } from "../BaseToggle";
import { BaseRovingFocusItem } from "../BaseRovingFocus";
import { Primitive } from "../../Core/primitive";
import { BaseToggleGroupItemProps } from "./types";

const props = withDefaults(defineProps<BaseToggleGroupItemProps>(), {
  as: "button",
});

const context = inject(TOGGLE_GROUP_INJECTION_KEY);
const disabled = computed(() => context?.disabled?.value || props.disabled);
const pressed = computed(() =>
  context?.modelValue.value?.includes(props.value)
);
</script>

<template>
  <component
    :is="context?.rovingFocus.value ? BaseRovingFocusItem : Primitive"
    as-child
    :focusable="!disabled"
    :active="pressed"
  >
    <BaseToggle
      v-bind="props"
      :disabled="disabled"
      :pressed="
        context?.type === 'single'
          ? context?.modelValue.value === value
          : context?.modelValue.value?.includes(value)
      "
      @update:pressed="context?.changeModelValue(value)"
    >
      <slot />
    </BaseToggle>
  </component>
</template>
