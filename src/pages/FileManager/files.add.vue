<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Upload New File</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/file-manager">File Manager</router-link>
                            </li>
                            <li class="breadcrumb-item active">Upload New File</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <!-- 🔄 Loader -->
        <div v-if="isLoading">
            <LoaderVue />
        </div>
        <div v-else class="row justify-content-center">
            <div class="col-12  col-md-10 col-lg-6">
                <div class="card">
                    <div class="card-header d-flex align-items-center justify-content-between flex-wrap p-3 gap-3">
                        <div>
                            <h4 class="card-title mb-1">Upload a New File</h4>
                            <p class="card-title-desc text-muted mb-0">
                                Upload files to your system, assign folders, set visibility, and manage access permissions with ease.
                            </p>
                        </div>

                        <div class="d-flex gap-3 d-none">
                            <!-- Add Category -->
                            <button type="button" class="btn btn-light waves-effect fw-semibold d-flex gap-2 align-items-center btn-lg" data-bs-toggle="modal"
                                data-bs-target="#addFolderModal" title="Create a new gallery category">
                                <span class="font-size-16 align-middle me-2 d-none ">🗂️</span>
                                <span class="fs-2 bx bxs-folder-plus text-primary"></span>
                                <span>Add Folder</span>
                            </button>

                            <!-- Add Album -->
                            <button  type="button" class="btn btn-light waves-effect fw-semibold d-flex gap-2 align-items-center btn-lg" 
                              data-bs-toggle="modal"
                                data-bs-target="#addCategoryModal" title="Create a new photo album">
                                <span class="font-size-16 align-middle me-2 d-none">🖼️</span>
                               <span class="fs-2 bx bxs-add-to-queue text-primary"></span>
                                <span>Add Category</span>
                            </button>
                        </div>

                    </div>
                    <div class="card-body">
                        <div class="">
                           <form id="uploadFileForm" @submit.prevent="uploadFile" class="row">
                                <!-- Drag & Drop / Browse -->
                                <div class="col-12 mb-4">
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

                                </div>

                                <div class="col-12">
                                    <FilePreview 
                                        :fileUrl="fileUrl"
                                        :fileName="selectedFile.name"  
                                        :fileTypeExt="fileTypeExt" 
                                        v-if="selectedFile"             
                                        class="mb-3 modal-file-preview"    
                                    />
                                </div>

                                <!-- Document Name -->
                                <div class="col-12 mb-3">
                                    <label class="form-label">
                                        Document Name <strong class="text-danger">*</strong>
                                    </label>
                                    <input 
                                        ref="fileNameInput"
                                        v-model="fileName"
                                        pattern="^[a-zA-Z0-9 _.,()\\-\\[\\]{}@&+!']+$"
                                        title="Only letters, numbers, spaces, dots, hyphens, and underscores allowed"
                                        required
                                        type="text" class="form-control" 
                                        placeholder="Enter document name" 
                                    />
                                </div>

                                <!-- Category -->
                                <div class="col-sm-6 col-xs-12  mb-3 col-12 mb-3">
                                    <label class="form-label">
                                        Category 
                                    </label>
                                    <SelectSearchBox 
                                        :options="loadedCategories.map(category => ({ label: category.name, value: category.id }))" 
                                        v-model="fileCategory"
                                        placeholder="Select Category" 
                                        showCreate
                                        createText="Add New Category"
                                        createModalId="addCategoryModal"
                                        input-class="form-control form-select" 
                                        :is-multi="false"                                          
                                    />
                                </div>

                                 <!-- Category -->
                                <div class="col-sm-6 col-xs-12  mb-3 col-12 mb-3">
                                    <label class="form-label">
                                        Folder 
                                    </label>
                                    <SelectSearchBox 
                                        :options="loadedFolders.map(folder => ({ label: folder.folderName, value: folder.id }))" 
                                        v-model="fileFolder"
                                        placeholder="Select Folder" 
                                        showCreate
                                        createText="Add New Folder"
                                        createModalId="addFolderModal"
                                        input-class="form-control form-select" 
                                        :is-multi="false"
                                         
                                    />
                                </div>

                                <!-- Tags -->
                                <div class="col-12 mb-3">
                                    <label class="form-label">Tags</label>
                                    <SelectSearchBox 
                                        :options="TagsOptions.map(category => ({ label: category.label, value: category.value }))" 
                                        v-model="fileTags"
                                        placeholder="Select Tags" 
                                        input-class="form-control form-select" 
                                        :is-multi="true"
                                        :is-taggable="true" 
                                        @option-created="(value) => handleCreateOption(value)"
                                        
                                    />
                                </div>

                                <!-- Description -->
                                <div class="col-12 mb-3">
                                    <label class="form-label">Description</label>
                                    <textarea
                                    v-model="fileDescription"
                                    class="form-control"
                                    rows="3"
                                    placeholder="Optional notes about this file..."
                                    ></textarea>
                                </div>

                                <!-- Visibility -->
                                <div class="col-12 mb-4">
                                    <label class="form-label d-block">
                                        Visibility <strong class="text-danger">*</strong>
                                    </label>

                                    <div class="mt-3 text-black">
                                        <div class="row">
                                            <div class="col-md-12 col-lg-6">
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
                                            </div>

                                            <div class="col-md-12 col-lg-6">
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
                                                                checked
                                                            >
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                       

                                        
                                    </div>
                                </div>

                               
                            </form>
                        </div>

                    </div>

                     <div class="card-footer bg-white border-top d-flex justify-content-end py-3 gap-3">
                        <button
                            type="button"
                            form="uploadFileForm"
                            class="btn btn-outline-secondary btn-lg px-4"
                            data-bs-toggle="modal"
                            data-bs-target="#clearUploadFormModal"
                            :disabled="!isDirty"
                          >
                          Clear Form
                        </button>
                        <button   type="submit" form="uploadFileForm" class="btn btn-dark btn-lg px-4" :disabled="uploadingFile || !isDirty">
                            <span v-if="uploadingFile" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            <template v-if="uploadingFile">Uploading...</template>
                            <template v-else>Upload File</template>
                        </button>
                    </div>
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
      <ClearFormModal
        ref="clearModalRef"
        modal-id="clearUploadFormModal"
        :loading="isClearing"
        @confirm="resetForm"
    />

    <UnsavedChangesConfirm
        ref="unsavedRef"
        @confirm="proceedNavigation"
        @cancel="cancelNavigation"
    />
    <FilesCategoryModal 
    :categories="loadedCategories"
    :showSelect="true"
    @category-added="getCategories"
    @category-selected="(id) => fileCategory = id"
    />

    <FilesFolderModal
    :folders="loadedFolders"
    :showSelect="true"
    @folder-added="getFolders"
    @folder-selected="(id) => fileFolder = id"
    />

    

    <button  class="btn btn-primary d-none" id="openUnsavedModal" data-bs-toggle="modal" data-bs-target="#unsavedChangesModal">Open Clear Form Modal</button>
    <button class="btn btn-outline-primary d-none"  @click="goSomewhere('/file-manager')">
        Go to File Manager
    </button>

