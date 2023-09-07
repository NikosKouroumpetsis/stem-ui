<script setup lang="ts">
import { Primitive, usePrimitiveElement } from "../../Core/primitive";
import { BaseArrowProps } from "./types";

const props = withDefaults(defineProps<BaseArrowProps>(), {
  width: 10,
  height: 5,
  as: "svg",
});

const { primitiveElement } = usePrimitiveElement();
</script>

<template>
  <Primitive
    ref="primitiveElement"
    v-bind="props"
    :width="width"
    :height="height"
    viewBox="0 0 30 10"
    preserveAspectRatio="none"
  >
    <slot><polygon points="0,0 30,0 15,10" /></slot>
  </Primitive>
</template>
