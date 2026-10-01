<template>
  <div>
    <div class="container-fluid p-0">
      
      <div class="row g-0">
        <!-- Left banner -->
        <div class="col-xl-8 col-lg-7 col-md-6 d-sm-none d-none d-md-block">
          <div class="auth-full-bg pt-lg-5 p-4">
            <div class="w-100">
              <div class="bg-overlay"></div>
              <div class="d-flex h-100 flex-column">
                <div class="p-4 mt-auto"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- OTP verification form -->
        <div class="col-xl-4 col-md-6 col-lg-5">
          <div class="auth-full-page-content p-md-5 p-5 bg-white">
            <div class="w-100">
              <div class="d-flex flex-column h-100 p-3">
                <div class="success-bg opacity-50  animate__animated animate__fadeInDown animate__faster" v-if="passwordIsSet"></div>
                <div class="d-flex align-items-center justify-content-center">
                  <AuthHeader />
                </div>
                <div class="my-auto">

                  <template v-if="!passwordIsSet">
                     <div class="mb-3">                   
                        <ActivationWizardNavigation 
                          :currentStep="currentStep"
                          :completedSteps="completedSteps" 
                          :skippedSteps="skippedSteps"
                          :emailVerified="emailVerified"
                          :phoneVerified="phoneVerified"
                          @changePage="changePage"
                        />
                    </div>
                  <WizardOtp
                  
                    v-if="currentStep==1"
                    :email="email"
                    :maskedDestination="maskedDestination"
                    :otpChannel="otpChannel"
                    :otpPurpose="otpPurpose"
                    :expiryTimeMinutes="expiryTimeMinutes"
                    :maxAttempts="maxAttempts"
                    :emailVerified="emailVerified"
                    :phoneVerified="phoneVerified"
                    @submit="handleOtpSubmit"
                    @resend="resendOtp"
                    :loading="loading"
                    :resendingOTP="resendingOTP"
                    @verified="onVerified"
                    />                     

                     <WizardOtp
                    v-if="currentStep==2"
                    :email="email"
                    :maskedDestination="maskedDestination"
                    :otpChannel="otpChannel"
                    :otpPurpose="otpPurpose"
                    :expiryTimeMinutes="expiryTimeMinutes"
                    :maxAttempts="maxAttempts"
                    :emailVerified="emailVerified"
                    :phoneVerified="phoneVerified"
                    @submit="handleOtpSubmit"
                    @resend="resendOtp"
                    :loading="loading"
                    :resendingOTP="resendingOTP"
                    @verified="onVerified"
                    /> 

                    <PasswordSet
                      v-if="currentStep==3"
                      :email="email"
                      :maskedDestination="maskedDestination"
                      :emailVerified="emailVerified"
                      :phoneVerified="phoneVerified"
                      @passwordSet="onPasswordSet"
                    />

                     <div class="mt-4 text-muted">
                      <div class="d-flex gap-3 justify-content-between">
                        <router-link v-if="currentStep==1 && completedSteps.length==0" to="/login" class="fw-bold " :disabled="resendingOTP">Go to Login</router-link>
                        <a href="#" 
                        @click="handlePrevStep()"
                        v-if="completedSteps.length!=0 ||currentStep>1" to="/login" class="fw-bold text-right d-flex align-items-center gap-1" :disabled="resendingOTP">
                           <span class="bx bx-left-arrow-alt fs-3"></span>
                          <span>{{ 'Back' }}</span>                         
                        </a>

                        <a href="#"
                          @click="handleNextStep(); skippedSteps.push(currentStep)"
                          v-if="currentStep==1 && emailVerified==false"
                          class="fw-bold text-right d-flex align-items-center gap-1" :disabled="resendingOTP">
                          <span>{{ 'Skip' }}</span>
                          <span class="bx bx-right-arrow-alt fs-3"></span>
                        </a>

                        <div class="d-none">
                          currentStep: {{ currentStep }}
                          <br>
                          nextStep: {{ nextStepParent }}
                          <br>
                          Channel: {{ otpChannel }}
                        </div>

                        <a href="#"
                          @click="handleNextStep(); skippedSteps.push(currentStep)"
                          v-if="currentStep==2 && nextStepParent==='set_password'"
                          class="fw-bold text-right d-flex align-items-center gap-1" :disabled="resendingOTP">
                          <span>{{ 'Skip' }}</span>
                          <span class="bx bx-right-arrow-alt fs-3"></span>
                        </a>

                         <a href="#"   v-if="emailVerified==true && phoneVerified==true"  class="fw-bold text-right d-flex align-items-center gap-1" :disabled="resendingOTP">
                          <span>{{ 'Next' }}</span>
                          <span class="bx bx-right-arrow-alt fs-3"></span>
                        </a>

                        
                      </div>
                    </div>   

                   </template>

                  
                    <PasswordSuccess
                      v-if="passwordIsSet"
                      :email="email"
                      :maskedDestination="maskedDestination"
                      :emailVerified="emailVerified"
                      :phoneVerified="phoneVerified"                      
                    />                              
                  </div>

                <AuthFooter />

                <ImageToast
                  :status="toastStatus"
                  :title="toastTitle"
                  :message="toastMessage"
                  :image="toastImage"
                  :imageHeight="70"
                  @hide="toastStatus = null"
                />

              </div>
            </div>
          </div>
        </div>
        <!-- end col -->
      </div>
    </div>
  </div>


</template>

<script setup>
import { ref, nextTick, onMounted, computed, watch,defineEmits, defineProps } from "vue";
import { useRoute, useRouter } from "vue-router";
import NProgress from "nprogress";

