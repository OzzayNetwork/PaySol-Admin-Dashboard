<template>
  <!-- Modal -->
  <div
    class="modal fade text-dark"
    id="addCustomerModal"
    tabindex="-1"
    aria-labelledby="addCustomerModalLabel"
    aria-hidden="true"
    ref="addCustomerModal"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="max-width: 620px;">
      <div class="modal-content shadow-lg border-0" style="border-radius: 12px;">

        <!-- Header -->
        <div class="modal-header border-0 px-4 pt-4 pb-2">
          <h5 class="modal-title fw-bold text-black fs-4 mb-1" id="addCustomerModalLabel">
            <span>{{ title }}</span>
          </h5>

          <button
            type="button"
            class="btn p-0 border-0"
            data-bs-dismiss="modal"
            aria-label="Close"
            style="
              width: 34px; height: 34px; border-radius: 50%;
              background: rgba(0,0,0,.05); display: grid; place-items: center;
            "
          >
            <i class="bx bx-x text-dark" style="font-size: 22px; line-height: 1;"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body px-4 pt-2 pb-3">
          <form id="customerForm" @submit.prevent="handleConfirm" :disabled="customerAddLoading">
            <fieldset :disabled="customerAddLoading">

              <!-- Customer Type segmented control -->
              <div class="mb-3">
                <label style="font-size: 15px;" class="form-label fw-semibold text-dark mb-2">
                  Customer Type <span class="text-danger">*</span>
                </label>
                <div class="btn-group w-100" role="group">
                  <input
                    type="radio"
                    class="btn-check"
                    id="typeIndividual"
                    value="individual"
                    v-model="customerType"
                  />
                  <label class="btn btn-outline-primary fw-semibold" for="typeIndividual">
                    <i class="bx bx-user me-1"></i> Individual
                  </label>

                  <input
                    type="radio"
                    class="btn-check"
                    id="typeBusiness"
                    value="business"
                    v-model="customerType"
                  />
                  <label class="btn btn-outline-primary fw-semibold" for="typeBusiness">
                    <i class="bx bx-buildings me-1"></i> Business
                  </label>
                </div>
              </div>

              <!-- =============== IDENTITY =============== -->
              <h6 class="text-uppercase text-muted fw-bold mt-4 mb-2" style="font-size: 12px; letter-spacing: 0.5px;">
                Identity
              </h6>

              <!-- Full name -->
              <div class="mb-3">
                <label style="font-size: 15px;" for="customerName" class="form-label fw-semibold text-dark mb-2">
                  {{ customerType === 'business' ? 'Account Name' : 'Full Name' }}
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="customerName"
                  class="form-control"
                  :placeholder="customerType === 'business' ? 'e.g. Acme Ltd' : 'e.g. Alice Wanjiru'"
                  ref="customerNameInput"
                  v-model="customerName"
                  maxlength="120"
                  autocomplete="off"
                />
              </div>

              <!-- Business-only fields -->
              <template v-if="customerType === 'business'">
                <div class="mb-3">
                  <label style="font-size: 15px;" for="companyName" class="form-label fw-semibold text-dark mb-2">
                    Company / Trading Name <span class="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    class="form-control"
                    placeholder="Registered or trading name"
                    v-model="companyName"
                    maxlength="120"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label style="font-size: 15px;" for="contactPerson" class="form-label fw-semibold text-dark mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    class="form-control"
                    placeholder="Person to speak to at the company"
                    v-model="contactPerson"
                    maxlength="120"
                  />
                </div>
              </template>

              <!-- =============== CONTACT =============== -->
              <h6 class="text-uppercase text-muted fw-bold mt-4 mb-2" style="font-size: 12px; letter-spacing: 0.5px;">
                Contact
              </h6>

              <!-- Phone (the uniqueness-checked field) -->
              <div class="mb-3">
                <label style="font-size: 15px;" for="customerPhone" class="form-label fw-semibold text-dark mb-2">
                  Phone Number <span class="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  class="form-control"
                  placeholder="e.g. 0712 345 678"
                  v-model="customerPhone"
                  @input="handlePhoneTyping"
                  maxlength="20"
                  autocomplete="off"
                  required
                />
                <p class="text-muted d-block mt-2" v-if="!checkingCustomer" style="font-size: 13px;">
                  Important for sending receipts, updates, and offers.
                </p>
              </div>

              <!-- Spinner while checking -->
              <div
                v-if="checkingCustomer"
                class="d-flex align-items-center gap-2 mt-1 text-muted mb-3"
                style="font-size: 14px;"
              >
                <div class="spinner-border spinner-border-sm text-secondary"></div>
                Checking customer records...
              </div>

              <!-- Already exists warning -->
              <div
                v-if="customerExists"
                class="alert d-flex align-items-start gap-2 mt-1 alert-warning flex-column mb-3"
                style="background: #fff3cd; border: 1px solid #ffe69c; border-radius: 10px;"
                role="alert"
              >
                <div class="d-flex align-items-start gap-2 align-items-center">
                  <i class="mdi mdi-alert-circle-outline text-warning fs-5 mt-1"></i>
                  <div style="font-size: 14px;">
                    <p class="mb-0">
                      A customer with phone
                      <span class="fw-semibold">"{{ customerPhone }}"</span>
                      already exists
                      <span v-if="existingCustomerName">
                        — <span class="fw-semibold">{{ existingCustomerName }}</span>
                      </span>.
                    </p>
                  </div>
                </div>

                <button
                  v-if="props.showSelect"
                  @click="selectExistingCustomer"
                  type="button"
                  class="btn btn-link waves-effect"
                >
                  Use This Customer
                </button>
              </div>

              <!-- Email -->
              <div class="mb-3">
                <label style="font-size: 15px;" for="customerEmail" class="form-label fw-semibold text-dark mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  class="form-control"
                  placeholder="customer@example.com"
                  v-model="customerEmail"
                  maxlength="120"
                  autocomplete="off"
                />
                <p
                  v-if="emailInvalid"
                  class="text-danger mb-0 mt-1"
                  style="font-size: 13px;"
                >
                  Please enter a valid email address.
                </p>
              </div>

              <!-- Default address -->
              <div class="mb-3">
                <label style="font-size: 15px;" for="customerAddress" class="form-label fw-semibold text-dark mb-2">
                  Default Address
                </label>
                <textarea
                  id="customerAddress"
                  class="form-control"
                  placeholder="Building, street, area, city..."
                  rows="2"
                  v-model="customerAddress"
                  maxlength="255"
                ></textarea>
              </div>

              <!-- =============== PERSONAL (individual only) =============== -->
              <template v-if="customerType === 'individual'">
                <h6 class="text-uppercase text-muted fw-bold mt-4 mb-2" style="font-size: 12px; letter-spacing: 0.5px;">
                  Personal (Optional)
                </h6>

                <div class="row g-2 mb-3">
                  <div class="col-sm-6">
                    <label style="font-size: 15px;" for="customerGender" class="form-label fw-semibold text-dark mb-2">
                      Gender
                    </label>
                    <select
                      id="customerGender"
                      class="form-select"
                      v-model="customerGender"
                    >
                      <option value="">— Select —</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer_not_to_say">Prefer not to say</option>
                    </select>
                  </div>

                  <div class="col-sm-6">
                    <label style="font-size: 15px;" for="customerDob" class="form-label fw-semibold text-dark mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="customerDob"
                      class="form-control"
                      v-model="customerDob"
                      :max="todayIso"
                    />
                  </div>
                </div>
              </template>

              <!-- =============== PREFERENCES =============== -->
              <h6 class="text-uppercase text-muted fw-bold mt-4 mb-2" style="font-size: 12px; letter-spacing: 0.5px;">
                Preferences (Optional)
                <span
                  v-if="loadingMetadata"
                  class="spinner-border spinner-border-sm text-secondary ms-1"
                  style="width: 12px; height: 12px;"
                ></span>
              </h6>

              <!-- Preferred payment with datalist -->
              <div class="mb-3">
                <label style="font-size: 15px;" for="preferredPayment" class="form-label fw-semibold text-dark mb-2">
                  Preferred Payment Method
                </label>
                <input
                  type="text"
                  id="preferredPayment"
                  class="form-control"
                  list="preferredPaymentList"
                  placeholder="Pick existing or type new"
                  v-model="preferredPayment"
                  maxlength="50"
                  autocomplete="off"
                />
                <datalist id="preferredPaymentList">
                  <option v-for="p in availablePayments" :key="p" :value="p" />
                </datalist>
              </div>

              <!-- Tags (chip input with datalist) -->
              <div class="mb-3">
                <label style="font-size: 15px;" for="customerTagInput" class="form-label fw-semibold text-dark mb-2">
                  Tags
                </label>

                <input
                  type="text"
                  id="customerTagInput"
                  class="form-control"
                  list="customerTagsList"
                  placeholder="Type a tag and press Enter (e.g. VIP, regular)"
                  v-model="tagInput"
                  @keydown="handleTagKeydown"
                  @blur="commitPendingTag"
                  autocomplete="off"
                />
                <datalist id="customerTagsList">
                  <option
                    v-for="t in availableTags.filter(t => !customerTags.includes(t))"
                    :key="t"
                    :value="t"
                  />
                </datalist>

                <!-- Selected tag chips -->
                <div v-if="customerTags.length" class="d-flex flex-wrap gap-2 mt-2">
                  <span
                    v-for="(tag, idx) in customerTags"
                    :key="tag"
                    class="badge rounded-pill d-flex align-items-center gap-1"
                    style="background: #e7f1ff; color: #0d6efd; font-weight: 500; padding: 6px 10px; font-size: 13px;"
                  >
                    {{ tag }}
                    <button
                      type="button"
                      class="btn p-0 border-0"
                      style="background: transparent; line-height: 1;"
                      @click="removeTag(idx)"
                      aria-label="Remove tag"
                    >
                      <i class="bx bx-x" style="color: #0d6efd; font-size: 16px;"></i>
                    </button>
                  </span>
                </div>
              </div>

              <!-- Notes -->
              <div class="mb-0">
                <label style="font-size: 15px;" for="customerNotes" class="form-label fw-semibold text-dark mb-2">
                  Notes
                </label>
                <textarea
                  id="customerNotes"
                  class="form-control"
                  placeholder="Allergies, preferences, anything worth remembering..."
                  rows="3"
                  v-model="customerNotes"
                  maxlength="500"
                ></textarea>
              </div>
            </fieldset>
          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 px-4 pb-4 pt-2 d-flex justify-content-end gap-2">
          <button
            type="reset"
            form="customerForm"
            class="btn btn-link waves-effect fw-bold btn-lg"
            :disabled="customerAddLoading || !isDirty"
            @click="resetForm()"
          >
            {{ cancelText }}
          </button>

          <button
            type="submit"
            form="customerForm"
            class="btn btn-primary fw-semibold btn-lg"
            :disabled="
              customerAddLoading ||
              !isDirty ||
              customerExists ||
              checkingCustomer ||
              emailInvalid ||
              !canSubmit
            "
          >
            <span
              v-if="customerAddLoading"
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
    modal-id="clearCustomerFormModal"
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

