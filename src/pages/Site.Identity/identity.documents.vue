<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Document Templates</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/site-identity">Site Identity</router-link>
                            </li>
                            <li class="breadcrumb-item active">Document Templates</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loader -->
        <div class="row pb-4">
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
                            <h4 class="card-title text-uppercase mb-0">Select Document Template</h4>
                        </div>
                    </div>

                    <div class="card-body">
                        <!-- Template Selection Modal Style -->
                        <div class="template-selection-container">
                            <div class="mb-4">
                                <h5 class="text-dark">Invoice Template</h5>
                                <p class="text-muted">Choose how your invoices appear to clients.</p>
                            </div>

                            <!-- Invoice Templates Grid -->
                            <div class="row g-4 mb-5">
                                <div class="col-md-6 col-lg-3" v-for="template in invoiceTemplates" :key="template.id">
                                    <div class="template-card" :class="{ 'selected': selectedInvoice === template.id }"
                                        @click="selectInvoice(template.id)">
                                        <div class="template-preview">
                                            <img :src="template.image" :alt="template.name + ' Template'" 
                                                class="template-image">
                                            <div class="selected-check" v-if="selectedInvoice === template.id">
                                                <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
                                                    <circle cx="10" cy="10" r="10" fill="#2164f3" />
                                                    <path d="M6 10l3 3 5-6" stroke="white" stroke-width="2"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="template-info">
                                            <h6 class="template-name">{{ template.name }}</h6>
                                            <p class="template-description">{{ template.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr class="my-5 bg-light">

                            <!-- Statement Templates -->
                            <div class="mb-4">
                                <h5 class="text-dark">Statement Template</h5>
                                <p class="text-muted">Choose how your statements appear to clients.</p>
                            </div>

                            <div class="row g-4">
                                <div class="col-md-6 col-lg-3" v-for="template in statementTemplates"
                                    :key="template.id">
                                    <div class="template-card"
                                        :class="{ 'selected': selectedStatement === template.id }"
                                        @click="selectStatement(template.id)">
                                        <div class="template-preview">
                                            <img :src="template.image" :alt="template.name + ' Template'" 
                                                class="template-image">
                                            <div class="selected-check" v-if="selectedStatement === template.id">
                                                <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
                                                    <circle cx="10" cy="10" r="10" fill="#2164f3" />
                                                    <path d="M6 10l3 3 5-6" stroke="white" stroke-width="2"
                                                        stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="template-info">
                                            <h6 class="template-name">{{ template.name }}</h6>
                                            <p class="template-description">{{ template.description }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-footer bg-white border-top d-flex justify-content-between align-items-center py-3">
                        <a href="#" class="text-decoration-none text-muted">Need help?</a>
                        <div class="d-flex gap-2">
                            <button type="button" class="btn btn-outline-secondary btn-lg waves-effect px-4">
                                Cancel
                            </button>
                            <button type="button" class="btn btn-primary btn-lg waves-effect "
                                style="background-color: #2164f3; border-color: #2164f3;"
                                @click="saveChanges">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import SiteIdentityNavigation from '@/pages/Site.Identity/Identity.navigation.vue'

const isLoading = ref(true)
const selectedInvoice = ref('modern')
const selectedStatement = ref('classic')

const invoiceTemplates = ref([
    {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional invoice layout.',
        image: '/assets/images/templates/invoice-classic.png'
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Clean and contemporary.',
        image: '/assets/images/templates/invoice-modern.png'
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Simple and straightforward.',
        image: '/assets/images/templates/invoice-minimal.png'
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Formal business style.',
        image: '/assets/images/templates/invoice-professional.png'
    }
])

const statementTemplates = ref([
    {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional statement.',
        image: '/assets/images/templates/statement-classic.png'
    },
    {
        id: 'detailed',
        name: 'Detailed',
        description: 'Comprehensive layout.',
        image: '/assets/images/templates/statement-detailed.png'
    },
    {
        id: 'compact',
        name: 'Compact',
        description: 'Space-efficient design.',
        image: '/assets/images/templates/statement-compact.png'
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Premium business format.',
        image: '/assets/images/templates/statement-executive.png'
    }
])

const selectInvoice = (templateId) => {
    selectedInvoice.value = templateId
}

const selectStatement = (templateId) => {
    selectedStatement.value = templateId
}

const saveChanges = () => {
    console.log('Selected Invoice Template:', selectedInvoice.value)
    console.log('Selected Statement Template:', selectedStatement.value)
    // Add your save logic here
    alert('Templates saved successfully!')
}

onMounted(() => {
    setTimeout(() => (isLoading.value = false), 1000)
})
</script>

<style lang="scss" scoped>
.template-selection-container {
    padding: 1.5rem 0;
}

.template-card {
    cursor: pointer;
    transition: all 0.2s ease;
    border: 2px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    background: white;
    height: 100%;

    &:hover {
        border-color: #c4b5fd;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);
    }

    &.selected {
        border-color: #2164f3;
        box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
    }
}

.template-preview {
    position: relative;
    background: #f9fafb;
    padding: 1.5rem;
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.template-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    max-height: 200px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.selected-check {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: white;
    border-radius: 50%;
    padding: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
}

.template-info {
    padding: 1rem;
    background: white;
}

.template-name {
    font-size: 1rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.25rem;
}

.template-description {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0;
}

.min-h-80vh {
    min-height: 80vh;
}
</style>