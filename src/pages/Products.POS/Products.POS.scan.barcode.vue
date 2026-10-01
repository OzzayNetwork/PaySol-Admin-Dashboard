<template>
    <div class="position-relative">
        <form @submit.prevent="handleSearchInput(barcodeValue)" class=" mb04 pb-0" id="submit-code">
            <fieldset :disabled="searchingCode" class="input-group  flex-nowrap ">
                <div class="flex-grow-1 ">
                <i style="position: absolute; left: 25px; top: 8px; bottom: 15px;"
                    class="mdi-barcode-scan mdi search-icon fs-3 opacity-50">
                </i>
                <input style="padding-left: 55px; border-radius:640px;" type="text"
                    class="form-control  flex-grow-1 form-control-lg " placeholder="Enter Barcode" required
                    spellcheck="false" data-ms-editor="true" v-model="barcodeValue">


                <i v-if="searchQuery != ''" title="Clear search" style="right: 60px; left:unset; "
                    class="mdi mdi-close search-icon cursor-pointer fs-3 waves-effect d-none"
                    @click="searchQuery = ''; handleSearchInput('')">
                </i>

                <div style="position: absolute; top: 7px; right: 8px;" class="d-flex gap-2">
                    <button type="button"
                        class="btn btn-light btn-rounded waves-effect gap-2 d-flex  text-dark fw-semibold">
                        <i class="mdi-scan-helper mdi fs-6"></i>
                        <span class="d-none d-md-flex">Scan Barcode</span>
                    </button>
                    <button type=" button" class="btn btn-primary btn-rounded waves-effect waves-light d-none">
                        <i class="bx bx-search fs-5"></i>
                    </button>
                    <button type="submit" style="height: 2.3rem; width: 2.3rem;"
                        class="btn btn-primary waves-light position-relative p-0 avatar-xs rounded-circle btn-lg d-flex align-items-center justify-content-center">
                        <span  v-if="!searchingCode" class="avatar-title bg-transparent text-reset ">
                            <i class="bx bx-search fs-4"></i>
                        </span>

                        <span
                        v-if="searchingCode"
                        class="spinner-border spinner-border-sm "
                        role="status"
                        
                        ></span>
                    </button>
                    <ul class="list-inline font-size-20 contact-links mb-0 d-none">
                        <li class="list-inline-item p-2 px-3 border-round m-0 ">
                            <a href="javascript: void(0);" title="Search" class="d-flex gap-2 align-items-center">
                                <i class="bx bx-search"></i> <span class="" style="font-size:13px;">Search</span>
                            </a>
                        </li>

                        <li class="list-inline-item p-2 px-3 border-round m-0 d-lg-inline ">
                            <a @click="toggleDetailsPanel" href="javascript: void(0);" title="Details"
                                class="d-flex gap-2 align-items-center">
                                <i class="bx bx-info-circle"></i> <span class="" style="font-size:13px;">Details</span>
                            </a>
                        </li>
                    </ul>


                </div>
            </div>
            </fieldset>
            
        </form>
        <p class="text-muted text-center mt-3 w-100 text-dark" :class="[searchingCode ? 'ai-shimmer-text' : '']"
            v-html="feedBackLoader">
        </p>

        <div class="px-4">
            <template v-if="showAlert"  >
                
                <div v-if="productExistsLocal"
                    class="gap-3 alert animate__animated animate__fadeInUp animate__fast alert-warning alert-dismissible fade show rounded border-warning-subtle d-flex align-items-center mb-3 p-3 px-3"
                    role="alert">

                    <span class="mdi mdi-alert-circle-outline fs-1 text-dark"></span>

                    <span class="text-capitalize flex-grow-1 ">
                        <span class="fw-semibold me-1 text-black fs-6">Duplicate Detected.</span>
                        <br>
                        <span class="text-black text-muted">
                            <strong>{{ existingProduct?.productname || "Product" }}</strong> matches this barcode
                            <strong>({{ barcodeID }})</strong>.
                            We found an existing record. You can review or update it.


                        </span>

                    </span>
                    <div class="d-flex align-items-center gap-2">
                        <a href="#" style="white-space: nowrap;"
                            class="ms-2  btn btn-dark text-no-wrap text-capitalize " data-bs-toggle="modal"
                             data-bs-target="#productDetails">
                            Review Product
                        </a>

                        <button type="button" class="btn-close fs-6 position-relative " @click="showAlert = false">
                        </button>

                    </div>


                </div>

                
               <div v-if="barcodeExists && showAlert"
                    class="gap-3 alert animate__animated animate__fadeInUp animate__fast alert-info alert-dismissible fade show rounded border-info-subtle d-flex align-items-center mb-3 p-3 px-3"
                    role="alert">

                    <span class="mdi-cloud-check mdi fs-1   text-dark"></span>

                    <span class="text-capitalize flex-grow-1 ">
                        <span class="fw-semibold me-1 text-black fs-6">Product matched.</span>
                        <br>
                        <span class="text-muted">

                            <strong>{{productDetails.name || "Product"}} </strong> matched barcode <strong>({{ barcodeID }})</strong>.
                            Details are ready for review. You can edit them before saving
                        </span>

                    </span>
                    <div class="d-flex align-items-center gap-2">
                        <a href="#" style="white-space: nowrap;"
                            class="ms-2  btn btn-primary text-no-wrap text-capitalize d-none" data-bs-toggle="modal"
                            data-bs-target="#createProductModal">
                            Detailed View
                        </a>

                        <button type="button" class="btn-close fs-6 position-relative " @click="showAlert = false">
                        </button>

                    </div>


                </div>

                <div v-if="BarCodeNotFound && showAlert"
                    class="gap-3 alert animate__animated animate__fadeInUp animate__fast alert-secondary alert-dismissible fade show rounded border-secondary-subtle d-flex align-items-center mb-3 p-3 px-3"
                    role="alert">

                    <span class="mdi mdi-magnify-scan fs-1 text-dark"></span>

                    <span class="text-capitalize flex-grow-1 ">
                        <span class="fw-semibold me-1 text-black fs-6">No match found.</span>
                        <br>
                        <span>We checked available sources but found no match for .<strong>{{ barcodeID }}</strong>.
                            You can proceed to register the product or verify the barcode.</span>
                       
                    </span>
                    <div class="d-flex align-items-center gap-2">
                         <button type="submit"  href="#" style="white-space: nowrap;" class="ms-2  btn btn-outline-secondary waves-effect waves-light text-capitalize" data-bs-toggle="modal"
                            data-bs-target="#createProductModal" form="submit-code">
                            Retry 
                        </button>
                        <a href="#" style="white-space: nowrap;" class="ms-2  btn btn-dark text-no-wrap text-capitalize waves-effect waves-light" data-bs-toggle="modal"
                            data-bs-target="#createProductModal">
                            Register product 
                        </a>

                        <button type="button" class="btn-close fs-6 position-relative" @click="showAlert = false">
                        </button>

                    </div>

                    
                </div>
            </template>

        </div>
    </div>
    <ImageToast :status="toastStatus" :title="toastTitle" :message="toastMessage" :image="toastImage" :imageHeight="70"
        @hide="toastStatus = null" />

         <ProductDetailsModal
            :productDetails="existingProduct"
         />
