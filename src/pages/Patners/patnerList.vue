<template>

  <!-- Page Content -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box d-sm-flex align-items-center justify-content-between">
        <h4 class="mb-sm-0 font-size-18">All Partners</h4>
        <div class="page-title-right">
          <ol class="breadcrumb m-0">
            <li class="breadcrumb-item">
              <router-link to="/">Dashboard</router-link>
            </li>
            <li class="breadcrumb-item active">All Partners</li>
          </ol>
        </div>
      </div>
    </div>
  </div>

  <!-- loader -->
  <div v-if="isLoading">
    <LoaderVue />
  </div>

  <div v-else class="row">

    <!-- error message -->
    <div v-if="errorMessage" class="col-12">
      <div class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
    </div>

    <!-- empty state -->
    <div v-if="isEmpty && !errorMessage" class="col-12 d-flex text-center align-items-center justify-content-center">
      <div class="col-12 col-md-6 col-lg-5 col-xl-4">
        <div class="card">
          <div class="card-body p-5 text-center">
            <div class="mb-5 mt-3">
              <img src="../../assets/images/empty-states/undraw_selecting-team_zehd.svg" alt="No Partners"
                class="img-fluid" style="max-width: 250px; height: auto;" />
            </div>
            <h3 class="text-black fw-bold mb-4 fs-2">
              No Partners Showcased Yet
            </h3>
            <p class="text-muted mb-4 fs-6 mx-auto text-black" style="max-width: 400px">
              Highlight your company’s collaborations by adding partners.
            </p>
            <div class="mt-5">
              <router-link to="/partners/add" class="btn btn-primary btn-lg px-4 py-3">
                🤝✨ Add Your First Partner
              </router-link>
            </div>
            <div class="mt-4 pt-3 border-top">
              <p class="text-muted mb-0 pb-0">
                <i class="fas fa-lightbulb me-1 text-warning"></i>
                Tip: Partners you add here will be displayed publicly on your website’s “Our Partners” section.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-1 opacity-25">
          <img src="../../assets/images/favicon.svg" alt="Company Logo" class="img-fluid"
            style="max-width: 100px; height: auto; filter: brightness(0) invert(0);" />
        </div>
      </div>
    </div>

    <!-- partners table -->
    <div v-else class="col-12">
      <div class="card">
        <div
          class="card-header bg-white d-flex justify-content-between align-items-center w-100 border-bottom-1 pb-3 border-bottom-1 border-bottom">
          <!-- (header content unchanged) -->
          <!-- ... your existing header and controls remain unchanged ... -->
          <div class="btn-toolbar d-flex justify-content-between align-items-center w-100" role="toolbar">
            <div class="flex-grow-1">
              <div class="search-box mb-0 me-3">
                <div class="position-relative">
                  <input type="text" id="searchInput" class="form-control bg-light border-light rounded"
                    placeholder="Search..." spellcheck="false" @input="onSearch" />
                  <i class="bx bx-search-alt search-icon"></i>
                </div>
              </div>
            </div>

            <div class="d-flex gap-3">
              <button type="button" class="btn btn-light-brand waves-effect">
                <i class="mdi mdi-chart-timeline-variant font-size-16 align-middle me-2"></i>Activity Logs
              </button>

              <router-link to="/partners/add" class="btn btn-primary waves-effect waves-light">
                <i class="mdi-plus mdi font-size-16 align-middle me-2"></i>Add New Partner
              </router-link>
            </div>
          </div>
        </div>

        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table verticle-align-middle table-hover">
              <thead class="text-uppercase table-info table-primary">
                <tr>

                  <th class="px-4">Partner Details</th>

                  <th>Partnership Description</th>
                  <th>Products</th>
                  <th>Status</th>
                  <th>Added By</th>
                  <th>Clicks</th>
                  <th class="text-right pr-4">Edited</th>
                </tr>
              </thead>
              <tbody>
                <!-- dynamic rows -->
                <tr v-for="partner in filteredPartners" :key="partner.id">
                  <td class="">
                    <div class="d-flex align-items-center gap-3 product-info">
                      <div class="circular-container-kev" data-bs-toggle="offcanvas" data-bs-target="#partnerOffcanvas"
                        @click="getPartnerId(partner.id)">
                        <img v-if="partner.logo_url" :src="partner.logo_url" />
                        <img v-else :src="fallbackLogo" />
                      </div>
                      <div>
                        <h5 class="font-size-14 mb-1">
                          <a href="#" class="link-dark" data-bs-toggle="offcanvas" data-bs-target="#partnerOffcanvas"
                            @click="getPartnerId(partner.id)">
                            {{ partner.client_name || 'Unnamed Partner' }}
                          </a>
                        </h5>
                        <p class="text-muted mb-0 product-country">{{ partner.partner_country || 'N/A' }}</p>
                        <div>
                          <div class="product-list-action fs-12 d-flex align-items-center gap-3 mt-2" style="
                              
                          ">
                            <a href="javascript:void(0);" data-bs-toggle="offcanvas" data-bs-target="#partnerOffcanvas"
                              @click="getPartnerId(partner.id)">
                              View
                            </a>
                            <span class="vr text-muted"></span>
                            <a href="javascript:void(0);">Edit</a>
                            <span class="vr text-muted"></span>
                            <a href="javascript:void(0);" class="text-danger">Disable</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>



                  <td>
                    <p class="m-0" :title="partner.client_description || ''">
                      {{ truncateText(partner.client_description || 'No description available.', 80) }}
                    </p>
                  </td>
                  <td>
                    <div class="d-flex gap-2 flex-wrap">
                      <template v-if="partner.products_used && partner.products_used.length">
                        <!-- Show up to first two products -->
                        <div v-for="(product, index) in partner.products_used.slice(0, 2)" :key="index"
                          class="badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">
                          {{ product }}
                        </div>

                        <!-- If there are more than 2, show +n -->
                        <div v-if="partner.products_used.length > 2"
                          class="badge-alt2 bg-gray-200 text-dark bg-secondary-soft w-auto">
                          +{{ partner.products_used.length - 2 }}
                        </div>
                      </template>

                      <span v-else>-</span>
                    </div>
                  </td>



                  <td>

                    <div class="form-check form-switch form-switch-md mb-0" dir="ltr"
                      :title="partner.partner_status === 'Active' ? 'Disable Partner' : 'Enable Partner'"
                      data-bs-toggle="tooltip" data-bs-placement="top">
                      <input class="form-check-input" type="checkbox" role="switch"
                        :id="`SwitchCheckSizelg${partner.id}`" :checked="partner.partner_status === 'Active'"
                        @change="toggleStatus(partner)" />

                    </div>



                  </td>

                  <td>
                    <span class="text-muted">{{ partner.created_by || 'N/A' }}</span>
                    <br />
                    <small class="text-muted">{{ formatDate(partner.created_at) }}</small>
                  </td>

                  <td>
                    <span class="badge badge-soft-dark fw-bold">
                      <i class="mdi mdi-cursor-default-click font-size-16 text-black"></i>
                      <!-- clicks not in response sample, show 0 or use partner.clicks if present -->
                      {{ partner.clicks || 0 }} Clicks
                    </span>
                  </td>

                  <td class="text-right pr-4">
                    {{ partner.updated_on ? formatDate(partner.updated_on) : 'Not updated' }}
                  </td>
                </tr>

                <!-- fallback when no partners (shouldn't hit due to v-if above but safe) -->
                <tr v-if="!filteredPartners.length">
                  <td colspan="7" class="text-center">No partners to display.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- the details aside -->
      <PatnerDetails :partner-id="selectedPartnerId" />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import LoaderVue from "@/layouts/Loader.vue";
import ImageUploader from '@/components/ImageUploader.vue';
import SelectSearchBox from '@/components/SelectSearchBox.vue';
import SingleToastVue from '@/components/SingleToast.vue';
import PatnerDetails from './patner.Details.vue';

// ✅ Import partners API service
import partnersApi from '@/api/partners';

// import users API
import usersApi from '@/api/users';

// reactive state
const isEmpty = ref(true);
const isLoading = ref(true);
const errorMessage = ref(null);
const partners = ref([]);
const searchTerm = ref("");
const selectedPartnerId = ref(null);
const userIds = ref(null)

const router = useRouter();

// fallback logo (Vite-friendly)
const fallbackLogo = new URL('../../assets/images/icons/nope-not-here.avif', import.meta.url).href;

// helper function to truncate text
const truncateText = (text, limit = 100) => {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

// format date safely
const formatDate = (val) => {
  if (!val) return "";
  // try to parse common date formats
  const d = new Date(val);
  if (isNaN(d)) return val; // return original string if invalid date
  return d.toLocaleString();
};

// normalize response to an array safely
function normalizeResponse(resp) {
  const data = resp && resp.data ? resp.data : resp;
  if (!data) return [];
  if (Array.isArray(data)) return data;
  // some APIs return { data: [...] } or { partners: [...] }
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.partners)) return data.partners;
  // if object with numeric keys (0,1,2) -> convert to array
  if (typeof data === 'object') return Object.values(data);
  return [];
}

