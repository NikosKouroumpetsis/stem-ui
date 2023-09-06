import {
  InjectionKey,
  Ref,
  inject,
  onBeforeUpdate,
  onMounted,
  onUpdated,
  provide,
  ref,
  watch,
} from "vue";

const ITEM_DATA_ATTR = "data-radix-vue-collection-item";

type ContextValue = Ref<HTMLElement[]>;

export function useCollection(key?: string) {
  const COLLECTION_SYMBOL = key ?? (Symbol() as InjectionKey<ContextValue>);

  const createCollection = (sourceRef?: Ref<HTMLElement | undefined>) => {
    const items = ref<HTMLElement[]>([]);

    function setCollection() {
      const sourceEl = sourceRef?.value; // Using .value directly
      if (!sourceEl) return (items.value = []);

      return (items.value = Array.from(
        sourceEl.querySelectorAll(
          `[${ITEM_DATA_ATTR}]:not([data-disabled=true])`
        )
      ) as HTMLElement[]);
    }

    onBeforeUpdate(() => {
      items.value = [];
    });

    onMounted(setCollection);
    onUpdated(setCollection);

    watch(() => sourceRef?.value, setCollection, { immediate: true });

    provide(COLLECTION_SYMBOL, items);

    return items;
  };

  const injectCollection = () => {
    return inject(COLLECTION_SYMBOL, ref([]));
  };

  return { createCollection, injectCollection };
}
