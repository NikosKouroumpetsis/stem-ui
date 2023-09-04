<script lang="ts">
export interface Props {
  to?: string;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <NuxtLink v-if="props.to" :to="props.to">
    <slot />
  </NuxtLink>
  <span v-else>
    <slot />
  </span>
</template>

<style scoped></style>
