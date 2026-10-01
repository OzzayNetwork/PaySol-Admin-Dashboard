<template>
  <!-- Modal -->
  <div
    class="modal fade text-dark"
    id="addFolderModal"
    tabindex="-1"
    aria-labelledby="addFolderModalLabel"
    aria-hidden="true"
    ref="addFolderModal"
  >
    <div class="modal-dialog modal-dialog-centered" style="max-width: 560px;">
      <div class="modal-content shadow-lg border-0" style="border-radius: 12px;">

        <!-- Header -->
        <div class="modal-header border-0 px-4 pt-4 pb-2">
          <h5 class="modal-title fw-bold text-black fs-4 mb-1" id="addFolderModalLabel">
            <!-- subtle icon (swap to emoji if you prefer) -->
            
            <span>{{ title }}</span>
          </h5>

          <button
            type="button"
            class="btn p-0 border-0"
            data-bs-dismiss="modal"
            aria-label="Close"
            style="
              width: 34px;
              height: 34px;
              border-radius: 50%;
              background: rgba(0,0,0,.05);
              display: grid;
              place-items: center;
            "
          >
            <i class="bx bx-x text-dark" style="font-size: 22px; line-height: 1;"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body px-4 pt-2 pb-3">
          <form id="fileFolderForm" @submit.prevent="handleConfirm">
  <fieldset :disabled="folderSaving">
    <label for="folderName" class="form-label fw-semibold text-dark mb-2" style="font-size:15px;">
      Folder Name <span class="text-danger">*</span>
    </label>

    <input
      id="folderName"
      type="text"
      class="form-control"
      placeholder="Enter folder name"
      ref="folderNameInput"
      v-model="folderName"
      @input="handleFolderTyping"
    />

    <p class="text-muted d-block mt-2" v-if="!checkingFolder">
      Keep it short and recognizable.
    </p>

    <!-- Checking state -->
    <div
      v-if="checkingFolder"
      class="d-flex align-items-center gap-2 mt-3 text-muted mb-3"
      style="font-size:14px;"
    >
      <div class="spinner-border spinner-border-sm text-secondary"></div>
      Checking folder availability...
    </div>

    <!-- Exists warning + select option -->
    <div
      v-if="folderExists"
      class="alert alert-warning d-flex flex-column gap-2 mt-3"
      style="background:#fff3cd; border:1px solid #ffe69c; border-radius:10px;"
      role="alert"
    >
      <div class="d-flex align-items-start gap-2 align-items-center">
        <i class="mdi mdi-alert-circle-outline text-warning fs-5 mt-1"></i>
        <div style="font-size:14px;">
          The folder <span class="fw-semibold">"{{ folderName }}"</span> already exists.
        </div>
      </div>

      <button
        v-if="props.showSelect"
        type="button"
        class="btn btn-link waves-effect p-0 text-start"
        @click="selectExistingFolder"
      >
        Select This Folder
      </button>
    </div>

    <label for="folderDescription" class="form-label fw-semibold text-dark mb-2 mt-3" style="font-size:15px;">
      Description
    </label>

    <textarea
      id="folderDescription"
      class="form-control"
      placeholder="Write a short description..."
      rows="3"
      v-model="folderDescription"
    ></textarea>
  </fieldset>
</form>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 px-4 pb-4 pt-2 d-flex justify-content-end gap-2">

         <button
  type="reset"
  form="fileFolderForm"
  class="btn btn-link waves-effect fw-bold btn-lg"
  :disabled="folderSaving || !isDirty"
  @click="resetForm"
>
  {{ cancelText }}
</button>

<button
  type="submit"
  form="fileFolderForm"
  class="btn btn-primary fw-semibold btn-lg"
  :disabled="folderSaving || !isDirty || folderExists || checkingFolder"
>
  <span v-if="folderSaving" class="spinner-border spinner-border-sm me-2"></span>
  {{ confirmText }}
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
      :imageHeight="63"
      @hide="toastStatus = null"
    />
      <ClearFormModal
        ref="clearModalRef"
        modal-id="clearUploadFormModal"
        :loading="isClearing"
        @confirm="resetForm"
        @cancel="handleContinueEditing"
    />

    <UnsavedChangesConfirm
        ref="unsavedRef"
        @confirm="proceedNavigation"
        @cancel="cancelNavigation"
    />

    <button  class="btn btn-primary d-none" id="openUnsavedModal" data-bs-toggle="modal" data-bs-target="#unsavedChangesModal">Open Clear Form Modal</button>
    <button class="btn btn-outline-primary d-none"  @click="goSomewhere('/file-manager')">
        Go to File Manager
    </button>


</template>
<script setup>
import { ref, onMounted, nextTick, computed, onBeforeUnmount, defineEmits, defineProps } from "vue"
import axios from "axios"
import NProgress from "nprogress"

// APIs
import documentAPI from "@/api/document"

import ImageToast from "@/components/ImageToast.vue"
import ClearFormModal from "@/components/guards/ClearFormConfirm.vue"
import UnsavedChangesConfirm from "@/components/guards/UnsavedChangesConfirm.vue"

import successImage from "../../assets/images/icons/check.png"
import errorImage from "../../assets/images/icons/error.png"

const props = defineProps({
  title: { type: String, default: "Add New Folder" },
  cancelText: { type: String, default: "Clear Form" },
  confirmText: { type: String, default: "Save Folder" },
  loading: { type: Boolean, default: false },
  showSelect: { type: Boolean, default: false }
})

// -------------------- Toast state --------------------
const toastStatus = ref(null)
const toastTitle = ref("")
const toastMessage = ref("")
const toastImage = ref(null)

