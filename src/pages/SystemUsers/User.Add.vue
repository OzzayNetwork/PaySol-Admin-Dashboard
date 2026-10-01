<template>
  <div class="container-fluid">
    <!-- Page Title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 class="mb-sm-0 font-size-18">Add User</h4>
          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item">
                <router-link to="/">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/users/list">System Users</router-link>
              </li>
              <li class="breadcrumb-item active">Add User</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- Page Content -->
    <div v-if="isLoading">
      <LoaderVue />
    </div>
    <div v-else class="row">
      <SingleToastVue :toastType="toastType" :toastMessage="toastMessage" v-if="showToast" />

      <ImageToast :status="toastStatus" :title="toastTitle" :message="toastMessage" :image="toastImage"
        :imageHeight="70" @hide="toastStatus = null" />

      <div class="col-sm-12 col-xl-8 col-lg-10 col-md-12 justify-content-center mx-auto">
        <div class="card">
          <div class="card-header text-center px-5 mt-3">
            <h3 class="card-titl fw-bold">New User Registration</h3>
            <p class="card-title-desc text-muted mb-0">
              Register a new system user with appropriate role and status.
            </p>
          </div>

          <div class="card-body p-md-5 ">
            <form @submit.prevent="saveUser">
              <div class="row">
                <!-- Profile Picture -->
                <div class="col-12 mb-3">
                  <div class="w-100 d-flex justify-content-center align-items-center mb-5 flex-column">
                    <div class="profile-pic-cont position-relative">
                      <img class="rounded-circle avatar-xl" :src="previewUrl" alt=""
                        style="width: 200px; height: 200px;" />
                      <label for="profilePicUpload" type="button"
                        class="btn btn-primary waves-effect waves-light rounded-circle profile-pic-btn"
                        data-bs-toggle="tooltip" title="Select Profile Picture">
                        <i class="bx bx-camera align-middle"></i>
                      </label>

                      <ImageUploader 
                        inputId="profilePicUpload" 
                        @image-selected="handleImageSelected"
                        @show-toast="handleToast" 
                        :aspect-ratio="selectedRatio" 
                      />
                    </div>
                    <div class="text-center mt-3 row align-items-center justify-content-center">
                      <div class="col-sm-12 col-12 col-md-10 col-lg-8 col-xl-7">
                        <h5 class="mb-1 text-black">Upload Profile Picture</h5>
                        <p class="text-muted">
                          Please upload a clear and professional image. Accepted formats: PNG, SVG, or JPEG.
                          <strong>Maximum file size: 2 MB.</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                 <div class="row">
                    <!-- Title -->
                    <div class="col-md-4 col-6">
                      <label for="title" class="form-label">Title</label>
                      <select name="title" id="title" class="form-control mb-4" v-model="userForm.title">
                        <option value="" disabled >Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- First Name -->
                <div class="col-6">
                  <label for="firstName" class="form-label">First Name <strong class="text-danger">*</strong></label>
                  <input v-focus type="text" id="firstName"  pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$" class="form-control mb-4" v-model="userForm.first_name"
                    placeholder="Enter first name" required />
                </div>

                  <!-- First Name -->
                <div class="col-6">
                  <label for="firstName" class="form-label">Middle Name </label>
                  <input v-focus type="text" id="firstName"  pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$" class="form-control mb-4" v-model="userForm.middle_name"
                    placeholder="Enter middle name" required />
                </div>

                <!-- Last Name -->
                <div class="col-6">
                  <label for="lastName" class="form-label">Last Name <strong class="text-danger">*</strong></label>
                  <input type="text" id="lastName" class="form-control mb-4" v-model="userForm.last_name"
                    placeholder="Enter last name"  pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$" required />
                </div>

                <!-- HRMS ID -->
                <div class="col-6">
                  <label for="hrmsId" class="form-label">National ID <strong class="text-danger">*</strong> </label>
                  <input type="text" id="hrmsId" class="form-control mb-4" v-model="userForm.national_id"
                     pattern="^[0-9-]{7,8}$"
                    placeholder="Enter National ID" />
                </div>

                <!-- Email -->
                <div class="col-6">
                  <label for="email" class="form-label">Email <strong class="text-danger">*</strong></label>
                  <input type="email" id="email" class="form-control mb-4" v-model="userForm.email"
                    placeholder="Enter personal email"  pattern="^[a-zA-Z0-9._%+-]+@craftsilicon\.com$" required />
                </div>

               

                <!-- Mobile Number -->
                <div class="col-6">
                  <label for="mobileNumber" class="form-label">Mobile Number <strong
                      class="text-danger">*</strong></label>
                  <input type="text" id="mobileNumber" class="form-control mb-4" v-model="userForm.phone"
                      pattern="^\+?[0-9\s\-]{7,15}$"
                    placeholder="Enter phone number" required />
                </div>

                 <!-- Role -->               

                <div class="col-12 col-md-6">
                  <label for="role" class="form-label">Assign User Roles <strong class="text-danger">*</strong></label>
                  <SelectSearchBox 
                    v-model="userForm.role" 
                    
                    :options="userRoles.map(userRole => ({ label: userRole.label, value: userRole.name }))"
                    placeholder="Choose Role" 
                    :is-multi="false"
                    input-class="form-control form-select" 
                    class-name="mb-3"  
                    required />
                </div>

                <!-- Designation -->
                <div class="col-6 ">
                  <label for="designation" class="form-label">Designation </label>
                  <input type="text" id="designation" class="form-control mb-4" v-model="userForm.designation"
                    placeholder="Enter job title" required />
                </div>

               

                <!-- Status -->
                <div class="col-12 col-md-6 d-none">
                  <label for="status" class="form-label">Polling Station <strong class="text-danger">*</strong></label>
                  <SelectSearchBox v-model="userForm.status" :options="statuses" placeholder="Choose Status"
                    :is-multi="false" input-class="form-control form-select" class-name="mb-3" />
                </div>

                <!-- selecting polling station -->
                 <div class="col-12 col-lg-6 d-none">
                  <button type="button" class="d-flex p-3 border rounded align-items-center gap-3 w-100 text-left waves-effect" >
                    <div class="flex-shrink-0 m-0"><i class="mdi mdi-map-marker h2 m-0 text-black"></i></div>
                    <div class="d-flex flex-column flex-grow-1">
                      <label for="">Assign a Polling Station to the User</label>
                      <span class=""><i class="text-muted">Polling station Not assigned</i></span>
                    </div>
                    <div class="flex-shrink-0 me-0"><i class="mdi mdi-chevron-right h2 text-black m-0"></i></div>

                  </button>
                 </div>

                 <div class="col-12 col-lg-12" v-if="requiresStation">
                   <PollingStationPicker v-model="userForm.polling_station_id" />
                 </div>

                

               
              </div>

              <div class="row">

                <div>
                   <div class="col-12 mt-5">
                    <div class="d-flex justify-content-end gap-4">
                      <button type="reset" class="btn btn-outline-secondary waves-effect btn-lg" @click="resetForm">
                        Clear Form
                      </button>
                      <button type="submit" class="btn btn-dark waves-effect btn-lg" :disabled="isSubmitting">
                        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"
                          aria-hidden="true"></span>
                        {{ isSubmitting ? 'Saving ...' : 'Save User' }}
                      </button>
                    </div>
                  </div>
                </div>
                
              </div>
            </form>
          </div>

          <!-- Footer -->

        </div>
      </div>
    </div>
  </div>
  <button class="btn btn-primary" @click="getUserRoles">Save Roles</button>
 
