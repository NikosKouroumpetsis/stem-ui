<script lang="ts">
interface RadioItemProvideValue {
  disabled: ComputedRef<boolean>;
  checked: ComputedRef<boolean>;
}

export const RADIO_GROUP_ITEM_INJECTION_KEY =
  Symbol() as InjectionKey<RadioItemProvideValue>;

export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import {
  type ComputedRef,
  type InjectionKey,
  computed,
  inject,
  provide,
  ref,
  toRefs,
  onMounted,
  onUnmounted,
} from "vue";
import { RADIO_GROUP_INJECTION_KEY } from "./BaseRadioGroup.vue";
import { usePrimitiveElement } from "../../Core/primitive";
import { BaseRovingFocusItem } from "../BaseRovingFocus";
import BaseRadio from "./BaseRadio.vue";
import { BaseRadioGroupItemProps } from "./types";

const props = withDefaults(defineProps<BaseRadioGroupItemProps>(), {
  disabled: false,
  as: "button",
});
const { value } = toRefs(props);
const { primitiveElement, currentElement } = usePrimitiveElement();

const context = inject(RADIO_GROUP_INJECTION_KEY);

const disabled = computed(() => context?.disabled.value || props.disabled);
const required = computed(() => context?.required.value || props.required);
const checked = computed(() => context?.modelValue?.value === props.value);

provide(RADIO_GROUP_ITEM_INJECTION_KEY, { disabled, checked });

const isArrowKeyPressed = ref(false);
const ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

const handleKeyDown = (event: KeyboardEvent) => {
  if (ARROW_KEYS.includes(event.key)) {
    isArrowKeyPressed.value = true;
  }
};

const handleKeyUp = () => {
  isArrowKeyPressed.value = false;
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
});

function handleFocus() {
  setTimeout(() => {
    /**
     * Our `RovingFocusGroup` will focus the radio when navigating with arrow keys
     * and we need to 'check' it in that case. We click it to 'check' it (instead
     * of updating `context.value`) so that the radio change event fires.
     */
    if (isArrowKeyPressed.value) currentElement.value?.click();
  }, 0);
}
</script>

<template>
  <BaseRovingFocusItem
    :checked="checked"
    :disabled="disabled"
    as-child
    :focusable="!disabled"
    :active="checked"
  >
    <BaseRadio
      ref="primitiveElement"
      v-bind="{ ...$attrs, ...props }"
      :checked="checked"
      @keydown.enter.prevent
      @focus="handleFocus"
    >
      <slot />
    </BaseRadio>

    <input
      v-model="value"
      type="radio"
      aria-hidden="true"
      tabindex="-1"
      :default-value="checked"
      :required="required"
      :checked="checked"
      :disabled="disabled"
      :style="{
        transform: 'translateX(-100%)',
        position: 'absolute',
        pointerEvents: 'none',
        opacity: '0',
        margin: '0px',
        width: '25px',
        height: '25px',
      }"
    />
  </BaseRovingFocusItem>
</template>
