<script setup lang="ts">
import { computed, inject } from "vue";
import { TABS_INJECTION_KEY } from "./BaseTabs.vue";
import { Primitive } from "../../Core/primitive";
import { BaseRovingFocusItem } from "../BaseRovingFocus";
import { makeContentId, makeTriggerId } from "./utils";
import { BaseTabsTriggerProps } from "./types";

const props = withDefaults(defineProps<BaseTabsTriggerProps>(), {
  disabled: false,
  as: "button",
});
const context = inject(TABS_INJECTION_KEY);

const triggerId = computed(() => makeTriggerId(context!.baseId, props.value));
const contentId = computed(() => makeContentId(context!.baseId, props.value));

const isSelected = computed(() => props.value === context?.modelValue.value);
</script>

<template>
  <BaseRovingFocusItem as-child :focusable="!disabled" :active="isSelected">
    <Primitive
      :id="triggerId"
      role="tab"
      :type="as === 'button' ? 'button' : undefined"
      :as="as"
      :as-child="asChild"
      :aria-selected="isSelected ? 'true' : 'false'"
      :aria-controls="contentId"
      :data-state="isSelected ? 'active' : 'inactive'"
      :disabled="disabled"
      :data-disabled="disabled ? '' : undefined"
      :data-orientation="context?.orientation.value"
      @mousedown.left="
        (event) => {
          // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
          // but not when the control key is pressed (avoiding MacOS right click)
          if (!disabled && event.ctrlKey === false) {
            context?.changeModelValue(value);
          } else {
            // prevent focus to avoid accidental activation
            event.preventDefault();
          }
        }
      "
      @keydown.enter.space="context?.changeModelValue(value)"
      @focus="
        () => {
          // handle 'automatic' activation if necessary
          // ie. activate tab following focus
          const isAutomaticActivation = context?.activationMode !== 'manual';
          if (!isSelected && !disabled && isAutomaticActivation) {
            context?.changeModelValue(value);
          }
        }
      "
    >
      <slot />
    </Primitive>
  </BaseRovingFocusItem>
</template>
