<template>
    <div class="container-fluid">
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
        <!-- 🔄 Loader -->
        <div v-if="isLoading">
            <LoaderVue />
        </div>
        <div v-else class="row justify-content-center">
            <div class="col-12">
                <div class="row">
                    <div class="col-12">
                        <div v-if="!(files.length === 0 && loadingFileData === false)" class="card d-flex flex-row">
                            <div class="flex-grow-1 ">
                                <div class="card-body border-bottom">
                                    <div class="row">
                                        <div class="col-12 d-flex gap-2">
                                            <div class="position-relative d-flex gap-3">
                                                <div class="btn-group view-toggle" role="group"
                                                    aria-label="View toggle">
                                                    <input type="radio" class="btn-check" name="viewToggle"
                                                        id="listView" checked>
                                                    <label class="btn mb-0" for="listView" title="List view">
                                                        <i class="mdi mdi-format-list-bulleted"></i>
                                                    </label>

                                                    <input type="radio" class="btn-check" name="viewToggle"
                                                        id="gridView">
                                                    <label class="btn mb-0" for="gridView" title="Grid view">
                                                        <i class="mdi mdi-view-grid"></i>
                                                    </label>
                                                </div>





                                                <div class="dropdown-menu p-4 text-black" style="width: 300px;">
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
                                                        <input type="text" class="form-control bg-light  rounded"
                                                            placeholder="Search..." fdprocessedid="husj3l"
                                                            spellcheck="false" data-ms-editor="true">
                                                        <i class="bx bx-search-alt search-icon"></i>
                                                    </div>
                                                </div>
                                            </div>

                                            <RouterLink to="/gallery/upload"
                                                class="btn btn-primary d-lg-flex d-none align-items-center fw-bold ">
                                                <i class="mdi mdi-camera-plus-outline fs-5 me-2"></i> Upload File
                                            </RouterLink>

                                            <div class="position-relative d-flex">
                                                <button type="button" class="btn btn-light waves-effect fw-bold"
                                                    data-bs-toggle="dropdown" aria-expanded="false"><i
                                                        class="mdi mdi-filter-variant fs-5 align-middle"></i> <span
                                                        class="d-md-inline-block d-none">Filter</span></button>

                                                <div class="dropdown-menu p-4 text-black" style="width: 300px;">
                                                    <div class="row">
                                                        <div class="col-12">
                                                            <h5 class="text-capitalize">Filter</h5>
                                                        </div>
                                                        <div class="col-12 mb-2">
                                                            <hr class="d-none">
                                                        </div>
                                                        <div class="col-12">
                                                            <div class="mb-4">
                                                                <label for="sort-field-select" class="form-label">
                                                                    <h5>Filter By Aurthor</h5>
                                                                </label>
                                                                <select class="form-select" id="sort-field-select">
                                                                    <option value="" disabled="">Select field</option>
                                                                    <option value="tagNumber" selected="">Date Added
                                                                    </option>
                                                                    <option value="name">Views</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div class="col-12">
                                                            <div class="mb-4">
                                                                <label for="sort-field-select" class="form-label">
                                                                    <h5>Filter By Website Visibility</h5>
                                                                </label>
                                                                <div>
                                                                    <div class="form-check mb-3">
                                                                        <input class="form-check-input" type="checkbox"
                                                                            id="formCheck1">
                                                                        <label class="form-check-label"
                                                                            for="formCheck1">
                                                                            Visible on Website
                                                                        </label>
                                                                    </div>

                                                                    <div class="form-check mb-3">
                                                                        <input class="form-check-input form-check-lg "
                                                                            type="checkbox" id="formCheck22">
                                                                        <label class="form-check-label"
                                                                            for="formCheck22">
                                                                            Hidden from Website
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>


                                                        <div class="col-12 mt-4">
                                                            <button type="button"
                                                                class="btn btn-soft-danger waves-effect waves-light w-100 "><i
                                                                    class="bx bx-trash me-1 fs-5"></i>
                                                                Clear Filters</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button type="button" class="btn btn-light waves-effect fw-bold">
                                                <i class="mdi mdi-information-outline fs-5 align-middle me-2"
                                                    data-v-a33a6162=""></i>
                                                <span class="d-md-inline-block d-none" data-v-a33a6162=""
                                                    @click="toggleDetailsPanel">
                                                    Details
                                                </span>
                                            </button>



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
                                                <li class="list-inline-item p-2 px-3 border-round m-0">
                                                    <a href="javascript: void(0);" title="Search"
                                                        class="d-flex gap-2 align-items-center">
                                                        <i class="bx bx-search"></i> <span class=""
                                                            style="font-size:13px;">Search</span>
                                                    </a>
                                                </li>

                                                <li class="list-inline-item p-2 px-3 border-round m-0">
                                                    <a href="javascript: void(0);" title="Details"
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
                                                <th 
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
                                                <th 
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
                                                <th 
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
                                                <th  
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

                                            <tr v-for="file in files" :key="file.id"
                                                :class="{ 'active': isFileSelected(file.id) }"
                                                @click="toggleFileSelection(file.id, $event)">
                                                <td class="pl-4 pr-0" width="20px">
                                                    <div class="form-check mb-0">
                                                        <input class="form-check-input checkbox-lg border-2 border-dark"
                                                            type="checkbox" :id="'formCheck' + file.id"
                                                            @click="toggleFileSelection(file.id, $event)"
                                                            :checked="isFileSelected(file.id)"
                                                            style="opacity: 0; pointer-events: none; transition: opacity 0.2s;">
                                                    </div>
                                                </td>
                                                <td>
                                                    <div class="d-flex gap-1 align-items-center" :title="file.fileName">
                                                        <div style="margin-right: 10px;">
                                                            <img :src="getFileIcon(file.fileType, file.fileName)"
                                                                :alt="file.fileType + ' icon'" class="file-icon"
                                                                width="32px" style="" />
                                                            <!-- <img src="../../assets/images/icons/v2/folder_15826202.png" style="height: 32px;" alt=""> -->
                                                        </div>
                                                        <div>
                                                            <span class="truncate-singleLine flex-grow-1 min-width-0"
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
                                                                class="text-decoration-none" data-bs-toggle="dropdown"
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
                                                                    <a 
                                                                        class="dropdown-item" 
                                                                        href="javascript:void(0);"
                                                                         data-bs-toggle="modal" 
                                                                        data-bs-target="#visibilityModal"
                                                                        @click.stop
                                                                    >
                                                                        <i class="bx bx-lock me-2"></i>Manage visibility
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a 
                                                                        class="dropdown-item" 
                                                                        href="javascript:void(0);" 
                                                                        data-bs-toggle="modal" 
                                                                        data-bs-target="#editFileModal"
                                                                        @click.stop
                                                                        >
                                                                            <i class="bx bx-rename me-2"></i>Rename
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a 
                                                                        class="dropdown-item" 
                                                                        href="javascript:void(0);"                                                                       
                                                                        data-bs-toggle="modal" 
                                                                        data-bs-target="#replaceFileModal"
                                                                        @click.stop
                                                                    >
                                                                        <i class="bx bx-sync me-2"></i>Change file
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a class="dropdown-item" href="javascript:void(0);">
                                                                        <i class="bx bx-folder-plus me-2"></i>Move to
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a class="dropdown-item" href="javascript:void(0);">
                                                                        <i class="bx bx-history me-2"></i>Version
                                                                        history
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a class="dropdown-item" href="javascript:void(0);">
                                                                        <i class="bx bx-download me-2"></i>Download
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a 
                                                                        class="dropdown-item" 
                                                                        href="javascript:void(0);"
                                                                        data-bs-toggle="modal" 
                                                                        data-bs-target="#deleteFileModal"
                                                                         @click.stop
                                                                    >
                                                                        <i class="bx bx-trash me-2"></i>Delete
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a  
                                                                        @click="toggleDetailsPanel" 
                                                                        @click.stop
                                                                        class="dropdown-item" href="javascript:void(0);">
                                                                        <i class="bx bx-info-circle me-2"></i>Details
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        <li class="list-inline-item px-2">
                                                            <a  @click="toggleDetailsPanel" href="javascript: void(0);" title="More Details"><i
                                                                    class="bx bx-info-circle "></i></a>
                                                        </li>
                                                    </ul>

                                                </td>
                                                <td :title="formatDateTime(file.lastModified)">
                                                    <span
                                                        class="truncate-singleLine flex-grow-1 min-width-0 text-capitalize">
                                                        {{ smartDate(file.lastModified, { showTime: true }) }}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span
                                                        class="text-capitalize truncate-singleLine flex-grow-1 min-width-0">
                                                        {{ file.fname }} {{ file.lname }}</span>
                                                </td>
                                                <td>
                                                    <span
                                                        data-bs-toggle="modal" 
                                                        data-bs-target="#visibilityModal"
                                                       
                                                        class="text-capitalize  text-muted truncate-singleLine flex-grow-1 min-width-0 d-flex gap-1 align-items-center cursor-pointer">
                                                        <i :class="file.public ? 'bx bx-globe fs-5' : ''"></i>
                                                        {{ file.public ? ' Public' : ' Private' }}
                                                    </span>
                                                </td>
                                                <td class="text-right pr-4 "><span
                                                        class="text-capitalize truncate-singleLine flex-grow-1 min-width-0">{{
                                                            formatFileSizeForDisplay(file.fileSize) }}</span>
                                                </td>
                                            </tr>

                                            
                                        </tbody>
                                        <tbody v-if="loadingFileData">
                                        <!-- Row 1 -->
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <SkeletonLoader 
                                                        width="32px" 
                                                        height="35px" 
                                                    />
                                                    <SkeletonLoader 
                                                        type="text" 
                                                        :lines="1" 
                                                        width="100%" 
                                                        lastLineWidth="70%" 
                                                        class="mx-2" 
                                                        height="15px"                                                    
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="30px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="100%" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="100%" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="100%" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="30px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                        </tr>

                                        <!-- Row 2 -->
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <SkeletonLoader 
                                                        width="32px" 
                                                        height="35px" 
                                                    />
                                                    <SkeletonLoader 
                                                        type="text" 
                                                        :lines="1" 
                                                        width="70%" 
                                                        lastLineWidth="70%" 
                                                        class="mx-2" 
                                                        height="15px"                                                    
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="30px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="50%" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="60%" 
                                                    lastLineWidth="10%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="100%" 
                                                    lastLineWidth="100%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="30px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                        </tr>

                                        <!-- Row 3 -->
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <SkeletonLoader 
                                                        width="32px" 
                                                        height="35px" 
                                                    />
                                                    <SkeletonLoader 
                                                        type="text" 
                                                        :lines="1" 
                                                        width="85%" 
                                                        lastLineWidth="85%" 
                                                        class="mx-2" 
                                                        height="15px"                                                    
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="25px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="80%" 
                                                    lastLineWidth="80%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="90%" 
                                                    lastLineWidth="90%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="75%" 
                                                    lastLineWidth="75%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="35px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                        </tr>

                                        <!-- Row 4 -->
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <SkeletonLoader 
                                                        width="32px" 
                                                        height="35px" 
                                                    />
                                                    <SkeletonLoader 
                                                        type="text" 
                                                        :lines="1" 
                                                        width="60%" 
                                                        lastLineWidth="60%" 
                                                        class="mx-2" 
                                                        height="15px"                                                    
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="40px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="30%" 
                                                    lastLineWidth="30%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="40%" 
                                                    lastLineWidth="40%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="95%" 
                                                    lastLineWidth="95%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="28px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                        </tr>

                                        <!-- Row 5 --> 
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <SkeletonLoader 
                                                        width="32px" 
                                                        height="35px" 
                                                    />
                                                    <SkeletonLoader 
                                                        type="text" 
                                                        :lines="1" 
                                                        width="95%" 
                                                        lastLineWidth="95%" 
                                                        class="mx-2" 
                                                        height="15px"                                                    
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="35px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="65%" 
                                                    lastLineWidth="65%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="55%" 
                                                    lastLineWidth="55%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="85%" 
                                                    lastLineWidth="85%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="32px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                        </tr>

                                        <!-- Row 6 -->
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <SkeletonLoader 
                                                        width="32px" 
                                                        height="35px" 
                                                    />
                                                    <SkeletonLoader 
                                                        type="text" 
                                                        :lines="1" 
                                                        width="45%" 
                                                        lastLineWidth="45%" 
                                                        class="mx-2" 
                                                        height="15px"                                                    
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="20px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="90%" 
                                                    lastLineWidth="90%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="70%" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="50%" 
                                                    lastLineWidth="50%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="25px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                        </tr>

                                        <!-- Row 6 -->
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <SkeletonLoader 
                                                        width="32px" 
                                                        height="35px" 
                                                    />
                                                    <SkeletonLoader 
                                                        type="text" 
                                                        :lines="1" 
                                                        width="45%" 
                                                        lastLineWidth="45%" 
                                                        class="mx-2" 
                                                        height="15px"                                                    
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="20px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="90%" 
                                                    lastLineWidth="90%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="70%" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="50%" 
                                                    lastLineWidth="50%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="25px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                        </tr>

                                          <tr>
                                            <td></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <SkeletonLoader 
                                                        width="32px" 
                                                        height="35px" 
                                                    />
                                                    <SkeletonLoader 
                                                        type="text" 
                                                        :lines="1" 
                                                        width="100%" 
                                                        lastLineWidth="70%" 
                                                        class="mx-2" 
                                                        height="15px"                                                    
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="30px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="100%" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="100%" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="100%" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="30px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                        </tr>

                                        <!-- Row 6 -->
                                        <tr>
                                            <td></td>
                                            <td>
                                                <div class="d-flex align-items-center">
                                                    <SkeletonLoader 
                                                        width="32px" 
                                                        height="35px" 
                                                    />
                                                    <SkeletonLoader 
                                                        type="text" 
                                                        :lines="1" 
                                                        width="45%" 
                                                        lastLineWidth="45%" 
                                                        class="mx-2" 
                                                        height="15px"                                                    
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="20px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="90%" 
                                                    lastLineWidth="90%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="70%" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="50%" 
                                                    lastLineWidth="50%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                            <td>
                                                <SkeletonLoader 
                                                    type="text" 
                                                    :lines="1" 
                                                    width="25px" 
                                                    lastLineWidth="70%" 
                                                    class="mx-2" 
                                                    height="15px"                                                    
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                    </table>

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
                                        <div class="col-12 text-center align-items-center justify-content-center">
                                            <div class="p-3">
                                                <button class="btn btn-dark btn-lg mt-"
                                                    @click="loadMoreFiles"
                                                    :disabled="!hasMore || isLoadMoreLoading"
                                                >
                                                    Load More Files
                                                </button>
                                                <!-- <p v-if="!hasMore && articles.length > 0" class="text-muted mt-3 pb-0 mb-0">
                                                    No more articles to load.
                                                </p>
                                                <p v-if="articles.length === 0 && !isLoading" class="text-muted mt-3 pb-0 mb-0">
                                                    No articles found.
                                                </p> -->
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                            <div v-if="showMore" class="card-bar bg-light">
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
                                                                {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.fileName }}
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
                                                                {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.category }}
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
                                                            <p class="text-muted text-truncate mb-0 text-uppercase">{{ files.find(f => f.id === Array.from(selectedFiles).pop())?.fileType }}
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
                                                                    {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.fname }}
                                                                    {{ files.find(f => f.id === Array.from(selectedFiles).pop())?.lname }}
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

                        <div  v-if="files.length == 0" class="card">
                            <div class="card-body">
                                <div class="p-3">
                                    <div class="row d-flex align-items-center justify-content-center text-center vh-75">
                                        <div class="col-12 col-md-10 col-lg-8 col-xl-6">
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
                                                    Add files to make them accessible by other users. Public files
                                                    will
                                                    be available on the company's websites and platforms across
                                                    different devices.
                                                </p>
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
                                                        @click="getFiles(); getStorageInfo()"
                                                        title="Click to fetch files again"
                                                        class="btn btn-light px-4 border btn-lg d-flex align-items-center justify-content-center fw-semibold">
                                                        <i class="bx bx-repost me-2 fs-4"></i><span>Retry</span>
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
        <template v-if="selectedFiles.size != 0">
        <RenameFile :fileName="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileName"
            :fileId="files.find(f => f.id === Array.from(selectedFiles).pop())?.id"
            :fileType="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileType"
            @file-renamed="handleFileRenamed" 
        />
        <!-- changing file visibility modal -->
        <FilesVisibility :fileName="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileName"
            :fileId="files.find(f => f.id === Array.from(selectedFiles).pop())?.id"
            :fileType="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileType"
            :fileVisibility="files.find(f => f.id === Array.from(selectedFiles).pop())?.public"
            @visibility-updated="handleVisibilityUpdated" 
        />

        <!-- changing the file -->
        <!-- Add the ReplaceFileModal component -->
        <ChangeFile ref="replaceFileModalRef"
            :fileName="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileName"
            :fileId="files.find(f => f.id === Array.from(selectedFiles).pop())?.id"
            :fileType="files.find(f => f.id === Array.from(selectedFiles).pop())?.fileType" 
             @file-replaced="handleFileReplaced"
        />
        <DeleteFile :selectedFiles="Array.from(selectedFiles).map(id => {
            const file = files.find(f => f.id === id);
            return file ? {
                id: file.id,
                fileName: file.fileName,
                fileType: file.fileType
            } : null;
        }).filter(Boolean)" @file-deleted="handleFileDeleted"
            @files-deleted="handleFilesDeleted" 
        />
    </template>

       

   

