<template>
  <div class="container-fluid">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col-sm-12 col-xl-9 col-lg-11 col-md-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          <div>
            <div class="page-title-right">
            <ol class="breadcrumb m-0 mb-3">
              <li class="breadcrumb-item">
                <router-link to="/">Overview</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/team">System Users</router-link>
              </li>
              <li class="breadcrumb-item active">Invite</li>
            </ol>
          </div>
            <h4 class="mb-sm-0 font-size-18">Add a System User</h4>
            <p>Create a secure account and assign the right level of access.</p>
          </div>
          
        </div>
      </div>
    </div>

    <div v-if="isLoading">
      <LoaderVue />
    </div>
    <div v-else class="row">
      <SingleToastVue :toastType="toastType" :toastMessage="toastMessage" v-if="showToast" />

      <ImageToast 
        :status="toastStatus" 
        :title="toastTitle" 
        :message="toastMessage" 
        :image="toastImage"
        :imageHeight="70" 
        @hide="toastStatus = null"
      />

      <div class="col-sm-12 col-xl-9 col-lg-11 col-md-12 justify-content-center mx-auto">
        <div class="card">
          <div class="card-header text-center px-5 mt-3 d-none">
            <h3 class="card-titl fw-bold">Invite a Team Member</h3>
            <p class="card-title-desc text-muted mb-0">
              Invite a new system user with the right role and security settings.
            </p>
          </div>

          <div class="card-body p-md-5">
            <form @submit.prevent="saveAdmin">
              <div class="row">

                <div class="col-12 pb-3">
                  <div class="d-flex gap-3">
                    <div>
                    <div class="avatar-xs mx-auto mb-4">
                        <span style="border-radius: 20% !important;" class="avatar-title rounded-circle bg-info fw-bold bg-soft text-info font-size-16 text-primary">
                            <small>01</small>
                        </span>
                    </div>
                  </div>
                  <div>
                    <label for="" class="text-black fs-4 fw-normal mb-0 pb-0"> Personal details</label>
                    <p class="text-muted text-small mb-4">Basic information used for the team member’s profile.</p>
                  </div>
                  </div>
                </div>
                <!-- Profile Picture -->
                <div class="col-12  col-lg-4 mb-3">
                  <div class="w-100 d-flex justify-content-center align-items-center mb-5 flex-column">
                    <div class="profile-pic-cont position-relative">
                      <img class="rounded-circle avatar-lg" :src="previewUrl" alt=""
                        style="width: 150px; height: 150px;" />
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
                      <div class="col-12">
                        <h5 class="mb-1 text-black">Profile Picture</h5>
                        <p class="text-muted text-small">
                         <small> JPG, PNG or WebP.</small>
                          <strong class="d-none">Maximum file size: 2 MB.</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-8">
                  <div class="row">
                     <div class="col-6">
                  <label for="firstName" class="form-label">First Name
                    <strong class="text-danger">*</strong></label>
                  <input type="text" id="firstName" class="form-control mb-4" v-model="adminForm.first_name"
                    placeholder="Enter first name"
                    pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$" required />
                </div>

                <div class="col-6">
                  <label for="lastName" class="form-label">Last Name
                    <strong class="text-danger">*</strong></label>
                  <input type="text" id="lastName" class="form-control mb-4" v-model="adminForm.last_name"
                    placeholder="Enter last name"
                    pattern="^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$" required />
                </div>

                <div class="col-6">
                  <label for="email" class="form-label">Email
                    <strong class="text-danger">*</strong></label>
                  <input type="email" id="email" class="form-control mb-4" v-model="adminForm.email"
                    placeholder="e.g. name@paysol.com" required />
                </div>

                    <div class="col-6">
                      <label for="phone" class="form-label">Phone Number</label>
                      <input type="text" id="phone" class="form-control mb-4" v-model="adminForm.phone"
                        placeholder="e.g. +254712345678" pattern="^\+[1-9]\d{7,14}$"
                        title="Use international format, e.g. +254712345678" />
                    </div>

                    <div class="col-6">
                      <label for="phone" class="form-label">Gender</label>
                      <SelectSearchBox
                      v-model="gender"
                      :options="gender"
                      placeholder="Select Gender"
                      :is-multi="false"
                      input-class="form-control form-select"
                      class-name="mb-3"
                      required />
                      
                    </div>

                     <div class="col-6">
                      <label for="jobTitle" class="form-label">Job Title <span class="text-muted">(optional)</span></label>
                      <input type="text" id="jobTitle" class="form-control mb-4" v-model="adminForm.job_title"
                        placeholder="e.g. Accountant, Operations Manager" maxlength="150"
                        title="The member's role or title within the company" />
                    </div>
                  </div>
                </div>

                <div class="col-12 opacity-50">
                  <hr class="text-muted opacity-25  mb-4">
                </div>

                  <div class="col-12 pb-3">
                  <div class="d-flex gap-3">
                    <div>
                    <div class="avatar-xs mx-auto mb-4">
                        <span style="border-radius: 20% !important;" class="avatar-title rounded-circle bg-info fw-bold bg-soft text-info font-size-16 text-primary">
                            <small>02</small>
                        </span>
                    </div>
                  </div>
                  <div>
                    <label for="" class="text-black fs-4 fw-normal mb-0 pb-0"> Role & access</label>
                    <p class="text-muted text-small mb-4">Choose what this user can see and manage.</p>
                  </div>
                  </div>
                </div>

               

               

                  <div class="col-12 col-md-12 d-flex gap-3">
                    <div class="opacity-0 d-none d-md-block ">
                      <div class="avatar-xs mx-auto mb-4 ">
                          <span style="border-radius: 20% !important;" class="avatar-title rounded-circle bg-info fw-bold bg-soft text-info font-size-16 text-primary">
                              <small>02</small>
                          </span>
                      </div>
                    </div>
                  
                    <div class="flex-grow-1 d-flex flex-column ">
                        <div class="w-100 ">
                            <label for="role" class="form-label">Assign User Role
                            <strong class="text-danger">*</strong></label>
                            <SelectSearchBox
                              v-model="adminForm.role"
                              :options="roleOptions"
                              placeholder="Choose Role"
                              :is-multi="false"
                              input-class="form-control form-select"
                              class-name="mb-3"
                              required />
                              <p class="text-muted small" v-if="adminForm.role === 'super_admin'">
                                Only a super admin can invite another super admin.
                              </p>
                        </div>

                        <div>
                          <div class="custom-checkbox mb-1 d-flex align-items-center gap-2 custom-checkbox-sm">
                        <input
                            class="form-check-input "
                            type="checkbox"
                            id="requireOtpAlways"
                            v-model="adminForm.require_otp_always"
                        />

                        <div>
                          
                          <label class="form-check-label" for="requireOtpAlways">
                            Require a sign-in code on every login
                        </label>
                        </div>
                    </div>

                    <p class="text-muted small">
                        Super admins are always forced to confirm sign-ins with a code, regardless of this box.
                    </p>
                        </div>
                    </div>
                  </div>

                 <div class="col-12 mb-3">
                    
                </div>
               <div class="col-12 opacity-50">
                 <hr class="text-muted opacity-25 bg-secondary mb-4">
               </div>

                <div class="col-12 pb-3">
                  <div class="d-flex gap-3">
                    <div>
                      <div class="avatar-xs mx-auto mb-4">
                          <span style="border-radius: 20% !important;" class="avatar-title rounded-circle bg-info fw-bold bg-soft text-info font-size-16 text-primary">
                              <small>03</small>
                          </span>
                      </div>
                  </div>
                  <div class="flex-grow-1">
                    <label for="" class="text-black fs-4 fw-normal mb-0 pb-0"> Identification Documents <span class="text-muted">(Optional)</span></label>
                    <p class="text-muted text-small mb-4">Add a national ID, passport, or other identification document.</p>
                  </div>
                   <div>
                         <button type="button" class="btn btn-soft-primary waves-effect  mb-3"
                        v-if="adminForm.identifications.length === 0"
                        @click="addIdentification">
                        <i class="bx bx-plus align-middle me-1"></i>Add Identification
                      </button>
                    </div>
                  </div>
                </div>

               


                <div class="col-12 d-flex gap-3">
                  <div class="opacity-0 d-none d-md-block ">
                      <div class="avatar-xs mx-auto mb-4 ">
                          <span style="border-radius: 20% !important;" class="avatar-title rounded-circle bg-info fw-bold bg-soft text-info font-size-16 text-primary">
                              <small>02</small>
                          </span>
                      </div>
                    </div>
                 
                 <div class="flex-grow-1">
                  
                  <div v-for="(doc, index) in adminForm.identifications" :key="index">
                    <div class=" p-4 bg-secondary bg-light mb-3">
                      <div class="row">
                        
                         <div class="col-12 pb-3">
                            <div class="d-flex gap-3 ">
                              <div>
                                <div class="avatar-xs mx-auto mb-4">
                                    <span style="border-radius: 20% !important;" class="avatar-title rounded-circle bg-info fw-bold bg-soft text-info font-size-16 text-primary">
                                        <small>{{ index+1 }}</small>
                                    </span>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                              <label for="" class="text-black fs-6 fw-normal mb-0 pb-0"> Identification Document</label>
                              <p class="text-muted text-small mb-4 "><small>Enter the details exactly as shown on the document.</small></p>
                            </div>

                             <div>
                                <button type="button" class="btn btn-soft-danger waves-effect  mb-3"
                                 @click="removeIdentification(index)">
                                    <i class="bx bx-trash align-middle"></i> Remove
                              </button>
                            </div>
                            
                            </div>
                          </div>
                        <div class="col-md-6">
                          <label for="">Document Type</label>
                            <SelectSearchBox
                              v-model="doc.type"
                              :options="identificationTypeOptions"
                              placeholder="Document type"
                              :is-multi="false"
                              input-class="form-control form-select"
                            />
                          </div>
                          <div class="col-md-6">
                            <label for="">Document Number</label>
                            <input type="text" class="form-control" v-model="doc.identifier"
                              placeholder="Document number" maxlength="100" />
                          </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="adminForm.identifications.length!=0">
                     <button type="button" class="btn btn-soft-primary waves-effect mt-2  mb-3"
                        
                        @click="addIdentification">
                        <i class="bx bx-plus align-middle me-1"></i>Add Identification
                      </button>
                  </div>

                   <div v-if="adminForm.identifications.length === 0" class="bg-light p-3 d-flex align-items-center gap-3">
                    <div>
                     <Icon
                          icon='marketeq:id-card'
                          class="text-muted fs-1"
                      />

                    </div>
                    <div>
                      <label for="" class="m-0 p-0">No Identification Document Added</label>
                      <p class="small p-0 m-0">Add identification documents for this team member</p>
                    </div>
                  </div>
                 
                 </div>
                </div>

              
                
              </div>

              <div class="row">
                <div>
                  <div class="col-12 mt-5">
                    <div class="d-flex justify-content-end gap-4">
                      <button type="reset" class="btn btn-outline-secondary waves-effect btn-lg"
                        @click="resetForm">
                        Clear Form
                      </button>
                      <button type="submit" class="btn btn-primary waves-effect btn-lg"
                        :disabled="isSubmitting">
                        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2"
                          role="status" aria-hidden="true"></span>
                        {{ isSubmitting ? 'Sending Invite ...' : 'Send Invitation' }}
                        <Icon
                            icon='akar-icons:arrow-right'
                            class="fs-6"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref, computed, onMounted } from "vue";
