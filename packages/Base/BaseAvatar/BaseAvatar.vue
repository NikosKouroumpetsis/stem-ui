<script setup lang="ts">
interface Props {
  delayMs?: number;
  immediately?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  delayMs: 600,

  immediately: true,
});

const srcExists = ref(false);
const imageState = ref<"idle" | "loading" | "loaded" | "error">("idle");
const showFallback = ref(true);

const handleSrcExists = (exists: boolean) => {
  srcExists.value = exists;
};

const handleImageState = (state: "idle" | "loading" | "loaded" | "error") => {
  imageState.value = state;
  if (state === "loaded") {
    showFallback.value = false;
  }
};

const delayExpired = ref(false);

const showImage = ref(false); // Προσθήκη αυτής της γραμμής

onMounted(() => {
  if (props.immediately) {
    showFallback.value = false;
  } else if (!props.delayMs) {
    showImage.value = true;
    showFallback.value = false;
  } else {
    setTimeout(() => {
      delayExpired.value = true;
      if (imageState.value === "loaded") {
        showImage.value = true;
        showFallback.value = false;
      }
    }, props.delayMs);
  }
});

watch(imageState, (newState) => {
  if (props.immediately && newState === "loaded") {
    showImage.value = true;
    showFallback.value = false;
  } else if (delayExpired.value && newState === "loaded") {
    showImage.value = true;
    showFallback.value = false;
  }
});
provide("showImage", showImage);
provide("srcExists", srcExists);
provide("imageState", imageState);
provide("handleSrcExists", handleSrcExists);
provide("handleImageState", handleImageState);
provide("showFallback", showFallback);
provide("delayExpired", delayExpired);
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
