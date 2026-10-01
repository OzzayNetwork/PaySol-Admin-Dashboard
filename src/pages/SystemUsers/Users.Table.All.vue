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
                            <li class="breadcrumb-item">
                                <router-link to="/users/list">User Management</router-link>
                            </li>
                            <li class="breadcrumb-item active">Users</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- 🔄 Page Loader -->
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
                                                        placeholder="Search by name, email, phone, ID..." spellcheck="false"
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

                                <!-- Add User -->
                                <div class="position-relative d-flex contact-links d-lg-flex d-none gap-3">
                                    <router-link to="/users/register"
                                        class="btn btn-primary d-lg-flex flex-nowrap d-flex align-items-center justify-content-center fw-bold gap-2 flex-nowrap text-white">
                                        <i class="dripicons-plus fs-4 d-flex"></i>
                                        <span>Add User</span>
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
                                        <a v-for="r in userRoles" :key="r.id" href="javascript:void(0);"
                                            class="dropdown-item d-flex align-items-center"
                                            :class="{ 'active': roleFilter === r.name }" @click="setRoleFilter(r.name)">
                                            <i class="mdi mdi-account me-2 fs-5"></i> {{ r.label }}
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
                            v-if="!loadingTable && users.length === 0 && !isLoading">
                            <div class="text-center p-4 w-100 h-100">
                                <div class="empty-state-icon mb-0">
                                    <i style="font-size: 145px;" class="bx bxs-user-detail text-black opacity-25"></i>
                                </div>
                                <h4 class="fw-bold text-dark mb-3 text-capitalize">It's empty in here</h4>
                                <p v-if="searchQuery != '' || roleFilter || statusFilter" class="text-muted">
                                    We couldn't find any users matching your search or filters.
                                </p>
                                <p v-else class="text-muted">No users yet, add some to get started.</p>
                            </div>
                        </div>

                        <!-- Table -->
                        <div v-else class="table-responsive">
                            <table class="table verticle-middle table-hover mb-0 doc-table table-striped">
                                <thead class="table-light text-nowrap">
                                    <tr>
                                        <th title="sort by name" class="waves-effect"
                                            @click="toggleSortOrder('first_name', 'asc')">
                                            <div class="cursor-pointer align-items-center gap-1 d-flex">
                                                <i v-if="sortBy === 'first_name'"
                                                    :class="['mdi', sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 'text me-1']"></i>
                                                <span>User</span>
                                            </div>
                                        </th>

                                        <th v-if="col('role')" class="waves-effect text-center">
                                            <span>Role</span>
                                        </th>

                                        <th v-if="col('contact')">
                                            <span>Contact</span>
                                        </th>

                                        <th v-if="col('designation')">
                                            <span>Designation</span>
                                        </th>

                                        <th v-if="col('station')">
                                            <span>Polling Station</span>
                                        </th>

                                        <th v-if="col('verification')" class="text-center">
                                            <span>Verification</span>
                                        </th>

                                        <th v-if="col('status')" class="text-center">
                                            <span>Status</span>
                                        </th>
                                         <th v-if="col('deactivationReason')" class="text-center">
                                            <span>Deactivation Reason</span>
                                        </th>

                                        <th v-if="col('createdAt')" class="waves-effect"
                                            @click="toggleSortOrder('created_at', 'desc')">
                                            <div class="cursor-pointer align-items-center gap-1 d-flex">
                                                <i v-if="sortBy === 'created_at'"
                                                    :class="['mdi', sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 'text me-1']"></i>
                                                <span>Created</span>
                                            </div>
                                        </th>

                                        <th v-if="col('lastSeen')" class="waves-effect"
                                            @click="toggleSortOrder('last_seen_at', 'desc')">
                                            <div class="cursor-pointer align-items-center gap-1 d-flex">
                                                <i v-if="sortBy === 'last_seen_at'"
                                                    :class="['mdi', sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 'text me-1']"></i>
                                                <span>Last Seen</span>
                                            </div>
                                        </th>

                                        <th></th>
                                    </tr>
                                </thead>

                                <!-- Rows -->
                                <tbody v-if="!loadingTable">
                                    <tr v-for="user in users" :key="user.id">
                                        <!-- User (photo + name + email) -->
                                        <td>
                                            <div class="d-flex gap-2 align-items-center" :title="user.full_name">
                                                <div class="avatar-xs d-flex">
                                                    <img v-if="user.profile_photo_url" :src="user.profile_photo_url"
                                                        class="rounded-circle avatar-xs" />
                                                    <div v-else
                                                        class="avatar-xs rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center">
                                                        <span class="text-uppercase fw-bold">
                                                            {{ initials(user) }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <span class="d-block fw-bold truncate-singleLine">
                                                        {{ user.full_name || (user.first_name + ' ' + user.last_name) }}
                                                    </span>
                                                    <span style="font-size: 12px;" class="text-muted text-nowrap fw-bold">
                                                        Nat ID No. {{ user.national_id || '-' }}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <!-- Role -->
                                        <td v-if="col('role')" class="text-nowrap text-center">
                                            <span class="text-uppercase badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">
                                                <i class="mdi-record mdi"></i> {{ roleLabel(user.role) }}
                                            </span>
                                        </td>

                                        <!-- Contact -->
                                        <td v-if="col('contact')" class="text-nowrap">
                                            <span class="d-block">{{ user.phone || '-' }}</span>
                                            <span style="font-size: 12px;" class="text-muted">{{ user.email || '-' }}</span>
                                        </td>

                                        <!-- Designation -->
                                        <td v-if="col('designation')" :title="user.designation">
                                            {{ user.designation || '-' }}
                                        </td>

                                        <!-- Polling station -->
                                        <td v-if="col('station')" class="text-nowrap">
                                            <template v-if="user.polling_station">
                                                <span class="d-block fw-semibold">
                                                    {{ user.polling_station.name }}
                                                    <span class="text-muted">· Stream {{ user.polling_station.stream_number }}</span>
                                                </span>
                                                <span style="font-size: 12px;" class="text-muted">
                                                    {{ user.polling_station.code }}
                                                </span>
                                            </template>
                                            <span v-else class="text-muted">-</span>
                                        </td>

                                        <!-- Verification -->
                                        <td v-if="col('verification')" class="text-center">
                                            <!-- Fully verified -->
                                            <div v-if="user.verification?.fully_verified"
                                                class="text-uppercase badge-alt2 bg-gray-200 text-dark bg-success-soft w-auto d-flex align-items-center justify-content-center gap-1">
                                                <span class="mdi mdi-check-circle fs-5"></span>
                                                <span>Verified</span>
                                            </div>

                                            <!-- One channel verified -->
                                            <span v-else-if="user.verification?.email_verified || user.verification?.phone_verified"
                                                class="text-uppercase badge-alt2 bg-gray-200 text-dark bg-warning-soft w-auto d-flex align-items-center justify-content-center gap-1">
                                                <span class="mdi mdi-clock-alert-outline fs-5"></span>
                                                <span>Partial</span>
                                            </span>

                                            <!-- Nothing verified yet -->
                                            <span v-else
                                                class="text-uppercase badge-alt2 bg-gray-200 text-dark bg-secondary-soft w-auto d-flex align-items-center justify-content-center gap-1">
                                                <span class="mdi mdi-clock-outline fs-5 text-muted"></span>
                                                <span class="text-muted">Pending</span>
                                            </span>
                                        </td>

                                        <!-- Status — toggle -->
                                        <td v-if="col('status')" class="text-center">
                                            <div v-if="currentAdmin.id!=user.id" class="d-flex flex-column align-items-center justify-content-center"
                                                :title="user.is_active ? 'Active — click to deactivate' : 'Inactive — click to activate'">
                                                <div class="form-check form-switch form-switch-md mb-0" dir="ltr">
                                                    <input class="form-check-input" type="checkbox"
                                                        :id="'statusSwitch' + user.id"
                                                        :checked="user.is_active"
                                                        :disabled="togglingId === user.id"
                                                        @change="onToggleStatus(user, $event)" />
                                                    <label class="form-check-label" :for="'statusSwitch' + user.id"></label>
                                                </div>
                                                <small :class="user.is_active ? 'text-success' : 'text-muted'">
                                                    {{ user.is_active ? 'Active' : 'Inactive' }}
                                                </small>
                                            </div>
                                            <div v-else class="text-center" title="Deactivation of own account is not permitted">
                                                <span class="text-muted"><i>Prohibited</i></span>
                                            </div>
                                        </td>

                                        <!-- deatcivation reason -->
                                        <td v-if="col('deactivationReason')" class="text-center">
                                            <span>{{ user.deactivation?.reason || '-' }}</span>
                                        </td>

                                        <!-- Created -->
                                        <td v-if="col('createdAt')"
                                            :title="user.audit?.created_at ? formatDateTime(user.audit.created_at) : ''">
                                            <span class="d-block">{{ user.audit?.created_at ? smartDate(user.audit.created_at) : '-' }}</span>
                                            <span v-if="user.audit?.created_by" style="font-size: 12px;" class="text-muted">
                                                by {{ user.audit.created_by.name }}
                                            </span>
                                        </td>

                                        <!-- last seen -->
                                        <td v-if="col('lastSeen')"
                                            :title="user.last_seen_at ? formatDateTime(user.last_seen_at) : ''">
                                            <span class="d-block">{{ user.last_seen_at ? smartDate(user.last_seen_at) : '-' }}</span>
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
                                                                :to="`/users/${user.id}`">
                                                                <i class="bx bxs-info-circle me-2 fs-4"></i>
                                                                <span>View details</span>
                                                            </router-link>
                                                        </li>
                                                        <li>
                                                            <router-link class="dropdown-item d-flex py-2"
                                                                :to="`/users/${user.id}/edit`">
                                                                <i class="bx bxs-pencil me-2 fs-4"></i>
                                                                <span>Edit user</span>
                                                            </router-link>
                                                        </li>
                                                        <li v-if="!user.verification?.fully_verified">
                                                            <a class="dropdown-item d-flex py-2" href="javascript:void(0);"
                                                                @click="resendOtp(user)">
                                                                <i class="mdi mdi-message-reply-text me-2 fs-4"></i>
                                                                <span>Resend OTP</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                </tbody>

                                <!-- Skeleton -->
                                <tbody v-if="loadingTable||isLoading">
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
                                        <td v-if="col('contact')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(80, 120)" class="mx-2" /></td>
                                        <td v-if="col('designation')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(60, 100)" class="mx-2" /></td>
                                        <td v-if="col('station')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(80, 130)" class="mx-2" /></td>
                                        <td v-if="col('verification')"><SkeletonLoader type="text" :lines="1" height="10px" :width="rand(50, 70)" class="mx-2" /></td>
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
                                <p v-if="!hasMore && users.length > 0" class="text-muted mb-0 small">
                                    <i class="bx bx-check-circle text-success me-1"></i>
                                    Showing all {{ totalUsers }} users
                                </p>
                            </div>
                            <button v-if="hasMore" class="btn btn-primary" @click="loadMore()">Load more</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Deactivation modal (morphing reason → OTP) -->
    <DeactivateUserModal ref="deactivateModal" :user="selectedUser" :reasons="deactivationReasons"
        :roles="userRoles" :admin="currentAdmin" @deactivated="onUserDeactivated" @close="onModalClose"
        @toast="(t, m) => showToast('success', t, m)" @error="(t, m) => showError(t, m)" />

    <ImageToast :status="toastStatus" :title="toastTitle" :message="toastMessage" :image="toastImage"
        :imageHeight="70" @hide="toastStatus = null" />
</template>

<script setup>
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue'

// API
import UsersAPI from '@/api/users'
import AuthAPI from '@/api/auth'

// Components
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'
import ImageToast from '@/components/ImageToast.vue'
import LoaderVue from '@/layouts/Loader.vue'
import DeactivateUserModal from './DeactivateUserModal.vue'

// Utils
import { formatDateTime, smartDate } from '@/utils/dates'
import successImage from '../../assets/images/icons/check.png'
import errorImage from '../../assets/images/icons/error.png'

// Page state
const isLoading = ref(true)
const loadingTable = ref(false)

// Data
const users = ref([])
const userRoles = ref([])
const deactivationReasons = ref([])

// Deactivation modal
const deactivateModal = ref(null)
const selectedUser = ref(null)
const togglingId = ref(null)   // which row's toggle is mid-request
const currentAdmin = ref(null) // the logged-in admin (OTP destination)

// Search / filter / sort
const searchQuery = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
const sortBy = ref('created_at')
const sortOrder = ref('desc')

// Pagination
const currentPage = ref(1)
const lastPage = ref(1)
const totalUsers = ref(0)
const perPage = ref(20)
const hasMore = ref(false)
const isFetchingMore = ref(false)

// Toggleable columns
const allColumns = ref([
    { key: 'role', label: 'Role', visible: true },
    { key: 'contact', label: 'Contact', visible: true },
    { key: 'designation', label: 'Designation', visible: false },
    { key: 'station', label: 'Polling Station', visible: true },
    { key: 'verification', label: 'Verification', visible: true },
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
    return userRoles.value.find(r => r.name === roleFilter.value)?.label || 'Role'
})
const statusFilterLabel = computed(() => {
    if (statusFilter.value === 'active') return 'Active'
    if (statusFilter.value === 'inactive') return 'Inactive'
    return 'Status'
})

// ---- Helpers ----
function initials(user) {
    const f = user.first_name?.charAt(0) || ''
    const l = user.last_name?.charAt(0) || ''
    return (f + l) || 'U'
}
function roleLabel(roleName) {
    if (!roleName) return '-'
    const r = userRoles.value.find(x => x.name === roleName)
    return r?.label || roleName.replace(/_/g, ' ')
}

// ---- Fetch roles (for filter + label lookup) ----
async function getUserRoles() {
    try {
        const { data } = await UsersAPI.roles(true)
        userRoles.value = data.data || []
    } catch (error) {
        console.error('Error fetching roles:', error)
    }
}

// ---- Fetch the current admin (OTP destination shown in the modal) ----
async function getCurrentAdmin() {
    try {
        const { data } = await AuthAPI.me()
        currentAdmin.value = data.data || data.user || null
    } catch (error) {
        console.error('Error fetching current admin:', error)
    }
}

// ---- Fetch deactivation reasons (for the modal dropdown) ----
async function getDeactivationReasons() {
    try {
        const { data } = await UsersAPI.deactivationReasons()
        deactivationReasons.value = data.data || []
    } catch (error) {
        console.error('Error fetching deactivation reasons:', error)
    }
}

// ---- Fetch users ----
async function getUsers(loadMore = false) {
    if (loadMore) isFetchingMore.value = true
    else loadingTable.value = true

    try {
        const params = {  
            page: currentPage.value,
            sort_by: sortBy.value,
            sort_order: sortOrder.value,
            per_page: perPage.value,}
        if (searchQuery.value.trim()) params.search = searchQuery.value.trim()
        if (roleFilter.value) params.role = roleFilter.value
        if (statusFilter.value === 'active') params.is_active = true
        else if (statusFilter.value === 'inactive') params.is_active = false

        const { data } = await UsersAPI.list(params)

        const rows = data.data || []

        if (currentPage.value === 1) {
            users.value = rows
        } else {
            users.value.push(...rows)
        }
        console.log('Fetched users:', rows)

        const meta = data.meta || {}
        currentPage.value = meta.current_page || currentPage.value
        lastPage.value = meta.last_page || 1
        totalUsers.value = meta.total ?? users.value.length
        hasMore.value = currentPage.value < lastPage.value
    } catch (error) {
        console.error('Error fetching users:', error)
        if (currentPage.value === 1) users.value = []
        showError('Failed to Load Users', error.response?.data?.message || 'Please try again.')
    } finally {
        loadingTable.value = false
        isFetchingMore.value = false
    }
}

function loadMore() {
    if (!hasMore.value || isFetchingMore.value) return
    currentPage.value++
    getUsers(true)
}

// ---- Search (debounced) ----
let searchTimeout = null
function handleSearchInput() {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        currentPage.value = 1
        getUsers()
    }, 500)
}

