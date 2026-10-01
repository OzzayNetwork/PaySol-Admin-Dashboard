<template>
  <LoaderVue v-if="isLoading" />
  <MenuCategoryForm />
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 class="mb-sm-0 font-size-18">Products</h4>
        <div class="page-title-right">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item">
              <router-link to="/">Dashboards</router-link>
            </li>
            <li class="breadcrumb-item">
              <a href="javascript: void(0);">Store Management</a>
            </li>
            <li class="breadcrumb-item active">Products</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div v-if="isEmpty" class="col-12 d-flex text-center align-items-center justify-content-center">
  <div class="col-12 col-md-6 col-lg-5 col-xl-4">
    <div class="card">
      <div class="card-body p-5 text-center">
        <!-- Empty Illustration -->
        <div class="mb-5 mt-3">
          <img src="../../assets/images/empty-products.svg" alt="No Products" class="img-fluid"
            style="max-width: 250px; height: auto;" />
        </div>

        <!-- Headline -->
        <h3 class="text-black fw-bold mb-4 text-capitalize fs-2">
          No Products Yet
        </h3>

        <!-- Description -->
        <p class="text-muted mb-4 fs-6 mx-auto text-black" style="max-width: 400px">
          Start building your store by adding your first product.
          Products appear under categories and can be searched and sold at checkout.
          Examples: <i><b>"Espresso", "Grilled Chicken", "Milkshake", "Cheesecake"</b></i>.
        </p>

        <!-- Action Button -->
        <div class="mt-5">
          <button class="btn btn-primary btn-lg px-4 py-3" data-bs-toggle="modal" data-bs-target="#addProductModal">
            ➕📦 Add Your First Product
          </button>
        </div>

        <!-- Secondary Note -->
        <div class="mt-4 pt-3 border-top">
          <p class="text-muted mb-0 pb-0">
            <i class="fas fa-lightbulb me-1 text-warning"></i>
            Tip: You can always add, edit, or remove products later.
          </p>
        </div>
      </div>
    </div>

    <!-- Logo Footer -->
    <div class="mt-1 opacity-25">
      <img src="../../assets/images/favicon.svg" alt="No Products" class="img-fluid"
        style="max-width: 130px; height: auto; filter: brightness(0) invert(0);" />
    </div>
  </div>
