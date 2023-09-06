import { ref, Ref } from "vue";

// Καθολικό κατάστημα κατάστασης
const globalState: { count: Ref<number> } = {
  count: ref(0),
};

export function useGlobalState() {
  // Επιστρέφει το καθολικό κατάστημα κατάστασης
  return globalState;
}

export function useId(deterministicId?: string): string {
  const { count } = useGlobalState();

  if (!deterministicId) {
    count.value++;
  }

  return deterministicId || `radix-${count.value}`;
}
