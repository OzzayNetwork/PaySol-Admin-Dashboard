<template>
  <div>
    <!-- ================= LOADING TOAST ================= -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        v-if="status === 'loading'"
        class="toast bg-white animate__animated animate__fadeInUp animate__faster show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-body p-3 d-flex align-items-center">
          <div class="me-3">
            <div class="spinner-border text-dark m-1" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div>
            <h6 class="fw-bold text-black fs-5">{{ title || 'Processing...' }}</h6>
            <p class="mb-0 fs-12px">{{ message || 'Please wait a moment...' }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= RESULTS TOAST ================= -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        v-if="status === 'success' || status === 'error'"
        class="toast bg-white animate__animated animate__bounceInUp animate__fast show"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style="width: 500px;"
        @mouseenter="pauseAutoHide"
        @mouseleave="resumeAutoHide"
      >
        <div class="toast-body p-3 d-flex align-items-center">
          <div class="me-3" v-if="image">
            <img class="rounded me-2" alt="toast image" :height="imageHeight"  :src="image">
          </div>
          <div class="flex-grow-1">
            <div class="d-flex align-items-center justify-content-between mb-3 w-100">
              <h6
                class="fw-bold fs-5 m-0"
                :class="status === 'error' ? 'text-danger' : 'text-black'"
              >
                {{ title }}
              </h6>
              <button type="button" class="btn-close" @click="hideToast"></button>
            </div>
            <p class="fs-12px" v-html="message"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, onBeforeUnmount } from "vue";

const props = defineProps({
  status: { type: String, default: null },
  title: { type: String, default: "" },
  message: { type: String, default: "" },
  image: { type: String, default: null },
  autoHide: { type: Boolean, default: true },
  autoHideDelay: { type: Number, default: 5000 },
  imageHeight: { type: [String, Number], default: 140 }, // 👈 new prop
});

const emit = defineEmits(["hide"]);

let autoHideTimer = null;

watch(
  () => props.status,
  (newStatus) => {
    clearTimer();
    if ((newStatus === "success" || newStatus === "error") && props.autoHide) {
      autoHideTimer = setTimeout(() => emit("hide"), props.autoHideDelay);
    }
  }
);

const pauseAutoHide = () => clearTimer();

const resumeAutoHide = () => {
  if (!autoHideTimer && (props.status === "success" || props.status === "error")) {
    autoHideTimer = setTimeout(() => emit("hide"), props.autoHideDelay);
  }
};

const hideToast = () => {
  clearTimer();
  emit("hide");
};

const clearTimer = () => {
  if (autoHideTimer) clearTimeout(autoHideTimer);
  autoHideTimer = null;
};

onBeforeUnmount(clearTimer);
</script>
