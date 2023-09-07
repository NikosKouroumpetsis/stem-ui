<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { SCROLL_AREA_INJECTION_KEY } from './BaseScrollArea.vue'
import { SCROLL_AREA_SCROLLBAR_INJECTION_KEY } from './BaseScrollAreaScrollbar.vue'
import BaseScrollAreaScrollbarVisible from './BaseScrollAreaScrollbarVisible.vue'

const rootContext = inject(SCROLL_AREA_INJECTION_KEY)
const scrollbarContext = inject(SCROLL_AREA_SCROLLBAR_INJECTION_KEY)

const visible = ref(false)
const hover = ref(false)
const active = ref(false)

// Debounce function
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;
const debounceFn = (fn: Function, delay: number) => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout)
  }
  debounceTimeout = setTimeout(() => {
    fn()
  }, delay)
}

// Function to handle resize
const handleResize = () => {
  if (rootContext?.viewport.value) {
    const isOverflowX =
      rootContext?.viewport.value.offsetWidth <
      rootContext?.viewport.value.scrollWidth
    const isOverflowY =
      rootContext?.viewport.value.offsetHeight <
      rootContext?.viewport.value.scrollHeight

    visible.value = scrollbarContext?.isHorizontal.value
      ? isOverflowX
      : isOverflowY
  }
}

// Debounced resize handler
const debouncedHandleResize = () => debounceFn(handleResize, 10)

// Watch for viewport and content size changes
watch(
  () => [rootContext?.viewport.value, rootContext?.content.value],
  debouncedHandleResize,
  { deep: true }
)
</script>

<template>
  <BaseScrollAreaScrollbarVisible
    v-if="visible"
    v-bind="$attrs"
    :data-state="visible ? 'visible' : 'hidden'"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    @mousedown="active = true"
    @mouseup="active = false"
  >
    <slot />
  </BaseScrollAreaScrollbarVisible>
</template>
