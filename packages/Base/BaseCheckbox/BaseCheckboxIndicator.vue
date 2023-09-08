<script lang="ts"></script>

<script setup lang="ts">
import { inject } from "vue";
import { CHECKBOX_INJECTION_KEY } from "./BaseCheckbox.vue";
import { Primitive } from "../../Core/primitive";
import { BasePresence } from "../BasePresence";
import { getState, isIndeterminate } from "./utils";
import { BaseCheckboxIndicatorProps } from "./types";

withDefaults(defineProps<BaseCheckboxIndicatorProps>(), {
  as: "span",
});

const context = inject(CHECKBOX_INJECTION_KEY);
</script>

<template>
  <BasePresence
    :present="forceMount || isIndeterminate(context!.state.value) || context?.state.value === true"
  >
    <Primitive
      :data-state="getState(context!.state.value)"
      :data-disabled="context?.disabled.value ? '' : undefined"
      :style="{ pointerEvents: 'none' }"
      :as-child="asChild"
      :as="as"
    >
      <slot />
    </Primitive>
  </BasePresence>
</template>
