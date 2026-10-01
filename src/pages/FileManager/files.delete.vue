<template>
  <!-- Delete File Modal -->
  <div
    class="modal fade text-dark"
    id="deleteFileModal"
    tabindex="-1"
    aria-labelledby="deleteFileModalLabel"
    aria-hidden="true"
    ref="deleteFileModal"
    style="z-index: 1000000;"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">
        <!-- Header -->
        <div class="modal-header border-0 p-4">
          <h5 class="modal-title fw-bold " id="deleteFileModalLabel">
            🗑️ Delete {{ modalTitle }}
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
          <!-- Warning Icon -->
          <div class="text-center mb-4">
            <div class="warning-icon d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle p-4 mb-3">
                <i class="bx bx-error-alt text-danger" style="font-size: 2.5rem;"></i>            </div>
            <h5 class="text-black fw-semibold text-capitalize">Are you sure you want to <br>delete?</h5>
          </div>

          <!-- Single File Deletion -->
          <!-- Single File Deletion -->
        <div v-if="!isMultiple"
            style="border-left: 4px solid #ffd100;"
            class="mb-4 p-3 bg-warning bg-opacity-10 rounded d-flex gap-3 align-items-center">
            <img :src="getFileIcon(fileType)"
                :alt="fileType + ' icon'" class="file-icon"
                width="52px" />
            <div class="flex-grow-1">
                <h6 class="mt-2 text-dark mb-1">{{ singleFileName }}</h6>
                <p class="text-muted small mb-0 text-capitalize">{{ fileType || 'File' }}</p>
            </div>
        </div>

          <!-- Multiple Files Deletion -->
          <div v-if="isMultiple" 
            style="border-left: 4px solid #ffd100;"
            class="mb-4 bg-warning bg-opacity-10  pt-3"
            >
            <div class="d-flex align-items-center mb-3">
              <div class="me-3">
                <i class="bi bi-folder-fill text-warning" style="font-size: 2rem;"></i>
              </div>
              <div>
                <h6 class="mb-1">Multiple Items Selected</h6>
                <p class="text-muted small mb-0">{{ selectedCount }} items will be deleted</p>
              </div>
            </div>
            
            <!-- Preview of selected files (limited to 3) -->
            <div v-if="selectedFilesPreview.length > 0" class="border rounded p-3">
              <p class="small fw-semibold mb-2">Selected items:</p>
              <div v-for="(file, index) in selectedFilesPreview" :key="index" 
                   class="d-flex align-items-center mb-2 pb-2 border-bottom last-border-0">
                <img :src="getFileIcon(file.fileType)" 
                     :alt="file.type + ' icon'" 
                     class="file-icon me-2"
                     width="24px" />
                <span class="small text-truncate">{{ file.fileName }}</span>
              </div>
              <p v-if="selectedCount > 3" class="small text-muted mb-0 mt-2">
                ...and {{ selectedCount - 3 }} more
              </p>
            </div>
          </div>

          <!-- Warning Message -->
          <div class="alert alert-warning mb-0">
            <div class="d-flex">
              <i class="bi bi-info-circle-fill me-2"></i>
              <div>
                <p class="small mb-0">
                  <span class="fw-semibold">Warning:</span> This action cannot be undone. 
                  {{ isMultiple ? 'All selected files will be permanently deleted.' : 'The file will be permanently deleted.' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Delete Confirmation Form -->
          <form @submit="deleteFile" id="deleteForm">
            <div v-if="requireConfirmation" class="mt-3">
              <label for="confirmDelete" class="form-label fw-semibold">
                Type <span class="text-danger">"DELETE"</span> to confirm
              </label>
              <input
                type="text"
                id="confirmDelete"
                class="form-control"
                placeholder="Type DELETE to confirm"
                v-model="confirmationText"
                :disabled="loadingDelete"
                required
              />
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 pt-0 px-3">
          <button 
            type="button" 
            class="btn btn-light" 
            data-bs-dismiss="modal"
            :disabled="loadingDelete"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-danger fw-semibold"
            form="deleteForm"
            :disabled="!canDelete || loadingDelete"
          >
            <span v-if="loadingDelete" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span v-if="loadingDelete">Deleting...</span>
            <span v-else>{{ deleteButtonText }}</span>
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
import { ref, computed, onMounted, onBeforeUnmount,defineEmits } from "vue";
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
  // For single file deletion
  fileName: String,
  fileId: [String, Number, Array],
  fileType: String,
  
  // For multiple file deletion
  selectedFiles: {
    type: Array,
    default: () => []
  },
  
  // Configuration
  requireConfirmation: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['file-deleted', 'files-deleted']);

const deleteFileModal = ref(null);
const confirmationText = ref("");
const loadingDelete = ref(false);

// Toast state
const toastStatus = ref(null);
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);

// Computed properties
const isMultiple = computed(() => {
  // Check if we have an array of IDs with more than 1 item
  if (Array.isArray(props.fileId)) {
    return props.fileId.length > 1;
  }
  
  // Check if selectedFiles array has more than 1 item
  if (props.selectedFiles && props.selectedFiles.length > 0) {
    return props.selectedFiles.length > 1;
  }
  
  // Default to false (single file)
  return false;
});

const selectedCount = computed(() => {
  if (Array.isArray(props.fileId)) {
    return props.fileId.length;
  }
  
  if (props.selectedFiles && props.selectedFiles.length > 0) {
    return props.selectedFiles.length;
  }
  
  // Single file case - return 1
  return 1;
});

const selectedFilesPreview = computed(() => {
  if (!isMultiple.value || !props.selectedFiles.length) return [];
  return props.selectedFiles.slice(0, 3);
});

const modalTitle = computed(() => {
  return isMultiple.value ? `${selectedCount.value} Items` : 'File';
});

