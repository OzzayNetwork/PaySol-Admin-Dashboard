<template>
    <div class="container-fluid">

        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Logo Identity</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/site-identity">Site Identity</router-link>
                            </li>
                            <li class="breadcrumb-item active">
                                Logo Identity
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="row pb-4">

            <!-- Side Navigation -->
            <div class="col-3 col-md-4 col-lg-3">
                <SiteIdentityNavigation />
            </div>

            <!-- Main Area -->
            <div class="col-9 col-md-8 col-lg-9 flex-grow-1">

                <!-- Loader -->
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

                <!-- Logo Identity Card -->
                <div v-else class="card identity-card h-100">

                    <div class="card-header bg-dark-muted text-black">
                        <div class="btn-toolbar d-flex justify-content-between align-items-center w-100 pb-2"
                            role="toolbar">
                            <h4 class="card-title text-uppercase mb-0">Logo Assets & Usage</h4>
                        </div>
                    </div>

                    <!-- Body -->
                    <div class="card-body identity-body">
                        <!-- Full Logo Section -->
                        <div class="row">
                            <h5 class="section-title mb-3">
                                Full Logo (Complete Wordmark)
                            </h5>

                            <!-- Primary Logo -->
                            <div class="col-12 col-lg-4 mb-5">
                                <label class="d-flex align-items-center gap-2">
                                    <span>Primary Logo</span>
                                    <button type="button"
                                        class="btn btn-light position-relative p-0 avatar-xs rounded-circle"
                                        data-bs-toggle="modal" data-bs-target="#helpModal">
                                        <span class="avatar-title bg-transparent text-reset">
                                            <i class="bx bx-question-mark"></i>
                                        </span>
                                    </button>

                                </label>
                                <div class="logo-cont-identity rounded">
                                    <div class="p-3 bg-light w-100 d-flex align-items-center justify-content-center">
                                        <img :src="primaryLogo" alt="Primary Logo" class="img">
                                        <ImageUploader class="d-none" inputId="primary-logo-upload"
                                            @image-selected="handlePrimaryLogo" :aspect-ratio="selectedRatio" />
                                    </div>
                                    <div class="d-flex w-100">
                                        <label for="primary-logo-upload"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark m-0">
                                            <i class="bx bx-image-add font-size-16 align-middle me-2"></i>
                                            Change
                                        </label>
                                        <button type="button"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark"
                                            @click="removePrimaryLogo">
                                            <i class="bx bx-trash font-size-16 align-middle me-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <small class="upload-hint">
                                    <i class="mdi mdi-information-outline me-1"></i>
                                    Full horizontal logo with text. Used on main headers, dashboards, and marketing
                                    materials
                                </small>
                            </div>

                            <!-- Light / Inverse Full Logo -->
                            <div class="col-12 col-lg-4 mb-5">
                                <label class="d-flex align-items-center gap-2">
                                    <span>Light / Inverse Full Logo</span>
                                    <button type="button"
                                        class="btn btn-light position-relative p-0 avatar-xs rounded-circle"
                                        data-bs-toggle="modal" data-bs-target="#helpModal">
                                        <span class="avatar-title bg-transparent text-reset">
                                            <i class="bx bx-question-mark"></i>
                                        </span>
                                    </button>
                                </label>
                                <div class="logo-cont-identity rounded">
                                    <div class="p-3 bg-dark w-100 d-flex align-items-center justify-content-center">
                                        <img :src="inverseLogo" alt="Inverse Logo" class="img">
                                        <ImageUploader class="d-none" inputId="inverse-logo-upload"
                                            @image-selected="handleInverseLogo" :aspect-ratio="selectedRatio" />
                                    </div>
                                    <div class="d-flex w-100">
                                        <label for="inverse-logo-upload"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark m-0">
                                            <i class="bx bx-image-add font-size-16 align-middle me-2"></i>
                                            Change
                                        </label>
                                        <button type="button"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark"
                                            @click="removeInverseLogo">
                                            <i class="bx bx-trash font-size-16 align-middle me-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <small class="upload-hint">
                                    <i class="mdi mdi-information-outline me-1"></i>
                                    Full logo for dark backgrounds, headers, and night mode
                                </small>
                            </div>

                            <!-- Monochrome Full Logo -->
                            <div class="col-12 col-lg-4 mb-5">
                                <label class="d-flex align-items-center gap-2">
                                    <span>Monochrome Full Logo</span>
                                    <button type="button"
                                        class="btn btn-light position-relative p-0 avatar-xs rounded-circle"
                                        data-bs-toggle="modal" data-bs-target="#helpModal">
                                        <span class="avatar-title bg-transparent text-reset">
                                            <i class="bx bx-question-mark"></i>
                                        </span>
                                    </button>
                                </label>
                                <div class="logo-cont-identity rounded">
                                    <div class="p-3 bg-light w-100 d-flex align-items-center justify-content-center">
                                        <img :src="monochromeLogo" alt="Monochrome Logo" class="img">
                                        <ImageUploader class="d-none" inputId="monochrome-logo-upload"
                                            @image-selected="handleMonochromeLogo" :aspect-ratio="selectedRatio" />
                                    </div>
                                    <div class="d-flex w-100">
                                        <label for="monochrome-logo-upload"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark m-0">
                                            <i class="bx bx-image-add font-size-16 align-middle me-2"></i>
                                            Change
                                        </label>
                                        <button type="button"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark"
                                            @click="removeMonochromeLogo">
                                            <i class="bx bx-trash font-size-16 align-middle me-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <small class="upload-hint">
                                    <i class="mdi mdi-information-outline me-1"></i>
                                    Single-color version for receipts, stamps, and document watermarks
                                </small>
                            </div>
                        </div>

                        <!-- Logo Mark Section -->
                        <div class="row mt-4">
                            <h5 class="section-title mb-3">
                                Logo Mark (Icon/Symbol Only)
                            </h5>

                            <!-- Primary Logo Mark -->
                            <div class="col-12 col-lg-4 mb-5">
                                <label class="d-flex align-items-center gap-2">
                                    <span>Primary Logo Mark</span>
                                    <button type="button"
                                        class="btn btn-light position-relative p-0 avatar-xs rounded-circle"
                                        data-bs-toggle="modal" data-bs-target="#helpModal">
                                        <span class="avatar-title bg-transparent text-reset">
                                            <i class="bx bx-question-mark"></i>
                                        </span>
                                    </button>
                                </label>
                                <div class="logo-cont-identity rounded">
                                    <div class="p-3 bg-light w-100 d-flex align-items-center justify-content-center"
                                        style="min-height: 200px;">
                                        <img :src="primaryMark" alt="Primary Mark" class="img" style="">
                                        <ImageUploader class="d-none" inputId="primary-mark-upload"
                                            @image-selected="handlePrimaryMark" :aspect-ratio="1" />
                                    </div>
                                    <div class="d-flex w-100">
                                        <label for="primary-mark-upload"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark m-0">
                                            <i class="bx bx-image-add font-size-16 align-middle me-2"></i>
                                            Change
                                        </label>
                                        <button type="button"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark"
                                            @click="removePrimaryMark">
                                            <i class="bx bx-trash font-size-16 align-middle me-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <small class="upload-hint">
                                    <i class="mdi mdi-information-outline me-1"></i>
                                    Icon-only version for compact spaces, mobile apps, and social media
                                </small>
                            </div>

                            <!-- Light / Inverse Mark -->
                            <div class="col-12 col-lg-4 mb-5">
                                <label class="d-flex align-items-center gap-2">
                                    <span class="">Light / Inverse Mark</span>
                                    <button type="button"
                                        class="btn btn-light position-relative p-0 avatar-xs rounded-circle"
                                        data-bs-toggle="modal" data-bs-target="#helpModal">
                                        <span class="avatar-title bg-transparent text-reset">
                                            <i class="bx bx-question-mark"></i>
                                        </span>
                                    </button>
                                </label>
                                <div class="logo-cont-identity rounded">
                                    <div class="p-3 bg-dark w-100 d-flex align-items-center justify-content-center"
                                        style="min-height: 200px;">
                                        <img :src="inverseMark" alt="Inverse Mark" class="img" style="">
                                        <ImageUploader class="d-none" inputId="inverse-mark-upload"
                                            @image-selected="handleInverseMark" :aspect-ratio="1" />
                                    </div>
                                    <div class="d-flex w-100">
                                        <label for="inverse-mark-upload"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark m-0">
                                            <i class="bx bx-image-add font-size-16 align-middle me-2"></i>
                                            Change
                                        </label>
                                        <button type="button"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark"
                                            @click="removeInverseMark">
                                            <i class="bx bx-trash font-size-16 align-middle me-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <small class="upload-hint">
                                    <i class="mdi mdi-information-outline me-1"></i>
                                    Logo mark for dark UI elements and collapsed sidebars
                                </small>
                            </div>

                            <!-- Favicon -->
                            <div class="col-12 col-lg-4 mb-5">
                                <label class="d-flex align-items-center gap-2">
                                    <span>Favicon</span>
                                    <button type="button"
                                        class="btn btn-light position-relative p-0 avatar-xs rounded-circle"
                                        data-bs-toggle="modal" data-bs-target="#helpModal">
                                        <span class="avatar-title bg-transparent text-reset">
                                            <i class="bx bx-question-mark"></i>
                                        </span>
                                    </button>
                                </label>
                                <div class="logo-cont-identity rounded">
                                    <div class="p-3 bg-light w-100 d-flex align-items-center justify-content-center"
                                        style="min-height: 200px;">
                                        <img :src="favicon" alt="Favicon" class="img" style="">
                                        <ImageUploader class="d-none" inputId="favicon-upload"
                                            @image-selected="handleFavicon" :aspect-ratio="1" />
                                    </div>
                                    <div class="d-flex w-100">
                                        <label for="favicon-upload"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark m-0">
                                            <i class="bx bx-image-add font-size-16 align-middle me-2"></i>
                                            Change
                                        </label>
                                        <button type="button"
                                            class="btn btn-light waves-effect flex-grow-1 btn-lg btn-outline-light border-radius-0 text-dark"
                                            @click="removeFavicon">
                                            <i class="bx bx-trash font-size-16 align-middle me-2"></i>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                                <small class="upload-hint">
                                    <i class="mdi mdi-information-outline me-1"></i>
                                    Browser tab icon (32×32px or 64×64px, PNG/ICO/SVG)
                                </small>
                            </div>
                        </div>

                        <!-- Usage Rules -->
                        <div class="section-block mb-5">
                            <h5 class="section-title">
                                <i class="mdi mdi-cog-outline me-2 d-none"></i>
                                Default Usage Rules
                            </h5>

                            <div class="row g-4">

                                <div class="col-12 col-md-6">
                                    <div class="config-card">
                                        <label class="config-label">
                                            Default Logo for Documents
                                        </label>
                                        <select class="form-select config-select">
                                            <option value="">Select logo variant</option>
                                            <option>Primary Full Logo</option>
                                            <option>Monochrome Full Logo</option>
                                            <option>Primary Logo Mark</option>
                                        </select>
                                        <small class="config-hint">
                                            Used on invoices, receipts, and official documents
                                        </small>
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="config-card">
                                        <label class="config-label">
                                            Default Logo for Dark Backgrounds
                                        </label>
                                        <select class="form-select config-select">
                                            <option value="">Select logo variant</option>
                                            <option>Light / Inverse Full Logo</option>
                                            <option>Light / Inverse Mark</option>
                                            <option>Primary Full Logo</option>
                                        </select>
                                        <small class="config-hint">
                                            Applied automatically on dark UI surfaces and night mode
                                        </small>
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="config-card">
                                        <label class="config-label">
                                            Sidebar Logo (Collapsed State)
                                        </label>
                                        <select class="form-select config-select">
                                            <option value="">Select logo variant</option>
                                            <option>Primary Logo Mark</option>
                                            <option>Light / Inverse Mark</option>
                                            <option>Favicon</option>
                                        </select>
                                        <small class="config-hint">
                                            Displayed when navigation sidebar is minimized
                                        </small>
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="config-card">
                                        <label class="config-label">
                                            Mobile App Icon
                                        </label>
                                        <select class="form-select config-select">
                                            <option value="">Select logo variant</option>
                                            <option>Primary Logo Mark</option>
                                            <option>Favicon</option>
                                        </select>
                                        <small class="config-hint">
                                            Used as PWA icon and mobile home screen shortcut
                                        </small>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <!-- Best Practices -->
                        <div class="alert alert-info info-banner">
                            <div class="d-flex align-items-start">
                                <i class="mdi mdi-lightbulb-outline me-3 fs-4"></i>
                                <div>
                                    <h6 class="mb-2">Logo Best Practices</h6>
                                    <ul class="mb-0 ps-3">
                                        <li><strong>Full Logo:</strong> Use PNG or SVG, minimum 200×60px, transparent
                                            background</li>
                                        <li><strong>Logo Mark:</strong> Square format (1:1 ratio), minimum 128×128px for
                                            clarity</li>
                                        <li><strong>Favicon:</strong> 32×32px or 64×64px, simple design that's
                                            recognizable at small sizes</li>
                                        <li><strong>File Formats:</strong> PNG for raster, SVG for scalability, ICO for
                                            legacy browser support</li>
                                        <li><strong>Color Modes:</strong> Provide both light and dark variants for
                                            optimal visibility</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                    <!-- Footer -->
                    <div class="card-footer bg-white border-top d-flex justify-content-between py-3">
                        <div class="d-flex gap-2 justify-content-between align-items-center w-100">
                            <small class="text-muted">
                                <i class="mdi mdi-information-outline me-1"></i>
                                Changes will be reflected across all system interfaces
                            </small>
                            <div class="d-flex gap-2">
                                <button type="button"
                                    class="btn btn-outline-secondary btn-lg waves-effect">Cancel</button>
                                <button type="button" class="btn btn-primary btn-lg waves-effect px-5">Save</button>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>

        <!-- Usage Examples Modal -->

        <div class="modal fade" id="helpModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h5 class="modal-title d-none">Primary Logo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body text-center">
                        <div>
                            <h5 class="text-black">Primary Logo</h5>
                            <p> Full horizontal logo with text. Used on main headers, dashboards, and marketing
                                materials</p>
                        </div>
                        <div class="bg-light p-3 rounded">
                            <div class="img">
                                <img src="../../assets/images/identity/primary-logo-screenshot.webp" alt=""
                                    class="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SiteIdentityNavigation from '@/pages/Site.Identity/Identity.navigation.vue'
