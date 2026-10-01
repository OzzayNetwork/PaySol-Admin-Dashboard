<script setup>
import { defineProps, defineEmits } from 'vue'
import VueSelect from 'vue3-select-component'

const props = defineProps({
  modelValue: { default: null },
  options: { type: Array, default: () => [] },
  placeholder: { type: String, default: "" },
  isMulti: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  inputClass: { type: String, default: "" },
  className: { type: String, default: "" },
  required: { type: Boolean, default: false },
  isTaggable: { type: Boolean, default: false },

  // ✅ New Props
  showCreate: { type: Boolean, default: false },
  createText: { type: String, default: "Create" },
  createModalId: { type: [String, Number], default: "categoryModal" },
  createBtnTitle: { type: String, default: "Create new item" },

  // New For Images
  imageKey: { type: String, default: "image" },
  showImages: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'create'])

const updateValue = (newValue) => {
  emit('update:modelValue', newValue)
}

const createBoard = () => {
  emit('create', props.createModalId)
}
</script>

<template>
  <VueSelect
  v-model="props.modelValue"
  :options="props.options"
  :placeholder="props.placeholder"
  :is-multi="props.isMulti"
  :is-taggable="props.isTaggable"
  :disabled="props.disabled"
  :input-class="props.inputClass"
  :class="props.className"
  @update:modelValue="updateValue"
>
  <!-- Selected value -->
  <template v-if="props.showImages" #value="{ option }">
    <div class="d-flex align-items-center gap-2">
      <img
        v-if="option?.[props.imageKey]"
        :src="option[props.imageKey]"
        class="select-image"
      />

      <span>{{ option.label }}</span>
    </div>
  </template>

  <!-- Dropdown option -->
  <template v-if="props.showImages" #option="{ option }">
    <div class="d-flex align-items-center gap-2">
      <img
        v-if="option?.[props.imageKey]"
        :src="option[props.imageKey]"
        class="select-image"
      />

      <span>{{ option.label }}</span>
    </div>
  </template>

  <template v-if="props.showCreate" #menu-header>
    <!-- Your existing create button -->
  </template>
</VueSelect>
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

:deep(.menu-header:hover i) {
  color: black;
}

:deep(.menu-header h3) {
  font-size: var(--vs-option-font-size);
  font-weight: var(--bs-body-font-weight);
}

.select-image {
  width: 22px;
  height: 16px;
  object-fit: cover;
  border-radius: 2px;
  flex-shrink: 0;
}
</style>