</template>
<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import UsersAPI from "@/api/users.js";
import LoaderVue from "@/layouts/Loader.vue";
import ImageUploader from "@/components/ImageUploader.vue";
import SelectSearchBox from "@/components/SelectSearchBox.vue";
import SingleToastVue from "@/components/SingleToast.vue";
import ImageToast from "@/components/ImageToast.vue";
import avatar from "@/assets/images/image-placeholder.jpg";
import PollingStationPicker from "@/components/geography/Polling.station.id.vue"

// Toast icons
import successImage from "../../assets/images/icons/check.png";
import errorImage from "../../assets/images/icons/error.png";

// --- Logged in user ---
const authStore = useAuthStore();
const router = useRouter();

// --- State ---
const isLoading = ref(true);
const isSubmitting = ref(false);

// --- Toast (ImageToast-driven) ---
const toastStatus = ref(null);
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);

// --- Secondary toast (inline feedback) ---
const showToast = ref(false);
const toastType = ref("");
const handleToast = ({ toastType: t, toastMessage: m }) => {
  toastType.value = t;
  toastMessage.value = m;
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2500);
};

// --- Dropdown Options ---
const roles = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Staff", value: "staff" },
];

const statuses = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

// --- Image Handling ---
const previewUrl = ref(avatar);
const selectedRatio = ref(1);
const handleImageSelected = (url) => {
  previewUrl.value = url;
  userForm.value.profile_photo = url;
  //alert(url)
};

// --- Form Data ---

