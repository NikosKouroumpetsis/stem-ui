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
    <button>
      <slot />
    </button>
  </NuxtLink>
  <button v-else>
    <slot />
  </button>
</template>

<style scoped></style>
