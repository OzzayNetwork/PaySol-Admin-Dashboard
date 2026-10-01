<template>
    <div class="container-fluid min-vh-100">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">File Manager</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>

                            <li class="breadcrumb-item active">File Manager</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <div class="row d-none">
            <div class="col">
                <div class="card">
                    <div class="card-body">
                        <div v-if="showFilesTable"> 
                            <h4>Files are ready to be displayed</h4>
                        </div>
                        <div v-else-if="showEmptyState"> 
                            No files available.
                        </div>
                    </div>

                    <div class="card-body">
                        <h4>Selected View type</h4>
                        <div v-if="viewType==='list'">
                            List View
                            </div>
                        <div v-else-if="viewType==='grid'"> 
                            Grid View
                        </div>   
                       
                    </div>
                </div>
            </div>
        </div>
        <!-- 🔄 Loader -->
        <div v-if="isLoading">
            <LoaderVue />
        </div>
        <div v-else class="row justify-content-center">
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <div v-if="showFilesTable" class="card d-flex flex-row">
                            <div class="flex-grow-1 ">
                                <div class="card-body border-bottom">
                                    <div class="row">
                                        <div class="col-12 d-flex gap-2">
                                            <div class="position-relative d-flex gap-3">
                                               <div class="btn-group view-toggle" role="group" aria-label="View toggle">
                                                    <input
                                                        type="radio"
                                                        class="btn-check"
                                                        name="viewToggle"
                                                        id="listView"
                                                        value="list"
                                                        v-model="viewType"
                                                        @change="handleViewTypeChange('list')"
                                                    />
                                                    <label class="btn mb-0 " for="listView" title="List view">
                                                        <i class="mdi mdi-format-list-bulleted"></i>
                                                    </label>

                                                    <input
                                                        type="radio"
                                                        class="btn-check"
                                                        name="viewToggle"
                                                        id="gridView"
                                                        value="grid"
                                                        v-model="viewType"
                                                        @change="handleViewTypeChange('grid')"
                                                    />
                                                    <label class="btn mb-0" for="gridView" title="Grid view">
                                                        <i class="mdi mdi-view-grid"></i>
                                                    </label>
                                                </div>

                                                <div class="dropdown-menu p-4 text-black" style="width: 500px;">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <h5 class="text-capitalize">Sort by</h5>
                                                        </div>
                                                        <div class="col-12 mb-2">
                                                            <hr class="d-none">
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="mb-3">
                                                                <label for="sort-field-select"
                                                                    class="form-label d-none">Field</label>
                                                                <select class="form-select" id="sort-field-select">
                                                                    <option value="" disabled="">Select field</option>
                                                                    <option value="tagNumber" selected="">Date Added
                                                                    </option>
                                                                    <option value="name">Views</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div class="col-12">
                                                            <div class="mb-3">
                                                                <div class="btn-group" role="group"
                                                                    aria-label="Basic radio toggle button group">
                                                                    <input type="radio" class="btn-check"
                                                                        name="btnradio" id="btnradio4"
                                                                        autocomplete="off" checked="">
                                                                    <label class="btn btn-outline-dark"
                                                                        for="btnradio4"><i class="bx bx-sort-up"></i>
                                                                        Ascending</label>

                                                                    <input type="radio" class="btn-check"
                                                                        name="btnradio" id="btnradio6"
                                                                        autocomplete="off">
                                                                    <label class="btn btn-outline-dark"
                                                                        for="btnradio6"><i class="bx bx-sort-down"></i>
                                                                        Descending</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-12 mt-4">
                                                            <button type="button"
                                                                class="btn btn-soft-danger waves-effect waves-light w-100 "><i
                                                                    class="bx bx-trash me-1 fs-5"></i>
                                                                Clear Sort</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="flex-grow-1">
                                                <div class="search-box mb-0 me-0">
                                                            <div class="position-relative">
                                                                     <form @submit.prevent="handleSearchInput(searchQuery)" class="input-group bg-light rounded mb04 pb-0 flex-nowrap">
                                                                        <div class="flex-grow-1 ">
                                                                             <input 
                                                                             style="border-radius: 0px; padding-right: 35px;"
                                                                                type="text" 
                                                                                class="form-control bg-light  rounded flex-grow-1"
                                                                                placeholder="Search..." 
                                                                                spellcheck="false" 
                                                                                data-ms-editor="true" 
                                                                                v-model="searchQuery"
                                                                               >
                                                                            <i class="bx bx-search-alt search-icon fs-4"></i>
                                                                            <i
                                                                                v-if="searchQuery!=''" 
                                                                                 title="Clear search"
                                                                                style="right: 60px; left:unset; " 
                                                                                class="mdi mdi-close search-icon cursor-pointer fs-3 waves-effect"
                                                                                @click="searchQuery = ''; handleSearchInput('')"
                                                                            >
                                                                            </i>
                                                                        </div>
                                                                         <button type="submit"  @click="handleSearchInput(searchQuery)" 
                                                                         title="Click to search" 
                                                                         class="btn btn-primary px-4 d-md-flex d-none align-items-center fw-bold" 
                                                                          id="button-addon2">
                                                                            <i class="bx bx-search-alt search-icon fs-4"></i>
                                                                        </button>

                                                                     </form>
                                                            </div>
                                                        </div>
                                            </div>
                                            <div class="position-relative d-flex contact-links d-lg-flex d-none">
                                                 <button to="/file-manager/file-new"
                                                     data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                class="btn btn-primary d-lg-flex flex-nowrap d-flex align-items-center justify-content-center fw-bold gap-2 flex-nowrap">
                                                <i class="dripicons-plus fs-4 "></i> 
                                                <span>Create</span>
                                                 <i class="mdi mdi-chevron-down fs-4"></i>
                                            </button>

                                            <div class="dropdown-menu " style="">
                                                    <router-link class="dropdown-item d-flex align-items-center " to="/file-manager/file-new" title="Upload a file"><i class="bx bx bxs-cloud-upload fs-4 me-3"></i><span>Upload File</span></router-link>
                                                    <router-link 
                                                        class="dropdown-item d-flex align-items-center" 
                                                        href="#" title="Add a folder"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#addFolderModal" 
                                                        >
                                                        <i class="bx bxs-folder-plus fs-4 me-3"></i><span>Add Folder</span>
                                                    </router-link>
                                                    <router-link 
                                                        data-bs-target="#addCategoryModal" 
                                                         data-bs-toggle="modal"
                                                        class="dropdown-item d-flex align-items-center" 
                                                        href="#" title="Add a category">
                                                        <i class="bx bxs-add-to-queue fs-4 me-3"></i>
                                                        <span>Add Category</span>
                                                    </router-link>
                                                   
                                                </div>
                                            </div>

                                           

                                            <div class="position-relative d-flex d-lg-flex d-none">
                                                <button 
                                                    type="button" 
                                                    class="btn btn-light waves-effect fw-bold flex-nowrap d-flex align-items-center justify-content-center"
                                                    data-bs-toggle="offcanvas"
                                                    data-bs-target="#activityLogsAside" aria-controls="offcanvasRight"
                                                >
                                                    <i class="mdi mdi-filter-variant fs-4 align-middle me-2"></i> 
                                                    <span class="d-md-inline-block d-none">Filter</span>
                                                    
                                                </button>

                                                
                                            </div>                                            

                                            <div class="position-relative d-flex d-lg-flex d-none">
                                                <button
                                                    class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <i class="mdi mdi-format-columns fs-4 align-middle "></i>
                                                    <span class="d-md-inline-block d-none ">Columns</span>
                                                    <i class="mdi mdi-chevron-down fs-4"></i>
                                                </button>

                                                <div class="dropdown-menu p-3" style="min-width: 220px;">
                                                    <div
                                                    v-for="column in allColumns"
                                                    :key="column.key"
                                                    class="form-check mb-3"
                                                    >
                                                    <input
                                                        class="form-check-input "
                                                        type="checkbox"
                                                        :id="`col-${column.key}`"
                                                        v-model="column.visible"
                                                    />
                                                    <label
                                                        class="form-check-label"
                                                        :for="`col-${column.key}`"
                                                    >
                                                        {{ column.label }}
                                                    </label>
                                                    </div>
                                                </div>
                                                </div>
                                                 <!-- show on smaller screens -->
                                             <div class="position-relative d-flex d-flex  d-lg-none">
                                                <button
                                                    class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2 justify-content-center"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    style="line-height:11px;"
                                                >
                                                    <i class="dripicons-view-apps fs-4 "></i>
                                                    <span class="d-md-inline-block d-none ">More</span>
                                                    <i class="mdi mdi-chevron-down fs-4"></i>
                                                </button>

                                                <div class="dropdown-menu" style="min-width: 250px;">
                                                    <div class="p-3">
                                                        <h5 class="font-size-13 text-muted text-truncate mn-0">Hide or
                                                            Show table columns</h5>
                                                        <div v-for="column in allColumns" :key="column.key"
                                                            class="form-check mb-3 ">
                                                            <input class="form-check-input " type="checkbox"
                                                                :id="`col-${column.key}`" v-model="column.visible" />
                                                            <label class="form-check-label" :for="`col-${column.key}`">
                                                                {{ column.label }}
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div class="dropdown-divider"></div>
                                                    <h5 class="font-size-13 text-muted text-truncate mn-0 px-3">Create</h5>
                                                    <div>
                                                       <router-link class="dropdown-item d-flex align-items-center " to="/file-manager/file-new" title="Upload a file"><i class="bx bx bxs-cloud-upload fs-4 me-3"></i><span>Upload File</span></router-link>
                                                        <router-link 
                                                            class="dropdown-item d-flex align-items-center" 
                                                            href="#" title="Add a folder"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#addFolderModal" 
                                                            >
                                                            <i class="bx bxs-folder-plus fs-4 me-3"></i><span>Add Folder</span>
                                                        </router-link>
                                                        <router-link 
                                                            data-bs-target="#addCategoryModal" 
                                                            data-bs-toggle="modal"
                                                            class="dropdown-item d-flex align-items-center" 
                                                            href="#" title="Add a category">
                                                            <i class="bx bxs-add-to-queue fs-4 me-3"></i>
                                                            <span>Add Category</span>
                                                        </router-link> 
                                                    </div>
                                                    <div class="dropdown-divider"></div>
                                                    <a 
                                                            data-bs-toggle="offcanvas"
                                                    data-bs-target="#activityLogsAside" aria-controls="offcanvasRight"
                                                            class="dropdown-item d-flex align-items-center" 
                                                            href="#" title="Filter table">
                                                            <i class="mdi mdi-filter-variant fs-4 align-middle me-2"></i>
                                                            <span>Table Filters</span>
                                                        </a>


                                                </div>
                                                </div>

                                                <!-- details to be used on large screens -->

                                            <button type="button" class="btn btn-light waves-effect fw-bold d-xl-flex d-none gap-2 align-items-center">
                                                <i class="mdi mdi-information-outline fs-4 align-middle "
                                                    data-v-a33a6162=""></i>
                                                <span class="d-md-inline-block d-none" data-v-a33a6162=""
                                                    @click="toggleDetailsPanel">
                                                    Details
                                                </span>
                                            </button>

                                           

                                                <!-- show on smaller screens -->
                                            <div class="position-relative d-flex  d-xl-none">
                                                <button 
                                                    type="button" 
                                                    class="btn btn-light waves-effect fw-bold gap-2 d-flex align-items-center justify-content-center"
                                                    data-bs-toggle="offcanvas"
                                                    data-bs-target="#detailsAside" aria-controls="offcanvasRight"
                                                >
                                                    <i class="mdi mdi-information-outline fs-4 align-middle"></i>
                                                    <span class="d-md-inline-block d-none">Details</span>
                                                    
                                                </button>

                                                
                                            </div>



                                        </div>
                                    </div>
                                </div>
                                <div class="card-body border-bottom py-3 p-2" v-if="selectedFiles.size != 0">
                                    <div class="d-flex justify-content-between">
                                        <div class="d-flex align-items-center more-actions">
                                            <ul class="list-inline font-size-20 contact-links mb-0">
                                                <li v-if="selectedFiles.size == 1"
                                                    class="list-inline-item p-2 px-3 border-round m-0">
                                                    <a href="javascript: void(0);" title="Open"
                                                        class="d-flex gap-2 align-items-center">
                                                        <i class="bx bx-folder-open"></i> <span class=""
                                                            style="font-size:13px;">Open</span>
                                                    </a>
                                                </li>
                                                <li class="list-inline-item p-2 px-3 border-round m-0">
                                                    <a href="javascript: void(0);" title="Share"
                                                        class="d-flex gap-2 align-items-center">
                                                        <i class="bx bx-share-alt"></i> <span class=""
                                                            style="font-size:13px;">Share</span>
                                                    </a>
                                                </li>

                                                <li class="list-inline-item p-2 px-3 border-round m-0">
                                                    <a href="javascript: void(0);" title="Copy Link"
                                                        class="d-flex gap-2 align-items-center">
                                                        <i class="bx bx-link"></i> <span class=""
                                                            style="font-size:13px;">Copy Link</span>
                                                    </a>
                                                </li>

                                                <li 
                                                    class="list-inline-item p-2 px-3 border-round m-0"
                                                     data-bs-toggle="modal" 
                                                    data-bs-target="#deleteFileModal"
                                                >
                                                    <a href="javascript: void(0);" title="Delete"
                                                        class="d-flex gap-2 align-items-center">
                                                        <i class="bx bx-trash"></i> <span class=""
                                                            style="font-size:13px;">Delete</span>
                                                    </a>
                                                </li>

                                                <li class="list-inline-item p-2 px-3 border-round m-0">
                                                    <a href="javascript: void(0);" title="Download"
                                                        class="d-flex gap-2 align-items-center">
                                                        <i class="bx bx-download"></i> <span class=""
                                                            style="font-size:13px;">Download</span>
                                                    </a>
                                                </li>

                                                <li class="list-inline-item p-2 px-3 border-round m-0">
                                                    <a href="javascript: void(0);" title="Move to"
                                                        class="d-flex gap-2 align-items-center">
                                                        <i class="bx bx-folder-plus"></i> <span class=""
                                                            style="font-size:13px;">Move to</span>
                                                    </a>
                                                </li>
                                                <li v-if="selectedFiles.size == 1"
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#editFileModal"
                                                    class="list-inline-item p-2 px-3 border-round m-0"
                                                >
                                                    <a href="javascript: void(0);" title="Rename"
                                                        class="d-flex gap-2 align-items-center">
                                                        <i class="bx bx-rename"></i> <span class=""
                                                            style="font-size:13px;">Rename</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="d-flex align-items-center gap-3 more-actions">
                                            <div>
                                                <button @click="clearAllSelections" type="button"
                                                    class="btn btn-light btn-rounded waves-effect text-capitalize px-3 fw-bold"><i
                                                        class="bx bx-x font-size-16 align-middle "></i> {{
                                                            selectedFiles.size }} selected</button>
                                            </div>
                                            <ul class="list-inline font-size-20 contact-links mb-0">
                                                <li class="list-inline-item p-2 px-3 border-round m-0 d-none">
                                                    <a href="javascript: void(0);" title="Search"
                                                        class="d-flex gap-2 align-items-center">
                                                        <i class="bx bx-search"></i> <span class=""
                                                            style="font-size:13px;">Search</span>
                                                    </a>
                                                </li>

                                                <li class="list-inline-item p-2 px-3 border-round m-0 d-lg-inline d-none">
                                                    <a @click="toggleDetailsPanel" href="javascript: void(0);" title="Details"
                                                        class="d-flex gap-2 align-items-center">
                                                        <i class="bx bx-info-circle"></i> <span class=""
                                                            style="font-size:13px;">Details</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body p-0">
                                    <template v-if="viewType==='grid'">
                                       
                                       <div class="grid-cont">
                                            <div class="row">
                                                <div class="col-12 ">
                                                    <div class="col-12">
                                                        <div class="w-100 d-flex align-items-center gap-3 p-3 pt-2 pb-2 table-light bg-dark bg-opacity-10 border-bottom mb-3">
                                                            <div>
                                                                <div class="form-check mb-0">
                                                                        <input class="form-check-input checkbox-lg" type="checkbox"
                                                                            id="formCheck2" @click="selectAllFiles"
                                                                            :checked="selectedFiles.size === files.length && files.length > 0"
                                                                            :indeterminate="selectedFiles.size > 0 && selectedFiles.size < files.length">
                                                                    </div>
                                                            </div>
                                                            <div>
                                                                <div class="btn-group">
                                                                        <button type="button" class="btn btn-secondary btn-sm fw-bold">Sort By:</button>
                                                                        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                                                            <i class="mdi mdi-chevron-down"></i>
                                                                        </button>
                                                                        <div class="dropdown-menu" style="">
                                                                            <a class="dropdown-item" :class="sortBy==='lastModified' ? 'active':''" href="#" @click="toggleSortOrder('lastModified','asc')">Date Modified

                                                                                  <i v-if="sortBy==='lastModified'" :class="['mdi',
                                                                                    sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 
                                                                                    'text me-1'
                                                                                    ]">
                                                                                </i>
                                                                            </a>
                                                                            <a class="dropdown-item" :class="sortBy==='fileName' ? 'active':''" href="#" @click="toggleSortOrder('fileName','asc')">File Name

                                                                                <i v-if="sortBy==='fileName'" :class="['mdi',
                                                                                    sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 
                                                                                    'text me-1'
                                                                                    ]">
                                                                                </i>
                                                                            </a>
                                                                            <a class="dropdown-item" :class="sortBy==='size' ? 'active':''" href="#" @click="toggleSortOrder('size','asc')">File Size
                                                                                <i v-if="sortBy==='size'" :class="['mdi',
                                                                                    sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 
                                                                                    'text me-1'
                                                                                    ]">
                                                                                </i>
                                                                            </a>
                                                                            <a class="dropdown-item" :class="sortBy==='uploadDate' ? 'active':''" href="#" @click="toggleSortOrder('dateAdded','asc')">
                                                                                Date Added

                                                                                 <i v-if="sortBy==='dateAdded'" :class="['mdi',
                                                                                    sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 
                                                                                    'text me-1'
                                                                                    ]">
                                                                                </i>
                                                                            </a>
                                                                            <div class="dropdown-divider"></div>
                                                                            <a class="dropdown-item" href="#">Separated link</a>
                                                                        </div>
                                                                    </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                   

                                                </div>
                                               <div class="col-12">
                                                    <div class="w-100 px-3">
                                                        <div class="row">
                                                            <template v-if="files.length !== 0">
                                                                <div 
                                                                    v-for="file in files" 
                                                                    :key="file.id" 
                                                                    class="col-sm-6 col-md-4 col-lg-3  mb-4 "
                                                                   
                                                                    @click="toggleFileSelection(file.id, $event)">
                                                                    <div 
                                                                        class="d-flex flex-column align-items-center border-rounded cursor-pointer h-100 bg-light"
                                                                         :class="['gridCell', isFileSelected(file.id) ? 'active border-2' : '']"
                                                                    >
                                                                        <div class="d-flex w-100 justify-content-between align-items-center px-4 pt-2 position-relative">
                                                                            <div class="form-check  ">
                                                                                <input class="form-check-input checkbox-lg" type="checkbox"
                                                                                    :id="'gridFileCheck' + file.id"
                                                                                    @click.stop="toggleFileSelection(file.id, $event)"
                                                                                    :checked="isFileSelected(file.id)" /> 
                                                                                    
                                                                            </div>
                                                                            <div> 
                                                                                <ul
                                                                                    class="list-inline font-size-20 contact-links mb-0">

                                                                                    <li
                                                                                        class="list-inline-item px-2 dropdown">
                                                                                        <a href="javascript: void(0);"
                                                                                            title="More Actions"
                                                                                            class="text-decoration-none"
                                                                                            data-bs-toggle="dropdown"
                                                                                            @click="clearAllSelections">
                                                                                            <i
                                                                                                class="bx bx-dots-horizontal-rounded"></i>
                                                                                        </a>
                                                                                        <ul class="dropdown-menu p-2"
                                                                                            data-bs-auto-close="true">
                                                                                            <li>
                                                                                                <a class="dropdown-item"
                                                                                                    :href="file.fileUrl"
                                                                                                    @click.stop
                                                                                                    target="_blank"
                                                                                                    title="Open in New Tab">
                                                                                                    <i
                                                                                                        class="bx bx-folder-open me-2"></i>Open
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a class="dropdown-item"
                                                                                                    href="javascript:void(0);"
                                                                                                    data-bs-toggle="modal"
                                                                                                    data-bs-target="#visibilityModal"
                                                                                                    @click.stop>
                                                                                                    <i
                                                                                                        class="bx bx-lock me-2"></i>Manage
                                                                                                    visibility
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a class="dropdown-item"
                                                                                                    href="javascript:void(0);"
                                                                                                    data-bs-toggle="modal"
                                                                                                    data-bs-target="#editFileModal"
                                                                                                    @click.stop>
                                                                                                    <i
                                                                                                        class="bx bx-rename me-2"></i>Rename
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a class="dropdown-item"
                                                                                                    href="javascript:void(0);"
                                                                                                    data-bs-toggle="modal"
                                                                                                    data-bs-target="#replaceFileModal"
                                                                                                    @click.stop>
                                                                                                    <i
                                                                                                        class="bx bx-sync me-2"></i>Change
                                                                                                    file
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a class="dropdown-item"
                                                                                                    href="javascript:void(0);">
                                                                                                    <i
                                                                                                        class="bx bx-folder-plus me-2"></i>Move
                                                                                                    to
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a class="dropdown-item"
                                                                                                    href="javascript:void(0);">
                                                                                                    <i
                                                                                                        class="bx bx-history me-2"></i>Version
                                                                                                    history
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a class="dropdown-item"
                                                                                                    :href="file.fileUrl"
                                                                                                    download>
                                                                                                    <i
                                                                                                        class="bx bx-download me-2"></i>Download
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a class="dropdown-item"
                                                                                                    href="javascript:void(0);"
                                                                                                    data-bs-toggle="modal"
                                                                                                    data-bs-target="#deleteFileModal"
                                                                                                    @click.stop>
                                                                                                    <i
                                                                                                        class="bx bx-trash me-2"></i>Delete
                                                                                                </a>
                                                                                            </li>
                                                                                            <li>
                                                                                                <a @click="toggleDetailsPanel"
                                                                                                    @click.stop
                                                                                                    class="dropdown-item"
                                                                                                    href="javascript:void(0);">
                                                                                                    <i
                                                                                                        class="bx bx-info-circle me-2"></i>Details
                                                                                                </a>
                                                                                            </li>
                                                                                        </ul>
                                                                                    </li>
                                                                                    
                                                                                </ul>
                                                                            </div>

                                                                        </div>
                                                                        <div class="px-4 pt-4">
                                                                            <div class="d-flex flex-column align-items-center position-relative">
                                                                                <img :src="getFileIcon(file.fileType, file.fileName)"
                                                                                    :alt="file.fileType + ' icon'"
                                                                                    class="file-icon mb-3" height="65px"
                                                                                    style="" />
                                                                                <!-- <img src="../../assets/images/icons/v2/folder_15826202.png" style="height: 32px;" alt=""> -->

                                                                                <div class="position-absolute bottom-0 right-0" style="right:0px">
                                                                                    <div class="avatar-xs m-0">
                                                                                        <span :class="!file.public ? 'bg-secondary' : 'bg-primary'" class="avatar-title rounded-circle text-white font-size-20 bg-opacity-75">
                                                                                            <i v-if="!file.public" class="bx bx bx-lock-alt"></i>
                                                                                            <i v-if="file.public" class="bx bx bx-globe "></i>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div class="px-4 w-100">
                                                                            <h class="truncate-multiline text-center w-100 text-black fw-semibold mb-3">{{ file.fileName }}</h>
                                                                            <p class="text-center text-uppercase">.{{ file.fileType }}</p>
                                                                        </div>
                                                                        <div class="d-flex w-100 justify-content-between align-items-center pb-4 mt-auto border-top pt-3">
                                                                            <div class="px-4">
                                                                                <span>{{ formatFileSizeForDisplay(file.fileSize) }}</span>
                                                                            </div>
                                                                            <div class="px-4 text-right">
                                                                                <span class="truncate-singleLine">{{ formatDate(file.lastModified) }}</span>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </template>
                                                            
                                                        </div>
                                                    </div>                                                   
                                                </div>
                                               

                                            </div>
                                       </div>

                                    </template>

                                    <template v-if="viewType==='list'">
                                         <div class="table-responsive">
                                            <table class="table verticle-middle table-hover mb-0 doc-table">
                                                <thead class="table-secondary">
                                                    <tr>
                                                        <th class="pl-5 pr-0" width="20px">
                                                            <div class="form-check mb-0">
                                                                <input class="form-check-input checkbox-lg" type="checkbox"
                                                                    id="formCheck2" @click="selectAllFiles"
                                                                    :checked="selectedFiles.size === files.length && files.length > 0"
                                                                    :indeterminate="selectedFiles.size > 0 && selectedFiles.size < files.length">
                                                            </div>
                                                        </th>
                                                        <th 
                                                            title="sort by File Name"
                                                            class="waves-effect "
                                                            @click="toggleSortOrder('fileName','asc')"
                                                        >
                                                        <div 
                                                                class=" cursor-pointer align-items-center gap-1 d-flex"
                                                            > 
                                                                <i v-if="sortBy==='fileName'" :class="['mdi',
                                                                    sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 
                                                                    'text me-1'
                                                                    ]">
                                                                </i>
                                                                <span>Name</span>
                                                            </div>
                                                        </th>
                                                        <th></th>
                                                        <th v-if="allColumns.find(c => c.key === 'lastModified')?.visible"
                                                            title="sort by date last modified"
                                                            class="waves-effect "
                                                            @click="toggleSortOrder('lastModified')"
                                                        >
                                                        <div 
                                                                class=" cursor-pointer align-items-center gap-1 d-flex"
                                                            > 
                                                                <i v-if="sortBy==='lastModified'" :class="['mdi',
                                                                    sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 
                                                                    'text me-1'
                                                                    ]">
                                                                </i>
                                                                <span>Modified</span>
                                                            </div>
                                                        </th>
                                                        <th v-if="allColumns.find(c => c.key === 'owner')?.visible"
                                                            title="sort by File Name"
                                                            class="waves-effect "
                                                            @click="toggleSortOrder('fname','asc')"
                                                        >
                                                        <div 
                                                                class=" cursor-pointer align-items-center gap-1 d-flex"
                                                            > 
                                                                <i v-if="sortBy==='fname'" :class="['mdi',
                                                                    sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 
                                                                    'text me-1'
                                                                    ]">
                                                                </i>
                                                                <span>Added By</span>
                                                            </div>
                                                        </th>
                                                        <th v-if="allColumns.find(c => c.key === 'visibility')?.visible"
                                                            title="sort by File Name"
                                                            class="waves-effect "
                                                            @click="toggleSortOrder('public','asc')"
                                                        >
                                                        <div 
                                                                class=" cursor-pointer align-items-center gap-1 d-flex"
                                                            > 
                                                                <i v-if="sortBy==='public'" :class="['mdi',
                                                                    sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 
                                                                    'text me-1'
                                                                    ]">
                                                                </i>
                                                                <span>Visibility</span>
                                                            </div>
                                                        </th>
                                                        <th  v-if="allColumns.find(c => c.key === 'size')?.visible"
                                                            @click="toggleSortOrder('fileSize')"
                                                            title="Sort by file Size"
                                                            class="text-right pr-4 waves-effect justify-content-end align-items-center ">
                                                            <div 
                                                                class=" cursor-pointer w-100 h-100  align-items-center gap-1 text-right d-flex"
                                                            > 
                                                                <i v-if="sortBy==='fileSize'" :class="['mdi',
                                                                    sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down', 
                                                                    'text me-1'
                                                                    ]">
                                                                </i>
                                                                <span>Size</span>
                                                            </div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <template v-if="files.length !== 0">
                                                        <tr v-for="file in files" :key="file.id"
                                                            :class="{ 'active': isFileSelected(file.id) }"
                                                            @click="toggleFileSelection(file.id, $event)">
                                                            <td class="pl-4 pr-0" width="20px">
                                                                <div class="form-check mb-0">
                                                                    <input
                                                                        class="form-check-input checkbox-lg border-2 border-dark"
                                                                        type="checkbox" :id="'formCheck' + file.id"
                                                                        @click="toggleFileSelection(file.id, $event)"
                                                                        :checked="isFileSelected(file.id)"
                                                                        style="opacity: 0; pointer-events: none; transition: opacity 0.2s;">
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div class="d-flex gap-1 align-items-center"
                                                                    :title="file.fileName">
                                                                    <div style="margin-right: 10px;">
                                                                        <img :src="getFileIcon(file.fileType, file.fileName)"
                                                                            :alt="file.fileType + ' icon'" class="file-icon"
                                                                            width="32px" style="" />
                                                                        <!-- <img src="../../assets/images/icons/v2/folder_15826202.png" style="height: 32px;" alt=""> -->
                                                                    </div>
                                                                    <div>
                                                                        <span
                                                                            class="truncate-singleLine flex-grow-1 min-width-0"
                                                                            style="width: 100%;">{{ file.fileName }}</span>
                                                                        <small class="text-capitalize text-muted d-none">
                                                                            {{ file.public ? 'Public' : 'Private' }}
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td class="p-0">
                                                                <ul class="list-inline font-size-20 contact-links mb-0">

                                                                    <li class="list-inline-item px-2 dropdown">
                                                                        <a href="javascript: void(0);" title="More Actions"
                                                                            class="text-decoration-none"
                                                                            data-bs-toggle="dropdown"
                                                                            @click="clearAllSelections">
                                                                            <i class="bx bx-dots-horizontal-rounded"></i>
                                                                        </a>
                                                                        <ul class="dropdown-menu p-2" data-bs-auto-close="true">
                                                                            <li>
                                                                                <a class="dropdown-item" :href="file.fileUrl"
                                                                                    @click.stop target="_blank"
                                                                                    title="Open in New Tab">
                                                                                    <i class="bx bx-folder-open me-2"></i>Open
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a class="dropdown-item"
                                                                                    href="javascript:void(0);"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#visibilityModal"
                                                                                    @click.stop>
                                                                                    <i class="bx bx-lock me-2"></i>Manage
                                                                                    visibility
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a class="dropdown-item"
                                                                                    href="javascript:void(0);"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#editFileModal" @click.stop>
                                                                                    <i class="bx bx-rename me-2"></i>Rename
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a class="dropdown-item"
                                                                                    href="javascript:void(0);"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#replaceFileModal"
                                                                                    @click.stop>
                                                                                    <i class="bx bx-sync me-2"></i>Change file
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a class="dropdown-item"
                                                                                    href="javascript:void(0);">
                                                                                    <i class="bx bx-folder-plus me-2"></i>Move
                                                                                    to
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a class="dropdown-item"
                                                                                    href="javascript:void(0);">
                                                                                    <i class="bx bx-history me-2"></i>Version
                                                                                    history
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a
                                                                                    class="dropdown-item"
                                                                                    :href="file.fileUrl"
                                                                                    download
                                                                                    >
                                                                                    <i class="bx bx-download me-2"></i>Download
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a class="dropdown-item"
                                                                                    href="javascript:void(0);"
                                                                                    data-bs-toggle="modal"
                                                                                    data-bs-target="#deleteFileModal"
                                                                                    @click.stop>
                                                                                    <i class="bx bx-trash me-2"></i>Delete
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a @click="toggleDetailsPanel" @click.stop
                                                                                    class="dropdown-item"
                                                                                    href="javascript:void(0);">
                                                                                    <i
                                                                                        class="bx bx-info-circle me-2"></i>Details
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </li>

                                                                    <!-- for smaller screens -->
                                                                    <li class="list-inline-item px-2 d-inline d-lg-none"
                                                                        data-bs-toggle="offcanvas"
                                                                        data-bs-target="#detailsAside" aria-controls="offcanvasRight"                                                                
                                                                    >
                                                                        <a @click="toggleDetailsPanel"
                                                                            href="javascript: void(0);" title="More Details"><i
                                                                                class="bx bx-info-circle "></i></a>
                                                                    </li>
                                                                    <!-- info for bigger screens -->
                                                                    <li class="list-inline-item px-2 d-lg-inline d-none">
                                                                        <a @click="toggleDetailsPanel"
                                                                            href="javascript: void(0);" title="More Details"><i
                                                                                class="bx bx-info-circle "></i></a>
                                                                    </li>
                                                                </ul>

                                                            </td>
                                                            <td v-if="allColumns.find(c => c.key === 'lastModified')?.visible" :title="formatDateTime(file.lastModified)">
                                                                <span
                                                                    class="truncate-singleLine flex-grow-1 min-width-0 text-capitalize">
                                                                    {{ smartDate(file.lastModified, { showTime: true }) }}
                                                                </span>
                                                            </td>
                                                            <td v-if="allColumns.find(c => c.key === 'owner')?.visible">
                                                                <div class="d-flex gap-2 align-items-center">
                                                                    <div class="avatar-xs d-flex">
                                                                        <span :class="getRandomAvatarColor()" class="avatar-title rounded-circle  fw-bold">
                                                                            {{ getInitials(file.fname, file.lname) }}
                                                                        </span>
                                                                    </div>
                                                                    
                                                                    <span class="text-capitalize truncate-singleLine flex-grow-1 min-width-0">
                                                                        {{ file.fname }} {{ file.lname }}
                                                                    </span>
                                                                </div>

                                                            </td>
                                                            <td v-if="allColumns.find(c => c.key === 'visibility')?.visible">
                                                                <div :class="file.public? 'badge-soft-primary' : 'badge-soft-secondary'" class="badge rounded-pill  px-2 text-uppercase">
                                                                    <span data-bs-toggle="modal" data-bs-target="#visibilityModal"
                                                                        class="text-capitalize  text-dark truncate-singleLine flex-grow-1 min-width-0 d-flex gap-1 align-items-center cursor-pointer">
                                                                        <i :class="file.public ? 'bx bx-globe fs-5' : 'bx bx bx-lock-alt fs-5'"></i>
                                                                        {{ file.public ? ' Public' : ' Private' }}
                                                                    </span>
                                                                </div>
                                                                
                                                            </td>
                                                            <td v-if="allColumns.find(c => c.key === 'size')?.visible" class="text-right pr-4 "><span
                                                                    class="text-capitalize truncate-singleLine flex-grow-1 min-width-0">{{
                                                                        formatFileSizeForDisplay(file.fileSize) }}</span>
                                                            </td>
                                                        </tr>
                                                    </template>
                                                    <template v-if="loadingFileData || isLoadMoreLoading">
                                                        <!-- Row 1 -->
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <div class="d-flex align-items-center">
                                                                    <SkeletonLoader width="32px" height="35px" />
                                                                    <SkeletonLoader type="text" :lines="1" width="100%"
                                                                        lastLineWidth="70%" class="mx-2" height="15px" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="30px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="100%"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="100%"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="100%"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="30px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                        </tr>

                                                        <!-- Row 2 -->
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <div class="d-flex align-items-center">
                                                                    <SkeletonLoader width="32px" height="35px" />
                                                                    <SkeletonLoader type="text" :lines="1" width="70%"
                                                                        lastLineWidth="70%" class="mx-2" height="15px" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="30px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="50%"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="60%"
                                                                    lastLineWidth="10%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="100%"
                                                                    lastLineWidth="100%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="30px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                        </tr>

                                                        <!-- Row 3 -->
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <div class="d-flex align-items-center">
                                                                    <SkeletonLoader width="32px" height="35px" />
                                                                    <SkeletonLoader type="text" :lines="1" width="85%"
                                                                        lastLineWidth="85%" class="mx-2" height="15px" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="25px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="80%"
                                                                    lastLineWidth="80%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="90%"
                                                                    lastLineWidth="90%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="75%"
                                                                    lastLineWidth="75%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="35px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                        </tr>

                                                        <!-- Row 4 -->
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <div class="d-flex align-items-center">
                                                                    <SkeletonLoader width="32px" height="35px" />
                                                                    <SkeletonLoader type="text" :lines="1" width="60%"
                                                                        lastLineWidth="60%" class="mx-2" height="15px" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="40px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="30%"
                                                                    lastLineWidth="30%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="40%"
                                                                    lastLineWidth="40%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="95%"
                                                                    lastLineWidth="95%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="28px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                        </tr>

                                                        <!-- Row 5 -->
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <div class="d-flex align-items-center">
                                                                    <SkeletonLoader width="32px" height="35px" />
                                                                    <SkeletonLoader type="text" :lines="1" width="95%"
                                                                        lastLineWidth="95%" class="mx-2" height="15px" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="35px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="65%"
                                                                    lastLineWidth="65%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="55%"
                                                                    lastLineWidth="55%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="85%"
                                                                    lastLineWidth="85%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="32px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                        </tr>

                                                        <!-- Row 6 -->
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <div class="d-flex align-items-center">
                                                                    <SkeletonLoader width="32px" height="35px" />
                                                                    <SkeletonLoader type="text" :lines="1" width="45%"
                                                                        lastLineWidth="45%" class="mx-2" height="15px" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="20px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="90%"
                                                                    lastLineWidth="90%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="70%"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="50%"
                                                                    lastLineWidth="50%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="25px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                        </tr>

                                                        <!-- Row 6 -->
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <div class="d-flex align-items-center">
                                                                    <SkeletonLoader width="32px" height="35px" />
                                                                    <SkeletonLoader type="text" :lines="1" width="45%"
                                                                        lastLineWidth="45%" class="mx-2" height="15px" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="20px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="90%"
                                                                    lastLineWidth="90%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="70%"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="50%"
                                                                    lastLineWidth="50%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="25px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <div class="d-flex align-items-center">
                                                                    <SkeletonLoader width="32px" height="35px" />
                                                                    <SkeletonLoader type="text" :lines="1" width="100%"
                                                                        lastLineWidth="70%" class="mx-2" height="15px" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="30px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="100%"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="100%"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="100%"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="30px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                        </tr>

                                                        <!-- Row 6 -->
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <div class="d-flex align-items-center">
                                                                    <SkeletonLoader width="32px" height="35px" />
                                                                    <SkeletonLoader type="text" :lines="1" width="45%"
                                                                        lastLineWidth="45%" class="mx-2" height="15px" />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="20px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="90%"
                                                                    lastLineWidth="90%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="70%"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="50%"
                                                                    lastLineWidth="50%" class="mx-2" height="15px" />
                                                            </td>
                                                            <td>
                                                                <SkeletonLoader type="text" :lines="1" width="25px"
                                                                    lastLineWidth="70%" class="mx-2" height="15px" />
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </tbody>
                                            </table>
                                        </div>
                                    </template>
                                   

                                   

                                    <table  class="table verticle-middle table-hover d-none">
                                        <thead class="table-light">
                                            <tr>
                                                <th class="pl-4 pr-0" width="20px">
                                                    <div class="form-check mb-0">
                                                        <input class="form-check-input checkbox-lg" type="checkbox"
                                                            id="formCheck2" checked>

                                                    </div>
                                                </th>
                                                <th>Name</th>
                                                <th>Last Modified</th>
                                                <th class="text-right pr-4">Size</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="pl-4 pr-0">
                                                    <div class="form-check mb-0">
                                                        <input class="form-check-input" type="checkbox" id="formCheck1">

                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="d-flex gap-1 align-items-center">
                                                        <div>
                                                            <img src="../../assets/images/icons/v2/folder_15826202.png"
                                                                style="height: 32px;" alt="">
                                                        </div>
                                                        <span>Document for doing AbC</span>
                                                    </div>
                                                </td>
                                                <td>July 1, 2018</td>
                                                <td class="text-right pr-4">34 MB</td>
                                            </tr>
                                            <tr>
                                                <td class="pl-4 pr-0">
                                                    <div class="form-check mb-0">
                                                        <input class="form-check-input" type="checkbox" id="formCheck1">

                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="d-flex gap-1 align-items-center">
                                                        <div>
                                                            <img src="../../assets/images/icons/v2/present_11895553.png"
                                                                style="height: 32px;" alt="">
                                                        </div>
                                                        <span>Document for doing AbC</span>
                                                    </div>
                                                </td>
                                                <td>July 1, 2018</td>
                                                <td class="text-right pr-4">34 MB</td>
                                            </tr>
                                            <tr>
                                                <td class="pl-4">

                                                </td>
                                                <td>
                                                    <div class="d-flex gap-1 align-items-center">
                                                        <div>
                                                            <img src="../../assets/images/icons/v2/word-processor_11895551.png"
                                                                style="height: 32px;" alt="">
                                                        </div>
                                                        <span>Document for doing AbC</span>
                                                    </div>
                                                </td>
                                                <td>July 1, 2018</td>
                                                <td class="text-right pr-4">34 MB</td>
                                            </tr>
                                            <tr>
                                                <td class="pl-4">

                                                </td>
                                                <td>
                                                    <div class="d-flex gap-1 align-items-center">
                                                        <div>
                                                            <img src="../../assets/images/icons/v2/paper_11895616.png"
                                                                style="height: 32px;" alt="">
                                                        </div>
                                                        <span>Document for doing AbC</span>
                                                    </div>
                                                </td>
                                                <td>July 1, 2018</td>
                                                <td class="text-right pr-4">34 MB</td>
                                            </tr>
                                            <tr>
                                                <td class="pl-4">

                                                </td>
                                                <td>
                                                    <div class="d-flex gap-1 align-items-center">
                                                        <div>
                                                            <img src="../../assets/images/icons/v2/sheet.png"
                                                                style="height: 32px;" alt="">
                                                        </div>
                                                        <span>Document for doing AbC</span>
                                                    </div>
                                                </td>
                                                <td>July 1, 2018</td>
                                                <td class="text-right pr-4">34 MB</td>
                                            </tr>
                                            <tr>
                                                <td class="pl-4">

                                                </td>
                                                <td>
                                                    <div class="d-flex gap-1 align-items-center">
                                                        <div>
                                                            <img src="../../assets/images/icons/jpeg.png"
                                                                style="height: 32px;" alt="">
                                                        </div>
                                                        <span>Document for doing AbC</span>
                                                    </div>
                                                </td>
                                                <td>July 1, 2018</td>
                                                <td class="text-right pr-4">34 MB</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                   <div class="row">
                                        <div class="col-12">
                                            <div class="p-3 text-center">
                                                <!-- Button with inline loader -->
                                                <button 
                                                    class="btn btn-dark btn-lg px-4 mb-2"
                                                    :class="{ 'd-none': !hasMore }"
                                                    @click="loadMoreFiles"
                                                    :disabled="!hasMore || isLoadMoreLoading"
                                                >
                                                    <template v-if="isLoadMoreLoading">
                                                        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
                                                        Loading...
                                                    </template>
                                                    <template v-else-if="!hasMore" >
                                                        <i class="bx bx-check me-2"></i>
                                                        All Files Loaded
                                                    </template>
                                                    <template v-else >
                                                        <i class="bx bx-plus me-2"></i>
                                                        Load More Files
                                                    </template>
                                                </button>
                                                
                                                <!-- Status messages -->
                                                <div class="mt-0">
                                                    <p v-if="!hasMore && files.length > 0" class="text-muted mb-0 small">
                                                        <i class="bx bx-check-circle text-success me-1"></i>
                                                        Showing all {{ files.length }} files
                                                    </p>
                                                    <p v-if="files.length === 0 && !loadingFileData" class="text-muted mb-0 small">
                                                        <i class="bx bx-info-circle me-1"></i>
                                                        No files to display
                                                    </p>
                                                    <p v-if="files.length > 0 && hasMore" class="text-muted mb-0 small">
                                                        Page {{ currentPage }} of {{ totalPages }} • 
                                                        {{ files.length }} of {{ totalFiles }} files
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                            <div v-if="showMore" class="card-bar bg-light d-xl-block d-none">
                                <div class="card-body d-flex gap-3 justify-content-between align-items-center pb-0">
                                    <h4 class="card-title">More Information</h4>
                                    <ul class="list-inline font-size-20 contact-links mb-0 m-0">

                                        <li class="list-inline-item p-1 m-0" @click="toggleDetailsPanel">
                                            <a href="javascript: void(0);" class="m-0" title="Close Panel"><i
                                                    class="bx bx-x fs-1 m-0"></i></a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="card-body pt-0" v-if="selectedFiles.size == 0">
                                    <div v-if="loadCategories" class="text-center my-5">
                                       <div class="p-0 d-flex flex-column align-items-center justify-content-center">
                                             <SkeletonLoader 
                                                width="150px" 
                                                height="150px" 
                                                 type="circle" 
                                                 class="mb-3"
                                            />

                                            <SkeletonLoader 
                                                type="text" 
                                                :lines="1" 
                                                width="70%" 
                                                lastLineWidth="70%" 
                                                class="mb-2" 
                                                height="20px"                                                    
                                            />

                                             <SkeletonLoader 
                                               
                                                :lines="1" 
                                                width="50%" 
                                                lastLineWidth="50%" 
                                                class="mb-2" 
                                                height="10px"                                                    
                                            />
                                       </div>
                                       <div class="mt-3">
                                            <div>
                                                <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            </div>
                                       </div>
                                   </div>

                                   <div v-else>
                                        <div class="p-0 d-flex align-items-center justify-content-center">
                                            <div>
                                                <DonutChart :utilized="100" :total="400" unit="GB"
                                                    utilizedLabel="Used Space" remainingLabel="Free Space" />
                                            </div>
                                        </div>
                                        <div class="mt-0">
                                            <div v-for="info in storageInfo" :key="info.id"
                                                class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="avatar-title rounded bg-transparent text-success font-size-20">
                                                                    <img :src="getFileIcon(info.File, info.File)"
                                                                        :alt="info.File + ' icon'" class="file-icon"
                                                                        height="32px">
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize">
                                                                    {{ info.File }}</h5>
                                                                <p class="text-muted text-truncate mb-0">{{ info.Count }}
                                                                    Files</p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    {{ formatFileSizeForDisplay(info.Size) }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                   </div>

                                </div>
                                <div class="card-body pt-0" v-if="selectedFiles.size !=0">

                                    <!-- file preview -->
                                     <FilePreview 
                                        :fileUrl="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileUrl"
                                        :fileName="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileName"
                                        :fileTypeExt="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileType" 
                                        
                                        class="mb-3"    
                                    />

                                   

                                     

                                   


                                    <!-- file Preview -->
                                     <div class="mt-0 d-none">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body w-100">
                                                <div class="p-3 w-100">
                                                    <div class="d-flex w-100">
                                                        <div class="overflow-hidden me-auto d-flex align-items-center justify-content-center w-100">
                                                            <img :src="getFileIcon(files.find(f => f.id === Array.from(selectedFiles)[0])?.fileType, files.find(f => f.id === Array.from(selectedFiles)[0])?.fileName)"
                                                                :alt="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileType + ' icon'" class="file-icon"
                                                                width="150px" style="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                     </div>
                                    <!-- File Name -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                File name</h5>
                                                            <p class="text-muted mb-0">
                                                                {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.fileName || '' }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- File Name -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Document Category</h5>
                                                            <p class="text-muted mb-0">
                                                                {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.category || '' }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- File Type -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                File type</h5>
                                                            <p class="text-muted text-truncate mb-0 text-uppercase">{{ files.find(f => f.id === Array.from(selectedFiles).pop())?.fileType || '' }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- File Size -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Size</h5>
                                                            <p class="text-muted text-truncate mb-0">{{ formatFileSizeForDisplay(files.find(f => f.id === Array.from(selectedFiles).pop())?.fileSize) }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Created Date -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Created</h5>
                                                            <p class="text-muted text-truncate mb-0">
                                                                {{ formatDateTime(files.find(f => f.id === Array.from(selectedFiles)[0])?.createdAt) }}
                                                                by 
                                                                <a href="" class="text-capitalize" title="View User Profile">
                                                                    {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.fname || '' }}
                                                                    {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.lname || '' }}
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Last Modified -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Last modified</h5>
                                                            <p class="text-muted text-truncate mb-0">
                                                                {{ formatDateTime(files.find(f => f.id === Array.from(selectedFiles).pop())?.lastModified) }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Location -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Location</h5>
                                                            <p class="text-muted text-truncate mb-0">
                                                                /Documents/Reports/Q3/</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                   
                                    <!-- Pages (for documents) -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Pages</h5>
                                                            <p class="text-muted text-truncate mb-0">48 pages</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                   

                                    <!-- Security -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-2 text-black fw-semibold text-capitalize">
                                                                Document Visibility</h5>
                                                            <p class="text-muted text-truncate mb-0 d-flex align-items-center gap-1">
                                                                <i :class="files.find(f => f.id === Array.from(selectedFiles)[0])?.public ? 'bx bx-globe fs-4' : 'bx bx bx-lock-alt fs-4'"></i>
                                                                {{ files.find(f => f.id === Array.from(selectedFiles)[0])?.public ? 'Public - Visible to all users' : 'Private - Only accessable in the dashboard' }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Tags -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-2 text-black fw-semibold text-capitalize">
                                                                Tags</h5>
                                                            <div class="d-flex flex-wrap gap-1 mt-1">
                                                               <div class="badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">RCMS</div>
                                                               <div class="badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">RCMS 567</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>


                                </div>
                                <div class="card-body d-flex align-items-center justify-content-center h-75 d-none">

                                    <div class="empty-state d-flex align-items-center flex-column text-center">
                                        <div>
                                            <img src="../../assets/images/icons/files-folders-linear-icon_9206-15815.jpg"
                                                alt="" class="img opacity-70" height="140px">
                                        </div>
                                        <p>Select A file to View</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div  v-else-if="showEmptyState" class="card">
                            <div class="card-body">
                                <div class="p-3">
                                    <div class="row d-flex align-items-center justify-content-center text-center vh-75">
                                        <div class="col-12 col-md-11 col-lg-10 col-xl-8">
                                            <div class="text-center animate__animated animate__fadeIn">
                                                <div class="empty-state-icon mb-0">
                                                    <div>
                                                        <img src="../../assets/images/empty-states/emptyFolder.webp"
                                                            alt="" class="img" height="260px">
                                                    </div>

                                                </div>
                                                <h4 class="fw-bold text-dark mb-3 text-capitalize">It's empty in here
                                                </h4>
                                                <p class="text-muted mb-4 px-3 mx-auto" style="max-width: 530px;">
                                                    {{ isFiltering
                                                        ? "No matches for your search/filters. Try adjusting them or reset to view all files."
                                                        : "No files yet. Upload files or create a folder to get started."
                                                    }}
                                                </p>

                                                <div class="d-flex w-100">
                                                    

                                                    <div v-if="searchQuery!=''" class="flex-grow-1">
                                                        <div class="search-box mb-0 me-0">
                                                            <div class="position-relative">
                                                                     <form @submit.prevent="handleSearchInput(searchQuery)" class="input-group bg-light rounded mb-4 pb-4">
                                                                        <div class="flex-grow-1 ">
                                                                             <input 
                                                                             style="border-radius: 0px;"
                                                                                type="text" 
                                                                                class="form-control bg-light  rounded flex-grow-1"
                                                                                placeholder="Search..." 
                                                                                spellcheck="false" 
                                                                                data-ms-editor="true" 
                                                                                v-model="searchQuery"
                                                                               >
                                                                            <i class="bx bx-search-alt search-icon"></i>
                                                                            <i 
                                                                                 title="Clear search"
                                                                                style="right: 60px; left:unset" 
                                                                                class="mdi mdi-close search-icon cursor-pointer fs-2 waves-effect"
                                                                                @click="searchQuery = ''; handleSearchInput('')"
                                                                            >
                                                                            </i>
                                                                        </div>
                                                                         <button type="submit"  @click="handleSearchInput(searchQuery)" title="Click to search" class="btn btn-primary px-4" 
                                                                          id="button-addon2">
                                                                            <i class="bx bx-search-alt search-icon fs-4"></i>
                                                                        </button>

                                                                     </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="d-flex gap-3 justify-content-center text-capitalize">
                                                <button
                                                    class="btn btn-primary px-4 btn-lg d-flex align-items-center justify-content-center fw-semibold">
                                                    <i class="bx bx-cloud-upload me-2 fs-4"></i><span>Upload Files</span>
                                                </button>

                                                <button
                                                    class="btn btn-light px-4 border btn-lg d-flex align-items-center justify-content-center fw-semibold">
                                                    <i class="bx bx-folder-open me-2 fs-4"></i><span>Create Folder</span>
                                                </button>

                                                <button
                                                    @click="clearFilters()"
                                                    title="Click to fetch files again"
                                                    class="btn btn-light px-4 border btn-lg d-flex align-items-center justify-content-center fw-semibold">
                                                    <i class="bx bx-repost me-2 fs-4"></i><span>Reset Filters</span>
                                                </button>
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
        </div>
    </div>

    <!-- modals for actions goes here -->
      <!-- renaming file modal -->
    
        <div>
            <RenameFile 
                :fileName="activeFile?.fileName"
                :fileId="activeFile?.id"
                :fileType="activeFile?.fileType"
                @file-renamed="handleFileRenamed" 
            />
            <!-- changing file visibility modal -->
            <FilesVisibility 
                :fileName="activeFile?.fileName"
                :fileId="activeFile?.id"
                :fileType="activeFile?.fileType"
                :fileVisibility="activeFile?.public"
                @visibility-updated="handleVisibilityUpdated" 
            />

            <!-- changing the file -->
            <!-- Add the ReplaceFileModal component -->
            <ChangeFile ref="replaceFileModalRef"
                :fileName="activeFile?.fileName"
                :fileId="activeFile?.id"
                :fileType="activeFile?.fileType"
                @file-replaced="handleFileReplaced" 
            />
            <DeleteFile :selectedFiles="Array.from(selectedFiles).map(id => {
                const file = files.find(f => f.id === id);
                return file ? {
                    id: file.id,
                    fileName: file.fileName,
                    fileType: file.fileType
                } : null;
            }).filter(Boolean)" @file-deleted="handleFileDeleted" @files-deleted="handleFilesDeleted" />
        </div>

        <!-- the aside canvas goes here -->
         <div class="row">
            <div class="col-12">

                 <button class="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#activityLogsAside" aria-controls="offcanvasRight">
                    Toggle right offcanvas
                </button>
            <!-- Offcanvas -->
                <div class="offcanvas offcanvas-end w-25" tabindex="-1" id="activityLogsAside"
                    aria-labelledby="offcanvasLabel">
                    <!-- SINGLE HEADER -->
                    <div class="offcanvas-header border-bottom">
                        <div class="d-flex align-items-center gap-2">
                            <button type="button" class="btn btn-white p-0 avatar-sm rounded-circle"
                                data-bs-dismiss="offcanvas" aria-label="Close">
                                <span class="avatar-title bg-transparent text-reset">
                                    <i class="bx bx-arrow-back font-size-22"></i>
                                </span>
                            </button>

                            <h5 id="offcanvasLabel" class="mb-0">Results Filter Options</h5>
                        </div>

                       
                    </div>

                    <!-- BODY -->
                    <div class="offcanvas-body p-0">
                       
                        <!-- file types -->
                        <div class="px-4 py-2 fw-bold border-top bg-light">
                            File Types
                        </div>
                        <div class="p-3 border-top">
                            <div class="d-flex flex-wrap gap-2 d">
                                <button @click="FilterFileType = ''; getFiles(true);isFiltering = false"  type="button" :class="{'active': FilterFileType === ''}" class="btn btn-sm fw-bold btn-light btn-rounded waves-effect px-4 text-nowrap flex-shrink-0 mb-1">All</button>
                                <button 
                                    v-for="fileType in storageInfo" :key="fileType.id"
                                    type="button" 
                                    @click="FilterFileType = fileType.File; isFiltering = true; getFiles(true)"
                                        :class="{'active': FilterFileType === fileType.File}"
                                    class="btn  fw-bold btn-light btn-rounded waves-effect px-4 text-nowrap flex-shrink-0 mb-1"
                                >
                                    {{ fileType.File }}
                                </button>
                            </div>
                        </div>

                        <!-- File categories -->
                          <div class="px-4 py-2 fw-bold border-top bg-light">
                            File Category
                        </div>
                        <div class="p-3 border-top">
                            <div class="d-flex flex-wrap gap-2 d-non">
                                <button  @click="FilterCategory = ''; getFiles(true);isFiltering = false"  type="button" :class="{'active': FilterCategory === ''}" class="btn  fw-bold btn-light btn-rounded waves-effect px-4 text-nowrap flex-shrink-0 mb-1">All</button>
                                <button 
                                    v-for="category in categories" :key="category.id"
                                    type="button" 
                                    class="btn fw-bold btn-light btn-rounded waves-effect px-4 text-nowrap flex-shrink-0 mb-1"
                                    :class="{'active': FilterCategory === category.name}"
                                    @click="FilterCategory = category.name; getFiles(true);isFiltering = true"
                                >
                                    {{ category.name }}
                                </button>
                            </div>
                        </div>
                         <div class="px-4 py-2 fw-bold border-top bg-light">
                            Filter By Visibility
                        </div>
                        <div class="p-3 border-top">
                            <div class="d-flex flex-wrap gap-2">
                                <button @click="FilterVisibility = ''; getFiles(true);"  type="button" :class="{'active': FilterVisibility === ''}" class="btn  fw-bold btn-light btn-rounded waves-effect px-4 text-nowrap flex-shrink-0">All</button>
                                <button @click="FilterVisibility = 'true'; getFiles(true);isFiltering = true"  type="button" :class="{'active': FilterVisibility === 'true'}" class="btn  fw-bold btn-light btn-rounded waves-effect px-4 text-nowrap flex-shrink-0">Public</button>   
                                <button @click="FilterVisibility = 'false'; getFiles(true);isFiltering = true"  type="button" :class="{'active': FilterVisibility === 'false'}" class="btn  fw-bold btn-light btn-rounded waves-effect px-4 text-nowrap flex-shrink-0">Private</button>                                                                 

                            </div>
                        </div>
                         <div class="px-4 py-2 fw-bold border-top bg-light">
                            Filter By Dates
                        </div>
                        <div class="p-3 border-top">
                            <div>
                                <p data-v-a33a6162="" data-v-0330a191="" class="text-muted fw-normal font-size-12   mb-2">Filter results by selecting a specific date range</p>
                            </div>
                                <div class="d-flex flex-wrap gap-2">
                                    <h5 data-v-3d70450d="" class="font-size-13">Date type</h5>
                                </div>
                            <div>
                                <select
                                class="form-select mb-3"
                                id="date-filter-type"
                                aria-label="Select date field to filter by"
                                @change="onDateFilterTypeChange"
                                >
                                    <option value="" disabled selected>
                                        Filter by date type
                                    </option>

                                    <option value="lastModified">Last Modified Date</option>
                                    <option value="uploadDate">Upload Date</option>
                                    <option value="createdAt">Creation Date</option>
                                </select>
                                <div class="d-flex flex-wrap gap-2">
                                    <Datepicker 
                                        class="w-100" 
                                        id="DatePicker" 
                                        @date-change="onDateChange"
                                    />
                                </div>


                            </div>
                        </div>

                         <div class="px-4 py-2 fw-bold border-top bg-light">
                            Filter By File Sizes
                        </div>

                        <div class="p-3 border-top">
                            <p class="text-muted fw-normal font-size-12 mb-2">
                                Filter results by selecting a file size range.
                            </p>

                            <!-- Min / Max -->
                            <div class="d-flex align-items-center gap-2 mb-3">
                                <div class="input-group">
                                    <input
                                    type="number"
                                    class="form-control"
                                    placeholder="min"
                                    min="0"
                                    v-model.number="filterSizeMin"
                                    aria-label="Minimum file size"
                                    >
                                    <span class="input-group-text">MB</span>
                                </div>

                                <span class="text-muted fw-semibold">—</span>

                                <div class="input-group">
                                    <input
                                    type="number"
                                    class="form-control"
                                    placeholder="max"
                                    min="0"
                                    v-model.number="filterSizeMax"
                                    aria-label="Maximum file size"
                                    >
                                    <span class="input-group-text">MB</span>
                                </div>
                            </div>


                            <!-- Quick ranges -->
                           <div class="d-flex flex-column gap-2 mb-3">

                                <div class="form-check">
                                    <input
                                    class="form-check-input"
                                    type="radio"
                                    name="fileSizeRange"
                                    id="fileSize_all"
                                    value="all"
                                    v-model="fileSizePreset"
                                    @change="setFileSizeRange(null, null)"
                                    >
                                    <label class="form-check-label" for="fileSize_all">
                                    All files
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input
                                    class="form-check-input"
                                    type="radio"
                                    name="fileSizeRange"
                                    id="fileSize_under1"
                                    value="under1"
                                    v-model="fileSizePreset"
                                    @change="setFileSizeRange(0, 1)"
                                    >
                                    <label class="form-check-label" for="fileSize_under1">
                                    Under 1 MB
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input
                                    class="form-check-input"
                                    type="radio"
                                    name="fileSizeRange"
                                    id="fileSize_1to5"
                                    value="1to5"
                                    v-model="fileSizePreset"
                                    @change="setFileSizeRange(1, 5)"
                                    >
                                    <label class="form-check-label" for="fileSize_1to5">
                                    1 – 5 MB
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input
                                    class="form-check-input"
                                    type="radio"
                                    name="fileSizeRange"
                                    id="fileSize_5to25"
                                    value="5to25"
                                    v-model="fileSizePreset"
                                    @change="setFileSizeRange(5, 25)"
                                    >
                                    <label class="form-check-label" for="fileSize_5to25">
                                    5 – 25 MB
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input
                                    class="form-check-input"
                                    type="radio"
                                    name="fileSizeRange"
                                    id="fileSize_25to100"
                                    value="25to100"
                                    v-model="fileSizePreset"
                                    @change="setFileSizeRange(25, 100)"
                                    >
                                    <label class="form-check-label" for="fileSize_25to100">
                                    25 – 100 MB
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input
                                    class="form-check-input"
                                    type="radio"
                                    name="fileSizeRange"
                                    id="fileSize_over100"
                                    value="over100"
                                    v-model="fileSizePreset"
                                    @change="setFileSizeRange(100, null)"
                                    >
                                    <label class="form-check-label" for="fileSize_over100">
                                    More than 100 MB
                                    </label>
                                </div>

                            </div>

                            <div class="d-flex">
                                
                            </div>


                        </div>
                    </div>

                    <div class="offcanvas-footer p-3">
                        <button class="btn btn-secondary w-100" @click="clearFilters">Clear Filters</button>
                    </div>
                </div>
            </div>

         </div>

         <!-- aside for file details -->
           <div class="row">
            <div class="col-12">

                 <button class="btn btn-primary d-none" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#detailsAside" aria-controls="offcanvasRight">
                    Toggle right offcanvas
                </button>
            <!-- Offcanvas -->
                <div class="offcanvas offcanvas-end w-25" tabindex="-1" id="detailsAside"
                    aria-labelledby="offcanvasLabel">
                    <!-- SINGLE HEADER -->
                    <div class="offcanvas-header border-bottom">
                        <div class="d-flex align-items-center gap-2">
                            <button type="button" class="btn btn-white p-0 avatar-sm rounded-circle"
                                data-bs-dismiss="offcanvas" aria-label="Close">
                                <span class="avatar-title bg-transparent text-reset">
                                    <i class="bx bx-arrow-back font-size-22"></i>
                                </span>
                            </button>

                            <h5 id="offcanvasLabel" class="mb-0">More Information</h5>
                        </div>

                       
                    </div>

                    <!-- BODY -->
                    <div class="offcanvas-body p-0">
                       
                        <!-- file types -->
                        <div class="px-4 py-2 fw-bold border-top bg-light d-none">
                            File Types
                        </div>
                        <div class="p-3 border-top">
                           <template v-if="selectedFiles.size == 0">
                                <div v-if="loadCategories" class="text-center my-5">
                                       <div class="p-0 d-flex flex-column align-items-center justify-content-center">
                                             <SkeletonLoader 
                                                width="150px" 
                                                height="150px" 
                                                 type="circle" 
                                                 class="mb-3"
                                            />

                                            <SkeletonLoader 
                                                type="text" 
                                                :lines="1" 
                                                width="70%" 
                                                lastLineWidth="70%" 
                                                class="mb-2" 
                                                height="20px"                                                    
                                            />

                                             <SkeletonLoader 
                                               
                                                :lines="1" 
                                                width="50%" 
                                                lastLineWidth="50%" 
                                                class="mb-2" 
                                                height="10px"                                                    
                                            />
                                       </div>
                                       <div class="mt-3">
                                            <div>
                                                <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>

                                            <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            <div class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="rounded bg-transparent text-success font-size-20">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="100%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-2 " 
                                                                        height="32px"    
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto flex-grow-1 mx-1">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize ">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="50%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-1" 
                                                                        height="12px"   
                                                                    />    
                                                                </h5>
                                                                <p class="text-muted text-truncate mb-0">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30%" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px" 
                                                                    />
                                                                </p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    <SkeletonLoader
                                                                        type="text" 
                                                                        :lines="1" 
                                                                        width="30px" 
                                                                        lastLineWidth="70%" 
                                                                        class="mb-0" 
                                                                        height="12px"   
                                                                    />
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                            </div>
                                       </div>
                                   </div>

                                   <div v-else>
                                        <div class="p-0 d-flex align-items-center justify-content-center">
                                            <div>
                                                <DonutChart :utilized="100" :total="400" unit="GB"
                                                    utilizedLabel="Used Space" remainingLabel="Free Space" />
                                            </div>
                                        </div>
                                        <div class="mt-0">
                                            <div v-for="info in storageInfo" :key="info.id"
                                                class="card border shadow-none mb-2">
                                                <a href="javascript: void(0);" class="text-body">
                                                    <div class="p-3">
                                                        <div class="d-flex">
                                                            <div class="avatar-xs align-self-center me-2">
                                                                <div
                                                                    class="avatar-title rounded bg-transparent text-success font-size-20">
                                                                    <img :src="getFileIcon(info.File, info.File)"
                                                                        :alt="info.File + ' icon'" class="file-icon"
                                                                        height="32px">
                                                                </div>
                                                            </div>

                                                            <div class="overflow-hidden me-auto">
                                                                <h5
                                                                    class="font-size-13 text-truncate mb-1 text-black fw-semidold text-capitalize">
                                                                    {{ info.File }}</h5>
                                                                <p class="text-muted text-truncate mb-0">{{ info.Count }}
                                                                    Files</p>
                                                            </div>

                                                            <div
                                                                class="ms-2 d-flex align-items-center justify-content-center">
                                                                <p
                                                                    class="text-muted  text fs-6 fw-bold m-0 p-0  d-flex align-items-center justify-content-center text-dark">
                                                                    {{ formatFileSizeForDisplay(info.Size) }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                   </div>
                           </template>
                            <template v-if="selectedFiles.size !=0">

                                    <!-- file preview -->
                                     <FilePreview 
                                        :fileUrl="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileUrl"
                                        :fileName="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileName"
                                        :fileTypeExt="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileType" 
                                        
                                        class="mb-3"    
                                    />

                                   

                                     

                                   


                                    <!-- file Preview -->
                                     <div class="mt-0 d-none">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body w-100">
                                                <div class="p-3 w-100">
                                                    <div class="d-flex w-100">
                                                        <div class="overflow-hidden me-auto d-flex align-items-center justify-content-center w-100">
                                                            <img :src="getFileIcon(files.find(f => f.id === Array.from(selectedFiles)[0])?.fileType, files.find(f => f.id === Array.from(selectedFiles)[0])?.fileName)"
                                                                :alt="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileType + ' icon'" class="file-icon"
                                                                width="150px" style="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                     </div>
                                    <!-- File Name -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                File name</h5>
                                                            <p class="text-muted mb-0">
                                                                {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.fileName || '' }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- File Name -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Document Category</h5>
                                                            <p class="text-muted mb-0">
                                                                {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.category || '' }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- File Type -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                File type</h5>
                                                            <p class="text-muted text-truncate mb-0 text-uppercase">{{ files.find(f => f.id === Array.from(selectedFiles).pop())?.fileType || '' }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- File Size -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Size</h5>
                                                            <p class="text-muted text-truncate mb-0">{{ formatFileSizeForDisplay(files.find(f => f.id === Array.from(selectedFiles).pop())?.fileSize) }}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Created Date -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Created</h5>
                                                            <p class="text-muted text-truncate mb-0">
                                                                {{ formatDateTime(files.find(f => f.id === Array.from(selectedFiles)[0])?.createdAt) }}
                                                                by 
                                                                <a href="" class="text-capitalize" title="View User Profile">
                                                                    {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.fname || '' }}
                                                                    {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.lname || '' }}
                                                                </a>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Last Modified -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Last modified</h5>
                                                            <p class="text-muted text-truncate mb-0">
                                                                {{ formatDateTime(files.find(f => f.id === Array.from(selectedFiles).pop())?.lastModified) }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Location -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Location</h5>
                                                            <p class="text-muted text-truncate mb-0">
                                                                /Documents/Reports/Q3/</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                   
                                    <!-- Pages (for documents) -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-1 text-black fw-semibold text-capitalize">
                                                                Pages</h5>
                                                            <p class="text-muted text-truncate mb-0">48 pages</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                   

                                    <!-- Security -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-2 text-black fw-semibold text-capitalize">
                                                                Document Visibility</h5>
                                                            <p class="text-muted text-truncate mb-0 d-flex align-items-center gap-1">
                                                                <i :class="files.find(f => f.id === Array.from(selectedFiles)[0])?.public ? 'bx bx-globe fs-4' : 'bx bx bx-lock-alt fs-4'"></i>
                                                                {{ files.find(f => f.id === Array.from(selectedFiles)[0])?.public ? 'Public - Visible to all users' : 'Private - Only accessable in the dashboard' }}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>

                                    <!-- Tags -->
                                    <div class="mt-0">
                                        <div class="card border shadow-none mb-2">
                                            <a href="javascript: void(0);" class="text-body">
                                                <div class="p-3">
                                                    <div class="d-flex">
                                                        <div class="overflow-hidden me-auto">
                                                            <h5
                                                                class="font-size-13 text-truncate mb-2 text-black fw-semibold text-capitalize">
                                                                Tags</h5>
                                                            <div class="d-flex flex-wrap gap-1 mt-1">
                                                               <div class="badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">RCMS</div>
                                                               <div class="badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">RCMS 567</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>


                                </template>
                        </div>

                        
                       
                         
                    </div>
                </div>
            </div>

         </div>

          <FilesCategoryModal 
                :categories="loadedCategories"
                :showSelect="true"   
                @category-added="getCategories"        
            />

        <FilesFolderModal
            :folders="loadedFolders"
            :showSelect="true"
            @folder-added="getFolders"
            @folder-selected="(id) => fileFolder = id"
        />
</template>

<script setup>
// 🔧 Core Vue imports
import { ref, onMounted, computed,nextTick,onBeforeUnmount, watch  } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';

// importing loading components
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'
import SkeletonContainer from '@/components/Loaders/SkeletonContainer.vue'

import FilesCategoryModal from './files.category.modal.vue'
import FilesFolderModal from './files.folder.modal.vue'


import DonutChart from '@/components/Charts/Donut.Highchart.Progress.vue'
import FilePreview from '@/components/filesHandler/file.preview.vue'
import RenameFile from '@/pages/FileManager/files.rename.vue'
import DeleteFile from '@/pages/FileManager/files.delete.vue'
import FilesVisibility from '@/pages/FileManager/files.visibility.vue'
import ChangeFile from '@/pages/FileManager/files.change.vue'
import Datepicker from '@/components/Datepicker.material.vue'
// Import the utilities
import { getFileIcon } from '@/utils/fileIcons'
import { formatFileSize } from '@/utils/filesize'
import { formatCurrency, formatKES, formatCompact, formatUSD, formatAccounting } from '@/utils/currency.js';

import NProgress from "nprogress";//the proggress bar at the top


const diskUsage = ref(35); // Will automatically update the chart
const fileUrl = ref("https://filesamples.com/samples/document/zip/sample1.zip")

import {
    formatUploadDate,
    formatDateTime,
    smartDate,
    timeAgo,
    formatDate,
    getUserPreferences,
    dateDiff
} from '@/utils/dates';
const showRelativeTime = ref(true);

import LoaderVue from '@/layouts/Loader.vue'
const isLoading = ref(true)

const loadingFileData=ref(true)
const loadCategories=ref(true)  


const selectedFiles = ref(new Set()) // Store selected file IDs

// the variables

const allColumns = ref([
  { key: 'owner', label: 'Added By', visible: true },
  { key: 'size', label: 'Size', visible: true },
  { key: 'category', label: 'Category', visible: true },
  { key: 'visibility', label: 'Visibility', visible: true },
  { key: 'lastModified', label: 'Last Modified', visible: true },
])

const visibleColumns = computed(() =>
  allColumns.value.filter(col => col.visible)
)

const files = ref([])
const totalResults = ref(0)
const dateFrom = ref(null)
const dateTo = ref(null)
const sortBy = ref('lastModified')
const sortOrder = ref('desc')
const loadTrigger = ref(null)
const categories = ref([])
const FilterCategory = ref('')
const FilterFileType = ref('')
const FilterVisibility = ref('')
const DateFilterType = ref('') 
const filterDateFrom=ref(null)
const filterDateTo=ref(null)
const filterSizeMin=ref(null)
const filterSizeMax=ref(null)
const fileSizePreset = ref('all')
const showMore = ref(false)
const storageInfo = ref([])
const isFiltering=ref(false)

const searchQuery = ref('')

const MB = 1024 * 1024

//view type setting
const viewType = ref('list') // 'grid' or 'list'

// pagination variables
const currentPage = ref(1)
const pageSize = ref(15)
const isLoadMoreLoading = ref(false) // Separate loading state for Load More button
const displayedFiles = ref([]) // Files to show
const totalFiles = ref(45)
const totalPages = ref(Math.ceil(totalFiles.value / pageSize.value))

const hasMore = computed(() => {
    return currentPage.value < totalPages.value
})

const preferences = ref(getUserPreferences());

const activeFileId = computed(() => Array.from(selectedFiles.value).at(-1) || null)

const activeFile = computed(() =>
  activeFileId.value ? files.value.find(f => f.id === activeFileId.value) : null
)

const hasFiles = computed(() => files.value.length > 0)
const isInitialLoading = computed(() => loadingFileData.value && files.value.length === 0)
const showFilesTable = computed(() => hasFiles.value || isInitialLoading.value)
const showEmptyState = computed(() => !loadingFileData.value && files.value.length === 0)

//changing date
const onDateChange = ({ dateFrom, dateTo, label }) => {
  console.log('dateFrom:', dateFrom)
  console.log('dateTo:', dateTo)
  console.log('label:', label)

  filterDateFrom.value = dateFrom
  filterDateTo.value = dateTo
  getFiles(true)

  // example: use in API call
  // getFiles({ dateFrom, dateTo })
}



//File type icons


const CATEGORIES_API = 'https://6945933aed253f51719bc9a5.mockapi.io/mockCRM/categories';
async function getFiles(resetPagination = false) {
    try {
        // Reset pagination if requested
        if (resetPagination) {
            currentPage.value = 1
            files.value = []
        }

        //loadingFileData.value = true
        isLoadMoreLoading.value = true
        
        // Show loading state
        // if (currentPage.value === 1) {
        //     loadingFileData.value = true
        // } else {
        //     isLoadMoreLoading.value = true
        // }
        
        NProgress.start();

        // files url params
        const params = new URLSearchParams()
        params.set('page', String(currentPage.value || 1))
        params.set('limit', String(pageSize.value || 15))
        params.set('sortBy', String(sortBy.value || 'lastModified'))
        params.set('order', String(sortOrder.value || 'desc'))

         // ✅ Only append when a value exists (prevents empty-string filtering)
        if (FilterCategory.value) params.set('category', FilterCategory.value)
        if (FilterFileType.value) params.set('fileType', FilterFileType.value)
        if (FilterVisibility.value) params.set('public', FilterVisibility.value)

         // ✅ Search: only append when user typed something
        if (searchQuery.value?.trim()) {
        params.set('search', searchQuery.value.trim())
        }

        // ✅ Date filters: IMPORTANT — use .value and encode
        if (filterDateFrom.value) params.set(`${DateFilterType}_gte`, filterDateFrom.value)
        if (filterDateTo.value) params.set(`${DateFilterType}_lte`, filterDateTo.value)

        // ✅ Size filters
        if (filterSizeMin.value !== null) params.set('fileSize_gte', String(filterSizeMin.value * MB))
        if (filterSizeMax.value !== null) params.set('fileSize_lte', String(filterSizeMax.value * MB))

    
        
        // Build API URL - make sure all parameters exist
       const FILES_API = `https://6945933aed253f51719bc9a5.mockapi.io/mockCRM/files?${params.toString()}`

        console.log('Fetching from:', FILES_API)
        
        const response = await axios.get(FILES_API)
        
        if (!response.data) {
            throw new Error('No data returned from API')
        }
        
        // Create new array reference for proper reactivity
        const newData = response.data
        
        if (currentPage.value === 1) {
            files.value = [...newData] // Create new array
        } else {
            files.value = [...files.value, ...newData] // Create new array
        }
        
        console.log(`Page ${currentPage.value}: Loaded ${newData.length} files, Total: ${files.value.length}`)
        
        return newData
    } catch (error) {
        console.error('Error fetching files:', error)
        // Create new empty array for reactivity
        files.value = []
        return []
    } finally {
        NProgress.done();
        loadingFileData.value = false
        isLoadMoreLoading.value = false
    }
}

// =========== LOAD MORE FUNCTION ===========
const loadMoreFiles = async () => {
    if (!hasMore.value || isLoadMoreLoading.value) return
    
    // Increment page before fetching
    currentPage.value++
    
    // Fetch next page
    await getFiles(false) // false = don't reset pagination
}
// ==========================================

 

async function getCategories() {
    loadCategories.value=true
    try {
        loadCategories.value=true
        const response = await axios.get(CATEGORIES_API);
        console.log("Categories response:", response.data)
        categories.value = response.data;
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);

        // Fallback: If categories API fails, return empty array or extract from documents
        return [];
    }finally {
        loadCategories.value=false
    }
}

//getting files storage information
async function getStorageInfo() {
    try {
        const STORAGE_API = `https://692e89cd91e00bafccd430bf.mockapi.io/FileType`;
        const response = await axios.get(STORAGE_API);
        console.log('Storage Info:', response.data);
        storageInfo.value = response.data;
        return response.data;
    } catch (error) {
        console.error('Error fetching storage info:', error);
        return null;
    }
}

const onDateFilterTypeChange = (event) => {
  DateFilterType.value = event.target.value;
  isFiltering.value = true

  // optional but powerful
  // resetDateRange();
  // fetchData();
};

const setFileSizeRange = (min, max) => {
  filterSizeMin.value = min
  filterSizeMax.value = max
  isFiltering.value = true
  getFiles(true)
  
}

let searchTimer = null
const handleSearchInput = () => {
    isFiltering.value = true
  clearTimeout(searchTimer)
 // Clear other filters when searching
    FilterCategory.value = ''
    FilterFileType.value = ''
    FilterVisibility.value = ''
     FilterCategory.value = ''
     filterDateFrom.value = null
     filterDateTo.value = null
     fileSizePreset.value = 'all'
  searchTimer = setTimeout(() =>  getFiles(true), 350)
}


//handling view type change
const handleViewTypeChange = (type) => {
    viewType.value = type
}

// Handler for the emitted event
const handleFileRenamed = async (updatedFile) => {
  console.log('File renamed in parent:', updatedFile)
  
  // OPTION 1: Just refresh the files list
  try {
        await getFiles(true); // Wait for it
        console.log('Rename definitely complete!'); // Only runs AFTER getFiles finishes
    } catch (error) {
        console.error('Failed to refresh files:', error);
    }
  
  // OPTION 2: Update the specific file in the array (more efficient)
  // const index = files.value.findIndex(f => f.id === updatedFile.id)
  // if (index !== -1) {
  //   files.value[index] = updatedFile
  // }
  
  // OPTION 3: Show a success message and then refresh
  // showToast('File renamed successfully!')
  // setTimeout(() => {
  //   getFiles()
  // }, 1000)
}

//handler for file deleted event
const handleFileDeleted = (deletedFileId) => {
    console.log('File deleted in parent:', deletedFileId)
    // Refresh the files list
    

    setTimeout(() => {
        // If no files are left, reset to first page
        getFiles()
        clearAllSelections()
    }, 1500);
};

//handler for multiple files deleted event
const handleFilesDeleted = (deletedFileIds) => {
    console.log('Files deleted in parent:', deletedFileIds)
    // Refresh the files list
    setTimeout(() => {
        // If no files are left, reset to first page
        getFiles()
        clearAllSelections()
    }, 1500);
};

const handleVisibilityUpdated = (updatedFile) => {
  getFiles(true)
};

const handleFileReplaced = (updatedFile) => {
  getFiles(true)
};
//formating data
// Helper method
const formatFileSizeForDisplay = (sizeInKB) => {
    const bytes = sizeInKB * 1024;
    return formatFileSize(bytes, { decimals: 1 });
};

// Function to toggle file selection
const toggleFileSelection = (fileId, event) => {
    event.stopPropagation(); // Prevent event bubbling

    if (selectedFiles.value.has(fileId)) {
        selectedFiles.value.delete(fileId);
    } else {
        selectedFiles.value.add(fileId);
    }

    // Optional: Update URL or perform other actions
    console.log('Selected files:', Array.from(selectedFiles.value));
};

//

// Function to check if a file is selected
const isFileSelected = (fileId) => {
    return selectedFiles.value.has(fileId);
};

// Function to select all files
const selectAllFiles = (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
        // Add all file IDs to selectedFiles
        files.value.forEach(file => {
            selectedFiles.value.add(file.id);
        });
    } else {
        // Clear all selections
        selectedFiles.value.clear();
    }
};

