<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mb-12 flex justify-center">Δοκιμή components</div>
    <div class="flex flex-col gap-2.5">
      <label
        class="flex flex-row gap-4 items-center [&>.checkbox]:hover:bg-neutral-100"
      >
        <BaseCheckbox
          v-model:checked="switchState"
          class="shadow-blackA7 hover:bg-green3 flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-[4px] bg-white shadow-[0_2px_10px] outline-none focus-within:shadow-[0_0_0_2px_black]"
        >
          <BaseCheckboxIndicator
            class="bg-white h-full w-full rounded flex items-center justify-center"
          >
            A
          </BaseCheckboxIndicator>
        </BaseCheckbox>
        <span class="select-none text-white">Accept terms and conditions.</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  BaseCheckbox,
  BaseCheckboxIndicator,
} from "../packages/Base/BaseCheckbox";

const switchState = ref(false);

watchEffect(() => {
  console.log(switchState.value);
});
</script>

<style></style>
