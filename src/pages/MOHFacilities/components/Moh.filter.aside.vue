<template>

    <!-- FILTER BUTTON -->
    <button
        type="button"
        class="btn btn-light waves-effect fw-bold flex-nowrap d-flex align-items-center justify-content-center"
        data-bs-toggle="offcanvas"
        data-bs-target="#MOHFilters"
        aria-controls="MOHFilters"
    >
        <i class="mdi mdi-filter-variant fs-4 align-middle me-2"></i>

        <span class="d-md-inline-block d-none">
            Filter
        </span>

        <!-- Active filter count -->
        <span
            v-if="activeFilterCount > 0"
            class="badge bg-primary rounded-pill ms-2"
        >
            {{ activeFilterCount }}
        </span>
    </button>


    <!-- ====================================================== -->
    <!-- FILTER OFFCANVAS -->
    <!-- ====================================================== -->

    <div
        class="offcanvas offcanvas-end w-25"
        tabindex="-1"
        id="MOHFilters"
        aria-labelledby="MOHFiltersLabel"
    >

        <!-- ================================================== -->
        <!-- HEADER -->
        <!-- ================================================== -->

        <div class="offcanvas-header border-bottom">

            <div class="d-flex align-items-center gap-2">

                <button
                    type="button"
                    class="btn btn-white p-0 avatar-sm rounded-circle"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                >
                    <span class="avatar-title bg-transparent text-reset">
                        <i class="bx bx-arrow-back font-size-22"></i>
                    </span>
                </button>

                <div>

                    <h5
                        id="MOHFiltersLabel"
                        class="mb-0"
                    >
                        Filter Facilities
                    </h5>

                    <small class="text-muted">
                        Narrow down the facility registry
                    </small>

                </div>

            </div>

        </div>


        <!-- ================================================== -->
        <!-- BODY -->
        <!-- ================================================== -->

        <div class="offcanvas-body p-0">


            <!-- ================================================== -->
            <!-- OPERATIONAL STATUS -->
            <!-- ================================================== -->

            <div class="px-4 py-2 fw-bold border-top bg-light">
                Operational Status
            </div>

            <div class="p-3 border-top">

                <div class="d-flex flex-wrap gap-2">

                    <button
                        v-for="status in statusTypes"
                        :key="status.value"
                        type="button"
                        class="btn fw-bold btn-rounded waves-effect px-3 text-nowrap flex-shrink-0"
                        :class="
                            statusFilter === status.value
                                ? 'btn-primary'
                                : 'btn-light'
                        "
                        @click="setStatus(status.value)"
                    >

                        <i
                            v-if="status.icon"
                            :class="[
                                'mdi',
                                status.icon,
                                'me-1'
                            ]"
                        ></i>

                        {{ status.label }}

                    </button>

                </div>

            </div>


            <!-- ================================================== -->
            <!-- OWNERSHIP -->
            <!-- ================================================== -->

            <div class="px-4 py-2 fw-bold border-top bg-light">
                Ownership
            </div>

            <div class="p-3 border-top">

                <div class="d-flex flex-wrap gap-2">

                    <button
                        v-for="owner in ownershipOptions"
                        :key="owner.value"
                        type="button"
                        class="btn  fw-bold btn-rounded waves-effect px-3 text-nowrap flex-shrink-0"
                        :class="
                            ownershipFilter === owner.value
                                ? 'btn-primary'
                                : 'btn-light'
                        "
                        @click="setOwnership(owner.value)"
                    >

                        <i
                            v-if="owner.icon"
                            :class="[
                                'mdi',
                                owner.icon,
                                'me-1'
                            ]"
                        ></i>

                        {{ owner.label }}

                    </button>

                </div>

            </div>


            <!-- ================================================== -->
            <!-- FACILITY LEVEL -->
            <!-- ================================================== -->

            <div class="px-4 py-2 fw-bold border-top bg-light d-flex gap-1 align-items-center ">
                <span class="text-black">Facility Level </span>

                <button 
                    type="button" 
                    title="Click to get more info" 
                    class="btn btn-sm btn-light position-relative p-0 avatar-xs rounded-circle" 
                    data-bs-toggle="modal"
                    data-bs-target="#viewDetailsModal"
                    @click="detailsModalTitle = 'Facility Level Information'; 
                    detailsModalMessage = 'Facility levels are categorized based on the services they provide. For example, Level 1 facilities are primary care centers, while Level 5 facilities are specialized hospitals.'; 
                    detailsModalList = levelOptions; "
                    >
                    <span class="avatar-title bg-transparent text-reset">
                        <Icon icon="bi:question-circle-fill" class="fs-5 text-primary" />
                    </span>
                </button>
            </div>

            <div class="p-3 border-top">

                <div class="d-flex flex-wrap gap-2">

                    <button
                        v-for="level in levelOptions"
                        :key="level.value"
                        type="button"
                        class="btn fw-bold btn-rounded waves-effect px-3 text-nowrap flex-shrink-0"
                        :class="
                            levelFilter === level.value
                                ? 'btn-primary'
                                : 'btn-light'
                        "
                        @click="setLevel(level.value)"
                    >
                        {{ level.name }}
                    </button>

                </div>

            </div>


            <!-- ================================================== -->
            <!-- FACILITY TYPE -->
            <!-- ================================================== -->

            <div class="px-4 py-2 fw-bold border-top bg-light d-flex gap-1 align-items-center ">
                <span class="text-black">Facility Type </span>

                <button 
                    type="button" 
                    title="Click to get more info" 
                    class="btn btn-sm btn-light position-relative p-0 avatar-xs rounded-circle" 
                    data-bs-toggle="modal"
                    data-bs-target="#viewDetailsModal"
                    @click="detailsModalTitle = 'Facility Type Information'; 
                    detailsModalMessage = 'Facility types refer to the specific category or classification of a health facility based on the services they offer. For example, a health center, dispensary, or hospital are different facility types.'; 
                    detailsModalList = typeOptions; "
                    >
                    <span class="avatar-title bg-transparent text-reset">
                        <Icon icon="bi:question-circle-fill" class="fs-5 text-primary" />
                    </span>
                </button>
            </div>

            <div class="p-3 border-top">

                <SelectSearchBox
                    v-model="facilityTypeFilter"
                    :options="
                        typeOptions.map(type => ({
                            label: type.name,
                            value: type.value
                        }))
                    "
                    placeholder="Select facility type"
                    :is-multi="false"
                    input-class="form-control form-select"
                    class-name="mb-0"
                    @update:modelValue="setFacilityType"
                />

            </div>


            <!-- ================================================== -->
            <!-- LOCATION -->
            <!-- ================================================== -->

            <div class="px-4 py-2 fw-bold border-top bg-light">
                Location
            </div>

            <div class="p-3 border-top">

                <!-- County -->

                <label class="form-label fw-semibold">
                    County
                </label>

                <SelectSearchBox
                    v-model="countyFilter"
                    :options="
                        countyOptions.map(county => ({
                            label: county.name,
                            value: county.value
                        }))
                    "
                    placeholder="Select county"
                    :is-multi="false"
                    input-class="form-control form-select"
                    class-name="mb-3"
                    @update:modelValue="setCounty"
                />


                <!-- Sub County -->

                <label class="form-label fw-semibold">
                    Sub-county
                </label>

                <SelectSearchBox
                    v-model="subCountyFilter"
                    :options="
                        subCountyOptions.map(subCounty => ({
                            label: subCounty.name,
                            value: subCounty.value
                        }))
                    "
                    placeholder="Select sub-county"
                    :is-multi="false"
                    input-class="form-control form-select"
                    class-name="mb-0"
                    :disabled="!countyFilter"
                    @update:modelValue="setSubCounty"
                />

                <small
                    v-if="!countyFilter"
                    class="text-muted d-block mt-2"
                >
                    Select a county first.
                </small>


                <div class="d-none">
                    <div>County test area</div>
                    <SelectCounty
                        v-model="countyFilter"
                        @county-selected="setCounty"
                    >
                    </SelectCounty>

                    <div>Sub-county test area</div>
                    <SelectSubCounty
                        v-model="subCountyFilter"
                        :county-id="countyFilter"
                        @subcounty-selected="setSubCounty"
                        />
                </div>

            </div>


            <!-- ================================================== -->
            <!-- ACTIVE FILTER SUMMARY -->
            <!-- ================================================== -->

            <div
                v-if="activeFilterCount > 0"
                class="px-4 py-2 fw-bold border-top bg-light"
            >
                Active Filters
            </div>

            <div
                v-if="activeFilterCount > 0"
                class="p-3 border-top"
            >

                <div class="d-flex flex-wrap gap-2">

                    <span
                        v-if="statusFilter"
                        class="badge bg-light text-dark borde px-3 py-2 m-0"
                    >
                        Status:
                        {{ statusFilterName }}
                    </span>

                    <span
                        v-if="ownershipFilter"
                        class="badge bg-light text-dark borde px-3 py-2 m-0"
                    >
                        Ownership:
                        {{ ownershipName }}
                    </span>

                    <span
                        v-if="levelFilter"
                        class="badge bg-light text-dark borde px-3 py-2 m-0"
                    >
                        Level:
                        {{ levelFilterName }}
                    </span>

                    <span
                        v-if="facilityTypeFilter"
                        class="badge bg-light text-dark borde px-3 py-2 m-0"
                    >
                        Type:
                        {{ typeFilterName }}
                    </span>

                    <span
                        v-if="countyFilter"
                        class="badge bg-light text-dark borde px-3 py-2 m-0"
                    >
                        County:
                        {{ countyName }}
                    </span>

                    <span
                        v-if="subCountyFilter"
                        class="badge bg-light text-dark borde px-3 py-2 m-0"
                    >
                        Sub-county:
                        {{ subCountyName }}
                    </span>

                </div>

            </div>

        </div>


        <!-- ================================================== -->
        <!-- FOOTER -->
        <!-- ================================================== -->

        <div class="offcanvas-footer p-3 border-top bg-white">

            <button
                type="button"
                class="btn btn-light btn-rounded waves-effect w-100 btn-lg text-center fw-bold cursor-pointer"
                @click="clearFilters"
            >
                
                Clear Filters
            </button>

        </div>

    </div>

    <DetailsModal
        ref="detailsModal"
        :title="detailsModalTitle"
        :message="detailsModalMessage"
        :list="detailsModalList"
        confirm-text="Close"
        :show-cancel-button="false"
    />

