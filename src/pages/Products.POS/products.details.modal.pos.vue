<template>
  <!-- Modal -->
  <div
    class="modal fade text-dark"
    id="productDetails"
    tabindex="-1"
   aria-labelledby="addTaxRateModalLabel"
    aria-hidden="true"
    ref="addCategoryModal"
  >
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down modal-lg" style="width: 100%;">
      <div class="modal-content modal-lg shadow-lg border-0" style="border-radius: 12px;">

        <!-- Header -->
        <div class="modal-header border-0 px-4 pt-4 pb-4  bg-light">
          <h5 class="modal-title fw-bold text-black fs-4 mb-1" id="addTaxRateModalLabel">
            <!-- subtle icon (swap to emoji if you prefer) -->
            
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
        <div class="modal-body p-4  pb-3">
        <div class="row">
          <div class="col-12 mb-3">
            <div class="d-flex gap-3 align-items-center pb-3 border-bottom border-2">
              <div>
                <div class="p-2 border border-2 rounded round">
                  <img class="img bg-light" style="height: 100px;" :src=productDetails?.image||emptyImage alt="">
                </div>
              </div>
              <div>
                 <h5 class="d-flex gap-2 text-uppercas">
                    <span>{{ productDetails?.productname }}</span>
                    <div class="text-uppercase">
                      <span v-if="productDetails?.stockStatus === 'ACTIVE'" class="badge bg-success">
                      Active
                    </span>

                    <span v-else-if="productDetails?.stockStatus === 'OUT_OF_STOCK'" class="badge bg-danger">
                      Out of Stock
                    </span>

                    <span v-else-if="productDetails?.stockStatus === 'LOW_STOCK'" class="badge bg-warning text-dark">
                      Low Stock
                    </span>

                    <span v-else-if="productDetails?.stockStatus === 'SUSPENDED'" class="badge" style="background:#fd7e14;">
                      Suspended
                    </span>

                    <span v-else-if="productDetails?.stockStatus === 'DISABLED'" class="badge bg-secondary">
                      Disabled
                    </span>

                    <span v-else class="badge bg-secondary">
                      Unknown
                    </span>
                    </div>

                    
                  </h5>
 
               <div class="gap-2 d-flex align-items-center">
                   <span class="badge rounded alert-warning alert text-dark d-flex gap-1 align-items-center justify-content-center m-0">
                      <span class="mdi mdi-alert-circle-outline  text-dark fs-5"></span>
                      <span>Existing Product</span>
                   </span>
                   <span class="text-muted">Matched by barcode</span>
               </div>
              </div>
            </div>
          </div>
         
          <div class="col-6 border-right px-4 border-2 " style="border-right: solid #607d8b24;">
              <div class="d-flex gap-2  align-items-center mb-3">
                <div>
                  <span class="mdi mdi-information fs-1 text-secondary"></span>
                </div>
                <h5 class="m-0">Basic Info</h5>
              </div>
              <table class="table table-borderless border-sm">
                <tbody>
                  <tr>
                    <td class="text-secondary shrink">Brand</td>
                    <th>{{ productDetails?.brand }}</th>
                  </tr>
                  <tr>
                    <td class="text-secondary shrink">Category</td>
                    <th>
                      <span
                        class="badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto me-1 text-capitalize"
                        v-for="(categoryName,i) in categoryNames" :key="i"
                      >{{ categoryName }}</span>
                    </th>
                    <th class="d-none">
                      <span v-for="(cat, i) in productDetails?.category" :key="i"
                        class="badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto me-1">
                        {{ cat }}
                      </span>
                    </th>
                  </tr>
                  <tr>
                    <td class="text-secondary shrink">Barcode</td>
                    <th>{{ productDetails?.barcode }}</th>
                  </tr>
                  <tr>
                    <td class="text-secondary shrink">Unit</td>
                    <th>{{ productDetails?.quantityUnit }}</th>
                  </tr>
                  <tr>
                    <td class="text-secondary shrink">Pack Size</td>
                    <th>{{ productDetails?.quantity }}</th>
                  </tr>
                  <tr>
                    <td class="text-secondary shrink">Product Type</td>
                    <th>{{ productDetails?.productType }}</th>
                  </tr>
                   <tr>
                    <td class="text-secondary shrink">SKU Number</td>
                    <th>{{ productDetails?.sku||"-" }}</th>
                  </tr>
                  

                </tbody>
              </table>
            </div>
            <div class="col-6 px-4">
              <div class="d-flex gap-2  align-items-center mb-3">
                <div>
                  <span class="bx bxs-dollar-circle fs-1 text-secondary"></span>
                </div>
                <h5 class="m-0">Pricing & Stock</h5>
              </div>
              <div class="d-flex gap-5 mb-4 border-bottom border-2 pb-3">
                <div class="d-flex flex-column">
                  <span class="fs-1 fw-bold text-primary">KES {{ productDetails?.sellingPrice }}</span>
                  <span class="text-secondary">Selling Price</span>
                </div>

               <div class="d-flex flex-column">
                  <div class="fs-1 fw-bold text-primary gap-2 d-flex align-items-center">

                    <!-- Stock Number -->
                    <span>{{ Number(productDetails?.stockLevel) || 0 }}</span>

                    <!-- Icon + Color Mapping from stockStatus -->
                    <span :class="{
                      'text-danger': productDetails?.stockStatus === 'OUT_OF_STOCK',
                      'text-warning': productDetails?.stockStatus === 'LOW_STOCK',
                      'text-success': productDetails?.stockStatus === 'IN_STOCK'
                    }">
                      <i :class="{
                        'mdi mdi-close-octagon fs-2': productDetails?.stockStatus === 'OUT_OF_STOCK',
                        'mdi mdi-alert fs-2': productDetails?.stockStatus === 'LOW_STOCK',
                        'mdi mdi-check-circle fs-2': productDetails?.stockStatus === 'IN_STOCK'
                      }"></i>
                    </span>

                  </div>

                  <span class="text-secondary">Current stock</span>
                </div>

              </div>

              <div class="d-flex gap-2  align-items-center mb-3">
                <div>
                  <span class="bx bxs-detail fs-1 text-secondary"></span>
                </div>
                <h5 class="m-0">Record Info</h5>
              </div>

              <div>
                <table class="table border-0 table-borderless border-sm">
                  <tbody>
                    <tr>
                      <td class="text-secondary shrink">Status</td>
                      <th class="text-uppercase">
                        <span v-if="productDetails?.stockStatus === 'ACTIVE'" class="badge bg-success">
                          Active
                        </span>

                        <span v-else-if="productDetails?.stockStatus === 'OUT_OF_STOCK'" class="badge bg-danger">
                          Out of Stock
                        </span>

                        <span v-else-if="productDetails?.stockStatus === 'LOW_STOCK'" class="badge bg-warning text-dark">
                          Low Stock
                        </span>

                        <span v-else-if="productDetails?.stockStatus === 'SUSPENDED'" class="badge"
                          style="background:#fd7e14;">
                          Suspended
                        </span>

                        <span v-else-if="productDetails?.stockStatus === 'DISABLED'" class="badge bg-secondary">
                          Disabled
                        </span>

                        <span v-else class="badge bg-secondary">
                          Unknown
                        </span>
                      </th>
                    </tr>
                    <tr>
                      <td class="text-secondary shrink">Created By</td>
                      <th class="text-capitalize">{{ productDetails?.createdBy?.fname +" "+productDetails?.createdBy?.lname }} <span :title="formatDateTime(productDetails?.dateAdded)">{{ timeAgo(productDetails?.dateAdded) }}</span></th>
                    </tr>
                    <tr>
                      <td class="text-secondary shrink">Updated By</td>
                      <th class="text-capitalize">{{ productDetails?.lastEditedBy?.fname ||"" +" "+productDetails?.lastEditedBy?.lname||"" }} <span :title="formatDateTime(productDetails?.lastEdited)">{{ timeAgo(productDetails?.lastEdited) }}</span></th>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>

        </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 px-4 pb-4 pt-2 d-flex justify-content-end gap-2">

          <!-- Cancel: subtle, texty -->
          <button
            type="reset"
            form="taxTypeForm"
            class="btn btn-link waves-effect fw-bold btn-lg"
           
          >
            {{ cancelText }}
          </button>

          <!-- Save: primary but not oversized -->
          <button
            type="submit"
            form="taxTypeForm"
            class="btn btn-primary fw-semibold btn-lg"
          
            
          >
            <span
              v-if="categoryAddLoading"
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

   

    <button  class="btn btn-primary d-none" id="openUnsavedModal" data-bs-toggle="modal" data-bs-target="#unsavedChangesModal">Open Clear Form Modal</button>
    <button class="btn btn-outline-primary d-none"  @click="goSomewhere('/file-manager')">
        Go to File Manager
    </button>


