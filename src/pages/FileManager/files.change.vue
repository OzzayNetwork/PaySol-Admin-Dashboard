<template>
  <!-- Replace File Modal -->
  <div
    class="modal fade text-dark"
    id="replaceFileModal"
    tabindex="-1"
    aria-labelledby="replaceFileModalLabel"
    aria-hidden="true"
    ref="replaceFileModal"
    style="z-index: 1000000;"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg border-0">
        <!-- Header -->
        <div class="modal-header border-0 p-4">
          <h5 class="modal-title fw-bold" id="replaceFileModalLabel">
            🔄 Replace File
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
              <p class="text-muted small mb-0 text-capitalize">Current file that will be replaced</p>
            </div>
          </div>

          <!-- Warning Message -->
          <div class="alert alert-warning mb-4">
            <div class="d-flex">
              <i class="bx bx-error-circle me-2"></i>
              <div>
                <p class="small mb-0">
                  <span class="fw-semibold">Warning:</span> This will permanently replace the current file. 
                  The existing file will be overwritten with the new upload.
                </p>
              </div>
            </div>
          </div>

         

          <!-- Replace File Form -->
          <form @submit="replaceFile" id="replaceForm" enctype="multipart/form-data">

            <label 
              for="newFile" 
              class="p-4 d-flex flex-column w-100 text-center justify-content-center align-items-center drag-drop-container mb-4"
              @dragover.prevent="dragOver = true"
              @dragleave="dragOver = false"
              @drop.prevent="handleFileDrop"
              :class="{'drag-over': dragOver, 'has-file': selectedFile}"
              >
              <span>
                <i class="bx bx-cloud-upload text-black opacity-25 drag-drop-icon" style="font-size: 80px;"></i>
              </span>
              <h6 class="text-capitalize modal-title text-black text fs-5 fw-bold mb-0 pb-0">Drop file here</h6>
              <p class="text-uppercase font-12 text-mutes mb-2"><small>or</small></p>
              <label for="newFile" class="btn btn-primary btn-lg">

                <span v-if="!selectedFile">
                <i class="bx bx-cloud-upload me-2"></i> Browse File
              </span>
              <span v-else>
                <i class="bx bx-check me-2"></i> Change File
              </span>
              </label>

            </label>
            <label 
              for="newFile" 
              class="btn btn-primary btn-lg w-100 d-none"
              @dragover.prevent="dragOver = true"
              @dragleave="dragOver = false"
              @drop.prevent="handleFileDrop"
              :class="{'drag-over': dragOver, 'has-file': selectedFile}"
            >
              <span v-if="!selectedFile">
                <i class="bx bx-cloud-upload me-2"></i> Browse or Drop File
              </span>
              <span v-else>
                <i class="bx bx-check me-2"></i> File Selected: {{ selectedFile.name }}
              </span>
            </label>

            
            <div class="mb-3 d-none">
              <label for="newFile" class="form-label fw-semibold">
                Select New File
              </label>
              <input
                type="file"
                id="newFile"
                class="form-control"
                ref="fileInput"
                @change="handleFileSelect"
                accept="*/*"
                required
              />
              <div class="form-text">
                <small class="text-muted">
                  Choose the file that will replace the current one
                </small>
              </div>
            </div>

            <!-- Selected File Preview -->
            <div v-if="selectedFile" class="mb-4 p-3 bg-light rounded d-flex gap-3 align-items-center">
             

              <div style="margin-right: 0px;">
                <img :src="getFileIcon(fileTypeExt)"
                    :alt="fileType + ' icon'" class="file-icon"
                    width="52px" />
            </div>

              <div>
                <h6 class="mt-2 text-dark mb-1">{{ selectedFile.name }}</h6>
                <p class="text-muted small mb-0">New file that will replace the current one</p>
              </div>
            </div>

             <FilePreview 
                :fileUrl="fileUrl"
                :fileName="selectedFile.name"  
                :fileTypeExt="fileTypeExt" 
                 v-if="selectedFile"             
                class="mb-3 modal-file-preview"    
            />


            <!-- Options -->
            <div class="mb-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="keepSameName"
                  v-model="keepSameName"
                  checked
                />
                <label class="form-check-label" for="keepSameName">
                  Keep original file name ({{ fileName }})
                </label>
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
            form="replaceForm"
            :disabled="!selectedFile || loadingReplace"
          >
            <span v-if="loadingReplace" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            <span v-if="loadingReplace">Replacing...</span>
            <span v-else>Replace File</span>
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

import FilePreview from '@/components/filesHandler/file.preview.vue'





// Importing the results images
import successImage from "../../assets/images/icons/check.png";
import errorImage from "../../assets/images/icons/error.png";

const props = defineProps({
  fileName: String,
  fileId: [String, Number],
  fileType: String
});

const emit = defineEmits(['file-replaced']);

const replaceFileModal = ref(null);
const selectedFile = ref(null);
const keepSameName = ref(true);
const loadingReplace = ref(false);

// Toast state
const toastStatus = ref(null);
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);

//changing variables
const fileTypeExt = ref(props.fileType);
const fileSize = ref(null); 
const fileUrl = ref("https://filesamples.com/samples/document/zip/sample1.zip")
const fileEditDate= ref(null);
// Add this with your other refs
const fileInput = ref(null);

