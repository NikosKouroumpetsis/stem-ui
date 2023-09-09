<template>
  <div v-show="showContent">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const showContent = inject("showContent");
</script>
