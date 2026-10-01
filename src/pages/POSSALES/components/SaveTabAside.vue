<template>
    <!-- Toggle Button -->
<button class="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#saveTabAside">
    Toggle right offcanvas
</button>

<!-- Offcanvas -->
<div class="offcanvas offcanvas-end w-25" tabindex="-1" id="saveTabAside">

    <!-- Header -->
    <div class="offcanvas-header border-bottom py-0 pr-0">
        <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-white position-relative p-0 avatar-sm rounded-circle"
                data-bs-dismiss="offcanvas" aria-label="Close">
                <span class="avatar-title bg-transparent text-reset">
                    <i class="bx bx-arrow-back font-size-22"></i>
                </span>
            </button>
           <div class="d-flex flex-column py-3">
                 <h5 class="mb-0">Save As open bill</h5>
                <p class="m-0 text-miuted"><small>Save this sale as a tab for tour customer.</small></p>
           </div>

        </div>
        

        <div class="d-flex header-action-btn d-none">

            <!-- Status Switch -->
            <div class="d-flex ms-1 align-items-center justify-content-center" title="Toggle Status">
                <div class="form-check form-switch form-switch-md mb-0" dir="ltr">
                    <input class="form-check-input" type="checkbox" id="SwitchCheckSizelg">
                    <label class="form-check-label" for="SwitchCheckSizelg"></label>
                </div>
            </div>

            <!-- Edit -->
            <button type="button" class="btn header-item noti-icon ms-1">
                <i class="bx bx-edit-alt"></i>
            </button>

            <!-- Change Logo -->
            <button type="button" class="btn header-item noti-icon ms-1">
                <i class="bx bx-camera"></i>
            </button>
        </div>

        <button type="button" class="btn-close text-reset d-none" data-bs-dismiss="offcanvas"></button>
    </div>
     <div class="offcanvas-header border-bottom p-0">
            <ul class="nav nav-tabs nav-tabs-custom nav-justified w-100" role="tablist">
                <li
                    @click="newTab=true" 
                    class="nav-item " role="presentation">
                    <a class="nav-link py-3"
                    :class="newTab ? 'active bg-primary-muted fw-bold' : ''"
                     data-bs-toggle="tab" href="#home1" role="tab" aria-selected="true">
                        <span class="d-block d-sm-none"><i class="fas fa-home"></i></span>
                        <span class="d-none d-sm-block">New Tab/Bill</span> 
                    </a>
                </li>
                <li
                    @click="newTab=false"
                 class="nav-item " role="presentation">
                    <a 
                    :class="newTab ? '' : 'active bg-primary-muted fw-bold'"
                    class="nav-link py-3" data-bs-toggle="tab" href="#profile1" role="tab" aria-selected="false" tabindex="-1">
                        <span class="d-block d-sm-none"><i class="far fa-user"></i></span>
                        <span class="d-none d-sm-block">Existing Tab/Bill</span> 
                    </a>
                </li>
                
            </ul>
        </div>


    <!-- Body -->
    <div v-if="newTab"
    
    class="offcanvas-body p-0  animate__animated animate__fadeIn animate__faster">
       

      <form action="" id="saveTabForm" @submit.prevent="saveTab()">
         <div class="px-3 py-2 fw-bold text-dark sticky-top bg-light border-top" style="z-index:2100">
            <div class="d-flex gap-2 align-items-center justify-content-between">
                <span>Customer Details</span>           
            </div>
        </div>

        <!-- input for customer details -->
         <div class="p-3">
            <div class="search-box" ref="customerPickerRef">
                   <div class="w-100 mb-3 position-relative" >
                        <div @submit.prevent="handleSearchInput()"
                            class="input-group  rounded mb04 pb-0 flex-nowrap ">
                            <div class="flex-grow-1 ">
                                <input style="border-radius: 0px; padding-right: 35px;" type="text"
                                    class="form-control   rounded flex-grow-1" placeholder="Search Existing Customers .."
                                    spellcheck="false" data-ms-editor="true" v-model="searchQuery"
                                    @input="handleSearchInput"
                                    @focus="onCustomerSearchFocus"
                                    required
                                >
                                <i class="bx bx-search-alt search-icon fs-4"></i>
                                <i v-if="searchQuery != ''" title="Clear search" style="right: 15px; left:unset; "
                                    class="mdi mdi-close search-icon cursor-pointer fs-3 waves-effect "
                                    @click="searchQuery = ''; handleSearchInput(); rawSearchQuery = '';clearSelectedCustomer()">
                                </i>
                            </div>
                            <button type="submit" @click="handleSearchInput()" title="Click to search"
                                class="btn btn-primary px-4  d-none align-items-center fw-bold" id="button-addon2">
                                <i class="bx bx-search-alt search-icon fs-4"></i>
                            </button>

                        </div>
                        <div v-if="showCustomerDropdown" class="w-100 rounded bg-white contact-search-list-cont mt-1">
                             <div class="p-3 px-2">
                                <ul class="list-group">
                                     <li v-if="customers.length === 0 && searchQuery"
                                        class="list-group-item text-center text-muted py-4 border-0">
                                    No customers found for "<strong>{{ searchQuery }}</strong>"
                                    </li>

                                    <li v-if="!loadingCustomers" class="list-group-item   cursor-pointer waves-effect mb-2"  data-bs-toggle="modal" data-bs-target="#addCustomerModal">
                                    <a href="#" class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex align-items-center gap-2">
                                            <span class="bg-primary-subtle waves-effect waves-light btn-sm p-1 px-2 rounded">
                                                <i class="mdi mdi-plus fs-4"></i>
                                            </span>
                                            <span class=" fw-bold">Register New Customer  </span>
                                        </div>
                                        <span class="dripicons-chevron-right text-black fs-5 d-flex"></span>
                                    </a>
                                </li>
                                <template v-if="loadingCustomers">
                                    <p class="my-2 text-center">Loading Contacts ...</p>
                                     <li v-for="(_, index) in skeletonRows" :key="index" class="list-group-item border-2 rounded  cursor-pointer mb-2 py-3">
                                    <div class="d-flex gap-3 align-items-center">
                                        <div>
                                        <SkeletonLoader type="text" :lines="1" height="48px" width="48px" class="mx-0" style="border-radius: 50%;" />
                                    </div>
                                    <div class="flex-grow-1">
                                          <SkeletonLoader type="text" :lines="1" height="13px" :width="'100%'" class="mx-0"  />
                                          <div class="mt-2 d-flex gap-2">
                                            <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(90, 90)" class="mx-0" />
                                            <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(90, 130)" class="mx-0" />
                                          </div>
                                    </div>
                                    </div>
                                   
                                </li>
                                </template>

                               
                                <li v-for="contact in customers" :key="contact.id" class="list-group-item border-2 rounded  cursor-pointer mb-2"
                                :class="{ 'border-primary border-2 bg-primary-muted': String(form.customer_id) === String(contact.id) }" 
                                @click="selectCustomer(contact)"
                                >
                                    <label :for="'contactCard'+contact.id" class="d-flex align-items-center justify-content-between gap-2 m-0 rounded  cursor-pointer">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <div class="flex-shrink-0 me-3">
                                                    <div class="avatar-sm">
                                                        <div
                                                            class="avatar-title bg-dark text-dark fw-bold fs-5 bg-soft rounded-circle">
                                                        {{ contact.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() }}
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="m-0 p-0 fw-bold text-black fs-6 text-capitalize">{{ contact.name||'Unknown' }}</p>
                                                <span class="text-muted small">
                                                    {{ contact.phone ||"Not Available" }} | {{ contact.email||'Not Available' }}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                        <div class="form-check">
                                                <input class="form-check-input" :id="'contactCard'+contact.id" type="radio" name="formRadios" >
                                            </div> 
                                        </div>
                                    </label>      
                                </li>
                                
                                
                                </ul>
                            </div>
                        </div>
                    </div>
  
            </div>

            


            <div v-if="form.customer_id!=null">

                <div v-if="!isLoadingCustomer" class="p-3 border border-1 border-dark-subtle mb-2 rounded">
                    <div class="d-flex flex-column"> 
                        <div class="d-flex gap-2 mb-3 align-items-center justify-content-between">
                            <div class="small text-muted d-flex align-items-center gap-1"><i class="mdi mdi-clock-outline fs-5"></i> <span>Last seen {{ customerStats.last_visit_at || 'Never' }}</span></div>
                            <div class="text-uppercase" >
                                <span 
                                    class="badge-alt2 w-auto px-3"
                                    style="font-size:13px"
                                    :class="{
                                        'bg-success-soft text-success': risk_tier === 'trusted',
                                        'bg-info-soft text-info':       risk_tier === 'reliable',
                                        'bg-warning-soft text-warning': risk_tier === 'watch',
                                        'bg-danger-soft text-danger':   risk_tier === 'high_risk',
                                        'bg-light text-muted':          !['trusted','reliable','watch','high_risk'].includes(risk_tier)
                                    }"
                                >
                                <i 
                                    class="me-1 fs-5 align-middle"
                                    :class="{
                                    'mdi mdi-shield-check':         risk_tier === 'trusted',
                                    'mdi mdi-information-outline':  risk_tier === 'reliable',
                                    'mdi mdi-alert-outline text-dark opacity-75':        risk_tier === 'watch',
                                    'mdi mdi-alert-octagon':        risk_tier === 'high_risk',
                                    'mdi mdi-help-circle-outline':  !['trusted','reliable','watch','high_risk'].includes(risk_tier)
                                    }"
                                ></i>
                                <span :class="{'text-dark opacity-75': risk_tier === 'watch'}">
                                    {{ 
                                    { trusted: 'Trusted', reliable: 'Reliable', watch: 'Watch', high_risk: 'High risk' }[risk_tier] || 'No tier'
                                    }}
                                </span>
                            </span>
                            </div>
                        </div>                          
                           <div class="d-flex align-items-center ">
                                 <div class="flex-shrink-0 align-self-center me-3 position-relative customer-avatar-wrapper">
                                <div class="progress-ring"
                                :style="{ '--progress': 12 + '%' }">
                                    <div class="avatar-md position-relative ">
                                    <span class="avatar-title rounded-circle bg-primary bg-soft text-primary fs-4 fw-bold">
                                        {{getInitials(selectedCustomer.name)}}
                                    </span>
                                    <div class="loyalty-budge avatar-xs ">
                                        <span class="avatar-title rounded-circle "
                                            :class="{
                                                'badge-gold': customerStats.loyalty_tier === 'gold',
                                                'badge-silver': customerStats.loyalty_tier === 'silver',
                                                'badge-bronze': customerStats.loyalty_tier === 'bronze',
                                                'badge-platinum': customerStats.loyalty_tier === 'platinum',
                                            }"
                                        >
                                            <i class="fs-4"
                                                :class="{
                                                    'fas fa-crown fs-5 text-black opacity-50': customerStats.loyalty_tier === 'gold',
                                                    'fas fa-trophy': customerStats.loyalty_tier === 'silver',
                                                    'md-star bx bxs-star': customerStats.loyalty_tier === 'bronze',
                                                    'mdi-diamond-stone mdi': customerStats.loyalty_tier === 'platinum',
                                                }"
                                            >
                                            </i>
                                        </span> 
                                    </div>
                                </div>
                                </div>
                            </div>
                            
                            <div class="flex-grow-1 overflow-hidden">
                                <h5 class="text-truncate font-size-14 mb-1 text-bla fw-bold">{{ selectedCustomer.name }}</h5>
                                <div class="text-truncate mb-0 d-flex gap-2 align-items-center text-muted">
                                    <div>
                                        <span>{{ selectedCustomer.phone || 'Not Provided' }} </span> 
                                       
                                    </div> 
                                    <span> | </span> 
                                    <div class="d-flex gap-1 align-items-center">
                                       <i class="mdi mdi-medal fs-5"></i> <span class="text-capitalize">{{ customerStats.loyalty_tier || 'Not Assigned'}}</span> 
                                    </div>
                                    <span> | </span> 

                                    <div class="d-flex gap-1 align-items-center">
                                       <i class="mdi mdi-star fs-5"></i> <span class="text-capitalize">{{ customerStats.loyalty_points || 'Not Assigned'}}</span>
                                    </div>
                                </div>
                            </div>
                           </div>
                           
                        </div>

                        <div class="d-flex gap-3 align-items-center mt-4"
                            style="padding: 15px; border-left: 6px solid;"
                            :class="{
                                'border-success bg-success-subtle': customerRecomendations.severity === 'success',
                                'border-danger bg-danger-subtle': customerRecomendations.severity === 'danger',
                                'border-warning bg-warning-subtle': customerRecomendations.severity === 'warn',
                                'border-info bg-info-subtle': customerRecomendations.severity === 'info',
                                'border-dark bg-dark-subtle': customerRecomendations.severity === 'neutral',

                            }"
                        >                            
                            <div class="">
                                <h4 class="text-truncate font-size-14 mb-1 text-black fw-bold text-capitalize align-items-center d-flex gap-2"><span>{{ customerRecomendations.title || 'Not Provided' }}</span> <a href="#" class="fs-4"><i class="mdi mdi-information-outline"></i></a> </h4>
                                <p class="text-muted">{{ customerRecomendations.message || 'Not Provided' }}</p>
                                <a v-if="customerUnpaidBills.length>0" href="javascript: void(0);" class="d-flex align-items-center gap-1" @click="viewCustomerBills"><span>View Customer Bills</span> <i class="mdi mdi-arrow-right fs-4"></i></a>
                            </div>
                        </div>
                </div>

                <!-- customer loader -->
                 <div class="p-3 border border-1 border-dark-subtle mb-2 rounded" v-if="isLoadingCustomer"> >
                    <p class="my-2 text-center">Wait As we Load Custopmer Details...</p>
                    <div></div>
                    <div class="d-flex gap-3 align-items-center">
                                        <div>
                                        <SkeletonLoader type="text" :lines="1" height="68px" width="68px" class="mx-0" style="border-radius: 50%;" />
                                    </div>
                                    <div class="flex-grow-1">
                                          <SkeletonLoader type="text" :lines="1" height="13px" :width="'70%'" class="mx-0"  />
                                          <div class="mt-2 d-flex gap-2">
                                            <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(90, 90)" class="mx-0" />
                                            <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(50, 90)" class="mx-0" />
                                            <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(30, 90)" class="mx-0" />
                                          </div>
                                    </div>
                                    </div>
                    <div class="py-3 d-flex flex-column gap-2">
                        <SkeletonLoader type="text" :lines="1" height="10px" :width="'70%'"  class="mx-0" />
                        <SkeletonLoader type="text" :lines="1" height="10px" :width="'100%'"  class="mx-0" />
                        <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(30, 90)" class="mx-0" />

                    </div>
                 </div>

                
                
            </div>
            <div v-else>
                <p class="m-0 text-muted d-flex gap-2 align-items-start">
                <i class="bx bx-info-circle fs-4 mt-1"></i>
                <span>
                    <i>Please select a customer.</i><br>
                    <span>If unknown, pick <span class="fw-semibold">Walk-in</span> or <a href="#" class="text-decoration-underline" data-bs-toggle="modal" data-bs-target="#addCustomerModal">register</a> a new customer.</span>
                </span>
                </p>
            </div>
            <div class="d-none">
                <ul class="list-group">
              
                
                <li class="list-group-item   cursor-pointer bg-primary-subtle">
                    <a href="#" class="d-flex justify-content-between align-items-center">
                        <span class=" fw-bold">Add Customer <span class="badge bg-warning text-black rounded-pill">{{ contactsCount }} Customers</span> </span>
                        <span class="dripicons-chevron-right text-black fs-5 d-flex"></span>
                    </a>
                </li>
                </ul>
            </div>
         </div>

         <!-- table details -->
          <div class="px-3 py-2 fw-bold text-dark sticky-top bg-light border-top" style="z-index:2100">
            <div class="d-flex gap-2 align-items-center justify-content-between">
                <span>Table & Bill</span>           
            </div>
        </div>

        <div class="p-3">
            <div class="row">
                <div class="col-12 mb-3">
                    <label for="" class="fw-bold">Table No./Name (Optional)</label>
                    <SelectSearchBox 
                        :options="availableTables.map(table => ({ label: table.table_number || table.table_number, value: table.id }))" 
                        v-model="form.table_id"
                        placeholder="Select Table" 
                        showCreate
                        createText="Add New Table"
                        createModalId="addTableModal"
                        input-class="form-control form-select" 
                        :is-multi="false"                            
                    />
                </div>

                 <div class="col-12 mb-3">
                    <label for="" class="fw-bold">Bill Name/Label (Optional) <span class="text-danger fw-bold ">*</span></label>
                    <input type="text" placeholder="e.g. John-Table 4 (Optional)" v-model="form.tab_name"  class="form-control" required>
                    <small class="text-muted">This helps you Identify the bill easily</small>
                </div>

                 <div class="col-12 mb-3">
                    <label for="" class="fw-bold">Number of Guests <span class="text-danger fw-bold ">*</span></label>
                    <input type="text" placeholder="e.g. 4" v-model="form.guest_count"  class="form-control" pattern="^[0-9]+$" required>
                    <small class="text-muted">Enter the number of guests for this table</small>
                </div>

                 <div class="col-12 mb-3">
                    <label for="" class="fw-bold">Notes (Optional)</label>
                    <!-- ✅ Cleaner -->
                    <textarea
                    v-model="form.notes"
                    class="form-control"
                    rows="3"
                    placeholder="Start typing..."
                    ></textarea>
                </div>
                

                <div class="col-12 mt-4">
                    <div class="p-3 text-muted text-center border border-1 fw-bold border-dark-subtle bg-light rounded d-flex gap-2 justify-content-center align-items-center">
                        <span class="bx bx-info-circle fs-3"></span>
                        <div class="">This tab will be created as Dine-In</div>
                    </div>
                </div>
            </div>
        </div>

          <div class="p-3">
                <div class="p-3 pb-1 bg-success-muted rounded border-success-subtle border border-2">
                    <h4 class="card-title d-flex gap-2 align-items-center"><i class="dripicons-tags fs-5"></i>
                        <span>Billing Summary</span></h4>
                    <table class="table text-uppercase fs-6 table-sm border-success m-0">
                        <tbody>
                            <tr class="border-success">
                                <td>Total Items</td>
                                <th class="text-right">{{ cartItemsCount ||'' }} (Items)</th>
                            </tr>
                            <tr class="border-success">
                                <td>Discount</td>
                                <th class="text-right">Kes 0.00</th>
                            </tr>
                            <tr class="border-success">
                                <td>Total</td>
                                <th class="text-right">{{ cartTotal.toLocaleString('en-US', {
                                    style: 'currency', currency: 'KES'
                                }) || 0 }}</th>
                            </tr>

                            <tr>
                                <td>Tax</td>
                                <th class="text-right">Kes 0.00</th>
                            </tr>

                            <tr class="fs-4 text-black">
                                <th>Sub Total</th>
                                <th class="text-right">{{ cartTotal.toLocaleString('en-US', {
                                    style: 'currency', currency: 'KES'
                                }) || 0 }}</th>
                            </tr>

                        </tbody>
                    </table>

                </div>
            </div>

           <div class="p-3 d-flex flex-column gap-3">
                <!-- Save as Tab — primary action -->
                <button 
                    :disabled="!isDirty || saving"
                    type="submit" 
                    form="saveTabForm" 
                    class="btn btn-primary waves-effect btn-lg fw-bold flex-grow-1">

                     <span v-if="saving" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            <template v-if="saving">Saving...</template>
                    <template v-if="!saving">
                        <i class="mdi mdi-bookmark-outline fs-3 align-middle me-2"></i>
                    Save As Tab
                    </template>
                </button>

                <!-- Cancel — dismisses offcanvas -->
                <button 
                @click="resetForm()"
                    :disabled="!isDirty"
                    data-bs-target="#saveTabAside" 
                    data-bs-toggle="offcanvas" type="button"
                    class="btn btn-light waves-effect fw-bold flex-nowrap d-flex align-items-center justify-content-center btn-lg">
                    <i class="mdi mdi-close fs-4 align-middle me-2"></i>
                    Cancel
                </button>
            </div>
      </form>
       
    </div>
    <div 
        v-if="!newTab"
       class="offcanvas-body p-0  animate__animated animate__fadeIn animate__faster"
    >
    <p>The tabs will appear here</p>
    
    </div>