import documentAPI from "@/api/document"

import ImageToast from "@/components/ImageToast.vue"
import ClearFormModal from "@/components/guards/ClearFormConfirm.vue"
import UnsavedChangesConfirm from "@/components/guards/UnsavedChangesConfirm.vue"
import SelectSearchBox from '@/components/SelectSearchBox.vue'

import successImage from "../../../assets/images/icons/check.png"
import errorImage from "../../../assets/images/icons/error.png"

import POSAPI from "@/api/POS.API";


const props = defineProps({
  title:       { type: String,  default: "Add New Customer" },
  cancelText:  { type: String,  default: "Clear Form" },
  confirmText: { type: String,  default: "Save Customer" },
  loading:     { type: Boolean, default: false },
  showSelect:  { type: Boolean, default: false }
})

const emit = defineEmits([
  "confirm",
  "cancel",
  "customer-added",
  "customer-selected"
])

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
const CUSTOMERS_API =  POSAPI.customers() // -> http://localhost/pos-api/customers

// -------------------- Modal + form state --------------------
const addCustomerModal  = ref(null)
const customerNameInput = ref(null)

const customerAddLoading = ref(false)

// Form fields
const customerType    = ref("individual") // 'individual' | 'business'
const customerName    = ref("")
const companyName     = ref("")
const contactPerson   = ref("")
const customerPhone   = ref("")
const customerEmail   = ref("")
const customerAddress = ref("")
const customerGender  = ref("")
const customerDob     = ref("")
const preferredPayment = ref("")
const customerTags    = ref([])      // committed chip tags
const tagInput        = ref("")      // current text in tag field
const customerNotes   = ref("")

