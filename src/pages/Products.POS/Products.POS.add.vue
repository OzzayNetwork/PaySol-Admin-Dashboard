<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Add Product</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/users/list">POS Products Manager</router-link>
                            </li>
                            <li class="breadcrumb-item active">Add Product</li>
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
            <div class="col-12 ">
                <div class="card " style="min-height: 76vh;">
                    <div class="card-body p-5 p-sm-3  justify-content-center her d-flex " :class="[
                        showInputs ? '' : 'hero-gradient hero-gradient2',
                        searchingBarcode ? 'loading-gradient' : ''
                    ]">
                        <div class="row w-100">
                            <div class="d-flex flex-column align-items-center  pt-5 pb-3 mt-">
                                <div class="col-sm-12 col-md-8 col-lg-6 text-center">
                                    <img class="img d-none" src="../../assets/images/logo.svg" alt="" height="45">
                                    <div class="mb-4 opacity-25">
                                        <img class="img" src="../../assets/images/logo.svg" alt="" height="70">
                                    </div>




                                    <template v-if="!showInputs">
                                        <h4 class="card-title fs-1 mb-4 fw-bold text-black">
                                            Automatic Barcode Lookup Tool – Get Product Info Instantly
                                        </h4>
                                        <p class="fs-5 text-muted">
                                            Scan or type in a barcode and get product name, brand, and image. We may
                                            also suhhest product names depending on the results
                                        </p>
                                    </template>
                                    <template v-if="showInputs">
                                        <h4 class="card-title fs-1 mb-3 fw-bold text-black">
                                            New Product Registration
                                        </h4>
                                        <p class="fs-5 text-muted">
                                            {{ formIntroText }}
                                        </p>
                                    </template>


                                </div>
                                <div class="col-sm-12 col-md-11 col-lg-9 col-xl-8 " :class="[
                                    showInputs ? 'mt-1' : 'mt-5',
                                ]">
                                    <div>
                                        <BarcodeSearch ref="alertRef" class="mb-4" @barcode-status="handleBarcodeStatus" />

                                        <template v-if="!showInputs">
                                            <p class="text-muted text-center d-none">Scan barcode or type the number to
                                                search
                                                product databases</p>
                                            <div class="text-center">
                                                <div class="d-flex align-items-center mt-4 mb-3 opacity-50">
                                                    <hr class="flex-grow-1 text-muted bg-dark opacity-25">
                                                    <span class="px-3 text-dark fw-bold">OR</span>
                                                    <hr class="flex-grow-1 text-muted bg-dark opacity-25">
                                                </div>
                                                <button 
                                                @click="withoutBarCode()"
                                                    type="button"
                                                    class="btn btn-link btn-rounded waves-effect text-capitalize btn-lg fw-semibold">+
                                                    Add Product Without Barcode</button>
                                            </div>
                                        </template>
                                    </div>

                                    <div v-if="showInputs"
                                        class="row animate__animated animate__fadeInUp animate__faster">
                                        <form action="" @submit.prevent="handleSubmit" id="createProduct">
                                            <fieldset :disabled="isSubmitting" class="row">


                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 mb-3">
                                                    <div class="row">
                                                        <div class="col-12 ">
                                                            <div class="row bg-light rounded p-4 m-0">
                                                                <div class="col-12 mb-3">
                                                                    <h4 class="card-title">Basic Information</h4>
                                                                </div>

                                                                <!-- Product Type -->
                                                                <div class="col-12 mb-3">
                                                                    <label class="form-label">
                                                                        Product Type <span class="text-danger">*</span>
                                                                    </label>

                                                                    <div class="d-flex gap-3 flex-wrap">
                                                                        <div class="form-check mb-2">
                                                                            <input class="form-check-input" type="radio"
                                                                                name="productType" id="goods"
                                                                                value="goods"
                                                                                v-model="productDetails.productType"
                                                                                required>
                                                                            <label class="form-check-label"
                                                                                for="goods">Goods</label>
                                                                        </div>

                                                                        <div class="form-check mb-2">
                                                                            <input class="form-check-input" type="radio"
                                                                                name="productType" id="services"
                                                                                value="services"
                                                                                v-model="productDetails.productType"
                                                                                required>
                                                                            <label class="form-check-label"
                                                                                for="services">Services</label>
                                                                        </div>

                                                                        <div class="form-check mb-2 d-none">
                                                                            <input class="form-check-input" type="radio"
                                                                                name="productType" id="combo"
                                                                                value="combo" required>
                                                                            <label class="form-check-label"
                                                                                for="combo">Combo</label>
                                                                        </div>
                                                                    </div>

                                                                    <div class="invalid-feedback d-block">
                                                                        Please select a product type.
                                                                    </div>
                                                                </div>

                                                                <!-- Product Name -->
                                                                <div class="col-12 mb-3">
                                                                    <label class="form-label">
                                                                        Product Name <span class="text-danger">*</span>
                                                                    </label>
                                                                    <input type="text" class="form-control"
                                                                        placeholder="e.g. Coca-Cola 500ml, Beef Burger, Nail Polish"
                                                                        required minlength="2" maxlength="100"
                                                                        pattern="^[a-zA-Z0-9\s.,()/%&+\-']+$"
                                                                        title="Use letters, numbers, spaces and common product symbols only."
                                                                        v-model="productDetails.name">
                                                                    <div class="invalid-feedback">
                                                                        Enter a valid product name between 2 and 100
                                                                        characters.
                                                                    </div>
                                                                </div>

                                                                <!-- Product Description -->
                                                                <div class="col-12 mb-3">
                                                                    <label class="form-label">
                                                                        Product Description
                                                                    </label>
                                                                    <textarea class="form-control" rows="2"
                                                                        placeholder="e.g. 500ml bottled soft drink with cola flavor"
                                                                        maxlength="150"
                                                                        v-model="productDetails.description"></textarea>
                                                                    <div class="invalid-feedback">
                                                                        Description should not exceed 150 characters.
                                                                    </div>
                                                                </div>

                                                                <!-- Product Category -->
                                                                <div class="col-12 mb-3">
                                                                    <label class="form-label">
                                                                        Product Category <span
                                                                            class="text-danger">*</span>
                                                                    </label>
                                                                    <SelectSearchBox
                                                                        :options="productCategories.map(category => ({ label: category.name, value: category.id }))"
                                                                        v-model="productDetails.category"
                                                                        placeholder="e.g. Soft Drinks, Fast Food, Cosmetics"
                                                                        input-class="form-control form-select"
                                                                        :is-multi="true" showCreate
                                                                        createText="Create a category"
                                                                        createModalId="addCategoryModal"
                                                                        required
                                                                         />

                                                                    <div class="invalid-feedback">
                                                                        Enter a valid product category.
                                                                    </div>
                                                                </div>



                                                                <div class="col-12 col-md-6 mb-3">
                                                                    <label class="form-label">
                                                                        Displayed Quantity
                                                                    </label>
                                                                    <input type="text" class="form-control"
                                                                        placeholder="e.g. 500 g" maxlength="50"
                                                                        pattern="^[a-zA-Z0-9\s&.,\-']+$"
                                                                        title="Enter a valid brand name."
                                                                        v-model="productDetails.quantity">
                                                                    <div class="invalid-feedback">
                                                                        Enter a valid brand name.
                                                                    </div>
                                                                </div>




                                                                <!-- Brand -->
                                                                <div class="col-12 col-md-6 mb-3">
                                                                    <label class="form-label">
                                                                        Brand
                                                                    </label>
                                                                    <input type="text" class="form-control"
                                                                        placeholder="e.g. Coca-Cola, Brookside, Samsung"
                                                                        maxlength="50" pattern="^[a-zA-Z0-9\s.,()/%&+\-']+$"
                                                                        title="Enter a valid brand name."
                                                                        v-model="productDetails.brand">
                                                                    <div class="invalid-feedback">
                                                                        Enter a valid brand name.
                                                                    </div>
                                                                </div>

                                                                <!-- Package Size -->
                                                                <div class="col-12 col-md-6 mb-3">
                                                                    <label class="form-label">
                                                                        Package Size
                                                                    </label>
                                                                    <div class="row g-2">
                                                                        <div class="col-5">
                                                                            <input type="text" class="form-control"
                                                                                placeholder="e.g. 200 or 200.50"
                                                                                v-model="productDetails.quantityValue"
                                                                                pattern="^\d+(\.\d+)?$"
                                                                                inputmode="decimal"
                                                                                title="Enter a valid number (e.g. 200 or 200.50)">
                                                                            <div class="invalid-feedback">
                                                                                Enter a valid size value.
                                                                            </div>
                                                                        </div>
                                                                        <div class="col-7">
                                                                            <SelectSearchBox
                                                                                :options="measuringUnits.map(measuringUnit => ({ label: measuringUnit.name + ' (' + measuringUnit.symbol + ')', value: measuringUnit.symbol }))"
                                                                                v-model="productDetails.quantityUnit"
                                                                                placeholder="Select unit"
                                                                                input-class="form-control form-select"
                                                                                showCreate createText="Other? Create"
                                                                                createModalId="addMeasuringUnitModal" />
                                                                            
                                                                            <div class="invalid-feedback">
                                                                                Select a valid size unit.
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <!-- Selling Unit -->
                                                                <div class="col-12 col-md-6 mb-3">
                                                                    <label class="form-label">
                                                                        Selling Unit <span class="text-danger">*</span>
                                                                    </label>
                                                                    <SelectSearchBox
                                                                        :options="packagingTypes.map(packageType => ({ label: packageType.name, value: packageType.id }))"
                                                                        v-model="productDetails.packaging"
                                                                        placeholder="Select eg Bottle"
                                                                        input-class="form-control form-select"
                                                                        showCreate createText="Create Packaging Unit"
                                                                        createModalId="addPackagingModal" />
                                                                    
                                                                    <div class="invalid-feedback">
                                                                        Please select a selling unit.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row bg-light rounded p-4 m-0 mt-3">

                                                        <div class="col-12 mb-3">
                                                            <h4 class="card-title">Pricing</h4>
                                                        </div>

                                                        <!-- Selling Price -->
                                                        <div class="col-12 col-md-6 mb-3">
                                                            <label class="form-label">
                                                                Selling Price (KES) <small class="text-danger">*</small>
                                                            </label>
                                                            <input type="text" class="form-control"
                                                                @change="settingTaxInfo()"
                                                                placeholder="e.g. 150 or 150.00" inputmode="decimal"
                                                                pattern="^\d+(\.\d{1,2})?$"
                                                                title="Enter a valid amount (e.g. 150 or 150.00)"
                                                                required v-model="productDetails.sellingPrice"
                                                                @input="handlePriceInput">
                                                            <div class="invalid-feedback">
                                                                Enter a valid selling price.
                                                            </div>
                                                        </div>

                                                        <!-- Tax Rate Dropdown -->
                                                        <div class="col-12 col-md-6 mb-3">
                                                            <label class="form-label">
                                                                Tax Rate <small class="text-danger">*</small>
                                                            </label>
                                                            <SelectSearchBox
                                                                :options="taxTypes.map(taxRate => ({ label: taxRate.name + ' (' + taxRate.percent + '%)', value: taxRate.id }))"
                                                                v-model="selectedTaxTypeID"
                                                                placeholder="Select Tax rate"
                                                                input-class="form-control form-select" showCreate
                                                                createText="Create tax rate Type"
                                                                createModalId="addTaxTypeModal" />
                                                           
                                                            <div class="invalid-feedback">
                                                                Please select a tax rate.
                                                            </div>
                                                        </div>

                                                        <!-- Final Price -->
                                                        <div class="col-sm-3 col-3 mb-3">
                                                            <label class="form-label">
                                                                Tax Amount
                                                            </label>
                                                            <input type="text" class="form-control fw-bold"
                                                                placeholder="Auto calculated"
                                                                :value="pricingBreakdown.tax" readonly disabled
                                                                title="This is the final price including tax.">
                                                            <small class="text-muted d-none">
                                                                Automatically calculated from Selling Price and selected
                                                                Tax Rate
                                                            </small>
                                                        </div>
                                                        <div class="col-sm-9 col-9 mb-3">
                                                            <label class="form-label">
                                                                Final Price (Incl. Tax)
                                                            </label>
                                                            <input type="text" class="form-control fw-bold"
                                                                placeholder="Auto calculated"
                                                                :value="pricingBreakdown.total" readonly disabled
                                                                title="This is the final price including tax.">
                                                            <small class="text-muted">
                                                                Automatically calculated from Selling Price and selected
                                                                Tax Rate
                                                            </small>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-4 mb-4">
                                                    <div class="row bg-light p-3 m-0 mb-3">
                                                        <div class="col-12 mb-3">
                                                            <h4 class="card-title">Product Media</h4>
                                                        </div>

                                                        <div class="col-md-12 mb-3">
                                                            <div class="w-100 p-3 bg-white"
                                                                style=" overflow: hidden; border-radius: 8px; position: relative;">
                                                                <img :src="previewUrl || placeholderImage"
                                                                    style="aspect-ratio: 0; width: 100%; height: 100%; object-fit: cover; background-color: #eff2f7;" />

                                                                <!-- 📷 Upload Button -->
                                                                <label for="galleryPicUpload"
                                                                    class="btn btn-primary waves-effect waves-light rounded-circle profile-pic-btn"
                                                                    style="position: absolute; top: 5%; left: 5%;"
                                                                    title="Select Image">
                                                                    <i class="bx bx-camera align-middle"></i>
                                                                </label>


                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="row bg-light p-3 m-0 mb-3 rounded">

                                                        <div class="col-12 mb-3">
                                                            <h4 class="card-title">Inventory Details</h4>
                                                        </div>

                                                        <!-- Barcode -->
                                                        <div class="col-12 mb-3">
                                                            <label class="form-label">
                                                                Barcode Number
                                                            </label>
                                                            <input type="text" class="form-control fw-bold"
                                                                placeholder="e.g. 6161100123456" minlength="8"
                                                                maxlength="50" pattern="^[0-9A-Za-z\-]+$"
                                                                title="Use letters, numbers, and hyphens only."
                                                                v-model="productDetails.barcode" disabled>
                                                        </div>

                                                        <!-- SKU -->
                                                        <div class="col-12 mb-3">
                                                            <label class="form-label">
                                                                SKU (Stock Keeping Unit)
                                                                <small class="text-muted">(Optional)</small>
                                                            </label>

                                                            <input type="text" class="form-control"
                                                                placeholder="e.g. DRK-COKE-500ML or BRG-BEEF-001"
                                                                minlength="3" maxlength="50" pattern="^[A-Za-z0-9\-_]+$"
                                                                title="Unique internal code using letters, numbers, hyphens (-) or underscores (_). No spaces."
                                                                v-model="productDetails.sku">
                                                        </div>

                                                        <!-- Current Stock -->
                                                        <div class="col-12 mb-3">
                                                            <label class="form-label">
                                                                Current Stock Quantity <span
                                                                    class="text-danger">*</span>
                                                            </label>
                                                            <input type="text" class="form-control"
                                                                placeholder="e.g. 120" inputmode="numeric"
                                                                pattern="^\d+$"
                                                                title="Enter a valid whole number (e.g. 120)" required
                                                                v-model="productDetails.stockLevel"
                                                                @input="handleWholeNumberInput('stockLevel', $event)">
                                                            <div class="invalid-feedback">
                                                                Enter a valid stock quantity.
                                                            </div>
                                                        </div>

                                                        <!-- Reorder Quantity -->
                                                        <div class="col-12 mb-3">
                                                            <label class="form-label">
                                                                Reorder Quantity
                                                            </label>
                                                            <input type="text" class="form-control"
                                                                placeholder="e.g. 50" inputmode="numeric"
                                                                pattern="^\d+$"
                                                                title="Enter a valid whole number (e.g. 50)"
                                                                v-model="productDetails.reorderLevel"
                                                                @input="handleWholeNumberInput('reorderLevel', $event)">
                                                            <div class="invalid-feedback">
                                                                Enter a valid reorder quantity.
                                                            </div>
                                                        </div>
                                                        <!-- Reorder status -->
                                                         <div class="col-12 mb-3">
                                                            <label class="form-label">
                                                                Stock Status 
                                                            </label> 
                                                            <div class="w-100 border-2 rounded  border p-3 py-2 text-uppercase">
                                                                <span v-if="stockStatus === 'ACTIVE'"
                                                                    class="badge bg-success my-1">
                                                                    Active
                                                                </span>

                                                                <span
                                                                    v-else-if="stockStatus === 'OUT_OF_STOCK'"
                                                                    class="badge bg-danger my-1">
                                                                    Out of Stock
                                                                </span>

                                                                <span
                                                                    v-else-if="stockStatus === 'LOW_STOCK'"
                                                                    class="badge bg-warning text-dark">
                                                                    Low Stock
                                                                </span>

                                                                <span
                                                                    v-else-if="stockStatus === 'SUSPENDED'"
                                                                    class="badge my-1" style="background:#fd7e14;">
                                                                    Suspended
                                                                </span>

                                                                <span
                                                                    v-else-if="stockStatus === 'DISABLED'"
                                                                    class="badge bg-secondary my-1">
                                                                    Disabled
                                                                </span>

                                                                <span v-else class="badge bg-secondary my-1">
                                                                    Unknown
                                                                </span>
                                                            </div>
                                                         </div>

                                                        <!-- Key wordsQuantity -->
                                                        <div class="col-12 mb-3 d-non">
                                                            <label class="form-label">
                                                                Keywords
                                                            </label>
                                                            <SelectSearchBox v-model="productDetails.keywords"
                                                                :key="keywordOptions.length" :options="keywordOptions"
                                                                placeholder="e.g. Soft Drinks, Fast Food, Cosmetics"
                                                                input-class="form-control form-select" :is-multi="true"
                                                                :is-taggable="true"
                                                                @option-created="handleCreateOption" />


                                                            <div class="invalid-feedback">
                                                                Enter a valid reorder quantity.
                                                            </div>
                                                            <small class="text-muted">This will help especially with
                                                                searching. Feel free to use common
                                                                words and so on</small>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div>
                                                        <hr class="bg-dark-muted">
                                                    </div>
                                                </div>

                                                <div class="col-12">
                                                    <div class="mt-4 d-flex gap-3 justify-content-end w-100">
                                                        <button type="button" form="createProduct"
                                                            class="btn btn-outline-secondary btn-lg px-4"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#clearUploadFormModal" :disabled="!isDirty">
                                                            Clear Form
                                                        </button>

                                                        <button type="submit" form="createProduct"
                                                            class="btn btn-dark btn-lg px-4"
                                                            :disabled="isSubmitting || !isDirty">
                                                            <span v-if="isSubmitting"
                                                                class="spinner-border spinner-border-sm me-2"
                                                                role="status" aria-hidden="true"></span>
                                                            <template v-if="isSubmitting">Uploading...</template>
                                                            <template v-else>Save Product</template>
                                                        </button>

                                                    </div>
                                                </div>

                                            </fieldset>
                                        </form>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div class="d-none">
                            <div class="bottom-blob"></div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="col-12 d-none">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-0">Categories</h4>
                        <div class="row">

                        </div>

                    </div>
                </div>
            </div>
        </div>
        <SingleToastVue :toastType="toastType" :toastMessage="toastMessage" />
        <ImageUploader inputId="galleryPicUpload" @image-selected="handleImageSelected" @show-toast="handleToast"
            :aspect-ratio="selectedRatio" />

        <!-- adding product category -->
        <!-- Pass categories list -->
        <!-- Enable select UI -->
        <!-- Refresh categories after adding -->
        <!-- Merge selected category into existing ones without duplicates -->
        <AddCategory :categories="productCategories" :showSelect="true" @category-added="getCategories"
            @category-selected="(id) => {
                productDetails.category = [
                    ...new Set([...(productDetails.category || []), id])
                ]
            }" />

        <!-- adding packaging options -->
        <AddPackaging title="Add Packaging Type" input_name_label="Packaging Name" confirmText="Add Packaging Type"
            :categories="packagingTypes" :showSelect="true" @category-added="getPackagingTypes"
            @category-selected="(id) => productDetails.packaging = id" />

        <!-- adding tax options -->
        <AddtaxType title="Add Tax rate Type" input_name_label="tax Rate Name/title" confirmText="Add Tax rate Type"
            :categories="taxTypes" :showSelect="true" @category-added="getTaxType"
            @category-selected="(id) => productDetails.tax = id" />
        <AddMeasuringUnit :categories="taxTypes" :showSelect="true" @unit-added="getMeasuringUnits"
            @unit-selected="(id) => productDetails.quantityUnit = id" />
        <button @click="generateKeywords(keywordSources)" type="button"
            class="btn btn-primary d-flex align-items-center gap-2 d-none">
            <i class="mdi mdi-plus"></i>
            <span>Details</span>
        </button>

        <!-- modal for adding measuring unit -->
        <ImageToast
        :status="toastStatus"
        :title="toastTitle"
        :message="toastMessage"
        :image="toastImage"
        :imageHeight="63"
        @hide="toastStatus = null"
        />

        <!-- product details modal -->
        
         <button  
         class="btn btn-primary d-none" id=""
         @click="handleFormReset(); previewUrl = placeholderImage"
          >Clear form</button>

          <ClearFormModal
        ref="clearModalRef"
        modal-id="clearUploadFormModal"
        :loading="isClearing"
        @confirm="resetForm(); defaultForm()"
    />

       


    </div>
