<template>
  <div>
    <div class="container-fluid p-0">
      <div class="row g-0">
        <div class="col-xl-8 col-lg-7 col-md-6 d-sm-none d-none d-md-block">
          <div class="auth-full-bg pt-lg-5 p-4">
            <div class="w-100">
              <div class="bg-overlay"></div>
              <div class="d-flex h-100 flex-column">
                <div class="p-4 mt-auto">
                  <div class="row justify-content-center d-none">
                    <div class="col-lg-7">
                      <div class="text-center">
                        <h4 class="mb-3">
                          <i class="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>
                          Connecting <span class="text-primary">you</span> to your <span class="text-primary">World.</span>
                        </h4>
                        <p class="font-size-16 mb-2">With PaySol you can:</p>

                        <div dir="ltr">
                          <div class="owl-carousel owl-theme auth-review-carousel" id="auth-review-carousel">
                            <div class="item">
                              <div class="py-1">
                                <p class="font-18px mb-2 text-primary">Track Your Sales</p>
                                <h1 class="mdi mdi-cash-refund text-primary font-50px"></h1>
                              </div>
                            </div>

                            <div class="item">
                              <div class="py-1">
                                <p class="font-18px mb-2 text-primary">Have An Overview Of Staff Performance</p>
                                <h1 class="mdi mdi-account-cash-outline text-primary font-50px"></h1>
                              </div>
                            </div>

                            <div class="item">
                              <div class="py-1">
                                <p class="font-18px mb-2 text-primary">Get Daily Reports</p>
                                <h1 class="mdi mdi-chart-line text-primary font-50px"></h1>
                              </div>
                            </div>

                            <div class="item">
                              <div class="py-1">
                                <p class="font-18px mb-2 text-primary">All This At Your Comfort</p>
                                <h1 class="mdi mdi-sofa-outline text-primary font-50px"></h1>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end col -->

        <div class="col-xl-4 col-md-6 col-lg-5">
          <div class="auth-full-page-content p-md-5 p-5 bg-white">
            <div class="w-100">
              <div class="d-flex flex-column h-100 p-3">
                <AuthHeader />

                <div class="my-auto">
                  <div>
                    <h5 class=" text-uppercase fs-12 ">Customer Relationship Management Dashboard</h5>
                    <h3 class="fs-20 fw-bolder mb-4 mt-0 pt-0">Dashboard Login</h3>
                    <p class="fw-bold mb-1">Login to your Account</p>
                    <p class="text-muted fs-12 mb-2">
                        Access your customer relationship tools securely. Enter your credentials to manage clients, track interactions, and monitor performance.
                    </p>
                  </div>

                  <div class="mt-4">
                    <form @submit.prevent="handleLogin">
                      <div class="mb-4">
                        <label for="username" class="form-label">Email</label>
                        <input 
                          type="email" 
                          class="form-control " 
                          id="username" 
                          v-model="username"
                          placeholder="Enter email"
                          required
                          autofocus
                        >
                      </div>

                      <div class="mb-4">
                        <div class="float-end d-none">
                          <router-link to="/Reset-Password" class="text-muted">
                            Forgot password?
                          </router-link>
                        </div>
                        <label for="password" class="form-label">Password</label>
                        <div class="input-group auth-pass-inputgroup">
                          <input 
                            :type="showPassword ? 'text' : 'password'" 
                            class="form-control" 
                            id="password"
                            v-model="password"
                            placeholder="Enter password" 
                            aria-label="Password" 
                            aria-describedby="password-addon"
                            required
                          >
                          <button 
                            class="btn btn-light" 
                            type="button" 
                            id="password-addon"
                            @click="togglePasswordVisibility"
                            :aria-label="showPassword ? 'Hide password' : 'Show password'"
                          >
                            <i :class="showPassword ? 'mdi mdi-eye-off-outline' : 'mdi mdi-eye-outline'"></i>
                          </button>
                        </div>
                      </div>

                      <div class="form-check d-none">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          id="remember-check"
                          v-model="rememberMe"
                        >
                        <label class="form-check-label" for="remember-check">
                          Remember me
                        </label>
                      </div>

                      <div class="mt-3 d-grid">
                        <button 
                          class="btn btn-primary waves-effect waves-light d-flex align-items-center justify-content-center btn-lg text-capitalize fw-bold" 
                          type="submit"
                          :disabled="loading"
                        >   
                           <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          {{ loading ? 'Logging in...' : 'Log In' }}
                        </button>
                      </div>
                    </form>

                    <div>
                       <div class="text-center my-3 d-flex align-items-center justify-content-center gap-2">
                        <div class="flex-grow-1 opacity-25"><hr class="d-flex flex-grow-1"></div>
                        <span>OR</span>
                        <div class="flex-grow-1 opacity-25"><hr class="d-flex flex-grow-1"></div>
                      </div>

                      <label class="border waves-light waves-effect border-primary visibility-option  border-2 mb-2 shadow-none cursor-pointer border-radius w-100">
                          <div class="p-3 px-3">
                              <div class="d-flex align-items-center">
                                  <div class="avatar-sm me-3">
                                      <span class="avatar-title rounded-circle bg-primary-muted fs-2">
                                          <i class="mdi mdi-shield-check text-primary "></i>
                                      </span>
                                  </div>

                                  <div class="overflow-hidden me-auto">
                                      <h5 class="font-size-15 text-truncate mb-0 text-black">
                                          New Here? Start Verification
                                      </h5>
                                      <p class="text-muted mb-0" style="font-weight: 400; font-size: 12px;">
                                          Verify your email or phone to get started with our services.
                                      </p>
                                  </div>

                                  <div class="ms-2">
                                      <span class="mdi mdi-chevron-right fs-1 text-primary"></span>
                                  </div>
                              </div>
                          </div>
                      </label>
                    </div>
                    <div class="mt-5 text-muted">
                      <span> Forgot your password? </span>
                      <router-link to="/reset-password" class="fw-bold d-inline-flex align-items-center">
                        <i class="bx bx-key me-1"></i> Reset Password
                      </router-link>
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
      <!-- end row -->
    </div>
    <!-- end container-fluid -->
  </div>
