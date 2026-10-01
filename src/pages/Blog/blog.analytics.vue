<template>
    <div class="row">
        <div class="col-12">
            <button class="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#partnerOffcanvas" aria-controls="offcanvasRight">
                Toggle right offcanvas
            </button>

            <div class="offcanvas offcanvas-end w-25" tabindex="-1" id="activityLogsAside"
                aria-labelledby="offcanvasRightLabel">
                <!-- Header -->
                <div class="offcanvas-header border-bottom py-0 pr-0">
                    <div class="d-flex align-items-center gap-2">
                        <span class="text-muted">
                            <button type="button" class="btn btn-white position-relative p-0 avatar-sm rounded-circle"
                                data-bs-dismiss="offcanvas" aria-label="Close">
                                <span class="avatar-title bg-transparent text-reset">
                                    <i class="bx bx-arrow-back font-size-22"></i>
                                </span>
                            </button>
                        </span>
                        <h5 id="offcanvasRightLabel" class="mb-0">Article Analysis</h5>
                    </div>

                    <div>
                        <div class="d-flex header-action-btn">

                            <!-- status update -->
                            <div class="d-flex ms-1 align-items-center justify-content-center"
                                :title="partner?.partner_status === 'Active' ? 'Disable Partner' : 'Enable Partner'"
                                data-bs-toggle="tooltip" data-bs-placement="top">
                                <div class="form-check form-switch form-switch-md mb-0" dir="ltr">
                                    <input class="form-check-input" type="checkbox" role="switch"
                                        :id="`SwitchCheckSizelg${partner?.id}`" v-model="partnerActive"
                                        @change="toggleStatus(partner)" />

                                    <label class="form-check-label" :for="`SwitchCheckSizelg${partner?.id}`"></label>
                                </div>
                            </div>

                            <!-- Edit -->
                            <div class="d-inline-block d-lg-inline-block ms-1" title="Edit Partnership">
                                <button type="button" class="btn header-item noti-icon waves-effect">
                                    <i class="bx bx bx-edit-alt"></i>
                                </button>
                            </div>

                            <!-- Change Logo -->
                            <div class="d-inline-block d-lg-inline-block ms-1" title="Change Logo">
                                <button type="button" class="btn header-item noti-icon waves-effect">
                                    <i class="bx bx bx-camera"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="btn-close text-reset d-none" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>



                <div class="offcanvas-body p-0">
                    <button type="button" class="btn btn-success waves-effect waves-light d-none"
                        data-bs-custom-class="custom-popover" data-bs-toggle="popover" data-bs-trigger="focus"
                        data-bs-html="true" data-bs-content="
                                <div class='popover-content-wrapper'>
                                    <div class='d-flex align-items-center mb-2'>
                                        <i class='mdi mdi-information-outline text-primary me-2 fs-5'></i>
                                        <strong>Quick Info</strong>
                                    </div>
                                    <p class='mb-2 small'>This article has been viewed <strong>1,234 times</strong> and shared across multiple platforms.</p>
                                    <div class='d-flex gap-2 mb-2'>
                                        <span class='badge bg-primary-soft text-primary'>Technology</span>
                                        <span class='badge bg-success-soft text-success'>Featured</span>
                                    </div>
                                    <hr class='my-2'>
                                    <div class='d-flex justify-content-between align-items-center'>
                                        <small class='text-muted'>Last updated: 2 days ago</small>
                                        <a href='#' class='small text-decoration-none'>Learn more →</a>
                                    </div>
                                </div>
                            "
                        title="<div class='d-flex align-items-center'><i class='mdi mdi-star text-warning me-2'></i><strong>Article Stats</strong></div>">
                        <i class="mdi mdi-information-outline me-1"></i> Show Details
                    </button>

                    <!-- article details -->
                    <div class="p-3 bg-success-subtle rounded d-flex gap-3 align-items-center">
                        <div>
                            <div>
                                <img src="/src/assets/images/portfolio/project-1.jpg" class="img rounded" alt=""
                                    style="width: 80px;">
                            </div>
                        </div>
                        <div>
                            <h6 class="mt-2 text-dark">cundo se estrena avatar fuego y ceniza en mxico y de qu trata la
                                tercera parte de la saga</h6>
                            <p class="text-muted small mb-0 pb-0">Created On 30 Jun 2024 . Last Updated Yesterday</p>
                        </div>
                    </div>


                    <!-- account profile -->
                    <div class="p-3 rounded d-flex gap-3">
                        <div class="d-flex align-items-center w-100">
                            <div class="flex-shrink-0 me-3">
                                <div data-v-0330a191="" class="avatar-sm d-flex active-author border-round"><img
                                        data-v-0330a191="" class="rounded-circle profile-pic-cont"
                                        src="https://randomuser.me/api/portraits/men/0.jpg" alt="Author avatar">
                                </div>
                            </div>
                            <div data-v-0330a191="" class="flex-grow-1 chat-user-box">
                                <p data-v-0330a191="" class="user-title m-0 fs-6 fw-bold text-truncate d-flex"
                                    style="max-width: 300px;"><span class="text-muted d-none d-md-flex">By: </span>
                                    <span> Lorena Pacheco</span>
                                </p>

                                <p class="text-muted small mb-0 pb-0">email@email.com. <span><a href="">24
                                            Posts</a></span></p>


                            </div>
                            <div class="">
                                <div class="dropdown ms-2">
                                    <a class="text-muted fs-4 waves-effect p-2" href="#" role="button"
                                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="mdi mdi-dots-horizontal" data-bs-toggle="tooltip"
                                            data-bs-placement="top" title="More actions on profile"></i>
                                    </a>

                                    <div class="dropdown-menu dropdown-menu-end">
                                        <!-- Dropdown Header/Title -->
                                        <h6 class="dropdown-header">Account Menu</h6>

                                        <a class="dropdown-item" href="#">
                                            <i class="mdi mdi-account-outline me-2"></i>View Profile
                                        </a>
                                        <a class="dropdown-item" href="#">
                                            <i class="mdi mdi-cog-outline me-2"></i>Account Preview
                                        </a>
                                        <a class="dropdown-item" href="#">
                                            <i class="mdi mdi-pencil-outline me-2"></i>Edit Profile
                                        </a>


                                        <div class="dropdown-divider"></div>

                                        <a class="dropdown-item " href="#">
                                            <i class="mdi mdi-pause-circle-outline me-2"></i>Deactivate Account
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <!-- Stats -->
                    <div class="px-4 py-2 fw-bold text-dark sticky-top  text-black border-top bg-light">
                        Article Views Stats
                    </div>
                    <div class="p-3 border-top border-dark-muted">
                        <div class="row my align-items-center justify-content-center d-flex">
                            <div class="col-12 col-md-8 text-center">
                                <p class="mb-4 text-muted ">Article Analytics for the period 1 Jan 2022 to 30 August2022
                                </p>
                            </div>

                            <div class="col-6 d-none">
                                <div
                                    class=" p-2 border-primary-subtle bg-info bg-opacity-10 text-dark border-dark border-dashed mb-0 h-100">
                                    <div class="card-body">
                                        <i class="mdi mdi-cursor-default-click fs-1 text"></i>
                                        <h5 class="fs-4 mt-4 mb-1 fw-bold">657</h5>
                                        <div class="fs-12 text-reset fw-normal">Website Clicks</div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6 d-none">
                                <div
                                    class="card border-primary-subtle bg-success bg-opacity-10 text-dark border-dark border-dashed mb-0 h-100">
                                    <div class="card-body">
                                        <i class="mdi mdi-clock-time-five-outline fs-1 text"></i>
                                        <h5 class="fs-4 mt-4 mb-1 fw-bold">56</h5>
                                        <div class="fs-12 text-reset fw-normal">
                                            Months since Addition
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 text-center ">
                                <h5 class="mb-0 fw-semibold text-black">5678</h5>
                                <p class="text-muted small">Total Article views/read</p>
                            </div>

                            <div class="col-6 text-center ">
                                <h5 class="mb-0 fw-semibold text-black">5 Min</h5>
                                <p class="text-muted small">Estimated total Reading time</p>
                            </div>

                            <div class="col-12 text-center mt-3">
                                <AnalyticsAreaChart 
                                    :categories="xaxisCategorys"
                                    :series="xaxisSeries"
                                    :metricName="metricName" 
                                />
                            </div>
                        </div>
                    </div>

                    <!-- article logs -->
                    <div class="px-4 py-2 fw-bold text-dark sticky-top  text-black border-top bg-light">
                        Article Logs
                    </div>
                    <div class="p-3 border-top border-dark-muted">
                        <div class="row">
                            <div class="col-12">
                                <ActivityTimeline :logs="articleLogs" />
                            </div>
                        </div>
                    </div>
                     <div class="px-4 py-2 fw-bold text-dark sticky-top  text-black border-top bg-light d-flex gap-3 align-items-center justify-content-between">
                        <span>Viewers Locations</span>

                        <div class="">
                            <div class="input-group input-group-sm">
                                <select 
                                    class="form-select form-select-sm"
                                    @change="(e) => {
                                        if(e.target.value === 'country'){
                                            loadCountries();
                                        }else if(e.target.value === 'region'){
                                            loadCounties();
                                        }
                                    }"
                                    >
                                    <option value="country" selected="">Country</option>
                                    <option value="region">Region</option>                                    
                                </select>
                              
                            </div>
                        </div>
                    </div>
                      <div class="p-3 border-top border-dark-muted">
                        <div class="row">
                            <div class="col-12">
                               <Progress-bar 
                                v-for="(country, index) in selectedSource" 
                                :key="index" 
                                :label="country.label" 
                                :value="country.value"
                                :percentage="country.percent"
                               />
                            </div>

                            <div class="col-12 d-flex align-items-center justify-content-center">
                                <button 
                                    class="btn btn btn-link waves-effect fw-bold text-black" 
                                    title="click to load more"
                                    
                                >
                                    Load More</button>
                            </div>
                        </div>
                      </div>
                      

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch,onMounted } from "vue";
import partnersApi from "@/api/partners.js";
import NProgress from "nprogress";
import AnalyticsAreaChart from "@/components/Charts/Analytics.Area.chart.vue";
import ActivityTimeline from "@/components/historyLogs/ActivityTimeline.vue";
import ProgressBar from "@/components/Charts/progress.bar.vue";

