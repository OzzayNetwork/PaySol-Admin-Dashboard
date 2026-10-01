<template>
  <!-- Modal -->
  <div
    class="modal fade text-dark"
    id="addTableModal"
    tabindex="-1"
    aria-labelledby="addTableModalLabel"
    aria-hidden="true"
    ref="addTableModal"
  >
    <div class="modal-dialog modal-dialog-centered" style="max-width: 560px;">
      <div class="modal-content shadow-lg border-0" style="border-radius: 12px;">

        <!-- Header -->
        <div class="modal-header border-0 px-4 pt-4 pb-2">
          <h5 class="modal-title fw-bold text-black fs-4 mb-1" id="addTableModalLabel">
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
          <form id="tableForm" @submit.prevent="handleConfirm" :disabled="tableAddLoading">
            <fieldset :disabled="tableAddLoading">

              <!-- Table Number (required, uniqueness-checked) -->
              <div class="mb-3">
                <label style="font-size: 15px;" for="tableNumber" class="form-label fw-semibold text-dark mb-2">
                  Table Number <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="tableNumber"
                  class="form-control"
                  placeholder="e.g. T-05, 12, VIP-1"
                  ref="tableNumberInput"
                  v-model="tableNumber"
                  @input="handleTableNumberTyping"
                  maxlength="20"
                  autocomplete="off"
                  required
                />
                <p class="text-muted d-block mt-2" v-if="!checkingTable">
                  A unique identifier for this table. Keep it short.
                </p>
              </div>

              <!-- Spinner while checking -->
              <div
                v-if="checkingTable"
                class="d-flex align-items-center gap-2 mt-3 text-muted mb-3"
                style="font-size: 14px;"
              >
                <div class="spinner-border spinner-border-sm text-secondary"></div>
                Checking table availability...
              </div>

              <!-- Hidden manual-check trigger (kept for parity with original) -->
              <button
                type="button"
                class="btn btn-primary d-none"
                @click="checkTableExists(tableNumber)"
              >check</button>

              <!-- Already exists warning -->
              <div
                v-if="tableExists"
                class="alert d-flex align-items-start gap-2 mt-3 alert alert-warning flex-column"
                style="background: #fff3cd; border: 1px solid #ffe69c; border-radius: 10px;"
                role="alert"
              >
                <div class="d-flex align-items-start gap-2 align-items-center">
                  <i class="mdi mdi-alert-circle-outline text-warning fs-5 mt-1"></i>
                  <div style="font-size: 14px;">
                    <p class="mb-0">
                      Table
                      <span class="fw-semibold">"{{ tableNumber }}"</span>
                      already exists. Please choose a different number.
                    </p>
                  </div>
                </div>

                <button
                  v-if="props.showSelect"
                  @click="selectExistingTable"
                  type="button"
                  class="btn btn-link waves-effect"
                >
                  Select This Table
                </button>
              </div>

              <!-- Label (optional friendly name) -->
              <div class="mb-3">
                <label style="font-size: 15px;" for="tableLabel" class="form-label fw-semibold text-dark mb-2">
                  Label
                </label>
                <input
                  type="text"
                  id="tableLabel"
                  class="form-control"
                  placeholder="e.g. Window Side, VIP Booth"
                  v-model="tableLabel"
                  maxlength="100"
                />
                <p class="text-muted d-block mt-2" style="font-size: 13px;">
                  Optional friendly name shown next to the number.
                </p>
              </div>

              <!-- Section + Floor side by side -->
             <!-- Section + Floor side by side -->
             <div class="row g-2 mb-3">
              <div class="col-sm-6">
                  <label style="font-size: 15px;" for="tableFloor" class="form-label fw-semibold text-dark mb-2">
                    Floor
                    <span v-if="loadingMetadata" class="spinner-border spinner-border-sm text-secondary ms-1"
                      style="width: 12px; height: 12px;"></span>
                  </label>
                  <input type="text" id="tableFloor" class="form-control" list="tableFloorsList"
                    placeholder="Pick existing or type new" v-model="tableFloor" maxlength="20" autocomplete="off" />
                  <datalist id="tableFloorsList">
                    <option v-for="f in availableFloors" :key="f" :value="f" />
                  </datalist>
                  <p v-if="!loadingMetadata && availableFloors.length === 0" class="text-muted mt-1 mb-0"
                    style="font-size: 12px;">
                    No floors yet — yours will be the first.
                  </p>
                </div>

                <div class="col-sm-6">
                  <label style="font-size: 15px;" for="tableSection" class="form-label fw-semibold text-dark mb-2">
                    Section
                    <span v-if="loadingMetadata" class="spinner-border spinner-border-sm text-secondary ms-1"
                      style="width: 12px; height: 12px;"></span>
                  </label>   
                   <input type="text" id="tableSection" class="form-control" list="tableSectionsList"
                    placeholder="Pick existing or type new" v-model="tableSection" maxlength="20" autocomplete="off" />               

                    <SelectSearchBox 
                    class="d-none"
                        :options="availableSections.map(section => ({ label: section, value: section }))" 
                        :key="availableSections.l"
                        v-model="tableSection"
                        placeholder="Select Section" 
                        input-class="form-control form-select" 
                        :is-multi="false"  
                        :is-taggable="true"   
                        @option-created="handleCreateSectionOption"                       
                    />

                  <datalist id="tableSectionsList">
                    <option v-for="s in availableSections" :key="s" :value="s" />
                  </datalist>
                  <p v-if="!loadingMetadata && availableSections.length === 0" class="text-muted mt-1 mb-0"
                    style="font-size: 12px;">
                    No sections yet — yours will be the first.
                  </p>
                </div>

                

                
              </div>

              <!-- Capacity + Min Capacity -->
              <div class="row g-2 mb-3">
                <div class="col-sm-6">
                  <label style="font-size: 15px;" for="tableCapacity" class="form-label fw-semibold text-dark mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    id="tableCapacity"
                    class="form-control"
                    placeholder="e.g. 4"
                    v-model.number="tableCapacity"
                    min="1"
                    max="50"
                  />
                </div>
                <div class="col-sm-6">
                  <label style="font-size: 15px;" for="tableMinCapacity" class="form-label fw-semibold text-dark mb-2">
                    Min. Capacity
                  </label>
                  <input
                    type="number"
                    id="tableMinCapacity"
                    class="form-control"
                    placeholder="optional"
                    v-model.number="tableMinCapacity"
                    min="1"
                    max="50"
                  />
                </div>
                <p
                  v-if="capacityInvalid"
                  class="text-danger mb-0 mt-1"
                  style="font-size: 13px;"
                >
                  Min. capacity cannot be greater than capacity.
                </p>
              </div>

              <!-- Description -->
              <div class="mb-0">
                <label style="font-size: 15px;" for="tableDescription" class="form-label fw-semibold text-dark mb-2">
                  Description
                </label>
                <textarea
                  id="tableDescription"
                  class="form-control"
                  placeholder="Notes about this table (optional)..."
                  rows="3"
                  v-model="tableDescription"
                ></textarea>
              </div>
            </fieldset>
          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 px-4 pb-4 pt-2 d-flex justify-content-end gap-2">
          <button
            type="reset"
            form="tableForm"
            class="btn btn-link waves-effect fw-bold btn-lg"
            :disabled="tableAddLoading || !isDirty"
            @click="resetForm()"
          >
            {{ cancelText }}
          </button>

          <button
            type="submit"
            form="tableForm"
            class="btn btn-primary fw-semibold btn-lg"
            :disabled="
              tableAddLoading ||
              !isDirty ||
              tableExists ||
              checkingTable ||
              capacityInvalid
            "
          >
            <span
              v-if="tableAddLoading"
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
</template>

