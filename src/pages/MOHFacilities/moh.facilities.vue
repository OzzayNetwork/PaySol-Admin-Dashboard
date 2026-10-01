<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <div>
                        <h4 class="mb-sm-0 font-size-18 pb-2">MOH Facilities</h4>
                        <div class="page-title-right">
                            <ol class="breadcrumb m-0">
                                <li class="breadcrumb-item">
                                    <router-link to="/">Dashboard</router-link>
                                </li>

                                <li class="breadcrumb-item">
                                    <router-link to="/users/list">
                                        Reference Data
                                    </router-link>
                                </li>

                                <li class="breadcrumb-item active fw-bold">
                                    MOH Facilities
                                </li>
                            </ol>
                        </div>
                    </div>

                    <div class="d-flex gap-3 align-items-center">
                        <DataViewToggle
                           v-model:activeView="activeView"
                            :show-stats="true" 
                            :show-table="true" 
                            :show-map="true"
                            :showCalendar="true"
                        
                        />
                       <ul class="nav nav-pills p-1  border-1 rounded mb-0 nav-pills-main d-none" role="tablist">
                            <li class="nav-item">
                                <a 
                                    :class="activeView==='stats'?'active':''"
                                    class="nav-link d-flex align-items-center gap-1" href="#" 
                                    @click.prevent="activeView = 'stats'"
                                >

                                     <Icon
                                        :icon="activeView === 'stats' ? 'bxs:bar-chart-alt-2' : 'bx:bar-chart-alt-2'"
                                        class="fs-3"
                                    />

                                    <div>
                                        <div>Stats View</div>
                                    </div>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a 
                                    :class="activeView==='table'?'active':''"
                                    class="nav-link d-flex align-items-center gap-1" 
                                    href="#" 
                                    @click.prevent="activeView = 'table'"
                                >

                                    <Icon
                                        :icon="activeView === 'table' ? 'boxicons:list-square-filled' : 'boxicons:list-square'"
                                        class="fs-3"
                                    />
                                    <div>
                                        <div>Table View</div>
                                    </div>
                                </a>
                            </li>

                            <li class="nav-item">
                                <a 
                                    :class="activeView==='map'?'active':''"
                                    class="nav-link d-flex align-items-center gap-1" 
                                    href="#" 
                                    @click.prevent="activeView = 'map'"
                                >
                                    <Icon
                                        :icon="activeView === 'map' ? 'bxs:map' : 'bx:map'"
                                        class="fs-3"
                                    />
                                    <div>
                                        <div>Map View</div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <div class="dropdown">
                            <button
                                class="btn btn-lg btn-primary btn-l d-flex align-items-center"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span>Actions</span>
                                <i class="mdi mdi-chevron-down ms-1"></i>
                            </button>

                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">

                                <!-- Filters -->
                                <a class="dropdown-item py-2" href="#">
                                    <div class="d-flex align-items-start align-items-center">
                                        <Icon icon="boxicons:filter" class="fs-3 me-3" />

                                        
                                        <div>
                                            <div>Filters &amp; Segments</div>
                                            <small class="text-muted">Refine and segment the facility list</small>
                                        </div>
                                    </div>
                                </a>

                                <!-- Export -->
                                <a class="dropdown-item py-2" href="#">
                                    <div class="d-flex align-items-start align-items-center">
                                        <Icon icon="bx:download" class="fs-3 me-3" />
                                        <div>
                                            <div>Download / Export</div>
                                            <small class="text-muted">Download the facility list for reporting</small>
                                        </div>
                                    </div>
                                </a>

                                <div class="dropdown-divider"></div>

                                <!-- Update -->
                                <a class="dropdown-item py-2" href="#">
                                    <div class="d-flex align-items-start align-items-center">
                                        <Icon icon="bx:refresh" class="fs-2 me-3" />
                                        <div>
                                            <div>Update Facility List</div>
                                            <small class="text-muted">Refresh the latest facility information</small>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div>
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

                    <!-- ========================= -->
                    <!-- Toolbar -->
                    <!-- ========================= -->
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
                                                        placeholder="Search facility name, MFL code, town..."
                                                        spellcheck="false" v-model="searchQuery"
                                                        @input="handleSearchInput" />

                                                    <i class="bx bx-search-alt search-icon fs-4"></i>

                                                    <i v-if="searchQuery !== ''" title="Clear search"
                                                        style="right: 60px; left: unset;"
                                                        class="mdi mdi-close search-icon cursor-pointer fs-3 waves-effect"
                                                        @click="clearSearch"></i>

                                                </div>

                                                <button type="submit" @click="handleSearchInput()"
                                                    title="Click to search"
                                                    class="btn btn-primary px-4 d-md-flex d-none align-items-center fw-bold">
                                                    <i class="bx bx-search-alt search-icon fs-4"></i>
                                                </button>
                                            </form>

                                        </div>
                                    </div>
                                </div>

                                <!-- MOH Filters -->
                                <MohFilterAside
                                    @filter-change="handleFacilityFilters"
                                    @clear-filters="clearFacilityFilters"
                                />

                                <!-- Ownership Filter -->
                                <div class="position-relative d-flex d-lg-flex d-none">

                                    <button
                                        class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="mdi mdi-domain fs-4 align-middle"></i>

                                        <span class="d-md-inline-block d-none">
                                            {{ ownershipFilterLabel }}
                                        </span>

                                        <i class="mdi mdi-chevron-down fs-4"></i>
                                    </button>

                                    <div class="dropdown-menu p-2" style="min-width: 230px;">

                                        <!-- All -->
                                        <a href="javascript:void(0);" class="dropdown-item d-flex align-items-center px-2"
                                            :class="{ active: ownershipFilter === '' }" @click="setOwnershipFilter('')">
                                            <i class="mdi mdi-domain me-2 fs-5"></i>
                                            <label style="font-size: 13px;" class="form-check-label">All ownership types</label>
                                        </a>

                                        <!-- Ownership types -->
                                        <a v-for="owner in ownershipTypes" :key="owner.value" href="javascript:void(0);"
                                            class="dropdown-item d-flex align-items-center px-2" :class="{
                                                active: ownershipFilter === owner.value
                                            }" @click="setOwnershipFilter(owner.value)">
                                            <i :class="[
                                                'mdi ',
                                                owner.icon,
                                                'me-2',
                                                'fs-5'
                                            ]"></i>

                                            <label style="font-size: 13px;" class="form-check-label">{{ owner.label }}</label>
                                        </a>

                                    </div>
                                </div>


                                <!-- Status Filter -->
                                <div class="position-relative d-flex d-lg-fle d-none">

                                    <button
                                        class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="mdi mdi-toggle-switch-outline fs-4 align-middle"></i>

                                        <span class="d-md-inline-block d-none">
                                            {{ statusFilterLabel }}
                                        </span>

                                        <i class="mdi mdi-chevron-down fs-4"></i>
                                    </button>

                                    <div class="dropdown-menu p-2" style="min-width: 180px;">

                                        <a href="javascript:void(0);" class="dropdown-item"
                                            :class="{ active: statusFilter === '' }" @click="setStatusFilter('')">
                                            All statuses
                                        </a>

                                        <a href="javascript:void(0);" class="dropdown-item"
                                            :class="{ active: statusFilter === 'operational' }"
                                            @click="setStatusFilter('operational')">
                                            Operational
                                        </a>

                                        <a href="javascript:void(0);" class="dropdown-item"
                                            :class="{ active: statusFilter === 'closed' }"
                                            @click="setStatusFilter('closed')">
                                            Closed
                                        </a>

                                    </div>
                                </div>

                                <!-- HMIS Filter -->
                                <div class="position-relative d-flex d-lg-flex d-none">

                                    <button
                                        class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">

                                        <icon icon="gridicons:computer" class="fs-4 align-middle" />

                                        <span class="d-md-inline-block d-none">
                                            {{ onboardingFilterLabel }}
                                        </span>

                                        <i class="mdi mdi-chevron-down fs-4"></i>

                                    </button>

                                    <div class="dropdown-menu p-2" style="min-width: 190px;">

                                        <!-- All -->
                                        <a href="javascript:void(0);" class="dropdown-item d-flex align-items-center px-2"
                                            :class="{
                                                active:
                                                    onboardingFilter === ''
                                            }" @click="
                                                setOnboardingFilter('')
                                                ">

                                            <i class="mdi mdi-hospital-building me-2 fs-5"></i>

                                            
                                            <label style="font-size: 13px;" class="form-check-label">All HMIS status</label>
                                            

                                        </a>


                                        <!-- Options -->
                                        <a v-for="item in onboardingTypes" :key="item.value" href="javascript:void(0);"
                                            class="dropdown-item d-flex align-items-center px-2" :class="{
                                                active:
                                                    onboardingFilter ===
                                                    item.value
                                            }" @click="
                                                setOnboardingFilter(
                                                    item.value
                                                )
                                                ">

                                            <i :class="[
                                                'mdi',
                                                item.icon,
                                                'me-2',
                                                'fs-5'
                                            ]"></i>

                                            
                                             <label style="font-size: 13px;" class="form-check-label">{{ item.label }}</label>

                                        </a>

                                    </div>

                                </div>


                                <!-- Columns -->
                                <div class="position-relative d-flex d-lg-flex d-none">

                                    <button title="Edit columns to view on the table"
                                        class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2"
                                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="mdi mdi-format-columns fs-4 align-middle"></i>

                                        <span class="d-md-inline-block d-none">
                                            Columns
                                        </span>

                                        <i class="mdi mdi-chevron-down fs-4"></i>
                                    </button>

                                    <div class="dropdown-menu p-3" style="min-width: 230px;">

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


                    <!-- ========================= -->
                    <!-- Table -->
                    <!-- ========================= -->
                    <div class="card-body p-0" style="min-height: 65vh;">

                        <!-- Empty State -->
                        <div class="p-4 d-flex align-items-center justify-content-center h-100 w-100" v-if="
                            !loadingTable &&
                            mohFacilities.length === 0 &&
                            !isLoading
                        ">
                            <div class="text-center p-4 w-100 h-100">

                                <div class="empty-state-icon mb-0">

                                    <Icon icon='ri:hospital-line' class="text-black opacity-25" font-size="145px" />


                                </div>

                                <h4 class="fw-bold text-dark mb-3">
                                    It's empty in here
                                </h4>

                                <p v-if="
                                    searchQuery !== '' ||
                                    ownershipFilter ||
                                    statusFilter
                                " class="text-muted">
                                    We couldn't find any facilities matching
                                    your search or filters.
                                </p>

                                <p v-else class="text-muted">
                                    No MOH facilities found.
                                </p>

                            </div>
                        </div>


                        <!-- Table -->
                       <template v-else>
                            <div class="px-4 py-2 d-flex justify-content-between align-items-center">
                                <span class=" text-muted" v-if="loadingTable">
                                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Loading facilities...
                                </span>
                                <span v-if="!loadingTable">
                                    Showing {{ mohFacilities.length }} of {{ totalFacilities }} facilities
                                </span>

                                <div>
                                    

                                     <ul class="list-inline font-size-20 mb-0 m-0">

                                        <li
                                            class="list-inline-item  dropdown d-flex justify-content-center align-items-center"
                                        >

                                            <a 
                                                href="javascript:void(0);" title="Refresh Facilities register"
                                                class="text-decoration-none text-black waves-effect px-2 rounded"
                                                data-bs-toggle="dropdown"
                                                @click="getMOHFacilities()"
                                            
                                            >
                                                <i class="mdi mdi-refresh"></i>

                                            </a>
                                        </li>

                                    </ul>
                                                
                                </div>
                            </div>
                             <div class="table-responsive">                               

                                <table class="table verticle-middle table-hover mb-0 doc-table table-stripe">
                                    

                                    <thead class="table-light text-nowrap">
                                        <tr>

                                            <!-- Facility -->
                                            <th class="waves-effect" @click="
                                                toggleSortOrder(
                                                    'name',
                                                    'asc'
                                                )
                                                ">
                                                <div class="cursor-pointer align-items-center gap-1 d-flex">

                                                    <i v-if="sortBy === 'name'" :class="[
                                                        'mdi',
                                                        sortOrder === 'asc'
                                                            ? 'mdi-arrow-up'
                                                            : 'mdi-arrow-down',
                                                        'text me-1'
                                                    ]"></i>

                                                    <span>Facility</span>

                                                </div>
                                            </th>


                                            <!-- Type -->
                                            <th v-if="col('typeLevel')" class="waves-effect" @click="
                                                toggleSortOrder(
                                                    'facility_type',
                                                    'asc'
                                                )
                                                ">
                                                <div class="cursor-pointer align-items-center gap-1 d-flex">

                                                    <i v-if="
                                                        sortBy ===
                                                        'facility_type'
                                                    " :class="[
                                                            'mdi',
                                                            sortOrder === 'asc'
                                                                ? 'mdi-arrow-up'
                                                                : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]"></i>

                                                    <span>Type & Level</span>

                                                </div>
                                            </th>


                                            <!-- Ownership -->
                                            <th v-if="col('ownership')" class="waves-effect" @click="
                                                toggleSortOrder(
                                                    'owner_type',
                                                    'asc'
                                                )
                                                ">
                                                <div class="cursor-pointer align-items-center gap-1 d-flex">

                                                    <i v-if="
                                                        sortBy ===
                                                        'owner_type'
                                                    " :class="[
                                                            'mdi',
                                                            sortOrder === 'asc'
                                                                ? 'mdi-arrow-up'
                                                                : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]"></i>

                                                    <span>Ownership</span>

                                                </div>
                                            </th>


                                            <!-- County -->
                                            <!-- Location -->
                                            <th class="waves-effect" v-if="col('location')" @click="
                                                toggleSortOrder(
                                                    'county_name',
                                                    'asc'
                                                )
                                                ">
                                                <div class="cursor-pointer align-items-center gap-1 d-flex">

                                                    <i v-if="sortBy === 'county_name'" :class="[
                                                        'mdi',
                                                        sortOrder === 'asc'
                                                            ? 'mdi-arrow-up'
                                                            : 'mdi-arrow-down',
                                                        'text me-1'
                                                    ]"></i>

                                                    <span>Location</span>

                                                </div>
                                            </th>


                                            <!-- Status -->
                                            <th v-if="col('status')" class="text-center">
                                                Status
                                            </th>

                                            <th v-if="col('hmis')" class="text-center">
                                                HMIS
                                            </th>


                                            <!-- Last synced -->
                                            <th v-if="col('lastSynced')" class="waves-effect" @click="
                                                toggleSortOrder(
                                                    'updated_at',
                                                    'desc'
                                                )
                                                ">
                                                <div class="cursor-pointer align-items-center gap-1 d-flex">

                                                    <i v-if="
                                                        sortBy ===
                                                        'updated_at'
                                                    " :class="[
                                                            'mdi',
                                                            sortOrder === 'asc'
                                                                ? 'mdi-arrow-up'
                                                                : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]"></i>

                                                    <span>Last Synced</span>

                                                </div>
                                            </th>


                                            <!-- Actions -->
                                            <th></th>

                                        </tr>
                                    </thead>


                                    <!-- Rows -->
                                    <tbody v-if="!loadingTable">

                                        <tr v-for="facility in mohFacilities" :key="facility.id">

                                            <!-- Facility -->
                                            <td>

                                                <div class="d-flex gap-2 align-items-center" :title="facility.name">

                                                    <div
                                                        class="avatar-xs rounded-circle bg-primary-soft text-primary d-flex align-items-center justify-content-center">
                                                        <i class="mdi mdi-hospital-building fs-5"></i>
                                                    </div>

                                                    <div>

                                                        <span
                                                            class="truncate-singleLine flex-grow-1 min-width-0 fw-bold text-black">
                                                            {{ facility.name || '-' }}
                                                        </span>

                                                        <span style="font-size: 12px;"
                                                            class="text-muted text-nowrap truncate-singleLine">
                                                            MFL Code:
                                                            {{ facility.mfl_code || '-' }}
                                                        </span>

                                                    </div>

                                                </div>

                                            </td>


                                            <!-- Type & Level -->
                                            <td v-if="col('typeLevel')" class="text-nowrap">

                                                <div class="d-flex flex-column">
                                                    <span class="truncate-singleLine flex-grow-1 min-width-0 fw-medium ">
                                                        {{
                                                            facility.facility_type ||
                                                            '-'
                                                        }}
                                                    </span>

                                                    <span style="font-size: 12px;" class="text-muted truncate-singleLine">
                                                        {{
                                                            facility.facility_level ||
                                                            '-'
                                                        }}
                                                    </span>
                                                </div>

                                            </td>


                                            <!-- Ownership -->
                                            <td v-if="col('ownership')" class="text-nowrap">

                                                <span
                                                    class="text-capitalize badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">
                                                    <i class="mdi mdi-domain me-1"></i>
                                                    {{
                                                        ownershipLabel(facility.owner_type)
                                                    }}
                                                </span>

                                            </td>


                                            <!-- Location -->
                                            <td v-if="col('location')">
                                                <div class="d-flex flex-column">

                                                    <!-- County -->
                                                    <span class="fw-medium text-capitalize">
                                                        {{
                                                            facility.county_name ||
                                                            facility.county_code ||
                                                            '-'
                                                        }}
                                                    </span>

                                                    <p
                                                        class="small p-0 m-0 text-capitalize text-capitalize truncate-singleLine flex-grow-1 min-width-0">
                                                        <!-- Sub-county -->
                                                        <span v-if="facility.sub_county_name" class="text-muted"
                                                            style="font-size: 12px;">
                                                            {{
                                                                String(facility.sub_county_name).toLowerCase()
                                                            }}
                                                        </span>,

                                                        <!-- Ward -->
                                                        <span v-if="facility.ward_name" class="text-muted"
                                                            style="font-size: 11px;">
                                                            {{ String(facility.ward_name).toLowerCase() }}
                                                        </span>

                                                    </p>
                                                </div>
                                            </td>


                                            <!-- Status -->
                                            <td v-if="col('status')" class="text-center">

                                                <span 
                                                    :class="statusBadgeClass(facility.operation_status)
                                                    " class="text-capitalize badge-alt2 w-auto"
                                                >                                               

                                                    {{
                                                        formatStatus(facility.operation_status)
                                                    }}

                                                </span>

                                            </td>
                                            <!-- HMIS -->
                                            <td v-if="col('hmis')" class="text-nowrap">
                                                <span 
                                                    :class="onboardingBadgeClass(facility)
                                                    " class="text-capitalize badge-alt2 w-auto"
                                                >
                                                    <i :class="isOnboarded(facility)
                                                            ? 'mdi mdi-check-circle-outline'
                                                            : 'mdi mdi-hospital-marker'
                                                        " class="me-1">
                                                    </i>

                                                    {{onboardingStatus(facility)}}

                                                </span>
                                            </td>


                                            <!-- Last Synced -->
                                            <td v-if="col('lastSynced')" :title="facility.updated_at
                                                    ? formatDateTime(
                                                        facility.updated_at
                                                    )
                                                    : ''
                                                ">

                                                <span class="text-capitalize truncate-singleLine flex-grow-1 min-width-0">
                                                    {{
                                                        facility.updated_at
                                                            ? smartDate(
                                                                facility.updated_at
                                                            )
                                                            : '-'
                                                    }}
                                                </span>

                                            </td>


                                            <!-- Actions -->
                                            <td>

                                                <ul class="list-inline font-size-20 mb-0">

                                                    <li
                                                        class="list-inline-item px-2 dropdown d-flex justify-content-center align-items-center">

                                                        <a href="javascript:void(0);" title="More actions"
                                                            class="text-decoration-none text-black waves-effect px-2 rounded"
                                                            data-bs-toggle="dropdown">
                                                            <i class="bx bx-dots-horizontal-rounded"></i>

                                                        </a>


                                                        <ul class="dropdown-menu p-2" data-bs-auto-close="true">

                                                            <!-- View details -->
                                                            <li>

                                                                <router-link class="dropdown-item d-flex py-2"
                                                                    :to="`/moh-facilities/${facility.id}`">

                                                                    <Icon icon="bxs:info-circle" class="fs-4 me-2" />

                                                                    <span>
                                                                        View details
                                                                    </span>
                                                                </router-link>

                                                            </li>


                                                            <!-- Onboard -->
                                                            <li>

                                                                <router-link class="dropdown-item d-flex py-2"
                                                                    :to="`/moh-facilities/${facility.id}/onboard`">


                                                                    <Icon icon="bxs:folder-plus" class="fs-4 me-2" />

                                                                    <span>
                                                                        Onboard facility
                                                                    </span>
                                                                </router-link>

                                                            </li>


                                                            <!-- Copy MFL -->
                                                            <li>

                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item d-flex py-2" @click="
                                                                        copyMflCode(
                                                                            facility
                                                                        )
                                                                        ">

                                                                    <Icon icon="icon-park-solid:copy" class="fs-4 me-2" />

                                                                    <span>
                                                                        Copy MFL code
                                                                    </span>
                                                                </a>

                                                            </li>


                                                            <!-- Copy full details -->
                                                            <li>

                                                                <a href="javascript:void(0);"
                                                                    class="dropdown-item d-flex py-2" @click="
                                                                        copyFullDetails(facility)
                                                                    ">
                                                                    <i class="mdi mdi-text-box-multiple me-2 fs-4"></i>


                                                                    <span>
                                                                        Copy full details
                                                                    </span>
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

                                                        <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(120, 180)
                                                            " class="mx-2" />

                                                        <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(70, 110)
                                                            " class="mx-2" />

                                                    </div>

                                                </div>

                                            </td>


                                            <td v-if="col('typeLevel')">
                                                <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(70, 110)"
                                                    class="mx-2" />
                                            </td>


                                            <td v-if="col('ownership')">
                                                <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(80, 130)"
                                                    class="mx-2" />
                                            </td>


                                            <td v-if="col('county')">
                                                <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(60, 100)"
                                                    class="mx-2" />
                                            </td>


                                            <td v-if="col('status')">
                                                <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(50, 80)"
                                                    class="mx-2" />
                                            </td>

                                            <td v-if="col('hmis')">
                                                <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(80, 120)"
                                                    class="mx-2" />
                                            </td>


                                            <td v-if="col('lastSynced')">
                                                <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(60, 100)"
                                                    class="mx-2" />
                                            </td>


                                            <td>
                                                <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(15, 30)"
                                                    class="mx-2" />
                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>
                       </template>


                        <!-- Footer -->
                        <div class="w-100 d-flex align-items-center justify-content-center text-center p-3 flex-row gap-2 flex-column">

                            <div class="w-100 w-100 d-flex align-items-center justify-content-center">

                                <p v-if="
                                    !hasMore &&
                                    mohFacilities.length > 0
                                " class="text-muted mb-0 small">
                                    <i class="bx bx-check-circle text-success me-1"></i>

                                    Showing all
                                    {{ totalFacilities }}
                                    facilities
                                </p>

                            </div>


                            <div class="w-100 d-flex align-items-center justify-content-center">
                                <button v-if="hasMore"
                                    class="btn btn-primary d-flex align-items-center justify-content-center gap-2"
                                    :disabled="isFetchingMore" @click="loadMore">
                                    <span v-if="isFetchingMore" class="spinner-border spinner-border-sm me-1"></span>

                                    Load more
                                </button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import {
    ref,
    computed,
    onMounted,
    onBeforeUnmount,
    watch
} from 'vue'

