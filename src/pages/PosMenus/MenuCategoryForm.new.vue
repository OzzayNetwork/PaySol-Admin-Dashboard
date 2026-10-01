<template>
     <SingleToastVue
    :toastType="toastType"
    :toastMessage="toastMessage"
    />
  <div
    class="modal fade"
    id="addCategoryModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex justify-content-between w-100">
            <div>
              <h5 class="modal-title text-black" id="exampleModalLongTitle">
                Add Catalogue Category
              </h5>
              <p class="mb-0">Organize your products or services by category</p>
            </div>
            <button
              class="btn btn-light position-relative p-0 avatar-xs rounded-circle"
              type="button"
              data-bs-dismiss="modal"
              aria-bs-label="Close"
            >
              <span class="avatar-title bg-transparent text-reset">
                <i class="mdi mdi-close"></i>
              </span>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <form id="categoryForm">
            <!-- Basic Information -->
            <h6 class="fw-bold text-primary mb-3">Basic Information</h6>

            <div class="row">
              <div class="col-8">
                <div class="mb-3">
                  <label for="categoryName" class="form-label">
                    Category Name <span class="text-danger">*</span>
                  </label>
                  <input type="text" class="form-control" id="categoryName" placeholder="e.g. Electronics, Services" required>
                  <div class="invalid-feedback" id="nameError">Category name is required</div>
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="statusCategory" class="form-label">Status</label>
                  <select class="form-select form-control" id="statusCategory">
                    <option value="active" selected>Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" rows="3" placeholder="Brief description (optional)"></textarea>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="parentCategory" class="form-label">Parent Category</label>
                  <select class="form-select" id="parentCategory">
                    <option value="">None (Main Category)</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="services">Services</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="sortOrder" class="form-label">Sort Order</label>
                  <input type="number" class="form-control" id="sortOrder" placeholder="e.g. 1">
                  <div class="invalid-feedback" id="sortOrderError">Sort order must be a number</div>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="categoryColor" class="form-label">Category Color</label>
                  <div class="input-group">
                    <input type="color" class="form-control form-control-color" id="colorPicker" value="#3B82F6" style="width: 60px;">
                    <input type="text" class="form-control" id="colorText" value="#3B82F6" placeholder="#000000">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="taxCategory" class="form-label">Tax Category</label>
                  <select class="form-select" id="taxCategory">
                    <option value="">Select tax category</option>
                    <option value="standard">Standard Tax</option>
                    <option value="reduced">Reduced Tax</option>
                    <option value="exempt">Tax Exempt</option>
                  </select>
                </div>
              </div>
            </div>

            <h6 class="fw-bold text-primary mb-3 mt-4">Advanced Options</h6>

            <div class="col-12">
              <div class="row">
                <div class="col-6">
                  <div class="img-place-holder-container bg-light position-relative mb-2">
                    <img class="img w-100" :src="previewUrl"  alt="">
                    <imageUploader inputId="profilePicUpload" @image-selected="handleImageSelected" @show-toast="handleToast" />
                    

                    <label for="profilePicUpload" class="text-center label-upload-category" title="Select Image">
                      <i class="bx bx-camera"></i>
                      <p class="text-center">Upload Image</p>
                    </label>
                  </div>
                  <p>Accepted: *.jpg, *.png</p>
                </div>



                <div class="col-6">
                  <div class="row">
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="skuPrefix" class="form-label">SKU Prefix</label>
                        <input type="text" class="form-control" id="skuPrefix" placeholder="e.g. ELEC-, SERV-" spellcheck="false">
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="ageRestriction" class="form-label">Age Restriction</label>
                        <select class="form-select" id="ageRestriction">
                          <option value="">None</option>
                          <option value="18">18+</option>
                          <option value="21">21+</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        <div class="modal-footer">
          <div class="d-flex justify-content-between w-100">
            <button
              type="button"
              class="btn btn-soft-danger waves-effect waves-light"
            >
              <i class="bx bx-block font-size-16 align-middle me-2"></i> Clear Form
            </button>
            <div>
              <button
                type="button"
                class="btn btn-outline-secondary waves-effect mx-3"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import uploadAvatar from '../../assets/images/users/avatar-1.jpg';
import { ref } from 'vue';  
import imageUploader from '../../components/ImageUploader.vue';
import SingleToastVue from "../../components/SingleToast.vue";
import SelectSearchBox from "@/components/SelectSearchBox.vue";
const previewUrl = ref(uploadAvatar);

// 🔁 Update the preview when image is selected
function handleImageSelected(newImageUrl) {
  previewUrl.value = newImageUrl
}

// Toast reactive state
const showToast = ref(false);
const toastType = ref('');
const toastMessage = ref('');

// ✅ Rename incoming values to avoid shadowing
const handleToast = ({ toastType: incomingType, toastMessage: incomingMessage }) => {
  toastType.value = incomingType;
  toastMessage.value = incomingMessage;
  showToast.value = true;

  // Optional: auto-hide
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};


</script>

<style lang="scss" scoped>
</style>