// Initial state for the user creation/edit form.
// Field names match exactly what POST /api/users and PATCH /api/users/{id} expect.
const userForm=ref({
  // ----- Fields the API accepts on create -----
  title: "",              // optional: Mr | Mrs | Miss | Ms | Dr | Prof | Hon
  first_name: "",         // required
  middle_name: "",        // optional ("other name")
  last_name: "",          // required
  designation: "",        // optional free text, e.g. "Polling Clerk"
  national_id: "",        // required: 7 or 8 digits
  email: "",              // required, unique
  phone: "",              // required: 0712345678 or +254712345678
  role: "",               // required: "election_agent" | "viewer"
  polling_station_id: null, // required ONLY when role === "election_agent"
  profile_photo: null,    // optional: a File object (NOT a string/URL)

  // ----- Read-only fields populated when EDITING an existing user -----
  // (the API returns these; you don't send them back on create)
  id: null,
  full_name: "",
  profile_photo_url: "",  // the URL the API returns for display
  is_active: true,
  verification: {
    email_verified: false,
    phone_verified: false,
    fully_verified: false,
    pending_channel: null,
    password_set: false,
  },
  audit: {
    created_by: null,     // { id, name }  — populated by the API
    updated_by: null,     // { id, name }
    created_at: "",
    updated_at: "",
  },
}) 

const requiresStation = ref(false);

const userRoles=ref({})
// --- Helpers ---
const formatDateTime = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;

const generateUniqueFileName = (originalName = "image.jpg") => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const ext = originalName.split(".").pop();

  // Combine first and last names
  const fullName = `${userForm.value.first_name || "user"}_${userForm.value.last_name || "Profile"}`
    .replace(/\s+/g, "_")        // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9_]/g, "") // Strip special characters
    .toLowerCase();

  return `profile_${fullName}_${timestamp}_${randomStr}.${ext}`;
};



const resetForm = () => {
  userForm.value = {
  // ----- Fields the API accepts on create -----
  title: "",              // optional: Mr | Mrs | Miss | Ms | Dr | Prof | Hon
  first_name: "",         // required
  middle_name: "",        // optional ("other name")
  last_name: "",          // required
  designation: "",        // optional free text, e.g. "Polling Clerk"
  national_id: "",        // required: 7 or 8 digits
  email: "",              // required, unique
  phone: "",              // required: 0712345678 or +254712345678
  role: "",               // required: "election_agent" | "viewer"
  polling_station_id: null, // required ONLY when role === "election_agent"
  profile_photo: null,    // optional: a File object (NOT a string/URL)
 
  // ----- Read-only fields populated when EDITING an existing user -----
  // (the API returns these; you don't send them back on create)
  id: null,
  full_name: "",
  profile_photo_url: "",  // the URL the API returns for display
  is_active: true,
  verification: {
    email_verified: false,
    phone_verified: false,
    fully_verified: false,
    pending_channel: null,
    password_set: false,
  },
  audit: {
    created_by: null,     // { id, name }  — populated by the API
    updated_by: null,     // { id, name }
    created_at: "",
    updated_at: "",
  },
};
  previewUrl.value = avatar;
};

// --- Cancel Action ---
const cancelForm = () => router.push("/users/list");

const validateForm = () => {
  if (!userForm.value.role) {
    toastStatus.value = "error";
    toastTitle.value = "Missing Required Field";
    toastMessage.value = "Please select a role before proceeding.";

    toastImage.value = errorImage;
    handleToast({ toastType: "error", toastMessage: toastMessage.value });
    return false;
  }
  return true;
};




