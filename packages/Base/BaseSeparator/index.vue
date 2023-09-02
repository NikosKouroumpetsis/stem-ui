<template>
  <!-- Χρησιμοποιούμε την computed property separatorClass για να ορίσουμε την κλάση CSS -->
  <!-- Επίσης, περνάμε τις semanticProps ως attributes στο div -->
  <div :class="separatorClass" v-bind="semanticProps"></div>
</template>

<script setup lang="ts">
// Καθορίζουμε τις δυνατές τιμές για τον προσανατολισμό
type DataOrientation = "horizontal" | "vertical";

// Καθορίζουμε τα props που θα δέχεται το component
interface Props {
  orientation: DataOrientation;
  decorative: boolean;
}

// Ορίζουμε τις δυνατές τιμές για τον προσανατολισμό
const ORIENTATIONS: ReadonlyArray<DataOrientation> = ["horizontal", "vertical"];

// Συνάρτηση για τον έλεγχο της εγκυρότητας του προσανατολισμού
function isValidOrientation(orientation: any): orientation is DataOrientation {
  return ORIENTATIONS.includes(orientation);
}

// Ορίζουμε τα props και δίνουμε default τιμές
const props = withDefaults(defineProps<Props>(), {
  orientation: "horizontal",
  decorative: false,
});

// Υπολογίζουμε τον προσανατολισμό με βάση τα props
const computedOrientation = computed(() => {
  return isValidOrientation(props.orientation)
    ? props.orientation
    : "horizontal";
});

// Υπολογίζουμε το aria-orientation ανάλογα με τον προσανατολισμό
const ariaOrientation = computed(() => {
  return computedOrientation.value === "vertical" ? "vertical" : undefined;
});

// Υπολογίζουμε τις "σημασιολογικές" ιδιότητες του component
const semanticProps = computed(() => {
  return props.decorative
    ? { role: "none" }
    : { "aria-orientation": ariaOrientation.value, role: "separator" };
});

// Υπολογίζουμε την κλάση CSS ανάλογα με τον προσανατολισμό
const separatorClass = computed(() => {
  return computedOrientation.value === "horizontal"
    ? "horizontal-class"
    : "vertical-class";
});
</script>

<style scoped>
.horizontal-class {
  /* Τα styles για τον οριζόντιο προσανατολισμό */
}

.vertical-class {
  /* Τα styles για τον κάθετο προσανατολισμό */
}
</style>
