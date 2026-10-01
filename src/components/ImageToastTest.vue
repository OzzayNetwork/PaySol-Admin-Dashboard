<template>
  <div>
    <h1>Image toast starts here</h1>

    <button 
      type="button" 
      class="btn btn-primary" 
      @click="startToastFlow"
    >
      Show live toast
    </button>

    <!-- ================= LOADING TOAST ================= -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div 
        class="toast bg-white animate__animated animate__fadeInUp animate__faster" 
        :class="{ show: showLoadingToast }"
        role="alert" aria-live="assertive" aria-atomic="true"
      >
        <div class="toast-body p-3 d-flex align-items-center">
          <div class="me-3">
            <div class="spinner-border text-dark m-1" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div>
            <h6 class="fw-bold text-black fs-5">Processing ...</h6>
            <p class="mb-0 fs-12px">Please wait a moment, the Partner is being added</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ================= RESULTS TOAST ================= -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div 
        class="toast bg-white animate__animated animate__bounceInUp animate__fast" 
        :class="{ show: showResultsToast }"
        role="alert" aria-live="assertive" aria-atomic="true"
        style="width: 500px;"
        @mouseenter="pauseAutoHide"
        @mouseleave="resumeAutoHide"
      >
        <div class="toast-body p-3 d-flex align-items-center">
          <div class="me-3">
            <img class="rounded me-2" alt="Partner Logo" width="140" src="../assets/images/clients/1.png">
          </div>
          <div>
            <div class="d-flex align-items-center justify-content-between mb-3">
              <h6 class="fw-bold text-black fs-5 m-0">New Partner Added Successfully</h6>
              <button type="button" class="btn-close" @click="hideResultsToast"></button>
            </div>
            <p class="fs-12px" >New Partner, Homa Bay County Government has been added to the List of Partners</p>
            <button class="btn btn-dark">View on <span class="text-warning">Website</span></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onBeforeUnmount } from 'vue'

/**
 * Reactive state for controlling toast visibility
 */
const showLoadingToast = ref(false)   // Controls "Loading..." toast
const showResultsToast = ref(false)   // Controls "Results" toast

/**
 * Timeout references
 */
let toastTimer = null        // For switching from loading → results
let autoHideTimer = null     // For auto-hiding results toast
const AUTO_HIDE_DELAY = 5000 // 5 seconds

/**
 * Starts the toast flow:
 * 1. Show "Loading" toast
 * 2. After 3s, hide it
 * 3. Show "Results" toast
 * 4. Auto-hide results after 5s
 */
const startToastFlow = () => {
  // Reset states
  showLoadingToast.value = true
  showResultsToast.value = false

  // Clear any existing timers
  clearTimers()

  // Switch loading → results
  toastTimer = setTimeout(() => {
    showLoadingToast.value = false
    showResultsToast.value = true

    startAutoHideTimer()
  }, 3000)
}

/**
 * Starts the auto-hide timer for results toast
 */
const startAutoHideTimer = () => {
  autoHideTimer = setTimeout(() => {
    showResultsToast.value = false
  }, AUTO_HIDE_DELAY)
}

/**
 * Pauses the auto-hide timer when hovering
 */
const pauseAutoHide = () => {
  if (autoHideTimer) {
    clearTimeout(autoHideTimer)
    autoHideTimer = null
  }
}

/**
 * Resumes auto-hide when mouse leaves
 */
const resumeAutoHide = () => {
  if (showResultsToast.value) {
    startAutoHideTimer()
  }
}

/**
 * Manually hides results toast
 */
const hideResultsToast = () => {
  showResultsToast.value = false
  pauseAutoHide()
}

/**
 * Clears all timers
 */
const clearTimers = () => {
  if (toastTimer) clearTimeout(toastTimer)
  if (autoHideTimer) clearTimeout(autoHideTimer)
  toastTimer = null
  autoHideTimer = null
}

/**
 * Cleanup on unmount
 */
onBeforeUnmount(() => {
  clearTimers()
})
</script>