// Function to clear all selections
const clearAllSelections = () => {
    // Create new Set for reactivity
    const newSet = new Set(selectedFiles.value)
    newSet.clear()
    selectedFiles.value = newSet
    // OR simply:
    // selectedFiles.value.clear() // This should work with Set
}

// Optional: Add keyboard shortcuts (Ctrl+A to select all)
const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'a') {
        event.preventDefault();
        selectAllFiles({ target: { checked: true } });
    }
};

const toggleDetailsPanel = (event) => {
    if (showMore.value == true) {
        showMore.value = false
    }
    else {
        showMore.value = true
    }
}

// function to toggle the arranging order of files
const toggleSortOrder = (sortByField, defaultOrder = 'desc') => {
    if (sortBy.value !== sortByField) {
        sortBy.value = sortByField;
        sortOrder.value = defaultOrder; // Can pass 'asc' or 'desc' as default
    } else {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    }
    
    console.log(`Sorting by ${sortBy.value} in ${sortOrder.value} order`);
    getFiles(true); // Refresh files with new sorting
};

// Usage examples:
// toggleSortOrder('name'); // Defaults to desc for new field
// toggleSortOrder('date', 'asc'); // Defaults to asc for date field

// Add event listener for keyboard shortcuts
/*onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
});*/


// ====== INFINITE SCROLL (window-based) ======
const bottomOffset = 180 // px before bottom to start loading (smooth UX)
let rafId = null

