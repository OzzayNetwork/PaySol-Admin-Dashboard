<template>
  <!-- Unsaved Changes Confirmation Modal -->
  <div
    class="modal fade text-dark"
    :id="modalId"
    tabindex="-1"
    :aria-labelledby="`${modalId}Label`"
    aria-hidden="true"
    ref="unsavedModal"
    style="z-index: 1000000;"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">

        <!-- Header -->
        <div class="modal-header border-0 p-4 pb-2">
          <h5 class="modal-title fw-bold text-black fs-4 mb-1" :id="`${modalId}Label`">
            {{ title }}
          </h5>
          <button
            type="button"
            class="btn-close fs-5"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handleCancel"
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
            {{ stayText }}
          </button>

          <button
            type="button"
            class="btn btn-primary fw-semibold btn-lg"
            @click="handleConfirm"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ leaveText }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, defineEmits, defineProps, defineExpose } from "vue";

const props = defineProps({
  modalId: { type: String, default: "unsavedChangesModal" },
  title: { type: String, default: "Leave page?" },
  message: {
    type: String,
    default: "You have unsaved changes. Do you want to leave without saving?"
  },
  stayText: { type: String, default: "Stay on Page" },
  leaveText: { type: String, default: "Leave Page" },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(["confirm", "cancel", "opened", "closed"]);

const unsavedModal = ref(null);


function open() {
  if (!unsavedModal.value) return;
  // Use static backdrop so user must choose
  const modal = bootstrap.Modal.getOrCreateInstance(unsavedModal.value, {
    backdrop: "static",
    keyboard: false
  });
  modal.show();
  emit("opened");
}

function close() {
  if (!unsavedModal.value) return;
  const modal = bootstrap.Modal.getInstance(unsavedModal.value);
  modal?.hide();
  emit("closed");
}

const handleConfirm = () => {
  // Parent will proceed with navigation
  emit("confirm");
  close();
};

const handleCancel = () => {
  emit("cancel");
  // No need to close because data-bs-dismiss handles it,
  // but keep close() for programmatic usage too.
};

onMounted(() => {
  if (!unsavedModal.value) return;

  const modalElement = unsavedModal.value;

  const onHidden = () => emit("closed");
  modalElement.addEventListener("hidden.bs.modal", onHidden);

  onBeforeUnmount(() => {
    modalElement.removeEventListener("hidden.bs.modal", onHidden);
  });
});

defineExpose({ open, close });
</script>

<style scoped>
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