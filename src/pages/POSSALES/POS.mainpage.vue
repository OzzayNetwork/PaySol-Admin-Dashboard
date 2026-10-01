<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Make New Sale(s)</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/users/list">Sales</router-link>
                            </li>
                            <li class="breadcrumb-item active">Make Sale (POS)</li>
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
                    <div class="col-8">
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
                                                                style="right: 15px; left:unset; "
                                                                class="mdi mdi-close search-icon cursor-pointer fs-3 waves-effect "
                                                                @click="searchQuery = ''; handleSearchInput(); rawSearchQuery = ''">
                                                            </i>
                                                        </div>
                                                        <button type="submit" @click="handleSearchInput()"
                                                            title="Click to search"
                                                            class="btn btn-primary px-4  d-none align-items-center fw-bold"
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
                            <div class="card-body py-2 border-bottom">
                                <div class="row mb-0">
                                    <div class="col-12">
                                        <div class="d-flex flex-row flex-nowrap py-2 category-scroll gap-2 "
                                            style="overflow-x: auto; overflow-y: hidden; scrollbar-width: none; -ms-overflow-style: none;">

                                             <button type="button"
                                                class="btn text-capitalize btn-sm fw-bold btn-light btn-rounded waves-effect px-3 text-nowrap flex-shrink-0"
                                                :class="{ 'btn-dark text-light': categoryQuerry === '' }"
                                                @click="selectCategory('')">
                                                All <span class="opacity-50">({{ totalItems }})</span>
                                            </button>

                                            <button v-for="cat in productCategories" :key="cat.value" type="button"
                                                class="btn btn-sm fw-bold btn-light btn-rounded text-capitalize waves-effect px-3 text-nowrap flex-shrink-0"
                                                :class="{ 'btn-dark text-light': categoryQuerry === cat.categoryName }"
                                                @click="selectCategory(cat.categoryName)">
                                                {{ cat.categoryName }} <span class="opacity-50">({{ cat.count }})</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>                              
                            </div>
                            <div class="card-body">
                                <div class="row" v-if="loadingTable">                                   
                                    <div class="col-12 text-center">
                                        <p>Loading items ...</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div v-for="product in products" :key="product.id" @click="addToCart(product)"  class="col-3 col-md-6 col-lg-4 col-xl-3 mb-4 position-relative ">
                                        <div v-if="getProductQuantity(product.id)>0">
                                            <div class="avatar-xs mx-auto position-absolute right-0" style="z-index: 30; right: 0px; top: -15px;">
                                                <span class="avatar-title rounded-circle bg-success-muted font-size-16 fw-boldx">
                                                    {{ getProductQuantity(product.id) }}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="p-3  bg-light rounded border cursor-pointer waves-effect w-100"
                                            :class="[
                                                    getProductQuantity(product.id) > 0 ? 'border-success-muted border-2' : ''
                                                    ]"
                                        >
                                            <div>
                                                <div style="height: 160px;" class="img-cont d-flex align-items-center overflow-hidden rounded w-100 "
                                                :class="[product.image===''?'bg-transparent':'bg-dark-muted']"
                                                >
                                                    <img class="img h-auto"  style="width: 100%;" :src="product.image||emptyImage" alt="">
                                                </div>
                                            </div>
                                            <div class="pt-4">
                                                <h5 class="text-capitalize truncate-singleLine mb-0">
                                                    {{ product.productname || "Unknown" }}
                                                </h5>
                                               <p> <small class="">{{ product.quantity }}</small></p>
                                                <div class="d-flex gap-2 align-items-center justify-content-between ">
                                                    <div>
                                                        <h5 class="my-0"> {{ Number(product.sellingPrice ?? 0).toLocaleString('en-US', { style: 'currency', currency: 'KES' }) }}</h5>
                                                        
                                                        
                                                    </div>
                                                    <span class="text-right">
                                                        <template>{{ product.stockLevel || 0 }}</template>
                                                        <span class="text-muted me-2">{{ (product.stockLevel || 0)-(getProductQuantity(product.id)) }} <small>In stock</small></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <template v-if="loadingTable">
                                         <div v-for="(_, i) in skeletonRows" :key="i" class="col-3 col-md-6 col-lg-4 col-xl-3 mb-4 position-relative ">
                                        <div height="250px" class="img-cont d-flex align-items-center overflow-hidden rounded w-100 bg-light ">
                                             <SkeletonLoader type="text" :lines="1" height="230px" :width="'100%'"
                                                        class="mx-0" />
                                        </div>
                                        <SkeletonLoader type="text" :lines="1" height="10px" :width="'93%'"
                                                        class="mx-0 mt-2" />
                                          <SkeletonLoader type="text" :lines="1" height="10px" :width="rand(90, 180)"
                                                        class="mx-0 mt-2" />
                                    </div>
                                    </template>
                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-4">
                        <div class="card position-sticky" style="top: 20px;">
                            <div class="card-header">
                               <div class="d-flex justify-content-between">
                                     <h4 class="card-title d-flex align-items-center gap-2"> <i class="dripicons-cart fs-4"></i> <span>Cart({{ cartItemsCount }})</span></h4>
                                    <div>
                                        <button :disabled="cart.length===0" type="button" @click="clearCart()" class="btn btn-soft-danger waves-effect fw-bold flex-nowrap d-flex btn-sm gap-2 align-items-center"> <i class="dripicons-trash fs-6"></i> Clear cart</button>
                                    </div>
                               </div>
                            </div>
                            <div class="card-body cart-container  pt-1" style="height: 50vh;">
                                <h4 class="card-title text-black d-none">Cart Items</h4>

                                <div v-for="(cartItem, index) in cart" :key="cartItem.id"
                                    class="d-flex gap-2 align-items-center p-2 rounded bg-light px-3 mb-3 w-100 justify-content-between d-none">
                                    <div class="d-flex gap-2 align-items-center">
                                        <span class="fs-6 fw-bold text-black">{{ index + 1 }}.</span>
                                        <div>
                                            <p class="m-0 p-0 fw-bold text-black">{{ cartItem.name }}</p>
                                            <small class="text-muted">{{ cartItem.itemSize || '-' }} <span class="mx-2">|</span> {{ cartItem.price.toLocaleString('en-US', {style: 'currency', currency: 'KES' })||0 }}</small>
                                        </div>
                                    </div>

                                    <div class="d-flex gap-2 align-items-center ">
                                        <div class="d-flex align-items-center gap-2">
                                            <span @click="decreaseQty(cartItem)" class="waves-effect px-2"><i
                                                    class="mdi mdi-minus cursor-pointer fs-5 "></i></span>
                                            <span>{{ cartItem.quantity }}</span>
                                            <span @click="increaseQty(cartItem)" class="waves-effect px-2"><i
                                                    class="mdi mdi-plus cursor-pointer fs-5 "></i></span>
                                        </div>
                                        <div>
                                            <span class="text-right fw-bold">{{ cartItem.total.toLocaleString('en-US', {
                                                style: 'currency', currency: 'KES' })||0 }}</span>
                                        </div>
                                        <span title="Remove item from cart" class="waves-effect px-2 align-items-center" @click="removeFromCart(cartItem.id)">
                                            <i class="dripicons-cross  text-danger cursor-pointer fs-5"></i>
                                        </span>
                                    </div>
                                </div>
                                

                                <table class="table table-s" >
                                    <tbody>
                                        <tr class=" verticle-align-middle table-striped" v-for="(cartItem, index) in cart" :key="cartItem.id">
                                            <th class="verticle-align-middle pl-0 d-none" style="width: 10px;">{{ index+1 }}.</th>
                                            <th class="verticle-align-middle d-flex gap-2 align-items-center pl-0">
                                                <div class="product-img bg-light d-flex align-items-center justify-content-center">
                                                    <img :src="cartItem.image || emptyImage" class="img-fluid product-image" alt="Product Icon">
                                                </div>
                                                <div>
                                                    <p class="m-0 fw-bold text-black">{{ cartItem.name }}</p>
                                                    <div class="d-flex gap-2 p-0">
                                                        <small class="text-muted p-0 m-0 gap-2 d-flex">{{
                                                            cartItem.itemSize || '-' }} <span class="p-0">|</span> {{
                                                                cartItem.price.toLocaleString('en-US', {style: 'currency',
                                                            currency: 'KES' })||0 }}</small>
                                                    </div>
                                                </div>
                                            </th>
                                            <td class="verticle-align-middle">
                                                <div class="d-flex align-items-center p-0 gap-2">
                                                    <span @click="decreaseQty(cartItem)" class="waves-effect p-2"><i
                                                            class="mdi mdi-minus cursor-pointer fs-6 "></i></span>
                                                    <span class="">{{ cartItem.quantity }}</span>
                                                    <span @click="increaseQty(cartItem)" class="waves-effect p-2"><i
                                                            class="mdi mdi-plus cursor-pointer fs-6 "></i></span>
                                                </div>
                                            </td>
                                            <th class="text-right verticle-align-middle px-0">
                                               <div class="d-flex w-100 align-items-center p-0 gap- justify-content-end text-right">
                                                    <div class="p-0 text-right">
                                                        <span class="text-right fw-bold">{{cartItem.total.toLocaleString('en-US', {style: 'currency', currency: 'KES' })||0 }}</span>
                                                    </div>

                                                   <span title="Remove item from cart"
                                                        class="waves-effect px-2 align-items-center py-0 d-flex justify-content-center"
                                                        @click="removeFromCart(cartItem.id)">
                                                        <i class="dripicons-cross  text-danger cursor-pointer fs-5 p-0 d-flex"></i>
                                                    </span>
                                                </div>
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                                <div v-if="cart.length==0" class="d-flex flex-column text-center align-items-center justify-content-center w-100 h-100">
                                   <div class="opacity-50">
                                    <div class="mb-4">
                                        <img :src="emptyCart" class="img" height="50%"  alt="">
                                    </div>
                                     <h5 class="fw-bold text-capitalize">Tap items to add to <br> the order</h5>
                                   </div>
                                </div>
                            </div>
                            <div class="card-body pt-2 border-top border-2">
                                <div class="p-3 pb-1 bg-success-muted rounded">
                                    <h4 class="card-title d-flex gap-2 align-items-center"><i class="dripicons-tags fs-5"></i><span>Sale Summary</span></h4>
                                    <table class="table text-uppercase fs-6 table-sm border-success m-0">
                                        <tbody>
                                            <tr class="border-success">
                                                <td>Discount</td>
                                                <th class="text-right">Kes 0.00</th>
                                            </tr>
                                            <tr class="border-success">
                                                <td>Total</td>
                                               <th class="text-right">{{ cartTotal.toLocaleString('en-US', {
                                                    style: 'currency', currency: 'KES'
                                                }) || 0 }}</th>
                                            </tr>

                                            <tr>
                                                <td>Tax</td>
                                                <th class="text-right">Kes 0.00</th>
                                            </tr>

                                            <tr class="fs-4 text-black">
                                                <th>Sub Total</th>
                                                <th class="text-right">{{ cartTotal.toLocaleString('en-US', {
                                                    style: 'currency', currency: 'KES'
                                                }) || 0 }}</th>
                                            </tr>

                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                            <div class="card-footer pt-0 bg-white p-3 gap-3 d-flex  justify-content-between align-items-center ">
                               
                                <div class="gap-2 d-flex w-100">
                                    <button data-bs-target="#saveTabAside"
                                    :disabled="cart.length===0"
                                    data-bs-toggle="offcanvas"
                                    @click="isTabAsideOpen = true"
                                     type="button" class="btn btn-light waves-effect fw-bold flex-nowrap d-flex align-items-center justify-content-center btn-lg">
                                        <i class="dripicons-clock bx fs-4 align-middle me-2"></i>
                                        Save as Open Bill
                                    </button>
                                    <button 
                                        :disabled="cart.length===0"
                                        class="btn btn-primary waves-effect btn-lg fw-bold flex-grow-1">
                                        <i class="mdi mdi-check-all fs-4 align-middle me-2"></i>
                                        Complete Payment
                                    </button>

                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>

    <!-- adding category -->
      <AddCategory />
      <SaveTabAside 
        :cart="cart" 
        :cartItemsCount="cartItemsCount"
        :cartTotal="cartTotal"
        @saved="onTabSaved"
        :isTabAsideOpen="isTabAsideOpen"
      />

      <template v-if="invoiceCreated">
        <SaleModal 
        :cart="cart" 
        :cartItemsCount="cartItemsCount"
        :cartTotal="cartTotal"
        :title="invoiceTitle"
        :invoiceDetails="invoiceDetails"
      />
      </template>
