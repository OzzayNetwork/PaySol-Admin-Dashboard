<template>
  <!-- Edit File Name Modal -->
  <div
    class="modal fade text-dark"
    id="editFileModal"
    tabindex="-1"
    aria-labelledby="editFileModalLabel"
    aria-hidden="true"
    ref="editFileModal"
    style="z-index: 1000000;"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">
        <!-- Header -->
        <div class="modal-header border-0 p-4">
          <h5 class="modal-title fw-bold" id="editFileModalLabel">✏️ Rename File</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body p-4">
          <!-- Current File Preview -->
          <div class="mb-4 p-3 bg-light rounded d-flex gap-3 align-items-center">
            <div style="margin-right: 0px;">
              <img
                :src="getFileIcon(fileType)"
                :alt="fileType + ' icon'"
                class="file-icon"
                width="52px"
              />
            </div>
            <div>
              <h6 class="mt-2 text-dark mb-1">
                {{ fileName || 'No file selected' }}
              </h6>
              <p class="text-muted small mb-0 text-capitalize">Current file name</p>
            </div>
          </div>

          <!-- Rename Form -->
          <form @submit="renameFile" id="renameForm">
            <div class="mb-3">
              <label for="fileName" class="form-label fw-semibold">New File Name</label>
              <input
                type="text"
                id="fileName"
                class="form-control"
                placeholder="Enter new file name"
                ref="fileNameInput"
                v-model="newFileName"
                pattern="^[a-zA-Z0-9 _.,()\\-\\[\\]{}@&+!']+$"
                title="Only letters, numbers, spaces, dots, hyphens, and underscores allowed"
                required
              />
              
              <div class="form-text">
                <small class="text-muted">
                  Allowed characters: A-Z, a-z, 0-9, spaces, dots (.), hyphens (-), and underscores (_)
                </small>
              </div>
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 pt-0 px-3">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary fw-semibold"
            form="renameForm"
            :disabled="!newFileName || newFileName === (fileName || '')"
          >
            <span
              v-if="loadingNewName"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-if="loadingNewName">Renaming...</span>
            <span v-else>Rename File</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <ImageToast
    :status="toastStatus"
    :title="toastTitle"
    :message="toastMessage"
    :image="toastImage"
    :imageHeight="70"
    @hide="toastStatus = null"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, defineEmits } from "vue";
import axios from "axios";
//APIs
import documentAPI from "@/api/document"
import { getFileIcon } from "@/utils/fileIcons";
import NProgress from "nprogress";
import ImageToast from "@/components/ImageToast.vue";

import successImage from "../../assets/images/icons/check.png";
import errorImage from "../../assets/images/icons/error.png";

const props = defineProps({
  fileName: String,
  fileId: [String, Number],
  fileType: String
});

const emit = defineEmits(["file-renamed"]);

const editFileModal = ref(null);
const fileNameInput = ref(null);

// ✅ FIX: local state must be synced when props change / when modal opens
const newFileName = ref("");

// loading
const loadingNewName = ref(false);

// toast state
const toastStatus = ref(null); // "loading" | "success" | "error"
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);

// ✅ FIX: keep newFileName in sync with the currently selected file
watch(
  () => props.fileName,
  (name) => {
    newFileName.value = name || "";
  },
  { immediate: true }
);

const renameFile = async (event) => {
  event.preventDefault();

const pattern = /^[a-zA-Z0-9 _.,()\-\\[\\]{}@&+!']+$/;
  // if (!pattern.test(newFileName.value)) {
  //   alert("Invalid file name. Please use only allowed characters.");
  //   return;
  // }

  if (!props.fileId) {
    alert("No file selected.");
    return;
  }

  loadingNewName.value = true;

  try {
    const updatedFileData = await renameFileOnApi(props.fileId, newFileName.value);

    // ✅ hide modal safely
    if (editFileModal.value) {
      const modal = bootstrap.Modal.getInstance(editFileModal.value);
      modal?.hide();
    }

    // Keep input clean AFTER successful rename
    newFileName.value = "";
  } catch (apiError) {
    alert("Failed to rename the file on the server. Please try again.");
  } finally {
    loadingNewName.value = false;
  }
};

const renameFileOnApi = async (fileId, newName) => {
  try {
    NProgress.start();

    toastStatus.value = "loading";
    toastTitle.value = "Renaming File";
    toastMessage.value = "Please wait while we rename the file...";
    toastImage.value = null;

    const response = await fetch(
      `${documentAPI.files()}/${fileId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: newName,
          lastModified: new Date().toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedFile = await response.json();

    toastStatus.value = "success";
    toastTitle.value = "File Renamed Successfully 🎉";
    toastMessage.value = `The file has been renamed to <strong>${newName}</strong>`;
    toastImage.value = successImage;

    // ✅ notify parent to refresh
    emit("file-renamed", updatedFile);

    return updatedFile;
  } catch (error) {
    toastStatus.value = "error";
    toastTitle.value = "Error renaming file on the server ❌";
    toastMessage.value = error.message || "An error occurred while renaming the file.";
    toastImage.value = errorImage;

    throw error;
  } finally {
    NProgress.done();
  }
};

// ✅ FIX: attach/detach bootstrap modal listeners correctly
let onShownHandler = null;
let onShowHandler = null;

onMounted(() => {
  const modalElement = editFileModal.value;
  if (!modalElement) return;

  // When modal is about to open, set input value from props (latest selection)
  onShowHandler = () => {
    newFileName.value = props.fileName || "";
  };

  // When modal is shown, focus input
  onShownHandler = async () => {
    await nextTick();
    fileNameInput.value?.focus();
  };

  modalElement.addEventListener("show.bs.modal", onShowHandler);
  modalElement.addEventListener("shown.bs.modal", onShownHandler);
});

onBeforeUnmount(() => {
  const modalElement = editFileModal.value;
  if (!modalElement) return;

  if (onShowHandler) modalElement.removeEventListener("show.bs.modal", onShowHandler);
  if (onShownHandler) modalElement.removeEventListener("shown.bs.modal", onShownHandler);
});
</script>

<style scoped>
.file-icon-placeholder {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #dee2e6;
}

.file-icon-placeholder i {
  font-size: 24px;
  color: #dc3545;
}
</style>
