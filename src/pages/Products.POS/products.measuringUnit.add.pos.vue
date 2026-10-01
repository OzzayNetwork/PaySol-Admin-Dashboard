<template>
  <!-- Modal -->
  <div
    class="modal fade text-dark"
    id="addMeasuringUnitModal"
    tabindex="-1"
    aria-labelledby="addMeasuringUnitModalLabel"
    aria-hidden="true"
    ref="addMeasuringUnitModal"
  >
    <div class="modal-dialog modal-dialog-centered" style="max-width: 560px;">
      <div class="modal-content shadow-lg border-0" style="border-radius: 12px;">

        <!-- Header -->
        <div class="modal-header border-0 px-4 pt-4 pb-2">
          <h5 class="modal-title fw-bold text-black fs-4 mb-1" id="addMeasuringUnitModalLabel">
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
          <form id="measuringUnitForm" @submit.prevent="handleConfirm">
            <fieldset :disabled="measuringUnitAddLoading">

              <!-- Unit Name -->
              <div class="mb-3">
                <label
                  for="unitName"
                  class="form-label fw-semibold text-dark mb-2"
                  style="font-size: 15px;"
                >
                  Unit Name <span class="text-danger">*</span>
                </label>

                <input
                  type="text"
                  id="unitName"
                  class="form-control"
                  placeholder="Enter unit name e.g. Kilogram, Box, Piece"
                  ref="unitNameInput"
                  v-model="unitName"
                  @input="handleUnitTyping"
                  required
                />

                <p class="text-muted d-block mt-2 mb-0" v-if="!checkingUnit">
                  Use a clear and recognizable measuring unit name.
                </p>
              </div>

              <!-- Checking duplicate -->
              <div
                v-if="checkingUnit"
                class="d-flex align-items-center gap-2 mt-3 text-muted mb-3"
                style="font-size: 14px;"
              >
                <div class="spinner-border spinner-border-sm text-secondary"></div>
                Checking measuring unit availability...
              </div>

              <!-- Duplicate Warning -->
              <div
                v-if="unitExists"
                class="alert d-flex align-items-start gap-2 mt-3 alert alert-warning flex-column"
                style="background: #fff3cd; border: 1px solid #ffe69c; border-radius: 10px;"
                role="alert"
              >
                <div class="d-flex align-items-start gap-2">
                  <i class="mdi mdi-alert-circle-outline text-warning fs-5 mt-1"></i>

                  <div style="font-size: 14px;">
                    <p class="mb-0">
                      The measuring unit
                      <span class="fw-semibold">"{{ unitName }}"</span>
                      already exists. Please use a different name.
                    </p>
                  </div>
                </div>

                <button
                  v-if="props.showSelect"
                  @click="selectExistingUnit"
                  type="button"
                  class="btn btn-link waves-effect"
                >
                  Select This Measuring Unit
                </button>
              </div>

              <!-- Symbol -->
              <div class="mb-3">
                <label
                  for="unitSymbol"
                  class="form-label fw-semibold text-dark mb-2"
                  style="font-size: 15px;"
                >
                  Symbol / Code <span class="text-danger">*</span>
                </label>

                <input
                  type="text"
                  id="unitSymbol"
                  class="form-control"
                  placeholder="Enter symbol e.g. kg, g, l, ml, pc, bx"
                  v-model="unitSymbol"
                  @input="unitSymbol = formatSymbol(unitSymbol)"
                  required
                />
              </div>

              <!-- Category -->
              <div class="mb-3">
                <label
                  for="unitCategory"
                  class="form-label fw-semibold text-dark mb-2"
                  style="font-size: 15px;"
                >
                  Unit Category <span class="text-danger">*</span>
                </label>

                <select
                  id="unitCategory"
                  class="form-select"
                  v-model="unitCategory"
                  required
                >
                  <option disabled value="">Select unit category</option>
                  <option value="weight">Weight</option>
                  <option value="volume">Volume</option>
                  <option value="count">Count</option>
                  <option value="length">Length</option>
                  <option value="area">Area</option>
                  <option value="packaging">Packaging</option>
                </select>
              </div>

              <!-- Unit Setup -->
              <div class="mb-3">
                <label
                  class="form-label fw-semibold text-dark mb-2 d-block"
                  style="font-size: 15px;"
                >
                  Unit Setup <span class="text-danger">*</span>
                </label>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="basicUnit"
                    value="basic"
                    v-model="unitMode"
                  />
                  <label class="form-check-label" for="basicUnit">
                    Basic Unit
                  </label>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="derivedUnit"
                    value="derived"
                    v-model="unitMode"
                  />
                  <label class="form-check-label" for="derivedUnit">
                    Derived Unit
                  </label>
                </div>

                <p class="text-muted d-block mt-2 mb-0">
                  Use a derived unit when this unit depends on another one, e.g. 1 box = 12 pieces.
                </p>
              </div>

              <!-- Base Unit -->
              <div class="mb-3" v-if="unitMode === 'derived'">
                <label
                  for="baseUnitId"
                  class="form-label fw-semibold text-dark mb-2"
                  style="font-size: 15px;"
                >
                  Base Unit <span class="text-danger">*</span>
                </label>

                <select
                  id="baseUnitId"
                  class="form-select"
                  v-model="baseUnitId"
                  required
                >
                  <option disabled value="">Select base unit</option>
                  <option
                    v-for="unit in filteredBaseUnitOptions"
                    :key="unit.id"
                    :value="unit.id"
                    class="text-capitalize"
                  >
                    {{ unit.name }} <span v-if="unit.symbol" class="text-uppercase">({{ unit.symbol }})</span>
                  </option>
                </select>

                <p class="text-muted d-block mt-2 mb-0">
                  Choose the unit this one is built from.
                </p>
              </div>

              <!-- Conversion Factor -->
              <div class="mb-3" v-if="unitMode === 'derived'">
                <label
                  for="conversionFactor"
                  class="form-label fw-semibold text-dark mb-2"
                  style="font-size: 15px;"
                >
                  Conversion Factor <span class="text-danger">*</span>
                </label>

                <input
                  type="number"
                  id="conversionFactor"
                  class="form-control"
                  placeholder="Enter conversion factor e.g. 12"
                  v-model="conversionFactor"
                  step="any"
                  required
                />

                <p class="text-muted d-block mt-2 mb-0">
                  Example: 1 box = 12 pieces, so the conversion factor is 12.
                </p>
              </div>

              <!-- Preview -->
              <div
                v-if="unitMode === 'derived' && unitName && selectedBaseUnitName && conversionFactor"
                class="alert alert-light border mb-3"
              >
                <strong>Preview:</strong>
                1 {{ unitName }} = {{ conversionFactor }} {{ selectedBaseUnitName }}
              </div>

              <!-- Description -->
              <div class="mb-0">
                <label
                  for="unitDescription"
                  class="form-label fw-semibold text-dark mb-2"
                  style="font-size: 15px;"
                >
                  Description
                </label>

                <textarea
                  id="unitDescription"
                  class="form-control"
                  placeholder="Add a short note about this measuring unit..."
                  rows="3"
                  v-model="unitDescription"
                ></textarea>
              </div>
            </fieldset>
          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 px-4 pb-4 pt-2 d-flex justify-content-end gap-2">
          <button
            type="button"
            class="btn btn-link waves-effect fw-bold btn-lg"
            :disabled="measuringUnitAddLoading || !isDirty"
            @click="resetForm"
          >
            {{ cancelText }}
          </button>

          <button
            type="submit"
            form="measuringUnitForm"
            class="btn btn-primary fw-semibold btn-lg"
            :disabled="measuringUnitAddLoading || !isDirty || unitExists || checkingUnit"
          >
            <span
              v-if="measuringUnitAddLoading"
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
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onBeforeUnmount, defineProps, defineEmits } from "vue"
import axios from "axios"
import NProgress from "nprogress"