// region pegination
const regionCurrentPage = ref(1);
const regionPerPage = ref(5);


const articleLogs=ref([
     {
                id: 1,
                type: 'created',
                message: 'Article was created',
                user: 'John Doe',
                date: 'March 15, 2024',
                time: '10:30 AM'
            },
            {
                id: 2,
                type: 'edited',
                message: 'Title and Content were updated',
                fields: ['Title', 'Content'],
                user: 'John Doe',
                date: 'March 15, 2024',
                time: '2:45 PM'
            },
            {
                id: 3,
                type: 'edited',
                message: 'Featured Image was changed',
                fields: ['Featured Image'],
                user: 'Jane Smith',
                date: 'March 16, 2024',
                time: '9:15 AM'
            },
            {
                id: 4,
                type: 'visibility',
                message: 'Visibility changed from Public to Private',
                user: 'Admin User',
                date: 'March 16, 2024',
                time: '3:20 PM'
            },
            {
                id: 5,
                type: 'edited',
                message: 'Tags and Category were updated',
                fields: ['Tags', 'Category'],
                user: 'John Doe',
                date: 'March 17, 2024',
                time: '11:05 AM'
            },
            {
                id: 6,
                type: 'edited',
                message: 'SEO Metadata was optimized',
                fields: ['SEO Metadata'],
                user: 'Jane Smith',
                date: 'March 18, 2024',
                time: '4:20 PM'
            },
            {
                id: 7,
                type: 'visibility',
                message: 'Visibility changed from Private to Public',
                user: 'Admin User',
                date: 'March 19, 2024',
                time: '8:15 AM'
            },
            {
                id: 8,
                type: 'edited',
                message: 'Author Information was updated',
                fields: ['Author Information'],
                user: 'John Doe',
                date: 'March 20, 2024',
                time: '1:30 PM'
            },
            {
                id: 9,
                type: 'edited',
                message: 'Excerpt and Summary were revised',
                fields: ['Excerpt', 'Summary'],
                user: 'Jane Smith',
                date: 'March 21, 2024',
                time: '10:45 AM'
            },
            {
                id: 10,
                type: 'edited',
                message: 'Related Articles were linked',
                fields: ['Related Articles'],
                user: 'John Doe',
                date: 'March 22, 2024',
                time: '3:00 PM'
            },
])