</template>

<script setup>
// 🔧 Core Vue imports
import { ref, onMounted, computed, watch,onBeforeUnmount,nextTick  } from 'vue'
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
import ImageUploader from '@/components/ImageUploader.vue'
import SingleToastVue from '@/components/SingleToast.vue'
import NProgress from "nprogress"
import ImageToast from "@/components/ImageToast.vue"
import ClearFormModal from "@/components/guards/ClearFormConfirm.vue"
import UnsavedChangesConfirm from "@/components/guards/UnsavedChangesConfirm.vue"
import SelectSearchBox from '@/components/SelectSearchBox.vue'
import emptyImage from "../../assets/images/icons/packaging.svg"
import AddCategory from '../Products.POS/products.category.add.pos.vue'
import SaleModal from './components/sale.modal.vue';

import SaveTabAside from './components/SaveTabAside.vue';


import {
    formatUploadDate,
    formatDateTime,
    smartDate,
    timeAgo,
    formatDate,
    getUserPreferences,
    dateDiff
} from '@/utils/dates';
//import {toLocaleString} from '@/utils/currency'

// Importing the results images
import successImage from "../../assets/images/icons/check.png";
import errorImage from "../../assets/images/icons/error.png";
import emptyCart from "../../assets/images/icons/POS/empty-cart.svg";