import POSAPI from "@/api/POS.API"
import ImageToast from "@/components/ImageToast.vue"
import successImage from "../../assets/images/icons/check.png"
import errorImage from "../../assets/images/icons/error.png"
import { useAuthStore } from "@/stores/auth"

const authStore = useAuthStore()

const MEASURING_UNIT_API = POSAPI.measuringUnits()

const props = defineProps({
  title: { type: String, default: "Add Measuring Unit" },
  cancelText: { type: String, default: "Clear Form" },
  confirmText: { type: String, default: "Save Measuring Unit" },
  showSelect: { type: Boolean, default: false }
})

const emit = defineEmits([
  "unit-added",
  "unit-selected",
  "confirm",
  "cancel"
])

// refs
const addMeasuringUnitModal = ref(null)
const unitNameInput = ref(null)

const measuringUnitAddLoading = ref(false)

const unitName = ref("")
const unitSymbol = ref("")
const unitCategory = ref("")
const unitDescription = ref("")
const unitSymbolForMatch=ref("")

const unitMode = ref("basic") // basic | derived
const baseUnitId = ref("")
const conversionFactor = ref("")

const baseUnitOptions = ref([])

const checkingUnit = ref(false)
const unitExists = ref(false)
const unitIdToSelect = ref(null)

const toastStatus = ref(null)
const toastTitle = ref("")
const toastMessage = ref("")
const toastImage = ref(null)