import MOHFACILITIESAPI from '@/api/mohFacilities.js'

// Components
import MohFilterAside from './components/Moh.filter.aside.vue'
import LoaderVue from '@/layouts/Loader.vue'
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'
import DataViewToggle from '@/components/Data-tools/Data.View.Toggle.vue'

// Utils
import {
    formatDateTime,
    smartDate
} from '@/utils/dates'


// ======================================================
// Page state
// ======================================================

const isLoading = ref(true)
const loadingTable = ref(false)
const isFetchingMore = ref(false)
const activeView = ref('table')

// ======================================================
// Data
// ======================================================

const mohFacilities = ref([])


// ======================================================
// Search / filters / sorting
// ======================================================

const searchQuery = ref('')
const ownershipFilter = ref('')
const statusFilter = ref('')
const onboardingFilter = ref('')

const activeFilters = ref({})

const sortBy = ref('name')
const sortOrder = ref('asc')


// ======================================================
// Pagination
// ======================================================

const currentPage = ref(1)
const lastPage = ref(1)
const totalFacilities = ref(0)
const perPage = ref(20)

const hasMore = computed(() => {
    return currentPage.value < lastPage.value
})


// ======================================================
// Request control
// ======================================================

let requestSeq = 0
let searchTimeout = null
let rafId = null
let baseLoadInFlight = false


