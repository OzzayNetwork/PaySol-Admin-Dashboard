<template>
  <!-- View Details Modal -->
  <div
    class="modal fade text-dark"
    id="viewDetailsModal"
    tabindex="-1"
    aria-labelledby="viewDetailsModalLabel"
    aria-hidden="true"
    ref="viewDetailsModal"
    style="z-index: 1000000;"
  >
    <div class="modal-dialog modal-dialog-centered modal-md ">
      <div class="modal-content shadow-lg border-0">

        <!-- Header -->
        <div class="modal-header  p-4 pb-2">
          <h5 class="modal-title fw-bold text-black fs-4 mb-1" id="viewDetailsModalLabel">
            {{ title }}
          </h5>
          <button
            type="button"
            class="btn-close fs-5"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body -->
        <div class="modal-body p-4 ">
            <div>
                <div class="border border-2 d-flex gap-3 shadow-none card-body text-muted mb-0 p-3" style="border-radius: 0.5rem;">
                    <Icon icon="solar:lightbulb-minimalistic-bold-duotone" class="text-primary me-0 details-icon" />
                    <p class="mb-0 text-muted" >
                        {{ message }}
                    </p>
                </div>
            </div>

            <div class="mt-4">
                <div class="simplebar-content">
                    <li v-for="item in list" :key="item.id" class="list-group-item border-0">
                        <div class="d-flex">
                           
                            
                            <div class="flex-grow-1">
                                <h5 class="font-size-13">{{ item?.title||item?.name }}</h5>
                                <p class="text-muted">{{ item?.description }}</p>
                            </div>
                        </div>
                    </li>
                </div>
                <ul class="list-group list-group-flush mt-3">
                    
                </ul>
            </div>
          <div class="text-left mb-2">
            
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 pt-0 px-3 pb-4 gap-2" v-if="displayFooter">
          <button
            type="button"
            class="btn btn-link waves-effect fw-bold btn-lg"
            data-bs-dismiss="modal"
            @click="handleCancel"
            :disabled="loading"
          >
            {{ cancelText }}
          </button>

          <button
            type="button"
            class="btn btn-primary fw-semibold btn-lg"
            @click="handleConfirm"
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ confirmText }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, computed, watch,onMounted,onBeforeUnmount } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: "Detailed Information"
  },
  message: {
    type: String,
    default: "Detailed information about the selected item will be displayed here."
  },
  cancelText: {
    type: String,
    default: "Continue Editing"
  },
  confirmText: {
    type: String,
    default: "Clear Form"
  },
  loading: {
    type: Boolean,
    default: false
  },
  list: {
    type: Array,
    default: () => []
  },
  displayFooter: {
    type: Boolean,
    default: false
  }
});

</script>
<style >
.details-icon {
    font-size: 6.5rem;
    height: 3.2rem;
}

</style>