const xaxisCategorys = ref([
    "Jan 2022",
    "Feb 2022",
    "Mar 2022",
    "Apr 2022",
    "May 2022",
    "Jun 2022",
    "Jul 2022",
    "Aug 2022",
]);

const xaxisSeries = ref({
    name: "Views",
    data: [13, 15, 22, 14, 18, 20, 17, 15],
});

const metricName = ref("Views");

const countryStats = [
  { label: "Kenya", value: 25, percent: 13.5 },
  { label: "Uganda", value: 40, percent: 21.6 },
  { label: "Tanzania", value: 15, percent: 8.1 },
  { label: "Rwanda", value: 60, percent: 32.4 }
]


countryStats.sort((a, b) => b.value - a.value)

///importing from json file
const countryStatsData = ref([]);
const regionsStatsData = ref([]); 
const selectedSource = ref([]);    

const loadCountries=async()=>{
    try{
        const response=await fetch('/mock.APIS/countryStats_with_codes.json');
        const data=await response.json();
        countryStatsData.value=data.slice(regionPerPage.value * (regionCurrentPage.value - 1), regionPerPage.value * regionCurrentPage.value);

        selectedSource.value=countryStatsData.value;
        console.log("Countries data loaded:", countryStatsData.value);
        //alert("Countries data loaded. Check console for details.");
    }catch(err){
        console.error("Error loading countries data:", err);
        //alert("Failed to load countries data. Check console for details.");
    }
}

