<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ id: string }>();
const isOpen = ref(false);

provide("itemId", props.id);
provide("isOpen", isOpen);
</script>
