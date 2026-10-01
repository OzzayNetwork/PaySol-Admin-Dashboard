<template>
  <!-- Clear Form Confirmation Modal -->
  <div
    class="modal fade text-dark"
    id="clearUploadFormModal"
    tabindex="-1"
    aria-labelledby="clearFormModalLabel"
    aria-hidden="true"
    ref="clearFormModal"
    style="z-index: 1000000;"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">

        <!-- Header -->
        <div class="modal-header border-0 p-4 pb-2">
          <h5 class="modal-title fw-bold text-black fs-4 mb-1" id="clearFormModalLabel">
            {{ title }}
          </h5>
          <button
            type="button"
            class="btn-close fs-5"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body p-4 pt-0">
          <div class="text-left mb-2">
            <p class="mb-0 text-muted" style="font-size: 15px;">
              {{ message }}
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 pt-0 px-3 pb-4 gap-2">
          <button
            type="button"
            class="btn btn-link waves-effect fw-bold btn-lg"
            data-bs-dismiss="modal"
            @click="handleCancel"
            :disabled="loading"
          >
            {{ cancelText }}
          </button>

          <button
            type="button"
            class="btn btn-primary fw-semibold btn-lg"
            @click="handleConfirm"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ confirmText }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits, defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Clear form?"
  },
  message: {
    type: String,
    default: "You haven’t finished filling out this form. Do you want to clear everything and start over?"
  },
  cancelText: {
    type: String,
    default: "Continue Editing"
  },
  confirmText: {
    type: String,
    default: "Clear Form"
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["confirm", "cancel"]);

const clearFormModal = ref(null);

const handleConfirm = () => {
  // Parent will run clearForm()
  emit("confirm");

  // Close modal
  const modal = bootstrap.Modal.getInstance(clearFormModal.value);
  if (modal) modal.hide();
};

const handleCancel = () => {
  emit("cancel");
};

// Modal event handling (keep your style)
onMounted(() => {
  if (!clearFormModal.value) return;

  const modalElement = clearFormModal.value;

  const onHidden = () => {
    // keep hook for future (reset state if you add any)
  };

  modalElement.addEventListener("hidden.bs.modal", onHidden);

  onBeforeUnmount(() => {
    modalElement.removeEventListener("hidden.bs.modal", onHidden);
  });
});
</script>

<style scoped>
/* Keep your animation style */
.modal-content {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>