</template>

<script setup>

// 🔧 Core Vue imports
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

//APIS
import POSAPI from "@/api/POS.API"
const PRODUCTS_API = POSAPI.products()
const PRODUCT_CATEGORY_API = POSAPI.categories()
const PACKAGE_TYPE_API = POSAPI.packaging()
const TAX_TYPE_API = POSAPI.taxType()
const MEASURING_UNIT_API = POSAPI.measuringUnits()

//utils
import { generateKeywords } from "@/utils/keywordGenerator";
//auth store
import {useAuthStore} from "@/stores/auth"
const authStore=useAuthStore()

//stop words for search
const STOP_WORDS = [
    "and", "or", "the", "with", "for", "of", "in", "on", "at", "by", "to"
];

//components
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

// alerts
import successImage from "../../assets/images/icons/check.png"
import errorImage from "../../assets/images/icons/error.png"

// 🖼️ Default placeholder image
import placeholderImage from '@/assets/images/image-placeholder.svg'


import LoaderVue from '@/layouts/Loader.vue'
const alertRef = ref(null)

// -------------------- Toast state --------------------
const toastStatus = ref(null)
const toastTitle = ref("")
const toastImage = ref(null)

function showToast(status, title, message) {
  toastStatus.value = status
  toastTitle.value = title
  toastMessage.value = message

  // ✅ Don’t show error image for "loading"
  toastImage.value =
    status === "success" ? successImage :
    status === "error" ? errorImage :
    null
}

