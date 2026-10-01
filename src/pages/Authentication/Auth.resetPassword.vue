<template>
  <div>
    <div class="container-fluid p-0">
      <div class="row g-0">
        <!-- Left banner remains the same -->
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

        <!-- Password reset form -->
        <div class="col-xl-4 col-md-6 col-lg-5">
          <div class="auth-full-page-content p-md-5 p-5 bg-white">
            <div class="w-100">
              <div class="d-flex flex-column h-100 p-3">
                <AuthHeader />

                <div class="my-auto">
                 <div>
                      <h5 class="text-uppercase fs-12">Customer Relationship Management Dashboard</h5>

                     

                     

                      <template v-if="isChangePassword">
                          <h3 class="fs-20 fw-bolder mb-4 mt-0 pt-0">
                              Change Password
                          </h3>
                          <p class="text-muted fs-12 mb-2">
                              Before you can change your password, we need to verify your identity. Choose where you'd like to receive <span class="fw-bold">your One-Time Password (OTP)</span>, and we'll send it to a verified contact method linked to your account.
                          </p>
                      </template>

                       <template v-else>
                         <h3 class="fs-20 fw-bolder mb-4 mt-0 pt-0">
                            Reset Your Password
                        </h3>
                         <p class="fw-bold mb-1">
                            Reset Your Password
                        </p>

                        <p class="text-muted fs-12 mb-2">
                            Enter your registered email address and choose how you'd like to receive your OTP. The OTP will be sent to a verified email address or phone number linked to your account.
                        </p>
                      </template>

                     
                  </div>

                  <div class="mt-4">
                    <form @submit.prevent="handlePasswordReset">
                      <div class="col-12 mb-4">
                            <div class="mt-4">
                                <h5 class="font-size-14 mb-3">
                                  How would you like to receive your OTP?
                                </h5>
                                <div class="form-check mb-2">
                                    <input v-model="channel" value="email" class="form-check-input" type="radio" name="formRadios" id="formRadios1" checked="">
                                    <label class="form-check-label" for="formRadios1">
                                        Email Address
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input v-model="channel" value="sms" class="form-check-input" type="radio" name="formRadios" id="formRadios2">
                                    <label class="form-check-label" for="formRadios2">
                                        Phone Number (SMS)
                                    </label>
                                </div>
                            </div>
                        </div>
                      <div class="">
                        <label for="email" class="form-label">Account's Email Address</label>
                        
                      </div>

                      <div class="flex-grow-1 mb-4">
                          <div class="search-box mb-0 me-0">
                              <div class="position-relative">
                                  <div class="flex-grow-1 ">
                                        <input 
                                        style="border-radius: 0px;"
                                          type="email" 
                                          class="form-control rounded flex-grow-1"
                                          id="email" 
                                          v-model="email"
                                          placeholder="Enter your email"
                                          required
                                          autofocus
                                           @focus="isEmailFocused = true"
                                            @blur="isEmailFocused = false"
                                            :disabled="isChangePassword||loading"
                                          >

                                          <i
                                            class="bx bx-envelope search-icon fs-4"
                                            :class="isEmailFocused ? 'text-primary' : 'text-dark opacity-50'"
                                          ></i>
                                  </div>
                                          
                              </div>
                          </div>
                      </div>

                      <div class="mt-3 d-grid">
                        <button
                          class="btn btn-primary waves-effect waves-light d-flex align-items-center justify-content-center btn-lg text-capitalize fw-bold"
                          type="submit"
                          :disabled="loading"
                        >
                          <span
                            v-if="loading"
                            class="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>

                          {{
                            loading
                              ? (channel === 'sms' ? 'Sending SMS OTP...' : 'Sending Email OTP...')
                              : (channel === 'sms' ? 'Send OTP via SMS' : 'Send OTP via Email')
                          }}
                        </button>
                      </div>
                    </form>

                    <div class="mt-5 text-muted">
                    <span> Changed your mind? </span>
                      <a href="javascript:void(0)" class="fw-bold" @click="goBack">Go Back</a>
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
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import NProgress from "nprogress";

import AuthFooter from "./Auth.Footer.vue";
import AuthHeader from "./Auth.Header.vue";
import ImageToast from "@/components/ImageToast.vue";

import authApi from "@/api/auth";   // Should expose password reset request endpoint

// Importing toast images
import successImage from "../../assets/images/icons/check.png";
import errorImage from "../../assets/images/icons/error.png";

const router = useRouter();
const route = useRoute();

const isChangePassword = route.query.mode === "change Password";

// Form state
const email = ref(route.query.email||"");
const phoneNum=ref("")
const channel=ref('email')
const loading = ref(false);
const isEmailFocused = ref(false);

//states being sent 
const expiresAt=ref("")
const otpPurpose=ref("password_reset")
const maxAttempts=ref(0)


// Toast state
const toastStatus = ref(null);
const toastTitle = ref("");
const toastMessage = ref("");
const toastImage = ref(null);

const goBack = () => {
  // Use the referrer (previous page) and force a full reload via location.
  // window.history.back() doesn't reload — bfcache restores the page as-is.
  // Setting window.location.href forces the browser to fetch fresh.
  if (document.referrer && document.referrer !== window.location.href) {
    window.location.href = document.referrer;
  } else {
    window.location.href = "/"; // fallback to dashboard
  }
};

// Method: Request OTP for password reset
const handlePasswordReset = async () => {
  if (!email.value) {
    toastStatus.value = "error";
    toastTitle.value = "Missing Email";
    toastMessage.value = "Please enter your registered email address.";
    toastImage.value = errorImage;
    return;
  }

  NProgress.start();
  loading.value = true;
  toastStatus.value = "loading";
  toastTitle.value = "Processing...";
  toastMessage.value = "Requesting password reset OTP...";
  toastImage.value = null;

  try {
    const response = await authApi.forgotPin({ email: email.value,channel:channel.value });
    console.log(response)
    // ✅ Assume backend responds with success
    toastStatus.value = "success";
    toastTitle.value = "OTP Sent";
    toastMessage.value = `An OTP has been sent to ${email.value}. Please check your inbox.`;
    toastMessage.value= response?.data?.message ||response?.data?.data?.message || "An OTP has been sent to ${email.value}. Please check your inbox.";
    toastImage.value = successImage;

    // Redirect to OTP verification page after a short delay
    setTimeout(() => {
      router.push({ path: "/Set-new-password", 
      query: { email: email.value },
      state:{
        expiresAt: Date.now() + 14.5 * 60 * 1000,
        otpChannel:channel.value,
        otpPurpose:otpPurpose.value
      }
    
    }
      
    );
    }, 1500);

  } catch (error) {
    console.error("Password reset error:", error.response?.data || error.message);
    toastStatus.value = "error";
    toastTitle.value = "Request Failed";
    toastMessage.value = error.response?.data?.message || "Something Went wrong, try again";
    toastImage.value = errorImage;
  } finally {
    NProgress.done();
    loading.value = false;
  }
};
</script>
<style scoped>
  .auth-full-bg .bg-overlay{
background-color: #2164f3;
    background: url(../../assets/images/modern-bg/bg-email.png);
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
