<template>
  <!-- Hide Image Modal -->
  <div
    class="modal fade text-dark"
    id="hideImageModal"
    tabindex="-1"
    aria-labelledby="hideImageModalLabel"
    aria-hidden="true"
    ref="hideImageModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">
        <!-- Header -->
        <div class="modal-header border-0 p-4">
          <h5 class="modal-title fw-bold" id="hideImageModalLabel">
            🙈 Hide Image from Website
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body p-4">
          <div class="mb-3 p-3 bg-light rounded d-flex gap-3 align-items-center">
            <img
              src="../../assets/images/portfolio/project-2.jpg"
              class="img rounded shadow-sm"
              alt="Preview"
              style="width:100px;"
            />
            <div>
              <h5 class="mt-2 text-dark mb-1">Image Title</h5>
              <p class="text-muted small mb-0">This image currently appears on the public site.</p>
            </div>
          </div>

          <div class="alert alert-warning d-flex align-items-center gap-2 mb-3" role="alert">
            <i class="mdi mdi-eye-off-outline fs-4"></i>
            <span>
              Once hidden, this image will no longer appear on the public website,
              but it will remain visible internally.
            </span>
          </div>

          <div class="mb-3">
            <label for="hideReason" class="form-label fw-semibold">
              Reason for Hiding (optional)
            </label>
            <textarea
              id="hideReason"
              class="form-control"
              rows="2"
              placeholder="e.g., Low quality, outdated content, or awaiting review..."
              v-model="hideReason"
            ></textarea>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 pt-0 px-3">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-warning fw-semibold text-dark"
            @click="hideImage"
          >
            Hide Image
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const hideImageModal = ref(null);
const hideReason = ref("");

onMounted(() => {
  if (hideImageModal.value) {
    const modalElement = hideImageModal.value;

    const onShown = () => {
      // Autofocus textarea when modal opens
      const textarea = modalElement.querySelector("#hideReason");
      textarea?.focus();
    };

    modalElement.addEventListener("shown.bs.modal", onShown);

    onBeforeUnmount(() => {
      modalElement.removeEventListener("shown.bs.modal", onShown);
    });
  }
});

const hideImage = () => {
  console.log("Image hidden with reason:", hideReason.value || "No reason provided");

  const modal = bootstrap.Modal.getInstance(hideImageModal.value);
  modal.hide();

  // Optionally trigger a success toast or refresh gallery
};
</script>