</div>
 <AddTableModal
    :showSelect="true"
    @table-added="loadTables()"
    @table-selected="(id) => form.table_id = id"
  />
  <AddCustomerModal
    :showSelect="true"
     @customer-added="loadCustomers()"
    @customer-selected="(id) => form.customer_id = id"
  />

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
import { ref, computed, onMounted, onBeforeMount, onBeforeUnmount,watch } from "vue";
import axios from "axios";
import NProgress from "nprogress"
import ImageToast from "@/components/ImageToast.vue"
import successImage from "../../../assets/images/icons/check.png"
import errorImage from "../../../assets/images/icons/error.png"

// budge images
import GoldBadge from "../../../assets/images/icons/loyalty-badges/gold.svg"
import SilverBadge from "../../../assets/images/icons/loyalty-badges/silver.svg"
import BronzeBadge from "../../../assets/images/icons/loyalty-badges/2.bronze.svg"
import PlatinumBadge from "../../../assets/images/icons/loyalty-badges/2.platinum.svg"


// components
import SelectSearchBox from '@/components/SelectSearchBox.vue'
import AddTableModal from './table.add.vue'
import AddCustomerModal from './Customer.Add.Modal.vue'

import SkeletonContainer from "@/components/Loaders/SkeletonContainer.vue";
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'