<script setup>
import { ref, onMounted, nextTick, computed, onBeforeUnmount, defineEmits, defineProps } from "vue"
import axios from "axios"
import NProgress from "nprogress"
import POSAPI from "@/api/POS.API";


// APIs
import documentAPI from "@/api/document"

import ImageToast from "@/components/ImageToast.vue"
import ClearFormModal from "@/components/guards/ClearFormConfirm.vue"
import UnsavedChangesConfirm from "@/components/guards/UnsavedChangesConfirm.vue"
import SelectSearchBox from '@/components/SelectSearchBox.vue'


import successImage from "../../../assets/images/icons/check.png"
import errorImage from "../../../assets/images/icons/error.png"

const props = defineProps({
  title:       { type: String,  default: "Add New Table" },
  cancelText:  { type: String,  default: "Clear Form" },
  confirmText: { type: String,  default: "Save Table" },
  loading:     { type: Boolean, default: false },
  showSelect:  { type: Boolean, default: false }
})

const emit = defineEmits(["confirm", "cancel", "table-added", "table-selected"])

// -------------------- Section / Floor suggestions --------------------
const availableFloors   = ref([])
const availableSections = ref([])
const loadingMetadata   = ref(false)

// -------------------- Toast state --------------------
const toastStatus  = ref(null)
const toastTitle   = ref("")
const toastMessage = ref("")
const toastImage   = ref(null)

