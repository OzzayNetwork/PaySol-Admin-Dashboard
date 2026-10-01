<template>
  <!-- the message composer -->
  <div class="email-overlay d-none">
    <div class="card the-message-maker">
      <div class="card-header pe-0 pt-0 bg-light bg-dark-subtl border-0">
        <div class="d-flex justify-content-between text-black align-items-baseline">
          <div>
            <h5 class="mb-0 p-0 m-0 modal-tittle text-black">Compose Message</h5>
            <p class="text-muted ">Send a message to selected contacts</p>
          </div>
          <div class="control-btns">
            <div class="dropdownd-lg-inline-block ms-1 text-black">
              <button type="button" class="btn header-item noti-icon waves-effect minimize text-black">
                <i class="mdi mdi-window-minimize text-black"></i>
              </button>
              <button type="button" class="btn header-item noti-icon waves-effect fullscreen text-black">
                <i class="bx bx-fullscreen text-black"></i>
              </button>

              <button type="button" class="btn header-item noti-icon waves-effect close-message-maker text-black">
                <i class="mdi mdi-close text-black"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card-header p-0">
        <ul class="nav nav-tabs nav-tabs-custom nav-justified border-bottom-0" role="tablist">

          <!-- 🟦 Tab 1: Saved Contacts -->
          <li class="nav-item py-2" role="presentation">
            <a class="nav-link active d-flex justify-content-center" data-bs-toggle="tab" href="#savedContacts"
              role="tab" aria-selected="true"
              title="Send messages to contacts already saved in the system's address book">
              <span class="d-block d-sm-none "><i class="bx bx-book-content fs-3"></i></span>
              <span class="d-none d-sm-flex"><i class="bx bx-book-content me-1 fs-3 me-2"></i> <span>Saved
                  Contacts</span></span>
            </a>
          </li>

          <!-- 🟨 Tab 2: Upload Contacts -->
          <li class="nav-item py-2" role="presentation">
            <a class="nav-link  d-flex justify-content-center" data-bs-toggle="tab" href="#uploadContacts" role="tab"
              aria-selected="false" tabindex="-1"
              title="Upload a CSV file with contacts and custom fields to send personalized messages">
              <span class="d-block d-sm-none"><i class="bx bx-upload fs-3"></i></span>
              <span class="d-none d-sm-flex"><i class="bx bx-upload me-1 fs-3 me-2"></i> <span>Upload
                  Contacts</span></span>
            </a>
          </li>

        </ul>
      </div>
      <div class="card-header p-0">



      </div>
      <div class="card-header p-0">
        <div class="tab-content p-0">
          <div class="tab-pane active show" id="savedContacts" role="tabpanel">
            <TagifyTestVue @contactsSelected="handleSelectedContacts" />
            <p class="d-none">Selected contacts is {{ selectedContactsCount }}</p>
          </div>
          <div class="tab-pane" id="uploadContacts" role="tabpanel">
            <label class=" bg-success-subtl bg-opacity-10 bg-success w-100 mb-0 cursor-pointer"
              for="uploadContactsInput">
              <div class="p-3 py-0 d-flex align-items-center gap-3 d-non">
                <div>
                  <h1 class="mt-3"><i class="mdi mdi-microsoft-excel text-black fs-large"></i></h1>
                </div>
                <div>
                  <h6 class="text-black mb-0">Select CSV or Excel File to Upload</h6>
                  <p class="text-muted mb-0 pb-0">
                    {{ selectedFileName ? 'File Selected: ' + selectedFileName : 'File Not Selected' }}
                  </p>
                </div>
                <span class="ms-auto" v-if="selectedFileName!=''">
                <button 
                  type="button" 
                  class="btn btn-link waves-effect text-danger btn-sm fw-bold"
                  @click="clearFileSelection"
                >
                  <i class="bx bx-block font-size-16 align-middle me-2"></i>Clear Selection
                </button>
              </span>
              </div>
            </label>
            <input @change="handleFileUpload" class="form-control d-none" type="file" id="uploadContactsInput"
              ref="fileInput"
              accept=".xlsx, .xls, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">

            <div class="p-3 gap-2 d-flex align-items-center" v-if="selectedContacts.length > 0">
              <div class="d-flex d-non align-items-center justify-content-between w-100 gap-2">
                <div class="d-flex gap-2 view-all-contacts cursor-pointer">
                  <p class="p-0 m-0 text-muted">
                    <strong>To:</strong> {{ firstFour.join(', ') }}
                  </p>
                  <span v-if="remainingCount > 0" class="badge bg-dark-subtle text-muted fs-6">
                    {{ remainingCount }} More
                  </span>

                </div>
                <div>
                  <label for="uploadContactsInput" class="btn btn-link waves-effect text-black btn-sm fw-bold"><i
                      class="bx bx-highlight font-size-16 align-middle me-2"></i> Change Source</label>
                </div>
              </div>


              <div v-if="selectedContacts.length > 0" class="d-flex flex-wrap gap-2 d-none all-contacts-display">
                <div v-for="(name, index) in uploadedContactsDisplay" :key="index" style="border-radius: 24px;"
                  class="d-flex align-items-center badge bg-dark-subtle py-0 m-0">
                  <div class="avatar-xs align-self-center me- d-flex align-items-center">
                    <span class="avatar-title rounded-circle text-white text-uppercase"
                      style="height: 1.3rem; width: 1.3rem; display: inline-flex; align-items: center; justify-content: center;">
                      {{ name.charAt(0) }}
                    </span>
                  </div>
                  <span class="me-1">{{ name }}</span>
                </div>


              </div>

            </div>

          </div>


        </div>
      </div>

      <!-- Debug Section - Remove this in production -->
      <div class="card-header p-2 bg-warning bg-soft d-none" hidden v-if="selectedContacts.length > 0">
        <small>
          <strong>Debug Info:</strong><br>
          Contacts loaded: {{ selectedContactsCount }}<br>
          Available tags: {{ availableMessageTags.length }}<br>
          <span v-if="selectedContacts[0]">
            Sample contact fields: {{ Object.keys(selectedContacts[0]).join(', ') }}
          </span>
        </small>
      </div>
      <div class="card-header px-0 p-0 bg-light d-flex border-bottom-1  border-1">
        <div class="p-3 tag-text">
          <p class="m-0 p-0 text-uppercase">Tags:</p>
        </div>
        <div v-if="selectedContacts.length > 0 && availableMessageTags.length > 0"
          class="flex-grow-1 py-3 pr-3 gap-1 d-flex click-tag-view cursor-pointer overflow-hidden">
          <span v-for="tag in availableMessageTags" :key="tag.key" class="badge bg-dark  py- m-0">
            @@{{ tag.label }}
          </span>
        </div>

        <div v-if="selectedContacts.length > 0 && availableMessageTags.length > 0"
          class="flex-grow-1 p-3 gap-2 d-flex flex-wrap d-none view-all-tags">
          <span v-for="tag in availableMessageTags" :key="tag.key" class="badge bg-dark  py- m-0">
            @@{{ tag.label }}
          </span>
        </div>



        <div v-else class="d-flex p-3 pl-0">
          <span class="text-muted">Select contacts to see all available field tags</span>
        </div>
      </div>

      <div class="card-header px-0 p-0 d-flex">
        <input type="text"
          class="w-100 border-top-0 border-left-0 border-right-0 form-control  border-radius-0 px-3 py-3 border-right-0 border-left-0 border-0 fw-bold"
          v-model="composedRawMessageTittle" placeholder="Subject:" name="" id="">
        <div class="dropdown my-2 me-3"><a href="#"
            class="btn btn-light btn-rounded waves-effect btn-sm waves-effect dropdown-toggle px-3"
            data-bs-toggle="dropdown" aria-expanded="false"><i
              class="mdi mdi-file-document-outline font-size-16 align-middle me-2"></i> Use Template <i
              class="mdi mdi-chevron-down ms-1"></i></a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">AGM Parents Meeting</a>
            <a class="dropdown-item" href="#">Report Template</a>
            <a class="dropdown-item" href="#">Custom Template</a>
          </div>
        </div>
      </div>
      <div class="card-header px-0 p-0 position-relative border-bottom-0">
        <div v-if="uploadMultipleFiles!=''" class="p-3 d-flex gap-2 pb-0 flex-wrap">
          <div v-for="(file,index) in uploadMultipleFiles" :key="fileKey(file)"
            class="d-flex gap-2 p-2  bg-dark-subtle">
            <div class="ms-1">
              <div class="avatar-xs mx-auto">
                <span class="avatar-title rounded-circle bg-success font-size-16">
                  <i :class="getFileIcon(file) + ' text-white bx'"></i>
                </span>
              </div>
            </div>
            <div>
              <p class="fw-semibold mb-0 text-black">{{file.name}}</p>
              <span class="text-muted">{{getFileType(file)}} - {{formatSize(file.size)}} </span>
            </div>
            <div>
              <button type="button" @click="removeFile(index)"
                class="btn btn-light position-relative p-0 avatar-xs rounded-circle ms-3 me-1" title="remove File"
                fdprocessedid="79pw2k">
                <span class="avatar-title bg-transparent text-danger">
                  <i class="bx bxs-trash"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
        <input class="form-control form-control-lg d-none" hidden multiple @change="handleMultipleFileChange"
          id="uploadFile" type="file">
        <textarea ref="messageTextarea" name="" placeholder="Write your message (use @@ to mention tags)" id="" rows="5"
          class="form-control w-100 border-top-0 border-left-0 border-right-0 border-0 p-3 chat-textarea"
          v-model="composedRawMessage" @input="handleTextareaInput" @keydown="handleTextareaKeydown"></textarea>

        <!-- Tag Predictor Menu -->
        <div v-if="showTagMenu" class="position-absolute bg-white border rounded shadow-lg" :style="tagMenuStyle"
          style="z-index: 10000; width: auto;  overflow-y: auto; width: 200px;">
          <div v-if="filteredTags.length > 0">
            <div class="px-3 py-2 text-muted small border-bottom">
              Select a tag to insert
            </div>
            <div v-for="(tag, index) in filteredTags" :key="tag.key" @click="insertTag(tag)"
              @mouseenter="highlightedIndex = index" :class="{
                'bg-primary text-white': highlightedIndex === index,
                'border-bottom tag-container': highlightedIndex !== index
              }" class="px-3 py-2 cursor-pointer border-bottom" style="cursor: pointer;">
              <div class="fw-bold">@@{{ tag.label }}</div>
              <div class="small text-muted" v-if="highlightedIndex !== index">{{ tag.description || 'Insert this tag' }}
              </div>
            </div>
          </div>
          <div v-else class="px-3 py-2 text-muted small">
            No tags found for "{{ searchTerm }}"
          </div>
        </div>
      </div>
      <div class="card-header p-0 border-0">
        <div class="p-3">
          <div class="d-flex w-100 justify-content-between">
            <div class="d-flex gap-2">
              <label type="button" for="uploadFile" class="btn btn-light btn-rounded waves-effect btn-sm px-3 m-0"
                fdprocessedid="7ei1af"><i class="dripicons-paperclip font-size-16 align-middle me-2"></i> Attach</label>

              <!-- Use Template Dropdown -->
              <button type="button" class="btn btn-dark waves-effect waves-light btn-sm btn-rounded px-3">
                <span class="font-size-16 align-middle me-">✨</span> Edit WIth AI
              </button>
            </div>
            <div class="d-flex gap-2">


              <!-- Ask AI Button -->
              <button type="button" class="btn btn-dark waves-effect waves-light btn-sm btn-rounded px-3 d-none">
                <span class="mdi mdi-sparkles font-size-16 align-middle me-2"></span> 🪄 Edit With AI
              </button>
            </div>
          </div>

        </div>
      </div>
      <div class="card-body p-0">
        <div class="p-3 bg-info bg-soft msg-preview">
          <h5 class="modal-tittle text-black fw-bold mb-3 text">Message Preview</h5>
          <p class="fw-bold mb-1" v-if="composedRawMessage && composedRawMessage.trim() !== ''">
            {{ composedRawMessageTittle }}
          </p>
          <p class="m-0 text-info fw-bol text-dark text-opacity-50"
            v-if="!composedRawMessage || composedRawMessage.trim() === ''">
            <i>Start typing and your message preview will appear here</i>
          </p>
          <p class="" v-else v-html="msgPreview"></p>
        </div>
      </div>
      <div class="card-body p-0 top-shade-card position-relative">
        <div class="p-3">
          <label for="" class="mb-3 fw-bold text-black">Sending Channells</label>
         <!-- Boxicons CDN -->

          <div class="d-flex gap-4">
              <div class="form-check form-check-primary mb-3">
                  <input class="form-check-input" type="checkbox" id="formCheckcolor1" style="transform: scale(1.3);" checked>
                  <label class=" mb-0 mt-0 form-check-label d-flex" for="formCheckcolor1">
                      <i class="bx bx-chat me-1 fs-3"></i> SMS
                  </label>
              </div>

              <div class="form-check form-check-success mb-3">
                  <input class="form-check-input" type="checkbox" id="formCheckcolor2" style="transform: scale(1.3);">
                  <label class=" mb-0 mt-0 form-check-label d-flex" for="formCheckcolor2">
                      <i class="bx bx-envelope me-1 fs-3"></i> Email
                  </label>
              </div>

              <div class="form-check form-check-info mb-3 d-fle">
                  <input class="form-check-input" type="checkbox" id="formCheckcolor3" style="transform: scale(1.3);" >
                  <label class=" mb-0 mt-0 form-check-label d-flex align-items-center
                  " for="formCheckcolor3">
                      <i class="bx bxl-whatsapp me-1 fs-3"></i> WhatsApp
                  </label>
              </div>
          </div>

        </div>
      </div>
      <div class="card-footer p-0">
        <div class="p-3 d-flex gap-3 ">
          <div class="gap-3 d-flex justify-content-between w-100">
            <div class="d-flex gap-3">
               <div class="btn-group">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Send <i class="mdi mdi-chevron-down ms-1"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">
                            <i class="mdi mdi-send me-2 text-black font-size-16"></i> Send Now
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="mdi mdi-calendar-clock me-2 text-black font-size-16"></i> Schedule for Later
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="mdi mdi-content-save-outline me-2 text-black font-size-16"></i> Send & Save as Template
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="mdi mdi-file-document-edit-outline me-2 text-black font-size-16"></i> Draft Message
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">
                            <i class="mdi mdi-eye-outline me-2 text-muted font-size-16"></i> Preview Message
                        </a>
                    </div>
                </div>
              
              <button type="button" class="btn btn-soft-dark waves-effect waves-light" fdprocessedid="ms6iel"><i class="mdi mdi-file-document-edit-outline font-size-16 align-middle me-2"></i> Draft Message</button>
               

            </div>
           <!-- Add this in your <head> if not already loaded -->

            <div class="gap-3 d-flex ">

              
                 <button type="button" class="btn btn-light waves-effect waves-light btn-rounded"
                title="Delete the message">
                <i class="bx bx-trash font-size-16 align-middle"></i>
              </button>
            </div>

          </div>
        </div>
      </div>
     
    </div>

  </div>
  <!-- message composer end -->

  <!-- Modal for processing uploaded contacts -->
  <UploadingContactsResultsModalVue :file="uploadedFile" file-input-id="uploadContactsInput"
    @contactsSelected="handleUploadedContacts" @file-cleared="handleFileClear" @show-toast="handleToast" />
  <!-- end of uploaded contacts modal -->
