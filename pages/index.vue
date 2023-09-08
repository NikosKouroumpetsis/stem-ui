<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mb-12 flex justify-center">Δοκιμή components</div>
  </div>
</template>

<script setup lang="ts">
const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

watchEffect(() => {
  console.log();
});
</script>

<style></style>