import LoaderVue from '@/layouts/Loader.vue'
import { get } from 'jquery';
import ProductsCategoryAddPos from '../Products.POS/products.category.add.pos.vue';

const isLoading = ref(true)

const categoryQuerry=ref("")
const totalItems=ref(0)

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
const invoiceDetails = ref({})
const invoiceTitle = ref("")
const invoiceCreated=ref(false)

// infinite scroll item
const scrollContainer = ref(null)
const bottomTrigger = ref(null)

const isTabAsideOpen = ref(false)

// pagination variables
const currentPage = ref(1)
const pageSize = ref(8)
const isLoadMoreLoading = ref(false) // Separate loading state for Load More button
const displayedFiles = ref([]) // Files to show
const totalProducts = ref(48)
const totalPages = ref(Math.ceil(totalProducts.value / pageSize.value))

const skeletonRows = Array.from({ length: 8 })
const productDetails = ref({})
const rand = (min, max) => `${Math.floor(Math.random() * (max - min) + min)}`

// Toast state
const toastStatus = ref(null);
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);
const showToast = ref(false);

//the cart variables
const cart = ref([])




async function getCategories() {
    try {
        const res = await axios.get(PRODUCT_CATEGORY_API)
        console.log("Product categories ", res.data)
        productCategories.value = res.data

        totalItems.value = res.data.reduce((sum, row) => {
            return sum + (Number(row.count) || 0)
        }, 0)

    } catch (error) {
        console.error('Error fetching folders:', error)
    } finally {

    }
}

