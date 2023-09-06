<script setup lang="ts">
import { inject } from "vue";
import {
  SWITCH_INJECTION_KEY,
  type SwitchProvideValue,
} from "./BaseSwitch.vue";
import { Primitive } from "../../Core/primitive";
import { BaseSwitchThumbProps } from "./types";

withDefaults(defineProps<BaseSwitchThumbProps>(), { as: "span" });
const injectedValue = inject<SwitchProvideValue>(SWITCH_INJECTION_KEY);
</script>

<template>
  <Primitive
    :data-state="injectedValue?.checked?.value ? 'checked' : 'unchecked'"
    :data-disabled="injectedValue?.disabled.value ? '' : undefined"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </Primitive>
</template>