let debounceTimer = null

function showToast(status, title, message) {
  toastStatus.value = status
  toastTitle.value = title
  toastMessage.value = message
  toastImage.value = status === "success" ? successImage : status === "error" ? errorImage : null
}

function formatSymbol(value) {
  return String(value || "")
    .trimStart()
    .replace(/\s+/g, "")
   
}

const isDirty = computed(() => {
  return (
    unitName.value.trim() !== "" ||
    unitSymbol.value.trim() !== "" ||
    unitCategory.value.trim() !== "" ||
    unitDescription.value.trim() !== "" ||
    unitMode.value !== "basic" ||
    baseUnitId.value !== "" ||
    conversionFactor.value !== ""
  )
})

const selectedBaseUnit = computed(() => {
  return baseUnitOptions.value.find(unit => String(unit.id) === String(baseUnitId.value)) || null
})

const selectedBaseUnitName = computed(() => {
  return selectedBaseUnit.value?.name || ""
})

const filteredBaseUnitOptions = computed(() => {
  const currentName = unitName.value.trim().toLowerCase()
  return baseUnitOptions.value.filter(unit => {
    const unitNameValue = String(unit?.name || "").trim().toLowerCase()
    return unitNameValue && unitNameValue !== currentName
  })
})

async function focusUnitName() {
  await nextTick()
  setTimeout(() => {
    unitNameInput.value?.focus()
  }, 50)
}

function clearFormValuesOnly() {
  unitName.value = ""
  unitSymbol.value = ""
  unitCategory.value = ""
  unitDescription.value = ""
  unitMode.value = "basic"
  baseUnitId.value = ""
  conversionFactor.value = ""
  unitExists.value = false
  unitIdToSelect.value = null
}

async function resetForm() {
  clearFormValuesOnly()
  await focusUnitName()
}

async function fetchBaseUnits() {
  try {
    const res = await axios.get(MEASURING_UNIT_API)
    const list = Array.isArray(res.data) ? res.data : []

    baseUnitOptions.value = list.filter(unit => unit?.id)
  } catch (error) {
    console.error("Error fetching base units:", error)
    baseUnitOptions.value = []
  }
}

async function checkUnitExists(name) {
  const q = String(name || "").trim()

  if (!q) {
    unitExists.value = false
    unitIdToSelect.value = null
    return false
  }

  try {
    checkingUnit.value = true

    const res = await axios.get(MEASURING_UNIT_API)
    const list = Array.isArray(res.data) ? res.data : []

    const match = list.find(unit =>
      String(unit?.name || "").trim().toLowerCase() === q.toLowerCase()
    )

    unitExists.value = !!match
    unitIdToSelect.value = match?.id || null
    unitSymbolForMatch.value=match?.symbol||null
    //alert(match?.symbol)

    return !!match
  } catch (error) {
    console.error("Error checking measuring unit existence:", error)
    unitExists.value = false
    unitIdToSelect.value = null
    return false
  } finally {
    checkingUnit.value = false
  }
}