const loadCounties=async()=>{
    try{
        const response=await fetch('/mock.APIS/regions.json');
        const data=await response.json();
        regionsStatsData.value=data.slice(regionPerPage.value * (regionCurrentPage.value - 1), regionPerPage.value * regionCurrentPage.value);


        selectedSource.value=regionsStatsData.value;
        console.log("Regions data loaded:", regionsStatsData.value);
        //alert("Regions data loaded. Check console for details.");
    }catch(err){
        console.error("Error loading regions data:", err);
        //alert("Failed to load regions data. Check console for details.");
    }
}

const props = defineProps({
    partnerId: {
        type: Number,
        required: true,
    },
});

const partner = ref(null);
const loading = ref(false);
const fallbackLogo = new URL(
    "../../assets/images/icons/nope-not-here.avif",
    import.meta.url
).href;

const fetchPartner = async (id) => {
    loading.value = true;
    NProgress.start();
    try {
        const response = await partnersApi.getById(id);
        partner.value = response.data.data;
    } catch (err) {
        console.error("Error fetching partner:", err);
        partner.value = null;
    } finally {
        loading.value = false;
        NProgress.done();
    }
};
const partnerActive = computed({
    get: () => partner.value?.partner_status === "Active",
    set: (val) => {
        partner.value.partner_status = val ? "Active" : "Inactive";
    },
});

onMounted(() => {
  loadCountries(); // fetch the JSON once
});



// Refetch when ID changes
watch(
    () => props.partnerId,
    (newId) => {
        if (newId) fetchPartner(newId);
    },
    { immediate: true }
);

const parsedProducts = computed(() => partner.value?.products_used || []);


const sanitizedUrl = computed(() => {
    if (!partner.value?.link_url) return "#";
    return partner.value.link_url.startsWith("http")
        ? partner.value.link_url
        : `https://${partner.value.link_url}`;
});
</script>
<style>
.custom-popover {
    --bs-popover-border-color: #cccccc;
    /* --bs-popover-header-bg: var(--bd-violet-bg);
  --bs-popover-header-color: var(--bs-white);
  --bs-popover-body-padding-x: 1rem;
  --bs-popover-body-padding-y: .5rem; */
}
</style>
