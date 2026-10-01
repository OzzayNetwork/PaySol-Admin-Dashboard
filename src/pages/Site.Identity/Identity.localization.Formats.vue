<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Brand Basics</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/site-identity">Site Identity</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/site-identity/core-visuals">Brand Basics</router-link>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <!-- 🔄 Loader -->

        <div class="row  pb-4">
            <div class="col-sm-2 col-3 col-xs-2 col-md-4 col-lg-3">
                <SiteIdentityNavigation />
            </div>
            <div class="col-sm-10 col-xs-10 col-md-8 col-lg-9 col-9 flex-grow-1">
                <div v-if="isLoading">
                    <div class="card identity-card" style="min-height: 80vh;">
                        <div class="card-body">
                            <div class="d-flex justify-content-center align-items-center" style="height: 70vh;">
                                <div class="text-center">
                                    <div class="spinner-border text-black" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                    <div class="mt-3">
                                        <h5 class="text-black">Loading...</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div v-else class="card identity-card min-h-80vh h-100">
                    <div class="card-header bg-dark-muted text-black">
                        <div class="btn-toolbar d-flex justify-content-between align-items-center w-100 pb-2"
                            role="toolbar">
                            <h4 class="card-title text-uppercase mb-0">Localization & Formats</h4>
                            <div class="d-flex fw-bold text-uppercase text-muted d-none">
                                Active Permissions: <strong class="text-black">0/34</strong>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="row">

                            <!-- Localization & Formats -->
                            <div class="col-12 col-md-6 mb-4">
                                <label for="timezone" class="text-black opacity-75">Default Timezone</label>
                                <select class="form-control" id="timezone">
                                    <option value="">Select Timezone</option>
                                    <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                                    <option value="UTC">UTC</option>
                                    <option value="Europe/London">Europe/London (GMT)</option>
                                    <!-- Add more as needed -->
                                </select>
                            </div>

                            <div class="col-12 col-md-6 mb-4">
                                <label for="dateFormat" class="text-black opacity-75">Date Format</label>
                                <select class="form-control" id="dateFormat">
                                    <option value="">Select Date Format</option>
                                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-6 mb-4">
                                <label for="timeFormat" class="text-black opacity-75">Time Format</label>
                                <select class="form-control" id="timeFormat">
                                    <option value="">Select Time Format</option>
                                    <option value="24h">24-Hour</option>
                                    <option value="12h">12-Hour (AM/PM)</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-6 mb-4">
                                <label for="currency" class="text-black opacity-75">Currency Display</label>
                                <select class="form-control" id="currency">
                                    <option value="">Select Currency</option>
                                    <option value="KES">Kenyan Shilling (KES)</option>
                                    <option value="USD">US Dollar (USD)</option>
                                    <option value="EUR">Euro (EUR)</option>
                                </select>
                            </div>

                            <div class="col-12 col-md-6 mb-4">
                                <label for="numberFormat" class="text-black opacity-75">Number Format</label>
                                <select class="form-control" id="numberFormat">
                                    <option value="">Select Number Format</option>
                                    <option value="1,234.56">1,234.56 (comma thousands, dot decimal)</option>
                                    <option value="1.234,56">1.234,56 (dot thousands, comma decimal)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="card-footer bg-white border-top d-flex justify-content-end py-3">
                        <div class="d-flex gap-2">
                            <button type="button" class="btn btn-outline-secondary btn-lg waves-effect">Cancel</button>
                            <button type="button" class="btn btn-primary btn-lg waves-effect px-5">Save</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
// 🔧 Core Vue imports
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import LoaderVue from '@/layouts/Loader.vue'
import SiteIdentityNavigation from '@/pages/Site.Identity/Identity.navigation.vue'

const isLoading = ref(true)

// 🕓 Simulate page loading
onMounted(() => {
    // document.title = 'Upload to Gallery - CSPL CRM'
    setTimeout(() => (isLoading.value = false), 1000)


})

</script>

<style lang="scss" scoped></style>