const isLoading = ref(true)
const searchingBarcode = ref(false)
const showInputs = ref(false)
const formIntroText = ref("Fill in the form below to complete registration of the new item")
const previewUrl = ref(placeholderImage)
const isSubmitting = ref(false)
const barcodeIsRequired = ref(true) 

// to be used on drop downs
const productCategories = ref({})
const packagingTypes = ref({})
const taxTypes = ref({})
const measuringUnits = ref({})

const selectedTaxTypeID = ref({})
const selectedTaxRate = ref(0)

// =============================
// ⚙️ REACTIVE DATA
// =============================
const router = useRouter()
const selectedRatio = ref(4 / 5) // Maintain 4:5 image ratio (Instagram portrait style)


// 🔔 Toast notification
const toastType = ref('')
const toastMessage = ref('')
const handleToast = ({ toastType: type, toastMessage: msg }) => {
    toastType.value = type
    toastMessage.value = msg
    setTimeout(() => (toastMessage.value = ''), 2000)
}
//product details
const keywordOptions = ref([])


const productDetails = ref({

    // ================= IDENTIFICATION =================
    id: null,
    barcode: "",
    name: "",
    description: "",
    brand: "",
    category: [],
    keywords: [],


    // ================= PRODUCT TYPE =================
    productType: "", // goods | service | combo

    // ================= SOURCE INFO =================
    dataSource: "", // manual | openfoodfacts | upcitemdb | go-upc | local
    isExistingProduct: false,
    isMatchedFromApi: false,
    requiresReview: false,

    // ================= MEDIA =================
    image: placeholderImage,

    // ================= PRICING =================
    sellingPrice: null,
    costPrice: null,
    tax: {},
    // ================= QUANTITY & MEASURE =================
    quantity: "",              // e.g. "500 ml"
    quantityUnit: "",       // ml, l, g, kg, pcs, bottle, pack
    quantityValue: "",
    packaging: "",
    // ================= STOCK =================
    stockLevel: null,
    reorderLevel: null,
    stockStatus: "",
    sku: "",

    // ================= SUPPLIER =================
    supplier: "",

    // ================= AUDIT / TRACKING =================
    addedBy: {},
    lastEditedBy: {},
    dateAdded: "",
    lastEdited: "",

    // ================= EXTRA =================
    notes: ""

});