</template>

<script setup>
import {GoogleGenerativeAI} from "@google/generative-ai"
import { ref, computed, onMounted, onUnmounted } from "vue";
import TagifyTestVue from "../../components/TagifyTest.vue";
import getCaretCoordinates from 'textarea-caret';
import UploadingContactsResultsModalVue from "../../components/uploadingContacts.results.modal.vue";
import FileUploadMultipletest from "./fileUploadMultipletest.vue"


// Reactive data to store selected contacts
const selectedContacts = ref([])
const selectedContactsCount = ref(0)
const availableMessageTags = ref([])
const composedRawMessage = ref('')
const composedRawMessageTittle = ref('')

// displaying uploaded contacts
const uploadedContactsDisplay=ref([])
const firstFour = computed(() => uploadedContactsDisplay.value.slice(0, 3))
const remainingCount = computed(() => uploadedContactsDisplay.value.length - firstFour.value.length)


// Tag predictor state
const showTagMenu = ref(false)
const searchTerm = ref('')
const atPosition = ref(0)
const tagMenuStyle = ref({})
const messageTextarea = ref(null)
const highlightedIndex = ref(0)

// uploading file
const selectedFileName = ref('');
const uploadedFile = ref(null);
const fileInput = ref(null);

// Contact source tracking
const contactSource = ref('') // 'saved' or 'uploaded'