import AdminAPI from "@/api/admins.js";
import LoaderVue from "@/layouts/Loader.vue";
import SelectSearchBox from "@/components/SelectSearchBox.vue";
import SingleToastVue from "@/components/SingleToast.vue";
import ImageToast from "@/components/ImageToast.vue";
import ImageUploader from "@/components/ImageUploader.vue";
import avatar from "@/assets/images/image-placeholder.jpg";

import successImage from "@/assets/images/icons/check.png";
import errorImage from "@/assets/images/icons/error.png";

const isLoading = ref(true);
const isSubmitting = ref(false);

const previewUrl = ref(avatar);
const selectedRatio = ref(1);

const handleImageSelected = (url) => {
  previewUrl.value = url;
  adminForm.value.profile_photo = url;
};

const toastStatus = ref(null);
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);
const gender=ref(['female','male', 'other'])

const showToast = ref(false);
const toastType = ref("");
const handleToast = ({ toastType: t, toastMessage: m }) => {
  toastType.value = t;
  toastMessage.value = m;
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2500);
};

const roles = ref([]);
const roleOptions = computed(() =>
  roles.value.map((r) => ({ label: r.display_name, value: r.name })),
);

const identificationTypes = ref([]);
const identificationTypeOptions = computed(() =>
  identificationTypes.value.map((t) => ({ label: t.name, value: t.key })),
);