const keywordSources = ref([]);

//productDetails.value.keywords = generateKeywords(keywordSources);


const initialProductDetails = ref(JSON.stringify(productDetails.value))
const isDirty = computed(() => {
    return JSON.stringify(productDetails.value) !== initialProductDetails.value
})

const handleBarcodeStatus = (payload) => {
    console.log(payload.searchingCode);
    console.log(payload.barcodeFound);
    console.log(payload.productDetails);
    searchingBarcode.value = payload.searchingCode
   
//showInputs.value = payload.barcodeFound
    if(barcodeIsRequired.value){
         showInputs.value = payload.barcodeFound
    }   
    productDetails.value = payload.productDetails
    previewUrl.value = payload.productDetails.image
    console.log(isDirty)
    keywordOptions.value = payload.productDetails.keywords.map(keyword => ({
        label: keyword,
        value: keyword
    }))
    // alert(productDetails.value.quantityUnit)

    keywordSources.value = [
        productDetails.value.name,
        productDetails.value.description,
        productDetails.value.brand,
        ...productDetails.value.category, 
        ...productDetails.value.keywords, 
        productDetails.value.quantity,
        productDetails.value.quantityUnit,
        productDetails.value.quantityValue,
        productDetails.value.packaging,
        productDetails.value.supplier,
        productDetails.value.notes
    ]
};




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
const pricingBreakdown = computed(() => {
    const price = parseFloat(productDetails.value.sellingPrice) || 0
    const taxRate = parseFloat(selectedTaxRate.value) || 0

    const taxAmount = price * (taxRate / 100)
    const final = price + taxAmount

    return {
        base: price.toFixed(2),
        tax: taxAmount.toFixed(2),
        total: final.toFixed(2)
    }
})