// Computed property for filtered tags
const filteredTags = computed(() => {
  if (!searchTerm.value) {
    return availableMessageTags.value.map(tag => ({
      ...tag,
      description: `Insert ${tag.label} tag`
    }))
  }

  return availableMessageTags.value.filter(tag =>
    tag.label.toLowerCase().includes(searchTerm.value.toLowerCase())
  ).map(tag => ({
    ...tag,
    description: `Insert ${tag.label} tag`
  }))
})

// Computed message preview with real data
const msgPreview = computed(() => {
  let message = composedRawMessage.value;

  // Use the first contact if available
  const firstContact = selectedContacts.value.length > 0 ? selectedContacts.value[0] : null;

  if (!firstContact) return message;

  console.log('Creating preview with first contact:', firstContact);
  console.log('Available tags:', availableMessageTags.value);

  availableMessageTags.value.forEach(tag => {
    const regex = new RegExp(`@@${tag.label}`, 'gi');
    // Use the actual field name from the contact
    const fieldName = tag.actualField || tag.key || tag.label;
    const value = firstContact[fieldName] || `[${tag.label}]`;
    const boldValue = `<strong>${value}</strong>`;
    message = message.replace(regex, boldValue);
    
    console.log(`Replacing @@${tag.label} with ${value} using field ${fieldName}`);
  });
  
  console.log('Final preview message:', message);
  return message;
});

