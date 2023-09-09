<template>
  <div v-if="showContent">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const showContent = inject("showContent") as import("vue").Ref<boolean>;
</script>