function showToast(status, title, message) {
  toastStatus.value = status
  toastTitle.value = title
  toastMessage.value = message

  toastImage.value =
    status === "success" ? successImage :
    status === "error" ? errorImage :
    null
}

// -------------------- API --------------------
const FOLDERS_API = documentAPI.fileFolder()

// -------------------- Modal + form state --------------------
const addFolderModal = ref(null)
const folderNameInput = ref(null)

const folderSaving = ref(false)
const folderName = ref("")
const folderDescription = ref("")

// -------------------- Folder existence state --------------------
const checkingFolder = ref(false)
const folderExists = ref(false)
const existingFolderId = ref(null)

let debounceTimer = null

const emit = defineEmits(["folder-added", "folder-selected"])

// -------------------- Dirty state --------------------
const isDirty = computed(() => {
  return folderName.value.trim() !== "" || folderDescription.value.trim() !== ""
})

// -------------------- Helpers --------------------
const focusFolderName = async () => {
  await nextTick()
  setTimeout(() => {
    if (folderSaving.value) return
    folderNameInput.value?.focus()
  }, 10)
}

function clearFormValuesOnly() {
  folderName.value = ""
  folderDescription.value = ""
  folderExists.value = false
  existingFolderId.value = null
}

async function resetForm() {
  clearFormValuesOnly()
  await focusFolderName()
}

// -------------------- Cancel / Clear confirmation --------------------
async function handleCancel() {
  if (!isDirty.value) {
    await resetForm()
    return
  }

  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("clearUploadFormModal"),
    { backdrop: "static", keyboard: false }
  )
  modal.show()
}

async function handleContinueEditing() {
  const clearModalEl = document.getElementById("clearUploadFormModal")
  const clearModal = bootstrap.Modal.getInstance(clearModalEl)
  clearModal?.hide()
}

// -------------------- Check if folder exists --------------------
async function checkFolderExists(name) {
  const q = (name ?? "").trim()

  if (!q) {
    folderExists.value = false
    existingFolderId.value = null
    return false
  }

  try {
    checkingFolder.value = true

    const res = await axios.get(FOLDERS_API, {
      params: { folderName: q }
    })

    const list = Array.isArray(res.data) ? res.data : []

    const match = list.find(item =>
      String(item?.folderName ?? "").trim().toLowerCase() === q.toLowerCase()
    )

    if (match) {
      folderExists.value = true
      existingFolderId.value = match.id
    } else {
      folderExists.value = false
      existingFolderId.value = null
    }

    return folderExists.value
  } catch (error) {
    console.error("Error checking folder existence:", error)
    folderExists.value = false
    existingFolderId.value = null
    return false
  } finally {
    checkingFolder.value = false
  }
}

// -------------------- Select existing folder --------------------
function selectExistingFolder() {
  if (!existingFolderId.value) return

  emit("folder-selected", existingFolderId.value)

  const modal = bootstrap.Modal.getInstance(addFolderModal.value)
  modal?.hide()
}

// -------------------- Typing handler (debounced) --------------------
function handleFolderTyping() {
  const q = folderName.value.trim()

  folderExists.value = false
  existingFolderId.value = null

  if (q.length < 2) {
    checkingFolder.value = false
    clearTimeout(debounceTimer)
    return
  }

  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    checkFolderExists(q)
  }, 400)
}

// -------------------- Save --------------------
async function handleConfirm(event) {
  event?.preventDefault()

  const name = folderName.value.trim()

  if (!name) {
    showToast("error", "Folder Name Required", "Please enter a folder name before saving.")
    return
  }

  clearTimeout(debounceTimer)

  const exists = await checkFolderExists(name)

  if (exists) {
    showToast(
      "error",
      "Folder Name Taken",
      "The folder name you entered already exists. Please choose a different name."
    )
    return
  }

  folderSaving.value = true
  NProgress.start()

  showToast("loading", "Creating Folder", "Please wait while we create the folder...")

  try {
    const res = await axios.post(FOLDERS_API, {
      folderName: name.trim(),
      description: folderDescription.value.trim(),
      createdAt: new Date().toISOString(),
      fname: "system-folder", // generate a unique fname
      lname: "test"
    })

    showToast(
      "success",
      "Folder Created",
      `<strong>${res.data?.name || name}</strong> was created successfully.`
    )

    emit("folder-added", res.data)
    emit("folder-selected", res.data.id)

    const modal = bootstrap.Modal.getInstance(addFolderModal.value)
    modal?.hide()

  } catch (error) {
    const apiMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to create folder. Please try again."

    showToast("error", "Failed to Create Folder", apiMessage)
  } finally {
    NProgress.done()
    folderSaving.value = false
  }
}

// -------------------- Modal lifecycle --------------------
onMounted(() => {
  const beforeUnloadHandler = (event) => {
    if (!isDirty.value) return
    event.preventDefault()
    event.returnValue = ""
  }

  window.addEventListener("beforeunload", beforeUnloadHandler)

  if (!addFolderModal.value) return
  const modalElement = addFolderModal.value

  const onShown = () => focusFolderName()
  const onHidden = () => clearFormValuesOnly()

  modalElement.addEventListener("shown.bs.modal", onShown)
  modalElement.addEventListener("hidden.bs.modal", onHidden)

  onBeforeUnmount(() => {
    modalElement.removeEventListener("shown.bs.modal", onShown)
    modalElement.removeEventListener("hidden.bs.modal", onHidden)
    window.removeEventListener("beforeunload", beforeUnloadHandler)
  })
})
</script>