<script lang="ts">
import { computed } from "vue";
import type { DataOrientation } from "../../Core/shared/types";

import { BaseSeparatorProps } from "./types";
</script>

<script setup lang="ts">
import { Primitive } from "../../Core/primitive";

const props = withDefaults(defineProps<BaseSeparatorProps>(), {
  orientation: "horizontal",
});

const ORIENTATIONS = ["horizontal", "vertical"] as const;
function isValidOrientation(orientation: any): orientation is DataOrientation {
  return ORIENTATIONS.includes(orientation);
}

const computedOrientation = computed(() =>
  isValidOrientation(props.orientation) ? props.orientation : "horizontal"
);
// `aria-orientation` defaults to `horizontal` so we only need it if `orientation` is vertical
const ariaOrientation = computed(() =>
  computedOrientation.value === "vertical" ? props.orientation : undefined
);

const semanticProps = computed(() =>
  props.decorative
    ? { role: "none" }
    : { "aria-orientation": ariaOrientation.value, role: "separator" }
);
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :data-orientation="computedOrientation"
    v-bind="semanticProps"
  >
    <slot />
  </Primitive>
</template>
