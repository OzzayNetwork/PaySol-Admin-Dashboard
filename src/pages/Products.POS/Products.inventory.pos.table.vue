<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Products & services</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/users/list">POS Products Manager</router-link>
                            </li>
                            <li class="breadcrumb-item active">Inventory</li>
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
                <div class="card">
                    <div class="card-body border-bottom">
                        <div class="row">
                            <div class="col-12 gap-3 d-flex">
                                <div class="flex-grow-1">
                                    <div class="search-box mb-0 me-0">
                                        <div class="position-relative">
                                            <form @submit.prevent="handleSearchInput()"
                                                class="input-group bg-light rounded mb04 pb-0 flex-nowrap">
                                                <div class="flex-grow-1 ">
                                                    <input style="border-radius: 0px; padding-right: 35px;" type="text"
                                                        class="form-control bg-light  rounded flex-grow-1"
                                                        placeholder="Search..." spellcheck="false" data-ms-editor="true"
                                                        v-model="searchQuery"
                                                        @input="handleSearchInput"
                                                        >
                                                    <i class="bx bx-search-alt search-icon fs-4"></i>
                                                    <i v-if="searchQuery != ''" title="Clear search"
                                                        style="right: 60px; left:unset; "
                                                        class="mdi mdi-close search-icon cursor-pointer fs-3 waves-effect"
                                                        @click="searchQuery = ''; handleSearchInput(); rawSearchQuery = ''">
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
                                 <div class="position-relative d-flex contact-links d-lg-flex d-none gap-3">
                                    <button  data-bs-toggle="dropdown" aria-expanded="false"
                                        class="btn btn-primary d-lg-flex flex-nowrap d-flex align-items-center justify-content-center fw-bold gap-2 flex-nowrap">
                                        <i class="dripicons-plus fs-4 d-flex"></i>
                                        <span>Create</span>
                                        <i class="mdi mdi-chevron-down fs-4 d-flex"></i>
                                    </button>

                                    <div class="dropdown-menu " style="">
                                        <router-link class="dropdown-item d-flex align-items-center "
                                            to="/POS-Manager/new-product" title="Upload a file"><i
                                                class="bx bx bxs-cloud-upload fs-4 me-3"></i><span>Add Item</span></router-link>
                                        <router-link class="dropdown-item d-flex align-items-center" href="#"
                                            title="Add a folder" data-bs-toggle="modal"
                                            data-bs-target="#addCategoryModal">
                                            <i class="bx bxs-folder-plus fs-4 me-3"></i><span>Add Category</span>
                                        </router-link>
                                        <router-link data-bs-target="#addTaxTypeModal" data-bs-toggle="modal"
                                            class="dropdown-item d-flex align-items-center" href="#"
                                            title="Add a category">
                                            <i class="mdi mdi-percent fs-4 me-3"></i>
                                            <span>Add Tax type</span>
                                        </router-link>
                                        <router-link data-bs-target="#addPackagingModal" data-bs-toggle="modal"
                                            class="dropdown-item d-flex align-items-center" href="#"
                                            title="Add a category">
                                            <i class="mdi mdi-package-variant-closed  fs-4 me-3"></i>
                                            <span>Add packaging type</span>
                                        </router-link>
                                         <router-link data-bs-target="#addMeasuringUnitModal" data-bs-toggle="modal"
                                            class="dropdown-item d-flex align-items-center" href="#"
                                            title="Add a category">
                                            <i class="mdi mdi-ruler-square fs-4 me-3"></i>
                                            <span>Add Unit Type</span>
                                        </router-link>

                                    </div>

                                   
                                </div>
                                 <div class="position-relative d-flex d-lg-flex d-none">
                                        <button type="button"
                                            class="btn btn-light waves-effect fw-bold flex-nowrap d-flex align-items-center justify-content-center"
                                            data-bs-toggle="offcanvas" data-bs-target="#activityLogsAside"
                                            aria-controls="offcanvasRight">
                                            <i class="mdi mdi-filter-variant fs-4 align-middle me-2"></i>
                                            <span class="d-md-inline-block d-none">Filter</span>
                                        </button>
                                    </div>                                           

                                       <div class="position-relative d-flex d-lg-flex d-none">
                                        <button
                                            title="Edit columns to view on the table"
                                            class="d-lg-flex d-flex align-items-center fw-bold btn btn-light waves-effect gap-2"
                                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="mdi mdi-format-columns fs-4 align-middle "></i>
                                            <span class="d-md-inline-block d-none ">Columns</span>
                                            <i class="mdi mdi-chevron-down fs-4"></i>
                                        </button>

                                        <div class="dropdown-menu p-3" style="min-width: 220px;">
                                            <div v-for="column in allColumns" :key="column.key" class="form-check mb-3">
                                                <input class="form-check-input " type="checkbox"
                                                    :id="`col-${column.key}`" v-model="column.visible" />
                                                <label class="form-check-label" :for="`col-${column.key}`">
                                                    {{ column.label }}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body p-0" style="min-height: 65vh;">
                        <div class="p-4 d-flex align-items-center justify-content-center h-100 w-100" style="height: 100%;"  v-if="!loadingTable && products.length === 0">

                            <div class="text-center p-4 w-100 h-100" >
                                <div class="empty-state-icon mb-0">
                                    <div >
                                        <img src="../../assets/images/empty-states/emptyFolder.webp" alt="" class="img d-none"
                                            height="260px">
                                            <i style="font-size: 145px;" class="bx bxs-search-alt-2 text-black opacity-25"></i>
                                            <i class="mdi mdi-magnify-remove-outline d-none"></i>
                                    </div>

                                </div>
                                <h4 class="fw-bold text-dark mb-3 text-capitalize">It's empty in here </h4>
                                <p v-if="searchQuery!=''" class="text-muted">We couldn't find the products you are looking for. Try adjusting your search or filters.</p>
                                <p v-else class="text-muted">No products yet, add some products to get started.</p>
                            </div>

                        </div>
                        <div v-else  class="table-responsive">
                             <table  class="table verticle-middle table-hover mb-0 doc-table table-striped">
                                        <thead class="table-light text-nowrap ">
                                            <tr>
                                               
                                               <th
                                                title="sort by Product Name" class="waves-effect "
                                                    @click="toggleSortOrder('productname', 'asc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex">
                                                        <i v-if="sortBy === 'productname'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>Product Info</span>
                                                    </div>
                                                </th>
                                                <th v-if="allColumns.find(col => col.key === 'addedBy').visible"
                                                    title="sort by date Created" class="waves-effect "
                                                    @click="toggleSortOrder('dateAdded', 'desc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex">
                                                        <i v-if="sortBy === 'dateAdded'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>Added By</span>
                                                    </div>
                                                </th>
                                                 <th v-if="allColumns.find(col => col.key === 'description').visible"
                                                 title="sort by description" class="waves-effect "
                                                    @click="toggleSortOrder('description', 'asc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex">
                                                        <i v-if="sortBy === 'description'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>Description</span>
                                                    </div>
                                                </th>
                                                 <th v-if="allColumns.find(col => col.key === 'productType').visible"
                                                  title="sort by product type" class="waves-effect "
                                                    @click="toggleSortOrder('productType', 'asc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex">
                                                        <i v-if="sortBy === 'productType'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>Type</span>
                                                    </div>
                                                </th>
                                                <th v-if="allColumns.find(col => col.key === 'category').visible"
                                                title="sort by category" class="waves-effect "
                                                    @click="toggleSortOrder('category', 'asc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex">
                                                        <i v-if="sortBy === 'category'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>Category</span>
                                                    </div>
                                                </th>
                                                <th v-if="allColumns.find(col => col.key === 'packaging').visible"
                                                    title="sort by package" class="waves-effect "
                                                    @click="toggleSortOrder('package', 'asc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex">
                                                        <i v-if="sortBy === 'package'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>Package</span>
                                                    </div>
                                                </th>
                                               <th v-if="allColumns.find(col => col.key === 'stockLevel').visible"
                                                    title="sort by Stock level" class="waves-effect "
                                                    @click="toggleSortOrder('stockLevel', 'asc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex justify-content-center">
                                                        <i v-if="sortBy === 'stockLevel'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>Stock</span>
                                                    </div>
                                                </th>
                                                <th v-if="allColumns.find(col => col.key === 'reorderLevel').visible"
                                                    title="sort by Reorder Level" class="waves-effect "
                                                    @click="toggleSortOrder('reorderLevel', 'asc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex justify-content-center">
                                                        <i v-if="sortBy === 'reorderLevel'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>ROL</span>
                                                    </div>
                                                </th>
                                                

                                                 <th v-if="allColumns.find(col => col.key === 'stockStatus').visible"
                                                 title="sort by stock status" class="waves-effect "
                                                    @click="toggleSortOrder('stockStatus', 'asc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex">
                                                        <i v-if="sortBy === 'stockStatus'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>Status</span>
                                                    </div>
                                                </th>
                                                
                                                 <th v-if="allColumns.find(col => col.key === 'sellingPrice').visible" 
                                                    title="sort by selling price" class="waves-effect text-right"
                                                    @click="toggleSortOrder('sellingPrice', 'desc')">
                                                    <div class=" cursor-pointer align-items-center justify-content-end gap-1 d-flex">
                                                        <i v-if="sortBy === 'sellingPrice'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span class="text-right">Price</span>
                                                    </div> 
                                                </th> 
                                                <th v-if="allColumns.find(col => col.key === 'dataSource').visible"
                                                 title="sort by data source" class="waves-effect text-right"
                                                    @click="toggleSortOrder('dataSource', 'desc')">
                                                    <div class=" cursor-pointer align-items-center justify-content-end gap-1 d-flex">
                                                        <i v-if="sortBy === 'dataSource'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span class="text-right">Data source</span>
                                                    </div> 
                                                </th> 
                                                <th v-if="allColumns.find(col => col.key === 'lastEdited').visible"
                                                    title="sort by last edited" class="waves-effect text-right"
                                                    @click="toggleSortOrder('lastEdited', 'desc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex">
                                                        <i v-if="sortBy === 'lastEdited'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span class="text-right">Last Edited</span>
                                                    </div> 
                                                </th> 
                                                <th v-if="allColumns.find(col => col.key === 'sku').visible"
                                                    title="sort by sku" class="waves-effect text-right"
                                                    @click="toggleSortOrder('sku', 'asc')">
                                                    <div class=" cursor-pointer align-items-center  gap-1 d-flex">
                                                        <i v-if="sortBy === 'sku'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span class="text-right">SKU NO.</span>
                                                    </div> 
                                                </th> 
                                                <th v-if="allColumns.find(col => col.key === 'POSVisibility').visible" class="text-center">Available on Pos</th>
                                                 <th v-if="allColumns.find(col => col.key === 'todaysSales').visible"
                                                    title="sort by today's sales" class="waves-effect "
                                                    @click="toggleSortOrder('todaysSales', 'asc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex justify-content-center  ">
                                                        <i v-if="sortBy === 'todaysSales'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>Today's Sales</span>
                                                    </div>
                                                </th>

                                                <th v-if="allColumns.find(col => col.key === 'lastRestocked').visible"
                                                    title="sort by last restocked" class="waves-effect "
                                                    @click="toggleSortOrder('lastRestocked', 'asc')">
                                                    <div class=" cursor-pointer align-items-center gap-1 d-flex">
                                                        <i v-if="sortBy === 'lastRestocked'" :class="['mdi',
                                                            sortOrder === 'asc' ? 'mdi-arrow-up' : 'mdi-arrow-down',
                                                            'text me-1'
                                                        ]">
                                                        </i>
                                                        <span>Last Restocked</span>
                                                    </div>
                                                </th>
                                               
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody class="">
                                            
                                           <tr v-for="product in products" :key="product.id">
                                               
                                                <td>
                                                    <div class="d-flex gap-1 align-items-center" :title="product.productname">
                                                        <div class="product-img" style="margin-right: 10px;">
                                                            <img :src="product.image || emptyImage"
                                                                :alt="product.type + ' icon'" class="file-icon"
                                                                width="32px" style="" />
                                                            <!-- <img src="../../assets/images/icons/v2/folder_15826202.png" style="height: 32px;" alt=""> -->
                                                        </div>
                                                        <div>
                                                            <span class="truncate-singleLine flex-grow-1 min-width-0 fw-bold"
                                                                style="width: 100%;">{{ product.productname }}</span>
                                                            <span style="font-size: 12px;" class="text-muted gap-1 text-nowrap">
                                                                {{ product.barcode || '-' }} <small class="mdi-record mdi " ></small>
                                                                {{ product.quantity || '-' }} <small class="mdi-record mdi "></small>
                                                                {{ product.brand || '-' }}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td 
                                                    v-if="allColumns.find(col => col.key === 'addedBy').visible" 
                                                    :title="'Added by ' + (product.createdBy ? (product.createdBy.fname + ' ' + product.createdBy.lname) : 'System User') + ' on ' + formatDateTime(product.dateAdded)"
                                                    
                                                     class="text-nowrap"
                                                    >
                                                   <div class="d-flex align-items-center gap-2">
                                                     <div class="avatar-xs d-flex">
                                                        <img :src="product.createdBy?.avatar" v-if="product.createdBy?.avatar" class="rounded-circle avatar-xs" />
                                                        <div v-else class="avatar-xs rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center">
                                                                <span class="text-uppercase fw-bold">
                                                                    {{ product.createdBy?.fname?.charAt(0) + product.createdBy?.lname?.charAt(0) || 'S' }}
                                                                </span>
                                                            </div>
                                                    </div>
                                                   <div>
                                                        <span class="d-block fw-bold">
                                                            {{ product.createdBy?.fname || product.createdBy?.lname 
                                                                ? (product.createdBy?.fname || '') + ' ' + (product.createdBy?.lname || '') 
                                                                : 'System User' }}
                                                            </span>
                                                        <span style="font-size: 12px;" class="text-muted text-nowrap truncate-singleLine flex-grow-1 min-width-0 " >
                                                            {{ smartDate(product.dateAdded) }}
                                                        </span>
                                                   </div>
                                                   </div>

                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'description').visible"
                                                     :title="product.description">
                                                    <span style="width: 200px;" class="d-flex">
                                                        {{ product.description || '-' }}
                                                    </span>
                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'productType').visible"
                                                     :title="product.productType"
                                                     class="text-nowrap"
                                                     >
                                                   
                                                    <span v-if="product.productType=='goods'" class="text-uppercase badge-alt2 bg-gray-200 text-dark bg-success-soft w-auto ">
                                                       <i class="mdi-record mdi"></i> Goods
                                                    </span>
                                                    <span v-else-if="product.productType=='services'" class="text-uppercase badge-alt2 bg-gray-200 text-dark bg-secondary-soft w-auto t ">
                                                        <i class="mdi-record mdi"></i> Services
                                                    </span>
                                                    <span v-else-if="product.productType=='raw_materials'" class="text-uppercase badge-alt2 bg-gray-200 text-dark bg-warning-soft text-black w-auto ">
                                                        <i class="mdi-record mdi"></i> Raw Materials
                                                    </span>
                                                     <span v-else class="text-uppercase badge-alt2 bg-gray-200 text-dark bg-danger-soft text-black w-auto ">
                                                        <i class="mdi-record mdi"></i> Unknown
                                                    </span>

                                                </td>
                                               <td v-if="allColumns.find(col => col.key === 'category').visible" title="product category">
                                                <div class="d-flex gap-2">

                                                    <!-- First Category -->
                                                    <span 
                                                    v-if="getCategoryNames(product.category).length > 0"
                                                    class="badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto text-capitalize"
                                                    >
                                                    {{ getCategoryNames(product.category)[0] }}
                                                    </span>

                                                    <!-- +X More -->
                                                    <span 
                                                    v-if="getCategoryNames(product.category).length > 1"
                                                    class="badge-alt2 bg-gray-200 text-dark w-auto badge-alt2 bg-gray-200 text-dark bg-dark-soft w-auto text-capitalize"
                                                    >
                                                    +{{ getCategoryNames(product.category).length - 1 }}
                                                    </span>

                                                </div>
                                                </td>
                                                <td  v-if="allColumns.find(col => col.key === 'packaging').visible"
                                                     :title="product.packaging">
                                                    {{ product.packaging || '-' }}
                                                </td>
                                                <td style="" v-if="allColumns.find(col => col.key === 'stockLevel').visible"
                                                    class="text-center">
                                                    <div>
                                                        <span class="fw-bold text-black">{{ product.stockLevel || 0 }} </span> /
                                                        <span class="">{{ product.reorderLevel || 0 }}</span>
                                                    </div>
                                                    
                                                    <div v-if="calculatePercent(product.stockLevel, product.reorderLevel)>=100" style="width: 100px; " class="progress">
                                                        <div 
                                                            class="progress-bar bg-success " 
                                                            role="progressbar"                                                            
                                                            :style="{ width: calculatePercent(product.stockLevel, product.reorderLevel) + '%' }" :aria-valuenow="product.stockLevel"
                                                            aria-valuemin="0" aria-valuemax="100">
                                                        </div>
                                                    </div>
                                                    
                                                     <div v-else-if="calculatePercent(product.stockLevel, product.reorderLevel)>=25 && calculatePercent(product.stockLevel, product.reorderLevel)<100" style="width: 100px; " class="progress">
                                                        <div 
                                                            class="progress-bar bg-warning " 
                                                            role="progressbar"                                                            
                                                            :style="{ width: calculatePercent(product.stockLevel, product.reorderLevel) + '%' }" :aria-valuenow="product.stockLevel"
                                                            aria-valuemin="0" aria-valuemax="100">
                                                        </div>  
                                                    </div>

                                                    <div v-else-if="calculatePercent(product.stockLevel, product.reorderLevel)>=0 && calculatePercent(product.stockLevel, product.reorderLevel)<25" class="progress">
                                                        <div 
                                                            class="progress-bar bg-danger " 
                                                            role="progressbar"                                                            
                                                            :style="{ width: calculatePercent(product.stockLevel, product.reorderLevel) + '%' }" :aria-valuenow="product.stockLevel"
                                                            aria-valuemin="0" aria-valuemax="100">
                                                        </div>  
                                                    </div>
                                                    <small v-if="calculatePercent(product.stockLevel, product.reorderLevel)>=100">Safe</small>

                                                    <small v-else-if="calculatePercent(product.stockLevel, product.reorderLevel)>=25 && calculatePercent(product.stockLevel, product.reorderLevel)<100">Low</small>
                                                    <small v-else-if="calculatePercent(product.stockLevel, product.reorderLevel)<25">Critically Low</small>
                                                </td>
                                                
                                                <td v-if="allColumns.find(col => col.key === 'reorderLevel').visible" class="text-center">
                                                    {{ product.reorderLevel||0 }}
                                                </td>
                                                                                                 
                                                
                                                <th  v-if="allColumns.find(col => col.key === 'stockStatus').visible" class="text-uppercase text-center">
                                                    <span v-if="product?.stockStatus === 'ACTIVE'" class="badge bg-success">
                                                        Active
                                                    </span>

                                                    <span v-else-if="product?.stockStatus === 'OUT_OF_STOCK'"
                                                        class="badge bg-danger">
                                                        Out of Stock
                                                    </span>

                                                    <span v-else-if="product?.stockStatus === 'LOW_STOCK'"
                                                        class="badge bg-warning text-dark">
                                                        Low Stock
                                                    </span>

                                                    <span v-else-if="product?.stockStatus === 'SUSPENDED'" class="badge"
                                                        style="background:#fd7e14;">
                                                        Suspended
                                                    </span>

                                                    <span v-else-if="product?.stockStatus === 'DISABLED'"
                                                        class="badge bg-secondary">
                                                        Disabled
                                                    </span>

                                                    <span v-else class="badge bg-secondary">
                                                        Unknown
                                                    </span>
                                                </th>
                                                <td v-if="allColumns.find(col => col.key === 'sellingPrice').visible" class="text-right fw-bold">
                                                    {{ product.sellingPrice.toLocaleString('en-US', { style: 'currency', currency: 'KES' }) }}
                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'dataSource').visible">{{ product.dataSource || '-' }}</td>
                                                 <td td v-if="allColumns.find(col => col.key === 'lastEdited').visible" :title="'Last edited by ' + (product.lastEditedBy ? (product.lastEditedBy.fname + ' ' + product.lastEditedBy.lname) : 'System User') + ' on ' + formatDateTime(product.lastEdited)">
                                                   <div class="d-flex align-items-center gap-2">
                                                     <div class="avatar-xs d-flex">
                                                        <img :src="product.lastEditedBy?.avatar" v-if="product.lastEditedBy?.avatar" class="rounded-circle avatar-xs" />
                                                        <div v-else class="avatar-xs rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center">
                                                                <span class="text-uppercase fw-bold">
                                                                    {{ product.lastEditedBy?.fname?.charAt(0) + product.lastEditedBy?.lname?.charAt(0) || 'S' }}
                                                                </span>
                                                            </div>
                                                    </div>
                                                   <div>
                                                        <span class="d-block fw-bold truncate-singleLine flex-grow-1 min-width-0 fw-bold" style="width: 100%;">
                                                            {{ product.lastEditedBy?.fname || product.lastEditedBy?.lname 
                                                                ? (product.lastEditedBy?.fname || '') + ' ' + (product.lastEditedBy?.lname || '') 
                                                                : 'System User' }}
                                                            </span>
                                                        <span style="font-size: 12px; width: 100%;" class="text-muted text-nowrap truncate-singleLine flex-grow-1 min-width-0 " >
                                                            {{ smartDate(product.lastEdited) }}
                                                        </span>
                                                   </div>
                                                   </div>

                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'sku').visible">{{ product.sku }}</td>
                                                <td v-if="allColumns.find(col => col.key === 'POSVisibility').visible" class="text-center fw-bold text-uppercase">
                                                    <span v-if="product.availableOnPos" class="badge badge-soft-success fs-11 d-none">Yes</span>
                                                    <span v-else class="badge badge-soft-danger fs-11 d-none">No</span>

                                                     <div class="d-flex ms-1 align-items-center justify-content-center" title="Change the product visibilty staus on the POS">
                                                        <div class="form-check form-switch form-switch-md mb-0" dir="ltr">
                                                            <input class="form-check-input" v-model="product.availableOnPos" type="checkbox" :id="'SwitchCheckSizelg' + product.id" @change="togglePosVisibility(product)" />
                                                            <label class="form-check-label" :for="'SwitchCheckSizelg' + product.id"></label>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'todaysSales').visible" class="text-center">
                                                        {{ product.todaysSales ||0 }}
                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'lastRestocked').visible" :title="product.lastRestocked ? formatDateTime(product.lastRestocked) : 'Not restocked yet'">
                                                        {{ product.lastRestocked ? smartDate(product.lastRestocked) : '-' }}
                                                </td>
                                                <td>
                                                   <ul class="list-inline font-size-20 mb-0">

                                                        <li class="list-inline-item px-2 dropdown d-flex justify-content-center align-items-center">
                                                            <a href="javascript:void(0);" 
                                                                title="more actions"
                                                                class="text-decoration-none text-black waves-effect px-2 rounded "
                                                                data-bs-toggle="dropdown">
                                                                <i class="bx bx-dots-horizontal-rounded fs-"></i>
                                                            </a>

                                                            <ul class="dropdown-menu p-2" data-bs-auto-close="true">
                                                                <li @click="selectProduct(product.id)"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#productDetails"
                                                                >
                                                                    <a class="dropdown-item d-flex py-2" href="javascript:void(0);">
                                                                        <i class="bx bx bxs-info-circle me-2 fs-4"></i>
                                                                        <span>View details</span>
                                                                    </a>
                                                                </li>

                                                                <li>
                                                                    <a class="dropdown-item d-flex py-2" href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#editProductModal">
                                                                        <i class="bx bx bxs-pencil me-2 fs-4"></i>
                                                                        <span>Edit item</span>
                                                                    </a>
                                                                </li>

                                                                <li  @click="selectProduct(product.id)"
                                                                    data-bs-toggle="offcanvas" data-bs-target="#productAnalyticsCanvas"
                                                                    aria-controls="offcanvasRight">
                                                                    <a class="dropdown-item d-flex py-2" href="javascript:void(0);">
                                                                        <i class="bx bxs-bar-chart-alt-2  me-2 fs-4"></i>
                                                                        <span>Product Analytics</span>
                                                                    </a>
                                                                </li>

                                                                <li>
                                                                    <a class="dropdown-item d-flex py-2 align-items-center" href="javascript:void(0);"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#visibilityModal">
                                                                        <i class="mdi-eye mdi me-2 fs-4"></i>
                                                                        <span>Manage visibility</span>
                                                                    </a>
                                                                </li>

                                                                <li>
                                                                    <a class="dropdown-item text-danger d-flex py-2 bg-danger bg-opacity-10 align-items-center fw-bold"
                                                                        href="javascript:void(0);" data-bs-toggle="modal"
                                                                        data-bs-target="#deleteProductModal">
                                                                        <i class="bx bxs-trash me-2 fs-4"></i>
                                                                        <span>Delete item</span>
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </li>

                                                        

                                                    </ul>
                                                </td>
                                           </tr>
                                        </tbody>
                                        <tbody v-if="loadingTable">
                                            <tr v-for="(_, i) in skeletonRows" :key="i">                                               

                                                <td>
                                                    <div class="d-flex align-items-center">
                                                        <SkeletonLoader width="45px" height="45px" />
                                                        <div class="d-flex flex-column gap-1 ms-2">
                                                            <SkeletonLoader type="text" :lines="1" height="10px"
                                                                :width="rand(80, 130)" class="mx-2" />
                                                            <SkeletonLoader type="text" :lines="1" height="10px"
                                                                :width="rand(60, 100)" class="mx-2" />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td v-if="allColumns.find(col => col.key === 'addedBy').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(15, 30)"
                                                        class="mx-2" />
                                                </td>

                                                <td  v-if="allColumns.find(col => col.key === 'description').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(70, 110)"
                                                        class="mx-2" />
                                                </td>

                                                <td  v-if="allColumns.find(col => col.key === 'productType').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(60, 100)"
                                                        class="mx-2" />
                                                </td>

                                                <td v-if="allColumns.find(col => col.key === 'category').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(40, 80)"
                                                        class="mx-2" />
                                                </td>

                                                <td v-if="allColumns.find(col => col.key === 'packaging').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(15, 40)"
                                                        class="mx-2" />
                                                </td>

                                                <td v-if="allColumns.find(col => col.key === 'stockLevel').visible" class="text-center">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(15, 40)"
                                                        class="mx-2" />
                                                </td>

                                                <td v-if="allColumns.find(col => col.key === 'reorderLevel').visible" class="text-center">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(20, 40)"
                                                        class="mx-2" />
                                                </td>

                                                <td v-if="allColumns.find(col => col.key === 'stockStatus').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(35, 60)"
                                                        class="mx-2" />
                                                </td>
                                                 <td v-if="allColumns.find(col => col.key === 'sellingPrice').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(35, 60)"
                                                        class="mx-2" />
                                                </td>
                                               
                                                 <td v-if="allColumns.find(col => col.key === 'dataSource').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(35, 60)"
                                                        class="mx-2" />
                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'lastEdited').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(35, 60)"
                                                        class="mx-2" />
                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'sku').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(35, 60)"
                                                        class="mx-2" />
                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'POSVisibility').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(35, 60)"
                                                        class="mx-2" />
                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'todaysSales').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(35, 60)"
                                                        class="mx-2" />
                                                </td>
                                                <td v-if="allColumns.find(col => col.key === 'lastRestocked').visible">
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(35, 60)"
                                                        class="mx-2" />
                                                </td>
                                                <td>
                                                    <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(15, 40)"
                                                        class="mx-2" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <!-- 👇 this is the watcher -->

                                   
                        </div>
                         <div class="w-100 d-flex align-items-center justify-center text-center d-flex p-3">
                                <div class="w-100">
                                    <p v-if="!hasMore" class="text-muted mb-0 small"><i class="bx bx-check-circle text-success me-1"></i> Showing all {{ totalProducts }} Products </p>
                                </div>
                                <button v-if="hasMore"  class="btn btn-primary" @click="loadMore()">Load more</button>
                            </div>



                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- some imported components -->
        <AddCategory />
        <AddPackaging />
        <AddtaxType />
        <AddMeasuringUnit />
        <ProductDetailsModal :productDetails="productDetails" />
        <ProductAnalytics :productDetails="productDetails" />
         <ImageToast
            :status="toastStatus"
            :title="toastTitle"
            :message="toastMessage"
            :image="toastImage"
            :imageHeight="70"
            @hide="toastStatus = null"
        />
