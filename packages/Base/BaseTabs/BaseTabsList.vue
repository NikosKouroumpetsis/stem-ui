<script setup lang="ts">
import { inject, toRefs } from "vue";
import { TABS_INJECTION_KEY } from "./BaseTabs.vue";
import { Primitive } from "../../Core/primitive";
import { BaseRovingFocusGroup } from "../BaseRovingFocus";
import { BaseTabsListProps } from "./types";

const props = withDefaults(defineProps<BaseTabsListProps>(), {
  loop: true,
});
const { loop } = toRefs(props);

const context = inject(TABS_INJECTION_KEY);
</script>

<template>
  <BaseRovingFocusGroup
    as-child
    :orientation="context?.orientation.value"
    :dir="context?.dir.value"
    :loop="loop"
  >
    <Primitive
      role="tablist"
      :as-child="asChild"
      :as="as"
      :aria-orientation="context?.orientation.value"
    >
      <slot />
    </Primitive>
  </BaseRovingFocusGroup>
</template>
