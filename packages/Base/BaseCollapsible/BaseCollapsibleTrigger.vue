<script lang="ts"></script>

<script setup lang="ts">
import { inject } from "vue";
import { Primitive } from "../../Core/primitive";
import { COLLAPSIBLE_INJECTION_KEY } from "./BaseCollapsible.vue";
import { BaseCollapsibleTriggerProps } from "./types";

const props = withDefaults(defineProps<BaseCollapsibleTriggerProps>(), {
  as: "button",
});

const injectedValue = inject(COLLAPSIBLE_INJECTION_KEY);
</script>

<template>
  <Primitive
    :type="as === 'button' ? 'button' : undefined"
    :as="as"
    :as-child="props.asChild"
    :aria-controls="injectedValue?.contentId"
    :aria-expanded="injectedValue?.open.value || false"
    :data-state="injectedValue?.open.value ? 'open' : 'closed'"
    :data-disabled="injectedValue?.disabled?.value ? '' : undefined"
    :disabled="injectedValue?.disabled?.value"
    @click="injectedValue?.onOpenToggle"
  >
    <slot />
  </Primitive>
</template>