</template>

<script setup>
// 🔧 Core Vue imports
import { ref, onMounted, computed, watch,onBeforeUnmount  } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';

//APIS
import POSAPI from "@/api/POS.API"
const PRODUCTS_API = POSAPI.products()
const PRODUCT_CATEGORY_API = POSAPI.categories()
const PACKAGE_TYPE_API = POSAPI.packaging()
const TAX_TYPE_API = POSAPI.taxType()
const MEASURING_UNIT_API = POSAPI.measuringUnits()

// components
//components
// importing loading components
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'
import SkeletonContainer from '@/components/Loaders/SkeletonContainer.vue'
import BarcodeSearch from './Products.POS.scan.barcode.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import SingleToastVue from '@/components/SingleToast.vue'
import NProgress from "nprogress"
import ImageToast from "@/components/ImageToast.vue"
import ClearFormModal from "@/components/guards/ClearFormConfirm.vue"
import UnsavedChangesConfirm from "@/components/guards/UnsavedChangesConfirm.vue"
import SelectSearchBox from '@/components/SelectSearchBox.vue'
import AddCategory from './products.category.add.pos.vue'
import AddPackaging from './products.packaging.add.pos.vue'
import AddtaxType from './products.tax.add.pos.vue'
import AddMeasuringUnit from './products.measuringUnit.add.pos.vue'
import ProductDetailsModal from './products.details.modal.pos.vue'
import emptyImage from "../../assets/images/icons/packaging.svg"
import ProductAnalytics from './products.POS.analytics.vue'
import {
    formatUploadDate,
    formatDateTime,
    smartDate,
    timeAgo,
    formatDate,
    getUserPreferences,
    dateDiff
} from '@/utils/dates';