</template>

<script setup>
// 🔧 Core Vue imports
import { ref, onMounted, computed,nextTick } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';

//APIs
import documentAPI from "@/api/document"

// importing loading components
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'
import SkeletonContainer from '@/components/Loaders/SkeletonContainer.vue'

import DonutChart from '@/components/Charts/Donut.Highchart.Progress.vue'
import FilePreview from '@/components/filesHandler/file.preview.vue'
import RenameFile from '@/pages/FileManager/files.rename.vue'
import DeleteFile from '@/pages/FileManager/files.delete.vue'
import FilesVisibility from '@/pages/FileManager/files.visibility.vue'
import ChangeFile from '@/pages/FileManager/files.change.vue'
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

const files = ref([])
const totalResults = ref(0)
const dateFrom = ref(null)
const dateTo = ref(null)
const sortBy = ref('lastModified')
const sortOrder = ref('desc')
const loadTrigger = ref(null)
const categories = ref([])
const FilterCategory = ref('')
const showMore = ref(true)
const storageInfo = ref([])

// pagination variables
const currentPage = ref(1)
const pageSize = ref(15)
const hasMore = ref(true)
const isLoadMoreLoading = ref(false) // Separate loading state for Load More button
const displayedFiles = ref([]) // Files to show
const totalFiles = ref(100)
const totalPages = ref(Math.ceil(totalFiles.value / pageSize.value))



