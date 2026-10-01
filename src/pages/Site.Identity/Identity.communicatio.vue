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
                            <h4 class="card-title text-uppercase mb-0">Communication Identity</h4>
                            <small class="text-muted d-none">Manage social links, contact details, and email branding
                                used across your system.</small>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="row">

                            <!-- Website URL -->
                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">Official Website</label>
                                <input type="url" class="form-control" placeholder="https://www.example.com">
                            </div>

                            <!-- Phone Contact -->
                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">Primary Phone Number</label>
                                <input type="tel" class="form-control" placeholder="+254 712 345 678">
                            </div>

                            <!-- Support Email -->
                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">Support Email</label>
                                <input type="email" class="form-control" placeholder="support@example.com">
                            </div>

                            <!-- General Inquiry Email -->
                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">General Inquiry Email</label>
                                <input type="email" class="form-control" placeholder="info@example.com">
                            </div>

                            <!-- Postal Address -->
                            <div class="col-12 mb-4">
                                <label class="text-black opacity-75">Postal / Physical Address</label>
                                <textarea class="form-control" rows="2"
                                    placeholder="P.O Box 1234–00100, Nairobi, Kenya"></textarea>
                            </div>

                            <!-- Social Links Header -->
                            <div class="col-12">
                                <h6 class="text-uppercase fw-semibold mt-3 mb-2 opacity-75">Social Media Links</h6>
                            </div>

                            <!-- Social Links -->
                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">Facebook</label>
                                <input type="url" class="form-control" placeholder="https://facebook.com/yourpage">
                            </div>

                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">X (Twitter)</label>
                                <input type="url" class="form-control" placeholder="https://x.com/yourhandle">
                            </div>

                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">Instagram</label>
                                <input type="url" class="form-control" placeholder="https://instagram.com/yourhandle">
                            </div>

                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">LinkedIn</label>
                                <input type="url" class="form-control"
                                    placeholder="https://linkedin.com/company/yourcompany">
                            </div>

                            <!-- Email Sender Identity Header -->
                            <div class="col-12">
                                <h6 class="text-uppercase fw-semibold mt-4 mb-2 opacity-75">Email Sender Identity</h6>
                            </div>

                            <!-- Email Sender Name -->
                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">Sender Name</label>
                                <input type="text" class="form-control" placeholder="Your Company Name">
                            </div>

                            <!-- Email Sender Address -->
                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">Sender Email Address</label>
                                <input type="email" class="form-control" placeholder="no-reply@example.com">
                            </div>

                            <!-- Reply-to Email -->
                            <div class="col-12 col-md-6 mb-4">
                                <label class="text-black opacity-75">Reply-To Email</label>
                                <input type="email" class="form-control" placeholder="support@example.com">
                            </div>

                            <!-- Newsletter Templates Header -->
                            <div class="col-12">
                                <h6 class="text-uppercase fw-semibold mt-4 mb-2 opacity-75">Default Email & Newsletter
                                    Templates</h6>
                            </div>

                            <!-- Welcome Email -->
                            <div class="col-12 mb-4">
                                <label class="text-black opacity-75">Welcome Email Template</label>
                                <textarea class="form-control" rows="3"
                                    placeholder="Default welcome email content..."></textarea>
                            </div>

                            <!-- Password Reset Email -->
                            <div class="col-12 mb-4">
                                <label class="text-black opacity-75">Password Reset Email Template</label>
                                <textarea class="form-control" rows="3"
                                    placeholder="Default reset email content..."></textarea>
                            </div>

                            <!-- Newsletter Default Template -->
                            <div class="col-12 mb-4">
                                <label class="text-black opacity-75">Default Newsletter Template</label>
                                <textarea class="form-control" rows="4"
                                    placeholder="Default newsletter layout and text..."></textarea>
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