// Method to replace file
const replaceFile = async (event) => {
  event.preventDefault();
  
  // Check if file is selected
  if (!selectedFile.value) {
    return;
  }

  loadingReplace.value = true;

  try {
    // Start loading
    NProgress.start();
    toastStatus.value = "loading";
    toastTitle.value = "Replacing File";
    toastMessage.value = "Please wait while we replace the file...";
    toastImage.value = null;

    // Call the API to replace the file
    const updatedFileData = await replaceFileOnApi(props.fileId, selectedFile.value, keepSameName.value);

    // Success toast
    toastStatus.value = "success";
    toastTitle.value = "File Replaced Successfully 🎉";
    toastMessage.value = `The file has been successfully replaced`;
    toastImage.value = successImage;

    // Emit event to parent
    emit('file-replaced', updatedFileData);

    // Close modal
    const modal = bootstrap.Modal.getInstance(replaceFileModal.value);
    if (modal) modal.hide();

  } catch (error) {
    console.error('Error replacing file:', error);
    
    // Error toast
    toastStatus.value = "error";
    toastTitle.value = "Error Replacing File ❌";
    toastMessage.value = error.message || "An error occurred while replacing the file.";
    toastImage.value = errorImage;

  } finally {
    loadingReplace.value = false;
    NProgress.done();
  }
};

const replaceFileOnApi = async (fileId, newFile, keepSameName) => {
  try {
    // MockAPI might not support actual file uploads via PUT
    // It might only accept JSON metadata updates
    const payload = {
      fileName: keepSameName ? props.fileName : newFile.name,
      fileSize: fileSize.value,
      fileType: fileTypeExt.value,
      fileUrl: fileUrl.value,
      uploadDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    console.log('Sending payload to MockAPI:', payload);

    const response = await fetch(`${documentAPI.files()}/${fileId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedFile = await response.json();
    console.log('File replaced successfully:', updatedFile);
    return updatedFile;

  } catch (error) {
    console.error('Error replacing file on the server:', error);
    throw error;
  }
};

// Handle file selection
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    fileSize.value = file.size; // This should be a primitive number
    fileEditDate.value = new Date(file.lastModified).toLocaleString();
    fileTypeExt.value = file.name.split('.').pop().toLowerCase();
    console.log("File type:", fileTypeExt.value);

    // Create object URL for preview if needed
    fileUrl.value = URL.createObjectURL(file);
    
    console.log("File details set:", {
      size: fileSize.value,
      type: fileTypeExt.value,
      url: fileUrl.value
    });
  }
};

// Get icon class for selected file
const getFileIconClass = (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  if (['pdf'].includes(extension)) return 'bx bxs-file-pdf text-danger';
  if (['doc', 'docx'].includes(extension)) return 'bx bxs-file-doc text-primary';
  if (['xls', 'xlsx'].includes(extension)) return 'bx bxs-file-xls text-success';
  if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) return 'bx bxs-file-image text-warning';
  if (['zip', 'rar', '7z'].includes(extension)) return 'bx bxs-file-archive text-secondary';
  return 'bx bxs-file text-dark';
};

//drag and drop capability

const dragOver = ref(false);

const handleFileDrop = (event) => {
  dragOver.value = false;
  
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    
    // Update the file input programmatically
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.value.files = dataTransfer.files;
    
    // Trigger the change event
    const changeEvent = new Event('change', { bubbles: true });
    fileInput.value.dispatchEvent(changeEvent);
    
    // Or call your handleFileSelect function directly
    // handleFileSelect({ target: { files: [file] } });
  }
};



// Modal event handling
onMounted(() => {
  // document.title = 'File management - Replace File'
  if (replaceFileModal.value) {
    const modalElement = replaceFileModal.value;

    const onShown = () => {
      // Reset form when modal opens
      selectedFile.value = null;
      keepSameName.value = true;
      
      // Focus on file input
      const fileInput = modalElement.querySelector('#newFile');
      if (fileInput) fileInput.focus();
    };

    const onHidden = () => {
      // Reset form when modal closes
      selectedFile.value = null;
      keepSameName.value = true;
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
/* Keep existing styles, just rename class if needed */
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

.modal-file-preview .preview-footer {
  display: none !important;
}

.modal-file-preview .preview-container{
  height: 200px !important;
}

.drag-over {
  background-color:#2164f342 !important;
  transform: scale(1.02);
  transition: all 0.3s ease;
  border-style: solid;
}

.drag-over .drag-drop-icon{
  opacity: 100%;
  color: #0d6efd !important;
}

/* .has-file {
  background-color: #04ab0a14 !important;
  border-color: #04ab0a !important;
} */

.btn-primary {
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
}

/* Optional: Add a pulsing animation for drag-over state */
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(13, 110, 253, 0); }
  100% { box-shadow: 0 0 0 0 rgba(13, 110, 253, 0); }
}

.drag-over {
  animation: pulse 1.5s infinite;
}

.drag-drop-container {
  border: 2px dashed #ced4da;
  border-radius: 7px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;

  border: 2px solid #2164f3;
    border-radius: 7px;
    border-style: dashed;
    background: #2164f314;
}
</style>