// Existence-check state
const checkingCustomer    = ref(false)
const customerExists      = ref(false)
const customerIdToSelect  = ref(null)
const existingCustomerName = ref("")

// Metadata (datalist suggestions)
const availableTags     = ref([])
const availablePayments = ref([])
const loadingMetadata   = ref(false)

let debounceTimer = null

// -------------------- Computed --------------------
const todayIso = computed(() => new Date().toISOString().slice(0, 10))

const isDirty = computed(() =>
  customerName.value.trim()    !== "" ||
  companyName.value.trim()     !== "" ||
  contactPerson.value.trim()   !== "" ||
  customerPhone.value.trim()   !== "" ||
  customerEmail.value.trim()   !== "" ||
  customerAddress.value.trim() !== "" ||
  customerGender.value !== "" ||
  customerDob.value    !== "" ||
  preferredPayment.value.trim() !== "" ||
  customerTags.value.length > 0 ||
  tagInput.value.trim() !== "" ||
  customerNotes.value.trim() !== ""
)

const emailInvalid = computed(() => {
  const e = customerEmail.value.trim()
  if (!e) return false
  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
})

// What's needed to submit, beyond the universal flags
const canSubmit = computed(() => {
  if (!customerName.value.trim()) return false

   if (!customerPhone.value.trim()) return false

  if (customerType.value === "business" && !companyName.value.trim()) return false
  return true
})

