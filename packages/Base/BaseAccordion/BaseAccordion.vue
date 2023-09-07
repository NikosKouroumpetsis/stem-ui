<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export interface Props {
  allCanOpen?: boolean;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<Props>(), {
  allCanOpen: true,
});

provide("allCanOpen", ref(props.allCanOpen));
const openItems = ref<string[]>([]);

provide("openItems", openItems);
</script>