// Importing the results images
import successImage from "../../assets/images/icons/check.png";
import errorImage from "../../assets/images/icons/error.png";



import LoaderVue from '@/layouts/Loader.vue'
import { get } from 'jquery';
const isLoading = ref(true)

const allColumns = ref([
    { key: 'addedBy', label: 'Added By', visible: true },
    { key: 'description', label: 'Description', visible: false },
    { key: 'productType', label: 'Type', visible: true },
    { key: 'category', label: 'Category', visible: true },
    { key: 'packaging', label: 'Packaging Type', visible: false },
    { key: 'stockLevel', label: 'Stock', visible: true },
    { key: 'reorderLevel', label: 'Reorder Level', visible: false },
    { key: 'stockStatus', label: 'Stock Status', visible: true },
    { key: 'sellingPrice', label: 'Selling Price', visible: true },


    { key: 'dataSource', label: 'Data Source', visible: false },


    { key: 'lastEdited', label: 'Last Edited', visible: false },

    { key: 'sku', label: 'SKU No.', visible: false },

    { key: 'POSVisibility', label: 'POS visibility', visible: true },
    { key: 'todaysSales', label: 'Today Sales', visible: true },
    { key: 'lastRestocked', label: 'Last Restocked', visible: true },
])

const loadingTable = ref(false) 
const productCategories = ref({})
const packagingTypes = ref({})
const taxTypes = ref({})
const measuringUnits = ref({})
const searchQuery = ref('')
const rawSearchQuery = ref('') 
const products=ref({})
const sortBy = ref('dateAdded')
const sortOrder = ref('desc')
const showMore = ref(false)
const hasMore = ref(true)
const loadMoreTrigger = ref(null)
let observer = null
const isFetchingMore = ref(false)