// ======================================================
// Ownership types
// ======================================================

const ownershipTypes = [
    {
        value: 'National Government',
        label: 'National Government',
        icon: 'mdi-bank'
    },
    {
        value: 'County Government',
        label: 'County Government',
        icon: 'mdi-city'
    },
    {
        value: 'Private',
        label: 'Private',
        icon: 'mdi-office-building'
    },
    {
        value: 'Faith Based Organization',
        label: 'Faith Based Organization',
        icon: 'mdi-church'
    },
    {
        value: 'Non-Governmental Organizations',
        label: 'NGO',
        icon: 'mdi-account-group'
    },
    {
        value: 'Community',
        label: 'Community',
        icon: 'mdi-home-group'
    }
]


// ======================================================
// HMIS onboarding filters
// ======================================================

const onboardingTypes = [
    {
        value: 'onboarded',
        label: 'Onboarded',
        icon: 'mdi-check-circle-outline'
    },
    {
        value: 'existing_hmis',
        label: 'Existing HMIS',
        icon: 'mdi-laptop-mac'
    },
    {
        value: 'not_onboarded',
        label: 'Not Onboarded',
        icon: 'mdi-hospital-marker'
    }
]


// ======================================================
// Columns
// ======================================================

const allColumns = ref([
    {
        key: 'typeLevel',
        label: 'Type & Level',
        visible: true
    },
    {
        key: 'ownership',
        label: 'Ownership',
        visible: true
    },
    {
        key: 'location',
        label: 'Location',
        visible: true
    },
    {
        key: 'status',
        label: 'Status',
        visible: true
    },
    {
        key: 'hmis',
        label: 'HMIS',
        visible: true
    },
    {
        key: 'lastSynced',
        label: 'Last Synced',
        visible: true
    }
])