</template>
<script setup>
import { ref, onMounted, nextTick, computed } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import axios from 'axios'

//APIs
import documentAPI from "@/api/document"

import LoaderVue from '@/layouts/Loader.vue'
import NProgress from "nprogress"
import ImageToast from "@/components/ImageToast.vue"
import SelectSearchBox from '@/components/SelectSearchBox.vue'
import FilePreview from '@/components/filesHandler/file.preview.vue'
import ClearFormModal from '@/components/guards/ClearFormConfirm.vue'
import UnsavedChangesConfirm from '@/components/guards/UnsavedChangesConfirm.vue'
import FilesCategoryModal from './files.category.modal.vue'
import FilesFolderModal from './files.folder.modal.vue'

import successImage from "../../assets/images/icons/check.png"
import errorImage from "../../assets/images/icons/error.png"

// variables for routing check
const pendingTo = ref(null);         // store the target route
const allowLeave = ref(false);       // one-time pass after confirmation
const pendingRoute = ref(null);      // for manual navigation buttons

const isDirty = computed(() => {
  const hasFile = !!selectedFile.value

  const hasName = !!fileName.value?.trim()
  const hasDescription = !!fileDescription.value?.trim()

  const hasCategory = fileCategory.value !== null
  const hasFolder = fileFolder.value !== null

  const hasTags = Array.isArray(fileTags.value) && fileTags.value.length > 0

  return hasFile || hasName || hasDescription || hasCategory || hasFolder || hasTags
})