// --- Save User ---
const saveUser = async () => {

  if (!validateForm()) return;

  // Required fields — match the API (national_id, email, role; NO password)
  if (
    !userForm.value.first_name ||
    !userForm.value.last_name ||
    !userForm.value.national_id ||
    !userForm.value.email ||
    !userForm.value.role
  ) {
    toastStatus.value = "error";
    toastTitle.value = "Missing Required Fields";
    toastMessage.value = "Please fill in all required fields before proceeding.";
    toastImage.value = errorImage;
    return;
  }

  // Election agents must have a polling station
  const roleValue =
    typeof userForm.value.role === "object"
      ? userForm.value.role.value
      : userForm.value.role;

  if (roleValue === "election_agent" && !userForm.value.polling_station_id) {
    toastStatus.value = "error";
    toastTitle.value = "Polling Station Required";
    toastMessage.value = "Election agents must be assigned a polling station.";
    toastImage.value = errorImage;
    return;
  }

  isSubmitting.value = true;
  toastStatus.value = "loading";
  toastTitle.value = "Creating User Account";
  toastMessage.value = "Please wait while we set up the new user profile...";
  toastImage.value = null;

  const formData = new FormData();

  try {
    // --- Append fields (only what the API accepts) ---
    formData.append("first_name", userForm.value.first_name);
    formData.append("last_name", userForm.value.last_name);
    formData.append("email", userForm.value.email);
    formData.append("phone", userForm.value.phone);
    formData.append("national_id", userForm.value.national_id);
    formData.append("role", roleValue);

    // Optional fields — only append when present
    if (userForm.value.title) formData.append("title", userForm.value.title);
    if (userForm.value.middle_name) formData.append("middle_name", userForm.value.middle_name);
    if (userForm.value.designation) formData.append("designation", userForm.value.designation);
    if (userForm.value.polling_station_id) {
      formData.append("polling_station_id", userForm.value.polling_station_id);
    }

    // NOTE: created_by, created_at, updated_at, password and status are NOT sent.
    // The backend sets created_by from the authenticated admin's token,
    // timestamps automatically, and the user sets their own PIN after OTP verification.

    // --- Profile Picture Handling ---
    let fileToUpload = null;
    if (userForm.value.profile_photo) {
      if (
        typeof userForm.value.profile_photo === "string" &&
        userForm.value.profile_photo.startsWith("data:")
      ) {
        const arr = userForm.value.profile_photo.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        console.log("🔍 Cropper MIME:", mime); 
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);

        const fileName = generateUniqueFileName("profile_photo.jpg");
        fileToUpload = new File([u8arr], fileName, { type: mime });
      } else if (userForm.value.profile_photo instanceof File) {
        const fileName = generateUniqueFileName(userForm.value.profile_photo.name);
        fileToUpload = new File([userForm.value.profile_photo], fileName, {
          type: userForm.value.profile_photo.type,
        });
      }

      if (fileToUpload && fileToUpload.size > 2 * 1024 * 1024) {
        const sizeMB = (fileToUpload.size / (1024 * 1024)).toFixed(2);
        const msg = `The selected image is ${sizeMB} MB — please upload an image smaller than 2 MB.`;

        toastStatus.value = "error";
        toastTitle.value = "File Too Large";
        toastMessage.value = msg;
        toastImage.value = errorImage;
        handleToast({ toastType: "error", toastMessage: msg });
        isSubmitting.value = false;
        return;
      }

      // API expects the field name "profile_photo"
      formData.append("profile_photo", fileToUpload);
      console.log("📁 Profile photo appended to form data:", fileToUpload);
    }

    // --- Submit ---
    // Don't manually set Content-Type — the browser sets the multipart
    // boundary automatically. Setting it by hand breaks the upload.
    const response = await UsersAPI.create(formData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });

    // --- Success Feedback ---
    toastStatus.value = "success";
    toastTitle.value = "User Created Successfully";
    toastMessage.value = `
      The account for <strong class="text-capitalize">${userForm.value.first_name} ${userForm.value.last_name}</strong> has been created successfully.<br/>
      An OTP has been sent to their email and phone for verification.<br/>
      <a type="button" href="/users/list" class="btn btn-dark btn-sm mt-3 waves-effect">
        View Users List →
      </a>
    `;
    toastImage.value = userForm.value.profile_photo ? previewUrl.value : successImage;

    handleToast({
      toastType: "success",
      toastMessage: toastMessage.value,
    });

    // ✅ Clear Form after success
    resetForm();

  } catch (error) {
    console.error("❌ Error creating user:", error.response?.data || error.message);

    // Surface Laravel validation errors (422) field-by-field when present
    let errorMsg =
      error.response?.data?.message ||
      "We couldn't complete the user creation process. Please try again.";

    const validationErrors = error.response?.data?.errors;
    if (validationErrors) {
      errorMsg = Object.values(validationErrors).flat().join(" ");
    }

    if (errorMsg.toLowerCase().includes("file too large")) {
      errorMsg = "The uploaded file exceeds 2 MB. Please choose a smaller image.";
    }

    toastStatus.value = "error";
    toastTitle.value = "User Creation Failed";
    toastMessage.value = errorMsg;
    toastImage.value = errorImage;
    handleToast({ toastType: "error", toastMessage: errorMsg });
  } finally {
    isSubmitting.value = false;
  }
};

async  function getUserRoles() {
  try {
    const response = await UsersAPI.roles()
    userRoles.value = response.data.data;
    console.log("Fetched user roles:", userRoles.value);
  } catch (error) {
    console.error("Error fetching user roles:", error);
    toastStatus.value = "error";
    toastTitle.value = "Failed to Load Roles";
    toastMessage.value = "Unable to fetch user roles. Please refresh the page.";
    toastImage.value = errorImage;
    handleToast({ toastType: "error", toastMessage: toastMessage.value });
  }
}

// Watch the role; flip the boolean when it changes.
watch(
  () => userForm.value.role,
  (newRole) => {
    // role may be a string ("election_agent") or a { value } object
    const name = newRole && typeof newRole === "object" ? newRole.value : newRole;
 
    const role = (userRoles.value || []).find((r) => r.name === name);
    requiresStation.value = role?.needs_station_assignment === true;
 
    // if the new role doesn't need a station, clear any previous selection
    if (!requiresStation.value) {
      userForm.value.polling_station_id = null;
    }
  }
);

// --- Lifecycle ---
onMounted(() => {
  document.title = "Add User - CSPL CRM";
  setTimeout(() => (isLoading.value = false), 500);
  getUserRoles();
});
</script>
