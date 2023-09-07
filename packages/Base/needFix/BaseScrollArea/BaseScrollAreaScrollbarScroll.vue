<script setup lang="ts">
import { ref, watchEffect, inject } from 'vue'
import { useStateMachine } from '../../Core/shared/useStateMachine'
import { SCROLL_AREA_INJECTION_KEY } from './BaseScrollArea.vue'
import { SCROLL_AREA_SCROLLBAR_INJECTION_KEY } from './BaseScrollAreaScrollbar.vue'
import BaseScrollAreaScrollbarVisible from './BaseScrollAreaScrollbarVisible.vue'

const rootContext = inject(SCROLL_AREA_INJECTION_KEY)
const scrollbarContext = inject(SCROLL_AREA_SCROLLBAR_INJECTION_KEY)

const { state, dispatch } = useStateMachine('hidden', {
  hidden: {
    SCROLL: 'scrolling',
  },
  scrolling: {
    SCROLL_END: 'idle',
    POINTER_ENTER: 'interacting',
  },
  interacting: {
    SCROLL: 'interacting',
    POINTER_LEAVE: 'idle',
  },
  idle: {
    HIDE: 'hidden',
    SCROLL: 'scrolling',
    POINTER_ENTER: 'interacting',
  },
})

watchEffect(() => {
  if (state.value === 'idle') {
    window.setTimeout(
      () => dispatch('HIDE'),
      rootContext?.scrollHideDelay.value,
    )
  }
})

let debounceTimeout: number | null = null
const debounceScrollEnd = () => {
  if (debounceTimeout !== null) {
    window.clearTimeout(debounceTimeout)
  }
  debounceTimeout = window.setTimeout(() => {
    dispatch('SCROLL_END')
  }, 100)
}

watchEffect(() => {
  const viewport = rootContext?.viewport.value
  const scrollDirection = scrollbarContext?.isHorizontal.value
    ? 'scrollLeft'
    : 'scrollTop'

  if (viewport) {
    let prevScrollPos = viewport[scrollDirection]
    const handleScroll = () => {
      const scrollPos = viewport[scrollDirection]
      const hasScrollInDirectionChanged = prevScrollPos !== scrollPos
      if (hasScrollInDirectionChanged) {
        dispatch('SCROLL')
        debounceScrollEnd()
      }
      prevScrollPos = scrollPos
    }
    viewport.addEventListener('scroll', handleScroll)
  }
  
})


</script>

<template>
  <BaseScrollAreaScrollbarVisible v-if="state !== 'hidden'" v-bind="$attrs">
    <slot />
  </BaseScrollAreaScrollbarVisible>
</template>
