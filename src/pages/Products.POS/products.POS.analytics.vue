<template>
    <!-- Toggle Button -->
<button class="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#productAnalyticsCanvas">
    Toggle right offcanvas
</button>

<!-- Offcanvas -->
<div class="offcanvas offcanvas-end w-25" tabindex="-1" id="productAnalyticsCanvas">

    <!-- Header -->
    <div class="offcanvas-header border-bottom py-0 pr-0">
        <div class="d-flex align-items-center gap-2">
            <button type="button" class="btn btn-white position-relative p-0 avatar-sm rounded-circle"
                data-bs-dismiss="offcanvas" aria-label="Close">
                <span class="avatar-title bg-transparent text-reset">
                    <i class="bx bx-arrow-back font-size-22"></i>
                </span>
            </button>
            <h5 class="mb-0">Item Analytics</h5>
        </div>

        <div class="d-flex header-action-btn">

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


    <!-- Body -->
    <div class="offcanvas-body p-0">

        <!-- Article block -->
        <div class="p-3  rounded d-flex gap-3 "
            :class="
                productDetails?.stockStatus === 'ACTIVE'
                ? 'bg-success-subtle'
                : productDetails?.stockStatus === 'OUT_OF_STOCK'
                ? 'bg-danger-subtle'
                : productDetails?.stockStatus === 'LOW_STOCK'
                ? 'bg-warning-subtle'
                : productDetails?.stockStatus === 'SUSPENDED'
                ? 'bg-orange-subtle'        /* matches your #fd7e14 mood */
                : productDetails?.stockStatus === 'DISABLED'
                ? 'bg-secondary-subtle'
                : 'bg-secondary-subtle'       /* fallback */
            "
        >
        
            <img :src="productDetails?.image || '/src/assets/images/portfolio/project-1.jpg'" class="img rounded" style="width:80px;">
            <div>
                <h5 class="mt-2 text-dark">
                    <span>{{ productDetails?.productname }}</span>
                    <div class="text-uppercase fs-6">
                         <span v-if="productDetails?.stockStatus === 'ACTIVE'" class="badge bg-success">
                            Active
                        </span>

                        <span v-else-if="productDetails?.stockStatus === 'OUT_OF_STOCK'"
                            class="badge bg-danger">
                            Out of Stock
                        </span>

                        <span v-else-if="productDetails?.stockStatus === 'LOW_STOCK'"
                            class="badge bg-warning text-dark">
                            Low Stock
                        </span>

                        <span v-else-if="productDetails?.stockStatus === 'SUSPENDED'" class="badge"
                            style="background:#fd7e14;">
                            Suspended
                        </span>

                        <span v-else-if="productDetails?.stockStatus === 'DISABLED'"
                            class="badge bg-secondary">
                            Disabled
                        </span>

                        <span v-else class="badge bg-secondary">
                            Unknown
                        </span>
                    </div>
                </h5>
                
                <p class="text-muted ">
                    {{ productDetails?.barcode || '-' }} <small class="mdi-record mdi " ></small>
                    {{ productDetails?.quantity || '-' }} <small class="mdi-record mdi "></small>
                    {{ productDetails?.brand || '-' }}
                </p>
                <p class="text-muted mb-0 d-non small">
                    {{ productDetails?.description || 'No description available' }}
                </p>
            </div>
        </div>

        <!-- Author profile -->
        <div class="p-3 rounded d-flex gap-3">
               <div class="w-100 p-3 border rounded border-dark-muted">
                    <div>
                        <h6 class="text-dark text-black fw-bold">Stock Level progression</h6>
                    </div>
                    <div class="w-100">
                        <div class="progress bg-dark-muted fw-bold border-radius-0" style="height: 13px;">
                            <div v-if="calculatePercent(productDetails?.stockLevel, productDetails?.reorderLevel) >= 100"
                                class="progress-bar bg-success " role="progressbar"
                                :style="{ width: calculatePercent(productDetails?.stockLevel, productDetails?.reorderLevel) + '%' }"
                                :aria-valuenow="productDetails?.stockLevel" aria-valuemin="0" aria-valuemax="100">
                                {{ Math.round(calculatePercent(productDetails?.stockLevel,
                                productDetails?.reorderLevel)) || 0 }}%
                            </div>

                            <div v-else-if="calculatePercent(productDetails?.stockLevel, productDetails?.reorderLevel) >= 25 && calculatePercent(productDetails?.stockLevel, productDetails?.reorderLevel) < 100" "
                        class=" progress-bar bg-warning text-black" role="progressbar"
                                :style="{ width: calculatePercent(productDetails?.stockLevel, productDetails?.reorderLevel) + '%' }"
                                :aria-valuenow="productDetails?.stockLevel" aria-valuemin="0" aria-valuemax="100">
                                {{ Math.round(calculatePercent(productDetails?.stockLevel,
                                productDetails?.reorderLevel)) || 0 }}%
                            </div>
                            <div v-else-if="calculatePercent(productDetails?.stockLevel, productDetails?.reorderLevel) >= 0 && calculatePercent(productDetails?.stockLevel, productDetails?.reorderLevel) < 25"
                                class="progress-bar bg-danger " role="progressbar"
                                :style="{ width: calculatePercent(productDetails?.stockLevel, productDetails?.reorderLevel) + '%' }"
                                :aria-valuenow="productDetails?.stockLevel" aria-valuemin="0" aria-valuemax="100">
                                {{ Math.round(calculatePercent(productDetails?.stockLevel,
                                productDetails?.reorderLevel)) || 0 }}%
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between w-100">
                        <strong>
                            <small
                                v-if="calculatePercent(productDetails.stockLevel, productDetails.reorderLevel) >= 100">Healthy
                                Stock</small>
                            <small
                                v-else-if="calculatePercent(productDetails.stockLevel, productDetails.reorderLevel) >= 25 && calculatePercent(productDetails.stockLevel, productDetails.reorderLevel) < 100">Low
                                Stock</small>
                            <small
                                v-else-if="calculatePercent(productDetails.stockLevel, productDetails.reorderLevel) < 25">Critically
                                Low</small>
                        </strong>

                        <span class="text-right text-sm mt-1 text-capitalize text-muted small">
                            <strong>{{ productDetails?.stockLevel || 0 }}</strong> in stock out of <strong>{{
                                productDetails?.reorderLevel || 0 }}</strong> required
                        </span>
                    </div>

                </div>
  
        </div>

        <div class="p-3 d-flex flex-column  border-top border-dark-muted w-100">
          
           <div class="">
                <ul class="list-unstyled m-0">
                    <!-- Stock at hand -->
                    <li class="event-list d-none">
                        <div class="d-flex mb-3">
                            <div class="flex-shrink-0 me-3">
                                <i class="bx bx-package h2 text-black"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="font-size-14 text-capitalize text-black">Stock at hand</h5>
                                <p class="text-muted">
                                    {{ productDetails?.stockLevel || 0 }} {{ productDetails?.packaging || 'units' }}
                                    ({{ productDetails?.quantity || 0 }} {{ productDetails?.quantityUnit || '' }})
                                </p>
                            </div>
                        </div>
                    </li>

                    <!-- Avg Daily Sales -->
                    <li class="event-list mb-3">
                        <div class="d-flex">
                            <div class="flex-shrink-0 me-3">
                                <i class="bx bx-line-chart h2 text-black"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="font-size-14 text-capitalize text-black">Avg Daily Sales</h5>
                                <p class="text-muted d-flex flex-column ">
                                    <span>{{ productDetails?.avg_daily_consumption || 0 }} Units (Estimated)</span>
                                    <small>~Calculated from the past 30 days</small>
                                </p>
                            </div>
                        </div>
                    </li>

                    <!-- Estimated Stock Days -->
                    <li class="event-list mb-3">
                        <div class="d-flex">
                            <div class="flex-shrink-0 me-3">
                                <i class="bx bx-time-five h2 text-black"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="font-size-14 text-capitalize text-black">Estimated stock days</h5>
                                <p class="text-muted mb-">
                                    {{ productDetails?.days_of_stock_remaining || 0 }} Days (Estimated)
                                </p>
                            </div>
                        </div>
                    </li>

                    <!-- Value of current stock -->
                    <li class="event-list mb-0">
                        <div class="d-flex">
                            <div class="flex-shrink-0 me-3">
                                <i class="bx bx-wallet h2 text-black"></i>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="font-size-14 text-capitalize text-black">Value of current stock</h5>
                                <p class="text-muted mb-0">
                                    {{
                                        (productDetails?.stockLevel * productDetails?.sellingPrice || 0)
                                            .toLocaleString('en-US', { style: 'currency', currency: 'KES' })
                                    }}
                                </p>
                            </div>
                        </div>
                    </li>

                    <!-- Popularity Score -->
                    <li class="event-list mb-0 d-none">
                        <div class="d-flex">
                            <div class="flex-shrink-0 me-3">
                                <i class="bx bx-pulse h2 text-black d-none"></i>
                                <span class="h2">⭐</span>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="font-size-14 text-capitalize text-black">Popularity Score</h5>
                                <p class="text-muted">
                                    <span v-if="(productDetails?.popularity_score || 0) > 80"><strong class="fs-5">🔥</strong> Hot Seller</span>
                                    <span v-else-if="(productDetails?.popularity_score || 0) >= 60"><strong class="fs-5">⭐</strong> Popular</span>
                                    <span v-else-if="(productDetails?.popularity_score || 0) >= 30"><strong class="fs-5">💤</strong> Slow Moving</span>
                                    <span v-else><strong class="fs-5">❄️</strong> Dead Stock</span>
                                </p>
                            </div>
                        </div>
                    </li>

                </ul>
           </div>

        </div>

        <!-- popularity score -->
         <div 
            class="p-3 d-flex border-top border-dark-muted w-100"
            :class=" 
                (productDetails?.popularity_score || 0) > 80 ? 'bg-success-subtle' :
                (productDetails?.popularity_score || 0) >= 60 ? 'bg-primary-subtle' :
                (productDetails?.popularity_score || 0) >= 30 ? 'bg-warning-subtle' :
                'bg-danger-subtle'
            "
        >
            <ul class="list-unstyled m-0 w-100">
                <li class="event-list mb-0 w-100">
                        <div class="d-flex w-100">
                            <div class="flex-shrink-0 me-3">
                                <i
                                    class="h2"
                                    :class="
                                    (productDetails?.popularity_score || 0) > 80
                                        ? 'bx bx-trending-up text-success'
                                    : (productDetails?.popularity_score || 0) >= 60
                                        ? 'bx bx-star text-primary'
                                    : (productDetails?.popularity_score || 0) >= 30
                                        ? 'bx bx-trending-down text-warning'
                                    : 'bx bx-error text-danger'
                                    "
                                ></i>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="font-size-14 text-capitalize text-black d-flex align-items-end justify-content-between gap-2 mb-1">
                                    <span>Popularity Score</span>
                                    <div class="" style="">
                                        <span class="badge bg-success text-uppercase" v-if="(productDetails?.popularity_score || 0) > 80"><strong class="">🔥</strong> Hot Seller</span>
                                        <span class="badge bg-primary text-uppercase " v-else-if="(productDetails?.popularity_score || 0) >= 60"><strong class="">⭐</strong> Popular</span>
                                        <span class="badge bg-warning text-uppercase text-black" v-else-if="(productDetails?.popularity_score || 0) >= 30"><strong class="">💤</strong> Slow Moving</span>
                                        <span class="badge bg-danger text-uppercase" v-else><strong class="">❄️</strong> Dead Stock</span>
                                    </div>
                                </h5>
                                <p class="text-muted m-0">
                                    22 Units Sold in last 30 days
                                </p>
                            </div>
                        </div>
                    </li>
            </ul>
            
         </div>

        <!-- Stats -->
        <div class="px-3 py-2 fw-bold text-dark sticky-top bg-white border-top" style="z-index:2100">
            <div class="d-flex gap-2 align-items-center justify-content-between">
                <span>Stock Insights</span>
            <div>
                <DatePicker 
                    v-model:dateFrom="snapshotDateFrom" 
                    v-model:dateTo="snapshotDateTo" 
                    :showPredefinedRanges="true" 
                    :customRangeTitle="datePresetLabel"
                    class=" fw-normal"
                />
            </div>
            </div>
        </div>

        <div class="p-3 border-top border-dark-muted text-center">
           

            <div class="row">
                 <div class="col-6 mb-3 text-left cursor-pointer" title="Current stock level" @click="selectedColumn='closing_stock',metricName='Closing Stock'">
                    <div :class="{ 'border-primary border-2': selectedColumn === 'closing_stock' }"
                     class="p-3 border rounded border-dark-muted">
                        <h5 class="fw-semibold text-black gap-2 d-flex align-items-center">
                            <span>{{ periodInventory || 0 }}</span>
                            <small class="text-success"> <i class="bx bx-up-arrow-alt"></i>+5%</small>
                        </h5>                    
                    
                        <p class="text-muted small d-flex   gap-1 m-0">
                            <span>Period Inventory</span> 
                            <i 
                                data-bs-trigger="focus"
                                data-bs-toggle="popover" 
                                title="Period Inventory" 
                                data-bs-content="Indicates the total stock moved in during selected period. Calculated as opening stock + purchases + returns. Useful for understanding stock acquisition."
                                class="bx bxs-info-circle fs-5 text-black cursor-pointer custom-popover">

                            </i>
                        </p>
                    </div>                       
                    
                </div>
                <div class="col-6 mb-3 text-left cursor-pointer" title="Daily sales based on the last 30 days" @click="selectedColumn='total_sales',metricName='Sold units'">
                    <div  :class="{ 'border-primary border-2': selectedColumn === 'total_sales' }"
                     class="p-3 border rounded border-dark-muted">
                        <h5 class="fw-semibold text-black">                            
                            {{ periodSales || 0 }}
                            <small class="text-danger"> <i class="bx bx-down-arrow-alt"></i>-5%</small>
                        </h5>
                        <p class="text-muted small m-0">Stock Sales</p>
                    </div>
                </div>
                <div class="col-6 mb-3 text-left cursor-pointer" title="Daily sales based on the last 30 days" @click="selectedColumn='customer_returns',metricName='Customer Returns'">
                    <div
                   :class="{ 'border-primary border-2': selectedColumn === 'customer_returns' }"
                    class="p-3 border rounded border-dark-muted">
                        <h5 class="fw-semibold text-black">                            
                            {{ periodReturns || 0}}
                             <small class="text-danger"> <i class="bx bx-up-arrow-alt"></i>+5%</small>
                        </h5>
                        <p class="text-muted small m-0">Returns</p>
                    </div>
                </div>
                <div class="col-6 mb-3 text-left cursor-pointer" title="Daily sales based on the last 30 days" @click="selectedColumn='revenue',metricName='Sales Revenue'">
                    <div
                   :class="{ 'border-primary border-2': selectedColumn === 'revenue' }"
                    class="p-3 border rounded border-dark-muted">
                        <h5 class="fw-semibold text-black">                            
                            {{
                                        (periodRevenue || 0)
                                            .toLocaleString('en-US', { style: 'currency', currency: 'KES' })
                                    }}
                             <small class="text-success"> <i class="bx bx-up-arrow-alt"></i>+5%</small>
                        </h5>
                        <p class="text-muted small m-0">Sales Revenue</p>
                    </div>
                </div>

              
                

                <div class="col-12 ">
                    <!-- Placeholder chart block -->
                    <div class="rounded">
                        <AnalyticsAreaChart 
                            :categories="xaxisCategorys"
                            :series="xaxisSeries"
                            :metricName="metricName" 
                            :colorTheme="colorTheme"
                        />
                        
                    </div>
                    <button class="btn btn-sm btn-primary mx-2 d-none" @click="fetchAnalyticsData">Refresh data</button>
                </div>
            </div>
        </div>

        <!-- Article Logs -->
         
        <div class="px-3 py-2 fw-bold text-dark sticky-top bg-white border-top border-bottom" style="z-index:2000">
            <div class="d-flex gap-2 align-items-center justify-content-between">
                <span>Stock Movements</span>
            <div>
                <DatePicker 
                    v-model:dateFrom="movementDateFrom" 
                    v-model:dateTo="movementDateTo" 
                    :showPredefinedRanges="true" 
                    :customRangeTitle="datePresetLabel"
                    class=" fw-normal"
                />
            </div>
            </div>
        </div>

        <div class="p-3">
           <ActivityTimeline :logs="movementLogs" :loading="isLoading" type="stock_movements"/>
           <div v-if="activityLoading" class="mt-3">                

                <div class="d-flex mb-3" v-for="i in 5" :key="i" >
                    <SkeletonLoader  :count="5" height="20px" style="width: 20px; border-radius: 50%;"  class="mt-2 me-3" />
                    <div class="d-flex flex-column flex-grow-1">
                        <SkeletonLoader  
                            :count="5" 
                            height="10px"  
                            class="mt-2 flex-grow-1"  
                            :style="{ width: rand(80, 100) + '%' }" />
                        <SkeletonLoader  :count="5" height="8px"  class="mt-2" :width="rand(30, 60)+'%'"/>
                    </div>
                </div>
           </div>
        </div>

         <div class="d-flex align-items-center justify-content-center mb-3">
            <div v-if="hasMore" class="load-more-container">
                <button @click="loadMore" class="btn btn btn-link waves-effect"> 
                    Load more
                </button>
            </div>

         </div>
       
    </div>
