<template>
    <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        :id="id"
        style="width:500px;"
    >
        <!-- Header -->
        <div class="offcanvas-header border-bottom px-4 py-3">

            <div class="d-flex align-items-center gap-3">

                <div
                    class="avatar-sm  rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style="width:48px;height:48px;"
                >
                    <i
                        :class="icon"
                        class="fs-3 text-dark"
                    ></i>
                </div>

                <div>

                    <h5 class="mb-0 fw-bold">
                        {{ title }}
                    </h5>

                    <small class="text-muted ">
                        {{ subtitle }}
                    </small>

                </div>

            </div>

            <button
                type="button"
                class="btn p-0 border-0"
                data-bs-dismiss="offcanvas"
            >
                <i class="bx bx-x fs-2"></i>
            </button>

        </div>

        <!-- Body -->
        <div class="offcanvas-body p-0">
           <UserSummary
                :user="user"

                :show-avatar="true"
                avatar-size="avatar-sm"
                :showRole="false"

                :show-email="true"
                :show-category="true"
                :show-status="true"

                :clickable="true"
                profile-route="/users"

                :show-actions="true"
                :actions="userActions"

                @click="openProfile"
                @action="handleAction"
            />

        <div class="px-4 py-2 fw-bold text-dark sticky-top text-black border-top bg-light">
            <h6 class="mb-0 fw-bold text-dark">
                Login Restriction Settings
            </h6>
        </div>
            <div class="p-3">
                <div class="p-3  rounded d-flex gap-3  mb-3  border-1 border border-dark-subtle flex-column">
               <div  class=" d-flex gap-3 justify-content-between align-items-center w-100">
                 <div class="avatar-xs mx-auto">
                    <span class="avatar-title rounded-circle bg-primary bg-soft" >
                        <i class="mdi mdi-web text-primary fs-4"></i>
                    </span>
                </div>

                <div class="flex-grow-1">
                    <h6 class="mb-1 fw-bold">Location Restrictions</h6>
                    <p class="text-muted mb-0 small">Allow sign-ins only from selected countries</p>
                </div>

                <div class="d-flex gap-3 align-items-center">
                    <label class="form-check-label text-success fw-bold">
                        Enabled
                    </label>

                    <div class="form-check form-switch form-switch-md mb-0">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            checked
                            
                        >
                    </div>
                </div>
               </div>

                <div class="mt-3">
                    <label for="">Allowed Countries</label>
                    <CountrySelect
                         @country-selected="handleCountrySelected"
                         :isLightWeightAPi="true"
                    />
                </div>
            </div> 

             <div class="p-3  rounded d-flex gap-3  mb-3  border-1 border border-dark-subtle flex-column">
               <div  class=" d-flex gap-3 justify-content-between align-items-center w-100">
                 <div class="avatar-xs mx-auto">
                    <span class="avatar-title rounded-circle bg-primary bg-soft" >
                        <i class="mdi mdi-ip-network-outline text-primary fs-4"></i>
                    </span>
                </div>

                <div class="flex-grow-1">
                    <h6 class="mb-1 fw-bold">IP Address Restrictions</h6>
                    <p class="text-muted mb-0 small">Restrict login access to specific IP addresses.</p>
                </div>

                <div class="d-flex gap-3 align-items-center">
                    <label class="form-check-label text-success fw-bold">
                        Enabled
                    </label>

                    <div class="form-check form-switch form-switch-md mb-0">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            checked
                            
                        >
                    </div>

                  
                </div>
               </div>

                <div class="mt-3">
                    <label for="">Allowed IP Addresses</label>
                    <div class="d-flex align-items-center gap-3 d-none">
                        <input type="text" class="form-control" placeholder="Enter IP address">
                        <button class="btn btn-soft-primary waves-effect waves-light btn-lg fw-bold text-nowrap text-center border-primary-subtle border-1 ">Add</button>
                    </div>
                      <div>
                        <SelectSearchBox
                            v-model="ipAddress"
                            :options="ipOptions"
                            placeholder="Enter IP Address"
                            is-multi="true"
                            isTaggable="true"
                            @create-option="handleCreateOption"
                            />
                    </div>
                </div>



                <div>
                    <h4 class="m-0 text-uppercase d-flex align-items-center"><span class="align-items-center badge-alt2 bg-gray-200 text-dark bg-secondary-soft w-auto text-black d-flex gap-2 w-auto px-2"><div class="text-dark fw-bold">120.123.00.00</div> <i class="mdi mdi-close fs-4 cursor-pointer"></i></span> </h4>
                </div>
            </div> 
             <div class="p-3  rounded d-flex gap-3  mb-3  border-1 border border-dark-subtle flex-column">
               <div  class=" d-flex gap-3 justify-content-between align-items-center w-100">
                 <div class="avatar-xs mx-auto">
                    <span class="avatar-title rounded-circle bg-primary bg-soft" >
                        <i class="mdi mdi-clock-outline text-primary fs-4"></i>
                    </span>
                </div>

                <div class="flex-grow-1">
                    <h6 class="mb-1 fw-bold">Business Hours</h6>
                    <p class="text-muted mb-0 small">Allow the user to sign in only during specific hours.</p>
                </div>

                <div class="d-flex gap-3 align-items-center">
                    <label class="form-check-label text-success fw-bold">
                        Enabled
                    </label>

                    <div class="form-check form-switch form-switch-md mb-0">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            checked
                            
                        >
                    </div>
                </div>
               </div>

                <div class="row">
                    <div class="col-6">
                        <div class="mt-3">
                            <label for="">Start Time</label>
                            <div class="d-flex align-items-center gap-3">
                                <input
                                    v-model="selectedEndTime"
                                    type="time"
                                    class="form-control"
                                >
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="mt-3">
                            <label for="">End Time</label>
                            <div class="d-flex align-items-center gap-3">
                                <input
                                    v-model="selectedStartTime"
                                    type="time"
                                    class="form-control"
                                >
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-3">
                        <div class="w-100">
                            <h4 class="m-0 text-uppercase d-flex align-items-center w-100">
                                <span class="align-items-center w-100 fs-6 bg-gray-200 text-dark bg-secondary-soft  text-black d-flex gap-2  p-3">                                    
                                   <div>
                                    <span class="text-dark fs-4" >3 Hrs</span>
                                     <div class=" fw-bold text-muted">09:00 AM - 05:00 PM</div>
                                     
                                   </div>
                                </span> 
                            </h4>
                        </div>
                    </div>
                </div>

               
            </div> 
            <div class="p-3  rounded d-flex gap-3  mb-3  border-1 border border-dark-subtle flex-column">
               <div  class=" d-flex gap-3 justify-content-between align-items-center w-100">
                 <div class="avatar-xs mx-auto">
                    <span class="avatar-title rounded-circle bg-primary bg-soft" >
                        <i class="mdi mdi-calendar-blank text-primary fs-4"></i>
                    </span>
                </div>

                <div class="flex-grow-1">
                    <h6 class="mb-1 fw-bold">Allowed Days</h6>
                    <p class="text-muted mb-0 small">Restrict access to selected days of the week.</p>
                </div>

                <div class="d-flex gap-3 align-items-center">
                    <label class="form-check-label text-success fw-bold">
                        Enabled
                    </label>

                    <div class="form-check form-switch form-switch-md mb-0">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            checked
                            
                        >
                    </div>
                </div>
               </div>

                <div class="row">
                    <div class="col-12 d-flex gap-3">
                        <div class="mt-3">
                            <div class="form-check form-check-primary">
                                <input class="form-check-input" type="checkbox" id="mon">
                                <label class="form-check-label" for="mon">
                                    Mon
                                </label>
                            </div>
                        </div>

                        <div class="mt-3">
                            <div class="form-check form-check-primary">
                                <input class="form-check-input" type="checkbox" id="tue">
                                <label class="form-check-label" for="tue">
                                    Tue
                                </label>
                            </div>
                        </div>

                        <div class="mt-3">
                            <div class="form-check form-check-primary">
                                <input class="form-check-input" type="checkbox" id="wed">
                                <label class="form-check-label" for="wed">
                                    Wed
                                </label>
                            </div>
                        </div>

                        <div class="mt-3">
                            <div class="form-check form-check-primary">
                                <input class="form-check-input" type="checkbox" id="thu">
                                <label class="form-check-label" for="thu">
                                    Thu
                                </label>
                            </div>
                        </div>

                        <div class="mt-3">
                            <div class="form-check form-check-primary">
                                <input class="form-check-input" type="checkbox" id="fri">
                                <label class="form-check-label" for="fri">
                                    Fri
                                </label>
                            </div>
                        </div>

                        <div class="mt-3">
                            <div class="form-check form-check-primary">
                                <input class="form-check-input" type="checkbox" id="sat">
                                <label class="form-check-label" for="sat">
                                    Sat
                                </label>
                            </div>
                        </div>

                        <div class="mt-3">
                            <div class="form-check form-check-primary">
                                <input class="form-check-input" type="checkbox" id="sun">
                                <label class="form-check-label" for="sun">
                                    Sun
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

               
            </div>
            </div> 
        </div>

        <div class="offcanvas-body p-0 d-none">
            <div class="px-4 py-2 fw-bold text-dark sticky-top text-black border-top bg-light"> 
                <div class="d-flex gap-3 align-items-center justify-content-between">
                    <span>Location Restrictions 
                        <br>
                        <small>Allow sign-ins only from selected countries</small>
                    </span>
                    <div class="d-flex gap-3 align-items-center">
                        <label class="form-check-label text-success fw-bold">
                            Enabled
                        </label>

                        <div class="form-check form-switch form-switch-md mb-0">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                checked
                                
                            >
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-3 border-top border-dark-muted">
                <p class="d-none">Allow sign-ins only from selected countries</p>
                <div class="mt-3">
                    <label for="">Allowed Countries</label>
                    <CountrySelect/>
                </div>

            </div>
        </div>

        <!-- Footer -->
        <div class="offcanvas-footer border-top px-4 py-3">

            <slot name="footer">

                <div class="d-flex justify-content-end gap-2">

                    <button
                        class="btn btn-light btn-lg waves waves-effect waves-light "
                        data-bs-dismiss="offcanvas"
                        disabled
                    >
                        Cancel
                    </button>

                    <button
                        class="btn btn-primary btn-lg waves-effect waves-light "
                        @click="save"
                        disabled
                    >
                        Save Changes
                    </button>

                </div>

            </slot>

        </div>

    </div>