</template>


<script setup>

import { Icon } from '@iconify/vue'


import {
    ref,
    computed,
    onMounted
} from 'vue'

//components
import SelectSearchBox from '@/components/SelectSearchBox.vue'
import DetailsModal from '@/components/popUps/details.vue'
import SelectCounty from '@/components/inputs/county.select.vue'
import SelectSubCounty from '@/components/inputs/subcounty.select.vue'

import MOHFACILITIESAPI from '@/api/mohFacilities.js'


// ======================================================
// EVENTS
// ======================================================

const emit = defineEmits([
    'filter-change',
    'clear-filters'
])

//details modal ref
const detailsModal = ref(null)
const detailsModalTitle = ref(null)
const detailsModalMessage = ref(null)
const detailsModalList = ref([])


// ======================================================
// FILTER STATE
// ======================================================

const countyFilter = ref('')

const subCountyFilter = ref('')

const facilityTypeFilter = ref('')

const ownershipFilter = ref('')

const statusFilter = ref('')

const levelFilter = ref('')


// ======================================================
// OPTIONS
// ======================================================

const countyOptions = ref([])

const subCountyOptions = ref([])

const typeOptions = ref([])

const levelOptions = ref([])


// ======================================================
// STATIC FILTER OPTIONS
// ======================================================