import POSAPI from "@/api/POS.API";
const TABLES_API    = POSAPI.tables();
const CUSTOMERS_API = POSAPI.customers();
const SALES_API     = POSAPI.sales();

const props = defineProps({
  cart:      { type: Array,  default: () => [] },
  cartTotal: { type: Number, default: 0 },
  cartItemsCount: { type: Number, default: 0 },
  isTabAsideOpen: { type: Boolean, default: false }

});

const emit = defineEmits(['saved', 'cancel']);

// Form state
const form = ref({
  tab_name:    '',
  table_id:    null,
  customer_id: null,
  guest_count: 1,
  notes:       '',
  payment_method: null,
});

// Lookup data
const availableTables = ref([]);
const customers       = ref([]);
const saving          = ref(false);
const contactsCount=ref('')
const selectedCustomer=ref({})

const customerInvoices=ref([])
const CustomerDebtTotal=ref(0)
const customerTotalInvoices=ref(0)
const riskScore=ref(0)
const loadingCustomers=ref(false)

const customerRecomendations=ref({})
const risk_tier=ref('')
const customerStats=ref({})
const customerUnpaidBills=ref([])

const isLoadingCustomer = ref(false)
const customerError = ref(null)  // optional — for showing fetch failures


const newTab=ref(true)