</template>

<script setup>
import { CAlert } from '@coreui/vue';
//import '@coreui/coreui/dist/css/coreui.min.css'

import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import NProgress from "nprogress";//the proggress bar at the top


// API
import UsersAPI from '@/api/users'
import AuthAPI from '@/api/auth'

//components
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'
import ImageToast from '@/components/ImageToast.vue'
import ConfirmActionModal from '@/components/ConfirmActionModal.vue'
import SelectSearchBox from '@/components/SelectSearchBox.vue';
import UserSummary  from '@/components/user/User.Summary.vue';
import CountrySelect from '@/components/inputs/country.select.vue';

// Utils    
import { smartDate, formatDateTime } from '@/utils/dates'
import { SECURITY_ACTIONS } from '@/constants/securityActions.js'

import successImage from '../../../assets/images/icons/check.png'
import errorImage from '../../../assets/images/icons/error.png'

//variables
const selectedCountry = ref(null);
const ipAddress = ref([]);
const ipOptions = ref([
    'test1',
    'test2',    
]); // This will hold the options for the SelectSearchBox



const props = defineProps({

    id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        default: 'Sidebar'
    },

    subtitle: {
        type: String,
        default: ''
    },

    icon: {
        type: String,
        default: 'mdi mdi-cog-outline'
    },
    user:{
        type:Object,
        required:true
    }

})

const emit = defineEmits([
    'save',
    'cancel'
])

function save() {
    emit('save')
}

function cancel() {
    emit('cancel')
}

function handleCountrySelected(country) {
    selectedCountry.value = country;
    console.log(country)

    // Example
    console.log(country.value)      // KE
    console.log(country.phoneCode)  // 254
    console.log(country.label)     // (254) Kenya
    console.log(country.flag)      // flag URL
}

const handleCreateOption = (value) => {
    ipOptions.value.push({ label: value, value })
    // keep as string in selected tags
    ipAddress.value.push(value)
}
</script>