<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mb-12 flex justify-center">Δοκιμή components</div>
    <BaseSlider
      v-model="sliderValue"
      class="relative flex items-center select-none touch-none w-[200px] h-5"
      :max="100"
      :step="1"
    >
      <BaseSliderTrack class="bg-black relative grow rounded-full h-[3px]">
        <BaseSliderRange class="absolute bg-white rounded-full h-full" />
      </BaseSliderTrack>
      <BaseSliderThumb
        class="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA7 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA8"
        aria-label="Volume"
      />
    </BaseSlider>
  </div>
</template>

<script setup lang="ts">
import {
  BaseSlider,
  BaseSliderTrack,
  BaseSliderRange,
  BaseSliderThumb,
} from "~/packages/Base/BaseSlider";

const toggleState = ref(false);
const sliderValue = ref([50]);
watchEffect(() => {
  console.log(toggleState.value);
});
</script>