// infinite scroll item
const scrollContainer = ref(null)
const bottomTrigger = ref(null)

// pagination variables
const currentPage = ref(1)
const pageSize = ref(15)
const isLoadMoreLoading = ref(false) // Separate loading state for Load More button
const displayedFiles = ref([]) // Files to show
const totalProducts = ref(48)
const totalPages = ref(Math.ceil(totalProducts.value / pageSize.value))

const skeletonRows = Array.from({ length: 10 })
const productDetails = ref({})
const rand = (min, max) => `${Math.floor(Math.random() * (max - min) + min)}px`

// Toast state
const toastStatus = ref(null);
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);
const showToast = ref(false);



function selectProduct(id) {
  productDetails.value = products.value.find(p => p.id === id);
  console.log("Selected product details: ", productDetails.value)   
}
async function getCategories() {
    try {
        const res = await axios.get(PRODUCT_CATEGORY_API)
        console.log("Product categories ", res.data)
        productCategories.value = res.data

    } catch (error) {
        console.error('Error fetching folders:', error)
    } finally {

    }
}
async function getPackagingTypes() {
    try {
        const res = await axios.get(PACKAGE_TYPE_API)
        console.log("packaging types ", res.data)
        packagingTypes.value = res.data
    } catch (error) {
        console.error('Error fetching folders:', error)
    }
}

