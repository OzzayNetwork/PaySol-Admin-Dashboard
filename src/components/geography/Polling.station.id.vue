<template>
  <!-- ============ Trigger card (matches your UI mock) ============ -->
  <div
  :class="selectedLabel != '' ? 'bg-success-soft border-success border-2' : ''"
    class="d-flex align-items-center justify-content-between p-3 rounded cursor-pointer"
    style="background: #f3f4f6; border: 1px solid #e5e7eb;"
    data-bs-toggle="modal"
    :data-bs-target="'#' + modalId"
    @click="openModal"
  >
    <div class="d-flex align-items-center gap-3">
      <i class="mdi mdi-map-marker fs-2 text-dark"></i>
      <div>
        <h6 class="mb-0 fw-bold text-dark">
          {{ selectedLabel ? 'Assigned Polling Station' : 'Assign a Polling Station to the User' }}
        </h6>
        <small class="text-muted fst-italic" v-if="!selectedLabel">
          Polling station Not assigned
        </small>
        <div v-else class="mt-1">
          <span class="fw-semibold text-dark">{{ selectedLabel }}</span>
          <div class="text-muted" style="font-size: 13px;" v-if="selectedBreadcrumb">
            {{ selectedBreadcrumb }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex gap-3 align-items-center">
        <div @click="resetSelection" v-if="selectedLabel!=''" class="text-danger">Reset Selection</div>
        <i class="mdi mdi-chevron-right fs-3 text-dark"></i>
    </div>
  </div>

  <!-- ============ Modal ============ -->
  <div
    class="modal fade text-dark"
    :id="modalId"
    tabindex="-1"
    aria-hidden="true"
    ref="modalEl"
  >
    <div class="modal-dialog modal-dialog-centered" style="max-width: 560px;">
      <div class="modal-content shadow-lg border-0" style="border-radius: 12px;">

        <!-- Header -->
        <div class="modal-header border-0 px-4 pt-4 pb-2">
          <h5 class="modal-title fw-bold text-black fs-4 mb-1">
            <i class="mdi mdi-map-marker text-primary me-1"></i>
            <span>Assign Polling Station</span>
          </h5>
          <button
            type="button"
            class="btn p-0 border-0"
            data-bs-dismiss="modal"
            aria-label="Close"
            style="width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.05);display:grid;place-items:center;"
          >
            <i class="bx bx-x text-dark" style="font-size:22px;line-height:1;"></i>
          </button>
        </div>

        <!-- Body — the cascade -->
        <div class="modal-body px-4 pt-2 pb-3">
          <p class="text-muted mb-4" style="font-size: 14px;">
            Drill down from county to the specific polling station.
          </p>

          <!-- County -->
          <div class="mb-3">
            <label class="form-label fw-semibold text-dark mb-2" style="font-size: 15px;">
              County <span class="text-danger">*</span>
            </label>
            <SelectSearchBox
              v-model="draft.county"
              :options="countyOptions"
              :placeholder="loading.counties ? 'Loading counties...' : 'Select a county'"
              :disabled="loading.counties"
              @update:modelValue="onCountyChange"
            />
          </div>

          <!-- Constituency -->
          <div class="mb-3">
            <label class="form-label fw-semibold text-dark mb-2" style="font-size: 15px;">
              Constituency <span class="text-danger">*</span>
            </label>
            <SelectSearchBox
              v-model="draft.constituency"
              :options="constituencyOptions"
              :placeholder="constituencyPlaceholder"
              :disabled="!draft.county || loading.constituencies"
              @update:modelValue="onConstituencyChange"
            />
          </div>

          <!-- Ward -->
          <div class="mb-3">
            <label class="form-label fw-semibold text-dark mb-2" style="font-size: 15px;">
              Ward <span class="text-danger">*</span>
            </label>
            <SelectSearchBox
              v-model="draft.ward"
              :options="wardOptions"
              :placeholder="wardPlaceholder"
              :disabled="!draft.constituency || loading.wards"
              @update:modelValue="onWardChange"
            />
          </div>

          <!-- Polling Station -->
          <div class="mb-0">
            <label class="form-label fw-semibold text-dark mb-2" style="font-size: 15px;">
              Polling Station <span class="text-danger">*</span>
            </label>
            <SelectSearchBox
              v-model="draft.stationId"
              :options="stationOptions"
              :placeholder="stationPlaceholder"
              :disabled="!draft.ward || loading.stations"
              @update:modelValue="onStationChange"
            />
            <p class="text-muted d-block mt-2" v-if="draft.ward && !loading.stations && stationOptions.length">
              {{ stationOptions.length }} station(s) in this ward.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 px-4 pb-4 pt-2 d-flex justify-content-end gap-2">
          <button
            type="button"
            class="btn btn-link waves-effect fw-bold btn-lg"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary fw-semibold btn-lg"
            :disabled="!draft.stationId"
            @click="confirmSelection"
          >
            Confirm Station
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue"
import SelectSearchBox from "@/components/SelectSearchBox.vue"
import geographyApi from "@/api/geography"

/* ------------------------------------------------------------------
 * Contract: v-model on the polling_station_id (integer or null).
 * The parent binds:  <PollingStationPicker v-model="form.polling_station_id" />
 * ------------------------------------------------------------------ */
const props = defineProps({
  modelValue: { type: [Number, String, null], default: null },
  modalId: { type: String, default: "pollingStationModal" },
})
const emit = defineEmits(["update:modelValue"])

const modalEl = ref(null)

/* ---------- Display state (the trigger card) ---------- */
const selectedLabel = ref("")        // e.g. "BOMU PRIMARY SCHOOL — Stream 1"
const selectedBreadcrumb = ref("")   // e.g. "Port Reitz · Changamwe · Mombasa"

/* ---------- Draft selection (inside the modal) ---------- */
const draft = reactive({
  county: null,        // slug
  constituency: null,  // slug
  ward: null,          // slug
  stationId: null,     // id (final value)
})

/* ---------- Raw option lists from the API ---------- */
const counties = ref([])
const constituencies = ref([])
const wards = ref([])
const stations = ref([])

const loading = reactive({
  counties: false,
  constituencies: false,
  wards: false,
  stations: false,
})

/* ---------- SelectSearchBox options (label/value shape) ---------- */
// vue3-select-component expects { label, value } objects.
const countyOptions = computed(() =>
  counties.value.map(c => ({ label: c.name, value: c.slug }))
)
const constituencyOptions = computed(() =>
  constituencies.value.map(c => ({ label: c.name, value: c.slug }))
)
const wardOptions = computed(() =>
  wards.value.map(w => ({ label: w.name, value: w.slug }))
)
const stationOptions = computed(() =>
  stations.value.map(s => ({
    label: `${s.name} — Stream ${s.stream_number} (${s.code})`,
    value: s.id,
  }))
)

/* ---------- Placeholders that reflect cascade state ---------- */
const constituencyPlaceholder = computed(() =>
  loading.constituencies ? "Loading..." :
  draft.county ? "Select a constituency" : "Select a county first"
)
const wardPlaceholder = computed(() =>
  loading.wards ? "Loading..." :
  draft.constituency ? "Select a ward" : "Select a constituency first"
)
const stationPlaceholder = computed(() =>
  loading.stations ? "Loading..." :
  draft.ward ? "Select a polling station" : "Select a ward first"
)

/* ---------- Lifecycle: load counties when the modal opens ---------- */
function openModal() {
  if (counties.value.length === 0) loadCounties()
}

async function loadCounties() {
  loading.counties = true
  try {
    const { data } = await geographyApi.counties()
    counties.value = data.data
  } catch (e) {
    console.error("Failed to load counties:", e)
  } finally {
    loading.counties = false
  }
}

/* ---------- Cascade handlers ---------- */
async function onCountyChange(slug) {
  draft.county = slug
  // reset everything downstream
  draft.constituency = null
  draft.ward = null
  draft.stationId = null
  constituencies.value = []
  wards.value = []
  stations.value = []

  if (!slug) return

  loading.constituencies = true
  try {
    const { data } = await geographyApi.constituencies(slug)
    constituencies.value = data.data
  } catch (e) {
    console.error("Failed to load constituencies:", e)
  } finally {
    loading.constituencies = false
  }
}

async function onConstituencyChange(slug) {
  draft.constituency = slug
  draft.ward = null
  draft.stationId = null
  wards.value = []
  stations.value = []

  if (!slug) return

  loading.wards = true
  try {
    const { data } = await geographyApi.wards(slug)
    wards.value = data.data
  } catch (e) {
    console.error("Failed to load wards:", e)
  } finally {
    loading.wards = false
  }
}

async function onWardChange(slug) {
  draft.ward = slug
  draft.stationId = null
  stations.value = []

  if (!slug) return

  loading.stations = true
  try {
    const { data } = await geographyApi.pollingStations({ ward: slug, limit: 500 })
    stations.value = data.data
  } catch (e) {
    console.error("Failed to load polling stations:", e)
  } finally {
    loading.stations = false
  }
}

function onStationChange(id) {
  draft.stationId = id
}

/* ---------- Confirm: emit the value + update the card ---------- */
function confirmSelection() {
  if (!draft.stationId) return

  const station = stations.value.find(s => s.id === draft.stationId)
  const county = counties.value.find(c => c.slug === draft.county)
  const constituency = constituencies.value.find(c => c.slug === draft.constituency)
  const ward = wards.value.find(w => w.slug === draft.ward)

  // Update the trigger-card display
  selectedLabel.value = station
    ? `${station.name} — Stream ${station.stream_number} (${station.code})`
    : ""
  selectedBreadcrumb.value = [ward?.name, constituency?.name, county?.name]
    .filter(Boolean)
    .join(" · ")

  // Emit the id up to the parent form
  emit("update:modelValue", draft.stationId)

  // Close the Bootstrap modal
  const modal = bootstrap.Modal.getInstance(modalEl.value)
  modal?.hide()
}

function resetSelection() {
  draft.county = null
  draft.constituency = null
  draft.ward = null
  draft.stationId = null
  selectedLabel.value = ""
  selectedBreadcrumb.value = ""
}
</script>