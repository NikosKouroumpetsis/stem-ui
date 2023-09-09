<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-cyan-100"
  >
    <div class="mb-12 flex justify-center">Δοκιμή components</div>
    <div class="flex flex-col gap-2.5">
      <BaseHoverCard>
        <BaseHoverCardTrigger> δες εδω </BaseHoverCardTrigger>
        <BaseHoverCardContent> μπλα μπλα μπλα μπλα μπλα </BaseHoverCardContent>
      </BaseHoverCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseHoverCard from "../packages/Base/BaseHoverCard/BaseHoverCard.vue";
import BaseHoverCardTrigger from "../packages/Base/BaseHoverCard/BaseHoverCardTrigger.vue";
import BaseHoverCardContent from "../packages/Base/BaseHoverCard/BaseHoverCardContent.vue";

watchEffect(() => {
  console.log();
  console.log();
});
</script>

<style></style>