// ---- Filters ----
function setRoleFilter(name) {
    roleFilter.value = name
    currentPage.value = 1
    getUsers()
}
function setStatusFilter(status) {
    statusFilter.value = status
    currentPage.value = 1
    getUsers()
}

// ---- Sort ----
function toggleSortOrder(field, defaultOrder = 'desc') {
    if (sortBy.value !== field) {
        sortBy.value = field
        sortOrder.value = defaultOrder
    } else {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    }
    currentPage.value = 1
    getUsers()
}

// ---- Status toggle ----
// Activating is instant. Deactivating opens the reason+OTP modal; the toggle
// is reverted in the UI until the modal confirms (since deactivation needs OTP).
async function onToggleStatus(user, event) {
    const wantsActive = event.target.checked

    if (wantsActive) {
        // Reactivate — instant, no OTP
        togglingId.value = user.id
        try {
            const { data } = await UsersAPI.reactivate(user.id)
            Object.assign(user, data.data)   // sync from server
            showToast('success', 'User Activated', `${user.full_name} is now active.`)
        } catch (error) {
            event.target.checked = false     // revert
            showError('Activation Failed', error.response?.data?.message || 'Could not activate the user.')
        } finally {
            togglingId.value = null
        }
    } else {
        // Deactivate — revert the visual toggle, open the modal (real change happens on OTP confirm)
        event.target.checked = true          // keep showing active until confirmed
        selectedUser.value = user
        deactivateModal.value?.open()
    }
}

// Modal events
function onUserDeactivated(updatedUser) {
    const idx = users.value.findIndex(u => u.id === updatedUser.id)
    if (idx !== -1) Object.assign(users.value[idx], updatedUser)
    selectedUser.value = null
}
function onModalClose() {
    selectedUser.value = null
    // toggles re-render from user.is_active (unchanged), so they snap back correctly
}

// ---- Resend OTP ----
async function resendOtp(user) {
    try {
        await UsersAPI.resendOtp(user.id, 'email')
        showToast('success', 'OTP Resent', `A new OTP was sent to ${user.email}.`)
    } catch (error) {
        showError('Resend Failed', error.response?.data?.message || 'Could not resend OTP.')
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
    await getUserRoles()
    await getCurrentAdmin()
    await getDeactivationReasons()
    await getUsers()
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