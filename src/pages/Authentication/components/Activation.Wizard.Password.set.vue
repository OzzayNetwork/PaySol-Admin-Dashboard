<template>
  <div class=" animate__animated animate__fadeInRight animate__faster">
    <div>
      <h5 class="text-uppercase fs-12">
        Account Activation
      </h5>

      <h3 class="fs-20 fw-bolder mb-4 mt-0 pt-0">
        Final Step: Create Your PIN
      </h3>
      {{ 'The Email'+email }}

      <p class="text-muted fs-12 mb-2">
          You're almost done. Create a secure <strong>4-digit password</strong> to complete the activation process.
      </p>
    </div>

    <div class="mt-4">
      <form @submit.prevent="handleFormSubmit" class="text-left">
        <div class="mb-4">
          <label class="text-black">PIN</label>
          <input
            v-model="password"
            required
            type="password"
            class="form-control"
            placeholder="Enter 4-digit PIN"
            inputmode="numeric"
            pattern="[0-9]{4}"
            minlength="4"
            maxlength="4"
            @input="numbersOnly"
          >
        </div>

        <div class="mb-4">
          <label class="text-black">Confirm PIN</label>
          <input
            v-model="confirmPassword"
            required
            type="password"
            class="form-control"
            placeholder="Confirm 4-digit PIN"
            inputmode="numeric"
            pattern="[0-9]{4}"
            minlength="4"
            maxlength="4"
            @input="numbersOnly"
          >
          <small
            v-if="confirmPassword && !passwordMatch"
            class="text-danger"
          >
            PINs do not match.
          </small>
        </div>

        <div class="form-check mb-4">
          <input
            class="form-check-input"
            type="checkbox"
            id="termsAndConditions"
            v-model="termsAgreed"
          >
          <label class="form-check-label" for="termsAndConditions">
            I have read and agree to the
            <a href="/terms-and-conditions" target="_blank">
              Terms & Conditions
            </a>
            and
            <a href="/privacy-policy" target="_blank">
              Privacy Policy
            </a>.
          </label>
        </div>

        <div
           :class="{ show: hasError }" 
          class="alert alert-danger alert-dismissible fade" role="alert" v-if="hasError">
            {{ toastMessage }}
            <button 
              type="button"
              class="btn-close"
              aria-label="Close"
            @click="hasError = false"
            
            ></button>
        </div>

        <div class="mt-3 d-flex justify-content-center">
          <button
            class="btn btn-primary waves-effect waves-light d-flex align-items-center justify-content-center btn-lg text-capitalize fw-bold flex-grow-1"
            type="submit"
            :disabled="loading || !termsAgreed || !passwordMatch || password.length !== 4"
          >
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
            {{ loading ? 'Setting up Account' : 'Finish Setup' }}
          </button>
        </div>
      </form>
     
    </div>
  </div>



  <ImageToast
    :status="toastStatus"
    :title="toastTitle"
    :message="toastMessage"
    :image="toastImage"
    :imageHeight="70"
    @hide="toastStatus = null"
  />
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted, toRef,computed } from "vue";
import { useRouter } from "vue-router";
import NProgress from "nprogress";

import authApi from "@/api/auth";
import { useAuthStore } from "@/stores/auth";
import { setAuthToken } from "@/api/index";

import successImage from "../../../assets/images/icons/check.png";
import errorImage from "../../../assets/images/icons/error.png";
import ImageToast from "@/components/ImageToast.vue";
import { errorMessages } from "vue/compiler-sfc";

// Props - the declared interface from the parent (retained as-is)
const props = defineProps({
  channel: { type: String, default: null },
  email: { type: String, default: null },
  otpPurpose: { type: String, default: 'account_activation' },
  maxAttempts: { type: Number, default: 5 },
  maskedDestination: { type: String, default: null },
  expiryTimeMinutes: { type: Number, default: 15 },
  otpChannel: { type: String, default: 'email' },
  emailVerified:{type:Boolean, default:false},
  phoneVerified:{type:Boolean, default:false},
  
});

// Tell the parent wizard a channel was verified so it can advance to Set PIN
const emit = defineEmits(['passwordSet']);

const router = useRouter();
const authStore = useAuthStore();

// Stays in sync with the props (read-only display values)
const otpPurpose = toRef(props, 'otpPurpose');
const otpChannel = toRef(props, 'otpChannel');

// Local working copies seeded from props - reassigned on resend.
const maskedDestination = ref(props.maskedDestination);
const maxAttempts = ref(props.maxAttempts);

// The REAL email used for the API lookup - never the masked display value.
const userEmail = props.email || history.state.email || null;

const loading = ref(false);
const hasError=ref(false)

// Toast state
const toastStatus = ref(null);
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);


const termsAgreed = ref(false)
const password = ref('')
const confirmPassword = ref('')

const username = ref("");  
const token=ref("")
const user=ref({})

const passwordMatch = computed(() => {
  return password.value === confirmPassword.value
})
//limits inputs to just numbers
const numbersOnly = (event) => {
  event.target.value = event.target.value.replace(/\D/g, '').slice(0, 4)
}

//creating password
async function handleFormSubmit(){
  hasError.value=false
  NProgress.start();
  loading.value=true

  toastStatus.value = "loading";
  toastTitle.value = "Finalizing setup...";
  toastMessage.value = "Your PIN is being encrypted and saved.";
  toastImage.value = null;
  try{
    const response=await authApi.setPin({
      email:props.email,
      pin: password.value,
      pin_confirmation: confirmPassword.value,      
    })
    const res = response.data?.data ?? response.data ?? {};

    const token=res.token
    const user=res.user

    if(!token) throw new Error("No token received from API")
    console.log(user)

    // 👇 Save everything globally (Pinia + localStorage)
    authStore.setAuth(token, user);

    

    toastStatus.value = "success";
    toastTitle.value = "Account verified";
    toastMessage.value = "Your account was successfully verified and your PIN created successfully.";
    toastImage.value = successImage;
    
    //The account is set
    emit('passwordSet', { res });



  }catch(error){
    hasError.value=true
    console.log(error)

    toastStatus.value = "error";
    toastTitle.value = "Password Error";
    toastMessage.value = error.response?.data?.message || "Something Went wrong, try again";
    toastImage.value = errorImage;

  }finally{
    NProgress.done();
    loading.value = false;
  }
}

</script>

<style scoped>
.auth-full-bg .bg-overlay {
  background-color: #2164f3;
  background: url(../../assets/images/modern-bg/otp.png);
  background-size: cover;
  background-position: center;
  opacity: .8;
}
.auth-full-bg {
  background-color: #2164f3;
}
</style>