function selectCategory(value) {
    categoryQuerry.value = value
    // Disconnect observer before fetching new category
    //if (observer) observer.disconnect()
    console.log('Selected category:', value)
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
        totalProducts.value=res.data.total
        totalPages.value = Math.ceil(res.data.total/pageSize.value)
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
    loadingTable.value = true
    products.value = [] // Clear current products to show loading state
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
// 

//cart functions

function addToCart(product) {
  const existingItem = cart.value.find(item => item.id === product.id)

  if (existingItem) {
    // already in cart → increase quantity
    existingItem.quantity += 1
    existingItem.total = existingItem.quantity * Number(existingItem.price)
  } else {
    // new item → add to cart
    cart.value.push({
      id: product.id,
      name: product.productname,
      itemSize:product.quantity,
      price: Number(product.sellingPrice),
      quantity: 1,
      total: Number(product.sellingPrice),
      image:product.image
    })
  }
}

function clearCart() {
  cart.value = []
}

const cartTotal = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.total, 0)
})

const cartItemsCount=computed(()=>{
    return cart.value.reduce((sum,item)=>sum+item.quantity,0)
})

function removeFromCart(id) {
  cart.value = cart.value.filter(item => item.id !== id)
}

function decreaseQty(item) {
  if (item.quantity > 1) {
    item.quantity--
    item.total = item.quantity * item.price
  } else {
    removeFromCart(item.id)
  }
}

function increaseQty(item) {
    item.quantity++
    item.total = item.quantity * item.price
  
}

function getProductQuantity(productId) {
  const item = cart.value.find(i => i.id === productId)
  return item ? item.quantity : 0
}

function onTabSaved(data) {
    invoiceCreated.value=true
    // Clear the cart when a tab is saved
    clearCart()  
    invoiceDetails.value = data
    invoiceTitle.value = `Open Bill Created Successfully`
     // Show the sale modal with the invoice details
     //alert("Tab saved successfully! Invoice details: " + JSON.stringify(data))

     // Show the sale modal
        nextTick(() => {
            const saleModalEl = document.getElementById('saleModal')
    const saleModal = bootstrap.Modal.getOrCreateInstance(saleModalEl)
    saleModal.show()
    closeSaveTabAside()
        })
   
}

function closeSaveTabAside() {
    const asideEl = document.getElementById('saveTabAside')
    bootstrap.Offcanvas.getInstance(asideEl)?.hide()
}


// 🕓 Simulate page loading
onMounted(() => {
  //document.title = 'Upload to Gallery - CSPL CRM'
  setTimeout(() => (isLoading.value = false), 1000)
  getCategories()
   getProducts()

  
})

</script>

<style scoped>
.cart-container{
    overflow-y: auto;
    scrollbar-width: thin;              /* Firefox */
    scrollbar-color: #c1c1c1 transparent;
}

/* Chrome, Edge, Safari */
.cart-container::-webkit-scrollbar {
    width: 6px;
}

.cart-container::-webkit-scrollbar-track {
    background: transparent;
}

.cart-container::-webkit-scrollbar-thumb {
    background-color: #c1c1c1;
    border-radius: 10px;
    transition: background 0.3s ease;
}

.cart-container::-webkit-scrollbar-thumb:hover {
    background-color: #9e9e9e;
}

.product-img {
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 8px; /* optional, gives a soft modern feel */
    background-color: #f8f9fa; /* keeps empty space clean */
min-width: 50px;
    max-width: 50px;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* fills nicely, crops excess */
    /* object-fit: contain; */
    
}
</style>