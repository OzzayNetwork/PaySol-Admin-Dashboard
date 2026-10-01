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
                <AuthHeader />

                <div class="my-auto">
                  <div>
                    <h5 class="text-uppercase fs-12">Customer Relationship Management Dashboard</h5>
                    <h3 class="fs-20 fw-bolder mb-4 mt-0 pt-0">Verify OTP</h3>
                    <p class="fw-bold mb-1">Enter the 6-digit OTP</p>
                    

                    <template v-if="otpPurpose === 'new_device'">
                      <p class="text-muted fs-12 mb-2">
                          We’ve sent a one-time password (OTP) to <strong>{{ maskedDestination }}</strong>.  
                          Enter it below to continue.
                        </p>

                        <p class="text-muted fs-12 mb-2">
                          This sign-in has been detected as originating from a new device, so verification is required.
                        </p>
                    </template>
                    <template v-else-if="otpPurpose === 'login_mfa'">
                      <p class="text-muted fs-12 mb-2">
                          We’ve sent a one-time password (OTP) to <strong>{{ maskedDestination }}</strong>. <a v-if="availableChannels.includes('sms') && otpChannel=='email'" href="" class="text-decoration-underline d-none">Send Code to Phone</a> 
                          Enter it below to continue.
                        </p>

                        <p class="text-muted fs-12 mb-2">
                          This sign-in requires <strong class="text-capitalize">multi-factor authentication (MFA)</strong> for added security. </p>
                    </template>
                    <template v-else-if="otpPurpose === 'password_reset'">
                      <p class="text-muted fs-12 mb-2">
                          We’ve sent a one-time password (OTP) to <strong>{{ maskedDestination }}</strong>.  
                          Enter it below to continue.
                        </p>

                        <p class="text-muted fs-12 mb-2">
                          This OTP is required to verify your identity before allowing you to reset your password.
                        </p>
                      
                    </template> 

                    <template v-else>
                      <p class="text-muted fs-12 mb-2">
                          We’ve sent a one-time password (OTP) to <strong>{{ maskedDestination }}</strong>.  
                          Enter it below to continue.
                        </p>

                        <p class="text-muted fs-12 mb-2">
                          Please enter the OTP to proceed.
                        </p>                      
                    </template >

                  </div>

                  <div class="mt-4">
                    <form @submit.prevent="handleOtpSubmit" class="text-center">
                      <div class="d-flex justify-content-between gap-3 mb-3">
                        <input
                          v-for="(digit, index) in otpInputs"
                          :key="index"
                          ref="otpInput"
                          type="text"
                          maxlength="1"
                          class="form-control text-center fs-4"
                          
                          v-model="otp[index]"
                          @input="moveToNext(index, $event)"
                          @keydown.backspace="moveToPrev(index, $event)"
                          required
                        />
                      </div>

                      <div v-if="timeLeft!='00:00'" >The OTP will be Expired in <strong>{{ timeLeft }}</strong></div>
                      <div v-else>The Code Has already expired, <a href="javascript:void(0)" @click="resendOtp">Resend</a></div>

                      <div class="mt-3 d-grid">
                        <button
                          class="btn btn-primary waves-effect waves-light d-flex align-items-center justify-content-center btn-lg text-capitalize fw-bold"
                          type="submit"
                          :disabled="loading|| timeLeft=='00:00'|| resendingOTP"
                        >
                          <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {{ loading ? 'Verifying...' : 'Verify OTP' }}
                        </button>
                      </div>
                    </form>

                    <div class="mt-4 text-muted text-center">
                      <span> Didn’t receive the OTP? </span>
                      <a href="javascript:void(0)" class="fw-bold" @click="resendOtp">Resend</a> (Attempts remaining: <strong>{{ maxAttempts }}</strong>)
                    </div>

                    <template v-if="availableChannels.length > 1">
                      <div class="text-center my-3 d-flex align-items-center justify-content-center gap-2">
                        <div class="flex-grow-1 opacity-25"><hr class="d-flex flex-grow-1"></div>
                        <span>OR</span>
                        <div class="flex-grow-1 opacity-25"><hr class="d-flex flex-grow-1"></div>
                      </div>

                        <label
                          v-if="availableChannels.includes('sms') && otpChannel=='email'" 
                          class="card border border-primary visibility-option p-2 border-2 mb-2 shadow-none cursor-pointer border-radius" 
                          :class="{'opacity-50 pe-none text-muted': resendingOTP === true}"
                          :disabled="resendingOTP"
                          @click="otpChannel='sms';resendOtp()">
                          <div class="p-3 px-3">
                              <div class="d-flex align-items-center">
                                 <div class="avatar-sm me-3 ">
                                    <span class="avatar-title rounded-circle bg-black text-black fs-2">
                                        <i class="mdi mdi-phone text-white"></i>
                                    </span>
                                </div>

                                  <div class="overflow-hidden me-auto">
                                      <h5 class="font-size-15 text-truncate mb-0 text-black">Want to receive the OTP on your phone instead?</h5>
                                      <p class="text-muted mb-0 fw-reguler" style="font-weight: 400; font-size: 12px;">Send Code to Phone</p>
                                  </div>

                                  <div class="ms-2">
                                    <span class="mdi-chevron-right mdi fs-1 text-primary"></span>
                                  </div>
                              </div>
                          </div>
                      </label>

                       <label
                          v-if="availableChannels.includes('email') && otpChannel=='sms'" 
                          class="card border border-primary visibility-option p-2 border-2 mb-2 shadow-none cursor-pointer border-radius" 
                          :class="{'opacity-50 pe-none text-muted': resendingOTP === true}"
                          :disabled="resendingOTP"
                          @click="otpChannel = 'email'; resendOtp()">
                          <div class="p-3 px-3 ">
                              <div class="d-flex align-items-center">
                                 <div class="avatar-sm me-3 ">
                                    <span class="avatar-title rounded-circle bg-warning text-black fs-2">
                                        <i class="mdi mdi-email text-black"></i>
                                    </span>
                                </div>

                                  <div class="overflow-hidden me-auto">
                                      <h5 class="font-size-15 text-truncate mb-0 text-black">Want to receive the OTP on your Email instead?</h5>
                                      <p class="text-muted mb-0 fw-reguler" style="font-weight: 400; font-size: 12px;">Send Code to Email</p>
                                  </div>

                                  <div class="ms-2">
                                    <span class="mdi-chevron-right mdi fs-1 text-primary"></span>
                                  </div>
                              </div>
                          </div>
                      </label>

                      <div class="text-center d-none">
                        <span class="pb-2 text-muted">Want to receive the OTP on your phone instead?</span>
                        <button 
                          type="button" 
                          class="btn mt-2 border border-secondary border-opacity-50 border-muted waves-effect w-100 btn-lg d-flex align-items-center justify-content-center gap-2 btn-outline-light"
                          :disabled="resendingOTP"
                          @click="resendOtp">
                          <span class="fw-bold text-dark ">Send Code to Phone</span>
                          <div class="avatar-xs ">
                              <span class="avatar-title rounded-circle bg-dark font-size-16">
                                  <i class="mdi mdi-phone text-white"></i>
                              </span>
                          </div>
                        </button>
                      </div>
                      <div class="mt-2 text-muted text-center d-none">
                        <span> Want to receive the OTP on your phone instead? </span>
                        <a href="javascript:void(0)" class="fw-bold" @click="resendOtp">Send Code to Phone</a>
                      </div>
                    </template>

                    <div class="mt-4 text-muted text-center">
                      <router-link to="/login" class="fw-bold"  :disabled="resendingOTP">Back to Login</router-link>
                    </div>
                  </div>
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
import { ref, nextTick, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import NProgress from "nprogress";

import AuthFooter from "./Auth.Footer.vue";
import AuthHeader from "./Auth.Header.vue";
import ImageToast from "@/components/ImageToast.vue";

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
const maskedDestination = ref(history.state.response?.masked_destination || "your contact") // fallback if not present
const otpChannel = ref(history.state.otpChannel)
const otpPurpose = history.state.otpPurpose
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
   //alert(`OTP Purpose: ${otpPurpose}\nChannel: ${otpChannel}\nLogin Challenge ID: ${loginChallengeId}`);
  });
});