function resetForm() {
    productDetails.value = {
        // ================= IDENTIFICATION =================
        id: null,
        barcode: "",
        name: "",
        description: "",
        brand: "",
        category: [],
        keywords: [],

        // ================= PRODUCT TYPE =================
        productType: "", // goods | service | combo

        // ================= SOURCE INFO =================
        dataSource: "", // manual | openfoodfacts | upcitemdb | go-upc | local
        isExistingProduct: false,
        isMatchedFromApi: false,
        requiresReview: false,

        // ================= MEDIA =================
        image: placeholderImage,

        // ================= PRICING =================
        sellingPrice: null,
        costPrice: null,
        tax: {},

        // ================= QUANTITY & MEASURE =================
        quantity: "",              // e.g. "500 ml"
        quantityUnit: "",       // ml, l, g, kg, pcs, bottle, pack
        quantityValue: "",
        packaging: "",
    
        // ================= STOCK =================
        stockLevel: null,
        reorderLevel: null,
        stockStatus: "",
        sku: "",

        // ================= SUPPLIER =================
        supplier: "",

        // ================= AUDIT / TRACKING =================
        addedBy: {},
        lastEditedBy: {},
        dateAdded: "",
        lastEdited: "",

        // ================= EXTRA =================
        notes: ""
    }      
}

