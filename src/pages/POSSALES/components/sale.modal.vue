<template>
  <!-- Modal -->
  <div
    class="modal fade text-dark"
    id="saleModal"
    tabindex="-1"
    aria-labelledby="saleModalLabel"
    aria-hidden="true"
     ref="saleModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
  >
    <div class="modal-dialog modal-dialog-centered" style="max-width: 560px;">
      <div class="modal-content shadow-lg border-0" style="border-radius: 12px;">

        <!-- Header -->
        <div class="modal-header border-0 px-4 pt-4 pb-2">
          <h5 class="opacity-0" id="saleModalLabel">
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
         <div class="row">
            <div class="col-12 d-flex justify-content-center align-items-center">
              <div class="d-flex flex-column align-items-center">
                <img :src="tabImage" alt="Sale" style="width: 120px; height: auto;" class="mb-4">
                <div class="text-center">
                  <h5 class="fw-bold mb-4">{{title}}</h5>
                  <p class="text-muted d-none">{{message}}</p>
                </div>
                <div class="text-center">
                  <p class="mb-0 pb-0 text-muted">Open Bill Amount</p>
                  <h4 class="card-title text-black fs-2 fw-bold mb-0">
                    {{ invoiceDetails.total_amount.toLocaleString('en-US', {style: 'currency', currency: 'KES'}) || 0 }}
                  </h4>
                  <p>{{formatDate(invoiceDetails.createdAt||'', 'DD MMM YYYY hh:mm A')}} Invoice NO.: {{ invoiceDetails.invoice_number||'' }}</p>

                </div>

               
              </div>

            </div>

            <div class="col-12">
              <div>
                <ul class="list-unstyled chat-list animate__animated animate__zoomIn animate__faster">
                  <li>
                    <a href="javascript:void(0);" class="bg-dark-subtle text-decoration-none d-block p-3 rounded">
                      <div class="d-flex align-items-center">

                        <!-- Avatar -->
                        <div class="flex-shrink-0 align-self-center me-3">
                          <div class="avatar-sm">
                            <span class="avatar-title rounded-circle bg-primary-subtle text-primary fs-4 fw-bold">
                              W
                            </span>
                          </div>
                        </div>

                        <!-- User Info -->
                        <div class="flex-grow-1 overflow-hidden me-2">
                          <h5 class="text-truncate mb-1  d-flex gap-2 align-items-center">
                            <span class="fw-bold">Wyclif Gitonga</span>

                            <div class="d-flex gap-2 fs-5 fw-normal" style="font-weight: 100 !important; font-size: 12px;">
                              <span class="badge-alt2 bg-gray-200 text-dark bg-danger-soft text-black w-auto"><span class="">High Balance</span></span>
                              <span class="badge-alt2 bg-gray-200 text-dark bg-primary-soft text-black w-auto">34 Open Bills</span>
                            </div>
                          </h5>
                         <div class="d-flex justify-content-between align-items-end">
                            <div>
                              <p class="text-truncate mb-0 text-muted">
                                0704549850 <br> kelvinnjuguna99@gmail.com
                              </p>
                            </div>
                            <div>
                              <div class="text-right  text-muted align-self-start">

                                <div style="font-size: 12px;">
                                  <span>Total Due: <strong>KES 12,000.00</strong></span>
                                </div>
                                <div class="small d-none">
                                  <span>Last Visit</span> <br>
                                  <span>02 Jan 2026 11:56 AM</span>
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                         

                      </div>
                    </a>
                  </li>
                   <li class="list-group-item cursor-pointer border border-1 border-dark-subtle mt-2 rounded bg-primary-subtle">
                      <a href="#" class="d-flex justify-content-between align-items-center">
                          <span class=" fw-bold d-flex gap-3 align-items-center"><span>View Customer's Bills</span> <span class="badge bg-warning text-black rounded-pill">{{ 31 }} Open Pending Bills</span> </span>
                          <span class="dripicons-chevron-right text-black fs-5 d-flex"></span>
                      </a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-12">
               <div class="">
                  <table class="table my-3 border table-centered   rounded">
                    <thead class="d-none">
                      <tr class="d-none">
                        <th colspan="4">Items in the tab/open Bill ({{invoiceDetails.items.length||0}})</th>
                      </tr>
                    </thead>
                    <thead>
                      <tr class="text-uppercase text-black" style="border-bottom: 2px solid black;">
                        <th>Item</th>
                        <th class="text-center">Qty</th>
                        <th>Price</th>
                        <th class="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in invoiceDetails.items" :key="item.id">
                        <td><span class="">{{index+1}}. </span> {{ item.productName }}</td>
                        <td class="text-center">{{ item.quantity }}</td>
                        <td>{{ item.unit_price.toLocaleString('en-US', {style: 'currency', currency: 'KES'}) }}</td>
                        <td class="text-right fw-bold text-black">{{ item.subtotal.toLocaleString('en-US', {style: 'currency', currency: 'KES'}) }}</td>
                      </tr>
                      <tr class="bg-warning-subtle border-0 border-none">
                        <td colspan="4" class="p-0">
                          <div class="d-flex   border border-1 border-warning-subtle rounded p-3 m-0 flex-column">
                            <div>
                              <span class="fw-bold text-uppercase text-black">Order Notes</span>
                              <a href="" class="mx-3"><i class="mdi mdi-edit"></i><i>Edit Notes</i></a>
                            </div>
                            <p class="m-0 p-0 text-muted">{{ invoiceDetails.notes || "No special instructions for this order." }}</p>
                          </div>
                        </td>
                      </tr>
                     
                    </tbody>
                   
                     <tbody v-if="!invoiceDetails.items.length">
                        <tr>
                          <td colspan="4" class="text-center text-muted py-4">No items in this bill.</td>
                        </tr>
                      </tbody>
                  </table>
                  <table class="table border table-centered   table-bordered">
                     <tbody>
                      <tr>
                        <td>
                          <strong>Table No.</strong>
                          <BR></BR>
                          <span>{{ invoiceDetails.table_number }}</span>
                        </td>
                        <td>
                          <strong>Bill/Tab title</strong>
                          <BR></BR>
                          <span>{{ invoiceDetails.tab_name }}</span>
                        </td>

                        <td>
                          <strong>Guests</strong>
                          <BR></BR>
                          <span>{{ invoiceDetails.guest_count }}</span>
                        </td>

                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
            <div class="col-12 d-none">
                <p class="fw-bold text-capitalize">Items in the tab/open Bill ({{invoiceDetails.items.length||0}})</p>
            </div>
            <div class="col-12">
                <div class="d-flex p-3 bg-secondary-muted border border-1 border-success-subtle rounded  gap-3">
                    <h1 class="fw-bold text-primary dripicons-information fs-1 m-0 p-0"></h1>
                    <p class="p-0 m-0">You can view and manage all open Bills from the <span class="fw-bold">Open Bills</span> section.</p>
                </div>
            </div>

            <div class="col-12 mt-3">
              <div class="row">
                <div class="col-6">
                   <div class="position-relative d-flex d-lg-flex d-none">
                    <button title="Edit columns to view on the table"
                      class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2 w-100 justify-content-center" type="button"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="mdi mdi-cart-arrow-right fs-4 align-middle"></i>
                      <span class="d-md-inline-block d-none ">Continue Selling</span>
                      
                    </button>


                  </div>
                </div>
                <div class="col-6">
                   <div class="position-relative d-flex d-lg-flex d-none">
                    <button title="Edit columns to view on the table"
                      class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2 w-100 justify-content-center" type="button"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="mdi mdi-share-variant fs-4 align-middle"></i>
                      <span class="d-md-inline-block d-none ">Share Bill</span>
                      
                    </button>


                  </div>
                </div>
                <div class="col-12 mt-3">
                  <button class="btn btn-primary waves-effect waves-light text-capitalize w-100 gap-2">                    
                     <i class="mdi mdi-printer fs-4 align-middle me-2"></i>
                     <span>Print Bill</span>
                    </button>
                </div>
              </div>
            </div>

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
import tabImage from "../../../assets/images/icons/POS/Checklist-time.svg"
import {
    formatUploadDate,
    formatDateTime,
    smartDate,
    timeAgo,
    formatDate,
    getUserPreferences,
    dateDiff
} from '@/utils/dates';

const props = defineProps({
  title:       { type: String,  default: "Open Bill Created Successfully" },
  message:     { type: String,  default: "The open bill has been created successfully." },
  cancelText:  { type: String,  default: "Clear Form" },
  confirmText: { type: String,  default: "Save Table" },
  loading:     { type: Boolean, default: false },
  showSelect:  { type: Boolean, default: false },
  invoiceDetails: { type: Object, default: () => ({}) },
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
const saleModal   = ref(null)
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
  const modal = bootstrap.Modal.getInstance(saleModal.value)
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

    const modal = bootstrap.Modal.getInstance(saleModal.value)
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

  if (!saleModal.value) return
  const modalElement = saleModal.value

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