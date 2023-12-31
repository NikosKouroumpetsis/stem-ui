<script lang="ts">
interface RovingContextValue {
  orientation: Ref<Orientation>;
  dir: Ref<Direction>;
  loop: Ref<boolean>;
  currentTabStopId: Ref<string | null | undefined>;
  onItemFocus(tabStopId: string): void;
  onItemShiftTab(): void;
  onFocusableItemAdd(): void;
  onFocusableItemRemove(): void;
}

export const ROVING_FOCUS_INJECTION_KEY =
  Symbol() as InjectionKey<RovingContextValue>;
</script>

<script setup lang="ts">
import { type InjectionKey } from "vue";
import { Ref, ref, watchEffect, provide, toRefs } from "vue";
import { Direction, ENTRY_FOCUS, EVENT_OPTIONS, Orientation } from "./utils";
import { focusFirst } from "./utils";
import { useCollection } from "../../Core/shared";
import { Primitive, usePrimitiveElement } from "../../Core/primitive";
import { BaseRovingFocusGroupProps, BaseRovingFocusGroupEmits } from "./types";

const props = withDefaults(defineProps<BaseRovingFocusGroupProps>(), {
  loop: false,
  dir: "ltr",
  orientation: "horizontal",
});
const emits = defineEmits<BaseRovingFocusGroupEmits>();
const { loop, orientation, dir } = toRefs(props);

const currentTabStopId = ref(props.currentTabStopId);

watchEffect(() => {
  currentTabStopId.value = props.currentTabStopId;
});

const isTabbingBackOut = ref(false);
const isClickFocus = ref(false);
const focusableItemsCount = ref(0);

const { primitiveElement, currentElement } = usePrimitiveElement();
const { createCollection } = useCollection("rovingFocus");
const collections = createCollection(currentElement);

function handleFocus(event: FocusEvent) {
  // We normally wouldn't need this check, because we already check
  // that the focus is on the current target and not bubbling to it.
  // We do this because Safari doesn't focus buttons when clicked, and
  // instead, the wrapper will get focused and not through a bubbling event.
  const isKeyboardFocus = !isClickFocus.value;

  if (
    event.currentTarget &&
    event.target === event.currentTarget &&
    isKeyboardFocus &&
    !isTabbingBackOut.value
  ) {
    const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
    event.currentTarget.dispatchEvent(entryFocusEvent);
    emits("entryFocus", entryFocusEvent);

    if (!entryFocusEvent.defaultPrevented) {
      const items = collections.value;
      const activeItem = items.find(
        (item) => item.getAttribute("data-active") === "true"
      );
      const currentItem = items.find(
        (item) => item.id === currentTabStopId.value
      );
      const candidateItems = [activeItem, currentItem, ...items].filter(
        Boolean
      ) as typeof items;
      focusFirst(candidateItems);
    }
  }

  isClickFocus.value = false;
}

provide(ROVING_FOCUS_INJECTION_KEY, {
  loop,
  dir,
  orientation,
  currentTabStopId,
  onItemFocus: (tabStopId) => {
    currentTabStopId.value = tabStopId;
  },
  onItemShiftTab: () => {
    isTabbingBackOut.value = true;
  },
  onFocusableItemAdd: () => {
    focusableItemsCount.value++;
  },
  onFocusableItemRemove: () => {
    focusableItemsCount.value--;
  },
});
</script>

<template>
  <Primitive
    ref="primitiveElement"
    :tabindex="isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0"
    :data-orientation="orientation"
    :as="as"
    :as-child="asChild"
    style="outline: none"
    @mousedown="isClickFocus = true"
    @focus="handleFocus"
    @blur="isTabbingBackOut = false"
  >
    <slot />
  </Primitive>
</template>
