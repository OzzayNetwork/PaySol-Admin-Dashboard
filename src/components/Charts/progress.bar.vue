<template>
  <div class="mb-4">
    <div class="d-flex gap-3 justify-content-between">
      <h5 class="font-size-13">{{ label }}</h5>
      <span class="text-right">{{ value }} <span class="fw-semibold text-info-muted opacity-50 ">({{ percentage }}%)</span></span>
    </div>

    <div class="progress progress-lg rounded-0 ">
      <div
        class="progress-bar rounded-0 bg-primary "
        role="progressbar"
        :style="{ width: percentage + '%' }"
        :aria-valuenow="percentage"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {{ percentage }}%
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: Number,
  percentage: Number
});
</script>
<style scoped>
.progress-bar.bg-warning {
  background-color: #f6c343 !important;
  background: #f6c343 !important;
}  

.progress-bar.bg-danger {
  background-color: #ff5b5b !important;
  background: #ff5b5b !important;
} 

.progress-bar.bg-info {
  background-color: #17a2b8 !important;
  background: #17a2b8 !important;
} 

.progress-bar.bg-primary {
  background-color: #0d6efd !important;
  background: #0d6efd !important;
} 

.progress-bar.bg-black {
  background-color: #000000 !important;
  background: #000000 !important;
} 

.progress-bar.bg-success {
  background-color: #000000 !important;
  background: #000000 !important;
} 

.progress-bar.bg-dark {
  background-color: #2a9c72 !important;
  background: #2a9c72 !important;
} 
</style>