const col = key => {
    return allColumns.value.find(column => column.key === key)?.visible
}


// ======================================================
// Skeleton
// ======================================================

const skeletonRows = Array.from({ length: 10 })

const rand = (min, max) => {
    return `${Math.floor(Math.random() * (max - min) + min)}px`
}


// ======================================================
// Computed filter labels
// ======================================================

const ownershipFilterLabel = computed(() => {
    if (!ownershipFilter.value) {
        return 'Ownership'
    }

    return (
        ownershipTypes.find(
            owner => owner.value === ownershipFilter.value
        )?.label || 'Ownership'
    )
})


const statusFilterLabel = computed(() => {
    const value = String(statusFilter.value || '').toLowerCase()

    if (value === 'operational') {
        return 'Operational'
    }

    if (value === 'closed') {
        return 'Closed'
    }

    return 'Status'
})


const onboardingFilterLabel = computed(() => {
    if (!onboardingFilter.value) {
        return 'HMIS'
    }

    return (
        onboardingTypes.find(
            item => item.value === onboardingFilter.value
        )?.label || 'HMIS'
    )
})


const hasActiveFilters = computed(() => {
    return Boolean(
        searchQuery.value.trim() ||
        ownershipFilter.value ||
        statusFilter.value ||
        onboardingFilter.value ||
        Object.keys(activeFilters.value).length
    )
})