</div>


    <div v-else class="col-12">
      <div class="card">
        <div
          class="card-header bg-white d-flex justify-content-between align-items-center w-100 border-bottom-1 pb-3 border-bottom-1 border-bottom">
          <!-- filters -->
          <div class="me-3 text-nowrap filter-tool-bar-btns">
            <div class="btn-group">
              <button type="button" class="btn btn-light waves-effect me-2" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="bx bxs-hide font-size-16 me-1 align-middle"></i> Hide fields
              </button>

              <div class="dropdown-menu p-4" style="width: 300px;">
                <div class="row">
                  <div class="col-12">
                    <h5 class="text-capitalize mb-0">Column Visibility</h5>
                  </div>
                  <div class="col-12 mb-2">
                    <hr>
                  </div>

                  <div class="col-12 mb-3">
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-order-id" data-column="0"
                        checked>
                      <label class="form-check-label" for="column-order-id">Member ID</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-customer-name"
                        data-column="1" checked>
                      <label class="form-check-label" for="column-customer-name">Name</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-region" data-column="2"
                        checked>
                      <label class="form-check-label" for="column-region">Region</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-worede" data-column="3"
                        checked>
                      <label class="form-check-label" for="column-worede">Worede</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-address" data-column="4"
                        checked>
                      <label class="form-check-label" for="column-address">Address</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-family-size"
                        data-column="5" checked>
                      <label class="form-check-label" for="column-family-size">Family Size</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-registration-date"
                        data-column="6" checked>
                      <label class="form-check-label" for="column-registration-date">Registration Date</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-last-payment"
                        data-column="7" checked>
                      <label class="form-check-label" for="column-last-payment">Last Payment</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-status" data-column="8"
                        checked>
                      <label class="form-check-label" for="column-status">Status</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-registered-by"
                        data-column="9" checked>
                      <label class="form-check-label" for="column-registered-by">Registered By</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-next-payment"
                        data-column="10" checked>
                      <label class="form-check-label" for="column-next-payment">Next Payment</label>
                    </div>
                    <div class="form-check form-switch mb-2">
                      <input class="form-check-input toggle-column" type="checkbox" id="column-annual-payment"
                        data-column="11" checked>
                      <label class="form-check-label" for="column-annual-payment">Annual Payment</label>
                    </div>
                  </div>
                  <div class="col-12">
                    <button type="button" id="showAllColumns" class="btn btn-sm btn-outline-primary me-2">Show
                      All</button>
                    <button type="button" id="hideAllColumns" class="btn btn-sm btn-outline-danger">Hide All</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="btn-group">
              <button type="button" class="btn btn-light waves-effect" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bx bx-sort font-size-16 me-1 align-middle"></i> Sort
              </button>

              <div class="dropdown-menu p-4" style="width: 300px;">
                <div class="row">
                  <div class="col-12">
                    <h5 class="text-capitalize mb-0">Sort by field</h5>
                  </div>
                  <div class="col-12 mb-2">
                    <hr>
                  </div>
                  <div class="col-12">
                    <div class="mb-3">
                      <label for="sort-field-select" class="form-label">Field</label>
                      <select class="form-select" id="sort-field-select">
                        <option value="" selected disabled>Select field</option>
                        <option value="0">Member ID</option>
                        <option value="1">Name</option>
                        <option value="2">Region</option>
                        <option value="3">Worede</option>
                        <option value="4">Address</option>
                        <option value="5">Family Size</option>
                        <option value="6">Registration Date</option>
                        <option value="7">Last Payment</option>
                        <option value="8">Status</option>
                        <option value="9">Registered By</option>
                        <option value="10">Next Payment</option>
                        <option value="11">Annual Payment</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="mb-3">
                      <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" class="btn-check" name="sortDirection" id="btnradio4" value="asc"
                          autocomplete="off" checked>
                        <label class="btn btn-outline-secondary" for="btnradio4"><i class="bx bx-sort-up"></i>
                          Ascending</label>

                        <input type="radio" class="btn-check" name="sortDirection" id="btnradio6" value="desc"
                          autocomplete="off">
                        <label class="btn btn-outline-secondary" for="btnradio6"><i class="bx bx-sort-down"></i>
                          Descending</label>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 mt-4">
                    <button type="button" id="applySort" class="btn btn-primary w-100">Apply Sort</button>
                  </div>
                  <div class="col-12 mt-2">
                    <button type="button" id="clearSort" class="btn btn-outline-danger w-100"><i
                        class="bx bx-trash me-1"></i> Clear Sort</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="btn-group">
              <button type="button" class="btn btn-light waves-effect mx-2" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="bx bx-calendar font-size-16 me-1 align-middle"></i> Date Range
              </button>

              <div class="dropdown-menu p-4" style="width: 300px;">
                <div class="row">
                  <div class="col-12">
                    <h5 class="text-capitalize mb-0">Filter by date</h5>
                  </div>
                  <div class="col-12 mb-2">
                    <hr>
                  </div>
                  <div class="col-12">
                    <div class="mb-3">
                      <label for="start-date-input" class="form-label">Filter By Option</label>
                      <select class="form-select" id="sort-field-select">
                        <option value="" selected="" disabled="">Select field</option>
                        <option value="0">Registrtation Date</option>
                        <option value="1">Last Payment date</option>

                      </select>
                    </div>
                  </div>
                  <div class="col-12 mb-2">
                    <hr>
                  </div>

                  <div class="col-12">
                    <div class="mb-3">
                      <label for="start-date-input" class="form-label">Start Date</label>
                      <input type="date" class="form-control" id="start-date-input">
                    </div>
                  </div>

                  <div class="col-12">
                    <div class="d-flex align-items-center justify-content-center w-100">
                      <i class="bx bx-transfer-alt rotate-90 h2 text-info"></i>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-3">
                      <label for="end-date-input" class="form-label">End Date</label>
                      <input type="date" class="form-control" id="end-date-input">
                    </div>
                  </div>
                  <div class="col-12 mt-4">
                    <button type="button" id="applyDateFilter" class="btn btn-primary w-100">Apply Filter</button>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" data-toggle="modal" data-target="#filtering-modal"
              class="btn btn-light waves-effect active"><i class="bx bx-filter font-size-16 me-1 align-middle"></i> 2
              Filters</button>
          </div>

          <div class="btn-toolbar d-flex justify-content-between align-items-center w-100" role="toolbar">
            <div class="flex-grow-1">
              <div class="search-box mb-0 me-3">
                <div class="position-relative">
                  <input type="text" id="searchInput" class="form-control bg-light border-light rounded"
                    placeholder="Search..." spellcheck="false">
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>
            </div>

            <div class="d-flex">
              <button type="button" class="btn btn-primary dropdown-toggle option-selector text-capitalize">
                <i class="bx bxs-download"></i> <span class="pl-1 d-md-inline">Download Report</span>
              </button>
            </div>
          </div>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive border-1 p-0">
            <StoreProductsTable/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LoaderVue from "@/layouts/Loader.vue";
import MenuCategoryForm from "@/pages/PosMenus/MenuCategoryForm.new.vue";
import VueTableLite from "vue3-table-lite";
import StoreProductsTable from "@/pages/PosMenus/storeProducts.tables.vue"; // Adjust the path as necessary


const isLoading = ref(true);
const router = useRouter();
const isEmpty = ref(true);

onMounted(() => {
  // Simulate loading time or wait for data to load
  setTimeout(() => {
    isLoading.value = false;
  }, 1000); // Adjust timing as needed
});

const createFirstCategory = () => {
  // Add your category creation logic here
  console.log('Creating first category...');
};
</script>

<style lang="scss" scoped></style>