// -------------------- Helpers --------------------
const focusCustomerName = async () => {
  await nextTick()
  setTimeout(() => {
    if (customerAddLoading.value) return
    customerNameInput.value?.focus()
  }, 10)
}

function clearFormValuesOnly() {
  customerType.value     = "individual"
  customerName.value     = ""
  companyName.value      = ""
  contactPerson.value    = ""
  customerPhone.value    = ""
  customerEmail.value    = ""
  customerAddress.value  = ""
  customerGender.value   = ""
  customerDob.value      = ""
  preferredPayment.value = ""
  customerTags.value     = []
  tagInput.value         = ""
  customerNotes.value    = ""
}

async function resetForm() {
  clearFormValuesOnly()
  customerExists.value      = false
  customerIdToSelect.value  = null
  existingCustomerName.value = ""
  await focusCustomerName()
}

// -------------------- Cancel / Clear confirmation --------------------
async function handleCancel() {
  if (!isDirty.value) {
    await resetForm()
    return
  }
  const modal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("clearCustomerFormModal"),
    { backdrop: "static", keyboard: false }
  )
  modal.show()
}

async function handleContinueEditing() {
  const clearModalEl = document.getElementById("clearCustomerFormModal")
  const clearModal = bootstrap.Modal.getInstance(clearModalEl)
  clearModal?.hide()
}