// ======================================================
// Formatting helpers
// ======================================================

function formatLabel(value) {
    if (!value) return '-'

    return String(value)
        .replace(/_/g, ' ')
        .replace(/\b\w/g, char => char.toUpperCase())
}


function formatLocation(value) {
    if (!value) return '-'

    return String(value)
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase())
}


function ownershipLabel(value) {
    if (!value) return '-'

    const owner = ownershipTypes.find(
        item => item.value === value
    )

    return owner?.label || formatLabel(value)
}


function formatStatus(status) {
    return formatLabel(status)
}


// ======================================================
// HMIS helpers
// ======================================================

function isOnboarded(facility) {
    return facility?.onboarding?.status === 'onboarded'
}


function hasExistingHmis(facility) {
    return Boolean(facility?.existing_hmis)
}


function onboardingStatus(facility) {
    if (isOnboarded(facility)) {
        return 'Onboarded'
    }

    if (hasExistingHmis(facility)) {
        return 'Existing HMIS'
    }

    return 'Not Onboarded'
}


function onboardingBadgeClass(facility) {
    if (isOnboarded(facility)) {
        return 'bg-primary-soft text-primary'
    }

    if (hasExistingHmis(facility)) {
        return 'bg-warning-soft text-warning'
    }

    return 'bg-secondary-soft text-muted'
}


