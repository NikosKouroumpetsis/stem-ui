<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mb-24 flex justify-center">Δοκιμή components</div>
    <div class="">
      <BaseBadge to="/nick"> nick </BaseBadge>
    </div>
    <div class="my-4">Δεύτερο αρχείο</div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import BaseBadge from "../packages/Base/BaseBadge/BaseBadge.vue";
</script>
