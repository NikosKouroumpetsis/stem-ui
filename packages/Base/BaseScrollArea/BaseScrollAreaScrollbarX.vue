<script setup lang="ts">
import { computed, inject, onMounted } from 'vue'
import { SCROLL_AREA_SCROLLBAR_VISIBLE_INJECTION_KEY } from './BaseScrollAreaScrollbarVisible.vue'
import { SCROLL_AREA_INJECTION_KEY } from './BaseScrollArea.vue'
import BaseScrollAreaScrollbarImpl from './BaseScrollAreaScrollbarImpl.vue'
import { getThumbSize } from './utils'
import { usePrimitiveElement } from '../../Core/primitive'

const rootContext = inject(SCROLL_AREA_INJECTION_KEY)

const scrollbarVisibleContext = inject(
  SCROLL_AREA_SCROLLBAR_VISIBLE_INJECTION_KEY,
)

const { primitiveElement, currentElement: scrollbarElement }
  = usePrimitiveElement()

onMounted(() => {
  if (scrollbarElement.value)
    rootContext?.onScrollbarXChange(scrollbarElement.value)
})
const sizes = computed(() => scrollbarVisibleContext?.sizes.value)
</script>

<template>
  <BaseScrollAreaScrollbarImpl
    ref="primitiveElement"
    :is-horizontal="true"
    data-orientation="horizontal"
    :style="{
      bottom: 0,
      left: rootContext?.dir?.value === 'rtl' ? 'var(--radix-scroll-area-corner-width)' : 0,
      right: rootContext?.dir?.value === 'ltr' ? 'var(--radix-scroll-area-corner-width)' : 0,
      ['--radix-scroll-area-thumb-width' as any]: sizes ? `${getThumbSize(sizes)}px` : undefined,
    }"
    @on-drag-scroll="scrollbarVisibleContext?.onDragScroll($event.x)"
  >
    <slot />
  </BaseScrollAreaScrollbarImpl>
</template>