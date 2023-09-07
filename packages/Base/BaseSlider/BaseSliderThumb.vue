<script setup lang="ts">
import { useCollection } from "../../Core/shared";
import BaseSliderThumbImpl from "./BaseSliderThumbImpl.vue";
import { usePrimitiveElement } from "../../Core/primitive";
import { computed } from "vue";
import { BaseSliderThumbProps } from "./types";

const props = defineProps<BaseSliderThumbProps>();
const { injectCollection } = useCollection("sliderThumb");
const collections = injectCollection();

const { primitiveElement, currentElement: thumbElement } =
  usePrimitiveElement();

const index = computed(() =>
  thumbElement.value
    ? collections.value.findIndex((i) => i === thumbElement.value)
    : -1
);
</script>

<template>
  <BaseSliderThumbImpl ref="primitiveElement" v-bind="props" :index="index">
    <slot />
  </BaseSliderThumbImpl>
</template>
