<template>
  <!-- Modal -->
  <div
    class="modal fade text-dark"
    id="addAlbumModal"
    tabindex="-1"
    aria-labelledby="addAlbumModalLabel"
    aria-hidden="true"
    ref="addAlbumModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title" id="addAlbumModalLabel">🖼️ Add New Album</h5>
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
              <label for="albumName" class="form-label">Album Name</label>
              <input
                type="text"
                id="albumName"
                class="form-control"
                placeholder="Enter album name"
                ref="albumNameInput"
              />
            </div>

            <div class="mb-3">
              <label for="albumDescription" class="form-label">Description</label>
              <textarea
                id="albumDescription"
                class="form-control"
                placeholder="Write a short description..."
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
            Save Album
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const addAlbumModal = ref(null);
const albumNameInput = ref(null);

onMounted(() => {
  if (addAlbumModal.value) {
    const modalElement = addAlbumModal.value;
    const onShown = () => {
      albumNameInput.value?.focus();
    };

    // Listen for Bootstrap modal "shown" event
    modalElement.addEventListener("shown.bs.modal", onShown);

    onBeforeUnmount(() => {
      modalElement.removeEventListener("shown.bs.modal", onShown);
    });
  }
});
</script>