// ======================================================
// Facility status
// ======================================================

function statusBadgeClass(status) {
    const normalized = String(status || '').toLowerCase()

    if (
        normalized.includes('operational') ||
        normalized.includes('active')
    ) {
        return 'bg-success-soft text-success'
    }

    if (
        normalized.includes('closed') ||
        normalized.includes('inactive')
    ) {
        return 'bg-danger-soft text-danger'
    }

    if (normalized.includes('pending')) {
        return 'bg-warning-soft text-warning'
    }

    return 'bg-secondary-soft text-muted'
}


// ======================================================
// Build API parameters
// ======================================================

function buildRequestParams(page = 1) {
    const params = {
        page,
        sort: sortBy.value,
        sort_dir: sortOrder.value,
        per_page: perPage.value
    }

    const search = searchQuery.value.trim()

    if (search) {
        params.search = search
    }

    if (ownershipFilter.value) {
        params.owner_type = ownershipFilter.value
    }

    if (statusFilter.value) {
        params.operation_status = statusFilter.value
    }

    if (onboardingFilter.value) {
        params.onboarding_status = onboardingFilter.value
    }

    // MohFilterAside filters
    Object.entries(activeFilters.value).forEach(
        ([key, value]) => {
            if (
                value !== undefined &&
                value !== null &&
                value !== ''
            ) {
                params[key] = value
            }
        }
    )

    return params
}


