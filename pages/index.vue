<template>
  <div>
    <div>prwto</div>
    <BaseAccordion :allCanOpen="true">
      <BaseAccordionItem :id="'1'">
        <BaseAccordionTrigger>πάτα εδώ</BaseAccordionTrigger>
        <BaseAccordionContent>Όλο το περιεχόμενο</BaseAccordionContent>
      </BaseAccordionItem>
      <BaseAccordionItem :id="'2'">
        <BaseAccordionTrigger>πάτα εδώ 2</BaseAccordionTrigger>
        <BaseAccordionContent>Όλο το περιεχόμενο 2</BaseAccordionContent>
      </BaseAccordionItem>
      <BaseAccordionItem :id="'3'">
        <BaseAccordionTrigger>πάτα εδώ 3</BaseAccordionTrigger>
        <BaseAccordionContent>Όλο το περιεχόμενο 3</BaseAccordionContent>
      </BaseAccordionItem>
    </BaseAccordion>
    <div class="my-4">deytero</div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import {
  BaseAccordion,
  BaseAccordionItem,
  BaseAccordionTrigger,
  BaseAccordionContent,
} from "../packages/Base/BaseAccordion";
</script>
