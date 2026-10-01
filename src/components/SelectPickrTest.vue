<template>
  <div>
    <button type="button" class="btn btn-primary d-none" id="liveToastBtn">
      Show live toast
    </button>

    <div
      class="position-fixed top-0 start-50 translate-middle-x p-3"
      style="z-index: 1005"
    >
      <div
        id="liveToast"
        class="toast bg-black text-white fade custom-slide bg-opacity-75"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-body">
          <div class="d-flex">
            <div class="toast-body pb-0 pt-0 pl-0">
              <div class="d-flex align-items-center justify-content-center">
                <div class="avatar-xs me-3">
                  <span v-if="toastType === 'success'" class="avatar-title rounded-circle bg-success text-white font-size-18">
                    <i class="bx bx-check"></i>
                  </span>

                  <span  v-else-if="toastType === 'danger'" class="avatar-title rounded-circle bg-danger text-white font-size-18">
                    <i class="bx bx-x"></i>
                  </span>

                  <span v-else-if="toastType === 'warning'" class="avatar-title rounded-circle bg-warning text-white font-size-18">
                    <i class="bx bx-error"></i>
                  </span>

                  <span v-else  class="avatar-title rounded-circle bg-info text-white font-size-18">
                    <i class="mdi mdi-information-variant"></i>
                  </span>
                </div>
                <span>{{toastMessage}}</span>
              </div>
            </div>

            <button
              type="button"
              class="btn-close btn-close-white me-1 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
window.bootstrap =
  window.bootstrap || window.bootstrap || window.Bootstrap || {};
export default {
  name: "SignalToast",
  props: {
    toastType: {
      type: String,
      default: "info", // info, success, warning, danger
    },
    toastMessage: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const btn = document.getElementById("liveToastBtn");
    const toastEl = document.getElementById("liveToast");

    const waitForBootstrap = () => {
      if (window.bootstrap?.Toast) {
        const toast = new window.bootstrap.Toast(toastEl);
        btn.addEventListener("click", () => {
          toast.show();
        });
      } else {
        // Retry after a short delay
        setTimeout(waitForBootstrap, 100);
      }
    };

    waitForBootstrap();
  },
};
</script>
<style scoped>
.toast.custom-slide {
  border-radius: 70px;
  overflow: hidden;
  transform-origin: left center; /* 🔥 Expand from icon */
}

@keyframes slideDownFade {
  0% {
    transform: translateY(-100px) scaleX(0.2) scaleY(0.2);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scaleX(1) scaleY(1);
    opacity: 1;
  }
}

.toast.custom-slide.show {
  animation: slideDownFade 0.45s ease-out forwards;
}
</style>
