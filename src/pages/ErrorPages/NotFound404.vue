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
            404 — Page Not Found
          </h2>
          <p class="text-muted mb-4 fs-5 position-relative">
            The page you're looking for doesn't seem to exist — or maybe it took
            a wrong turn somewhere.
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

<script>
export default {
  name: "notFound",
  meta: { title: '404 — Page Not Found' },
  
  // Option 1: Using mounted lifecycle hook
  mounted() {
    document.title = '404 — Page Not Found';
  },
  
  // Option 2: Using beforeRouteEnter (if using Vue Router)
  beforeRouteEnter(to, from, next) {
    document.title = '404 — Page Not Found';
    next();
  },
  
  // Option 3: Using created lifecycle hook
  created() {
    document.title = '404 — Page Not Found';
  }
};
</script>

<style scoped>
</style>