const singleFileName = computed(() => {
  if (isMultiple.value) return '';
  
  // Try to get from selectedFiles array first
  if (props.selectedFiles && props.selectedFiles.length === 1) {
    return props.selectedFiles[0].fileName || 'No file selected';
  }
  
  // Fallback to props
  return props.fileName || 'No file selected';
});

const singleFileId = computed(() => {
  if (isMultiple.value) return null;
  
  // Try to get from selectedFiles array first
  if (props.selectedFiles && props.selectedFiles.length === 1) {
    return props.selectedFiles[0].id;
  }
  
  // Fallback to props
  return props.fileId;
});

const fileType = computed(() => {
  if (props.selectedFiles && props.selectedFiles.length > 0) {
    return props.selectedFiles[0].fileType;
  }
  
  return props.fileType || 'File';
});

const deleteButtonText = computed(() => {
  if (isMultiple.value) {
    return `Delete ${selectedCount.value} Items`;
  }
  return 'Delete File';
});

const canDelete = computed(() => {
  if (props.requireConfirmation) {
    return confirmationText.value.toUpperCase() === "DELETE";
  }
  return true;
});

// Methods
// Methods
const deleteFile = async (event) => {
  event.preventDefault();
  
  if (props.requireConfirmation && confirmationText.value.toUpperCase() !== "DELETE") {
    return;
  }

  loadingDelete.value = true;

  try {
    NProgress.start();
    toastStatus.value = "loading";
    toastTitle.value = `Deleting ${modalTitle.value}`;
    toastMessage.value = `Please wait while we ${isMultiple.value ? 'delete the selected items' : 'delete the file'}...`;
    toastImage.value = null;

    let deletedItems;
    
    if (isMultiple.value) {
      // Handle multiple file deletion
      const fileIds = Array.isArray(props.fileId) ? props.fileId : props.selectedFiles.map(f => f.id);
      deletedItems = await deleteMultipleFilesOnApi(fileIds);
      
      // Check if we got results back
      if (deletedItems && deletedItems.length > 0) {
        // Success toast for multiple files
        toastStatus.value = "success";
        toastTitle.value = "Items Deleted Successfully 🎉";
        toastMessage.value = `Successfully deleted ${deletedItems.length} item${deletedItems.length !== 1 ? 's' : ''}`;
        toastImage.value = successImage;
        
        emit('files-deleted', deletedItems);
      } else {
        // No items were deleted
        toastStatus.value = "error";
        toastTitle.value = "Failed to Delete Items ❌";
        toastMessage.value = `No items could be deleted. Please try again later.`;
        toastImage.value = errorImage;
      }
    } 
    else {
      // Handle single file deletion
      const fileIdToDelete = singleFileId.value || props.fileId;
      deletedItems = await deleteFileOnApi(fileIdToDelete);
      
      // Success toast for single file
      toastStatus.value = "success";
      toastTitle.value = "File Deleted Successfully 🎉";
      toastMessage.value = `The file "${props.fileName}" has been permanently deleted`;
      toastImage.value = successImage;
      
      emit('file-deleted', props.fileId);
    }

    // Close modal
    const modal = bootstrap.Modal.getInstance(deleteFileModal.value);
    if (modal) modal.hide();
    
    // Reset form
    confirmationText.value = "";
    
  } catch (error) {
    console.error('Error deleting file(s):', error);
    
    // Error toast
    toastStatus.value = "error";
    toastTitle.value = "Error Deleting File(s) ❌";
    toastMessage.value = error.message || "An error occurred while deleting the file(s).";
    toastImage.value = errorImage;
  } finally {
    loadingDelete.value = false;
    NProgress.done();
  }
};

const deleteFileOnApi = async (fileId) => {
  try {
    const response = await fetch(`${documentAPI.files()}/${fileId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

const deleteMultipleFilesOnApi = async (fileIds) => {
  try {
    console.log(`Deleting ${fileIds.length} files...`);
    
    // Create promises that handle individual failures
    const deletePromises = fileIds.map(id => 
      fetch(`${documentAPI.files()}/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (!response.ok) {
          console.warn(`Failed to delete file ${id}: ${response.status}`);
          return null; // Return null for failed deletions
        }
        return response.json();
      })
      .catch(error => {
        console.error(`Error deleting file ${id}:`, error);
        return null; // Return null for network errors
      })
    );

    // Wait for all promises to complete
    const results = await Promise.all(deletePromises);
    
    // Filter out null results (failed deletions)
    const successfulDeletions = results.filter(result => result !== null);
    
    console.log(`Successfully deleted ${successfulDeletions.length} out of ${fileIds.length} files`);
    
    return successfulDeletions;
    
  } catch (error) {
    console.error('Error in batch delete operation:', error);
    return []; // Return empty array instead of throwing
  }
};

// Modal event handling
onMounted(() => {
  if (deleteFileModal.value) {
    const modalElement = deleteFileModal.value;

    const onShown = () => {
      if (props.requireConfirmation) {
        const confirmInput = modalElement.querySelector('#confirmDelete');
        if (confirmInput) confirmInput.focus();
      }
    };

    const onHidden = () => {
      confirmationText.value = "";
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
.warning-icon {
  width: 80px;
  height: 80px;
}

.last-border-0:last-child {
  border-bottom: none !important;
}

/* Modal animations */
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

/* Danger button styling */
.btn-danger {
  background: linear-gradient(135deg, #dc3545, #c82333);
  border: none;
  transition: all 0.3s ease;
}

.btn-danger:hover:not(:disabled) {
  background: linear-gradient(135deg, #c82333, #bd2130);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.btn-danger:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Warning alert styling */
.alert-warning {
  background-color: #fff3cd;
  border-color: #ffeaa7;
}
</style>