const ownershipOptions = [
    {
        label: 'All Ownerships',
        value: '',
        icon: 'mdi-domain'
    },
    {
        value: 'National Government',
        label: 'National Government',
        icon: 'mdi-bank'
    },
    {
        value: 'County Government',
        label: 'County Government',
        icon: 'mdi-city'
    },
    {
        value: 'Private',
        label: 'Private',
        icon: 'mdi-office-building'
    },
    {
        value: 'Faith Based Organization',
        label: 'Faith Based Organization',
        icon: 'mdi-church'
    },
    {
        value: 'Non-Governmental Organizations',
        label: 'NGO',
        icon: 'mdi-account-group'
    },
    {
        value: 'Community',
        label: 'Community',
        icon: 'mdi-home-group'
    }
]


const statusTypes = [
    {
        label: 'All Statuses',
        value: '',
        icon: 'mdi-check-circle-outline'
    },
    {
        label: 'Operational',
        value: 'Operational',
        icon: 'mdi-check-circle'
    },
    {
        label: 'Closed',
        value: 'Closed',
        icon: 'mdi-cancel'
    }
]


// ======================================================
// COMPUTED LABELS
// ======================================================

const countyName = computed(() => {

    return (
        countyOptions.value.find(
            item =>
                item.value === countyFilter.value
        )?.name ||
        'All Counties'
    )

})


const subCountyName = computed(() => {

    return (
        subCountyOptions.value.find(
            item =>
                item.value === subCountyFilter.value
        )?.name ||
        'All Sub-counties'
    )

})


const typeFilterName = computed(() => {

    return (
        typeOptions.value.find(
            item =>
                item.value ===
                facilityTypeFilter.value
        )?.name ||
        'All Types'
    )

})