// ======================================================
// Fetch facilities
// ======================================================

async function getMOHFacilities(loadMore = false) {
    const seq = ++requestSeq

    if (loadMore) {
        isFetchingMore.value = true
    } else {
        loadingTable.value = true
        baseLoadInFlight = true
    }

    const page = loadMore
        ? currentPage.value + 1
        : 1

    try {
        const { data } = await MOHFACILITIESAPI.list(
            buildRequestParams(page)
        )

        // Ignore stale requests
        if (seq !== requestSeq) {
            return
        }

        const rows = data?.data || []
        const meta = data?.meta || {}

        if (loadMore) {
            mohFacilities.value.push(...rows)
            currentPage.value = page
        } else {
            mohFacilities.value = rows
            currentPage.value = meta.current_page || 1
        }

        lastPage.value = meta.last_page || 1

        totalFacilities.value =
            meta.total ??
            mohFacilities.value.length

    } catch (error) {
        console.error(
            'Error fetching MOH facilities:',
            error
        )

        if (!loadMore && seq === requestSeq) {
            mohFacilities.value = []
            currentPage.value = 1
            lastPage.value = 1
            totalFacilities.value = 0
        }

    } finally {
        if (seq === requestSeq) {
            loadingTable.value = false
            isFetchingMore.value = false
            baseLoadInFlight = false
        }
    }
}


// ======================================================
// Reset and reload
// ======================================================

function reloadFacilities() {
    currentPage.value = 1
    getMOHFacilities(false)
}


// ======================================================
// Load more
// ======================================================

function loadMore() {
    if (
        !hasMore.value ||
        isFetchingMore.value ||
        baseLoadInFlight ||
        loadingTable.value
    ) {
        return
    }

    getMOHFacilities(true)
}


// ======================================================
// Search
// ======================================================

function handleSearchInput() {
    clearTimeout(searchTimeout)

    searchTimeout = setTimeout(() => {
        reloadFacilities()
    }, 500)
}


