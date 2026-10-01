<template>
  <div>
    <!-- Trigger -->
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#partnerOffcanvas"
      aria-controls="offcanvasRight"
    >
      View Partner
    </button>

    <!-- Offcanvas -->
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="partnerOffcanvas"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header border-bottom py-2">
        <h5 id="offcanvasRightLabel" class="mb-0">Partnership Details</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div class="offcanvas-body p-0" v-if="partner">
        <!-- Logo -->
        <div class="w-100 d-flex align-items-center justify-content-center mb-0 p-3">
          <img
            class="bg-transparent"
            alt="Company-logo"
            :src="partner.logo_url"
            style="max-height: 100px;"
          />
        </div>

        <!-- Details -->
        <div
          class="px-4 py-2 fw-bold text-dark sticky-top bg-dark bg-opacity-10 border-top border-bottom border-dark-subtle"
        >
          Details
        </div>

        <div class="list-group">
          <div class="list-group-item">
            <h5 class="mb-1">Partner Name</h5>
            <p class="mb-1">{{ partner.client_name }}</p>
            <small class="text-muted">Organization Name</small>
          </div>

          <div class="list-group-item">
            <h5 class="mb-1">Abbreviation</h5>
            <p class="mb-1">{{ partner.client_abbreviation }}</p>
            <small class="text-muted">Short form</small>
          </div>

          <div class="list-group-item">
            <h5 class="mb-1">Organization Type</h5>
            <p class="mb-1">{{ partner.client_type }}</p>
            <small class="text-muted">Business category</small>
          </div>

          <div class="list-group-item">
            <h5 class="mb-1">Country</h5>
            <p class="mb-1">{{ partner.partner_country || "Not specified" }}</p>
            <small class="text-muted">Location</small>
          </div>

          <div class="list-group-item">
            <h5 class="mb-1">Partnership Type</h5>
            <p class="mb-1">{{ partner.partnership_type }}</p>
            <small class="text-muted">Collaboration level</small>
          </div>

          <div class="list-group-item">
            <h5 class="mb-1">Products</h5>
            <p class="mb-1">
              <span
                v-for="product in parsedProducts"
                :key="product"
                class="badge bg-primary me-1"
                >{{ product }}</span
              >
            </p>
            <small class="text-muted">Associated products</small>
          </div>

          <div class="list-group-item">
            <h5 class="mb-1">Description</h5>
            <p class="mb-1">{{ partner.client_description }}</p>
            <small class="text-muted">Partnership overview</small>
          </div>

          <div class="list-group-item">
            <h5 class="mb-1">{{ partner.link_title }}</h5>
            <p class="mb-1">
              <a
                :href="sanitizedUrl"
                target="_blank"
                class="text-decoration-none"
                >{{ partner.link_url }}</a
              >
            </p>
            <small class="text-muted">Status: {{ partner.partner_status }}</small>
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

      <!-- Loading / Error States -->
      <div class="p-3 text-center" v-else-if="loading">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <div class="p-3 text-danger text-center" v-else>
        Failed to load partner details.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import partnersApi from "@/api/partners.js";

const partner = ref(null);
const loading = ref(true);

// Fetch partner by ID (example: 1)
const fetchPartner = async (id = 1) => {
  try {
    const response = await partnersApi.getById(id);
    partner.value = response.data.data; // adjust depending on backend response shape
  } catch (err) {
    console.error("Error fetching partner:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPartner(1);
});

// Products → array
const parsedProducts = computed(() => {
  if (!partner.value?.products_used) return [];
  return partner.value.products_used.split(" and ").map((p) => p.trim());
});

// Fix link url
const sanitizedUrl = computed(() => {
  if (!partner.value?.link_url) return "#";
  return partner.value.link_url.startsWith("http")
    ? partner.value.link_url
    : `https://${partner.value.link_url}`;
});
</script>
