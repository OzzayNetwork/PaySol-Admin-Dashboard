<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Site Identity Core Visuals</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/site-identity/core-visuals">Site Identity</router-link>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <!-- 🔄 Loader -->
        <div v-if="isLoading">
            <LoaderVue />
        </div>
        <div v-else class="row pb-4">
            <div class="col-sm-2 col-3 col-xs-2 col-md-4 col-lg-3">
                <SiteIdentityNavigation />
            </div>
            <div class="col-sm-10 col-xs-10 col-md-8 col-lg-9 col-auto flex-grow-1">
                <div class="card identity-card min-h-80vh h-100" style="min-height: 80vh;">
                    <div class="card-header bg-dark-muted">
                        <div class="btn-toolbar d-flex justify-content-between align-items-center w-100 pb-2"
                            role="toolbar">
                            <h4 class="card-title text-uppercase mb-0">
                                Identity Overview
                            </h4>

                            <div class="d-flex fw-bold text-uppercase text-muted d-none">
                                Active Permissions: <strong class="text-black"> 0/34</strong>
                            </div>


                        </div>
                    </div>
                    <div class="card-body">
                        <div class="p-4">

                            <h3 class="fw-bold mb-3">Welcome to Site Identity</h3>

                            <p class="text-muted mb-4">
                                This section shapes how your entire system looks, speaks, and behaves.
                                It brings together the visual elements, document styling, regional setups,
                                and communication voice that define your brand across every feature.
                            </p>

                            <div class="row g-3">

                                <!-- Brand Basics -->
                                <div class="col-md-6">
                                    <div class="card h-100 shadow-sm">
                                        <div class="card-body">
                                            <h5 class="fw-semibold">
                                                <i class="mdi mdi-palette text-primary me-2"></i>
                                                Brand Basics
                                            </h5>
                                            <p class="text-muted small mb-0">
                                                Define your brand name, colors, logos, tags, and contact details.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Document Identity -->
                                <div class="col-md-6">
                                    <div class="card h-100 shadow-sm">
                                        <div class="card-body">
                                            <h5 class="fw-semibold">
                                                <i class="mdi mdi-file-document-edit-outline text-primary me-2"></i>
                                                Document Identity
                                            </h5>
                                            <p class="text-muted small mb-0">
                                                Customize layout styles for letters, receipts, invoices, and official
                                                documents.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Localization -->
                                <div class="col-md-6">
                                    <div class="card h-100 shadow-sm">
                                        <div class="card-body">
                                            <h5 class="fw-semibold">
                                                <i class="mdi mdi-earth text-primary me-2"></i>
                                                Localization & Formats
                                            </h5>
                                            <p class="text-muted small mb-0">
                                                Configure system-wide currency, language, date formats, and time
                                                formats.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Communication Identity -->
                                <div class="col-md-6">
                                    <div class="card h-100 shadow-sm">
                                        <div class="card-body">
                                            <h5 class="fw-semibold">
                                                <i class="mdi mdi-bullhorn text-primary me-2"></i>
                                                Communication Identity
                                            </h5>
                                            <p class="text-muted small mb-0">
                                                Set the tone and structure for emails, SMS templates, and system
                                                notifications.
                                            </p>
                                        </div>
                                    </div>
                                </div>

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