<!-- <script setup lang="ts">
import { inject } from "vue";

const toggleAccordion = inject("toggleAccordion") as () => void;
</script>

<template>
  <div @click="toggleAccordion">
    <slot></slot>
  </div>
</template> -->

<template>
  <button @click="toggleAccordion">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue";

const id = inject<string>("itemId")!;
const isOpen = inject<Ref<boolean>>("isOpen")!;
const allCanOpen = inject<Ref<boolean>>("allCanOpen")!;
const openItems = inject<Ref<string[]>>("openItems")!;

const toggleAccordion = () => {
  if (allCanOpen.value) {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      openItems.value.push(id);
    } else {
      const index = openItems.value.indexOf(id);
      if (index > -1) {
        openItems.value.splice(index, 1);
      }
    }
  } else {
    openItems.value = isOpen.value ? [] : [id];
  }
};

// Watch for changes in openItems to synchronize the open state
watch(openItems, (newOpenItems) => {
  isOpen.value = newOpenItems.includes(id);
});
</script>