</template>

<script setup>
import { ref, onMounted, nextTick, computed, onBeforeUnmount, watch, defineEmits, defineProps  } from "vue"
import axios from "axios"
import NProgress from "nprogress"

//APIs
import documentAPI from "@/api/document"
import POSAPI from "@/api/POS.API"
const PRODUCT_CATEGORY_API = POSAPI.categories()
const PACKAGE_TYPE_API = POSAPI.packaging()


import ImageToast from "@/components/ImageToast.vue"
import ClearFormModal from "@/components/guards/ClearFormConfirm.vue"
import UnsavedChangesConfirm from "@/components/guards/UnsavedChangesConfirm.vue"

import successImage from "../../assets/images/icons/check.png"
import errorImage from "../../assets/images/icons/error.png"
import emptyImage from "../../assets/images/icons/packaging.svg"
import {useAuthStore} from "@/stores/auth"
import {
    formatUploadDate,
    formatDateTime,
    smartDate,
    timeAgo,
    formatDate,
    getUserPreferences,
    dateDiff
} from '@/utils/dates';

const authStore=useAuthStore()

// ⚠️ You can remove these if truly unused in this file:
// import { useRouter, onBeforeRouteLeave } from "vue-router"
// import LoaderVue from "@/layouts/Loader.vue"
// import FilesCategoryModal from "./files.category.modal.vue"

