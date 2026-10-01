<template>
  <!-- Modal -->
  <div
    class="modal fade text-dark"
    id="addCategoryModal"
    tabindex="-1"
    aria-labelledby="addCategoryModalLabel"
    aria-hidden="true"
    ref="addCategoryModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title" id="addCategoryModalLabel">🗂️ Add New Category</h5>
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
              <label for="categoryName" class="form-label">Category Name</label>
              <input
                type="text"
                id="categoryName"
                class="form-control"
                placeholder="Enter category name"
                ref="categoryNameInput"
              />
            </div>

            <div class="mb-3">
              <label for="categoryDescription" class="form-label">Description</label>
              <textarea
                id="categoryDescription"
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
            Save Category
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const addCategoryModal = ref(null);
const categoryNameInput = ref(null);

onMounted(() => {
  if (addCategoryModal.value) {
    const modalElement = addCategoryModal.value;

    const onShown = () => {
      categoryNameInput.value?.focus();
    };

    modalElement.addEventListener("shown.bs.modal", onShown);

    onBeforeUnmount(() => {
      modalElement.removeEventListener("shown.bs.modal", onShown);
    });
  }
});
</script>