</template>

<script setup>
// 🔧 Core Vue imports
import { ref, onMounted, nextTick, computed, watch } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import axios from 'axios'
// import express from "express"

//components
import successImage from "../../assets/images/icons/check.png"
import errorImage from "../../assets/images/icons/error.png"
import warningImage from "../../assets/images/icons/info-5-xxl.png"
import infoLight from "../../assets/images/icons/infoLight.png"
import emptyImage from "../../assets/images/icons/packaging.svg"
import noResultsFound from "../../assets/images/icons/noResultsFound.png"
import LoaderVue from '@/layouts/Loader.vue'
import NProgress from "nprogress"
import ImageToast from "@/components/ImageToast.vue"
import ClearFormModal from '@/components/guards/ClearFormConfirm.vue'
import UnsavedChangesConfirm from '@/components/guards/UnsavedChangesConfirm.vue'
import ProductDetailsModal from './products.details.modal.pos.vue'


const emit=defineEmits(["barcode-status"])

// Toast state
const toastStatus = ref(null)
const toastTitle = ref("")
const toastMessage = ref("")
const toastImage = ref(null)

function showToast(status, title, message, image) {
    toastStatus.value = status
    toastTitle.value = title
    toastMessage.value = message
    toastImage.value = status === "success" ? successImage : errorImage
}