function defaultForm() {
    alertRef.value.closeAlert()
    showInputs.value = false
    searchingBarcode.value = false
    formIntroText.value = 'Fill in the form below to complete registration of the new item'
    previewUrl.value = placeholderImage
    const clearModal = document.getElementById('clearUploadFormModal')
    if (clearModal) {
        const modal = bootstrap.Modal.getInstance(clearModal)
        if (modal) modal.hide()
    }

}

function handleFormReset() {
    if (isDirty.value) {
        // Show confirmation modal
        const clearModal = document.getElementById('clearUploadFormModal')
        if (clearModal) {
            const modal = new bootstrap.Modal(clearModal)
            modal.show()
        }
        
    } else {
        resetForm()        
    }
}

function settingTaxInfo() {
    const selectedTax = taxTypes.value.find(
        t => String(t.id) === String(selectedTaxTypeID.value)
    )
    // Exit early if not found
    if (!selectedTax) return

    selectedTaxRate.value = selectedTax.percent
    productDetails.value.tax = {
        taxTypeId: selectedTaxTypeID || 0,
        taxPercent: selectedTax.percent || 0,
        taxTypeName: selectedTax.name || 0,
        taxValue: pricingBreakdown.value.tax || 0
    }
    console.log("The product Details:", productDetails.value.tax)

}