/**
 * Handle contacts selected from uploaded file
 * @param {Array} uploadedContacts - Array of uploaded contact objects
 */
function handleUploadedContacts(uploadedContacts) {
  console.log("=== HANDLING UPLOADED CONTACTS ===");
  console.log("Contacts from Upload:", uploadedContacts);
  console.log("First contact:", uploadedContacts[0]);
  console.log("Contact keys:", uploadedContacts[0] ? Object.keys(uploadedContacts[0]) : 'No contacts');

  uploadedContactsDisplay.value = uploadedContacts.map(c =>
    c.name?.trim() || c.phone?.trim() || c.email?.trim() || 'Unknown'
  );

  selectedContacts.value = uploadedContacts;
  selectedContactsCount.value = uploadedContacts.length;
  contactSource.value = 'uploaded';
  updateAvailableMessageTags(uploadedContacts);
  showContactsLoadedFeedback();

  // Declare these as local variables
  const firstFour = uploadedContactsDisplay.value.slice(0, 4);
  const remainingCount = uploadedContactsDisplay.value.length - firstFour.length;

  console.log('First 4 display names:', firstFour);
  console.log('Remaining count:', remainingCount);
  console.log('All selected contacts:', selectedContacts.value);
  console.log('All display names:', uploadedContactsDisplay.value);
}