// Submit OTP
const handleOtpSubmit = async () => {
  const code = otp.value.join("");

  if (code.length !== 6) {
    toastStatus.value = "error";
    toastTitle.value = "Invalid OTP";
    toastMessage.value = "Please enter the full 6-digit code.";
    toastImage.value = errorImage;
    return;
  }

  NProgress.start();
  loading.value = true;
  toastStatus.value = "loading";
  toastTitle.value = "Verifying...";
  toastMessage.value = "Checking the OTP you entered.";
  toastImage.value = null;

  try {
    const response = await authApi.verifyLoginOtp({ login_challenge_id: loginChallengeId, otp: code });
     console.log(response)
    // Extract token (depends on API response structure)
    const token = response.data?.data?.token || response.data?.token;
    const user = response.data?.data?.user|| response.data?.user || "User";
    if (!token) throw new Error("No token received from API");

    // 👇 Save everything globally (Pinia + localStorage)
    authStore.setAuth(token, user);
    //alert(user.verification.fully_verified)

   


    // Save token for future authenticated requests
    setAuthToken(token);
    if (rememberMe.value) {
      localStorage.setItem("authToken", token); // Persist across sessions
    } else {
      sessionStorage.setItem("authToken", token); // Clear on browser close
    }

    // Success toast
    toastStatus.value = "success";
    toastTitle.value = "Authentication Was successful 🎉";
    toastMessage.value = "Welcome back to the dashboard, "+user.full_name+"! You will be redirected shortly.";
    toastImage.value = successImage;



    // Redirect to dashboard after short delay
    setTimeout(() => {
      //router.push("/");
      window.location.href = "/";
    }, 1500);


    console.log("OTP verification successful:", response.data);
   
    return
    setTimeout(() => {
      router.push("/reset-password-confirm"); // proceed to set new password
    }, 1500);
  } catch (error) {
    console.error("OTP verification failed:", error.response?.data || error.message);
    toastStatus.value = "error";
    toastTitle.value = "Invalid OTP";
    toastMessage.value = error.response?.data?.message || "The OTP you entered is incorrect. Please try again.";
    toastImage.value = errorImage;
  } finally {
    NProgress.done();
    loading.value = false;
  }
};

