<template>
  <div class="skeleton-container">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  gap: {
    type: String,
    default: '16px'
  }
})
</script>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: v-bind(gap);
  width: 100%;
}
</style>