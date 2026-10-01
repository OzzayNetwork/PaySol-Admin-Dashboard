<template>
  <div>
    <div class="text-center  animate__animated animate__fadeInUp animate__faster">
        <h1
        style="
        background-size: cover;
        background-position: center;
        " 
        
        class="text-success">
            <span
                style="font-size: 6rem;"
             class="bx bxs-check-shield mb-2">
            </span>
        </h1>
      <h3 class="fs-20 fw-bolder mb-4 mt-0 pt-0">
        Account Setup Complete
      </h3>

      <p class="text-muted fs-12 mb-5 text-center">
        Your account has been successfully activated and your password has been set. You have been signed in automatically and can now continue to your dashboard.
      </p>
    </div>

     <div class="mt-3 d-flex justify-content-center  animate__animated animate__fadeInUp animate__faster">
          <button
            class="btn btn-primary waves-effect waves-light d-flex fw-bold text-capitalize justify-content-center btn-lg text-uppercase flex-grow-1"
            type="submit"
            @click="goHome()"
          >
            Okay
          </button>
        </div>

   
  </div>


</template>
<script setup>
import { ref, nextTick, onMounted, computed, watch,defineEmits, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";


const router = useRouter();

function goHome(){
 window.location.href = "/";

}

</script>
