<script setup lang="ts">
import { computed, inject, ref, watch, onMounted, onUnmounted } from 'vue'
import { SCROLL_AREA_INJECTION_KEY } from './BaseScrollArea.vue'
import { Primitive } from '../../Core/primitive'


const context = inject(SCROLL_AREA_INJECTION_KEY)

const width = ref(0)
const height = ref(0)

const hasSize = computed(() => !!width.value && !!height.value)

function setCornerHeight() {
  const offsetHeight = context?.scrollbarX.value?.offsetHeight || 0
  context?.onCornerHeightChange(offsetHeight)
  height.value = offsetHeight
}

function setCornerWidth() {
  const offsetWidth = context?.scrollbarY.value?.offsetWidth || 0
  context?.onCornerWidthChange(offsetWidth)
  width.value = offsetWidth
}

const observeResize = (element: Element, callback: () => void) => {
  const resizeObserver = new ResizeObserver(callback)
  resizeObserver.observe(element)
  return () => resizeObserver.unobserve(element)
}

let unobserveX: (() => void) | null = null
let unobserveY: (() => void) | null = null

onMounted(() => {
  if (context?.scrollbarX.value) {
    unobserveX = observeResize(context.scrollbarX.value, setCornerHeight)
  }
  if (context?.scrollbarY.value) {
    unobserveY = observeResize(context.scrollbarY.value, setCornerWidth)
  }
})

onUnmounted(() => {
  unobserveX?.()
  unobserveY?.()
})

watch(() => context?.scrollbarX.value, setCornerHeight)
watch(() => context?.scrollbarY.value, setCornerWidth)
</script>

<template>
  <Primitive
    v-if="hasSize"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      position: 'absolute',
      right: context!.dir.value === 'ltr' ? 0 : undefined,
      left: context!.dir.value === 'rtl' ? 0 : undefined,
      bottom: 0,
    }"
    v-bind="$parent?.$props"
  >
    <slot />
  </Primitive>
</template>