const isLoading = ref(true)
const feedBackLoader = ref(" Scan barcode or type the number to search product databases")

//variables
const barcodeValue = ref("")
const searchingCode = ref(false)
const existingProduct = ref({})
const productExistsLocal = ref(false)
const barcodeFound = ref(false)
const showAlert = ref(true)
const openFoodExists = ref(false)
const barcodeExists = ref(false)
const BarCodeNotFound = ref(false)

const barcodeID=ref("")

//product details
const productDetails = ref({

    // ================= IDENTIFICATION =================
    id: null,
    barcode: "",
    name: "",
    description: "",
    brand: "",
   category: [],
   keywords:[],

    // ================= PRODUCT TYPE =================
    productType: "", // goods | service | combo

    // ================= SOURCE INFO =================
    dataSource: "", // manual | openfoodfacts | upcitemdb | go-upc | local
    isExistingProduct: false,
    isMatchedFromApi: false,
    requiresReview: false,

    // ================= MEDIA =================
    image: "",

    // ================= PRICING =================
    sellingPrice: null,
    costPrice: null,

    // ================= QUANTITY & MEASURE =================
    quantity: "",              // e.g. "500 ml"
    quantityUnit: "",       // ml, l, g, kg, pcs, bottle, pack
    quantityValue:"",
    packaging:"",
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

//existing items/products from search


//APIS
import POSAPI from "@/api/POS.API"
const PRODUCTS_API = POSAPI.products()
const OPEN_FOOD_API = `https://world.openfoodfacts.org/api/v0/product/`;
const OPEN_PRODUCTS_API = `https://world.openproductsfacts.org/api/v0/product/`;
const OPEN_BEAUTY_API = `https://world.openbeautyfacts.org/api/v0/product/`;
const OPEN_PET_FOOD_API = `https://world.openpetfoodfacts.org/api/v0/product/`;
const UPC_ITEM_API = `https://api.upcitemdb.com/prod/trial/lookup?upc=`




async function handleSearchInput() {

    toastStatus.value = "loading";
    toastTitle.value = "Loading";
    toastMessage.value = "Please wait while we complete this process...";
    toastImage.value = null;
    const exists = await handleLocalProductSearch()
    barcodeID.value=barcodeValue.value


    if (!exists) {
        openFoodExists.value = await handleOpenAPISources()
        if (!openFoodExists.value) {
            //const existsUPCItem=await handleUPCItemApi()

            showToast(
                "success",
                "No Match Found",
                `
            We checked available sources but found no match for <strong>${barcodeValue.value}</strong>.
            <br> 
            <span class="text-muted">You can proceed to register the product or verify the barcode.</span>
            <br> <br>
             <a class="btn btn-primary waves-effect text-white btn-sm btn-link"
                    href="/products/${existingProduct.value?.id}">
                    Register Item →
                </a>
            `
            );
            toastImage.value = noResultsFound
            feedBackLoader.value = "No Match Found for " + barcodeValue.value
            BarCodeNotFound.value = true
            barcodeFound.value=false

        }
        else {
            feedBackLoader.value = `<small class="text-muted">
            Information was gathered from external sources and may vary. Kindly review and adjust as needed.
            </small>`
            barcodeFound.value=true
        }
    }
}
let interval = null;



async function handleOpenAPISources() {
    NProgress.start()
    searchingCode.value = true

    const startLoader = () => {
        const messages = [
            "Searching your catalog...",
            "Checking global product databases...",
            "Matching barcode...",
            "Preparing results..."
        ];

        let index = 0;

        interval = setInterval(() => {
            feedBackLoader.value = messages[index];
            index = (index + 1) % messages.length;
        }, 1200);
    };

    const stopLoader = () => {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    };
    startLoader()

    // open api sources
    // open api sources
  const openAPISources = [
    {
        name: "openfoodfacts",
        label: "Open Food Facts",
        url: OPEN_FOOD_API
    },
    {
        name: "openproductsfacts",
        label: "Open Products Facts",
        url: OPEN_PRODUCTS_API
    },
    {
        name: "openbeautyfacts",
        label: "Open Beauty Facts",
        url: OPEN_BEAUTY_API
    },
    {
        name: "openpetfoodfacts",
        label: "Open Pet Food Facts",
        url: OPEN_PET_FOOD_API
    }
];
    try {
        let matchedProduct = null;
        let matchedSource = null;
        let matchedCode=null
        let MatchedSource=null

        for (const source of openAPISources) {
            try {
                const res = await axios.get(`${source.url}${barcodeValue.value}.json`);
                //console.log("API response from", source, res.data);

                const products = res.data;

                if (products.status === 1 && products.product) {
                    matchedProduct = products.product;
                    matchedSource = source;
                    matchedCode=products.code
                    MatchedSource=source.label
                    break;
                }
            } catch (error) {
                console.log("API failed:", source, error);
                continue;
            }
        }

        if (matchedProduct) {
            existingProduct.value = matchedProduct;
           //alert(MatchedSource)

            //defining product detals
                  productDetails.value = {
                    barcode: matchedCode || barcodeValue.value,
                    name: getProductName(matchedProduct),
                    description: matchedProduct?.generic_name_en || matchedProduct?.generic_name || "",
                    brand: matchedProduct?.brands?.trim() || "",
                    category: [],
                    keywords:matchedProduct?._keywords,
                    productType:"goods",
                    image: matchedProduct?.image_url || "",
                    sellingPrice: null,
                    costPrice: null,
                    tax:{},
                    quantity: matchedProduct?.quantity || "",
                    quantityValue: matchedProduct?.product_quantity || "",
                    quantityUnit: matchedProduct?.product_quantity_unit || "",
                    packaging:matchedProduct?.packagings.shape || "",
                    stockLevel: null,
                    reorderLevel: null,
                    sku: "",
                    supplier: "",
                    source: matchedSource,
                    addedBy: {},
                    lastEditedBy: {},
                    dateAdded: "",
                    lastEdited: "",
                    isExistingProduct: false,
                    isMatchedFromApi: true,
                    requiresReview: true,
                    notes: "",
                    stockStatus: "",
                    dataSource: MatchedSource
                }
          
            showToast(
                "success",
                "Product Found",
                `
            <strong>${matchedProduct?.product_name || "Product"}</strong> matched barcode <strong>(${barcodeValue.value})</strong>.
            <br>
            <span class="text-muted">Details are ready for review. You can edit them before saving.</span>
            `
            );

            const productImage = matchedProduct.image_thumb_url;
            toastImage.value = productImage?.trim() ? productImage : emptyImage;

            stopLoader();
            feedBackLoader.value = "Match found";
            barcodeExists.value = true;
            openFoodExists.value = true;

            console.log("Matched source:", matchedSource);

            return true;
        } else {
            existingProduct.value = null;
            barcodeExists.value = false;

            stopLoader();
            feedBackLoader.value = "Deep search to commence";

            return false;
        }

    } catch (error) {
        console.log("Searching error:", error);
        return false;
    } finally {
        NProgress.done();
        searchingCode.value = false;
    }

}

//creating the name based on open search
function getProductName(matchedProduct) {
    if (!matchedProduct) return "Unnamed Product";

    // 🔥 PRIORITY: product_name_en → product_name → fallback
    const rawName =
        matchedProduct.product_name_en ||
        matchedProduct.product_name ||
        matchedProduct.generic_name ||
        "";

    const brand = matchedProduct.brands || "";
    const quantity = matchedProduct.quantity || "";

    // Step 1: combine brand + name (avoid duplication)
    let name = rawName;

    if (
        brand &&
        rawName &&
        !rawName.toLowerCase().includes(brand.toLowerCase())
    ) {
        name = `${brand}-${rawName}`;
    }

    // Step 2: clean quantity → "500 ml" → "500ml"
    const cleanQuantity = "-"+quantity
    ;

    // Step 3: build final name
    let finalName = name || brand || "Unnamed Product";

    if (cleanQuantity && !finalName.toLowerCase().includes(cleanQuantity)) {
        finalName = `${finalName} ${cleanQuantity}`;
    }

    // Step 4: clean formatting
    return finalName.replace(/\s+/g, " ").trim();
}


async function handleUPCItemApi() {
    resetBarcodeSearch();
    feedBackLoader.value = "Checking retail product sources...";
    searchingCode.value = true;
    NProgress.start();
    barcodeValue.value = "0861226000003"

    try {
        const res = await axios.get(`${UPC_ITEM_API}${barcodeValue.value}`);
        console.log("UPCitemdb response:", res.data);

        const items = res.data.items;

        if (items && items.length > 0) {
            const product = items[0];

            existingProduct.value = product;

            showToast(
                "success",
                "Product Found",
                `
                <strong>${product.title || "Product"}</strong> matched barcode <strong>(${barcodeValue.value})</strong>.
                <br>
                <span class="text-muted">Details are ready for review. You can edit them before saving.</span>
                `
            );

            // image handling
            const productImage = product.images?.[0];
            toastImage.value = productImage?.trim() ? productImage : emptyImage;

            //stopLoader();
            feedBackLoader.value = "Match found";
            barcodeExists.value = true;

            return true; // ✅ FOUND
        } else {
            existingProduct.value = null;
            barcodeExists.value = false;

            // stopLoader();
            feedBackLoader.value = "No retail match found";

            return false; // ❌ NOT FOUND
        }

    } catch (error) {
        console.log("UPCitemdb error:", error);
        //stopLoader();
        feedBackLoader.value = "UPC lookup failed";

        return false;
    } finally {
        NProgress.done();
        searchingCode.value = false;
    }
}

async function resetBarcodeSearch() {
    existingProduct.value = {}
    productExistsLocal.value = false
    barcodeFound.value = false
    showAlert.value = true
    openFoodExists.value = false
    barcodeExists.value = false
    BarCodeNotFound.value = false

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
        productType: "goods", // goods | service | combo

        // ================= SOURCE INFO =================
        dataSource: "", // manual | openfoodfacts | upcitemdb | go-upc | local
        isExistingProduct: false,
        isMatchedFromApi: false,
        requiresReview: false,

        // ================= MEDIA =================
        image: "",

        // ================= PRICING =================
        sellingPrice: null,
        costPrice: null,
        tax:{},

        // ================= QUANTITY & MEASURE =================
        quantity: "",              // e.g. "500 ml"
        quantityUnit: "",       // ml, l, g, kg, pcs, bottle, pack
        quantityValue:"",
        packaging:"",

        // ================= STOCK =================
        stockLevel: null,
        reorderLevel: null,
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

    };
}

async function handleLocalProductSearch() {
    resetBarcodeSearch()
    feedBackLoader.value = "Searching your catalog..."
    searchingCode.value = true


    try {
        const res = await axios.get(`${PRODUCTS_API}?barcode=${barcodeValue.value}`);
        console.log("The products are: ", res.data)

        const products = res.data;

        if (products.length > 0) {
            existingProduct.value = products[0];
            productExistsLocal.value = true;

            showToast(
                "success",
                "Duplicate Detected",
                `
                <strong>${existingProduct.value?.productname || "Product"}</strong> matches this barcode <strong>(${barcodeValue.value})</strong>.
                <br>
                <span class="text-muted">We found an existing record. You can review or update it.</span>
                <br><br>
                <a class="btn btn-primary waves-effect text-white"
                    data-bs-toggle="modal" data-bs-target="#productDetails"
                    href="/products/${existingProduct.value?.id}">
                    Review Product →
                </a>
                `
            );

            toastImage.value = infoLight;
            feedBackLoader.value = "Detected Matching Product";

            return true; // ✅ FOUND
        } else {
            existingProduct.value = null;
            productExistsLocal.value = false;

            return false; // ❌ NOT FOUND
        }

    } catch (error) {
        console.log("Searching error:", error);
        return false; // ❌ treat errors as not found (or handle differently)
    } finally {
        NProgress.done();
        searchingCode.value = false;
    }
}

function closeAlert(){
    showAlert.value=false
}
defineExpose({
    closeAlert
})

watch(
  [searchingCode, barcodeFound, productDetails],
  ([searching, found, product]) => {
    emit("barcode-status", {
      searchingCode: searching,
      barcodeFound: found,
      productDetails: product
    });
  },
  { immediate: true, deep: true }
);

// 🕓 Simulate page loading
onMounted(() => {
    //document.title = 'Upload to Gallery - CSPL CRM'
    setTimeout(() => (isLoading.value = false), 1000)


})

</script>

<style lang="scss" scoped></style>