async function getTaxType() {
    try {
        const res = await axios.get(TAX_TYPE_API)
        console.log("Tax type ", res.data)
        taxTypes.value = res.data
    } catch (error) {
        console.error('Error fetching folders:', error)
    }
}

async function getMeasuringUnits() {
    try {
        const res = await axios.get(MEASURING_UNIT_API)
        console.log("Measuring Unit types ", res.data)
        measuringUnits.value = res.data
    } catch (error) {
        console.error('Error fetching folders:', error)
    }
}

async function getProducts(loadMore = false) {
    try {
        if (loadMore) {
            isFetchingMore.value = true
        } else {
            loadingTable.value = true
        }
        loadingTable.value = true
        const params = new URLSearchParams()
        params.set('page', String(currentPage.value || 1))
        params.set('limit', String(pageSize.value || 5))
        params.set('sortBy', String(sortBy.value || 'lastEdited'))
        params.set('order', String(sortOrder.value || 'asc'))
        if (searchQuery.value?.trim()) {
            params.set('search', searchQuery.value.trim())
        }
        
        const res = await axios.get(PRODUCTS_API, { params: params })
        console.log("Products ", res.data)
       
        // Update total files and pages based on API response
        //totalProducts.value = res.data.totalItems
        console.log(totalProducts.value)
        console.log(currentPage.value)
        totalPages.value = Math.ceil(totalProducts.value / pageSize.value)
        // Set initial displayed files
        // 🔥 THE CORE SHIFT
        console.log(res.data)
        if (currentPage.value === 1) {
            products.value = res.data.data
        } else {
            //alert("more than one")
             products.value.push(...res.data.data)
           // displayedFiles.value.push(...res.data.items)
        }

        if(currentPage.value===totalPages.value){
            hasMore.value=false
        }
        else{
            hasMore.value=true
        }
    } catch (error) {
        console.error('Error fetching products:', error)
        products.value = [] // Clear products on error
    } finally {
        loadingTable.value = false
    }
}

