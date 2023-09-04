<script setup lang="ts">
const handleSrcExists = inject("handleSrcExists") as (exists: boolean) => void;
const handleImageState = inject("handleImageState") as (
  state: "idle" | "loading" | "loaded" | "error"
) => void;
const showFallback = inject("showFallback") as Ref<boolean>;
const delayExpired = inject("delayExpired") as Ref<boolean>;

interface Props {
  src?: string;
  alt?: string;
}

const props = defineProps<Props>();

handleSrcExists(!!props.src);

onMounted(() => {
  const img = new Image();
  if (props.src) {
    handleImageState("loading");
    img.src = props.src;
    img.onload = () => {
      handleImageState("loaded");
      if (delayExpired.value) {
        showFallback.value = false;
      }
    };
    img.onerror = () => {
      handleImageState("error");
    };
  }
});
const showImage = inject("showImage") as Ref<boolean>; // Προσθήκη εδώ
</script>

<template>
  <img :src="props.src" :alt="props.alt" v-if="props.src && showImage" />
  <!-- Αλλαγή εδώ -->
</template>