function handleUnitTyping() {
  unitExists.value = false
  unitIdToSelect.value = null

  clearTimeout(debounceTimer)

  const q = unitName.value.trim()
  if (q.length < 2) {
    checkingUnit.value = false
    return
  }

  debounceTimer = setTimeout(() => {
    checkUnitExists(q)
  }, 400)
}

function selectExistingUnit() {
  if (!unitIdToSelect.value) return

  emit("unit-selected", unitSymbolForMatch.value)

  const modal = bootstrap.Modal.getInstance(addMeasuringUnitModal.value)
  modal?.hide()
}

async function handleConfirm(event) {
  event?.preventDefault()

  const name = unitName.value.trim()
  const symbol = formatSymbol(unitSymbol.value)
  const category = unitCategory.value.trim()

  unitSymbol.value = symbol

  if (!name) {
    showToast("error", "Unit Name Required", "Please enter a measuring unit name before saving.")
    return
  }

  if (!symbol) {
    showToast("error", "Symbol Required", "Please enter a symbol or short code for this measuring unit.")
    return
  }

  if (!category) {
    showToast("error", "Category Required", "Please select a category for this measuring unit.")
    return
  }

  if (unitMode.value === "derived") {
    if (!baseUnitId.value) {
      showToast("error", "Base Unit Required", "Please select the base unit for this derived measuring unit.")
      return
    }

    if (!conversionFactor.value || Number(conversionFactor.value) <= 0) {
      showToast("error", "Invalid Conversion Factor", "Please enter a conversion factor greater than 0.")
      return
    }
  }

  clearTimeout(debounceTimer)
  const exists = await checkUnitExists(name)

  if (exists) {
    showToast(
      "error",
      "Measuring Unit Already Exists",
      "A measuring unit with this name already exists. Please use a different name."
    )
    return
  }

  measuringUnitAddLoading.value = true
  NProgress.start()

  showToast(
    "loading",
    "Saving Measuring Unit",
    "Please wait while we save the measuring unit..."
  )

  try {
    const payload = {
      name,
      symbol,
      category,
      description: unitDescription.value.trim(),
      unitMode: unitMode.value,
      isDerived: unitMode.value === "derived",
      baseUnitId: unitMode.value === "derived" ? baseUnitId.value : null,
      conversionFactor: unitMode.value === "derived" ? Number(conversionFactor.value) : null,
      createdAt: new Date().toISOString(),
      createdBy: {
        fname: authStore.user?.first_name || "",
        lname: authStore.user?.last_name || "",
        userId: authStore.user?.id || "",
        avatar: authStore.user?.avatar || ""
      }
    }

    const res = await axios.post(MEASURING_UNIT_API, payload)

    showToast(
      "success",
      "Measuring Unit Created Successfully 🎉",
      `<strong>${res.data?.name || name}</strong> has been added successfully.`
    )

    emit("unit-added", res.data)
    emit("unit-selected", res.data?.symbol)
    emit("confirm", res.data)

    const modal = bootstrap.Modal.getInstance(addMeasuringUnitModal.value)
    modal?.hide()
  } catch (error) {
    const apiMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to save the measuring unit. Please try again."

    showToast("error", "Unable to Save Measuring Unit", apiMessage)
    console.error(error)
  } finally {
    measuringUnitAddLoading.value = false
    NProgress.done()
  }
}

function handleModalShown() {
  fetchBaseUnits()
  focusUnitName()
}

function handleModalHidden() {
  clearFormValuesOnly()
}

onMounted(() => {
  fetchBaseUnits()

  const modalElement = addMeasuringUnitModal.value
  if (!modalElement) return

  modalElement.addEventListener("shown.bs.modal", handleModalShown)
  modalElement.addEventListener("hidden.bs.modal", handleModalHidden)
})

onBeforeUnmount(() => {
  clearTimeout(debounceTimer)

  const modalElement = addMeasuringUnitModal.value
  if (!modalElement) return

  modalElement.removeEventListener("shown.bs.modal", handleModalShown)
  modalElement.removeEventListener("hidden.bs.modal", handleModalHidden)
})
</script>