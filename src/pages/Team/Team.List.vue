<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">System Users</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item active">Team</li>
                            <li class="breadcrumb-item active">System Users</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- Page Loader -->
        <div class="d-none" v-if="isLoading">
            <LoaderVue />
        </div>

        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <!-- Toolbar -->
                    <div class="card-body border-bottom">
                        <div class="row">
                            <div class="col-12 gap-3 d-flex">
                                <!-- Search -->
                                <div class="flex-grow-1">
                                    <div class="search-box mb-0 me-0">
                                        <div class="position-relative">
                                            <form @submit.prevent="handleSearchInput()"
                                                class="input-group bg-light rounded mb04 pb-0 flex-nowrap">
                                                <div class="flex-grow-1">
                                                    <input style="border-radius: 0px; padding-right: 35px;" type="text"
                                                        class="form-control bg-light rounded flex-grow-1"
                                                        placeholder="Search by name, email, phone..." spellcheck="false"
                                                        v-model="searchQuery" @input="handleSearchInput">
                                                    <i class="bx bx-search-alt search-icon fs-4"></i>
                                                    <i v-if="searchQuery != ''" title="Clear search"
                                                        style="right: 60px; left:unset;"
                                                        class="mdi mdi-close search-icon cursor-pointer fs-3 waves-effect"
                                                        @click="searchQuery = ''; handleSearchInput();">
                                                    </i>
                                                </div>
                                                <button type="submit" @click="handleSearchInput()"
                                                    title="Click to search"
                                                    class="btn btn-primary px-4 d-md-flex d-none align-items-center fw-bold"
                                                    id="button-addon2">
                                                    <i class="bx bx-search-alt search-icon fs-4"></i>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <!-- Add admin -->
                                <div class="position-relative d-flex contact-links d-lg-flex d-none gap-3">
                                    <router-link to="/team/invite"
                                        class="btn btn-primary d-lg-flex flex-nowrap d-flex align-items-center justify-content-center fw-bold gap-2 flex-nowrap text-white">
                                        <i class="dripicons-plus fs-4 d-flex"></i>
                                        <span>Add a System User</span>
                                    </router-link>
                                </div>

                                <!-- Role filter -->
                                <div class="position-relative d-flex d-lg-flex d-none">
                                    <button
                                        class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="mdi mdi-filter-variant fs-4 align-middle"></i>
                                        <span class="d-md-inline-block d-none">
                                            {{ roleFilterLabel }}
                                        </span>
                                        <i class="mdi mdi-chevron-down fs-4"></i>
                                    </button>
                                    <div class="dropdown-menu p-2" style="min-width: 200px;">
                                        <a href="javascript:void(0);" class="dropdown-item d-flex align-items-center"
                                            :class="{ 'active': roleFilter === '' }" @click="setRoleFilter('')">
                                            <i class="mdi mdi-account-multiple me-2 fs-5"></i> All roles
                                        </a>
                                        <a v-for="r in adminRoles" :key="r.name" href="javascript:void(0);"
                                            class="dropdown-item d-flex align-items-center"
                                            :class="{ 'active': roleFilter === r.name }" @click="setRoleFilter(r.name)">
                                            <i class="mdi mdi-account me-2 fs-5"></i> {{ r.display_name }}
                                        </a>
                                    </div>
                                </div>

                                <!-- Status filter -->
                                <div class="position-relative d-flex d-lg-flex d-none">
                                    <button
                                        class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="mdi mdi-toggle-switch-outline fs-4 align-middle"></i>
                                        <span class="d-md-inline-block d-none">{{ statusFilterLabel }}</span>
                                        <i class="mdi mdi-chevron-down fs-4"></i>
                                    </button>
                                    <div class="dropdown-menu p-2" style="min-width: 160px;">
                                        <a href="javascript:void(0);" class="dropdown-item"
                                            :class="{ 'active': statusFilter === '' }" @click="setStatusFilter('')">All</a>
                                        <a href="javascript:void(0);" class="dropdown-item"
                                            :class="{ 'active': statusFilter === 'active' }" @click="setStatusFilter('active')">Active</a>
                                        <a href="javascript:void(0);" class="dropdown-item"
                                            :class="{ 'active': statusFilter === 'inactive' }" @click="setStatusFilter('inactive')">Inactive</a>
                                    </div>
                                </div>

                                <!-- Columns toggle -->
                                <div class="position-relative d-flex d-lg-flex d-none">
                                    <button title="Edit columns to view on the table"
                                        class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="mdi mdi-format-columns fs-4 align-middle"></i>
                                        <span class="d-md-inline-block d-none">Columns</span>
                                        <i class="mdi mdi-chevron-down fs-4"></i>
                                    </button>
                                    <div class="dropdown-menu p-3" style="min-width: 220px;">
                                        <div v-for="column in allColumns" :key="column.key" class="form-check mb-3">
                                            <input class="form-check-input" type="checkbox" :id="`col-${column.key}`"
                                                v-model="column.visible" />
                                            <label class="form-check-label" :for="`col-${column.key}`">
                                                {{ column.label }}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Table area -->
                    <div class="card-body p-0" style="min-height: 65vh;">
                        <!-- Empty state -->
                        <div class="p-4 d-flex align-items-center justify-content-center h-100 w-100"
                            v-if="!loadingTable && admins.length === 0 && !isLoading">
                            <div class="text-center p-4 w-100 h-100">
                                <div class="empty-state-icon mb-0">
                                    <i style="font-size: 145px;" class="bx bxs-user-detail text-black opacity-25"></i>
                                </div>
                                <h4 class="fw-bold text-dark mb-3 text-capitalize">It's empty in here</h4>
                                <p v-if="searchQuery != '' || roleFilter || statusFilter" class="text-muted">
                                    We couldn't find any admins matching your search or filters.
                                </p>
                                <p v-else class="text-muted">No admins yet, add some to get started.</p>
                            </div>
                        </div>

                        <!-- Table -->
                        <div v-else class="table-responsive">
                            <table class="table verticle-middle table-hover mb-0 doc-table table-striped">
                                <thead class="table-light text-nowrap">
                                    <tr>
                                        <th>
                                            <span>User</span>
                                        </th>

                                        <th v-if="col('role')" class="text-center">
                                            <span>Role</span>
                                        </th>

                                        <th v-if="col('jobTitle')">
                                            <span>Job Title</span>
                                        </th>

                                        <th v-if="col('contact')">
                                            <span>Contact</span>
                                        </th>

                                        <th v-if="col('status')" class="text-center">
                                            <span>Status</span>
                                        </th>

                                        <th v-if="col('deactivationReason')" class="text-center">
                                            <span>Deactivation Reason</span>
                                        </th>

                                        <th v-if="col('createdAt')">
                                            <span>Created</span>
                                        </th>

                                        <th v-if="col('lastSeen')">
                                            <span>Last Seen</span>
                                        </th>

                                        <th></th>
                                    </tr>
                                </thead>

                                <!-- Rows -->
                                <tbody v-if="!loadingTable">
                                    <tr v-for="admin in admins" :key="admin.id">
                                        <!-- User (photo + name + email) -->
                                        <td>
                                            <div class="d-flex gap-2 align-items-center" :title="admin.full_name">
                                                <div class="avatar-xs d-flex">
                                                    <img v-if="admin.profile_photo_url" :src="admin.profile_photo_url"
                                                        class="rounded-circle avatar-xs" />
                                                    <div v-else
                                                        class="avatar-xs rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center">
                                                        <span class="text-uppercase fw-bold">
                                                            {{ initials(admin) }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span class="d-block fw-bold truncate-singleLine">
                                                        {{ admin.full_name }}
                                                    </span>
                                                    <span style="font-size: 12px;" class="text-muted text-nowrap fw-bold">
                                                        {{ admin.email || '-' }}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <!-- Role -->
                                        <td v-if="col('role')" class="text-nowrap text-center">
                                            <span class="text-uppercase badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">
                                                <i class="mdi-record mdi"></i> {{ roleName(admin) }}
                                            </span>
                                        </td>

                                        <!-- Job Title -->
                                        <td v-if="col('jobTitle')" :title="admin.job_title">
                                            {{ admin.job_title || '-' }}
                                        </td>

                                        <!-- Contact -->
                                        <td v-if="col('contact')" class="text-nowrap">
                                            <span class="d-block">{{ admin.phone || '-' }}</span>
                                        </td>

                                        <!-- Status — toggle -->
                                        <td v-if="col('status')" class="text-center">
                                            <div v-if="currentAdmin.id != admin.id" class="d-flex flex-column align-items-center justify-content-center"
                                                :title="admin.is_active ? 'Active — click to deactivate' : 'Inactive — click to activate'">
                                                <div class="form-check form-switch form-switch-md mb-0" dir="ltr">
                                                    <input class="form-check-input" type="checkbox"
                                                        :id="'statusSwitch' + admin.id"
                                                        :checked="admin.is_active"
                                                        :disabled="togglingId === admin.id"
                                                        @change="onToggleStatus(admin, $event)" />
                                                    <label class="form-check-label" :for="'statusSwitch' + admin.id"></label>
                                                </div>
                                                <small :class="admin.is_active ? 'text-success' : 'text-muted'">
                                                    {{ admin.is_active ? 'Active' : 'Inactive' }}
                                                </small>
                                            </div>
                                            <div v-else class="text-center" title="Deactivation of own account is not permitted">
                                                <span class="text-muted"><i>Prohibited</i></span>
                                            </div>
                                        </td>

                                        <!-- Deactivation reason -->
                                        <td v-if="col('deactivationReason')" class="text-center">
                                            <span>{{ admin.deactivation_reason || '-' }}</span>
                                        </td>

                                        <!-- Created -->
                                        <td v-if="col('createdAt')" :title="admin.created_at ? formatDateTime(admin.created_at) : ''">
                                            <span class="d-block">{{ admin.created_at ? smartDate(admin.created_at) : '-' }}</span>
                                        </td>

                                        <!-- Last seen -->
                                        <td v-if="col('lastSeen')" :title="admin.last_seen_at ? formatDateTime(admin.last_seen_at) : ''">
                                            <span class="d-block">{{ admin.last_seen_at ? smartDate(admin.last_seen_at) : '-' }}</span>
                                        </td>

                                        <!-- Actions -->
                                        <td>
                                            <ul class="list-inline font-size-20 mb-0">
                                                <li class="list-inline-item px-2 dropdown d-flex justify-content-center align-items-center">
                                                    <a href="javascript:void(0);" title="more actions"
                                                        class="text-decoration-none text-black waves-effect px-2 rounded"
                                                        data-bs-toggle="dropdown">
                                                        <i class="bx bx-dots-horizontal-rounded"></i>
                                                    </a>
                                                    <ul class="dropdown-menu p-2" data-bs-auto-close="true">
                                                        <li>
                                                            <router-link class="dropdown-item d-flex py-2"
                                                                :to="`/team/${admin.id}`">
                                                                <i class="bx bxs-info-circle me-2 fs-4"></i>
                                                                <span>View details</span>
                                                            </router-link>
                                                        </li>
                                                        <li v-if="admin.status === 'invited'">
                                                            <a class="dropdown-item d-flex py-2" href="javascript:void(0);"
                                                                @click="resendVerification(admin)">
                                                                <i class="mdi mdi-message-reply-text me-2 fs-4"></i>
                                                                <span>Resend verification</span>
                                                            </a>
                                                        </li>
                                                        <li v-if="admin.is_active && currentAdmin.id != admin.id">
                                                            <a class="dropdown-item d-flex py-2 text-danger" href="javascript:void(0);"
                                                                @click="openDeactivate(admin)">
                                                                <i class="bx bxs-user-x me-2 fs-4"></i>
                                                                <span>Deactivate</span>
                                                            </a>
                                                        </li>
                                                        <li v-if="!admin.is_active">
                                                            <a class="dropdown-item d-flex py-2" href="javascript:void(0);"
                                                                @click="reactivate(admin)">
                                                                <i class="bx bxs-user-check me-2 fs-4"></i>
                                                                <span>Reactivate</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>

                                <!-- Skeleton -->
                                <tbody v-if="loadingTable || isLoading">
                                    <tr v-for="(_, i) in skeletonRows" :key="i">
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <SkeletonLoader width="36px" height="36px" />
                                                <div class="d-flex flex-column gap-1 ms-2">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(90, 140)" class="mx-2" />
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(70, 110)" class="mx-2" />
                                                </div>
                                            </div>
                                        </td>
                                        <td v-if="col('role')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(50, 80)" class="mx-2" /></td>
                                        <td v-if="col('jobTitle')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(60, 100)" class="mx-2" /></td>
                                        <td v-if="col('contact')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(80, 120)" class="mx-2" /></td>
                                        <td v-if="col('status')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(40, 60)" class="mx-2" /></td>
                                        <td v-if="col('deactivationReason')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(60, 90)" class="mx-2" /></td>
                                        <td v-if="col('createdAt')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(60, 90)" class="mx-2" /></td>
                                        <td v-if="col('lastSeen')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(60, 90)" class="mx-2" /></td>
                                        <td><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(15, 30)" class="mx-2" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <!-- Footer / load more -->
                        <div class="w-100 d-flex align-items-center justify-center text-center d-flex p-3">
                            <div class="w-100">
                                <p v-if="!hasMore && admins.length > 0" class="text-muted mb-0 small">
                                    <i class="bx bx-check-circle text-success me-1"></i>
                                    Showing all {{ totalAdmins }} admins
                                </p>
                            </div>
                            <button v-if="hasMore" class="btn btn-primary" @click="loadMore()">Load more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Deactivation modal (reason only — no OTP for admins) -->
    <DeactivateAdminModal ref="deactivateModal" :admin="selectedAdmin" @deactivated="onAdminDeactivated"
        @close="selectedAdmin = null" @toast="(t, m) => showToast('success', t, m)" @error="(t, m) => showError(t, m)" />

    <ImageToast :status="toastStatus" :title="toastTitle" :message="toastMessage" :image="toastImage"
        :imageHeight="70" @hide="toastStatus = null" />
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'

// API
import AdminsAPI from '@/api/admins'
import AuthAPI from '@/api/auth'

// Components
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'
import ImageToast from '@/components/ImageToast.vue'
import LoaderVue from '@/layouts/Loader.vue'
import DeactivateAdminModal from './DeactivateAdminModal.vue'

// Utils
import { formatDateTime, smartDate } from '@/utils/dates'
import successImage from '../../assets/images/icons/check.png'
import errorImage from '../../assets/images/icons/error.png'

// Page state
const isLoading = ref(true)
const loadingTable = ref(false)

// Data
const admins = ref([])
const adminRoles = ref([])

// Deactivation modal
const deactivateModal = ref(null)
const selectedAdmin = ref(null)
const togglingId = ref(null)   // which row's toggle is mid-request
const currentAdmin = ref({})   // the logged-in admin (own row cannot be deactivated)

// Search / filter
const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')

// Pagination
const currentPage = ref(1)
const lastPage = ref(1)
const totalAdmins = ref(0)
const perPage = ref(25)
const hasMore = ref(false)
const isFetchingMore = ref(false)

// Toggleable columns
const allColumns = ref([
    { key: 'role', label: 'Role', visible: true },
    { key: 'jobTitle', label: 'Job Title', visible: true },
    { key: 'contact', label: 'Contact', visible: true },
    { key: 'status', label: 'Status', visible: true },
    { key: 'createdAt', label: 'Created', visible: true },
    { key: 'lastSeen', label: 'Last Seen', visible: true },
    { key: 'deactivationReason', label: 'Deactivation Reason', visible: false },
])
const col = (key) => allColumns.value.find(c => c.key === key)?.visible

// Skeleton
const skeletonRows = Array.from({ length: 10 })
const rand = (min, max) => `${Math.floor(Math.random() * (max - min) + min)}px`

// Toast
const toastStatus = ref(null)
const toastTitle = ref('')
const toastMessage = ref('')
const toastImage = ref(null)

// ---- Filter labels ----
const roleFilterLabel = computed(() => {
    if (!roleFilter.value) return 'All roles'
    return adminRoles.value.find(r => r.name === roleFilter.value)?.display_name || 'Role'
})
const statusFilterLabel = computed(() => {
    if (statusFilter.value === 'active') return 'Active'
    if (statusFilter.value === 'inactive') return 'Inactive'
    return 'Status'
})

// ---- Helpers ----
function initials(admin) {
    const f = admin.first_name?.charAt(0) || ''
    const l = admin.last_name?.charAt(0) || ''
    return (f + l) || 'U'
}
function roleName(admin) {
    return admin.role?.display_name || admin.role?.name || '-'
}

// ---- Fetch roles (for filter + label lookup) ----
async function getAdminRoles() {
    try {
        const { data } = await AdminsAPI.roles()
        adminRoles.value = data.data || []
    } catch (error) {
        console.error('Error fetching roles:', error)
    }
}

// ---- Fetch the current admin (disables the toggle on their own row) ----
async function getCurrentAdmin() {
    try {
        const { data } = await AuthAPI.me()
        currentAdmin.value = data.data || data.user || {}
    } catch (error) {
        console.error('Error fetching current admin:', error)
    }
}

// ---- Fetch admins ----
async function getAdmins(loadMore = false) {
    if (loadMore) isFetchingMore.value = true
    else loadingTable.value = true

    try {
        const params = {
            page: currentPage.value,
            per_page: perPage.value,
        }
        if (searchQuery.value.trim()) params.search = searchQuery.value.trim()
        if (roleFilter.value) params.role = roleFilter.value
        if (statusFilter.value) params.status = statusFilter.value

        const { data } = await AdminsAPI.list(params)

        const rows = data.data || []

        if (currentPage.value === 1) {
            admins.value = rows
        } else {
            admins.value.push(...rows)
        }

        const meta = data.meta || {}
        currentPage.value = meta.current_page || currentPage.value
        lastPage.value = meta.last_page || 1
        totalAdmins.value = meta.total ?? admins.value.length
        hasMore.value = currentPage.value < lastPage.value
    } catch (error) {
        console.error('Error fetching admins:', error)
        if (currentPage.value === 1) admins.value = []
        showError('Failed to Load Admins', error.response?.data?.message || 'Please try again.')
    } finally {
        loadingTable.value = false
        isFetchingMore.value = false
    }
}

function loadMore() {
    if (!hasMore.value || isFetchingMore.value) return
    currentPage.value++
    getAdmins(true)
}

// ---- Search (debounced) ----
let searchTimeout = null
function handleSearchInput() {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        currentPage.value = 1
        getAdmins()
    }, 500)
}

