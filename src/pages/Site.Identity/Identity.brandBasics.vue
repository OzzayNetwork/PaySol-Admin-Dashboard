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
                <div v-else class="card identity-card min-h-80vh h-100" style="min-height: 80vh;">
                    <div class="card-header bg-dark-muted text-black">
                        <div class="btn-toolbar d-flex justify-content-between align-items-center w-100 pb-2"
                            role="toolbar">
                            <h4 class="card-title text-uppercase mb-0">
                                Company configurateion
                            </h4>

                            <div class="d-flex fw-bold text-uppercase text-muted d-none">
                                Active Permissions: <strong class="text-black"> 0/34</strong>
                            </div>


                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">

                            <!-- Company Name -->
                            <div class="col-12 mb-4">
                                <div class="form-group">
                                    <label for="companyName" class="text-black opacity-75">Company/Institution's
                                        Name (required)</label>
                                    <input type="text" class="form-control" id="companyName"
                                        placeholder="Enter company name">
                                </div>
                            </div>

                            <!-- Alias / Initials -->
                            <div class="col-12 col-md-4 mb-4">
                                <div class="form-group">
                                    <label for="companyAlias" class="text-black opacity-75">Alias /
                                        Initials</label>
                                    <input type="text" class="form-control" id="companyAlias"
                                        placeholder="Enter alias or initials">
                                </div>
                            </div>

                            <!-- Tag Line -->
                            <div class="col-12 col-md-8 mb-4">
                                <div class="form-group">
                                    <label for="companyTagline" class="text-black opacity-75">Tag Line</label>
                                    <input type="text" class="form-control" id="companyTagline"
                                        placeholder="Enter tag line">
                                </div>
                            </div>

                            <!-- Registration Number -->
                            <div class="col-12 col-md-6 mb-4">
                                <div class="form-group">
                                    <label for="registrationNumber" class="text-black opacity-75">Registration /
                                        Incorporation Number</label>
                                    <input type="text" class="form-control" id="registrationNumber"
                                        placeholder="Enter registration number">
                                </div>
                            </div>

                            <!-- KRA PIN -->
                            <div class="col-12 col-md-6 mb-4">
                                <div class="form-group">
                                    <label for="kraPin" class="text-black opacity-75">KRA PIN / Tax ID</label>
                                    <input type="text" class="form-control" id="kraPin" placeholder="Enter Tax ID">
                                </div>
                            </div>

                            <!-- Official Email -->
                            <div class="col-12 col-md-6 mb-4">
                                <div class="form-group">
                                    <label for="officialEmail" class="text-black opacity-75">Official Email</label>
                                    <input type="email" class="form-control" id="officialEmail"
                                        placeholder="Enter official email">
                                </div>
                            </div>

                            <!-- Official Phone -->
                            <div class="col-12 col-md-6 mb-4">
                                <div class="form-group">
                                    <label for="officialPhone" class="text-black opacity-75">Official Phone</label>
                                    <input type="text" class="form-control" id="officialPhone"
                                        placeholder="Enter official phone number">
                                </div>
                            </div>

                            <!-- Physical Address -->
                            <div class="col-12 mb-4">
                                <div class="form-group">
                                    <label for="physicalAddress" class="text-black opacity-75">Physical
                                        Address</label>
                                    <textarea class="form-control" id="physicalAddress" rows="2"
                                        placeholder="Enter physical address"></textarea>
                                </div>
                            </div>

                            <!-- Website -->
                            <div class="col-12 col-md-6 mb-4">
                                <div class="form-group">
                                    <label for="websiteUrl" class="text-black opacity-75">Website URL</label>
                                    <input type="url" class="form-control" id="websiteUrl"
                                        placeholder="https://example.com">
                                </div>
                            </div>

                            <!-- Industry -->
                            <div class="col-12 col-md-6 mb-4">
                                <div class="form-group">
                                    <label for="industry" class="text-black opacity-75">Industry / Sector</label>
                                    <select class="form-control" id="industry">
                                        <option value="">Select industry</option>
                                        <option>Finance</option>
                                        <option>Healthcare</option>
                                        <option>Education</option>
                                        <option>Hospitality</option>
                                        <option>Government</option>
                                        <option>Manufacturing</option>
                                        <option>Retail</option>
                                        <option>Transport & Logistics</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="card-footer bg-white border-top d-flex justify-content-end py-">
                        <div class="col-12">
                            <div class="d-flex justify-content-end gap-2">
                                    <button type="button"
                                    class="btn btn-outline-secondary btn-lg waves-effect">Cancel</button>
                                    <button type="button"
                                    class="btn btn-primary btn-lg waves-effect px-5">Save</button>
                                </div>
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