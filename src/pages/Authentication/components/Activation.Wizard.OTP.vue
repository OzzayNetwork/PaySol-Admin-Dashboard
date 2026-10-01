<template>
  <div class=" animate__animated animate__fadeInRight animate__faster">
    <div>
      <template v-if="otpPurpose === 'account_activation'">
        <template v-if="otpChannel === 'email'">
          <h5 class="text-uppercase fs-12">
            <h5 class="text-uppercase fs-12">
            Account Activation
          </h5>
          </h5>
          <h3 class="fs-20 fw-bolder mb-4 mt-0 pt-0">
            
            {{ emailVerified ? 'Email Was Verified Successfully' : 'Email Verification' }}

            

            <span v-if="emailVerified" title="Email verified" class="mdi-check-decagram mdi text-primary fs-4 mx-2"></span>

            <span v-if="!emailVerified" class="badge badge-pill badge-soft-warning font-size-11 ">Pending</span>
          
          </h3>
          <p class="fw-bold mb-1">Enter the 6-digit OTP</p>
          <p class="text-muted fs-12 mb-2">
            We've sent a one-time password (OTP) to your email <strong>{{ maskedDestination }}</strong>.
            Enter it below to continue.
          </p>
        </template>
        <template v-else-if="otpChannel === 'sms'">
          <h5 class="text-uppercase fs-12">Account Activation</h5>
          <h3 class="fs-20 fw-bolder mb-4 mt-0 pt-0">Phone Verification             
            <span v-if="phoneVerified" title="Email verified" class="mdi-check-decagram mdi text-primary fs-4 mx-2"></span>

            <span v-if="!phoneVerified" class="badge badge-pill badge-soft-warning font-size-11 ">Pending</span>
          </h3>
          <p class="fw-bold mb-1">Enter the 6-digit OTP</p>
          <p class="text-muted fs-12 mb-2">
            We've sent a one-time password (OTP) to the phone number you registered with.
            Enter it below to continue.
          </p>
        </template>

              <!-- Neither Verified -->
        <div
          v-if="!emailVerified && !phoneVerified"
          class="alert alert-warning mt-1 "
          role="alert"
        >
          <h6>Please Note</h6>
          <p>
            You must verify either your phone number or email address to continue with account activation.
          </p>
        </div>


        <!-- Phone Verified Only -->
        <div
          v-else-if="phoneVerified && !emailVerified"
          class="alert alert-success mt-1"
          role="alert"
        >
          <h6>Phone Number Verified ✓</h6>
          <p>
            Your phone number has been successfully verified. You may now proceed to create your password and complete account activation. Email verification remains optional.
          </p>
        </div>

        <!-- Email Verified Only -->
        <div
          v-else-if="emailVerified && !phoneVerified"
          class="alert alert-success mt-1"
          role="alert"
        >
          <h6>Email Address Verified ✓</h6>
          <p>
            Your email address has been successfully verified. You may now proceed to create your password and complete account activation. Phone verification remains optional.
          </p>
        </div>

        <!-- Both Verified -->
        <div
          v-else-if="emailVerified && phoneVerified"
          class="alert alert-success mt-1"
          role="alert"
        >
          <h6>Verification Complete ✓</h6>
          <p>
            Both your email address and phone number have been successfully verified. You may proceed to create your password and complete account activation.
          </p>
        </div>
      </template>
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

        <div>The OTP will expire 15 Minutes after the account was created <strong>{{ timeLeft }}</strong></div>

        <div class="mt-3 d-flex justify-content-center">
          <button
            class="btn btn-primary waves-effect waves-light d-flex align-items-center justify-content-center btn-lg text-capitalize fw-bold flex-grow-1"
            type="submit"
            :disabled="loading || resendingOTP"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {{ loading ? 'Verifying...' : 'Verify OTP' }}
          </button>
        </div>
      </form>

      <!-- Per-channel verification status -->
      <div v-if="emailVerified || phoneVerified" class="mt-4 d-none">
        <div
          v-if="emailVerified"
          class="d-flex align-items-center justify-content-center gap-2 text-success fw-bold mb-1"
        >
          <i class="bx bx-check-circle"></i>
          <span>Email address verified successfully</span>
        </div>
        <div
          v-if="phoneVerified"
          class="d-flex align-items-center justify-content-center gap-2 text-success fw-bold mb-1"
        >
          <i class="bx bx-check-circle"></i>
          <span>Phone number verified successfully</span>
        </div>
      </div>

      <div class="mt-4 text-muted text-center">
        <span> Didn't receive the OTP? </span>
        <a href="javascript:void(0)" class="fw-bold" @click="resendOtp">Resend</a>
        (Attempts remaining: <strong>{{ maxAttempts }}</strong>)
      </div>
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
import { ref, nextTick, onMounted, onUnmounted, toRef } from "vue";
import { useRouter } from "vue-router";
import NProgress from "nprogress";

