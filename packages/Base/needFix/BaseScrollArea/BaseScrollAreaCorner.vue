<script setup lang="ts">
import { computed, inject } from 'vue'
import { SCROLL_AREA_INJECTION_KEY } from './BaseScrollArea.vue'
import BaseScrollAreaCornerImpl from './BaseScrollAreaCornerImpl.vue'
import { BaseScrollAreaCornerProps } from './types'


const props = defineProps<BaseScrollAreaCornerProps>()

const context = inject(SCROLL_AREA_INJECTION_KEY)

const hasBothScrollbarsVisible = computed(
  () => !!context?.scrollbarX.value && !!context.scrollbarY.value,
)
const hasCorner = computed(
  () => context?.type.value !== 'scroll' && hasBothScrollbarsVisible.value,
)
</script>

<template>
  <BaseScrollAreaCornerImpl v-if="hasCorner" v-bind="props">
    <slot />
  </BaseScrollAreaCornerImpl>
</template>