const adminForm = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  job_title: "",
  role: "",
  require_otp_always: false,
  identifications: [],
  profile_photo: null,
});

const resetForm = () => {
  adminForm.value = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job_title: "",
    role: "",
    require_otp_always: false,
    identifications: [],
    profile_photo: null,
  };
  previewUrl.value = avatar;
};

const addIdentification = () => {
  adminForm.value.identifications.push({ type: "", identifier: "" });
};

const removeIdentification = (index) => {
  adminForm.value.identifications.splice(index, 1);
};

const generateUniqueFileName = (originalName = "image.jpg") => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const ext = originalName.split(".").pop();
  const fullName = `admin_${adminForm.value.first_name || "user"}_${adminForm.value.last_name || "Profile"}`
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .toLowerCase();
  return `profile_${fullName}_${timestamp}_${randomStr}.${ext}`;
};

const photoToFile = (photo) => {
  if (photo instanceof File) {
    return new File([photo], generateUniqueFileName(photo.name), {
      type: photo.type,
    });
  }

  if (typeof photo === "string" && photo.startsWith("data:")) {
    const arr = photo.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], generateUniqueFileName("profile_photo.jpg"), {
      type: mime,
    });
  }

  return null;
};

const getRoles = async () => {
  try {
    const response = await AdminAPI.roles();
    roles.value = response.data.data || [];
  } catch (error) {
    toastStatus.value = "error";
    toastTitle.value = "Failed to Load Roles";
    toastMessage.value = "Unable to fetch user roles. Please refresh the page.";
    toastImage.value = errorImage;
    handleToast({ toastType: "error", toastMessage: toastMessage.value });
  }
};

