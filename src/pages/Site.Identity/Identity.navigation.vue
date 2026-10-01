<template>
    <div class="card shadow-sm min-h-80vh h-100">

        <!-- Header (hidden on small screens) -->
        <div class="card-header bg-white border-bottom kev-nav-two-header py-3 d-none d-md-block ">
            <h4 class="card-title fs-5 fw-semibold mb-0">🌐 Site Identity</h4>
            <small class="text-muted">Manage branding, documents, formats, and communications for your site</small>
        </div>

        <div class="card-body kev-nav-two p-0">
            <div class="nav flex-column nav-pills" id="identity-nav" role="tablist">

                <!-- Overview -->
                <RouterLink to="/site-identity" class="nav-link d-flex align-items-center gap-3 py-3"
                    active-class="active" data-bs-toggle="tooltip" data-bs-placement="right"
                    title="General overview of all identity settings">
                    <i class="mdi mdi-information-outline fs-4"></i>
                    <span class="d-none d-md-inline">Overview</span>
                </RouterLink>


                <!-- Brand Basics -->
                <RouterLink to="/site-identity/Brand-basics" class="nav-link d-flex align-items-center gap-3  py-3"
                    active-class="active" data-bs-toggle="tooltip" data-bs-placement="right"
                    title="Manage brand name, colors, logos, and contact details">
                    <i class="mdi mdi-palette fs-4 "></i>
                    <span class="d-none d-md-inline">Brand Basics</span>
                </RouterLink>

                <RouterLink
                to="/site-identity/logo-assets"
                class="nav-link d-flex align-items-center gap-3 py-3"
                active-class="active"
                title="Upload and manage official logos for all use cases"
                >
                <i class="mdi mdi-image-multiple fs-4"></i>
                <span class="d-none d-md-inline">Logo Assets</span>
                </RouterLink>


                <!-- Document Identity -->
                <RouterLink to="/site-identity/document-identity" class="nav-link d-flex align-items-center gap-3  py-3"
                    active-class="active" data-bs-toggle="tooltip" data-bs-placement="right"
                    title="Customize letterheads, invoices, receipts, and document layouts">
                    <i class="mdi mdi-file-document-edit-outline fs-4 "></i>
                    <span class="d-none d-md-inline">Document Identity</span>
                </RouterLink>

                <!-- Localization -->
                <RouterLink to="/site-identity/localization" class="nav-link d-flex align-items-center gap-3  py-3"
                    active-class="active" data-bs-toggle="tooltip" data-bs-placement="right"
                    title="Set currency, language, date, time, and regional formats">
                    <i class="mdi mdi-earth fs-4 "></i>
                    <span class="d-none d-md-inline">Localization & Formats</span>
                </RouterLink>

                <!-- Communication Identity -->
                <RouterLink to="/site-identity/communication" class="nav-link d-flex align-items-center gap-3  py-3"
                    active-class="active" data-bs-toggle="tooltip" data-bs-placement="right"
                    title="Brand your emails, SMS templates, and system notifications">
                    <i class="mdi mdi-bullhorn fs-4 "></i>
                    <span class="d-none d-md-inline">Communication Identity</span>
                </RouterLink>

            </div>
        </div>

        <!-- Footer alert (hidden on small screens) -->
        <div class="card-footer bg-light border-top p-3 d-none d-md-block">
            <div class="alert alert-info mb-0 d-flex align-items-center" role="alert">
                <i class="mdi mdi-lightbulb-on-outline fs-5 me-2"></i>
                <div>
                    Any changes here will affect how your site looks and communicates.
                    Preview changes before publishing.
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
const isLoading = ref(true)

// 🕓 Simulate page loading
onMounted(() => {
    // document.title = 'Upload to Gallery - CSPL CRM'
    setTimeout(() => (isLoading.value = false), 1000)


})

</script>

<style lang="scss" scoped></style>