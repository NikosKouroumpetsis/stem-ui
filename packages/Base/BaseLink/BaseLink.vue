<script lang="ts">
export interface Props {
  to: string;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <NuxtLink :to="props.to">
    <slot />
  </NuxtLink>
</template>

<style scoped></style>