import LogoPlaceHolder from "../../assets/images/identity/logo4.png"
import LogoDarkPlaceHolder from "../../assets/images/identity/logo-black.png"

import LogoWhitePlaceHolder from "../../assets/images/identity/logo-white.png"
import LogoMarkPlaceHolder from "../../assets/images/identity/logo-mark.png"
import LogoMarkPlaceHolderWhite from "../../assets/images/identity/logo-mark-white.png"
import LogoMarkPlaceHolderBlack from "../../assets/images/identity/logo-mark-black.png"
import FavIcon from "../../assets/images/identity/fav-icon-holder.png"


import ImageUploader from '@/components/ImageUploader.vue'

// Loading state
const isLoading = ref(true)

// Logo state variables
const primaryLogo = ref(LogoPlaceHolder)
const inverseLogo = ref(LogoWhitePlaceHolder)
const monochromeLogo = ref(LogoDarkPlaceHolder)
const primaryMark = ref(LogoMarkPlaceHolder)
const inverseMark = ref(LogoMarkPlaceHolderWhite)
const favicon = ref(FavIcon)

// Aspect ratios
const selectedRatio = ref(0) // Free aspect ratio for full logos

// Upload handlers
const handlePrimaryLogo = (newImageUrl) => (primaryLogo.value = newImageUrl)
const handleInverseLogo = (newImageUrl) => (inverseLogo.value = newImageUrl)
const handleMonochromeLogo = (newImageUrl) => (monochromeLogo.value = newImageUrl)
const handlePrimaryMark = (newImageUrl) => (primaryMark.value = newImageUrl)
const handleInverseMark = (newImageUrl) => (inverseMark.value = newImageUrl)
const handleFavicon = (newImageUrl) => (favicon.value = newImageUrl)

// Remove handlers
const removePrimaryLogo = () => (primaryLogo.value = LogoPlaceHolder)
const removeInverseLogo = () => (inverseLogo.value = LogoPlaceHolder)
const removeMonochromeLogo = () => (monochromeLogo.value = LogoPlaceHolder)
const removePrimaryMark = () => (primaryMark.value = LogoPlaceHolder)
const removeInverseMark = () => (inverseMark.value = LogoPlaceHolder)
const removeFavicon = () => (favicon.value = LogoPlaceHolder)

// Modal state
const activeModal = ref('fullLogo')

const modalTitle = computed(() => {
    if (activeModal.value === 'fullLogo') {
        return 'Full Logo Usage Examples'
    } else if (activeModal.value === 'logoMark') {
        return 'Logo Mark Usage Examples'
    }
    return ''
})

const showUsageModal = (type) => {
    activeModal.value = type
}

const closeModal = () => {
    activeModal.value = null
}

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 800)
})
</script>

<style>
.image-uploader {
    display: none;
}
</style>