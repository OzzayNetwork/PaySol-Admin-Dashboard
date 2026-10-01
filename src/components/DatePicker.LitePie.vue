<template>
  <div>
    <LitepieDatepicker
      ref="myRef"
      v-model="dateValue"
      :formatter="formatter"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import LitepieDatepicker from "litepie-datepicker";
import "litepie-datepicker/dist/index.css";


const myRef = ref(null);

const dateValue = ref([]);

const formatter = {
  date: "DD MMM YYYY",
  month: "MMM",
};
</script>
