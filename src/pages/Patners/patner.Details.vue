<template>
  <div class="row">
    <div class="col-12">
      <button
        class="btn btn-primary d-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#partnerOffcanvas"
        aria-controls="offcanvasRight"
      >
        Toggle right offcanvas
      </button>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="partnerOffcanvas"
        aria-labelledby="offcanvasRightLabel"
      >
        <!-- Header -->
        <div class="offcanvas-header border-bottom py-0 pr-0">
          <div class="d-flex align-items-center gap-2">
            <span class="text-muted">
              <button
                type="button"
                class="btn btn-white position-relative p-0 avatar-sm rounded-circle"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              >
                <span class="avatar-title bg-transparent text-reset">
                  <i class="bx bx-arrow-back font-size-22"></i>
                </span>
              </button>
            </span>
            <h5 id="offcanvasRightLabel" class="mb-0">Partnership Details</h5>
          </div>

          <div>
            <div class="d-flex header-action-btn">

              <!-- status update -->
               <div
                  class="d-flex ms-1 align-items-center justify-content-center"
                  :title="partner?.partner_status === 'Active' ? 'Disable Partner' : 'Enable Partner'"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                >
                  <div class="form-check form-switch form-switch-md mb-0" dir="ltr">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      role="switch"
                      :id="`SwitchCheckSizelg${partner?.id}`"
                      v-model="partnerActive"
                      @change="toggleStatus(partner)"
                    />

                    <label class="form-check-label" :for="`SwitchCheckSizelg${partner?.id}`"></label>
                  </div>
                </div>

              <!-- Edit -->
              <div
                class="d-inline-block d-lg-inline-block ms-1"
                title="Edit Partnership"
              >
                <button
                  type="button"
                  class="btn header-item noti-icon waves-effect"
                >
                  <i class="bx bx bx-edit-alt"></i>
                </button>
              </div>

              <!-- Change Logo -->
              <div
                class="d-inline-block d-lg-inline-block ms-1"
                title="Change Logo"
              >
                <button
                  type="button"
                  class="btn header-item noti-icon waves-effect"
                >
                  <i class="bx bx bx-camera"></i>
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            class="btn-close text-reset d-none"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div class="offcanvas-body p-0">
          <!-- Logo -->
          <div
            class="w-100 d-flex align-items-center justify-content-center mb-0 p-3"
          >
            <div v-if="loading" class="placeholder-glow w-50 text-center">
              <div class="placeholder col-6 rounded-circle" style="height:80px; width:80px;"></div>
            </div>
            <div v-else>
              <img
                v-if="partner?.logo_url"
                :src="partner?.logo_url"
                class="img-fluid"
                alt="Company-logo"
              />
              <img v-else :src="fallbackLogo" class="img-fluid" />
            </div>
          </div>

          <!-- Stats -->
          <div class="p-3 border-top border-dark-subtle">
            <div class="row">
              <div class="col-6">
                <div
                  class="card border-primary-subtle bg-info bg-opacity-10 text-dark border-dark border-dashed mb-0 h-100"
                >
                  <div class="card-body">
                    <i class="mdi mdi-cursor-default-click fs-1 text"></i>
                    <h5 class="fs-4 mt-4 mb-1 fw-bold">657</h5>
                    <div class="fs-12 text-reset fw-normal">Website Clicks</div>
                  </div>
                </div>
              </div>

              <div class="col-6">
                <div
                  class="card border-primary-subtle bg-success bg-opacity-10 text-dark border-dark border-dashed mb-0 h-100"
                >
                  <div class="card-body">
                    <i class="mdi mdi-clock-time-five-outline fs-1 text"></i>
                    <h5 class="fs-4 mt-4 mb-1 fw-bold">56</h5>
                    <div class="fs-12 text-reset fw-normal">
                      Months since Addition
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Details -->
          <div
            class="px-4 py-2 fw-bold text-dark sticky-top bg-dark bg-opacity-10 text-black border-top border-bottom border-dark-subtle"
          >
            Details
          </div>

          <div class="list-group">
            <div
              v-if="loading"
              class="list-group-item list-group-item-action placeholder-glow"
            >
              <p class="placeholder col-8"></p>
              <p class="placeholder col-6 "></p>

              <p class="placeholder col-12 "></p>
              <p class="placeholder col-10"></p>
            </div>

            <template v-else>
              <div class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  <h5 class="mb-1">Partner Name</h5>
                  <small>{{ partner?.created_at }}</small>
                </div>
                <p class="mb-1">{{ partner?.client_name || "-" }}</p>
                <small class="text-muted">Organization Name</small>
              </div>

              <div class="list-group-item list-group-item-action">
                <h5 class="mb-1">Abbreviation</h5>
                <p class="mb-1">{{ partner?.client_abbreviation || "-" }}</p>
                <small class="text-muted">Short form</small>
              </div>

              <div class="list-group-item list-group-item-action">
                <h5 class="mb-1">Organization Type</h5>
                <p class="mb-1">{{ partner?.client_type || "-" }}</p>
                <small class="text-muted">Business category</small>
              </div>

              <div class="list-group-item list-group-item-action">
                <h5 class="mb-1">Country</h5>
                <p class="mb-1">{{ partner?.partner_country || "N/A" }}</p>
                <small class="text-muted">Location</small>
              </div>

              <div class="list-group-item list-group-item-action">
                <h5 class="mb-1">Partnership Type</h5>
                <p class="mb-1">{{ partner?.partnership_type || "-" }}</p>
                <small class="text-muted">Collaboration level</small>
              </div>

              <div class="list-group-item list-group-item-action">
                <h5 class="mb-1">Products</h5>
                <p class="mb-1">
                  <span
                    v-for="(product, idx) in parsedProducts"
                    :key="idx"
                    class="badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto  me-1"
                  >
                    {{ product }}
                  </span>
                </p>

                <small class="text-muted">Associated products</small>
              </div>

              <div class="list-group-item list-group-item-action">
                <h5 class="mb-1">Description</h5>
                <p class="mb-1">
                  {{ partner?.client_description ||
                  "No description available." }}
                </p>
                <small class="text-muted">Partnership overview</small>
              </div>

               <div class="list-group-item list-group-item-action">
                <h5 class="mb-1">Added By</h5>
                <p class="mb-1">
                  {{ partner?.created_by ||
                  "User's information is not available." }}
                </p>
                <small class="text-muted">This Partner was added on {{ partner?.created_at }}</small>

              </div>
            </template>
          </div>

          <!-- Links -->
          <div
            class="px-4 py-2 fw-bold text-dark sticky-top bg-dark bg-opacity-10 text-black border-top border-bottom border-dark-subtle"
          >
            Links
          </div>

          <div class="list-group">
            <div
              v-if="loading"
              class="list-group-item list-group-item-action placeholder-glow"
            >
              <p class="placeholder col-10"></p>
              <p class="placeholder col-6"></p>
            </div>
            <div v-else class="list-group-item list-group-item-action">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ partner?.link_title || "Website" }}</h5>
                <small>{{ partner?.updated_on || "N/A" }}</small>
              </div>
              <p class="mb-1">
                <a
                  :href="sanitizedUrl"
                  target="_blank"
                  class="text-decoration-none"
                  >{{ partner?.link_url }}</a
                >
              </p>
              <small class="text-muted">Clicks: 847 | Last clicked: 2h ago</small>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-3">
            <div class="d-grid gap-2">
              <button class="btn btn-outline-primary" type="button">
                <i class="bx bx-edit-alt me-1"></i> Edit Partnership
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import partnersApi from "@/api/partners.js";
import NProgress from "nprogress";

const props = defineProps({
  partnerId: {
    type: Number,
    required: true,
  },
});

const partner = ref(null);
const loading = ref(false);
const fallbackLogo = new URL(
  "../../assets/images/icons/nope-not-here.avif",
  import.meta.url
).href;

const fetchPartner = async (id) => {
  loading.value = true;
  NProgress.start();
  try {
    const response = await partnersApi.getById(id);
    partner.value = response.data.data;
  } catch (err) {
    console.error("Error fetching partner:", err);
    partner.value = null;
  } finally {
    loading.value = false;
    NProgress.done();
  }
};
const partnerActive = computed({
  get: () => partner.value?.partner_status === "Active",
  set: (val) => {
    partner.value.partner_status = val ? "Active" : "Inactive";
  },
});


// Refetch when ID changes
watch(
  () => props.partnerId,
  (newId) => {
    if (newId) fetchPartner(newId);
  },
  { immediate: true }
);

const parsedProducts = computed(() => partner.value?.products_used || []);


const sanitizedUrl = computed(() => {
  if (!partner.value?.link_url) return "#";
  return partner.value.link_url.startsWith("http")
    ? partner.value.link_url
    : `https://${partner.value.link_url}`;
});
</script>
