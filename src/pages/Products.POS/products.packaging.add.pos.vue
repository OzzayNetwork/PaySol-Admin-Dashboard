<template>
  <!-- Modal -->
  <div
    class="modal fade text-dark"
    id="addPackagingModal"
    tabindex="-1"
    aria-labelledby="addPackagingModalModalLabel"
    aria-hidden="true"
    ref="addCategoryModal"
  >
    <div class="modal-dialog modal-dialog-centered" style="max-width: 560px;">
      <div class="modal-content shadow-lg border-0" style="border-radius: 12px;">

        <!-- Header -->
        <div class="modal-header border-0 px-4 pt-4 pb-2">
          <h5 class="modal-title fw-bold text-black fs-4 mb-1" id="addCategoryModalLabel">
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
          <form id="packagingTypeForm" @submit.prevent="handleConfirm" :disabled="categoryAddLoading">
            
            <fieldset :disabled="categoryAddLoading">
                <div class="mb-3">
                <label style="font-size: 15px;" for="categoryName" class="form-label fw-semibold text-dark mb-2">
                    Packaging Name <span class="text-danger">*</span>
                </label>
                <input
                    type="text"
                    id="categoryName"
                    class="form-control"
                    placeholder="Enter category name"
                    ref="categoryNameInput"
                    v-model="categoryName"
                    @input="handleCategoryTyping"
                    required
                />
                <p class="text-muted d-block mt-2" v-if="!checkingCategory">Keep it short and recognizable.</p>
                </div>

                <div
                  v-if="checkingCategory"
                  class="d-flex align-items-center gap-2 mt-3 text-muted mb-3"
                  style="font-size: 14px;"
                >
                    <div class="spinner-border spinner-border-sm text-secondary"></div>
                    Checking category availability...
                </div>

                <button type="button" class="btn btn-primary d-none" @click="checkCategoryExists(categoryName)">check</button>

                <div
                  v-if="categoryExists"
                  class="alert d-flex align-items-start gap-2 mt-3 alert alert-warning flex-column "
                  style="background: #fff3cd; border: 1px solid #ffe69c; border-radius: 10px;"
                  role="alert"
                >
                 <div class="d-flex d-flex align-items-start gap-2 align-items-center">
                     <i class="mdi mdi-alert-circle-outline text-warning fs-5 mt-1"></i>

                  <div style="font-size: 14px;">
                    <p class=" mb-0">
                      The category
                    <span class="fw-semibold">"{{ categoryName }}"</span>
                    already exists. Please choose a different name.

                    
                    </p>

                    

                    <button
                      type="button"
                      class="btn btn-sm btn-outline-warning fw-semibold d-none"
                      @click="selectExistingCategory"
                    >
                      Select This Category
                    </button>
                  </div>

                  
                 </div>


                  <!-- Action -->
                   <button 
                   v-if="props.showSelect" 
                    @click="selectExistingCategory" 
                    type="button" 
                    class="btn btn-link waves-effect">
                     Select This Category
                    </button>
                    
                </div>

                

                <div class="mb-0">
                <label style="font-size: 15px;" for="categoryDescription" class="form-label fw-semibold text-dark mb-2">
                    Description
                </label>
                <textarea
                    id="categoryDescription"
                    class="form-control"
                    placeholder="Write a short description..."
                    rows="3"
                    v-model="categoryDescription"
                ></textarea>
                </div>
            </fieldset>
          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 px-4 pb-4 pt-2 d-flex justify-content-end gap-2">

          <!-- Cancel: subtle, texty -->
          <button
            type="reset"
            form="packagingTypeForm"
            class="btn btn-link waves-effect fw-bold btn-lg"
            :disabled="categoryAddLoading||!isDirty"
            @click="resetForm()"
          >
            {{ cancelText }}
          </button>

          <!-- Save: primary but not oversized -->
          <button
            type="submit"
            form="packagingTypeForm"
            class="btn btn-primary fw-semibold btn-lg"
            :disabled="categoryAddLoading || !isDirty || categoryExists||checkingCategory"
            
          >
            <span
              v-if="categoryAddLoading"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
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
import { ref, onMounted, nextTick, computed, onBeforeUnmount, watch, defineEmits, defineProps  } from "vue"
import axios from "axios"
import NProgress from "nprogress"