const getIdentificationTypes = async () => {
  try {
    const response = await AdminAPI.identificationTypes();
    identificationTypes.value = response.data.data || [];
  } catch (error) {
    toastStatus.value = "error";
    toastTitle.value = "Failed to Load Identification Types";
    toastMessage.value = "Unable to fetch identification types. Please refresh the page.";
    toastImage.value = errorImage;
    handleToast({ toastType: "error", toastMessage: toastMessage.value });
  }
};

const saveAdmin = async () => {
  const roleValue =
    typeof adminForm.value.role === "object"
      ? adminForm.value.role.value
      : adminForm.value.role;

  if (
    !adminForm.value.first_name ||
    !adminForm.value.last_name ||
    !adminForm.value.email ||
    !roleValue
  ) {
    toastStatus.value = "error";
    toastTitle.value = "Missing Required Fields";
    toastMessage.value = "Please fill in all required fields before proceeding.";
    toastImage.value = errorImage;
    return;
  }

  isSubmitting.value = true;
  toastStatus.value = "loading";
  toastTitle.value = "Inviting System User";
  toastMessage.value = "Please wait while we set up the new account...";
  toastImage.value = null;

  try {
    let payload;
    const hasPhoto = !!adminForm.value.profile_photo;

    // Identification rows must be complete: type and number together.
    const partialIdentification = adminForm.value.identifications.some(
      (d) => (d.type && !d.identifier) || (!d.type && d.identifier),
    );
    if (partialIdentification) {
      isSubmitting.value = false;
      toastStatus.value = "error";
      toastTitle.value = "Incomplete Identification";
      toastMessage.value = "Each identification row needs both a document type and a number.";
      toastImage.value = errorImage;
      handleToast({ toastType: "error", toastMessage: toastMessage.value });
      return;
    }

    const cleanIdentifications = adminForm.value.identifications
      .filter((d) => d.type && d.identifier)
      .map((d) => ({
        type: typeof d.type === "object" ? d.type.value : d.type,
        identifier: d.identifier.trim(),
      }));

    // With a profile photo the API needs multipart, so a FormData instance is
    // required; otherwise a plain object keeps the request clean JSON.
    if (hasPhoto) {
      payload = new FormData();
      payload.append("first_name", adminForm.value.first_name);
      payload.append("last_name", adminForm.value.last_name);
      payload.append("email", adminForm.value.email);
      payload.append("role", roleValue);
      if (adminForm.value.job_title) payload.append("job_title", adminForm.value.job_title);
      if (adminForm.value.phone) payload.append("phone", adminForm.value.phone);
      if (adminForm.value.require_otp_always) payload.append("require_otp_always", "1");
      cleanIdentifications.forEach((doc, i) => {
        payload.append(`identifications[${i}][type]`, doc.type);
        payload.append(`identifications[${i}][identifier]`, doc.identifier);
      });
      payload.append("profile_photo", photoToFile(adminForm.value.profile_photo));
    } else {
      payload = {
        first_name: adminForm.value.first_name,
        last_name: adminForm.value.last_name,
        email: adminForm.value.email,
        role: roleValue,
      };
      if (adminForm.value.job_title) payload.job_title = adminForm.value.job_title;
      if (adminForm.value.phone) payload.phone = adminForm.value.phone;
      if (adminForm.value.require_otp_always) payload.require_otp_always = true;
      if (cleanIdentifications.length) payload.identifications = cleanIdentifications;
    }

    const response = await AdminAPI.create(payload);

    toastStatus.value = "success";
    toastTitle.value = "Invite Sent Successfully";
    toastMessage.value = `
      <strong class="text-capitalize">${adminForm.value.first_name} ${adminForm.value.last_name}</strong>
      has been added to the team.<br/>
      A verification code has been sent to ${response.data?.data?.email || adminForm.value.email}.<br/>
      <a type="button" href="/team" class="btn btn-dark btn-sm mt-3 waves-effect">
        View System Users →
      </a>
    `;
    toastImage.value = hasPhoto ? previewUrl.value : successImage;
    handleToast({ toastType: "success", toastMessage: toastMessage.value });

    resetForm();
  } catch (error) {
    let errorMsg =
      error.response?.data?.message ||
      "We couldn't complete the invitation. Please try again.";

    const validationErrors = error.response?.data?.errors;
    if (validationErrors) {
      errorMsg = Object.values(validationErrors).flat().join(" ");
    }

    toastStatus.value = "error";
    toastTitle.value = "Invite Failed";
    toastMessage.value = errorMsg;
    toastImage.value = errorImage;
    handleToast({ toastType: "error", toastMessage: errorMsg });
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(() => {
  document.title = "Add a System User - PaySol";
  setTimeout(() => (isLoading.value = false), 500);
  getRoles();
  getIdentificationTypes();
});
</script>
<style scoped>
.profile-pic-btn {
    /* height: 55px; */
    /* width: 55px; */
    position: absolute;
    bottom: 0px;
    right: -10%;
    border: 4px solid white;
    font-size: 20px;
}
</style>