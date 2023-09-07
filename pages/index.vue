<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mb-12 flex justify-center">Δοκιμή components</div>
    <BaseScrollArea
    class="w-[200px] h-[225px] rounded overflow-hidden shadow-[0_2px_10px] shadow-black bg-white"
    style="--scrollbar-size: 10px"
  >
    <BaseScrollAreaViewport class="w-full h-full rounded">
      <div class="py-[15px] px-5">
        <div class="text-green-500 text-[15px] leading-[18px] font-semibold">
          Tags
        </div>
        <div
          v-for="tag in tags"
          :key="tag"
          class="text-red-500 text-[13px] leading-[18px] mt-2.5 pt-2.5 border-t border-t-red-500"
        >
          {{ tag }}
        </div>
      </div>
    </BaseScrollAreaViewport>
    <BaseScrollAreaScrollbar
      class="flex select-none touch-none p-0.5 bg-black transition-colors duration-[160ms] ease-out hover:bg-black data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <BaseScrollAreaThumb
        class="flex-1 bg-red-500 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
      />
    </BaseScrollAreaScrollbar>

  </BaseScrollArea>
  </div>
</template>

<script setup lang="ts">
import { BaseScrollArea,BaseScrollAreaViewport,BaseScrollAreaScrollbar,BaseScrollAreaThumb } from '../packages/Base/BaseScrollArea';

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

watchEffect(() => {
  console.log();
});
</script>

<style>

.ScrollAreaThumb::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  min-width: 44px;
  min-height: 44px;
}
</style>