//APIs
import documentAPI from "@/api/document"
import POSAPI from "@/api/POS.API"
const PRODUCT_CATEGORY_API = POSAPI.categories()

import ImageToast from "@/components/ImageToast.vue"
import ClearFormModal from "@/components/guards/ClearFormConfirm.vue"
import UnsavedChangesConfirm from "@/components/guards/UnsavedChangesConfirm.vue"

import successImage from "../../assets/images/icons/check.png"
import errorImage from "../../assets/images/icons/error.png"
import {useAuthStore} from "@/stores/auth"

const authStore=useAuthStore()

// ⚠️ You can remove these if truly unused in this file:
// import { useRouter, onBeforeRouteLeave } from "vue-router"
// import LoaderVue from "@/layouts/Loader.vue"
// import FilesCategoryModal from "./files.category.modal.vue"

const props = defineProps({
  title: { type: String, default: "Add Packaging Type" },
  input_name_label:{ type: String, default: "Packaging Name" },
  cancelText: { type: String, default: "Clear Form" },
  confirmText: { type: String, default: "Save Category" },
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

  // ✅ Don’t show error image for "loading"
  toastImage.value =
    status === "success" ? successImage :
    status === "error" ? errorImage :
    null
}



// -------------------- API --------------------
const PACKAGING_TYPE_API =POSAPI.packaging() // assuming this returns the URL string for categories endpoint

// -------------------- Modal + form state --------------------
const addCategoryModal = ref(null)
const categoryNameInput = ref(null)

const categoryAddLoading = ref(false)
const categoryName = ref("")
const categoryDescription = ref("")

// variables for checking if a category already exists
const checkingCategory = ref(false)
const categoryExists = ref(false)
const categoryIdToSelect = ref(null) // store the ID of the existing category to select if user clicks "Select This Category" 
let debounceTimer = null
let latestCheckId = 0

const emit = defineEmits(["confirm", "cancel", "category-added"]);

// ✅ Dirty = user typed anything
const isDirty = computed(() => {
  return categoryName.value.trim() !== "" || categoryDescription.value.trim() !== ""
})

// -------------------- Helpers --------------------
const focusCategoryName = async () => {
  await nextTick()
  // Small delay helps when Bootstrap focus trap is active
  setTimeout(() => {
    if (categoryAddLoading.value) return
    categoryNameInput.value?.focus()
  }, 10)
}

// ✅ Clear values WITHOUT forcing focus (to avoid fighting modal close)
function clearFormValuesOnly() {
  categoryName.value = ""
  categoryDescription.value = ""
}

// ✅ Reset with focus (use when modal is open / user is editing)
async function resetForm() {
  clearFormValuesOnly()
  categoryExists.value = false
  await focusCategoryName()
}

// -------------------- Cancel / Clear confirmation --------------------
async function handleCancel() {
  // If clean → clear silently (or do nothing). Your call.
  if (!isDirty.value) {
    await resetForm()
    return
  }

  // ✅ Show confirmation modal (ClearFormConfirm)
  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("clearUploadFormModal"),
    { backdrop: "static", keyboard: false }
  )
  modal.show()
}

async function handleContinueEditing() {
  // ✅ User chose "Continue Editing" → just close the clear modal
  const clearModalEl = document.getElementById("clearUploadFormModal")
  const clearModal = bootstrap.Modal.getInstance(clearModalEl)
  clearModal?.hide()

  // ❌ Remove alerts in real UI — they’re noisy
  // alert("Continue editing your category.")
}

// checking if category already exists
async function checkCategoryExists(name) {
  const q = (name ?? "").trim()
  if (!q) {
    categoryExists.value = false
    return false
  }

  try {
    checkingCategory.value = true

    const res = await axios.get(PACKAGING_TYPE_API, {
      params: { name: q }
    })

    const list = Array.isArray(res.data) ? res.data : []

    const exists = list.some(cat =>
      String(cat?.name ?? "").trim().toLowerCase() === q.toLowerCase()
    )

    // ✅ find exact match (case-insensitive)
    const match = list.find(cat =>
      String(cat?.name ?? "").trim().toLowerCase() === q.toLowerCase()
    )
    if(match) {
      categoryIdToSelect.value = match.id
    } else {
      categoryIdToSelect.value = null
    }

    console.log("Category exists check for:", q, "Result:", exists)

    categoryExists.value = exists
    return exists
  } catch (error) {
    console.error("Error checking category existence:", error)
    categoryExists.value = false
    return false
  } finally {
    checkingCategory.value = false
  }
}

