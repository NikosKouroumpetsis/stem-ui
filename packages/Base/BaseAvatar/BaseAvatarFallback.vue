<script setup lang="ts">
import { inject } from "vue";

const srcExists = inject("srcExists") as Ref<boolean>;
const imageState = inject("imageState") as Ref<
  "idle" | "loading" | "loaded" | "error"
>;
const showFallback = inject("showFallback") as Ref<boolean>;
const delayExpired = inject("delayExpired") as Ref<boolean>;
const showImage = inject("showImage");
</script>

<template>
  <span v-if="!showImage">
    <slot></slot>
  </span>
</template>
