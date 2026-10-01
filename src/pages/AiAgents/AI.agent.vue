<template>
    <div class="row">
        <div class="col-12">

            <div class="offcanvas offcanvas-end " tabindex="-1" id="offCanvasKplc"
                aria-labelledby="offcanvasRightLabel">
                <div class="offcanvas-header border-bottom py-0  pr-0">
                    <div class="d-flex align-items-center gap-2">
                        <span class="text-muted">
                            <button type="button" title="close Partnership details waves-effect"
                                class="btn btn-white position-relative p-0 avatar-sm rounded-circle"
                                data-bs-dismiss="offcanvas" aria-label="Close">
                                <span class="avatar-title bg-transparent text-reset">
                                    <i class="bx bx-arrow-back font-size-22"></i>
                                </span>
                            </button>
                        </span>
                        <h5 id="offcanvasRightLabel" class="mb-0">KPLC AI Agent</h5>
                    </div>

                    <div>
                        <div class="d-flex header-action-btn">


                            <!-- Customize Icon -->
                            <div class="d-inline-block d-lg-inline-block ms-1" title="Edit Partnership">
                                <button type="button" class="btn header-item noti-icon waves-effect">
                                    <i class="bx bx bx-edit-alt"></i>
                                </button>
                            </div>

                            <!-- Customize Icon -->
                            <div class="d-inline-block d-lg-inline-block ms-1" title="Change Logo">
                                <button type="button" class="btn header-item noti-icon waves-effect">
                                    <i class="bx bx bx-camera"></i>
                                </button>
                            </div>

                        </div>

                    </div>


                </div>

                <div class="offcanvas-body p-0">
                   <div class="p-3 text-center">
                    <p>Welcome to Kplc AI Agent</p>
                   </div>

                   <div class="ai-loader p-3 d-flex d-none align-items-center justify-content-center text-center flex-column">
                        <img src="../../assets/images/icons/cloud_loader.svg" class="ai-loader-icon" alt="AI Loader" />
                        <span class="ai-loader-text mb-4 text fs-5 mt-4">Please Wait as we Prepare your<br/> AI Agent</span>

                        
                    </div>


                    <div class="p-3 d-flex d-non align-items-center justify-content-center text-center flex-column">
                        <img src="../../assets/images/icons/light_loader.svg" class="" alt="AI Loader" />
                        <span class="ai-loader-text mb-4 text fs-5 mt-4">Please Wait as we Prepare your<br/> AI Agent</span>

                        
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'


// Define component name and meta
defineOptions({
    name: "KPLC-Agent",
    meta: { title: 'KPLC AI Agent | CS Payments Dashboard' }
})

let previousTitle = document.title // store whatever the parent page had

onMounted(() => {
    const offcanvasEl = document.getElementById('offCanvasKplc')

    if (offcanvasEl) {
        // When sidebar opens → update title
        offcanvasEl.addEventListener('shown.bs.offcanvas', () => {
            previousTitle = document.title
            document.title = 'KPLC AI Agent | CS Payments Dashboard'
        })

        // When sidebar closes → restore title
        offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
            document.title = previousTitle
        })
    }
})

// Clean up events if component is unmounted
onBeforeUnmount(() => {
    const offcanvasEl = document.getElementById('offCanvasKplc')
    if (offcanvasEl) {
        offcanvasEl.removeEventListener('shown.bs.offcanvas', () => { })
        offcanvasEl.removeEventListener('hidden.bs.offcanvas', () => { })
    }
})
</script>
<style scoped>
.ai-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem; /* spacing between icon and text */
}

.ai-loader-icon {
  width: 160px;   /* adjust as needed */
  height: 160px;
  animation: pulse 3s infinite ease-in-out; /* slower + calmer pulse */
}

.ai-loader-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: grey; /* Bootstrap primary blue */
  animation: textFade 3s infinite ease-in-out;
}

/* Pulse animation for the icon */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2); /* scaled up slightly more */
    opacity: 0.9;
  }
}

/* Fading glowing effect for text */
@keyframes textFade {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}


</style>