</template>
<script setup>
/**
 * ================================
 * IMPORTS
 * ================================
 */
import { ref, computed, watch } from "vue"; // Vue reactivity + computed values
import { useRouter } from "vue-router"; // For navigation after login
import AuthFooter from "./Auth.Footer.vue"; // Login footer UI
import AuthHeader from "./Auth.Header.vue"; // Login header UI

import NProgress from "nprogress";//the proggress bar at the top

import authApi from "@/api/auth";   // API module for authentication requests
import { useAuthStore } from "@/stores/auth"; // <-- import the Pinia auth store
import { setAuthToken } from "@/api/index"; // Helper to attach token to requests
import ImageToast from "@/components/ImageToast.vue"; // Toast component for feedback

//Importing the results images
import successImage from "../../assets/images/icons/check.png";
import errorImage from "../../assets/images/icons/error.png";

/**
 * ================================
 * REACTIVE STATE
 * ================================
 */
const router = useRouter(); // Vue Router instance for navigation
const authStore = useAuthStore(); // <-- Pinia store instance

// User credentials + login form state
const username = ref("");      // Username input value (actually email)
const password = ref("");      // Password input value
const rememberMe = ref(false); // "Remember me" checkbox
const showPassword = ref(false); // Toggles password visibility
const loading = ref(false);    // Loading state during API call

// Toast state (drives ImageToast component)
const toastStatus = ref(null); // "loading" | "success" | "error"
const toastTitle = ref("");    // Toast heading text
const toastMessage = ref("");  // Toast body text
const toastImage = ref(null);  // Optional toast image (success/error icons)

// Dynamic current year (for footer or branding)
const currentYear = computed(() => new Date().getFullYear());

//Login challenge details
const loginChallengeId = ref(null);
const maskedDestination = ref(null);
const otpRequired = ref(false);
const otpPurpose = ref("");
const otpChannel = ref("");
const availableChannels = ref([]);
const expiryTimeMin = ref(null);