/**
 * Show feedback that contacts have been loaded
 */
function showContactsLoadedFeedback() {
  console.log(`✅ ${selectedContactsCount.value} contacts loaded successfully!`)
  
  // Optional: Auto-focus the message textarea
  setTimeout(() => {
    if (messageTextarea.value) {
      messageTextarea.value.focus()
    }
  }, 500)
}

/**
 * Handle file clearing from child component
 */
function handleFileClear() {
  console.log('File cleared by user')
  
  // Clear the selected file
  uploadedFile.value = null
  selectedFileName.value = ''
  
  // Clear the file input value
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  
  // Only clear contacts if they came from uploaded file
  if (contactSource.value === 'uploaded') {
    selectedContacts.value = []
    selectedContactsCount.value = 0
    availableMessageTags.value = []
  }
  
  contactSource.value = ''
}

/**
 * Handle contacts selected from the Tagify component
 * @param {Array} contacts - Array of selected contact objects
 */
function handleSelectedContacts(contacts) {
  console.log('Received contacts from Tagify:', contacts)

  // Store the contacts data
  selectedContacts.value = contacts
  selectedContactsCount.value = contacts.length
  contactSource.value = 'saved' // Set source to saved

  // Update available message tags based on selected contacts
  updateAvailableMessageTags(contacts)

  console.log('selected contacts count', selectedContactsCount.value)
}

