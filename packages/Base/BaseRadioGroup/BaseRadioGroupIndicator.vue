<script lang="ts"></script>

<script setup lang="ts">
import { inject } from "vue";
import { RADIO_GROUP_ITEM_INJECTION_KEY } from "./BaseRadioGroupItem.vue";
import { Primitive } from "../../Core/primitive";
import { BaseRadioGroupIndicatorProps } from "./types";

withDefaults(defineProps<BaseRadioGroupIndicatorProps>(), {
  as: "span",
});

const itemContext = inject(RADIO_GROUP_ITEM_INJECTION_KEY);
</script>

<template>
  <Primitive
    v-if="itemContext?.checked.value"
    :data-state="itemContext?.checked.value ? 'checked' : 'unchecked'"
    :data-disabled="itemContext?.disabled.value ? '' : undefined"
    :as-child="asChild"
    :as="as"
  >
    <slot />
  </Primitive>
</template>
