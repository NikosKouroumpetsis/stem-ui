<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";

const showContent = ref(false);
provide("showContent", showContent);
</script>