// computed list that supports searching (client-side)
const filteredPartners = computed(() => {
  if (!searchTerm.value) return partners.value;
  const q = searchTerm.value.toLowerCase();
  return partners.value.filter(p => {
    const name = (p.client_name || '').toString().toLowerCase();
    const country = (p.partner_country || '').toString().toLowerCase();
    const desc = (p.client_description || '').toString().toLowerCase();
    return name.includes(q) || country.includes(q) || desc.includes(q);
  });
});

// fetch partners function
const fetchPartners = async () => {
  isLoading.value = true;
  errorMessage.value = null;

  try {
    const response = await partnersApi.getAll();

    // normalize different shapes into array
    const list = normalizeResponse(response);

    // remove empty/null entries and keep only objects
    partners.value = list.filter(item => item && typeof item === 'object');

    isEmpty.value = partners.value.length === 0;
    console.log("Partners data:", partners.value);
  } catch (err) {
    console.error("Error fetching partners:", err);
    // if axios error, try to get message from err.response
    errorMessage.value = err?.response?.data?.message || err?.message || "Failed to load partners.";
  } finally {
    isLoading.value = false;
  }
};

// simple search handler
const onSearch = (e) => {
  searchTerm.value = e.target.value || "";
};

// getting partner id
const getPartnerId = (id) => {
  selectedPartnerId.value = id;
  //alert(selectedPartnerId.value)

};

onMounted(() => {
  document.title = 'List Of Partners - CSPL CRM';
  fetchPartners();
});
</script>

<style scoped></style>
