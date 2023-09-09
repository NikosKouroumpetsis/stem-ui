<template>
  <div
    @click="toggleContent"
    @mouseover="showContent = true"
    @mouseleave="showContent = false"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const showContent = inject("showContent") as import("vue").Ref<boolean>;

const toggleContent = () => {
  showContent.value = !showContent.value;
};
</script>