async function selectExistingCategory() {
  if (!categoryIdToSelect.value) return

  // ✅ Emit event with the existing category ID
  emit("category-selected", categoryIdToSelect.value)

  // ✅ Close the modal
  const modal = bootstrap.Modal.getInstance(addCategoryModal.value)
  modal?.hide()
}

// typing to check if the category exists
function handleCategoryTyping() {
  const q = categoryName.value.trim()

  // reset quick UI state
  categoryExists.value = false
  if (q.length < 2) {
    checkingCategory.value = false
    clearTimeout(debounceTimer)
    return
  }

  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    checkCategoryExists(q)
  }, 400)
}

// -------------------- Save --------------------
async function handleConfirm(event) {
  event?.preventDefault()

  const name = categoryName.value.trim()
 // alert(name)

  if (!name) {
    showToast(
      "error",
      "Packaging Name Required",
      "Please enter a packaging name before saving."
    )    
    return;
  }

  // ✅ cancel any pending debounce call
  clearTimeout(debounceTimer)

  // ✅ force a final real-time check and WAIT for it
  checkingCategory.value = true
  const exists = await checkCategoryExists(name) // this sets categoryExists too

  if (exists) {
   showToast(
      "error",
      "Duplicate Packaging Type",
      "This packaging type already exists. Use a different name."
    )
    return
  }

  categoryAddLoading.value = true
  NProgress.start()

  showToast("loading", "Creating Category", "Please wait while we create the category...")
  console.log(authStore.user)
  try {
    const res = await axios.post(PACKAGING_TYPE_API, {
      name,
      description: categoryDescription.value.trim(),
      createdAt: new Date().toISOString(),
      createdBy: {
        fname: authStore.user?.first_name || "",
        lname: authStore.user?.last_name || "",
        userId: authStore.user?.id || "",
        avatar: authStore.user?.avatar || ""
      }
    })

   showToast(
    "success",
    "Packaging Type Created 🎉",
    `
    <strong>${res.data?.name || name}</strong> is now available for use.<br/>
    You can start assigning it to products to keep your inventory structured and consistent.
    <a href="/packaging-types" class="fw-semibold text-decoration-underline d-none">View all packaging types</a>
    `
  )

    const modal = bootstrap.Modal.getInstance(addCategoryModal.value)
    modal?.hide()
    console.log("Current Categories:", res.data)
    emit("category-added", res.data);
    emit("category-selected", res.data.id); // auto-select the new category
  } catch (error) {
    const apiMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to create packaging type. Please try again."

    showToast("error", "Failed to Create packaging type", apiMessage)
  } finally {
    NProgress.done()
    categoryAddLoading.value = false
  }
}

//--category ----- Add API call, form handling, and toast notifications are all in place. You can further customize the UI and UX as needed.
async function handleSeacrh() {
  // Implement search functionality here
  alert("Search for: " + categoryName.value)
}

// -------------------- Modal lifecycle --------------------
onMounted(() => {
  // ✅ Refresh/close-tab guard
  const beforeUnloadHandler = (event) => {
    if (!isDirty.value) return
    event.preventDefault()
    event.returnValue = ""
  }
  window.addEventListener("beforeunload", beforeUnloadHandler)

  if (!addCategoryModal.value) return
  const modalElement = addCategoryModal.value

  // ✅ Focus when modal is fully visible
  const onShown = () => {
    focusCategoryName()
  }

  // ✅ When closed, just clear values (no focus)
  const onHidden = () => {
    categoryExists.value = false
    clearFormValuesOnly()
  }

  modalElement.addEventListener("shown.bs.modal", onShown)
  modalElement.addEventListener("hidden.bs.modal", onHidden)

  onBeforeUnmount(() => {
    modalElement.removeEventListener("shown.bs.modal", onShown)
    modalElement.removeEventListener("hidden.bs.modal", onHidden)
    window.removeEventListener("beforeunload", beforeUnloadHandler)
  })
})
</script>