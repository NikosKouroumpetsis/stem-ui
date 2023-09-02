<!-- <script setup lang="ts">
import { ref, provide } from "vue";

const isOpen = ref(false);
const toggleAccordion = () => {
  isOpen.value = !isOpen.value;
};

provide("isOpen", isOpen);
provide("toggleAccordion", toggleAccordion);
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template> -->

<template>
  <div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const { allCanOpen } = defineProps<{ allCanOpen: boolean }>();
provide("allCanOpen", ref(allCanOpen));
const openItems = ref<string[]>([]);

provide("openItems", openItems);
</script>
