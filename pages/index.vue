<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="mb-24 flex justify-center">Δοκιμή components</div>
    <div class="flex gap-5">
      <BaseAvatar
        class="bg-gray-500 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle"
        :delay-ms="5000"
        :immediately="true"
        as="span"
      >
        <BaseAvatarImage
          class="h-full w-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
        <BaseAvatarFallback
          class="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
          
        >
          JD
        </BaseAvatarFallback>
      </BaseAvatar>
    </div>
    <div class="my-4">Δεύτερο αρχείο</div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import BaseAvatar from "../packages/Base/BaseAvatar/BaseAvatar.vue";
import BaseAvatarImage from "../packages/Base/BaseAvatar/BaseAvatarImage.vue";
import BaseAvatarFallback from "../packages/Base/BaseAvatar/BaseAvatarFallback.vue";
</script>