const skeletonRows = Array.from({ length: 4 })


//searching for contacts
const customerPickerRef    = ref(null)    // the wrapping div
const showCustomerDropdown = ref(false)   // is the list visible?
const searchQuery   = ref('')

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

const canSave = computed(() =>
  form.value.tab_name.trim() !== '' && props.cart.length > 0
);

function selectCustomer(customer) {
  form.value.customer_id = customer.id
  searchQuery.value      = customer.name
  showCustomerDropdown.value = false
  selectedCustomer.value=customer
  loadCustomerDetails(customer.id)
  console.log("Selected customer", customer)
}

function clearSelectedCustomer() {
  form.value.customer_id = null
  searchQuery.value      = ''
  showCustomerDropdown.value = true
}

function onCustomerSearchFocus() {
  showCustomerDropdown.value = true
}

function getInitials(name, max = 2) {
  if (!name) return '?'
  return name.trim().split(/\s+/).map(n => n[0]).join('').slice(0, max).toUpperCase()
}

// Close dropdown when user clicks anywhere outside it
function handleClickOutsideCustomerPicker(event) {
  if (customerPickerRef.value && !customerPickerRef.value.contains(event.target)) {
    showCustomerDropdown.value = false
  }
}

async function loadTables() {
  try {
    const res = await axios.get(TABLES_API, { params: { status: 'available', is_active: 1 } });
    availableTables.value = res.data.data || [];
    console.log('The Tables',res.data)
  } catch (e) {
    console.error('Failed to load tables', e);
  }
}