/**
 * Update available message tags based on selected contacts - COMPLETELY DYNAMIC
 * @param {Array} contacts - Array of selected contact objects
 */
function updateAvailableMessageTags(contacts) {
  console.log("=== UPDATING AVAILABLE MESSAGE TAGS ===");
  
  if (contacts.length === 0) {
    console.log("No contacts, clearing tags");
    availableMessageTags.value = []
    return
  }

  // Get all possible fields from the first contact
  const firstContact = contacts[0]
  const availableFields = Object.keys(firstContact)
  
  console.log('First contact:', firstContact);
  console.log('Available fields in contacts:', availableFields);

  // Create completely dynamic tags based on actual field names
  const availableTags = []
  
  // Check each available field
  availableFields.forEach(fieldName => {
    console.log(`Checking field: ${fieldName}`);
    
    // Check if ALL contacts have this field and it's not empty
    const allContactsHaveField = contacts.every(contact => {
      const hasField = contact[fieldName] &&
        contact[fieldName] !== null &&
        contact[fieldName] !== undefined &&
        String(contact[fieldName]).trim() !== ''
      
      console.log(`  Contact has ${fieldName}:`, hasField, 'Value:', contact[fieldName]);
      return hasField;
    })

    console.log(`  All contacts have ${fieldName}:`, allContactsHaveField);

    if (allContactsHaveField) {
      // Use the actual field name as the tag label (completely dynamic)
      const tag = {
        key: fieldName,
        label: fieldName, // Use the exact field name as the label
        actualField: fieldName, // Store the actual field name for reference
        displayName: createDisplayName(fieldName) // Create a prettier display name for UI
      };
      
      availableTags.push(tag);
      console.log(`  Added tag:`, tag);
    }
  })

  availableMessageTags.value = availableTags
  console.log('Final available message tags:', availableMessageTags.value);
}

/**
 * Create a prettier display name for UI purposes (but keep original field name as tag)
 * @param {string} fieldName - The actual field name
 * @returns {string} - A prettier display name
 */
function createDisplayName(fieldName) {
  // Convert camelCase or snake_case to readable format
  return fieldName
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
    .trim()
}

/**
 * Get a sample value from the first contact for a given field (renamed for clarity)
 * @param {string} fieldName - The field name to get sample value for
 * @returns {string} - Sample value or placeholder
 */
function getFieldValue(fieldName) {
  if (selectedContacts.value.length === 0) return '[No data]'
  
  const firstContact = selectedContacts.value[0]
  const value = firstContact[fieldName]
  
  if (!value) return '[Empty]'
  
  // Truncate long values for display
  const stringValue = String(value)
  return stringValue.length > 20 ? stringValue.substring(0, 20) + '...' : stringValue
}

/**
 * Handle textarea input for tag detection
 */
function handleTextareaInput(event) {
  const value = event.target.value
  const cursorPosition = event.target.selectionStart

  // Check if user typed @@ and get the position
  const lastDoubleAtIndex = value.lastIndexOf('@@', cursorPosition - 1)

  if (lastDoubleAtIndex !== -1) {
    // Check if the @@ is at the start or preceded by whitespace
    const charBeforeDoubleAt = lastDoubleAtIndex > 0 ? value[lastDoubleAtIndex - 1] : ' '
    const isValidAtPosition = charBeforeDoubleAt === ' ' || charBeforeDoubleAt === '\n' || lastDoubleAtIndex === 0

    if (isValidAtPosition) {
      // Get text after @@
      const textAfterAt = value.substring(lastDoubleAtIndex + 2, cursorPosition)

      // Check if there's no space after @@ (still typing the tag)
      if (!textAfterAt.includes(' ') && !textAfterAt.includes('\n')) {
        searchTerm.value = textAfterAt
        atPosition.value = lastDoubleAtIndex
        highlightedIndex.value = 0

        // Calculate menu position
        const textarea = messageTextarea.value
        const rect = textarea.getBoundingClientRect()
        const coords = getCaretCoordinates(textarea, cursorPosition);

        // Position menu below textarea
        tagMenuStyle.value = {
          top: `${coords.top}px`, // Add offset for dropdown
          left: `${coords.left}px`
        }

        showTagMenu.value = true
        return
      }
    }
  }

  showTagMenu.value = false
  autoResize
}

