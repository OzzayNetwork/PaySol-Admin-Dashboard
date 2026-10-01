<template>
  <div
    class="error-page-container position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white"
  >
    <div class="">
      <div class="">
        <div class="text-center">
          <h1 class="display-1 fw-bold text-black d-none">404</h1>
          <div class="error-image-container">
            <div class="">
              <img
                src="../../assets/images/dribbble_1.gif"
                alt="404 Error"
                class="img-fluid"
              />
            </div>
          </div>
          <h1 class="error-title display-1 fw-bolder text-black position-relative">Uh oh!</h1>
          <h2 class="text-uppercase text-black mb-4 fw-bolder display-6 position-relative">
            No Internet Connection
          </h2>
          <p class="text-muted mb-4 fs-5 position-relative">
            Slow or no Internet Connection. Please Check your Internet settings.
          </p>
          <p class="text-muted mb-4 fs-6 position-relative">
            Double-check the URL or head back home. We'll help you get back on
            track!
          </p>

         <div class="d-flex justify-content-center align-items-center gap-2 mt-3">
            <a href="/" class="btn btn-primary waves-effect"> 🏠 Go To Home </a>
            <button type="button" class="btn btn-light waves-effect" onclick="history.back();">
              🔙 Go Back
            </button>
          </div>

          <div class="d-flex justify-content-center align-items-center gap-2 mt-3">
            <div>
              <img
                src="../../assets/images/logo-dark.png"
                alt="Logo" 
                height="40px"
                class="img-fluid opacity-50 mt-4"
                style="height: 40px;"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOnline = ref(navigator.onLine)

const updateStatus = () => {
  isOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', updateStatus)
  window.addEventListener('offline', updateStatus)
})

onBeforeUnmount(() => {
  window.removeEventListener('online', updateStatus)
  window.removeEventListener('offline', updateStatus)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.offline-container{
  z-index: 100000;
}
</style>