let searchTimer = null

function handleSearchInput() {
    loadingCustomers.value = true
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    loadCustomers()
  }, 400) // 400ms debounce — adjust to taste
}
const rand = (min, max) => `${Math.floor(Math.random() * (max - min) + min)}px`

async function loadCustomers() {
  try {
    loadingCustomers.value = true
    const params = { limit: 100, is_active: 1 }
    if (searchQuery.value?.trim()) {
      params.search = searchQuery.value.trim()
    }

    const res = await axios.get(CUSTOMERS_API, { params })
    customers.value     = res.data.data || []
    contactsCount.value = res.data.total ?? 0

    console.log("The customers", res.data)
  } catch (e) {
    console.error('Failed to load customers', e)
  } finally {
    loadingCustomers.value = false
  } 
}

async function loadCustomerInvoices(customerId) {
    //alert("serching invoices for customer "+customerId)
  try {
    const params = {
    limit: 5,
    sort: 'created_at',
    order: 'desc',
    customer_id: customerId,
    payment_status: 'UNPAID', // Only fetch unpaid invoices to calculate debt
    };
    const res = await axios.get(SALES_API, { params })
    customerInvoices.value = res.data.data || []
    console.log(`Invoices for customer ${customerId}`, res.data)

    customerTotalInvoices.value = res.data.data.length ?? 0
    CustomerDebtTotal.value = customerInvoices.value.reduce((sum, inv) => sum + (Number(inv.balance_due) || 0), 0)
    console.log(`Customer ${customerId} has ${customerTotalInvoices.value} invoices with a total debt of ${CustomerDebtTotal.value}`)
  } catch (e) {
    console.error(`Failed to load invoices for customer ${customerId}`, e)
  }
}