function loadMore() {
    //if (isFetchingMore.value || !hasMore.value) return
    if(hasMore){
        currentPage.value++
    getProducts(true)
    console.log(products.value)
    }
    
    
    
}

//function for handling search input with debounce
let searchTimeout = null    
function handleSearchInput() {
    console.log("searching for " + searchQuery.value.trim() + " with length " + searchQuery.value.trim().length + " and current page " + currentPage.value + " and page size " + pageSize.value)
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        currentPage.value = 1 // Reset to first page on new search
        getProducts()
    }, 500) // Adjust debounce delay as needed
}

//returning  the product names
function getCategoryNames(categoryIds) {
  return categoryIds
    .map(id => {
      const found = productCategories.value.find(cat => cat.id === id);
      return found ? found.name : null;
    })
    .filter(Boolean); // remove nulls
}

//calculating reoder percentage
function calculatePercent(stockLevel, reorderLevel) {
    if (reorderLevel === 0) return 100; // Avoid division by zero
    const percent = (stockLevel / reorderLevel) * 100;
    return Math.min(percent, 100); // Cap at 100%
}

//sorting of the products
// function to toggle the arranging order of files
const toggleSortOrder = (sortByField, defaultOrder = 'desc') => {
    if (sortBy.value !== sortByField) {
        sortBy.value = sortByField;
        sortOrder.value = defaultOrder; // Can pass 'asc' or 'desc' as default
    } else {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    }
    getProducts(); // Refresh files with new sorting
};

