<script setup lang="ts">
import { computed, inject, onUnmounted, ref, watchEffect } from 'vue'
import { Primitive, usePrimitiveElement } from '../../Core/primitive'
import { addUnlinkedScrollListener } from './utils'
import { SCROLL_AREA_INJECTION_KEY } from './BaseScrollArea.vue'
import { SCROLL_AREA_SCROLLBAR_VISIBLE_INJECTION_KEY } from './BaseScrollAreaScrollbarVisible.vue'
import {BaseScrollAreaThumbProps} from './types'

const props = defineProps<BaseScrollAreaThumbProps>()

const rootContext = inject(SCROLL_AREA_INJECTION_KEY)
const scrollbarContextVisible = inject(
  SCROLL_AREA_SCROLLBAR_VISIBLE_INJECTION_KEY,
)

function handlePointerDown(event: MouseEvent) {
  const thumb = event.target as HTMLElement
  const thumbRect = thumb.getBoundingClientRect()
  const x = event.clientX - thumbRect.left
  const y = event.clientY - thumbRect.top
  scrollbarContextVisible?.handleThumbDown(event, { x, y })
}

function handlePointerUp(event: MouseEvent) {
  scrollbarContextVisible?.handleThumbUp(event)
}

const { primitiveElement, currentElement: thumbElement } = usePrimitiveElement()
const removeUnlinkedScrollListenerRef = ref<() => void>()
const viewport = computed(() => rootContext?.viewport.value)

function handleScroll() {
  if (!removeUnlinkedScrollListenerRef.value) {
    const listener = addUnlinkedScrollListener(
      viewport.value!,
      scrollbarContextVisible?.onThumbPositionChange,
    )
    removeUnlinkedScrollListenerRef.value = listener
    scrollbarContextVisible?.onThumbPositionChange()
  }
}

const sizes = computed(() => scrollbarContextVisible?.sizes.value)

const stopWatch = watchEffect(() => {
  if (sizes.value) {
    scrollbarContextVisible?.onThumbChange(thumbElement.value!)
    if (viewport.value) {
      scrollbarContextVisible?.onThumbPositionChange()
      viewport.value.addEventListener('scroll', handleScroll)
    }
    stopWatch()  // Stop watching after the first change.
  }
})

onUnmounted(() => {
  viewport.value!.removeEventListener('scroll', handleScroll)
  rootContext?.viewport.value?.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Primitive
    ref="primitiveElement"
    :data-state="scrollbarContextVisible?.hasThumb ? 'visible' : 'hidden'"
    :style="{
      width: 'var(--radix-scroll-area-thumb-width)',
      height: 'var(--radix-scroll-area-thumb-height)',
    }"
    :as-child="props.asChild"
    :as="as"
    @pointerdown="handlePointerDown"
    @pointerup="handlePointerUp"
  >
    <slot />
  </Primitive>
</template>
