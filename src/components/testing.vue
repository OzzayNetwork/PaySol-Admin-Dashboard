<script setup>
import { ref } from "vue"
import VueSelect from "vue3-select-component"

const selected = ref("")

const createBoard = () => {
  // open modal / route / emit event
  console.log("Create board clicked")
}
</script>

<template>
  <div class="card vh-100">
    <div class="card-body p-5">
      <VueSelect
  v-model="selected"
  :options="[
    { label: 'Option #1', value: 'option_1' },
    { label: 'Option #2', value: 'option_2' },
    { label: 'Option #3', value: 'option_3' },
    { label: 'Option #4', value: 'option_4' },
    { label: 'Option #5', value: 'option_5' },
  ]"
>
  <template #menu-header>
    <div class="menu-header waves-effect waves-light cursor-pointer w-100" @click.stop="createBoard">
      <div class="d-flex gap-3 cursor-pointer align-items-center w-100">
        <div class="bg-primary-subtle waves-effect waves-light btn-sm p-1 px-2 rounded">
          <i class="mdi mdi-plus display-6"></i>
        </div>
        <h3 class="text-black mb-0">
          <span>Create Category</span>
        </h3>
      </div>
    </div>
  </template>
</VueSelect>
    </div>
  </div>
</template>
<style scoped>
/* IMPORTANT: reach into VueSelect dropdown */
:deep(.vs__dropdown-menu) {
  display: flex;
  flex-direction: column;
}

/* send header to the bottom */
:deep(.menu-header) {
  order: 999;          /* puts it after options */
  margin-top: auto;    /* pushes it to bottom */
  position: sticky;
  top: 0;
  z-index: 5;
  padding: var(--vs-option-padding);
  background: #fff;
  border-bottom: 1px solid #eee;
}

/* hover */
:deep(.menu-header:hover) {
  background: #bcd7ff;
}

:deep(.menu-header h3) {
  font-size: var(--vs-option-font-size);
  font-weight: var(--bs-body-font-weight);
}
</style>