const router = useRouter()
const isLoading = ref(true)
const uploadingFile = ref(false)    

// Toast state
const toastStatus = ref(null)
const toastTitle = ref("")
const toastMessage = ref("")
const toastImage = ref(null)

function showToast(status, title, message) {
  toastStatus.value = status
  toastTitle.value = title
  toastMessage.value = message
  toastImage.value = status === "success" ? successImage : errorImage
}

// -------------------- FORM STATE --------------------
const dragOver = ref(false)
const selectedFile = ref(null)

const fileTypeExt = ref(null)
const fileSize = ref(null)
const fileUrl = ref(null)
const fileEditDate = ref(null)

const fileCategory = ref(null)
const fileFolder = ref(null)
const fileTags = ref([])
const fileName = ref(null)
const fileDescription = ref(null)
const selectedVisibility = ref(false)

// refs
const fileInput = ref(null)
const fileNameInput = ref(null)

// Options
const TagsOptions = ref([
  { label: 'Invoice', value: 'invoice' },
  { label: 'Q1', value: 'q1' },
  { label: 'Branding', value: 'branding' },
  { label: 'Meeting Notes', value: 'meeting-notes' },
  { label: 'Contracts', value: 'contracts' },
  { label: 'Presentations', value: 'presentations' },
  { label: 'Financials', value: 'financials' },
  { label: 'HR Documents', value: 'hr-documents' },
  { label: 'Marketing Materials', value: 'marketing-materials' },
  { label: 'Product Specs', value: 'product-specs' }
])

const loadedFolders = ref([])
const loadedCategories = ref([])

// -------------------- API --------------------
const FILES_API = documentAPI.files() // assuming this returns the URL string for files endpoint
const CATEGORIES_API = documentAPI.categories() // assuming this returns the URL string for categories endpoint
const FOLDERS_API = documentAPI.fileFolder() // assuming this returns the URL string for folders endpoint

async function getFolders() {
  try {
    const res = await axios.get(FOLDERS_API)
    loadedFolders.value = res.data || []
  } catch (error) {
    console.error('Error fetching folders:', error)
    loadedFolders.value = []
  }
}

async function getCategories() {
  try {
    const res = await axios.get(CATEGORIES_API)
    loadedCategories.value = res.data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    loadedCategories.value = []
  }
}

const handleCreateOption = (value) => {
  TagsOptions.value.push({ label: value, value })
  // keep as string in selected tags
  fileTags.value.push(value)
}

// -------------------- FILE PICKER --------------------
function openFilePicker() {
  fileInput.value?.click()
}

function setSelectedFile(file) {
  selectedFile.value = file
  fileSize.value = file.size
  fileEditDate.value = new Date(file.lastModified).toLocaleString()
  fileTypeExt.value = (file.name.split('.').pop() || '').toLowerCase()
  fileName.value = file.name.split('.').slice(0, -1).join('.') || file.name
  fileUrl.value = URL.createObjectURL(file)
}

const handleFileSelect = async (event) => {
  const file = event?.target?.files?.[0]
  if (!file) return

  setSelectedFile(file)

  await nextTick()
  fileNameInput.value?.focus()
  fileNameInput.value?.select?.()
}

const handleFileDrop = async (event) => {
  dragOver.value = false
  const file = event?.dataTransfer?.files?.[0]
  if (!file) return

  setSelectedFile(file)

  await nextTick()
  fileNameInput.value?.focus()
  fileNameInput.value?.select?.()
}

// -------------------- “UPLOAD” (POST TO MOCKAPI) --------------------
// Converts File -> Base64 data URL string
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(new Error("File read failed"))
    reader.readAsDataURL(file)
  })
}

function normalizeTags(tags) {
  // SelectSearchBox may return strings or objects
  return (tags || []).map(t => {
    if (typeof t === "string") return t
    return t?.value ?? t?.label ?? String(t)
  })
}

