<script setup lang="ts">
import { inject } from "vue";
import { PROGRESS_INJECTION_KEY } from "./BaseProgress.vue";
import { Primitive } from "../../Core/primitive";
import { BaseProgressIndicatorProps } from "./types";

const props = defineProps<BaseProgressIndicatorProps>();

const injectedValue = inject(PROGRESS_INJECTION_KEY);
</script>

<template>
  <Primitive
    v-bind="props"
    :data-state="injectedValue?.progressState.value"
    :data-value="injectedValue?.modelValue?.value ?? undefined"
    :data-max="injectedValue?.max.value"
  >
    <slot />
  </Primitive>
</template>
