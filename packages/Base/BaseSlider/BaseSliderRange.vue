<script lang="ts"></script>

<script setup lang="ts">
import { computed, inject } from "vue";
import { Primitive } from "../../Core/primitive";
import { BaseSliderRangeProps } from "./types";
import { SLIDER_INJECTION_KEY } from "./BaseSlider.vue";
import {
  SLIDER_ORIENTATION_INJECTION_KEY,
  convertValueToPercentage,
} from "./utils";

withDefaults(defineProps<BaseSliderRangeProps>(), { as: "span" });
const context = inject(SLIDER_INJECTION_KEY);
const orientation = inject(SLIDER_ORIENTATION_INJECTION_KEY);

const percentages = computed(() =>
  context?.modelValue?.value?.map((value) =>
    convertValueToPercentage(value, context.min.value, context.max.value)
  )
);

const offsetStart = computed(() =>
  context!.modelValue!.value!.length > 1 ? Math.min(...percentages.value!) : 0
);
const offsetEnd = computed(() => 100 - Math.max(...percentages.value!));
</script>

<template>
  <Primitive
    :data-disabled="context?.disabled.value"
    :data-orientation="context?.orientation.value"
    :as-child="asChild"
    :as="as"
    :style="{
      [orientation!.startEdge]: `${offsetStart}%`,
      [orientation!.endEdge]: `${offsetEnd}%`,
    }"
  >
    <slot />
  </Primitive>
</template>
