<!-- <script setup lang="ts">
import { inject } from "vue";

const isOpen = inject("isOpen");
</script>

<template>
  <div>
    <slot v-if="isOpen"></slot>
  </div>
</template> -->

<template>
  <div v-if="isOpen">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";

const isOpen = inject<Ref<boolean>>("isOpen")!;
</script>