// -------------------- Tag chip handling --------------------
function commitPendingTag() {
  const t = tagInput.value.trim().replace(/,$/, "").trim()
  if (!t) return
  // Avoid duplicates (case-insensitive)
  const exists = customerTags.value.some(
    existing => existing.toLowerCase() === t.toLowerCase()
  )
  if (!exists) customerTags.value.push(t)
  tagInput.value = ""
}

function handleTagKeydown(event) {
  // Enter or comma → commit
  if (event.key === "Enter" || event.key === ",") {
    event.preventDefault()
    commitPendingTag()
    return
  }
  // Backspace on empty input → remove last chip
  if (event.key === "Backspace" && tagInput.value === "" && customerTags.value.length) {
    customerTags.value.pop()
  }
}

function removeTag(index) {
  customerTags.value.splice(index, 1)
}

// -------------------- Phone normalization --------------------
/**
 * Normalize a Kenyan-ish phone for comparison:
 *   "0712 345 678" -> "712345678"
 *   "+254712345678" -> "712345678"
 *   "254712345678"  -> "712345678"
 */
function normalizePhone(value) {
  if (!value) return ""
  let p = String(value).replace(/[\s\-()]/g, "")
  if (p.startsWith("+")) p = p.slice(1)
  if (p.startsWith("254")) p = p.slice(3)
  if (p.startsWith("0"))   p = p.slice(1)
  return p
}

// -------------------- Existence check --------------------
function extractList(resData) {
  if (Array.isArray(resData))         return resData
  if (Array.isArray(resData?.data))   return resData.data
  return []
}

async function checkCustomerExists(phoneValue) {
  const normalized = normalizePhone(phoneValue)

  // Need at least 7 meaningful digits before checking; below that is just typing
  if (!normalized || normalized.length < 7) {
    customerExists.value = false
    customerIdToSelect.value = null
    existingCustomerName.value = ""
    return false
  }

  try {
    checkingCustomer.value = true

    const res = await axios.get(CUSTOMERS_API, {
      params: { phone: phoneValue, limit: 200 }
    })

    const list = extractList(res.data)

    const match = list.find(
      c => normalizePhone(c?.phone) === normalized
    )

    if (match) {
      customerExists.value      = true
      customerIdToSelect.value  = match.id
      existingCustomerName.value = match.company_name || match.name || ""
    } else {
      customerExists.value      = false
      customerIdToSelect.value  = null
      existingCustomerName.value = ""
    }

    return !!match
  } catch (error) {
    console.error("Error checking customer existence:", error)
    customerExists.value = false
    return false
  } finally {
    checkingCustomer.value = false
  }
}

async function selectExistingCustomer() {
  if (!customerIdToSelect.value) return
  emit("customer-selected", customerIdToSelect.value)
  const modal = bootstrap.Modal.getInstance(addCustomerModal.value)
  modal?.hide()
}

function handlePhoneTyping() {
  customerExists.value = false
  customerIdToSelect.value = null
  existingCustomerName.value = ""

  const normalized = normalizePhone(customerPhone.value)
  if (normalized.length < 7) {
    checkingCustomer.value = false
    clearTimeout(debounceTimer)
    return
  }

  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    checkCustomerExists(customerPhone.value)
  }, 400)
}

// -------------------- Metadata (tags + payment methods) --------------------
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

function uniqueFlatTags(list) {
  const seen = new Set()
  const out  = []
  for (const item of list) {
    const tags = Array.isArray(item?.tags) ? item.tags : []
    for (const tag of tags) {
      const raw = String(tag ?? "").trim()
      if (!raw) continue
      const lower = raw.toLowerCase()
      if (seen.has(lower)) continue
      seen.add(lower)
      out.push(raw)
    }
  }
  return out.sort((a, b) => a.localeCompare(b))
}