// Resend OTP
const resendOtp = async () => {
  // Begin loading state + show loading toast
  alert(`Resending OTP to ${otpChannel.value}... Login Challenge ID: ${loginChallengeId}`);
  resendingOTP.value = true;
  toastStatus.value = "loading";
  toastTitle.value = "Resending OTP...";
  toastMessage.value = "Please wait while we Resend the OTP.";
  toastImage.value = null;
  try {
    const response=await authApi.resendLoginOtp({ login_challenge_id: loginChallengeId, channel: otpChannel.value });
    console.log("Resend OTP response:", response.data);
    maxAttempts.value = response.data?.issuances_remaining || maxAttempts.value
    maskedDestination.value = response.data?.masked_destination || maskedDestination.value

    toastStatus.value = "success";
    toastTitle.value = "OTP Resent";
    toastMessage.value = `${response.data.message}, ${maskedDestination.value}.`+' Attempts remaining: <strong>'+response.data.issuances_remaining+'</strong>';
    toastImage.value = successImage;

  } catch (error) {
    toastStatus.value = "error";
    toastTitle.value = "Failed to Resend";
    toastMessage.value = "Could not resend OTP. Try again.";
    toastImage.value = errorImage;
    console.log("Failed to resend OTP:", error.response?.data || error.message);
  } finally {
    resendingOTP.value = false;
  }
};
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