function showToast(status, title, message) {
  toastStatus.value  = status
  toastTitle.value   = title
  toastMessage.value = message
  toastImage.value =
    status === "success" ? successImage :
    status === "error"   ? errorImage   :
    null
}

// -------------------- API --------------------
const TABLES_API    = POSAPI.tables();
 // -> http://localhost/pos-api/tables

// -------------------- Modal + form state --------------------
const addTableModal   = ref(null)
const tableNumberInput = ref(null)

const tableAddLoading = ref(false)

// Form fields (mirroring the schema)
const tableNumber      = ref("")
const tableLabel       = ref("")
const tableSection     = ref("")
const tableFloor       = ref("")
const tableCapacity    = ref(null)
const tableMinCapacity = ref(null)
const tableDescription = ref("")

// Existence-check state
const checkingTable    = ref(false)
const tableExists      = ref(false)
const tableIdToSelect  = ref(null)

let debounceTimer = null

// -------------------- Validation --------------------
const isDirty = computed(() =>
  tableNumber.value.trim() !== "" ||
  tableLabel.value.trim()  !== "" ||
  tableSection.value.trim() !== "" ||
  tableFloor.value.trim()  !== "" ||
  tableCapacity.value      != null ||
  tableMinCapacity.value   != null ||
  tableDescription.value.trim() !== ""
)

const capacityInvalid = computed(() => {
  const cap = Number(tableCapacity.value)
  const min = Number(tableMinCapacity.value)
  if (!cap || !min) return false
  return min > cap
})

// -------------------- Helpers --------------------
const focusTableNumber = async () => {
  await nextTick()
  setTimeout(() => {
    if (tableAddLoading.value) return
    tableNumberInput.value?.focus()
  }, 10)
}

function clearFormValuesOnly() {
  tableNumber.value      = ""
  tableLabel.value       = ""
  tableSection.value     = ""
  tableFloor.value       = ""
  tableCapacity.value    = null
  tableMinCapacity.value = null
  tableDescription.value = ""
}

async function resetForm() {
  clearFormValuesOnly()
  tableExists.value = false
  tableIdToSelect.value = null
  await focusTableNumber()
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

// -------------------- Existence check --------------------
/**
 * Your PHP API returns a paginated shape:
 *   { total, page, limit, data: [...] }
 * We tolerate both flat arrays and the paginated shape so this still
 * works if you ever swap the endpoint for a MockAPI fallback.
 */
function extractList(resData) {
  if (Array.isArray(resData))         return resData
  if (Array.isArray(resData?.data))   return resData.data
  return []
}

async function checkTableExists(value) {
  const q = String(value ?? "").trim()
  if (!q) {
    tableExists.value = false
    return false
  }

  try {
    checkingTable.value = true

    // Send `table_number` as a hint; if your /tables endpoint ignores
    // unknown query params it'll still return the full list and we'll
    // filter client-side.
    const res = await axios.get(TABLES_API, {
      params: { table_number: q, limit: 200 }
    })

    const list = extractList(res.data)

    const match = list.find(t =>
      String(t?.table_number ?? "").trim().toLowerCase() === q.toLowerCase()
    )

    tableExists.value     = !!match
    tableIdToSelect.value = match ? match.id : null

    return !!match
  } catch (error) {
    console.error("Error checking table existence:", error)
    tableExists.value = false
    return false
  } finally {
    checkingTable.value = false
  }
}

async function selectExistingTable() {
  if (!tableIdToSelect.value) return
  emit("table-selected", tableIdToSelect.value)
  const modal = bootstrap.Modal.getInstance(addTableModal.value)
  modal?.hide()
}

function handleTableNumberTyping() {
  const q = tableNumber.value.trim()

  tableExists.value = false
  if (q.length < 1) {
    checkingTable.value = false
    clearTimeout(debounceTimer)
    return
  }

  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    checkTableExists(q)
  }, 400)
}