</div>

</template>

<script setup>
import { ref, computed, watch,onMounted,nextTick } from "vue";
import { subDays } from 'date-fns';
import { useRouter } from 'vue-router'
import axios from 'axios';

import {
    formatUploadDate,
    formatDateTime,
    smartDate,
    timeAgo,
    formatDate,
    getUserPreferences,
    dateDiff
} from '@/utils/dates';


import partnersApi from "@/api/partners.js";
import NProgress from "nprogress";
import AnalyticsAreaChart from "@/components/Charts/Analytics.Area.chart.vue";
import ActivityTimeline from "@/components/historyLogs/ActivityTimeline.vue";
import ProgressBar from "@/components/Charts/progress.bar.vue";
import DatePicker from "@/components/DatePickers/datePicker.facebookstyle.vue";
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'

//APIS
import POSAPI from "@/api/POS.API"
import { width } from "highcharts";
const DAILY_STOCK_SNAPSHOTS=POSAPI.dailyStockSnapshot()
const STOCK_MOVEMENTS=POSAPI.stockMovements()


const ProductProps = defineProps({
   productDetails: { type: Object, default: () => ({}) },
  title: { type: String, default: "Existing Product Details" },
  input_name_label:{ type: String, default: "Tax Rate Name" },
  cancelText: { type: String, default: "Close Form" },
  confirmText: { type: String, default: "Edit Form" },
  loading: { type: Boolean, default: false },
  showSelect: { type: Boolean, default: false }
 
})
const isLoading = ref(false)
const xaxisCategorys=ref([])
const xaxisSeries=ref({
    name: 'Sales',
    data: []
})
const metricName=ref('Closing Stock')
const sortBySnapshot=ref('date')
const currentPageSnapshot=ref('date')
const currentSortPage=ref(1)
const sortDirection='asc'
const snapShotLimit=ref(30)
const today = new Date();
const from = subDays(new Date(), 29);
const hasMore=ref(true)
const activityLoading=ref(false)