/**
 * ================================
 * METHODS
 * ================================
 */

// Toggle between password text/plain or hidden
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Handle login process
const handleLogin = async () => {

   // Start the loader when login begins
  NProgress.start();
  // Validation: ensure both fields are filled
  if (!username.value || !password.value) {
    toastStatus.value = "error";
    toastTitle.value = "Missing Fields";
    toastMessage.value = "Please enter both username and password.";
    toastImage.value = errorImage;
    return;
  }

  // Begin loading state + show loading toast
  loading.value = true;
  toastStatus.value = "loading";
  toastTitle.value = "Logging In";
  toastMessage.value = "Please wait while we authenticate...";
  toastImage.value = null;

  console.log(username.value)

  try {
    // Call login API with entered credentials
    const response = await authApi.login({
      email: username.value,    // 👈 API expects "email"
      pin: password.value
    });

     console.log(username.value)
     console.log(response.data)

     otpRequired.value = response.data?.requires_otp || false;
     loginChallengeId.value = response.data?.login_challenge_id || null;
     maskedDestination.value = response.data?.masked_destination || null;
     otpPurpose.value = response.data?.purpose || "";
     otpChannel.value = response.data?.channel || "";
     availableChannels.value = response.data?.available_channels || [];
     expiryTimeMin.value = response.data?.expires_in_minutes || null;
     const expiresAt = Date.now() + response.data?.expires_in_minutes * 60 * 1000

     if(otpRequired.value){
      // Redirect to verification page
      //alert("OTP required for login.")
      router.push({ 
        path: '/Verify-otp', 
        query: { 
          email: response.data?.masked_destination 
        },
        state:{
          expiresAt,
          responseData: response.data,
          loginChallengeId: response.data?.login_challenge_id,
          otpChannel: response.data?.channel, 
          otpPurpose: response.data?.purpose,
          maxAttempts:response.data?.max_attempts,
          availableChannels: response.data?.available_channels,
          expiryTimeMinutes: response.data?.expires_in_minutes,
          maskedDestination: response.data?.masked_destination
        }
      });
     }
    


    // Extract token (depends on API response structure)
    const token = response.data?.data?.token || response.data?.token;
    const user = response.data?.data?.user || response.data?.user;
    if (!token) throw new Error("No token received from API");

    // 👇 Save everything globally (Pinia + localStorage)
    authStore.setAuth(token, user);
    //alert(user.verification.fully_verified)

   

    console.log(response.data);

    // Save token for future authenticated requests
    setAuthToken(token);
    if (rememberMe.value) {
      localStorage.setItem("authToken", token); // Persist across sessions
    } else {
      sessionStorage.setItem("authToken", token); // Clear on browser close
    }

    // Success toast
    toastStatus.value = "success";
    toastTitle.value = "Login Successful 🎉";
    toastMessage.value = "Welcome back to the dashboard.";
    toastImage.value = successImage;

    // Redirect to dashboard after short delay
    setTimeout(() => {
      //router.push("/");
      window.location.href = "/";
    }, 1500);

  } catch (error) {
  console.error("Login failed:", error.response?.data || error.message);
  
  const status = error.response?.status;
  const apiMessage = error.response?.data?.message;
  
  let title = "Login Failed";
  let message = "Something went wrong. Please try again.";
  
  if (status === 401) {
    message = "Invalid email or PIN. Please check and try again.";
  } else if (status === 403) {
    message = apiMessage || "Your account is not yet verified.";
    if (error.response?.data?.next_step === 'verify_otp') {
      // Redirect to verification page
      router.push({ path: '/verify', query: { email: username.value } });
      return;
    }
  } else if (status === 429) {
    message = "Too many failed attempts. Try again in 15 minutes.";
  } else if (status === 422) {
    message = "Please check your email and PIN format.";
  }
  
  setTimeout(() => {
    toastStatus.value = "error";
    toastTitle.value = title;
    toastMessage.value = message;
    toastImage.value = errorImage;
  }, 100);
}finally {
    // Always stop loading spinner
     NProgress.done(); // stop loader when done
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
</style>