/**
 * Handle keyboard navigation in tag menu
 */
function handleTextareaKeydown(event) {
  if (!showTagMenu.value) return

  switch (event.key) {
    case 'Escape':
      showTagMenu.value = false
      event.preventDefault()
      break

    case 'ArrowDown':
      highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredTags.value.length - 1)
      event.preventDefault()
      break

    case 'ArrowUp':
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      event.preventDefault()
      break

    case 'Enter':
    case 'Tab':
      if (filteredTags.value[highlightedIndex.value]) {
        insertTag(filteredTags.value[highlightedIndex.value])
        event.preventDefault()
      }
      break
  }
}

/**
 * Insert selected tag into message
 */
function insertTag(tag) {
  const beforeAt = composedRawMessage.value.substring(0, atPosition.value)
  const afterSearch = composedRawMessage.value.substring(atPosition.value + 2 + searchTerm.value.length)

  const newMessage = beforeAt + '@@' + tag.label + ' ' + afterSearch
  composedRawMessage.value = newMessage
  showTagMenu.value = false

  // Focus back to textarea and position cursor
  setTimeout(() => {
    messageTextarea.value.focus()
    const newCursorPos = beforeAt.length + tag.label.length + 3 // +3 for @@ and space
    messageTextarea.value.setSelectionRange(newCursorPos, newCursorPos)
  }, 0)
}

/**
 * Close menu when clicking outside
 */
function handleClickOutside(event) {
  if (showTagMenu.value &&
    !event.target.closest('.position-absolute') &&
    !event.target.closest('textarea')) {
    showTagMenu.value = false
  }
}

// uploading file input
function handleFileUpload(event) {
  const file = event.target.files[0];
  uploadedFile.value = file;
  selectedFileName.value = file ? file.name : '';
  
  // Clear any existing selected contacts when a new file is selected
  selectedContacts.value = []
  selectedContactsCount.value = 0
  availableMessageTags.value = []
}

// Add event listeners
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})



// jQuery scripts for opening and closing the message composer
if (typeof $ !== 'undefined') {
  $('body').on('click', '.write-msg-btn', function () {
    $('.email-overlay').removeClass('d-none')
    setTimeout(function () {
      $('.the-message-maker').addClass('email-overlay-transform');
    }, 0)
  });

  $('body').on('click', '.close-message-maker', function () {
    $('.the-message-maker').removeClass('email-overlay-transform')
    setTimeout(function () {
      $('.email-overlay').addClass('d-none');
    }, 200);
  });

  $('body').on('click', '.fullscreen', function () {
    $('.the-message-maker').toggleClass('email-fullscreen')
    $('.email-overlay').toggleClass('email-overlay-fullscreen')
    $('.email-overlay').removeClass('p-relative')
    $(this).parent().parent().parent().parent().siblings().removeClass('d-none');
    $(this).children('i').toggleClass("bx-exit-fullscreen")
    $(this).children('i').toggleClass("bx-fullscreen")
  })

  $('body').on('click', '.minimize', function () {
    $(this).parent().parent().parent().parent().siblings().toggleClass('d-none');
    $('.email-overlay').toggleClass('p-relative')
    $('.the-message-maker').removeClass('email-fullscreen')
    $('.email-overlay').removeClass('email-overlay-fullscreen')

    $(".fullscreen").children('i').removeClass("bx-exit-fullscreen")
    $(".fullscreen").children('i').addClass("bx-fullscreen")
  });

  //showing and hiding all contacts
  $('body').on('click', '.view-all-contacts', function(){
    $(this).parent().addClass('d-none')
    $('.all-contacts-display').removeClass('d-none')
  })

  // Reverse the action when clicking outside .all-contacts-display or .view-all-contacts
  $(document).on('click', function(e) {
    // If the clicked target is NOT inside .email-overlay OR it's inside but not .all-contacts-display/.view-all-contacts
    if (
      !$(e.target).closest('.all-contacts-display').length &&
      !$(e.target).closest('.view-all-contacts').length
    ) {
      $('.all-contacts-display').addClass('d-none');
      $('.view-all-contacts').parent().removeClass('d-none');
    }

    
  });

  $('body').on('click','.click-tag-view', function(){
    $(this).addClass('d-none')
    $('.view-all-tags').removeClass('d-none')
    $('.tag-text').addClass('d-none')

  })

  $(document).on('click', function (e) {
  if (!$(e.target).closest('.view-all-tags').length && !$(e.target).hasClass('click-tag-view')) {
    // Reverse the changes
    $('.click-tag-view').removeClass('d-none');
    $('.view-all-tags').addClass('d-none');
    $('.tag-text').removeClass('d-none');
  }
});

}

