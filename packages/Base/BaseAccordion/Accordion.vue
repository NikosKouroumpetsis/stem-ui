<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  allCanOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  allCanOpen: true,
});

provide("allCanOpen", ref(props.allCanOpen));
const openItems = ref<string[]>([]);

provide("openItems", openItems);
</script>
