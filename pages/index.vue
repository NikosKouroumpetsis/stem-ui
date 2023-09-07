<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mb-12 flex justify-center">Δοκιμή components</div>
    <div class="flex gap-2 items-center">
      <label
        className="text-white text-[15px] leading-none pr-[15px] select-none"
        for="airplane-mode"
      >
        Airplane mode
      </label>
      <BaseSwitch
        id="airplane-mode"
        v-model:checked="switchState"
        class="w-[42px] h-[25px] focus-within:outline focus-within:outline-black flex bg-black/50 shadow-sm rounded-full relative data-[state=checked]:bg-black cursor-default"
      >
        <BaseSwitchThumb
          class="block w-[21px] h-[21px] my-auto bg-white shadow-sm rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]"
        />
      </BaseSwitch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseSwitch, BaseSwitchThumb } from "../packages/Base/BaseSwitch";
const switchState = ref(false);
watchEffect(() => {
  console.log();
});
</script>