function clearSearch() {
    clearTimeout(searchTimeout)

    searchQuery.value = ''

    reloadFacilities()
}


// ======================================================
// Ownership filter
// ======================================================

function setOwnershipFilter(value) {
    ownershipFilter.value = value
    reloadFacilities()
}


// ======================================================
// Status filter
// ======================================================

function setStatusFilter(value) {
    statusFilter.value = value
    reloadFacilities()
}


// ======================================================
// HMIS filter
// ======================================================

function setOnboardingFilter(value) {
    onboardingFilter.value = value
    reloadFacilities()
}


// ======================================================
// Aside filters
// ======================================================

function handleFacilityFilters(filters = {}) {
    activeFilters.value = {
        ...filters
    }

    reloadFacilities()
}


function clearFacilityFilters() {
    activeFilters.value = {}
    reloadFacilities()
}


// ======================================================
// Sorting
// ======================================================

function toggleSortOrder(
    field,
    defaultOrder = 'desc'
) {
    if (sortBy.value !== field) {
        sortBy.value = field
        sortOrder.value = defaultOrder
    } else {
        sortOrder.value =
            sortOrder.value === 'asc'
                ? 'desc'
                : 'asc'
    }

    reloadFacilities()
}


// ======================================================
// Clipboard helpers
// ======================================================

async function copyToClipboard(text) {
    if (!text) return false

    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch (error) {
        console.error(
            'Clipboard error:',
            error
        )

        return false
    }
}


async function copyMflCode(facility) {
    if (!facility?.mfl_code) return

    await copyToClipboard(
        facility.mfl_code
    )
}


async function copyFullDetails(facility) {
    if (!facility) return

    const details = [
        `Facility: ${facility.name || '-'}`,
        `MFL Code: ${facility.mfl_code || '-'}`,
        `Facility Type: ${facility.facility_type || '-'}`,
        `Facility Level: ${facility.facility_level || '-'}`,
        `Owner: ${
            facility.owner_name ||
            ownershipLabel(facility.owner_type)
        }`,
        `County: ${formatLocation(
            facility.county_name ||
            facility.county_code
        )}`,
        `Sub-county: ${formatLocation(
            facility.sub_county_name
        )}`,
        `Constituency: ${formatLocation(
            facility.constituency_name
        )}`,
        `Ward: ${formatLocation(
            facility.ward_name
        )}`,
        `Town: ${facility.town || '-'}`,
        `Status: ${formatStatus(
            facility.operation_status
        )}`,
        `HMIS: ${onboardingStatus(facility)}`,
        `Last Synced: ${
            facility.updated_at
                ? formatDateTime(
                    facility.updated_at
                )
                : '-'
        }`
    ].join('\n')

    await copyToClipboard(details)
}


// ======================================================
// Infinite scroll
// ======================================================

const bottomOffset = 180

function isNearBottom() {
    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop

    const viewportHeight =
        window.innerHeight ||
        document.documentElement.clientHeight

    const fullHeight =
        document.documentElement.scrollHeight

    return (
        scrollTop +
        viewportHeight >=
        fullHeight - bottomOffset
    )
}


function onScrollInfinite() {
    if (rafId) return

    rafId = requestAnimationFrame(() => {
        rafId = null

        if (
            hasMore.value &&
            !isFetchingMore.value &&
            !loadingTable.value &&
            isNearBottom()
        ) {
            loadMore()
        }
    })
}


// ======================================================
// Lifecycle
// ======================================================

onMounted(async () => {
    window.addEventListener(
        'scroll',
        onScrollInfinite,
        { passive: true }
    )

    await getMOHFacilities()

    setTimeout(() => {
        isLoading.value = false
    }, 400)
})


onBeforeUnmount(() => {
    window.removeEventListener(
        'scroll',
        onScrollInfinite
    )

    if (rafId) {
        cancelAnimationFrame(rafId)
    }

    clearTimeout(searchTimeout)
})

// ======================================================
// Watchers
// ======================================================
watch(activeView, (newView) => {
    console.log('New view:', newView)
    alert(`View changed to: ${newView}`)
})

// ======================================================
// End of script
// ======================================================
</script>




<style scoped>
th {
    display: table-cell !important;
}
.nav-pills-main  {
   border: 1px solid #d5d6d7;
   background-color: #eff2f7;
}

.nav-pills-main .nav-link.active {
    color: #2164f3;
    font-size: 14px;
    font-weight: 600;
    background: #fff;
    border: 1px solid rgba(33, 100, 243, 0.08);
    box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.04),
        0 4px 10px rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
    transition: all 0.2s ease;
}

.nav-pills-main .nav-link {
    transition: all 0.2s ease;
}
</style>
