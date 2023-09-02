<template>
  <div>
    <div>prwto</div>
    <Accordion :allCanOpen="true">
      <AccordionItem :id="'1'">
        <AccordionTrigger>πάτα εδώ</AccordionTrigger>
        <AccordionContent>Όλο το περιεχόμενο</AccordionContent>
      </AccordionItem>
      <AccordionItem :id="'2'">
        <AccordionTrigger>πάτα εδώ 2</AccordionTrigger>
        <AccordionContent>Όλο το περιεχόμενο 2</AccordionContent>
      </AccordionItem>
      <AccordionItem :id="'3'">
        <AccordionTrigger>πάτα εδώ 3</AccordionTrigger>
        <AccordionContent>Όλο το περιεχόμενο 3</AccordionContent>
      </AccordionItem>
    </Accordion>
    <div class="my-4">deytero</div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../packages/Base/BaseAccordion";
</script>