// ---- Filters ----
function setRoleFilter(name) {
    roleFilter.value = name
    currentPage.value = 1
    getAdmins()
}
function setStatusFilter(status) {
    statusFilter.value = status
    currentPage.value = 1
    getAdmins()
}

// ---- Status toggle ----
// Activating is instant. Deactivating opens the reason modal; the toggle is
// reverted in the UI until the modal confirms.
async function onToggleStatus(admin, event) {
    const wantsActive = event.target.checked

    if (wantsActive) {
        // Reactivate — instant
        togglingId.value = admin.id
        try {
            await AdminsAPI.reactivate(admin.id)
            admin.is_active = true
            admin.status = 'active'
            admin.deactivated_at = null
            admin.deactivation_reason = null
            showToast('success', 'Admin Activated', `${admin.full_name} is now active.`)
        } catch (error) {
            event.target.checked = false     // revert
            showError('Activation Failed', error.response?.data?.message || 'Could not activate the admin.')
        } finally {
            togglingId.value = null
        }
    } else {
        // Deactivate — revert the visual toggle, open the modal
        event.target.checked = true          // keep showing active until confirmed
        selectedAdmin.value = admin
        deactivateModal.value?.open()
    }
}

function openDeactivate(admin) {
    selectedAdmin.value = admin
    deactivateModal.value?.open()
}

