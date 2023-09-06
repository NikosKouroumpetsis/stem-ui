<script lang="ts"></script>

<script setup lang="ts">
import { inject } from "vue";
import { Primitive } from "../../Core/primitive";
import { SLIDER_INJECTION_KEY } from "./BaseSlider.vue";
import { BaseSliderTrackProps } from "./types";

const props = withDefaults(defineProps<BaseSliderTrackProps>(), { as: "span" });

const context = inject(SLIDER_INJECTION_KEY);
</script>

<template>
  <Primitive
    :as-child="props.asChild"
    :as="as"
    :data-disabled="context?.disabled.value"
    :data-orientation="context?.orientation.value"
  >
    <slot />
  </Primitive>
</template>