const movementPage=ref(1)
const movementPageSize=ref(10)

//from.setDate(today.getDate() - 29); // 30-day window
const movementDateFrom = ref(from);
const movementDateTo = ref(today);

const snapshotDateFrom = ref(from);
const snapshotDateTo = ref(today);
const datePresetLabel=ref("Last 30 days")

const periodSales=ref(0)
const periodRevenue=ref(0)
const periodInventory=ref(0)
const periodReturns=ref(0)
const selectedColumn=ref('closing_stock')
const colorTheme=ref({
    primary: '#0d6efd', // Default blue
    gradientFrom: 'rgba(59,108,244,0.25)',
    gradientTo: 'rgba(59,108,244,0.02)'
})

//fetched data
const snapShotData=ref([])
const movementData=ref([])
const movementLogs=ref([])

const rand = (min, max) => `${Math.floor(Math.random() * (max - min) + min)}`



async function fetchMovementLogs(loadMore = false) {
   // if (isLoading.value || (!hasMore.value && loadMore)) return

    try {
        isLoading.value = true
        activityLoading.value=true
        const params = new URLSearchParams()
        params.set('sortBy', 'createdAt')
        params.set('order', 'asc')
        params.set('limit', movementPageSize.value)
        params.set('page', movementPage.value)
        params.set('productId', '')

        const response = await axios.get(STOCK_MOVEMENTS, { params })
        const newData = response.data || []

        // 🔹 transform once
        const formatted = newData.map(log => ({
            ...log,
            createdAt: formatDateTime(log.createdAt),
            date: formatDate(log.createdAt, 'DD MMM YYYY'),
            time: formatDate(log.createdAt, 'hh:mm A'),
            user: log.created_by?.fName || 'Unknown',
            message: `${log.movement_type} ${log.quantity} Items` || 'No message provided',
        }))

        if (loadMore) {
            // 🔥 append
            movementLogs.value = [...movementLogs.value, ...formatted]
        } else {
            // 🔄 fresh load
            movementLogs.value = formatted
        }

        // 🔹 detect end
        if (newData.length < movementPageSize.value) {
            hasMore.value = false
        } else {
            movementPage.value += 1
        }

    } catch (error) {
        console.error("Error fetching movement logs:", error)
    } finally {
        isLoading.value = false
        activityLoading.value=false
    }
}