const messageInput = ref(null)
const autoResize = () => {
  const el = messageInput.value
  if (!el) return

  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 120) + 'px'
}

// uploading multiple files
const uploadMultipleFiles=ref([])
const handleMultipleFileChange=(e)=>{
  const newFiles=Array.from(e.target.files)
  // Avoid duplicates by checking name and size
  newFiles.forEach(file => {
    const exists = uploadMultipleFiles.value.some(f => f.name === file.name && f.size === file.size)
    if (!exists) {
      uploadMultipleFiles.value.push(file)
    }
  })

  // Reset input so the same file can be added again later
  e.target.value = null
}

const removeFile = (index) => {
  uploadMultipleFiles.value.splice(index, 1)
}

// Helper to format file size
const formatSize = (bytes) => {
  const kb = bytes / 1024
  return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`
}

// Unique key per file for rendering
const fileKey = (file) => `${file.name}-${file.size}-${file.lastModified}`

// Get human-readable file type
const getFileType = (file) => {
  const mime = file.type
  const ext = file.name.split('.').pop().toLowerCase()

  // Priority to MIME type
  if (mime.startsWith('image/')) return 'Image'
  if (mime === 'application/pdf') return 'PDF'
  if (mime === 'application/vnd.ms-excel' || mime === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return 'Spreadsheet'
  if (mime.startsWith('video/')) return 'Video'
  if (mime.startsWith('audio/')) return 'Audio'
  if (mime === 'text/csv') return 'CSV'
  if (mime === 'text/plain') return 'Text File'
  if (mime === 'application/zip' || mime === 'application/x-zip-compressed') return 'ZIP Archive'
  if (mime === 'application/msword' || mime === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'Word Document'
  
  // Fallback to extension if MIME is empty or generic
  if (ext === 'csv') return 'CSV'
  if (ext === 'xls' || ext === 'xlsx') return 'Spreadsheet'
  if (ext === 'doc' || ext === 'docx') return 'Word Document'
  if (ext === 'zip') return 'ZIP Archive'
  if (ext === 'txt') return 'Text File'
  if (ext === 'pdf') return 'PDF'
  if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'gif') return 'Image'

  return 'Unknown File'
}

// Pick BX icon based on file type
const getFileIcon = (file) => {
  const mime = file.type
  if (mime.includes('spreadsheet') || file.name.endsWith('.csv') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) {
    return 'bx-table'
  } else if (mime.includes('image')) {
    return 'bx-image'
  } else if (mime.includes('pdf')) {
    return 'mdi mdi-file-pdf'
  } else if (mime.includes('video')) {
    return 'bx-video'
  } else if (mime.includes('audio')) {
    return 'bx-music'
  } else if (mime.includes('text') || file.name.endsWith('.txt')) {
    return 'bx-file'
  } else {
    return 'bx-file'
  }
}

/**
 * Clear the file selection and all related data
 */
function clearFileSelection() {
  console.log('Clearing file selection...')
  
  // Clear the uploaded file
  uploadedFile.value = null
  selectedFileName.value = ''
  
  // Clear the file input value
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  
  // Clear uploaded contacts and display
  if (contactSource.value === 'uploaded') {
    selectedContacts.value = []
    selectedContactsCount.value = 0
    uploadedContactsDisplay.value = []
    availableMessageTags.value = []
    
    console.log('Cleared uploaded contacts and tags')
  }
  
  // Reset contact source
  contactSource.value = ''
  
  // Optional: Show feedback to user
  console.log('✅ File selection cleared successfully')
}





</script>

<style lang="scss" scoped>

</style>