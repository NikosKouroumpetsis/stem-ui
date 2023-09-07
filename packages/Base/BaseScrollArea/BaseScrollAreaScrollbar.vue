<script lang="ts">
import {
  type InjectionKey,
  type Ref,
  computed,
  inject,
  onUnmounted,
  provide,
  toRefs,
  watch,
} from 'vue'



export interface ScrollAreaScollbarProvideValue {
  as: Ref<AsTag>
  orientation: Ref<'vertical' | 'horizontal'>
  forceMount?: Ref<boolean>
  isHorizontal: Ref<boolean>
  asChild: Ref<boolean>
}

export const SCROLL_AREA_SCROLLBAR_INJECTION_KEY
  = Symbol() as InjectionKey<ScrollAreaScollbarProvideValue>

export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { SCROLL_AREA_INJECTION_KEY } from './BaseScrollArea.vue'
import BaseScrollAreaScrollbarHover from './BaseScrollAreaScrollbarHover.vue'
import BaseScrollAreaScrollbarScroll from './BaseScrollAreaScrollbarScroll.vue'
import BaseScrollAreaScrollbarAuto from './BaseScrollAreaScrollbarAuto.vue'
import BaseScrollAreaScrollbarVisible from './BaseScrollAreaScrollbarVisible.vue'
import { type AsTag} from '../../Core/primitive/index'
import {BaseScrollAreaScrollbarProps} from './types'

const props = withDefaults(defineProps<BaseScrollAreaScrollbarProps>(), {
  orientation: 'vertical',
  forceMount: undefined,
  as: 'div',
})

const injectedValue = inject(SCROLL_AREA_INJECTION_KEY)

const isHorizontal = computed(() => props.orientation === 'horizontal')

watch(
  isHorizontal,
  () => {
    if (isHorizontal.value)
      injectedValue?.onScrollbarXEnabledChange(true)
    else injectedValue?.onScrollbarYEnabledChange(true)
  },
  { immediate: true },
)

onUnmounted(() => {
  injectedValue?.onScrollbarXEnabledChange(false)
  injectedValue?.onScrollbarYEnabledChange(false)
})

const { orientation, forceMount, asChild, as } = toRefs(props)
provide<ScrollAreaScollbarProvideValue>(SCROLL_AREA_SCROLLBAR_INJECTION_KEY, {
  orientation,
  forceMount,
  isHorizontal,
  as,
  asChild,
})

</script>

<template>
  <BaseScrollAreaScrollbarHover
    v-if="injectedValue?.type.value === 'hover'"
    v-bind="$attrs"
    :force-mount="forceMount"
  >
    <slot />
  </BaseScrollAreaScrollbarHover>
  <BaseScrollAreaScrollbarScroll
    v-else-if="injectedValue?.type.value === 'scroll'"
    v-bind="$attrs"
    :force-mount="forceMount"
  >
    <slot />
  </BaseScrollAreaScrollbarScroll>
  <BaseScrollAreaScrollbarAuto
    v-else-if="injectedValue?.type.value === 'auto'"
    v-bind="$attrs"
    :force-mount="forceMount"
  >
    <slot />
  </BaseScrollAreaScrollbarAuto>
  <BaseScrollAreaScrollbarVisible
    v-else-if="injectedValue?.type.value === 'always'"
    v-bind="$attrs"
    data-state="visible"
    :force-mount="forceMount"
  >
    <slot />
  </BaseScrollAreaScrollbarVisible>
</template>