function loadMore() {
    movementPage.value += 1
    fetchMovementLogs(true)
}

async function fetchAnalyticsData(){
    try {
        isLoading.value=true
        const paramsSnapshot=new URLSearchParams()
        paramsSnapshot.set('sortBy',sortBySnapshot.value)
        paramsSnapshot.set('order',sortDirection||'asc')
        paramsSnapshot.set('limit',snapShotLimit.value)
        paramsSnapshot.set('page',currentSortPage.value)
        paramsSnapshot.set('productId','')
        // paramsSnapshot.set('productId',productDetails.id)

        if (snapshotDateFrom.value) {
            //paramsSnapshot.set('startDate', snapshotDateFrom.value)
        }
        if (snapshotDateTo.value) {
            //paramsSnapshot.set('endDate', snapshotDateTo.value)
        }

       // paramsMovements.set('sortBy',sortByMovement.value)
        //paramsMovements.set('sortDirection',sortDirection)

        // Fetch daily stock snapshots and stock movements in parallel
       
        const snapshotsResponse=await axios.get(DAILY_STOCK_SNAPSHOTS,{ params: paramsSnapshot} )
        



        // Process the data to extract categories and series for the chart
        snapShotData.value = snapshotsResponse.data || []

        console.log("Raw API responses:",snapshotsResponse.data)

        // Assuming snapShotData.value has a date field and a stock level field
        xaxisCategorys.value = snapShotData.value.map(item => formatDate(item.date, 'DD MMM YYYY'))
        xaxisSeries.value.data = snapShotData.value.map(item => item[selectedColumn.value])
        //console.log("Fetched analytics data:", { snapShotData.value, movementData.value })

       
        periodSales.value = snapShotData.value.reduce((sum, item) => sum + item.total_sales, 0)
        periodRevenue.value = snapShotData.value.reduce((sum, item) => sum + item.revenue, 0)
        periodInventory.value = snapShotData.value.reduce((sum, item) => sum + item.closing_stock, 0)
        periodReturns.value = snapShotData.value.reduce((sum, item) => sum + item.customer_returns, 0)


        //metricName.value = 'Closing Stock'
    }catch(error){
        console.error("Error fetching analytics data:", error)
    }finally{
        isLoading.value=false
    }   
}

