<template>
  <!-- Modal -->
  <div
    class="modal fade text-dark"
    id="addTagModal"
    tabindex="-1"
    aria-labelledby="addTagModalLabel"
    aria-hidden="true"
    ref="addTagModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title" id="addTagModalLabel">🏷️ Add New Tag</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="tagName" class="form-label">Tag Name</label>
              <input
                type="text"
                id="tagName"
                class="form-control"
                placeholder="Enter tag name"
                ref="tagNameInput"
              />
            </div>

            <div class="mb-3">
              <label for="tagDescription" class="form-label">Description</label>
              <textarea
                id="tagDescription"
                class="form-control"
                placeholder="Write a short tag description..."
                rows="3"
              ></textarea>
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            Cancel
          </button>
          <button type="button" class="btn btn-primary">
            Save Tag
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const addTagModal = ref(null);
const tagNameInput = ref(null);

onMounted(() => {
  if (addTagModal.value) {
    const modalElement = addTagModal.value;

    const onShown = () => {
      tagNameInput.value?.focus();
    };

    modalElement.addEventListener("shown.bs.modal", onShown);

    onBeforeUnmount(() => {
      modalElement.removeEventListener("shown.bs.modal", onShown);
    });
  }
});
</script>
