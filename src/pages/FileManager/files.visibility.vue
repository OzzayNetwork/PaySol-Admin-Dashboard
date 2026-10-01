<template>
  <!-- File Visibility Modal -->
  <div
    class="modal fade text-dark"
    id="visibilityModal"
    tabindex="-1"
    aria-labelledby="visibilityModalLabel"
    aria-hidden="true"
    ref="visibilityModal"
    style="z-index: 1000000;"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">
        <!-- Header -->
        <div class="modal-header border-0 p-4">
          <h5 class="modal-title fw-bold" id="visibilityModalLabel">
            👁️ Visibility Settings
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
          <!-- Current File Preview -->
          <div class="mb-4 p-3 bg-light rounded d-flex gap-3 align-items-center">
            <div style="margin-right: 0px;">
                <img :src="getFileIcon(fileType)"
                    :alt="fileType + ' icon'" class="file-icon"
                    width="52px" />
            </div>
            <div>
              <h6 class="mt-2 text-dark mb-1">{{ fileName || 'No file selected' }}</h6>
              <p class="text-muted small mb-0 text-capitalize">Current visibility: <span class="fw-semibold">{{ fileVisibility ? 'Public' : 'Private' }}</span></p>
            </div>
          </div>

          <!-- Visibility Form -->
          <form @submit="updateVisibility" id="visibilityForm">
            <div>
                <label class="text-black text-capitalize text fs-6">Choose who can see this file by adjusting the visibility settings.</label>
            </div>

            <div class="mt-3 text-black">
                <label class="card border visibility-option p-2 border-2 mb-3 shadow-" :class="{'border-primary': selectedVisibility === true}">
                    <div class="p-2 px-3">
                        <div class="d-flex align-items-center">
                            <div class="avatar-xs align-self-center me-3">
                                <div class="avatar-title rounded bg-transparent text-dark text fs-1">
                                    <i class="bx bx-globe"></i>
                                </div>
                            </div>

                            <div class="overflow-hidden me-auto">
                                <h5 class="font-size-15 text-truncate mb-0 text-black">Public</h5>
                                <p class="text-muted mb-0 fw-reguler" style="font-weight: 400; font-size: 12px;">Everyone on the public website can view this file</p>
                            </div>

                            <div class="ms-2">
                               <input 
                                  class="form-check-input" 
                                  type="radio" 
                                  name="visibility" 
                                  :value="true"
                                  v-model="selectedVisibility"
                                >
                            </div>
                        </div>
                    </div>
                </label>

                 <label class="card border visibility-option p-2 border-2 mb-2 shadow-none" :class="{'border-primary': selectedVisibility === false}">
                    <div class="p-2 px-3">
                        <div class="d-flex align-items-center">
                            <div class="avatar-xs align-self-center me-3">
                                <div class="avatar-title rounded bg-transparent text-dark text fs-1">
                                    <i class="bx bx-lock-alt"></i>
                                </div>
                            </div>

                            <div class="overflow-hidden me-auto">
                                <h5 class="font-size-15 text-truncate mb-0 text-black">Private</h5>
                                <p class="text-muted mb-0 fw-reguler" style="font-weight: 400; font-size: 12px;">Only visible on the company dashboard to authorized users</p>
                            </div>

                            <div class="ms-2">
                               <input 
                                 class="form-check-input" 
                                 type="radio" 
                                 name="visibility" 
                                 :value="false"
                                 v-model="selectedVisibility"
                               >
                            </div>
                        </div>
                    </div>
                </label>
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
            form="visibilityForm"
            :disabled="selectedVisibility === fileVisibility || loadingVisibility"
          >
            <span v-if="loadingVisibility" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span v-if="loadingVisibility">Updating...</span>
            <span v-else>Update Visibility</span>
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
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
//APIs
import documentAPI from "@/api/document"
import { getFileIcon } from '@/utils/fileIcons';
import NProgress from "nprogress";
import ImageToast from "@/components/ImageToast.vue";

// Importing the results images
import successImage from "../../assets/images/icons/check.png";
import errorImage from "../../assets/images/icons/error.png";

const props = defineProps({
  fileName: String,
  fileId: [String, Number],
  fileType: String,
  fileVisibility: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['visibility-updated']);

const visibilityModal = ref(null);
const selectedVisibility = ref(props.fileVisibility || false);
const loadingVisibility = ref(false);

// Toast state
const toastStatus = ref(null);
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);

// Method to update visibility
const updateVisibility = async (event) => {
  event.preventDefault();
  
  // Check if visibility actually changed
  if (selectedVisibility.value === props.fileVisibility) {
    return;
  }

  loadingVisibility.value = true;

  try {
    // Start loading
    NProgress.start();
    toastStatus.value = "loading";
    toastTitle.value = "Updating Visibility";
    toastMessage.value = "Please wait while we update the file visibility...";
    toastImage.value = null;

    // Call the API to update visibility on the mock server
    const updatedFileData = await updateVisibilityOnApi(props.fileId, selectedVisibility.value);

    // Success toast
    toastStatus.value = "success";
    toastTitle.value = "Visibility Updated Successfully 🎉";
    toastMessage.value = `File is now <strong>${selectedVisibility.value ? 'Public' : 'Private'}</strong>`;
    toastImage.value = successImage;

    // Emit event to parent
    emit('visibility-updated', updatedFileData);

    // Close modal
    const modal = bootstrap.Modal.getInstance(visibilityModal.value);
    if (modal) modal.hide();

  } catch (error) {
    console.error('Error updating visibility:', error);
    
    // Error toast
    toastStatus.value = "error";
    toastTitle.value = "Error Updating Visibility";
    toastMessage.value = error.message || "An error occurred while updating the file visibility.";
    toastImage.value = errorImage;

  } finally {
    loadingVisibility.value = false;
    NProgress.done();
  }
};

const updateVisibilityOnApi = async (fileId, newVisibility) => {
  try {
    const response = await fetch(`${documentAPI.files()}/${fileId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public: newVisibility, // This is the key field for visibility
        lastModified: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedFile = await response.json();
    console.log('File visibility updated successfully:', updatedFile);
    return updatedFile;

  } catch (error) {
    console.error('Error updating visibility on the server:', error);
    throw error;
  }
};

// Modal event handling
onMounted(() => {
  if (visibilityModal.value) {
    const modalElement = visibilityModal.value;

    const onShown = () => {
      // Reset to current visibility when modal opens
      selectedVisibility.value = props.fileVisibility || false;
    };

    const onHidden = () => {
      // Reset to original visibility when modal closes
      selectedVisibility.value = props.fileVisibility || false;
    };

    modalElement.addEventListener("shown.bs.modal", onShown);
    modalElement.addEventListener("hidden.bs.modal", onHidden);

    onBeforeUnmount(() => {
      modalElement.removeEventListener("shown.bs.modal", onShown);
      modalElement.removeEventListener("hidden.bs.modal", onHidden);
    });
  }
});
</script>

<style scoped>
.visibility-option{
    cursor: pointer;
    transition: background-color 0.3s, border-color 0.3s;
    border: 2px solid #9e9e9e29;
    border-radius: 7px;
}

.visibility-option.border-primary {
  border-color: #0d6efd !important;
  background-color: rgba(13, 110, 253, 0.05);
}

.form-check-input:checked {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>