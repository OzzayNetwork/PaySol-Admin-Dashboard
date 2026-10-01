<template>
  
  <div class="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center error-page-container error-page-new-2">
    <div>
        <div class="text-center p-5 glass-card">
            <h1 class="error-title display-1 fw-bolder text-white position-relative mt-0 d-none">404</h1>
            <div class="pb-5">
                <img
                src="../../assets/images/modern-bg/403.svg"
                alt="Logo" 
                height="40px"
                class="img-fluid  mt-4"
                style="height: 240px;"
              />

               <div class="frost-overlay d-none"></div>
            </div>
            <div>
                <h2 class="text-uppercase text-white mb-4 fw-bolder display-6 position-relative">
                Access Denied
                </h2>
                
            </div>
            <p class="text-white mb-5  position-relative">
              You do not have permission to access this page. It might have been moved, deleted, or you might not have the necessary rights.
              <br>
              <br>
              If you believe this is an error, please contact the site administrator.
            </p>

             <div class="d-flex justify-content-center align-items-center gap-2 mt-3">
            <a href="/" class="btn btn-dark text-white waves-effect"> 🏠 Go To Home </a>
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
                class="img-fluid opacity-25 mt-4"
                style="height: 40px;"
              />
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
.error-page-new-2{
    background-color:#03a9f4;
    color: #333;
    text-align: center;
    background-image: url('../../assets/images/modern-bg/waves.png');
     background-image: url('../../assets/images/modern-bg/lockDenied.jpg');
      /* background-image: url('../../assets/images/modern-bg/house.png'); */
    /* background-attachment: ; */
    background-position: to;
    background-repeat: no-repeat;
    background-size: cover;
}

.glass-card{
    background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(20px);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 40px 30px 30px;
            width: 100%;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
            transition: all 0.3s ease;
            animation: cardFloat 6s ease-in-out infinite;
}

.frost-wrap{
      display:inline-block;
      position:relative;
      background:transparent;
      /* adjust size */
      width: 300px;
      height: 300px;
    }

    .frost-wrap img{
      width:100%;
      height:100%;
      object-fit:contain;
      filter: grayscale(0.9) contrast(1.05) saturate(0.1) brightness(1.15);
      mix-blend-mode: screen; /* helps "whiten" darker logos */
      display:block;
    }

    /* Frost overlay */
    .frost-overlay{
      position:absolute;
      inset:0;
      pointer-events:none;
      backdrop-filter: blur(6px) saturate(0.6); /* soft blur of background */
      background: linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0.25));
      border-radius:6px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.08);
      mix-blend-mode: lighten;
    }

    /* subtle grain using pseudo element */
    .frost-overlay::after{
      content:"";
      position:absolute;
      inset:0;
      background-image: radial-gradient(circle at 20% 10%, rgba(255,255,255,0.06) 0 1px, transparent 1px),
                        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.025) 0 1px, transparent 1px);
      opacity:0.6;
      mix-blend-mode: overlay;
      transform: scale(2);
      filter: blur(0.6px);
    }
</style>