// Modal events
function onAdminDeactivated({ admin, reason }) {
    const idx = admins.value.findIndex(a => a.id === admin.id)
    if (idx !== -1) {
        admins.value[idx].is_active = false
        admins.value[idx].status = 'deactivated'
        admins.value[idx].deactivated_at = new Date().toISOString()
        admins.value[idx].deactivation_reason = reason
    }
    selectedAdmin.value = null
}

// ---- Reactivate from the actions menu ----
async function reactivate(admin) {
    try {
        await AdminsAPI.reactivate(admin.id)
        admin.is_active = true
        admin.status = 'active'
        admin.deactivated_at = null
        admin.deactivation_reason = null
        showToast('success', 'Admin Activated', `${admin.full_name} is now active.`)
    } catch (error) {
        showError('Activation Failed', error.response?.data?.message || 'Could not activate the admin.')
    }
}

// ---- Resend verification ----
async function resendVerification(admin) {
    try {
        await AdminsAPI.resendVerification(admin.id, { channel: 'email' })
        showToast('success', 'Verification Resent', `A new verification code was sent to ${admin.email}.`)
    } catch (error) {
        showError('Resend Failed', error.response?.data?.message || 'Could not resend verification.')
    }
}

// ---- Toast helpers ----
function showToast(status, title, message) {
    toastStatus.value = status
    toastTitle.value = title
    toastMessage.value = message
    toastImage.value = status === 'success' ? successImage : null
}
function showError(title, message) {
    toastStatus.value = 'error'
    toastTitle.value = title
    toastMessage.value = message
    toastImage.value = errorImage
}

// ---- Infinite scroll (window-based) ----
const bottomOffset = 180
let rafId = null
const isNearBottom = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const fullHeight = document.documentElement.scrollHeight
    return scrollTop + viewportHeight >= fullHeight - bottomOffset
}
const onScrollInfinite = () => {
    if (rafId) return
    rafId = requestAnimationFrame(async () => {
        rafId = null
        if (!hasMore.value) return
        if (isNearBottom()) await loadMore()
    })
}

// ---- Lifecycle ----
onMounted(async () => {
    window.addEventListener('scroll', onScrollInfinite, { passive: true })
    await getAdminRoles()
    await getCurrentAdmin()
    await getAdmins()
    setTimeout(() => (isLoading.value = false), 400)
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScrollInfinite)
    if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
th {
    display: table-cell !important;
}
</style>