// -------------------- Save --------------------
async function handleConfirm(event) {
  event?.preventDefault()

  const number = tableNumber.value.trim()

  if (!number) {
    showToast("error", "Table Number Required", "Please enter a table number before saving.")
    return
  }

  if (capacityInvalid.value) {
    showToast(
      "error",
      "Invalid Capacity",
      "Minimum capacity cannot be greater than capacity."
    )
    return
  }

  // Cancel any pending debounced check and force a fresh one
  clearTimeout(debounceTimer)
  checkingTable.value = true
  const exists = await checkTableExists(number)

  if (exists) {
    showToast(
      "error",
      "Table Number Taken",
      "A table with this number already exists. Please choose a different one."
    )
    return
  }

  // Build payload — only send fields that have a value, so the API's
  // defaults (e.g. status='available', is_active=1) kick in cleanly.
  const payload = { table_number: number }
  if (tableLabel.value.trim()) payload.label = tableLabel.value.trim()
  if (tableSection.value.trim()) payload.section = tableSection.value.trim()
  if (tableFloor.value.trim()) payload.floor = tableFloor.value.trim()
  if (tableCapacity.value != null && tableCapacity.value !== "")
    payload.capacity = Number(tableCapacity.value)
  if (tableMinCapacity.value != null && tableMinCapacity.value !== "")
    payload.min_capacity = Number(tableMinCapacity.value)
  if (tableDescription.value.trim()) payload.description = tableDescription.value.trim()

  tableAddLoading.value = true
  NProgress.start()

  showToast("loading", "Creating Table", "Please wait while we register the table...")

  try {
    const res = await axios.post(TABLES_API, payload)

    const created = res.data?.data ?? res.data // tolerate either shape

    showToast(
      "success",
      "Table Created",
      `<strong>${created?.table_number || number}</strong> was registered successfully.`
    )

    const modal = bootstrap.Modal.getInstance(addTableModal.value)
    modal?.hide()

    emit("table-added", created)
    if (created?.id) emit("table-selected", created.id)
     loadTableMetadata()
  } catch (error) {
    // Your PHP API returns `{ error: "...", errors: { field: msg } }` on 422.
    // Surface the most useful message available.
    const apiData = error?.response?.data
    const fieldErrors = apiData?.errors
    const apiMessage =
      (fieldErrors && Object.values(fieldErrors)[0]) ||
      apiData?.error ||
      apiData?.message ||
      error?.message ||
      "Failed to create table. Please try again."

    showToast("error", "Failed to Create Table", apiMessage)
  } finally {
    NProgress.done()
    tableAddLoading.value = false
  }
}

const handleCreateSectionOption = (value) => {
    availableSections.value.push( value)
    // keep as string in selected tags
    tableSection.value.push(value)
}

/**
 * Pull all tables from the API and extract unique non-empty
 * floors and sections, sorted alphabetically. Used to populate
 * the <datalist> suggestions.
 */
function uniqueValues(list, key) {
  const seen = new Set()
  const out  = []
  for (const item of list) {
    const raw = String(item?.[key] ?? "").trim()
    if (!raw) continue
    const lower = raw.toLowerCase()
    if (seen.has(lower)) continue
    seen.add(lower)
    out.push(raw)
  }
  return out.sort((a, b) => a.localeCompare(b))
}

async function loadTableMetadata() {
  try {
    loadingMetadata.value = true

    // Pull a generous page so we capture all distinct floors/sections.
    // If you have hundreds of tables, bump the limit or paginate.
    const res = await axios.get(TABLES_API, { params: { limit: 500 } })
    const list = extractList(res.data)

    availableFloors.value   = uniqueValues(list, "floor")
    availableSections.value = uniqueValues(list, "section")
  } catch (error) {
    console.error("Failed to load table metadata:", error)
    // Non-fatal — user can still type free-text values
    availableFloors.value   = []
    availableSections.value = []
  } finally {
    loadingMetadata.value = false
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

  if (!addTableModal.value) return
  const modalElement = addTableModal.value

  const onShown = () => {
    focusTableNumber()
    loadTableMetadata()      // <-- add this line
  }
  const onHidden = () => {
    tableExists.value = false
    tableIdToSelect.value = null
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