<template>
  <div v-if="isOpen">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const isOpen = inject<Ref<boolean>>("isOpen")!;
</script>