async function loadCustomerDetails(customerId) {
  // Reset to clean state at the start of every call.
  customerRecomendations.value = {}
  risk_tier.value = ''
  customerStats.value = {}
  customerUnpaidBills.value = []
  customerError.value = null

  // Flip the loading flag ON before the network request.
  isLoadingCustomer.value = true

  try {
    const res = await axios.get(`${CUSTOMERS_API}/${customerId}/context`)
    const data = res.data

    customerUnpaidBills.value    = data.unpaid_bills    || []
    customerStats.value          = data.stats           || {}
    risk_tier.value              = data.risk_tier       || ''
    customerRecomendations.value = data.recommendation|| {}
      
  } catch (e) {
    console.error(`Failed to load details for customer ${customerId}`, e)
    customerError.value = e?.response?.data?.error || 'Failed to load customer details'
  } finally {
    // ALWAYS turn loading off — whether the request succeeded or failed.
    isLoadingCustomer.value = false
  }
}
async function saveTab() {
  if (!canSave.value) return

  NProgress.start()
  saving.value = true
  showToast(
    "loading",
    "Creating Open Bill",
    "Please wait while we register the new open bill..."
  )

  try {
    // Look up the picked table so we can snapshot the table_number.
    // (table_number is what shows on receipts / tab lists; the id is just an FK.)
    const pickedTable = availableTables.value.find(
      t => t.id === form.value.table_id
    )
    const tableNumber = pickedTable?.table_number ?? null

    // Compute the total from the cart so balance_due is accurate
    // even if the server eventually recalculates it.
    const subtotal = props.cart.reduce(
      (sum, i) => sum + (Number(i.price) * Number(i.quantity)),
      0
    )
    const taxTotal = props.cart.reduce(
      (sum, i) => sum + (Number(i.price) * Number(i.quantity) * (Number(i.tax_percent) || 0) / 100),
      0
    )
    const total = Math.max(subtotal + taxTotal, 0)

    // Sensible default tab name if user didn't enter one
    const tabName =
      form.value.tab_name?.trim() ||
      (tableNumber ? `Tab — ${tableNumber}` : `Tab — ${Date.now().toString().slice(-4)}`)

     // alert(tabName)

    const payload = {
      sale_type:       'DINE_IN',

      // ---- Lifecycle / payment state for an open tab ----
      status:          'OPEN',     // legacy column
      lifecycle_status: 'OPEN',    // new column — tab is open, items can still be added
      payment_status:   'UNPAID',  // not paid yet (your enum: UNPAID|PARTIAL|PAID|REFUNDED)
      amount_paid:      0,
      balance_due:      Number(total.toFixed(2)),

      // ---- Tab identity ----
      tab_name:        tabName,
      table_id:        form.value.table_id,
      table_number:    tableNumber,           // snapshot of label at the time of opening
      customer_id:     form.value.customer_id,
      guest_count:     form.value.guest_count,
      notes:           form.value.notes,

      items: props.cart.map(i => ({
        product_id: i.id,
        quantity:   i.quantity,
      })),
    }

    const res = await axios.post(SALES_API, payload)

    showToast(
      "success",
      "Open Bill Created",
      `<strong>${tabName}</strong> was registered successfully.`
    )

    console.log("Created open bill", res.data)
    resetForm()

    emit('saved', res.data)
  } catch (error) {
    const apiData = error?.response?.data
    const fieldErrors = apiData?.errors
    const apiMessage =
      (fieldErrors && Object.values(fieldErrors)[0]) ||
      apiData?.error ||
      apiData?.message ||
      error?.message ||
      "Failed to create open bill. Please try again."

    showToast("error", "Failed to Create Open Bill", apiMessage)
  } finally {
    NProgress.done()
    saving.value = false
  }
}