const preferences = ref(getUserPreferences());

//File type icons


const CATEGORIES_API = documentAPI.categories(); // Use the API helper function
async function getFiles(resetPagination = false) {
    try {

        // If preserving state, save current state before fetching
        // if (preserveState) {
        //     currentPageBeforeAction.value = currentPage.value
        //     filesBeforeAction.value = [...files.value]
        // }

        // Reset pagination if requested (e.g., when sorting/filtering)
        if (resetPagination) {
            currentPage.value = 1
            files.value = []
        }

        // Show loading state
        if (currentPage.value === 1) {
            loadingFileData.value = true
        } else {
            isLoadMoreLoading.value = true
        }

         // toast and loading functions
        NProgress.start();
        loadingFileData.value=true
        const FILES_API =
            `${documentAPI.files()}` +
            `?page=${currentPage.value}` +
            `&limit=${pageSize.value}` +
            `&sortBy=${sortBy.value}` +
            `&order=${sortOrder.value}` +
            `&category=${FilterCategory.value}`

        const response = await axios.get(FILES_API)
                //files.value = response.data
        //loadingFileData.value=false

        // If it's the first page, replace files
        if (currentPage.value === 1) {
            files.value = response.data
        } else {
            // Otherwise, append to existing files (for Load More)
            files.value = [...files.value, ...response.data]

            console.log(files.value)

        }

         

        return response.data
    } catch (error) {
        console.error('Error fetching files:', error)
        files.value = []
        return []
    }finally {
    // Always stop loading spinner
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
        console.log(response.data)
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
        const STORAGE_API = `${documentAPI.fileType()}`;
        const response = await axios.get(STORAGE_API);
        console.log('Storage Info:', response.data);
        storageInfo.value = response.data;
        return response.data;
    } catch (error) {
        console.error('Error fetching storage info:', error);
        return null;
    }
}

// Handler for the emitted event
const handleFileRenamed = (updatedFile) => {
  console.log('File renamed in parent:', updatedFile)
  
  // OPTION 1: Just refresh the files list
  getFiles(true)
 // clearAllSelections()
  
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
  getFiles()
};

const handleFileReplaced = (updatedFile) => {
  getFiles()
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
    selectedFiles.value.clear();
};

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
    getFiles(true); // Reset pagination on sort change
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


// 🕓 Simulate page loading
onMounted(() => {
    // document.title = 'Upload to Gallery - CSPL CRM'
    setTimeout(() => (isLoading.value = false), 100)
    getCategories()
    getFiles()
    getStorageInfo()


})

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
.form-check-input:indeterminate {
    background-color: #0d6efd;
    border-color: #0d6efd;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
}
th{
    display: table-cell !important;
}
</style>