async function loadCustomerMetadata() {
  try {
    loadingMetadata.value = true
    const res = await axios.get(CUSTOMERS_API, { params: { limit: 500 } })
    const list = extractList(res.data)

    availablePayments.value = uniqueValues(list, "preferred_payment")
    availableTags.value     = uniqueFlatTags(list)

    // Seed common payment methods if there's nothing yet — saves typing
    if (availablePayments.value.length === 0) {
      availablePayments.value = ["Cash", "M-Pesa", "Card", "Bank Transfer"]
    }
  } catch (error) {
    console.error("Failed to load customer metadata:", error)
    availablePayments.value = ["Cash", "M-Pesa", "Card", "Bank Transfer"]
    availableTags.value     = []
  } finally {
    loadingMetadata.value = false
  }
}

// -------------------- Save --------------------
async function handleConfirm(event) {
  //event?.preventDefault()

  const name = customerName.value.trim()

  if (!name) {
    showToast(
      "error",
      customerType.value === "business" ? "Account Name Required" : "Name Required",
      "Please enter a name before saving."
    )
    return
  }

  if (customerType.value === "business" && !companyName.value.trim()) {
    showToast("error", "Company Name Required", "Business customers need a company name.")
    return
  }

  if (emailInvalid.value) {
    showToast("error", "Invalid Email", "Please enter a valid email address or leave it blank.")
    return
  }

  // Make sure any half-typed tag is committed before we save
  commitPendingTag()

  // If a phone was provided, do a final fresh existence check
  if (customerPhone.value.trim()) {
    clearTimeout(debounceTimer)
    checkingCustomer.value = true
    const exists = await checkCustomerExists(customerPhone.value)

    if (exists) {
      showToast(
        "error",
        "Customer Already Exists",
        "A customer with this phone number is already on file."
      )
      return
    }
  }

  // Build payload — only send fields with a value so server defaults take effect.
  const payload = {
    name,
    customer_type: customerType.value,
  }

  if (customerType.value === "business") {
    payload.company_name = companyName.value.trim()
    if (contactPerson.value.trim()) payload.contact_person = contactPerson.value.trim()
  }

  if (customerPhone.value.trim())   payload.phone           = customerPhone.value.trim()
  if (customerEmail.value.trim())   payload.email           = customerEmail.value.trim()
  if (customerAddress.value.trim()) payload.default_address = customerAddress.value.trim()
  if (customerGender.value)         payload.gender          = customerGender.value
  if (customerDob.value)            payload.date_of_birth   = customerDob.value
  if (preferredPayment.value.trim()) payload.preferred_payment = preferredPayment.value.trim()
  if (customerTags.value.length)    payload.tags            = customerTags.value
  if (customerNotes.value.trim())   payload.notes           = customerNotes.value.trim()

  customerAddLoading.value = true
  NProgress.start()

  showToast("loading", "Saving Customer", "Please wait while we register the customer...")

  try {
    const res = await axios.post(CUSTOMERS_API, payload)
    const created = res.data?.data ?? res.data

    const displayName = created?.company_name || created?.name || name
    showToast(
      "success",
      "Customer Created",
      `<strong>${displayName}</strong> was registered successfully.`
    )

    const modal = bootstrap.Modal.getInstance(addCustomerModal.value)
    modal?.hide()

    emit("customer-added", created)
    if (created?.id) emit("customer-selected", created.id)

    // Refresh suggestions so any new tag/payment becomes a known option
    loadCustomerMetadata()
  } catch (error) {
    const apiData = error?.response?.data
    const fieldErrors = apiData?.errors
    const apiMessage =
      (fieldErrors && Object.values(fieldErrors)[0]) ||
      apiData?.error ||
      apiData?.message ||
      error?.message ||
      "Failed to create customer. Please try again."

    showToast("error", "Failed to Save Customer", apiMessage)
  } finally {
    NProgress.done()
    customerAddLoading.value = false
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

  if (!addCustomerModal.value) return
  const modalElement = addCustomerModal.value

  const onShown = () => {
    focusCustomerName()
    loadCustomerMetadata()
  }

  const onHidden = () => {
    customerExists.value = false
    customerIdToSelect.value = null
    existingCustomerName.value = ""
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