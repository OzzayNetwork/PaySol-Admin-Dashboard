<template>
    <div class="stepper py-4 w-100" data-coreui-toggle="stepper">
        <ol class="stepper-steps d-flex gap-1 w-100 justify-content-between m-0 p-0">
            <li class="stepper-step vertical d-flex  gap-2 text-center">
                <div class="d-flex flex-column align-items-center">
                    <button 
                        @click="getPageNumber(1)"
                        type="button" 
                        class="btn btn-light position-relative p-0 avatar-sm rounded-circle active"
                    >
                        <span 
                        :class="{ 'bg-primary text-white': currentStep >= 1 }"
                            class="avatar-title  text-reset">
                            <i class="bx bxs-bell d-none"></i>
                            <span class="fw-bold" 
                               >
                                    <b v-if="!completedSteps.includes(1)||skippedSteps.includes(1)">1</b>
                                </span>
                            <span class="fw-bold"
                                v-if="currentStep !== 1 
                                && completedSteps.includes(1) 
                                && !skippedSteps.includes(1)"
                            >
                                <i class="mdi mdi-check-bold fs-3 fw-bold"></i>
                            </span>

                             <span class="fw-bold"
                                v-if="currentStep !== 1 
                                && skippedSteps.includes(1)"
                            >
                                <i class="mdi mdi-minus-circle-outline fs-3 fw-bold"></i>
                            </span>
                        </span>
                    </button>
                    <span class="stepper-step-label mt-2 text-center" :class="{'fw-bold':emailVerified}">Email <br> {{ emailVerified?'Verified':'Verification' }}</span>
                </div>
                <div :class="{ 'bg-primary': currentStep > 1 }" class="stepper-step-connector "></div>
            </li>
            <li class="stepper-step vertical d-flex  gap-2 text-center">
                <div class="d-flex flex-column align-items-center">
                    <button @click="getPageNumber(2)" type="button" class="btn btn-light position-relative p-0 avatar-sm rounded-circle " >
                        <span :class="{ 'bg-primary text-white': currentStep >= 2 }" class="avatar-title bg-transparent text-reset">
                            
                             <span class="fw-bold"
                                v-if="currentStep!==2 && phoneVerified"
                                >
                                <i class="mdi mdi-check-bold fs-3 fw-bold"></i>
                            </span>
                            <span v-else-if="currentStep==2" class="fw-bold">2</span>
                            <span v-else-if="currentStep!=2 && !phoneVerified" class="fw-bold">2</span>
                        </span>
                    </button>
                    <span class="stepper-step-label mt-2" :class="{'fw-bold':phoneVerified}">Phone No. <br> {{ phoneVerified?'Verified':'Verification' }}</span>
                </div>
                <div :class="{ 'bg-primary': currentStep > 2 }" class="stepper-step-connector"></div>
            </li>
            <li class="stepper-step vertical d-flex  gap-2 text-center">
             <div class="d-flex flex-column align-items-center">
                    <button :disabled="!emailVerified && !phoneVerified" @click="getPageNumber(3)" type="button" class="btn btn-light position-relative p-0 avatar-sm rounded-circle " >
                        <span :class="{ 'bg-primary text-white': currentStep >= 3 }" class="avatar-title bg-transparent text-reset">
                            <i class="bx bxs-bell d-none"></i>
                            <span class="fw-bold">3</span>
                        </span>
                    </button>
                    <span class="stepper-step-label  mt-2">Password <br> Setup</span>
                </div>
            </li>
        </ol>
    </div>
</template>

<script setup>
// 🔧 Core Vue imports
import { ref, nextTick, onMounted, computed, watch,defineEmits, defineProps } from "vue";
import { useRouter } from 'vue-router'

import LoaderVue from '@/layouts/Loader.vue'
const isLoading = ref(true)

const props = defineProps({
  currentStep: { type: Number, default: 1 },
  completedSteps: { type: Array, default: null },
  skippedSteps: { type: Array,  default: () => [] } ,
   emailVerified:{type:Boolean, default:false},
  phoneVerified:{type:Boolean, default:false},
});

const emit = defineEmits(['changePage']);

function getPageNumber(newPage){
    emit('changePage',{newPage})
}

// 🕓 Simulate page loading
onMounted(() => {
  
})

</script>

<style>
.stepper-step button.active .avatar-title {
    background-color: #0d6efd;
    color: #fff;
}
.stepper-step {
  position: relative;
  z-index: 2;
  flex: 1 1 0;            /* each step shares the row → creates the slack */
  align-items: flex-start; /* don't stretch the connector full height */
}
.stepper-step:last-child {
  flex: 0 0 auto;        /* last step has no connector; don't let it grab width */
}

.stepper-step-connector {
  flex: 1 1 auto;        /* NOW it grows — it's a flex item again */
  height: 0.225rem;
  background-color: #dee2e6;
  margin-top: 23px;      /* nudge down to the circle's vertical centre */
  z-index: 1;
  /* removed: position, display:flex, width, left, top */
}
</style>