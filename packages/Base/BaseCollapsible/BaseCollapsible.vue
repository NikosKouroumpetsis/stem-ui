<script lang="ts">
import type { InjectionKey, Ref } from "vue";
import { useId } from "../../Core/shared";

interface CollapsibleProvideValue {
  contentId: string;
  disabled?: Ref<boolean>;
  open: Ref<boolean>;
  onOpenToggle(): void;
}

export const COLLAPSIBLE_INJECTION_KEY =
  Symbol() as InjectionKey<CollapsibleProvideValue>;
</script>

<script setup lang="ts">
import { provide } from "vue";
import { Primitive } from "../../Core/primitive";
import { BaseCollapsibleProps, BaseCollapsibleEmits } from "./types";

import { ref, watch } from "vue";

function useLocalVModel(
  propName: string,
  emit: any,
  options: { defaultValue: any; passive: boolean }
) {
  const localValue = ref(options.defaultValue);

  watch(
    () => (props as any)[propName],
    (newVal) => {
      localValue.value = newVal;
    },
    { immediate: true }
  );

  if (!options.passive) {
    watch(localValue, (newVal) => {
      emit(`update:${propName}`, newVal);
    });
  }

  return localValue;
}

const props = defineProps<BaseCollapsibleProps>();
const emit = defineEmits<BaseCollapsibleEmits>();

const open = useLocalVModel("open", emit, {
  defaultValue: props.defaultOpen,
  passive: true,
});

const disabled = useLocalVModel("disabled", emit, {
  defaultValue: props.disabled,
  passive: false,
});

provide(COLLAPSIBLE_INJECTION_KEY, {
  contentId: useId(),
  disabled,
  open,
  onOpenToggle: () => {
    open.value = !open.value;
  },
});

defineExpose({ open });
</script>

<template>
  <Primitive
    :as="as"
    :as-child="props.asChild"
    :data-state="props.open ? 'open' : 'closed'"
    :data-disabled="props.disabled ? '' : undefined"
  >
    <slot :open="open" />
  </Primitive>
</template>
