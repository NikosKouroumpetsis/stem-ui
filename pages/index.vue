<template>
  <div
    class="flex flex-col justify-center items-center min-h-screen bg-cyan-100"
  >
    <div class="mb-12 flex justify-center">Δοκιμή components</div>
    <div class="flex flex-col gap-2.5">
      <BaseToggleGroup v-model="toggleStateSingle" class="flex">
        <BaseToggleGroupItem
          value="left"
          aria-label="Toggle italic"
          :class="toggleGroupItemClasses"
        >
          i
        </BaseToggleGroupItem>
        <BaseToggleGroupItem
          value="center"
          aria-label="Toggle italic"
          :class="toggleGroupItemClasses"
        >
          ii
        </BaseToggleGroupItem>
        <BaseToggleGroupItem
          value="right"
          aria-label="Toggle italic"
          :class="toggleGroupItemClasses"
        >
          iii
        </BaseToggleGroupItem>
      </BaseToggleGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BaseToggleGroup,
  BaseToggleGroupItem,
} from "../packages/Base/BaseToggleGroup";

const toggleStateSingle = ref("left");
const toggleStateMultiple = ref(["italic"]);

const toggleGroupItemClasses =
  "hover:bg-green-300 text-cyan-500 data-[state=on]:bg-green-600 data-[state=on]:text-rose-300 flex h-[35px] w-[35px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none";

watchEffect(() => {
  console.log(toggleStateSingle.value);
  console.log(toggleStateMultiple.value);
});
</script>

<style></style>