const isNearBottom = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const fullHeight = document.documentElement.scrollHeight
  return scrollTop + viewportHeight >= fullHeight - bottomOffset
}

const onScrollInfinite = () => {
  // throttle using requestAnimationFrame to avoid scroll spam
  if (rafId) return
  rafId = requestAnimationFrame(async () => {
    rafId = null

    // do nothing if still loading, or if there is no more
    if (isLoadMoreLoading.value || loadingFileData.value || !hasMore.value) return

    if (isNearBottom()) {
      await loadMoreFiles()
    }
  })
}

const clearFilters = () => {
    FilterCategory.value = ''
    FilterFileType.value = ''
    FilterVisibility.value = ''
    FilterCategory.value = ''
     filterDateFrom.value = null
     filterDateTo.value = null
     fileSizePreset.value = 'all'
     isFiltering.value=false
    getFiles(true)
}
// ============================================

const getInitials = (fname, lname) => {
    const names = [fname, lname].filter(Boolean);
    return names
        .map(name => name.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
}

const getRandomAvatarColor = () => {
        const colors = [
            'bg-primary',
            'bg-success',
            'bg-danger',
            'bg-warning',
            'bg-info',
            'bg-dark'
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    }



// 🕓 Simulate page loading
onMounted(() => {
    // document.title = 'Upload to Gallery - CSPL CRM'
    window.addEventListener('scroll', onScrollInfinite, { passive: true })
    setTimeout(() => (isLoading.value = false), 100)
    getCategories()
    getFiles()
    getStorageInfo()
})




onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollInfinite)
  if (rafId) cancelAnimationFrame(rafId)
})


const isEmpty = computed(() => !loadingFileData.value && files.value.length === 0)


</script>

<style scoped>
.view-toggle .btn {
    border: 1px solid #D0D5DD;
    background: #fff;
    color: #667085;
    padding: 0.45rem 0.65rem;
}

.view-toggle .btn i {
    font-size: 1.1rem;
}

/* Active state */
.view-toggle .btn-check:checked+.btn {
    background-color: #EEF4FF;
    border-color: #2970FF;
    color: #2970FF;
}

/* Hover (optional, subtle) */
.view-toggle .btn:hover {
    background-color: #F2F4F7;
}

/* Style for indeterminate checkbox state */
.doc-table .form-check-input:indeterminate {
    background-color: #0d6efd;
    border-color: #0d6efd;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
}
th{
    display: table-cell !important;
}

.gridCell.active{
    background: #e6f0ff !important;
    border: 1px solid #2970FF !important;
}
.border-2{
    border-width: 2px !important;
}
.dropdown-item.active{
    color: #2970FF !important;
    font-weight: 500 !important;
}
.btn.active, .btn:active {
    border-color:transparent !important;
    
}
</style>