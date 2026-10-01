<template>
  <!-- Delete Image Modal -->
  <div
    class="modal fade text-dark"
    id="deleteImageModal"
    tabindex="-1"
    aria-labelledby="deleteImageModalLabel"
    aria-hidden="true"
    ref="deleteImageModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">
        <!-- Header -->
        <div class="modal-header border-0 p-4">
          <h5 class="modal-title fw-bold text-black" id="deleteImageModalLabel">
            🗑️ Delete Image
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
              src="../../assets/images/portfolio/project-3.jpg"
              class="img rounded shadow-sm"
              alt="Preview"
              style="width:100px;"
            />
            <div>
              <h5 class="mt-2 text-dark mb-1">Image Title</h5>
              <p class="text-muted small mb-0">This image will be moved to Trash for 90 days.</p>
            </div>
          </div>

          <div class="alert alert-danger d-flex align-items-center gap-2 mb-3" role="alert">
            <i class="mdi mdi-delete-alert-outline fs-4"></i>
            <span>
              Are you sure you want to delete this image?  
              It will remain in the Trash for <strong>90 days</strong> before being permanently removed.
            </span>
          </div>

          <div class="mb-3">
            <label for="deleteReason" class="form-label fw-semibold">
              Reason for Deletion (optional)
            </label>
            <textarea
              id="deleteReason"
              class="form-control"
              rows="2"
              placeholder="e.g., Duplicate, irrelevant, or low quality..."
              v-model="deleteReason"
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
            class="btn btn-danger fw-semibold"
            @click="deleteImage"
          >
            Move to Trash
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const deleteImageModal = ref(null);
const deleteReason = ref("");

onMounted(() => {
  if (deleteImageModal.value) {
    const modalElement = deleteImageModal.value;

    const onShown = () => {
      // Autofocus textarea when modal opens
      const textarea = modalElement.querySelector("#deleteReason");
      textarea?.focus();
    };

    modalElement.addEventListener("shown.bs.modal", onShown);

    onBeforeUnmount(() => {
      modalElement.removeEventListener("shown.bs.modal", onShown);
    });
  }
});

const deleteImage = () => {
  console.log("Image moved to Trash with reason:", deleteReason.value || "No reason provided");

  // Simulate move to trash (90-day retention)
  const modal = bootstrap.Modal.getInstance(deleteImageModal.value);
  modal.hide();

  // Optional: show toast or trigger refresh
  // e.g., showToast("Image moved to Trash for 90 days");
};
</script>
