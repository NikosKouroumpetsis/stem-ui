<script setup lang="ts">
import { inject } from "vue";

const showImage = inject("showImage");
</script>

<template>
  <span v-if="!showImage">
    <slot></slot>
  </span>
</template>