import AuthFooter from "./Auth.Footer.vue";
import AuthHeader from "./Auth.Header.vue";
import ImageToast from "@/components/ImageToast.vue";

// activation wizard components
import PasswordSet from "./components/Activation.Wizard.Password.set.vue"
import ActivationWizardNavigation from "./components/Activation.Wizard.Navigation.vue";
import WizardOtp from "./components/Activation.Wizard.Otp.vue";
import PasswordSuccess from "./components/Activation.succesful.vue";

import authApi from "@/api/auth";   // API module for authentication requests

import { useAuthStore } from "@/stores/auth"; // <-- import the Pinia auth store
import { setAuthToken } from "@/api/index"; // Helper to attach token to requests

import successImage from "../../assets/images/icons/check.png";
import errorImage from "../../assets/images/icons/error.png";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore(); // <-- Pinia store instance

// Email comes from reset flow (query param)
const email = route.query.email || "your email";
const rememberMe = ref(false); // "Remember me" checkbox

//step management
const currentStep=ref(1)
const completedSteps=ref([])
const skippedSteps=ref([])
const nextStepParent=ref('')

const current_Step=ref('')

const emailVerified=ref(false)
const phoneVerified=ref(false)
const passwordIsSet=ref(false)
const verificationStatus=ref({
   email_verified: false,
  phone_verified: false,
})

const user=ref({})


// OTP input handling
const otp = ref(["", "", "", "", "", ""]);
const otpInputs = Array(6).fill(null);
const otpInput = ref([]);

const loading = ref(false);
const resendingOTP = ref(false);

// Toast state
const toastStatus = ref(null);
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);

//info from login page
const loginChallengeId = history.state.loginChallengeId
const maskedDestination = ref(email || "your contact") // fallback if not present
const otpChannel = ref('email')
const otpPurpose ='account_activation'
const response=history.state.response
const expiryTimeMinutes=history.state.expiryTimeMinutes
const availableChannels=history.state.availableChannels
const maxAttempts=ref(history.state.maxAttempts)
const timeLeft = ref('10:00')
const expiresAt = ref(history.state.expiresAt || (Date.now() + expiryTimeMinutes * 60 * 1000))

let interval

function updateTimer() {
  const now = Date.now()
  const diff = Math.max(0, expiresAt.value - now)

  const minutes = Math.floor(diff / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)

  timeLeft.value =
    String(minutes).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0')

  if (diff <= 0) clearInterval(interval)
  if(diff==0){
    toastStatus.value = "error";
    toastTitle.value = "OTP Expired";
    toastMessage.value = "The OTP has expired. Please request a new one.";
    toastImage.value = errorImage;
     setTimeout(() => {
      //router.push("/");
         router.push("/login") // redirect back to login to start fresh
    }, 1000);
  }
}

function handleNextStep(){  
  currentStep.value++
  if(currentStep.value==1){
    otpChannel.value='email'
  }
  else{
    otpChannel.value='sms'
  }
}

function handlePrevStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }

  otpChannel.value =
    currentStep.value === 1 ? "email" : "sms"
}
//verification funtion
function onVerified({ channel, verification, nextStep }) {
passwordIsSet.value=false
  // payload is exactly what the child passed to emit('verified', { ... })
  console.log("verified via", channel, verification, nextStep);


  emailVerified.value=verification.email_verified
  phoneVerified.value=verification.phone_verified
  nextStepParent.value=nextStep
  verificationStatus.value=verification

  console.log('Emial CVrification statsus is', verification.email_verified)
  console.log('Email ref', emailVerified.value)
  console.log('phone Verrified status', verification.phone_verified)
  console.log('Phine ref status ',phoneVerified.value)
  handleNextStep()
  


  console.log("Chhannekl changed to :",otpChannel.value )
    console.log(verification)

  // Advance the wizard. next_step from the API tells you where to go:
  if (nextStep === 'set_password') {

   
    // move to the Set PIN step
    current_Step.value = 'set_pin';
  } else if (nextStep === 'login') {
    router.push('/login');
  }

  if(emailVerified.value==true){
    completedSteps.value.push(1)
  }

  if(phoneVerified.value==true){
    completedSteps.value.push(2)

  }




}

//after password is set
function onPasswordSet({res}){
  user.value=res.user

  if (user.value && Object.keys(user.value).length > 0) {
    passwordIsSet.value=true
  }
  else{
    passwordIsSet.value=false
  }
  
}

// clicked page number
function changePage({newPage}){
   currentStep.value=newPage
  if(currentStep.value==1){
    otpChannel.value='email'
  }
  else{
    otpChannel.value='sms'
  }
}



function checkStatus(){
  console.log("verified via",  emailVerified.value);
  onVerified()

}


// Move to next input automatically
const moveToNext = (index, event) => {
  if (event.inputType === "insertText" && otp.value[index] && index < 5) {
    nextTick(() => otpInput.value[index + 1].focus());
  }
};

// Move back on backspace
const moveToPrev = (index, event) => {
  if (event.key === "Backspace" && !otp.value[index] && index > 0) {
    nextTick(() => otpInput.value[index - 1].focus());
  }
};

// ✅ Auto-focus first box on mount
onMounted(() => {
  nextTick(() => {
    if (otpInput.value[0]) {
      otpInput.value[0].focus();
    }


  interval = setInterval(updateTimer, 1000)
  });
});
</script>

<style scoped>
  .auth-full-bg .bg-overlay{
    background-color: #2164f3;
    background: url(../../assets/images/modern-bg/otp.png);
    /* background-repeat: no-repeat; */
    background-size: cover;
    /* background-size: contain; */
    background-position: center;
    opacity: .8;

  }
  .auth-full-bg{
    background-color: #2164f3;
  }
</style>