function riskScoreCalculator(opened_at, unpaidHistory, lastActivity, unpaidAmount) {
    const openDurationMinutes = (now - new Date(opened_at)) / (1000 * 60)

    // TIME RISK (0–40)
    if (openDurationMinutes > 180) riskScore.value += 40;
    else if (openDurationMinutes > 120) riskScore.value += 25;
    else if (openDurationMinutes > 90) riskScore.value += 10;

    if (unpaidHistory > 3) riskScore.value += 30;
    else if (unpaidHistory > 1) riskScore.value += 15;

    const idleTime= (now - new Date(lastActivity)) / (1000 * 60)
    if (idleTime > 60) riskScore.value += 20;
    else if (idleTime > 30) riskScore.value += 10;
}

const isDirty=computed(()=>{
  return form.value.tab_name.trim() !== '' || form.value.table_id || form.value.customer_id || form.value.notes.trim() !== ''
})

function resetForm() {
  form.value = {
    tab_name:    '',
    table_id:    null,
    customer_id: null,
    guest_count: 1,
    notes:       '',
  }
    
}
watch(() => form.value.customer_id, (newCustomerId) => {
  if (newCustomerId) {

    if(newCustomerId!=1){
        loadCustomerInvoices(newCustomerId)
    }
    else{
        //alert(newCustomerId)
        customerInvoices.value = []
        customerTotalInvoices.value=0
        CustomerDebtTotal.value=0
    }
   
  } else {
      customerInvoices.value = []
      customerTotalInvoices.value = 0
      CustomerDebtTotal.value = 0
  }
})
onMounted(() => {
  
  document.addEventListener('click', handleClickOutsideCustomerPicker)
})

watch(() => props.isTabAsideOpen, (isOpen) => {

    //load tables and customers fresh each time the aside is opened, in case there were changes while it was closed
    if (isOpen) {
        loadTables()
        loadCustomers()
    }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutsideCustomerPicker)
})

</script>
<style scoped>
.custom-popover {
    --bs-popover-border-color: #cccccc;
    /* --bs-popover-header-bg: var(--bd-violet-bg);
  --bs-popover-header-color: var(--bs-white);
  --bs-popover-body-padding-x: 1rem;
  --bs-popover-body-padding-y: .5rem; */
}
.nav-tabs-custom .nav-item .nav-link::after{
    height: 4px;
}
</style>
