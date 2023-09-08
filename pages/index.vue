<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-cyan-100"
  >
    <div class="mb-12 flex justify-center">Δοκιμή components</div>
    <div class="flex flex-col gap-2.5"></div>
  </div>
</template>

<script setup lang="ts">
import {
  BaseTabsContent,
  BaseTabsList,
  BaseTabs,
  BaseTabsTrigger,
} from "../packages/Base/BaseTabs";

const toggleStateSingle = ref("left");

watchEffect(() => {
  console.log(toggleStateSingle.value);
  console.log();
});
</script>

<style></style>
