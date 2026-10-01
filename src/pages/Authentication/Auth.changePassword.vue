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

        <!-- Change password form -->
        <div class="col-xl-4 col-md-6 col-lg-5">
          <div class="auth-full-page-content p-md-5 p-5 bg-white">
            <div class="w-100">
              <div class="d-flex flex-column h-100 p-3">
                <AuthHeader />

                <div class="my-auto">
                  <div>
                    <h5 class="text-uppercase fs-12">Customer Relationship Management Dashboard</h5>
                    <h3 class="fs-20 fw-bolder mb-4 mt-0 pt-0">Change Password</h3>
                    <p class="fw-bold mb-1">Secure your account</p>
                    <p class="text-muted fs-12 mb-2">
                      Enter your email and new password. We'll verify with OTP before applying changes.
                    </p>
                  </div>

                  <div class="mt-4">
                    <form @submit.prevent="handlePasswordChange">
                      <!-- Email -->
                      <div class="mb-3">
                        <label for="email" class="form-label">Email Address</label>
                        <input 
                          type="email" 
                          class="form-control" 
                          id="email" 
                          v-model="email"
                          placeholder="Enter your email"
                          required
                          autofocus
                        >
                      </div>

                      <!-- New Password -->
                      <div class="mb-3">
                        <label for="newPassword" class="form-label">New Password</label>
                        <input 
                          type="password" 
                          class="form-control" 
                          id="newPassword" 
                          v-model="newPassword"
                          placeholder="Enter new password"
                          required
                        >
                      </div>

                      <!-- Confirm Password -->
                      <div class="mb-3">
                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                        <input 
                          type="password" 
                          class="form-control" 
                          id="confirmPassword" 
                          v-model="confirmPassword"
                          placeholder="Re-enter new password"
                          required
                        >
                      </div>

                      <div class="mt-3 d-grid">
                        <button 
                          class="btn btn-primary waves-effect waves-light d-flex align-items-center justify-content-center btn-lg text-uppercase" 
                          type="submit"
                          :disabled="loading"
                        >
                          <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {{ loading ? 'Processing...' : 'Next' }}
                        </button>
                      </div>
                    </form>

                    <div class="mt-5 text-muted text-center">
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
import { useRouter } from "vue-router";
import NProgress from "nprogress";

import AuthFooter from "./Auth.Footer.vue";
import AuthHeader from "./Auth.Header.vue";
import ImageToast from "@/components/ImageToast.vue";

import successImage from "../../assets/images/icons/check.png";
import errorImage from "../../assets/images/icons/error.png";

const router = useRouter();

// Form state
const email = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const loading = ref(false);

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
// Handle change password request
const handlePasswordChange = async () => {
  if (!email.value || !newPassword.value || !confirmPassword.value) {
    toastStatus.value = "error";
    toastTitle.value = "Missing Fields";
    toastMessage.value = "Please fill in all fields.";
    toastImage.value = errorImage;
    return;
  }

  if (newPassword.value !== confirmPassword.value) {
    toastStatus.value = "error";
    toastTitle.value = "Passwords Don't Match";
    toastMessage.value = "New password and confirmation must match.";
    toastImage.value = errorImage;
    return;
  }

  NProgress.start();
  loading.value = true;

  try {
    // ✅ Move to OTP verification with email + password
    router.push({ 
      path: "/verify-otp", 
      query: { 
        email: email.value, 
        password: newPassword.value 
      } 
    });
  } catch (error) {
    toastStatus.value = "error";
    toastTitle.value = "Error";
    toastMessage.value = "Could not proceed. Try again.";
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
    background: url(../../assets/images/modern-bg/key.png);
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