//calculating reoder percentage
function calculatePercent(stockLevel, reorderLevel) {
    if (reorderLevel === 0) return 100; // Avoid division by zero
    const percent = (stockLevel / reorderLevel) * 100;
    return Math.min(percent, 100); // Cap at 100%
}


onMounted(() => {
    fetchAnalyticsData()
    movementPage.value = 1
    hasMore.value = true
    fetchMovementLogs()
    setTimeout(async () => {  // Make this async
        isLoading.value = false
       // alert("we have started")
        
        // Wait for Vue to finish rendering the DOM
        await nextTick();
        
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        console.log('Found popovers:', popoverTriggerList.length);
        
        [...popoverTriggerList].map(el => new bootstrap.Popover(el));
    }, 1000)
})

watch(() => [snapshotDateFrom.value, snapshotDateTo.value, ProductProps.productDetails, snapshotDateFrom, snapshotDateTo], () => {
    //alert(snapshotDateFrom.value + " - " + snapshotDateTo.value)
    fetchAnalyticsData(),
     { deep: true }
})

watch(() => [selectedColumn.value], () => {
    if(selectedColumn.value==='customer_returns'){
        colorTheme.value={
            primary: '#dc3545', // Red for returns
            gradientFrom: '#f8d7da',
            gradientTo: '#f5c6cb'
        }
    }
    else{
        colorTheme.value={
            primary: '#0d6efd', // Default blue
            gradientFrom: 'rgba(59,108,244,0.25)',
            gradientTo: 'rgba(59,108,244,0.02)'
        }
    }

    xaxisSeries.value.data = snapShotData.value.map(item => item[selectedColumn.value]),

    //fetchAnalyticsData(),
     { deep: true }
})

watch([movementDateFrom, movementDateTo], () => {
    movementPage.value = 1
    hasMore.value = true
    movementLogs.value = []
    fetchMovementLogs()
})

watch(() => ProductProps.productDetails, () => {
    fetchAnalyticsData()
    movementPage.value = 1
    hasMore.value = true
    movementLogs.value = []
    fetchMovementLogs()
}, { deep: true })

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