// generating key words
function generateKeywordsParent() {

    // keywords sources
    const keywordSources = [
        productDetails.value.name,
        productDetails.value.description,
        productDetails.value.brand,
        ...productDetails.value.category,
        productDetails.value.quantity,
        productDetails.value.quantityUnit,
        productDetails.value.quantityValue,
        productDetails.value.packaging,
        productDetails.value.supplier,
        productDetails.value.notes
    ];

    // removing empty spaces
    const filledKeywordSources = keywordSources.filter(Boolean);

    //combining the words
    const combinedText = filledKeywordSources.join(" ");

    //spliting sentence into individial words
    let words = combinedText.split(/[\s,.-]+/);

    // normalizing the words to lowercase
    words = words.map(word => word.toLowerCase());

    //remove possible empty strings
    words = words.filter(word => word);

    //removing duplicates
    const uniqueWords = [...new Set(words)];

    //removing stop words
    const cleanedWords = uniqueWords.filter(word => !STOP_WORDS.includes(word));

    console.log("The key words:", cleanedWords)
}




const handleCreateOption = (value) => {
    keywordOptions.value.push({ label: value, value })
    // keep as string in selected tags
    productDetails.value.keywords.push(value)
}


// 📸 Image preview update
const handleImageSelected = (newImageUrl) => (previewUrl.value = newImageUrl)