import authApi from "@/api/auth";
import { useAuthStore } from "@/stores/auth";
import { setAuthToken } from "@/api/index";

import successImage from "../../../assets/images/icons/check.png";
import errorImage from "../../../assets/images/icons/error.png";
import ImageToast from "@/components/ImageToast.vue";

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
const emit = defineEmits(['verified']);

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

// State handed over from the previous page via router history.state
const loginChallengeId = history.state.loginChallengeId;
const availableChannels = history.state.availableChannels || [];
const expiryMinutes = history.state.expiryTimeMinutes ?? props.expiryTimeMinutes;
const expiresAt = ref(history.state.expiresAt || (Date.now() + expiryMinutes * 60 * 1000));

// Live verification status, updated from the verify-otp response
const verification = ref({
  email_verified: false,
  phone_verified: false,
  fully_verified: false,
});

// OTP inputs
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

// Countdown timer
const expired = ref(false);
let interval = null;

const channelLabel = (c) => (c === 'sms' ? 'phone number' : 'email');

function updateTimer() {
  const diff = Math.max(0, expiresAt.value - Date.now());
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);


  if (diff <= 0 && !expired.value) {
    expired.value = true;
    clearInterval(interval);

    toastStatus.value = "error";
    toastTitle.value = "OTP Expired";
    toastMessage.value = "The OTP has expired. Please request a new one.";
    toastImage.value = errorImage;
  }
}

const moveToNext = (index, event) => {
  if (event.inputType === "insertText" && otp.value[index] && index < 5) {
    nextTick(() => otpInput.value[index + 1].focus());
  }
};

const moveToPrev = (index, event) => {
  if (event.key === "Backspace" && !otp.value[index] && index > 0) {
    nextTick(() => otpInput.value[index - 1].focus());
  }
};

onMounted(() => {
  nextTick(() => {
    if (otpInput.value[0]) otpInput.value[0].focus();
  });
  interval = setInterval(updateTimer, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});

const handleOtpSubmit = async () => {
  const code = otp.value.join("");

  if (code.length !== 6) {
    toastStatus.value = "error";
    toastTitle.value = "Invalid OTP";
    toastMessage.value = "Please enter the full 6-digit code.";
    toastImage.value = errorImage;
    return;
  }

  if (!userEmail) {
    toastStatus.value = "error";
    toastTitle.value = "Missing account email";
    toastMessage.value = "We couldn't determine which account to verify. Please reopen the activation link.";
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
    const response = await authApi.verifyOtp({
      email: userEmail,
      code: code,
      channel: otpChannel.value,
    });

    // verify-otp returns { message, next_step, verification } - NOT a token.
    const body = response.data?.data ?? response.data ?? {};
    const v = body.verification ?? {};
    const nextStep = body.next_step ?? null;

    verification.value = {
      email_verified: !!v.email_verified,
      phone_verified: !!v.phone_verified,
      fully_verified: !!v.fully_verified,
    };

    console.log("The Verrification: ")
    console.log(verification.value.email_verified)
    // Verified - stop the countdown.
    clearInterval(interval);

    const label = channelLabel(otpChannel.value);
    toastStatus.value = "success";
    toastTitle.value = "Verification successful";
    toastMessage.value = "Your " + label + " has been successfully verified. Continue setting up your account.";
    toastImage.value = successImage;

    // Hand control back to the parent wizard to move on (e.g. to Set PIN).
    emit('verified', { channel: otpChannel.value, verification: verification.value, nextStep });
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

const resendOtp = async () => {
  resendingOTP.value = true;
  toastStatus.value = "loading";
  toastTitle.value = "Resending OTP...";
  toastMessage.value = "Please wait while we Resend the OTP.";
  toastImage.value = null;

  try {
    const response = await authApi.resendLoginOtp({ login_challenge_id: loginChallengeId, channel: otpChannel.value });

    maxAttempts.value = response.data?.issuances_remaining ?? maxAttempts.value;
    maskedDestination.value = response.data?.masked_destination || maskedDestination.value;

    toastStatus.value = "success";
    toastTitle.value = "OTP Resent";
    toastMessage.value = `${response.data.message}, ${maskedDestination.value}. Attempts remaining: ${maxAttempts.value}`;
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