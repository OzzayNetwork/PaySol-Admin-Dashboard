<template>
  <SingleToastVue
    :toastType="toastType"
    :toastMessage="toastMessage"
    toastBtnId="uploadContactsBtnToast"
    toastElId="uploadContactsToast"
    />
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="csvUploadModal"
      tabindex="-1"
      aria-labelledby="csvUploadModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
  data-bs-keyboard="false"
    >
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content p-0">
          <div class="modal-header justify-content-between flex-wrap gap-2">
            <div>
              <h5 class="modal-title mb-0" id="csvUploadModalLabel">
                Field Mapping for Uploaded Contacts
              </h5>
              <p class="text-muted mb-0">
                From: <span class="text-info">{{ fileName }}</span>
              </p>
            </div>
            
          </div>

          <div class="modal-body">
            <!-- Warning Alert: No phone or email selected -->
            <div
              v-if="!selectedPhoneField && !selectedEmailField && !isLoading && (parsedContacts.length > 0 || hasErrors)"
              class="alert alert-warning alert-dismissible fade show d-flex align-items-start gap-2 p-3 border-warning"
              role="alert"
            >
              <i class="bx bx-error-circle fs-4 text-warning"></i>
              <div>
                <strong>Heads up!</strong>
                Neither <strong>Phone Number</strong> nor
                <strong>Email Address</strong> columns were detected.
                <br />
                Please select at least one in the field mapping section below to
                enable sending messages.
              </div>
              <button
                type="button"
                class="btn-close position-absolute end-0 top-0 m-3"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>

            <!-- Enhanced Success Alert -->
            <div
              v-if="!isLoading && (parsedContacts.length > 0 || hasErrors) && !alertDismissed"
              :key="alertKey"
              class="alert fade show d-flex flex-column p-0 enhanced-success-card border border-1 border-success-subtle"
              :class="hasErrors ? 'alert-danger' : 'alert-success'"
              role="alert"
            >
              <div class="d-flex border-bottom border-bottom-1 p-3 border-success-subtle mb-0">
                <div class="d-flex gap-2 align-items-center mb-0"> 
                  <div>
                    <img src="../assets/images/icons/sheet-2.png" class="img" style="height: 70px;" alt="">
                  </div>
                  <div>
                    <p class="fw-semibold text-black fs-6 mb-0">{{ fileName }} ({{ hasErrors ? 'Upload Failed' : 'Uploaded Successfully' }})</p>
                    <p class="mb-0">
                      {{ formatFileSize(props.file?.size) }} <strong class="fs-5">•</strong> 
                      {{ parsedContacts.length }} Entries
                      <span v-if="validationStats.phone.total > 0">
                        <strong>•</strong> {{ validationStats.phone.total }} Phone Numbers
                      </span>
                      <span v-if="validationStats.email.total > 0">
                        <strong>•</strong> {{ validationStats.email.total }} Email Addresses
                      </span>
                    </p>
                    <label
                      :for="fileInputId"
                      type="button"
                      class="btn btn-info waves-effect btn-label waves-light m-0 btn-sm mt-1 d-none"
                    >
                      <i class="bx bx-file label-icon"></i> Change Contacts Source
                    </label>
                  </div>
                </div>
              </div>

              <div class="col-12 px-3  p-3 border-success-subtle">
                <div class="row">
                  <!-- Phone Number Validation -->
                  <div class="col-4">
                    <div class="py-0">
                      <div v-if="selectedPhoneField">
                        <span class="bg fs-6 p-2 px-3 text-white d-flex align-items-center gap-2" 
                              :class="validationStats.phone.valid > 0 ? 'bg-success' : 'bg-danger'">
                          <span>
                            <i class="mdi mdi-phone-check fs-4"></i> 
                            Phone No. Field: <strong>{{ selectedPhoneField }}</strong>
                          </span>
                        </span>
                      </div>
                      <div v-else>
                        <span class="bg fs-6 p-2 px-3 text-white bg-dark bg-opacity-75 d-flex align-items-center gap-2">
                          <span>
                            <i class="mdi mdi-phone-remove fs-4"></i> 
                            Phone Field: <strong>Not Identified</strong>
                          </span>
                        </span>
                      </div>

                      <div class="p-3 py-2 pt-3 bg-white border-bottom border-success border-2 position-relative">
                        <div>
                          <select 
                            class="form-select" 
                            v-model="selectedPhoneField" 
                            @change="onFieldChange('phone')"
                            :disabled="fieldLoading.phone"
                          >
                            <option value="" inactive>-- Choose Column --</option>
                            <option
                              v-for="(header, index) in tableHeaders"
                              :key="'phone-' + index"
                              :value="header"
                            >
                              {{ header }}
                            </option>
                          </select>
                          
                          <!-- Loading overlay -->
                          <div v-if="fieldLoading.phone" class="field-loading-overlay">
                            <div class="skeleton-loader"></div>
                          </div>
                          
                          <!-- Recommendations -->
                          <div class="recommendations-container mt-2">
                            <div v-if="fieldLoading.phone" class="recommendation-skeleton">
                              <div class="skeleton-text"></div>
                              <div class="skeleton-text short"></div>
                            </div>
                            <div v-else class="recommendation-content">
                              <p class="mb-0 pb-0 p-0 fw-semibold text-muted fs-7">
                                <i class="bx bx-bulb text-warning"></i> Recommendations
                              </p>
                              <div class="recommendations-list">
                                <div v-for="(rec, index) in phoneRecommendations" :key="'phone-rec-' + index" 
                                     class="recommendation-item" :class="'rec-' + rec.type">
                                  <i :class="rec.icon" class="me-1"></i>
                                  <span v-html="rec.text"></span>
                                  <button v-if="rec.action" 
                                          @click="rec.action()" 
                                          class="btn btn-sm btn-outline-primary ms-2 px-2 py-0">
                                    {{ rec.actionText }}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Statistics with skeleton loading -->
                      <div v-if="fieldLoading.phone" class="stats-skeleton-list">
                        <div class="list-group">
                          <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="stats-skeleton-text"></div>
                            <div class="stats-skeleton-badge"></div>
                          </div>
                          <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="stats-skeleton-text"></div>
                            <div class="stats-skeleton-badge"></div>
                          </div>
                          <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="stats-skeleton-text"></div>
                            <div class="stats-skeleton-badge"></div>
                          </div>
                          <div class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="stats-skeleton-text bold"></div>
                            <div class="stats-skeleton-badge"></div>
                          </div>
                        </div>
                      </div>
                      <ul v-else class="list-group validation-stats-list">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          <span>Valid Entries</span>
                          <span class="badge badge-success badge-pill animated-badge">
                            {{ selectedPhoneField ? validationStats.phone.valid : 0 }}
                          </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          <span>Invalid Entries</span>
                          <span class="badge badge-danger badge-pill animated-badge">
                            {{ selectedPhoneField ? validationStats.phone.invalid : 0 }}
                          </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          <span>Empty Entries</span>
                          <span class="badge badge-warning badge-pill animated-badge">
                            {{ selectedPhoneField ? validationStats.phone.empty : 0 }}
                          </span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          <span class="fw-bold">Total</span>
                          <span class="badge badge-dark badge-pill animated-badge fw-bold">
                            {{ selectedPhoneField ? validationStats.phone.total : 0 }}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Email Validation -->
                  <div class="col-4">
                    <div class="py-0">
                      <div v-if="selectedEmailField">
                        <span class="bg fs-6 p-2 px-3 text-white d-flex align-items-center gap-2"
                              :class="validationStats.email.valid > 0 ? 'bg-success' : 'bg-danger'">
                          <span>
                            <i class="mdi mdi-email-check fs-4"></i> 
                            Email Field: <strong>{{ selectedEmailField }}</strong>
                          </span>
                        </span>
                      </div>
                      <div v-else>
                        <span class="bg fs-6 p-2 px-3 text-white bg-dark d-flex align-items-center gap-2 bg-opacity-75">
                          <span>
                            <i class="mdi mdi-email-remove fs-4"></i> 
                            Email Field: <strong>Not Identified</strong>
                          </span>
                        </span>
                      </div>

                      <div class="p-3 py-2 pt-3 bg-white border-bottom border-success border-2 position-relative">
                        <div>
                          <select 
                            class="form-select" 
                            v-model="selectedEmailField" 
                            @change="onFieldChange('email')"
                            :disabled="fieldLoading.email"
                          >
                            <option value="">-- Choose Column --</option>
                            <option
                              v-for="(header, index) in tableHeaders"
                              :key="'email-' + index"
                              :value="header"
                            >
                              {{ header }}
                            </option>
                          </select>
                          
                          <!-- Loading overlay -->
                          <div v-if="fieldLoading.email" class="field-loading-overlay">
                            <div class="skeleton-loader"></div>
                          </div>
                          
                          <!-- Recommendations -->
                          <div class="recommendations-container mt-2">
                            <div v-if="fieldLoading.email" class="recommendation-skeleton">
                              <div class="skeleton-text"></div>
                              <div class="skeleton-text short"></div>
                            </div>
                            <div v-else class="recommendation-content">
                              <p class="mb-0 pb-0 p-0 fw-semibold text-muted fs-7">
                                <i class="bx bx-bulb text-warning"></i> Recommendations
                              </p>
                              <div class="recommendations-list">
                                <div v-for="(rec, index) in emailRecommendations" :key="'email-rec-' + index" 
                                     class="recommendation-item" :class="'rec-' + rec.type">
                                  <i :class="rec.icon" class="me-1"></i>
                                  <span v-html="rec.text"></span>
                                  <button v-if="rec.action" 
                                          @click="rec.action()" 
                                          class="btn btn-sm btn-outline-primary ms-2 px-2 py-0">
                                    {{ rec.actionText }}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          Valid Entries
                          <span class="badge badge-success badge-pill">{{ selectedEmailField ? validationStats.email.valid : 0 }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          Invalid Entries
                          <span class="badge badge-danger badge-pill">{{ selectedEmailField ? validationStats.email.invalid : 0 }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          Empty Entries
                          <span class="badge badge-warning badge-pill">{{ selectedEmailField ? validationStats.email.empty : 0 }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          Total
                          <span class="badge badge-dark badge-pill">{{ selectedEmailField ? validationStats.email.total : 0 }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Name Validation -->
                  <div class="col-4">
                    <div class="py-0">
                      <div v-if="selectedNameField">
                        <span class="bg fs-6 p-2 px-3 text-white d-flex align-items-center gap-2"
                              :class="validationStats.name.valid > 0 ? 'bg-success' : 'bg-warning'">
                          <i class="mdi mdi-account-check fs-4"></i>
                          <span>Recipients: <strong>{{ selectedNameField }}</strong></span>
                        </span>
                      </div>
                      <div v-else>
                        <span class="bg fs-6 p-2 px-3 text-white bg-dark d-flex align-items-center gap-2 bg-opacity-75">
                          <i class="mdi mdi-account-remove fs-4"></i>
                          <span>Recipients: <strong>Not Identified</strong></span>
                        </span>
                      </div>

                      <div class="p-3 py-2 pt-3 bg-white border-bottom border-success border-2 position-relative">
                        <div>
                          <select 
                            class="form-select" 
                            v-model="selectedNameField" 
                            @change="onFieldChange('name')"
                            :disabled="fieldLoading.name"
                          >
                            <option value="">-- Choose Column --</option>
                            <option
                              v-for="(header, index) in tableHeaders"
                              :key="'name-' + index"
                              :value="header"
                            >
                              {{ header }}
                            </option>
                          </select>
                          
                          <!-- Loading overlay -->
                          <div v-if="fieldLoading.name" class="field-loading-overlay">
                            <div class="skeleton-loader"></div>
                          </div>
                          
                          <!-- Recommendations -->
                          <div class="recommendations-container mt-2">
                            <div v-if="fieldLoading.name" class="recommendation-skeleton">
                              <div class="skeleton-text"></div>
                              <div class="skeleton-text short"></div>
                            </div>
                            <div v-else class="recommendation-content">
                              <p class="mb-0 pb-0 p-0 fw-semibold text-muted fs-7">
                                <i class="bx bx-bulb text-warning"></i> Recommendations
                              </p>
                              <div class="recommendations-list">
                                <div v-for="(rec, index) in nameRecommendations" :key="'name-rec-' + index" 
                                     class="recommendation-item" :class="'rec-' + rec.type">
                                  <i :class="rec.icon" class="me-1"></i>
                                  <span v-html="rec.text"></span>
                                  <button v-if="rec.action" 
                                          @click="rec.action()" 
                                          class="btn btn-sm btn-outline-primary ms-2 px-2 py-0">
                                    {{ rec.actionText }}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          Valid Entries
                          <span class="badge badge-success badge-pill">{{ selectedNameField ? validationStats.name.valid : 0 }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          Invalid Entries
                          <span class="badge badge-danger badge-pill">{{ selectedNameField ? validationStats.name.invalid : 0 }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          Empty Entries
                          <span class="badge badge-warning badge-pill">{{ selectedNameField ? validationStats.name.empty : 0 }}</span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                          Total
                          <span class="badge badge-dark badge-pill">{{ selectedNameField ? validationStats.name.total : 0 }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="hasErrors" class="d-flex flex-wrap">
                <span class="badge badge-soft-danger fs-6 p-2 px-3 text-danger-emphasis d-flex align-items-center gap-2">
                  <i class="mdi mdi-alert-circle fs-4"></i> File Processing Failed
                </span>
                <div class="ms-4 text-danger small">
                  <ul class="mb-0">
                    <li v-for="(err, index) in parseErrors" :key="'err-' + index">
                      {{ err }}
                    </li>
                  </ul>
                </div>
              </div>

              <p v-if="!hasErrors" class="p-3 mb-0 d-flex gap-2 align-items-center d-none">
                <i class="bx bx-info-circle fs-4 text-info"></i> 
                Please confirm or change the selections in the field mapping section below.
              </p>

              <button
                type="button"
                class="btn-close position-absolute end-0 top-0 m-3 d-none"
                @click="dismissAlert"
                aria-label="Close"
              ></button>
            </div>

            <!-- Table Preview -->
            <div class="bg-dark-subtle p-3 gap-3 d-flex align-items-center justify-content-between">
              <h5 class="mb-0">Uploaded Contacts Preview</h5>
              <label
                :for="fileInputId"
                type="button"
                class="btn btn-info waves-effect btn-label waves-light m-0 btn-sm"
              >
                <i class="bx bx-file label-icon"></i> Change Source
              </label>
            </div>
            <div class="upload-contacts-table-cont">
              <DataTable
                v-if="parsedContacts.length > 0 && !isLoading"
                :key="tableKey"
                class="table align-middle table-striped text-nowrap table-hover customTableStyle table-s"
                :data="currentDisplayData"
                :columns="dataTableColumns"
                :options="dataTableOptions"
              />
              
              <!-- Enhanced Loading state with large file handling -->
              <div v-else-if="isLoading" class="text-center py-5">
                <div class="d-flex flex-column align-items-center">
                  <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                  <h5 class="text-muted mb-2">Processing {{ fileType }} file...</h5>
                  <p class="text-muted mb-3">
                    <i class="bx bx-file-blank me-1"></i>
                    {{ fileName }}
                    <span v-if="isProcessingLargeFile" class="badge bg-info ms-2">Large File</span>
                  </p>
                  
                  <!-- Progress Bar with Percentage -->
                  <div class="w-100 d-flex flex-column align-items-center">
                    <div class="progress mb-2" style="width: 400px; height: 8px;">
                      <div 
                        class="progress-bar bg-primary" 
                        role="progressbar" 
                        :style="{ width: uploadProgress + '%' }"
                        :aria-valuenow="uploadProgress"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                      </div>
                    </div>
                    
                    <!-- Progress Details -->
                    <div class="d-flex justify-content-between w-100" style="max-width: 400px;">
                      <small class="text-muted">{{ processingStage }}</small>
                      <small class="text-primary fw-bold">{{ uploadProgress }}%</small>
                    </div>
                    
                    <!-- Large file processing info -->
                    <div v-if="isProcessingLargeFile && totalChunks > 0" class="mt-2 text-center">
                      <small class="text-info">
                        Processing chunk {{ processingChunks }}/{{ totalChunks }}
                        <span v-if="memoryUsage > 0" class="ms-2">
                          (Memory: {{ formatFileSize(memoryUsage) }})
                        </span>
                      </small>
                    </div>
                    
                    <!-- Processing Steps Indicator -->
                    <div class="mt-3 d-flex justify-content-center gap-2">
                      <span class="badge" :class="uploadProgress >= 25 ? 'bg-success' : 'bg-light text-dark'">
                        <i class="bx bx-file-import me-1"></i>Read
                      </span>
                      <span class="badge" :class="uploadProgress >= 50 ? 'bg-success' : 'bg-light text-dark'">
                        <i class="bx bx-cog me-1"></i>Parse
                      </span>
                      <span class="badge" :class="uploadProgress >= 75 ? 'bg-success' : 'bg-light text-dark'">
                        <i class="bx bx-data me-1"></i>Clean
                      </span>
                      <span class="badge" :class="uploadProgress >= 95 ? 'bg-success' : 'bg-light text-dark'">
                        <i class="bx bx-check-circle me-1"></i>Validate
                      </span>
                    </div>
                    
                    <!-- Performance info for completed processing -->
                    <div v-if="performanceMetrics.processingTime && uploadProgress === 100" class="mt-2 text-center">
                      <small class="text-success">
                        <i class="bx bx-time me-1"></i>
                        {{ (performanceMetrics.processingTime / 1000).toFixed(1) }}s
                        <span v-if="performanceMetrics.rowsPerSecond" class="ms-2">
                          ({{ performanceMetrics.rowsPerSecond.toLocaleString() }} rows/sec)
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Empty state -->
              <div v-else-if="!isLoading && parsedContacts.length === 0 && !hasErrors" class="text-center py-4 text-muted">
                <i class="bx bx-file fs-1 mb-2"></i>
                <p>No data to display. Please upload a file.</p>
              </div>
            </div>
          </div>

          <!-- Buttons -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              :class="isLoading ? 'btn-warning' : 'btn-secondary'"
              @click="isLoading ? cancelProcessing() : handleCancel()"
              data-bs-dismiss="modal"
            >
              <i v-if="isLoading" class="bx bx-x me-1"></i>
              <i v-else class="bx bx-arrow-back me-1"></i>
              {{ isLoading ? 'Cancel Upload' : 'Cancel' }}
            </button>
            <button
            type="button"
            class="btn btn-primary"
            :disabled="(!selectedPhoneField && !selectedEmailField) || loadingUploadedData"
            @click="handleSubmit"
          >
            <i class="bx bx-check me-1" v-if="!loadingUploadedData"></i>
            <span v-if="!loadingUploadedData">Submit Mapping</span>

            <div v-else class="d-flex text-white align-items-center gap-3">
              <div class="spinner-border text-white m-1" role="status" style="height: 20px; width: 20px;">
                <span class="sr-only">Loading...</span>
              </div>
              <span>Loading</span>
            </div>
          </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, computed, nextTick } from "vue";
import * as XLSX from "xlsx";
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import SingleToastVue from '@/components/SingleToast.vue'
DataTable.use(DataTablesCore);

// Props with more aggressive limits for stability
const props = defineProps({
  file: {
    type: Object,
    default: null,
    validator: (f) => f instanceof File || f === null,
  },
  fileInputId: {
    type: String,
    default: "uploadContactsInput",
  },
  maxFileSize: {
    type: Number,
    default: 5 * 1024 * 1024, // 5MB default
  },
  maxRows: {
    type: Number,
    default: 10000, // Reduced to 10k rows for stability
  }
});

// Add this line to define emit
// Update this line to include the new event
const emit = defineEmits(['contacts-mapped', 'modal-closed', 'processing-cancelled', 'contactsSelected', 'file-cleared','show-toast']);

// Reactive variables
const normalizedHeaders = ref([]);
const parseErrors = ref([]);
const parsedContacts = ref([]);
const selectedPhoneField = ref("");
const selectedEmailField = ref("");
const selectedNameField = ref("");
const fileName = ref("");
const fileType = ref("");
const isLoading = ref(false);
const alertDismissed = ref(false);
const alertKey = ref(0);
const uploadProgress = ref(0);
const processingStage = ref("");
const isCancelled = ref(false);
const fileReader = ref(null);
const tableKey = ref(0);
const validationFilter = ref("all");
const filteredContacts = ref([]);
const loadingUploadedData=ref(false)

const handleSubmit = async () => {
  loadingUploadedData.value = true;

  // Wait for DOM update to reflect loading spinner
  await nextTick();

  // Give the browser time to actually render
  setTimeout(async () => {
    try {
      await submitMapping();
    } finally {
      loadingUploadedData.value = false;
    }
  }, 50); // even 0ms sometimes works, but 50ms is safer
};

// Toast reactive state
const showToast = ref(false);
const toastType = ref('');
const toastMessage = ref('Bado Mse');

// This handles the event
function handleToast(payload) {
  toastType.value = payload.toastType
  toastMessage.value = payload.toastMessage

  // Now manually show the toast
  nextTick(() => {
    const el = document.getElementById('uploadContactsToast')
    if (el) {
      const toast = bootstrap.Toast.getOrCreateInstance(el)
      toast.show()
    }
  })
}


// Enhanced error handling
const isProcessingLargeFile = ref(false);
const processingChunks = ref(0);
const totalChunks = ref(0);
const memoryUsage = ref(0);
const performanceMetrics = ref({
  startTime: null,
  endTime: null,
  processingTime: null,
  rowsPerSecond: null
});

// Resource management with aggressive limits
const CHUNK_SIZE = 50; // Much smaller chunks - 50 rows
const MEMORY_THRESHOLD = 20 * 1024 * 1024; // 20MB memory threshold
const PROCESSING_DELAY = 20; // Longer delay between chunks
const MAX_DISPLAY_ROWS = 1000; // Limit displayed rows in table

// New recommendation system variables
const fieldLoading = ref({
  phone: false,
  email: false,
  name: false
});

const fieldHistory = ref({
  phone: [],
  email: [],
  name: []
});

const fieldAnalysis = ref({
  phone: {},
  email: {},
  name: {}
});

// Validation stats
const validationStats = ref({
  phone: { valid: 0, invalid: 0, empty: 0, total: 0 },
  email: { valid: 0, invalid: 0, empty: 0, total: 0 },
  name: { valid: 0, invalid: 0, empty: 0, total: 0 }
});

// Validation functions
function isValidPhoneNumber(phone) {
  if (!phone || phone.toString().trim() === '') return false;
  
  const cleaned = phone.toString().replace(/\D/g, '');
  
  if (cleaned.length < 7 || cleaned.length > 15) return false;
  
  const patterns = [
    /^\+?1?[2-9]\d{2}[2-9]\d{2}\d{4}$/,
    /^\+?[1-9]\d{1,14}$/,
    /^\d{7,15}$/
  ];
  
  return patterns.some(pattern => pattern.test(cleaned));
}

function isValidEmail(email) {
  if (!email || email.toString().trim() === '') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.toString().trim());
}

function isValidName(name) {
  if (!name || name.toString().trim() === '') return false;
  
  const cleaned = name.toString().trim();
  const nameRegex = /^[a-zA-Z\s\-']{2,}$/;
  return nameRegex.test(cleaned) && cleaned.length >= 2;
}

// Field analysis functions
function analyzeField(fieldName, fieldType) {
  if (!parsedContacts.value.length || !fieldName) return {};
  
  const analysis = {
    totalEntries: 0,
    validEntries: 0,
    invalidEntries: 0,
    emptyEntries: 0,
    validationRate: 0,
    commonIssues: [],
    sampleValues: []
  };
  
  const issues = new Set();
  const sampleData = [];
  
  parsedContacts.value.forEach(contact => {
    const value = contact[fieldName];
    analysis.totalEntries++;
    
    if (!value || value.toString().trim() === '') {
      analysis.emptyEntries++;
      return;
    }
    
    const stringValue = value.toString().trim();
    if (sampleData.length < 5) {
      sampleData.push(stringValue);
    }
    
    let isValid = false;
    
    switch (fieldType) {
      case 'phone':
        isValid = isValidPhoneNumber(stringValue);
        if (!isValid) {
          if (stringValue.length < 7) issues.add('Numbers too short');
          if (stringValue.length > 15) issues.add('Numbers too long');
          if (!/^\+?[\d\s\-\(\)]+$/.test(stringValue)) issues.add('Invalid characters');
        }
        break;
        
      case 'email':
        isValid = isValidEmail(stringValue);
        if (!isValid) {
          if (!stringValue.includes('@')) issues.add('Missing @ symbol');
          if (!stringValue.includes('.')) issues.add('Missing domain extension');
          if (stringValue.includes(' ')) issues.add('Contains spaces');
        }
        break;
        
      case 'name':
        isValid = isValidName(stringValue);
        if (!isValid) {
          if (stringValue.length < 2) issues.add('Names too short');
          if (/\d/.test(stringValue)) issues.add('Contains numbers');
          if (/[^\w\s\-']/.test(stringValue)) issues.add('Special characters');
        }
        break;
    }
    
    if (isValid) {
      analysis.validEntries++;
    } else {
      analysis.invalidEntries++;
    }
  });
  
  analysis.validationRate = analysis.totalEntries > 0 ? 
    (analysis.validEntries / analysis.totalEntries) * 100 : 0;
  analysis.commonIssues = Array.from(issues);
  analysis.sampleValues = sampleData;
  
  return analysis;
}

// Field change handler with loading simulation
async function onFieldChange(fieldType) {
  const currentField = fieldType === 'phone' ? selectedPhoneField.value : 
                      fieldType === 'email' ? selectedEmailField.value : 
                      selectedNameField.value;
  
  // Start loading
  fieldLoading.value[fieldType] = true;
  
  // Store previous field in history
  const previousField = fieldHistory.value[fieldType][fieldHistory.value[fieldType].length - 1];
  if (previousField && previousField !== currentField) {
    fieldHistory.value[fieldType].push(previousField);
  }
  
  // Simulate processing time for smooth UX
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Analyze the field
  if (currentField) {
    fieldAnalysis.value[fieldType] = analyzeField(currentField, fieldType);
  }
  
  // Validate fields
  validateFields();
  
  // Stop loading
  fieldLoading.value[fieldType] = false;
}

// Show initial recommendations on file load
function showInitialRecommendations() {
  // Force trigger analysis for auto-selected fields immediately
  nextTick(() => {
    if (selectedPhoneField.value) {
      fieldAnalysis.value.phone = analyzeField(selectedPhoneField.value, 'phone');
    }
    if (selectedEmailField.value) {
      fieldAnalysis.value.email = analyzeField(selectedEmailField.value, 'email');
    }
    if (selectedNameField.value) {
      fieldAnalysis.value.name = analyzeField(selectedNameField.value, 'name');
    }
    
    // Force reactivity update
    tableKey.value++;
  });
}

// Recommendation generators
const phoneRecommendations = computed(() => {
  const recommendations = [];
  
  // Always show recommendations even if tableHeaders is empty initially
  if (!selectedPhoneField.value) {
    // Suggest available phone fields
    const phoneFields = tableHeaders.value.filter(h => 
      /(phone|mobile|cell|tel|contact)/i.test(h)
    );
    
    if (phoneFields.length > 0) {
      recommendations.push({
        type: 'suggestion',
        icon: 'bx bx-lightbulb text-info',
        text: `Try <strong>${phoneFields[0]}</strong> - looks like a phone field`,
        action: () => {
          selectedPhoneField.value = phoneFields[0];
          onFieldChange('phone');
        },
        actionText: 'Select'
      });
    } else if (tableHeaders.value.length > 0) {
      // If we have headers but no phone-like fields detected
      recommendations.push({
        type: 'info',
        icon: 'bx bx-info-circle text-muted',
        text: 'No phone columns auto-detected - please select a column manually'
      });
    }
    
    return recommendations;
  }
  
  // Check if we have analysis data, if not provide initial guidance
  const analysis = fieldAnalysis.value.phone;
  const stats = validationStats.value.phone;
  
  if (!analysis || analysis.validationRate === undefined) {
    recommendations.push({
      type: 'info',
      icon: 'bx bx-info-circle text-primary',
      text: `Analyzing <strong>${selectedPhoneField.value}</strong> field for phone number validation...`
    });
    return recommendations;
  }
  
  // High error rate recommendations
  if (analysis.validationRate < 50 && stats.invalid > 0) {
    recommendations.push({
      type: 'error',
      icon: 'bx bx-error text-danger',
      text: `${stats.invalid} invalid phone numbers detected. Consider cleaning your data first.`
    });
    
    if (analysis.commonIssues && analysis.commonIssues.length > 0) {
      recommendations.push({
        type: 'warning',
        icon: 'bx bx-info-circle text-warning',
        text: `Common issues: ${analysis.commonIssues.join(', ')}`
      });
    }
  }
  
  // Suggest better field if available
  const betterFields = tableHeaders.value.filter(h => 
    h !== selectedPhoneField.value && /(phone|mobile|cell)/i.test(h)
  );
  
  if (betterFields.length > 0 && analysis.validationRate < 80) {
    recommendations.push({
      type: 'suggestion',
      icon: 'bx bx-refresh text-primary',
      text: `Try <strong>${betterFields[0]}</strong> instead for better results`,
      action: () => {
        selectedPhoneField.value = betterFields[0];
        onFieldChange('phone');
      },
      actionText: 'Switch'
    });
  }
  
  // Previous field suggestion
  const previousField = fieldHistory.value.phone[fieldHistory.value.phone.length - 1];
  if (previousField && previousField !== selectedPhoneField.value && analysis.validationRate < 70) {
    recommendations.push({
      type: 'suggestion',
      icon: 'bx bx-history text-info',
      text: `Go back to <strong>${previousField}</strong>?`,
      action: () => {
        selectedPhoneField.value = previousField;
        onFieldChange('phone');
      },
      actionText: 'Restore'
    });
  }
  
  // Success message
  if (analysis.validationRate >= 80) {
    recommendations.push({
      type: 'success',
      icon: 'bx bx-check-circle text-success',
      text: `Great! ${stats.valid} valid phone numbers found (${Math.round(analysis.validationRate)}% success rate)`
    });
  } else if (analysis.validationRate >= 50) {
    recommendations.push({
      type: 'info',
      icon: 'bx bx-info-circle text-info',
      text: `${stats.valid} valid phone numbers found (${Math.round(analysis.validationRate)}% success rate)`
    });
  }
  
  return recommendations;
});

const emailRecommendations = computed(() => {
  const recommendations = [];
  
  if (!selectedEmailField.value) {
    const emailFields = tableHeaders.value.filter(h => 
      /(email|e[-_]?mail|mail)/i.test(h)
    );
    
    if (emailFields.length > 0) {
      recommendations.push({
        type: 'suggestion',
        icon: 'bx bx-lightbulb text-info',
        text: `Try <strong>${emailFields[0]}</strong> - looks like an email field`,
        action: () => {
          selectedEmailField.value = emailFields[0];
          onFieldChange('email');
        },
        actionText: 'Select'
      });
    } else if (tableHeaders.value.length > 0) {
      recommendations.push({
        type: 'info',
        icon: 'bx bx-info-circle text-muted',
        text: 'No email columns auto-detected - please select a column manually'
      });
    }
    
    return recommendations;
  }
  
  // Check if we have analysis data, if not provide initial guidance
  const analysis = fieldAnalysis.value.email;
  const stats = validationStats.value.email;
  
  if (!analysis || analysis.validationRate === undefined) {
    recommendations.push({
      type: 'info',
      icon: 'bx bx-info-circle text-primary',
      text: `Analyzing <strong>${selectedEmailField.value}</strong> field for email validation...`
    });
    return recommendations;
  }
  
  if (analysis.validationRate < 50 && stats.invalid > 0) {
    recommendations.push({
      type: 'error',
      icon: 'bx bx-error text-danger',
      text: `${stats.invalid} invalid email addresses detected.`
    });
    
    if (analysis.commonIssues && analysis.commonIssues.length > 0) {
      recommendations.push({
        type: 'warning',
        icon: 'bx bx-info-circle text-warning',
        text: `Common issues: ${analysis.commonIssues.join(', ')}`
      });
    }
  }
  
  const betterFields = tableHeaders.value.filter(h => 
    h !== selectedEmailField.value && /(email|mail)/i.test(h)
  );
  
  if (betterFields.length > 0 && analysis.validationRate < 80) {
    recommendations.push({
      type: 'suggestion',
      icon: 'bx bx-refresh text-primary',
      text: `Try <strong>${betterFields[0]}</strong> instead`,
      action: () => {
        selectedEmailField.value = betterFields[0];
        onFieldChange('email');
      },
      actionText: 'Switch'
    });
  }
  
  const previousField = fieldHistory.value.email[fieldHistory.value.email.length - 1];
  if (previousField && previousField !== selectedEmailField.value && analysis.validationRate < 70) {
    recommendations.push({
      type: 'suggestion',
      icon: 'bx bx-history text-info',
      text: `Go back to <strong>${previousField}</strong>?`,
      action: () => {
        selectedEmailField.value = previousField;
        onFieldChange('email');
      },
      actionText: 'Restore'
    });
  }
  
  if (analysis.validationRate >= 80) {
    recommendations.push({
      type: 'success',
      icon: 'bx bx-check-circle text-success',
      text: `Excellent! ${stats.valid} valid email addresses found (${Math.round(analysis.validationRate)}% success rate)`
    });
  } else if (analysis.validationRate >= 50) {
    recommendations.push({
      type: 'info',
      icon: 'bx bx-info-circle text-info',
      text: `${stats.valid} valid email addresses found (${Math.round(analysis.validationRate)}% success rate)`
    });
  }
  
  return recommendations;
});

const nameRecommendations = computed(() => {
  const recommendations = [];
  
  if (!selectedNameField.value) {
    const nameFields = tableHeaders.value.filter(h => 
      /(name|fullname|recipient|contact|person|customer|client|firstname|lastname|displayname)/i.test(h)
    );
    
    if (nameFields.length > 0) {
      recommendations.push({
        type: 'suggestion',
        icon: 'bx bx-lightbulb text-info',
        text: `Try <strong>${nameFields[0]}</strong> - perfect for personalizing your messages`,
        action: () => {
          selectedNameField.value = nameFields[0];
          onFieldChange('name');
        },
        actionText: 'Select'
      });
    } else {
      recommendations.push({
        type: 'info',
        icon: 'bx bx-info-circle text-muted',
        text: 'Names help create personalized messages like "Hi John" instead of generic greetings'
      });
    }
    
    return recommendations;
  }
  
  const analysis = fieldAnalysis.value.name;
  const stats = validationStats.value.name;
  
  if (analysis.validationRate < 60 && stats.invalid > 0) {
    recommendations.push({
      type: 'warning',
      icon: 'bx bx-exclamation-triangle text-warning',
      text: `${stats.invalid} names need attention - this may affect message personalization.`
    });
    
    if (analysis.commonIssues.length > 0) {
      recommendations.push({
        type: 'info',
        icon: 'bx bx-info-circle text-info',
        text: `Common issues: ${analysis.commonIssues.join(', ')} - consider cleaning these for better personalization`
      });
    }
  }
  
  // Enhanced suggestions for better personalization
  const personalizedFields = tableHeaders.value.filter(h => 
    h !== selectedNameField.value && 
    /(firstname|first_name|givenname|displayname|preferredname|nickname)/i.test(h)
  );
  
  if (personalizedFields.length > 0 && analysis.validationRate < 70) {
    recommendations.push({
      type: 'suggestion',
      icon: 'bx bx-user-plus text-primary',
      text: `<strong>${personalizedFields[0]}</strong> might be better for personalized greetings`,
      action: () => {
        selectedNameField.value = personalizedFields[0];
        onFieldChange('name');
      },
      actionText: 'Switch'
    });
  }
  
  // Full name vs first name recommendations
  const fullNameFields = tableHeaders.value.filter(h => 
    h !== selectedNameField.value && 
    /(fullname|full_name|completename|wholename)/i.test(h)
  );
  
  const firstNameFields = tableHeaders.value.filter(h => 
    h !== selectedNameField.value && 
    /(firstname|first_name|givenname)/i.test(h)
  );
  
  if (selectedNameField.value && /full|complete|whole/i.test(selectedNameField.value) && firstNameFields.length > 0) {
    recommendations.push({
      type: 'suggestion',
      icon: 'bx bx-user-voice text-info',
      text: `For friendlier messages, try <strong>${firstNameFields[0]}</strong> instead of full names`,
      action: () => {
        selectedNameField.value = firstNameFields[0];
        onFieldChange('name');
      },
      actionText: 'Use First Names'
    });
  }
  
  if (selectedNameField.value && /first|given/i.test(selectedNameField.value) && fullNameFields.length > 0) {
    recommendations.push({
      type: 'suggestion',
      icon: 'bx bx-user-circle text-info',
      text: `For formal messages, consider <strong>${fullNameFields[0]}</strong> for complete names`,
      action: () => {
        selectedNameField.value = fullNameFields[0];
        onFieldChange('name');
      },
      actionText: 'Use Full Names'
    });
  }
  
  // Previous field suggestion
  const previousField = fieldHistory.value.name[fieldHistory.value.name.length - 1];
  if (previousField && previousField !== selectedNameField.value && analysis.validationRate < 70) {
    recommendations.push({
      type: 'suggestion',
      icon: 'bx bx-history text-info',
      text: `<strong>${previousField}</strong> had better results for personalization`,
      action: () => {
        selectedNameField.value = previousField;
        onFieldChange('name');
      },
      actionText: 'Restore'
    });
  }
  
  // Success messages with personalization context
  if (analysis.validationRate >= 80) {
    const personalizedCount = stats.valid;
    const messageType = /first|given/i.test(selectedNameField.value) ? 'friendly' : 'professional';
    
    recommendations.push({
      type: 'success',
      icon: 'bx bx-check-circle text-success',
      text: `Excellent! ${personalizedCount} names ready for ${messageType} personalized messages`
    });
  }
  
  // Provide personalization examples
  if (analysis.validationRate >= 60 && analysis.sampleValues && analysis.sampleValues.length > 0) {
    const sampleName = analysis.sampleValues[0];
    const isFirstName = /first|given/i.test(selectedNameField.value);
    const greeting = isFirstName ? `Hi ${sampleName}` : `Dear ${sampleName}`;
    
    recommendations.push({
      type: 'info',
      icon: 'bx bx-message-dots text-info',
      text: `Preview: Your messages will start with "${greeting}..." for personalization`
    });
  }
  
  return recommendations;
});

// Rest of the functions remain the same...
function validateFields() {
  if (!parsedContacts.value.length) return;
  
  validationStats.value = {
    phone: { valid: 0, invalid: 0, empty: 0, total: 0 },
    email: { valid: 0, invalid: 0, empty: 0, total: 0 },
    name: { valid: 0, invalid: 0, empty: 0, total: 0 }
  };
  
  parsedContacts.value.forEach(contact => {
    if (selectedPhoneField.value) {
      validationStats.value.phone.total++;
      const phoneValue = contact[selectedPhoneField.value];
      
      if (!phoneValue || phoneValue.toString().trim() === '') {
        validationStats.value.phone.empty++;
      } else if (isValidPhoneNumber(phoneValue)) {
        validationStats.value.phone.valid++;
      } else {
        validationStats.value.phone.invalid++;
      }
    }
    
    if (selectedEmailField.value) {
      validationStats.value.email.total++;
      const emailValue = contact[selectedEmailField.value];
      
      if (!emailValue || emailValue.toString().trim() === '') {
        validationStats.value.email.empty++;
      } else if (isValidEmail(emailValue)) {
        validationStats.value.email.valid++;
      } else {
        validationStats.value.email.invalid++;
      }
    }
    
    if (selectedNameField.value) {
      validationStats.value.name.total++;
      const nameValue = contact[selectedNameField.value];
      
      if (!nameValue || nameValue.toString().trim() === '') {
        validationStats.value.name.empty++;
      } else if (isValidName(nameValue)) {
        validationStats.value.name.valid++;
      } else {
        validationStats.value.name.invalid++;
      }
    }
  });
  
  nextTick(() => {
    updateTableWithValidation();
    applyValidationFilter();
  });
}

function applyValidationFilter() {
  if (!parsedContacts.value.length) {
    filteredContacts.value = [];
    return;
  }

  switch (validationFilter.value) {
    case "all":
      filteredContacts.value = [...parsedContacts.value];
      break;
      
    case "invalid-phone":
      filteredContacts.value = parsedContacts.value.filter(contact => {
        const phoneValue = contact[selectedPhoneField.value];
        return phoneValue && phoneValue.toString().trim() !== '' && !isValidPhoneNumber(phoneValue);
      });
      break;
      
    case "invalid-email":
      filteredContacts.value = parsedContacts.value.filter(contact => {
        const emailValue = contact[selectedEmailField.value];
        return emailValue && emailValue.toString().trim() !== '' && !isValidEmail(emailValue);
      });
      break;
      
    case "invalid-name":
      filteredContacts.value = parsedContacts.value.filter(contact => {
        const nameValue = contact[selectedNameField.value];
        return nameValue && nameValue.toString().trim() !== '' && !isValidName(nameValue);
      });
      break;
      
    case "all-invalid":
      filteredContacts.value = parsedContacts.value.filter(contact => {
        let hasInvalidField = false;
        
        if (selectedPhoneField.value) {
          const phoneValue = contact[selectedPhoneField.value];
          if (phoneValue && phoneValue.toString().trim() !== '' && !isValidPhoneNumber(phoneValue)) {
            hasInvalidField = true;
          }
        }
        
        if (selectedEmailField.value) {
          const emailValue = contact[selectedEmailField.value];
          if (emailValue && emailValue.toString().trim() !== '' && !isValidEmail(emailValue)) {
            hasInvalidField = true;
          }
        }
        
        if (selectedNameField.value) {
          const nameValue = contact[selectedNameField.value];
          if (nameValue && nameValue.toString().trim() !== '' && !isValidName(nameValue)) {
            hasInvalidField = true;
          }
        }
        
        return hasInvalidField;
      });
      break;
      
    default:
      filteredContacts.value = [...parsedContacts.value];
  }
  
  nextTick(() => {
    tableKey.value++;
  });
}

function updateTableWithValidation() {
  setTimeout(() => {
    const tableRows = document.querySelectorAll('#csvUploadModal .upload-contacts-table-cont tbody tr');
    
    tableRows.forEach((row, index) => {
      if (index < currentDisplayData.value.length) {
        const contact = currentDisplayData.value[index];
        const cells = row.querySelectorAll('td');
        
        cells.forEach((cell, cellIndex) => {
          const header = tableHeaders.value[cellIndex];
          const value = contact[header];
          
          cell.classList.remove('bg-danger-subtle', 'bg-warning-subtle');
          
          if (header === selectedPhoneField.value && value && value.toString().trim() !== '') {
            if (!isValidPhoneNumber(value)) {
              cell.classList.add('bg-danger-subtle');
            }
          } else if (header === selectedEmailField.value && value && value.toString().trim() !== '') {
            if (!isValidEmail(value)) {
              cell.classList.add('bg-danger-subtle');
            }
          } else if (header === selectedNameField.value && value && value.toString().trim() !== '') {
            if (!isValidName(value)) {
              cell.classList.add('bg-warning-subtle');
            }
          }
        });
      }
    });
  }, 100);
}

function formatFileSize(bytes) {
  if (!bytes) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function normalizeHeaders(headers = []) {
  return headers.map((header) =>
    header
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s(.)/g, (_, group1) => group1.toUpperCase())
      .replace(/\s/g, "")
      .replace(/^[A-Z]/, (c) => c.toLowerCase())
  );
}

const hasErrors = computed(() => parseErrors.value.length > 0);

const tableHeaders = computed(() => {
  return parsedContacts.value.length > 0 ? Object.keys(parsedContacts.value[0]) : [];
});

const dataTableColumns = computed(() =>
  tableHeaders.value.map((h) => ({
    title: h,
    data: h
  }))
);

const currentDisplayData = computed(() => {
  return filteredContacts.value.length > 0 || validationFilter.value !== "all" 
    ? filteredContacts.value 
    : parsedContacts.value;
});

const dataTableOptions = computed(() => ({
  scrollY: '300px',
  scrollX: false,
  paging: true,
  searching: true,
  responsive: false,
  destroy: true,
  pageLength: 50,
  lengthMenu: [
    [10, 25, 50, 100],
    ['10 Rows', '25 Rows', '50 Rows', '100 Rows']
  ],
  autoWidth: false,
  dom: '<"d-flex p-3 align-items-center w-100 filter-box"<"dataTables_length-custom pr-0"l><"dataTables_length-custom pr-0 validation-filter-container"><"dataTables_filter-custom d-flex flex-grow-1"f>>' +
       '<"row"<"col-sm-12"tr>>' +
       '<"row mt-3"<"col-sm-5"i><"col-sm-7"p>>',
  columnDefs: [
    {
      targets: '_all',
      className: '',
      width: 'auto'
    }
  ],
  language: {
    search: '',
    lengthMenu: '_MENU_',
    info: 'Showing _START_ to _END_ of _TOTAL_ contacts',
    infoFiltered: '(filtered from _MAX_ total contacts)',
    paginate: {
      first: 'First',
      last: 'Last',
      next: 'Next',
      previous: 'Previous'
    }
  },
  initComplete: function () {
    const api = this.api();
    setTimeout(() => {
      const validationFilterContainer = document.querySelector('#csvUploadModal .validation-filter-container');
      if (validationFilterContainer) {
        const filterSelect = document.createElement('select');
        filterSelect.className = 'form-select form-control valid-filter';
        filterSelect.style.minWidth = '200px';
        
        const options = [
          { value: 'all', text: 'Show All Rows' },
          { value: 'invalid-phone', text: 'Invalid Phone Numbers', condition: () => selectedPhoneField.value },
          { value: 'invalid-email', text: 'Invalid Email Addresses', condition: () => selectedEmailField.value },
          { value: 'invalid-name', text: 'Invalid Names', condition: () => selectedNameField.value },
          { value: 'all-invalid', text: 'All Invalid Entries' }
        ];
        
        options.forEach(option => {
          if (!option.condition || option.condition()) {
            const optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            if (option.value === validationFilter.value) {
              optionElement.selected = true;
            }
            filterSelect.appendChild(optionElement);
          }
        });
        
        filterSelect.addEventListener('change', (e) => {
          validationFilter.value = e.target.value;
          applyValidationFilter();
        });
        
        validationFilterContainer.appendChild(filterSelect);
      }
      
      let lengthSelect = document.querySelector('#csvUploadModal select[name*="length"]');
      if (!lengthSelect) {
        lengthSelect = document.querySelector('#csvUploadModal .dataTables_length select');
      }
      
      if (lengthSelect) {
        lengthSelect.classList.add('form-control', 'form-select');
      }

      let searchInput = document.querySelector('#csvUploadModal .dataTables_filter input');
      if (searchInput) {
        searchInput.classList.add('form-control');
        searchInput.setAttribute('placeholder', 'Search through contacts...');
      }

      api.columns.adjust().draw();
      updateTableWithValidation();
    }, 500);
  },
  drawCallback: function () {
    setTimeout(() => {
      const allSelects = document.querySelectorAll('#csvUploadModal select');
      allSelects.forEach(select => {
        if (select.name && select.name.includes('length')) {
          if (!select.classList.contains('form-control')) {
            select.classList.add('form-control', 'form-select');
          }
        }
      });

      const searchInput = document.querySelector('#csvUploadModal .dataTables_filter input');
      if (searchInput && !searchInput.classList.contains('form-control')) {
        searchInput.classList.add('form-control');
      }

      this.api().columns.adjust();
      updateTableWithValidation();
    }, 20);
  },
  headerCallback: function (thead) {
    $(thead).find('th').addClass('custom-header table-light');
  }
}));

function dismissAlert() {
  alertDismissed.value = true;
}

function showAlert() {
  alertDismissed.value = false;
  alertKey.value++;
}
function cancelProcessing() {
  isCancelled.value = true;
  
  if (fileReader.value) {
    fileReader.value.abort();
  }
  
  isLoading.value = false;
  uploadProgress.value = 0;
  processingStage.value = "";
  parseErrors.value = [];
  parsedContacts.value = [];
  selectedPhoneField.value = "";
  selectedEmailField.value = "";
  selectedNameField.value = "";
  alertDismissed.value = true;
  
  validationFilter.value = "all";
  filteredContacts.value = [];
  validationStats.value = {
    phone: { valid: 0, invalid: 0, empty: 0, total: 0 },
    email: { valid: 0, invalid: 0, empty: 0, total: 0 },
    name: { valid: 0, invalid: 0, empty: 0, total: 0 }
  };
  
  // Reset recommendation system
  fieldLoading.value = { phone: false, email: false, name: false };
  fieldHistory.value = { phone: [], email: [], name: [] };
  fieldAnalysis.value = { phone: {}, email: {}, name: {} };
  
  // Emit event to clear the selected file
  emit('file-cleared');
  
  console.log("📤 File processing cancelled by user");
}

// Add a separate function for regular cancel (non-loading state)
function handleCancel() {
  // Clear all data
  parseErrors.value = [];
  parsedContacts.value = [];
  selectedPhoneField.value = "";
  selectedEmailField.value = "";
  selectedNameField.value = "";
  alertDismissed.value = true;
  
  validationFilter.value = "all";
  filteredContacts.value = [];
  validationStats.value = {
    phone: { valid: 0, invalid: 0, empty: 0, total: 0 },
    email: { valid: 0, invalid: 0, empty: 0, total: 0 },
    name: { valid: 0, invalid: 0, empty: 0, total: 0 }
  };
  
  // Reset recommendation system
  fieldLoading.value = { phone: false, email: false, name: false };
  fieldHistory.value = { phone: [], email: [], name: [] };
  fieldAnalysis.value = { phone: {}, email: {}, name: {} };
  
  // Emit event to clear the selected file
  emit('file-cleared');
  
  console.log("📤 Modal cancelled by user");
}

// Your existing parseUploadedFile function remains the same
function parseUploadedFile(file) {
  if (!file) return;
  
  isCancelled.value = false;
  isLoading.value = true;
  uploadProgress.value = 0;
  processingStage.value = "Reading file...";
  parseErrors.value = [];
  parsedContacts.value = [];
  selectedPhoneField.value = "";
  selectedEmailField.value = "";
  selectedNameField.value = "";
  alertDismissed.value = true;

  validationStats.value = {
    phone: { valid: 0, invalid: 0, empty: 0, total: 0 },
    email: { valid: 0, invalid: 0, empty: 0, total: 0 },
    name: { valid: 0, invalid: 0, empty: 0, total: 0 }
  };

  const reader = new FileReader();
  fileReader.value = reader;
  
  const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");
  const isCSV = file.name.endsWith(".csv");

  fileType.value = isExcel ? "Excel" : isCSV ? "CSV" : "Unknown";

  reader.onprogress = (e) => {
    if (isCancelled.value) return;
    
    if (e.lengthComputable) {
      const percentLoaded = Math.round((e.loaded / e.total) * 30);
      uploadProgress.value = percentLoaded;
      processingStage.value = `Reading ${fileType.value} file... ${percentLoaded}%`;
    }
  };

  reader.onload = (e) => {
    if (isCancelled.value) return;
    
    uploadProgress.value = 30;
    processingStage.value = "Processing file data...";
    
    setTimeout(() => {
      if (isCancelled.value) return;
      
      try {
        let workbook, sheet;

        uploadProgress.value = 40;
        processingStage.value = "Parsing spreadsheet...";

        if (isCancelled.value) return;

        if (isExcel) {
          const data = new Uint8Array(e.target.result);
          workbook = XLSX.read(data, { type: "array" });
        } else if (isCSV) {
          const text = e.target.result;
          workbook = XLSX.read(text, { type: "string" });
        } else {
          parseErrors.value.push("Unsupported file type. Only Excel or CSV is allowed.");
          isLoading.value = false;
          showAlert();
          return;
        }

        if (isCancelled.value) return;

        uploadProgress.value = 55;
        processingStage.value = "Extracting data...";

        sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rawData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        if (!rawData.length) {
          parseErrors.value.push("Uploaded file is empty or could not be parsed.");
          isLoading.value = false;
          showAlert();
          return;
        }

        if (isCancelled.value) return;

        uploadProgress.value = 70;
        processingStage.value = "Normalizing headers...";

        const originalHeaders = Object.keys(rawData[0]);
        const normalizedKeys = normalizeHeaders(originalHeaders);

        if (isCancelled.value) return;

        uploadProgress.value = 80;
        processingStage.value = "Cleaning data...";

        const cleanedData = rawData.map((row, index) => {
          if (isCancelled.value) return null;
          
          if (index % 1000 === 0) {
            const cleanProgress = Math.round((index / rawData.length) * 10);
            uploadProgress.value = 80 + cleanProgress;
            processingStage.value = `Cleaning data... ${Math.round((index / rawData.length) * 100)}%`;
          }
          
          const newRow = {};
          normalizedKeys.forEach((cleanKey, idx) => {
            const originalKey = originalHeaders[idx];
            newRow[cleanKey] = row[originalKey];
          });
          return newRow;
        }).filter(row => row !== null);

        if (isCancelled.value) return;

        parsedContacts.value = cleanedData;

        uploadProgress.value = 90;
        processingStage.value = "Auto-mapping fields...";

        const lowerHeaders = normalizedKeys.map((h) => h.toLowerCase());

        selectedPhoneField.value =
          normalizedKeys[
            lowerHeaders.findIndex((h) => /(phone|mobile|cell)/.test(h))
          ] || "";

        selectedEmailField.value =
          normalizedKeys[
            lowerHeaders.findIndex((h) => /(email|e[-_]?mail|mail)/.test(h))
          ] || "";

        selectedNameField.value =
          normalizedKeys[
            lowerHeaders.findIndex((h) => /(name|fullName|recipient)/.test(h))
          ] || "";

        if (isCancelled.value) return;

        uploadProgress.value = 95;
        processingStage.value = "Validating fields...";

        validateFields();

        if (isCancelled.value) return;

        uploadProgress.value = 100;
        processingStage.value = "Complete!";

        nextTick(() => {
          if (isCancelled.value) return;
          
          tableKey.value++;
          
          setTimeout(() => {
            if (isCancelled.value) return;
            
            isLoading.value = false;
            showAlert();
          }, 500);
        });

        console.log("✅ Normalized headers:", normalizedKeys);
        console.log("📦 Cleaned contacts:", cleanedData.length);
        console.log("📊 Validation stats:", validationStats.value);
      } catch (err) {
        if (isCancelled.value) return;
        
        console.error("❌ Failed to parse file:", err);
        parseErrors.value.push(`Failed to parse file: ${err.message}`);
        isLoading.value = false;
        showAlert();
      }
    }, 100);
  };

  reader.onerror = () => {
    if (isCancelled.value) return;
    
    parseErrors.value.push("Failed to read the file.");
    isLoading.value = false;
    showAlert();
  };

  reader.onabort = () => {
    console.log("📤 File reading aborted");
  };

  if (isExcel) {
    reader.readAsArrayBuffer(file);
  } else if (isCSV) {
    reader.readAsText(file);
  } else {
    parseErrors.value.push("Invalid file format.");
    isLoading.value = false;
    showAlert();
  }
}

function openModal() {
  const modalEl = document.getElementById("csvUploadModal");
  if (!modalEl) return;

  const isAlreadyOpen = modalEl.classList.contains("show");

  if (!isAlreadyOpen) {
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
    modal.show();
  }
}

function handleSubmitMapping() {
    this.loadingUploadedData = true;
    this.submitMapping();
  }

const submitMapping = async () => {
  if (!selectedPhoneField.value && !selectedEmailField.value) {
    alert("Please select at least one field (Phone Number or Email Address).");
    return;
  }

  const validationSummary = {
    phone: validationStats.value.phone,
    email: validationStats.value.email,
    name: validationStats.value.name,
    totalValidContacts: Math.max(
      validationStats.value.phone.valid,
      validationStats.value.email.valid
    ),
  };

  // Create mapped contacts with name, phone, email first
  const mappedContacts = parsedContacts.value.map((contact) => {
    const renamed = {};

    if (selectedNameField.value) {
      renamed.name = contact[selectedNameField.value];
    }

    if (selectedPhoneField.value) {
      renamed.phone = contact[selectedPhoneField.value];
    }

    if (selectedEmailField.value) {
      renamed.email = contact[selectedEmailField.value];
    }

    // Add the rest of the fields, excluding the selected ones
    Object.keys(contact).forEach((key) => {
      if (
        key !== selectedNameField.value &&
        key !== selectedPhoneField.value &&
        key !== selectedEmailField.value
      ) {
        renamed[key] = contact[key];
      }
    });

    return renamed;
  });

  const mappedData = {
    contacts: mappedContacts,
    phoneField: selectedPhoneField.value,
    emailField: selectedEmailField.value,
    nameField: selectedNameField.value,
    validation: validationSummary,
  };

  console.log("Submitting mapped data:", mappedData);

  emit("contactsSelected", mappedData.contacts);

  const modalEl = document.getElementById("csvUploadModal");
  if (modalEl) {
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) {
      console.log("Hiding modal...");
      modal.hide();
      emit('show-toast', {
        toastType: 'success',
        toastMessage: 'Contacts Successfully Added',
      });
      toastType.value = 'success';
      toastMessage.value = `${parsedContacts.value.length} Contacts Successfully Added`;

      nextTick(() => {
        const btn = document.getElementById('uploadContactsBtnToast');
        btn?.click();
      });
    } else {
      console.warn("Bootstrap modal instance not found.");
    }
  } else {
    console.warn("Modal element not found.");
  }

  loadingUploadedData.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  loadingUploadedData.value = false;
};



// Watchers
watch(
  () => props.file,
  (newVal) => {
    console.log("Child received new file:", newVal);
    if (newVal) {
      fileName.value = newVal.name;
      
      isLoading.value = true;
      alertDismissed.value = true;
      
      openModal();
      
      nextTick(() => {
        setTimeout(() => {
          parseUploadedFile(newVal);
        }, 100);
      });
    }
  }
);

watch(
  () => parsedContacts.value,
  () => {
    nextTick(() => {
      tableKey.value++;
      if (parsedContacts.value.length > 0) {
        setTimeout(() => {
          validateFields();
        }, 100);
      }
    });
  },
  { deep: true }
);

watch([selectedPhoneField, selectedEmailField, selectedNameField], () => {
  if (parsedContacts.value.length > 0) {
    validateFields();
    validationFilter.value = "all";
    applyValidationFilter();
  }
});
</script>

<style lang="scss" scoped>
.upload-contacts-table-cont {
  border: 1px solid #9e9e9e61;
}

.upload-contacts-table-cont .table-striped > tbody > tr:nth-of-type(odd) > * {
  color: var(--bs-table-striped-color);
}

.upload-contacts-table-cont .table-bordered > :not(caption) > * > * {
  border: 1px solid #50a5f185;
}

.dt-scroll-body thead {
  visibility: collapse;
  height: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
}

.filter-box {
  padding: 1rem;
  border-bottom: 2px solid #2196f3;
  font-weight: bold;
  display: flex;
}

.dt-search label{
  display: none;
}

.customTableStyle thead{
  text-transform: capitalize;
  border-top: 1px solid grey;
}

.table.dataTable{
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}

.customTableStyle .table>:not(caption)>*>*{
  border-bottom: none;
}
.dt-input{
   padding: 7px;
   padding: .47rem 1.75rem .47rem .75rem;
   border: 1px solid var(--bs-input-border-color);
}
.dataTables_length-custom  label{
  margin: 0px;
}
.dataTables_filter-custom input{
  height: 38px;
    padding-left: 40px;
    padding-right: 20px;
    -webkit-box-shadow: none;
    box-shadow: none;
    border-radius: 0px;
    font-size: 13px;
    border: 1px solid var(--bs-input-border-color);
    outline-offset: 0px;
    flex-grow: 1;
}

.dataTables_filter-custom .dt-search{
  display: flex;
  flex-grow: 1;
}

.dataTables_length-custom .dt-length{
  display: flex;
}

.dataTables_length-custom .dt-length select{
  height: 38px;
}.dataTables_length-custom .dt-input{
  border-radius: 0px;
}

/* Validation styling for table cells - only errors highlighted */
.bg-danger-subtle {
  background-color: #f8d7da !important;
  border-color: #f5c2c7 !important;
}

.bg-warning-subtle {
  background-color: #fff3cd !important;
  border-color: #ffecb5 !important;
}

.valid-filter{
  border-radius: 0px;
  height: 38px;
}

.enhanced-success-card .form-select{
  padding: 13px;
  border-radius: 0px;
  margin-bottom: 15px;
}

/* New styles for recommendations and loading states */
.recommendations-container {
  min-height: 60px;
  position: relative;
}

.recommendation-content {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.recommendation-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
}

.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.recommendation-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  line-height: 1.4;
  transition: all 0.2s ease;
  animation: slideInFromTop 0.3s ease-out;
}

.recommendation-item.rec-success {
  background-color: rgba(25, 135, 84, 0.1);
  border-left: 3px solid #198754;
  color: #0f5132;
}

.recommendation-item.rec-error {
  background-color: rgba(220, 53, 69, 0.1);
  border-left: 3px solid #dc3545;
  color: #721c24;
}

.recommendation-item.rec-warning {
  background-color: rgba(255, 193, 7, 0.1);
  border-left: 3px solid #ffc107;
  color: #664d03;
}

.recommendation-item.rec-suggestion {
  background-color: rgba(13, 110, 253, 0.1);
  border-left: 3px solid #0d6efd;
  color: #052c65;
}

.recommendation-item.rec-info {
  background-color: rgba(108, 117, 125, 0.1);
  border-left: 3px solid #6c757d;
  color: #495057;
}

.recommendation-item:hover {
  transform: translateX(2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.recommendation-item button {
  border-radius: 4px;
  font-size: 11px;
  line-height: 1.2;
  transition: all 0.2s ease;
}

.recommendation-item button:hover {
  transform: scale(1.05);
}

/* Field loading overlay */
.field-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 6px;
}

/* Modern skeleton loaders */
.skeleton-loader {
  height: 38px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 6px;
  width: 100%;
}

.skeleton-text {
  height: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 6px;
  margin-bottom: 4px;
}

.skeleton-text.short {
  width: 60%;
}

/* Skeleton loading animation */
@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Slide in animation for recommendations */
@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Pulse animation for loading states */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}


/* Enhanced progress bar styling */
.progress {
  background-color: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.progress-bar {
  background: linear-gradient(45deg, #007bff, #0056b3);
  transition: width 0.3s ease;
  position: relative;
  overflow: hidden;
}

.progress-bar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  animation: progress-bar-stripes 1s linear infinite;
}

@keyframes progress-bar-stripes {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}

/* Enhanced badge styling */
.badge {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Enhanced spinner */
.spinner-border {
  animation: spinner-border 1s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive improvements */
@media (max-width: 768px) {
  .recommendation-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .recommendation-item button {
    align-self: flex-start;
  }
  
  .recommendations-container {
    min-height: 80px;
  }
}



/* Dark mode support (if needed) */
@media (prefers-color-scheme: dark) {
  .skeleton-loader,
  .skeleton-text,
  .stats-skeleton,
  .stats-skeleton-text,
  .stats-skeleton-badge {
    background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
    background-size: 200% 100%;
  }
  
  .field-loading-overlay {
    background: rgba(33, 37, 41, 0.9);
  }
}

/* Enhanced badge hover effects */
.badge.animated-badge:hover {
  transform: scale(1.1);
}

/* Smooth transitions for stats */
.list-group-item {
  transition: background-color 0.2s ease;
}

.list-group-item:hover {
  background-color: rgba(0,0,0,0.02);
}
.alert,.recommendation-item {
  border-radius: 0px;
}
</style>