// saving the new product
async function handleSubmit() {

    try {
        isSubmitting.value = true
        NProgress.start()

        // 1. Basic validation first
        if (!productDetails.value.name?.trim()) {
            showToast("error", "Product Name Required", "Please enter the product name.")
            return
        }

        showToast(
            "loading",
            "Saving Tax Rate",
            "Please wait while we save the tax rate..."
        )

        // 2. Generate keywords before submission
        keywordSources.value = [
            productDetails.value.name,
            productDetails.value.description,
            productDetails.value.brand,
            ...productDetails.value.category,
            ...productDetails.value.keywords,
            productDetails.value.quantity,
            productDetails.value.quantityUnit,
            productDetails.value.quantityValue,
            productDetails.value.packaging,
            productDetails.value.supplier,
            productDetails.value.notes
        ]
        // 3. Update the form state if you want the UI to reflect the final keywords
        productDetails.value.keywords = generateKeywords(keywordSources.value);
        console.log("The eventual key words are", productDetails.value.keywords)

        // 4. Build a clean payload
        // Avoid sending the reactive object directly
        const payload = {
            barcode: productDetails.value.barcode || "",
            productname: productDetails.value.name || "",
            description: productDetails.value.description || "",
            brand: productDetails.value.brand || "",
            //checks if it is an array otherwise it will submit an empty array
            category: Array.isArray(productDetails.value.category)
                ? productDetails.value.category
                : [],
            keywords:productDetails.value.keywords||null,
            productType: productDetails.value.productType || "",
            
            sellingPrice: Number(productDetails.value.sellingPrice) || 0,
            costPrice: Number(productDetails.value.costPrice) || 0,
            
            quantityUnit: productDetails.value.quantityUnit || null,
            quantity: productDetails.value.quantity || null,
            quantityValue: productDetails.value.quantityValue || null,
            packaging: productDetails.value.packaging || null,

           stockLevel: productDetails.value.stockLevel !== null
  ? Number.parseInt(productDetails.value.stockLevel)
  : null,
            reorderLevel: productDetails.value.reorderLevel !== null
  ? Number.parseInt(productDetails.value.reorderLevel)
  : null,
            stockStatus: stockStatus.value || null,
            sku: productDetails.value.sku || null,

            tax: {
                taxTypeId: productDetails.value.tax?.taxTypeId || 0,
                taxPercent: productDetails.value.tax?.taxPercent || 0,
                taxTypeName: productDetails.value.tax?.taxTypeName || "",
                taxValue: Number(productDetails.value.tax?.taxValue) || 0
            },
            image: productDetails.value.image || "",
            dataSource: productDetails.value.dataSource || "manual",
            isExistingProduct: !!productDetails.value.isExistingProduct,
            isMatchedFromApi: !!productDetails.value.isMatchedFromApi,
            dateAdded: new Date().toISOString(),
            lastEdited: new Date().toISOString(),
            createdBy: {
                fname: authStore.user?.first_name || "",
                lname: authStore.user?.last_name || "",
                userId: authStore.user?.id || "",
                avatar: authStore.user?.avatar || ""
            },
             lastEditedBy: {
                fname: authStore.user?.first_name || "",
                lname: authStore.user?.last_name || "",
                userId: authStore.user?.id || "",
                avatar: authStore.user?.avatar || ""
            }
        }
        console.log(authStore.user)
        // 5. Submit to API
        const res = await axios.post(PRODUCTS_API, payload)

        showToast(
        "success",
        "Product Created",
        `<strong>${res.data?.productname || payload.productname}</strong> was added successfully.`
        )
        resetForm() // Clear the form after successful submission
        defaultForm()
    } catch(error) {
        console.error("Product submission failed:", error)

        showToast(
            "error",
            "Submission Failed",
            error?.response?.data?.message || "Something went wrong while saving the product."
        )

    } finally {
         isSubmitting.value = false
          NProgress.done()
    }

}

//function for calculating stock status based on current stock and reorder level
const stockStatus = computed(() => {
    const stock = parseInt(productDetails.value.stockLevel) || 0
    const reorder = parseInt(productDetails.value.reorderLevel) || 0

    if (stock === 0) return "OUT_OF_STOCK"
    if (stock > 0 && stock <= reorder) return "LOW_STOCK"
    if (stock > reorder) return "ACTIVE"

    return "Unknown"
})

function withoutBarCode() {
    showInputs.value = true
    searchingBarcode.value = false
    barcodeIsRequired.value = false
    formIntroText.value = "Fill in the form below to complete registration of the new item"
}

// 🕓 Simulate page loading
onMounted(() => {
    //    document.title = 'Upload to Gallery - CSPL CRM'
    setTimeout(() => (isLoading.value = false), 1000)
    getCategories()
    getPackagingTypes()
    getTaxType()
    getMeasuringUnits()


})

// Watch the ID and manually resolve the object
watch(selectedTaxTypeID, (newVal) => {
    // Find the matching tax object using the selected ID
    settingTaxInfo()
})

watch(searchingBarcode, (newVal) => {
    if (!newVal) {
       barcodeIsRequired.value = true
    }
})



</script>

<style lang="scss" scoped>
.divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;
}

.divider::before,
.divider::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #d1d5db;
}

.divider span {
    padding: 0 10px;
    color: #6b7280;
    font-weight: 500;
}

/* Chrome, Safari, Edge */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

/* Firefox */
input[type="number"] {
    -moz-appearance: textfield;
}
</style>