function resetForm() {
  selectedFile.value = null
  fileTypeExt.value = null
  fileSize.value = null
  fileUrl.value = null
  fileEditDate.value = null
  fileCategory.value = null
  fileFolder.value = null
  fileTags.value = []
  fileName.value = null
  fileDescription.value = null
  selectedVisibility.value = false

  if (fileInput.value) fileInput.value.value = ""

   // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}
async function uploadFile() {
     event.preventDefault();
    uploadingFile.value = true

    toastStatus.value = "loading";
    toastTitle.value = "Uploading File";
    toastMessage.value = "Please wait while we upload the file...";
    toastImage.value = null;


  // basic validation
  if (!selectedFile.value)
    return showToast("error", "Missing file", "Please select a file to upload.")

  if (!fileName.value || !String(fileName.value).trim())
    return showToast("error", "Missing name", "Document Name is required.")

    try {
    NProgress.start()

    // MockAPI stores JSON only — we store the file as a base64 data URL
    const fileDataUrl = await fileToDataUrl(selectedFile.value)

    // Get category label (your payload uses "Passenger Van" style labels, not ids)
    const categoryLabel =
      loadedCategories.value.find(c => String(c.id) === String(fileCategory.value))?.name
      ?? String(fileCategory.value)

    // Normalize tags to array of strings
    const tags = (fileTags.value || []).map(t =>
      typeof t === "string" ? t : (t?.value ?? t?.label ?? String(t))
    )

    // Build payload matching your API shape
    const payload = {
      createdAt: new Date().toISOString(),

      // your schema
      fileName: String(fileName.value).trim(),                 // e.g. "80" in sample
      lastModified: new Date().toISOString(),
      documentModifiedAt:new Date(selectedFile.value.lastModified).toISOString(),
      //fileUrl: fileDataUrl,                                   // base64 instead of "/var/tmp/..."
      fileUrl: fileUrl.value,                                   // base64 instead of "/var/tmp/..."   
      fileType: (fileTypeExt.value || "").toLowerCase(),       // e.g. "msp"
      category: categoryLabel,
      Description: fileDescription.value || "",

      downloadCount: 0,
      fileSize: selectedFile.value.size,
      tags,

      // extra fields in your mock payload (set sensible defaults)
      fname: "System",
      lname: "Upload",
      uploadDate: new Date().toISOString(),
      revenue: "0.00",
      currencySymbol: "KES",
      phone: "",

      public: selectedVisibility.value
    }

    const res = await axios.post(
      "https://6945933aed253f51719bc9a5.mockapi.io/mockCRM/files",
      payload
    )

    showToast(
  "success",
  "File Uploaded",
  `
  <strong>${fileName.value}</strong> has been uploaded successfully.
  <br><br>
  <a class="btn btn-primary waves-effect text-white btn-sm"
     href="/file-manager">
     View Files Register →
  </a>
  `
)
    console.log("Saved record:", res.data)

   

    resetForm()
    // router.push('/file-manager') // optional

  } catch (error) {
    console.error("Upload failed:", error)
    showToast("error", "Upload Failed", "Could not upload file. Check API limits / network.")
  } finally {
    NProgress.done()
    uploadingFile.value = false
  }
}
function cancelUpload() {
  resetForm()
  router.push('/file-manager')
}

//navigating to new pages without saving changes should trigger the UnsavedChangesConfirm modal
onBeforeRouteLeave((to) => {

  if (!isDirty.value) return true;        // allow if clean
  if (allowLeave.value) return true;      // allow after user confirmed

  pendingTo.value = to;                  // store the target route object
  //unsavedRef.value?.open();              // open modal

    const btn = document.getElementById("openUnsavedModal");
    btn?.click();

  return false;                          // stop navigation
});

function goSomewhere(path) {
  if (isDirty.value) {
    pendingRoute.value = path;
    //unsavedRef.value?.open();

    const btn = document.getElementById("openUnsavedModal");
    btn?.click();

    return;
  }
  router.push(path);
}

// 2) User confirmed leaving
function proceedNavigation() {
  allowLeave.value = true;               // allow one navigation
  if (pendingTo.value) router.push(pendingTo.value.fullPath);
  pendingTo.value = null;
}

// 3) User cancelled
function cancelNavigation() {
  pendingTo.value = null;
}


onMounted(() => {

  const handler = (event) => {
    if (!isDirty.value) return;
    event.preventDefault();
    event.returnValue = "";
  };
   window.addEventListener("beforeunload", handler);
   

  getCategories()
  getFolders()
  setTimeout(() => (isLoading.value = false), 1000)
})
</script>

<style lang="scss" scoped>

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