const ownershipName = computed(() => {

    return (
        ownershipOptions.find(
            item =>
                item.value ===
                ownershipFilter.value
        )?.label ||
        'All Ownerships'
    )

})


const statusFilterName = computed(() => {

    return (
        statusTypes.find(item =>item.value ===statusFilter.value)?.label ||'All Statuses'
    )

})


const levelFilterName = computed(() => {

    return (
        levelOptions.value.find(
            item =>
                item.value ===
                levelFilter.value
        )?.name ||
        'All Levels'
    )

})


// ======================================================
// ACTIVE FILTER COUNT
// ======================================================

const activeFilterCount = computed(() => {

    return [
        countyFilter.value,
        subCountyFilter.value,
        facilityTypeFilter.value,
        ownershipFilter.value,
        statusFilter.value,
        levelFilter.value
    ].filter(Boolean).length

})


// ======================================================
// EMIT FILTERS
// ======================================================

function applyFilters() {

    emit('filter-change', {
        county: countyFilter.value || null,
        sub_county: subCountyFilter.value || null,
        type:facilityTypeFilter.value || null,
        owner_type:ownershipFilter.value || null,
        operation_status:statusFilter.value || null,
        level:levelFilter.value || null
    })

}


// ======================================================
// COUNTY
// ======================================================

function setCounty(value) {
   // alert('County selected: ' + value); // Debugging alert

    countyFilter.value =value || ''

    subCountyFilter.value =''

    subCountyOptions.value =[]

    if (countyFilter.value) {
        loadSubCounties(
            countyFilter.value
        )
    }

    applyFilters()

}


// ======================================================
// SUB COUNTY
// ======================================================

function setSubCounty(value) {

    subCountyFilter.value =
        value || ''

    applyFilters()

}


// ======================================================
// FACILITY TYPE
// ======================================================

function setFacilityType(value) {

    facilityTypeFilter.value =
        value || ''

    applyFilters()

}


// ======================================================
// OWNERSHIP
// ======================================================

function setOwnership(value) {

    ownershipFilter.value =
        value || ''

    applyFilters()

}


// ======================================================
// STATUS
// ======================================================

function setStatus(value) {

    statusFilter.value =
        value || ''

    applyFilters()

}


// ======================================================
// LEVEL
// ======================================================

function setLevel(value) {

    levelFilter.value =
        value || ''

    applyFilters()

}


// ======================================================
// COUNTIES
// ======================================================

async function loadCounties() {

    try {

        const {data} =await MOHFACILITIESAPI.counties()

       countyOptions.value = [
        { value: '', name: 'All Counties', count: null },
        ...(data?.data ?? [])
        ]

        console.log(
            'Counties loaded:',
            countyOptions.value
        )

    } catch (error) {

        console.error(
            'Error loading counties:',
            error
        )

    }

}


// ======================================================
// SUB COUNTIES
// ======================================================

async function loadSubCounties(
    county
) {

    try {

        const {
            data
        } =
            await MOHFACILITIESAPI.subCounties({
                county
            })

        subCountyOptions.value = [
            {
                value: '',
                name: 'All Sub-counties',
                count: null
            },
             ...(data?.data ?? [])
        ]

    } catch (error) {

        console.error(
            'Error loading sub-counties:',
            error
        )

    }

}


// ======================================================
// TAXONOMY
// ======================================================

async function loadTaxonomy() {

    try {

        const [
            {
                data: types
            },
            {
                data: levels
            }
        ] =
            await Promise.all([
                MOHFACILITIESAPI.types(),
                MOHFACILITIESAPI.levels()
            ])


        typeOptions.value = [
            {
                value: '',
                name: 'All Types',
                count: null
            },
            ...(types.data || [])
        ]


        levelOptions.value = [
            {
                value: '',
                name: 'All Levels',
                count: null
            },
            ...(levels.data || [])
        ]

    } catch (error) {

        console.error(
            'Error loading facility taxonomy:',
            error
        )

    }

}


// ======================================================
// CLEAR
// ======================================================

function clearFilters() {

    countyFilter.value = ''

    subCountyFilter.value = ''

    facilityTypeFilter.value = ''

    ownershipFilter.value = ''

    statusFilter.value = ''

    levelFilter.value = ''

    subCountyOptions.value = []

    emit('clear-filters')

}


// ======================================================
// INITIAL LOAD
// ======================================================

onMounted(() => {

    loadCounties()

    loadTaxonomy()

})

</script>