async function togglePosVisibility(product) {
    try {        // Make API call to update product visibility
        NProgress.start();  
        toastStatus.value = "loading";    
         toastTitle.value = "Updating Visibility";
    toastMessage.value = "Please wait while we update the file visibility...";
    toastImage.value = null;
         showToast.value = true; 
        
        const response=await fetch(`${PRODUCTS_API}/${product.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                availableOnPos: product.availableOnPos ,
                lastEdited: new Date().toISOString(),
            })
        });

        // Success toast
    toastStatus.value = "success";
    toastTitle.value = "POS Visibility Updated Successfully";
    toastMessage.value = `The product's availability for <strong>${product.productname}</strong> on POS is now <strong>${product.availableOnPos? 'Visible' : 'Hidden'}</strong>`;
    toastImage.value = successImage;
    
        console.log(`Toggled POS visibility for product ID ${product.id} to ${product.availableOnPos}`);
       // alert(`Toggled POS visibility for product ID ${product.id} to ${product.availableOnPos}`);
    } catch (error) {

        // Error toast
    toastStatus.value = "error";
    toastTitle.value = "Error Updating Visibility";
    toastMessage.value = error.message || "An error occurred while updating the file visibility.";
    toastImage.value = errorImage;


        console.error('Error updating POS visibility:', error);
        // Optionally revert the change in case of an error
        product.availableOnPos = !product.availableOnPos;
    }finally {
        // Optionally refresh the product list to reflect any changes
        NProgress.done()
        
    }
}

// 🕓 Simulate page loading
onMounted(() => {
    window.addEventListener('scroll', onScrollInfinite, { passive: true })

    //document.title = 'Upload to Gallery - CSPL CRM'
    setTimeout(() => (isLoading.value = false), 1000)
    getCategories()
    getPackagingTypes()
    getTaxType()
    getMeasuringUnits()
    getProducts()
})

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
    if (!hasMore.value) return

    if (isNearBottom()) {
      await loadMore()
    }
  })
}
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScrollInfinite)
  if (rafId) cancelAnimationFrame(rafId)
})




watch([searchQuery, sortBy, sortOrder], () => {
    currentPage.value = 1
    hasMore.value = true
    getProducts()
})

</script>

<style  scoped>
th{
    display: table-cell !important;
}

</style>