const props = defineProps({
   productDetails: { type: Object, default: () => ({}) },
  title: { type: String, default: "Existing Product Details" },
  input_name_label:{ type: String, default: "Tax Rate Name" },
  cancelText: { type: String, default: "Close Form" },
  confirmText: { type: String, default: "Edit Form" },
  loading: { type: Boolean, default: false },
  showSelect: { type: Boolean, default: false }
 
})

// -------------------- Toast state --------------------
const toastStatus = ref(null)
const toastTitle = ref("")
const toastMessage = ref("")
const toastImage = ref(null)

// to be used on drop downs
const productCategories = ref({})
const packagingTypes = ref({})

async function getCategories() {
    try {
        const res = await axios.get(PRODUCT_CATEGORY_API)
        console.log("Product categories ", res.data)
        productCategories.value = res.data

    } catch (error) {
        console.error('Error fetching folders:', error)
    } finally {

    }
}

async function getPackagingTypes() {
    try {
        const res = await axios.get(PACKAGE_TYPE_API)
        console.log("packaging types ", res.data)
        packagingTypes.value = res.data
    } catch (error) {
        console.error('Error fetching folders:-', error)

    }
}

const categoryNames = computed(() => {
  if (!props.productDetails?.category) return [];

  return props.productDetails.category.map(catId => {
    const found = productCategories.value.find(c => c.id === catId);
    return found ? found.name : "Unknown";
  });
});
watch(() => props.productDetails, (newVal) => {
  console.log("product details changed: ", newVal);
  // You can perform any additional actions here when productDetails changes
   getCategories()
  getPackagingTypes()
  //alert("Props changed")
  console.log("product details in modal- ", categoryNames.value)
}, { deep: true });


onMounted(() => {
  getCategories()
  getPackagingTypes()
  console.log("product details in modal-- ", categoryNames.value)
  //console.log("product details in modal ", productCategories.value)
})
</script>