<template>
    <!-- Bootstrap modal; visibility controlled by the `show` prop via v-if wrapper in parent
         OR by toggling .show + backdrop here. We self-manage using a simple show flag. -->
    <div class="modal fade" :class="{ show: visible }" tabindex="-1"
        :style="{ display: visible ? 'block' : 'none' }" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered animate__animated animate__zoomInUp animate__faster">
            <div class="modal-content">

                <!-- ===== STEP 1: REASON ===== -->
                <template v-if="step === 'reason'">
                     <div class="modal-header ">
                        <h5 class="modal-title fw-bold text-black fs-4 mb-1">
                            <i class="mdi mdi-map-marker text-primary me-1 d-none"></i>
                            <span>Deactivate User</span>
                        </h5>
                        <button
                            type="button"
                            class="btn p-0 border-0"
                           
                            @click="close" :disabled="submitting"
                            style="width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.05);display:grid;place-items:center;"
                        >
                            <i class="bx bx-x text-dark" style="font-size:22px;line-height:1;"></i>
                        </button>
                        </div>

                    <div class="modal-body">
                        <!-- Who -->
                        <div class="d-flex align-items-center gap-2 mb-3 p-2 bg-light rounded">
                            <div class="avatar-sm d-flex">
                                <img v-if="user?.profile_photo_url" :src="user.profile_photo_url" class="rounded-circle avatar-sm" />
                                <div v-else class="avatar-sm rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center">
                                    <span class="text-uppercase fw-bold fs-3">{{ initials }}</span>
                                </div>
                            </div>
                            <div>
                                <span class="d-block fw-bold">{{ user?.full_name }}</span>
                                <span style="font-size: 12px;" class="text-muted text-uppercase">{{ roleLabel }}</span>
                            </div>
                        </div>

                        <!-- Reason -->
                        <div class="mb-3">
                            <label class="form-label fw-bold">Reason for deactivation <span class="text-danger">*</span></label>
                            <select class="form-select" v-model="reason" :disabled="submitting">
                                <option value="" disabled>Select a reason…</option>
                                <option v-for="r in reasons" :key="r.key" :value="r.key">{{ r.label }}</option>
                            </select>
                            <div v-if="errors.reason" class="text-danger small mt-1">{{ errors.reason }}</div>
                        </div>

                        <!-- Notes -->
                        <div class="mb-3">
                            <label class="form-label fw-bold">Notes <span class="text-muted fw-normal">(optional)</span></label>
                            <textarea class="form-control" rows="2" v-model="notes" :disabled="submitting"
                                placeholder="Any additional context…" maxlength="500"></textarea>
                        </div>

                        <!-- Channel -->
                        <div class="mb-1">
                            <label class="form-label fw-bold">Send confirmation code to your:</label>
                            <div class="d-flex gap-3 flex-column mb-4">
                                <div class="form-check d-flex align-items-center gap-2">
                                    <input class="form-check-input" type="radio" id="chan-email" style="height: 15px; width: 15px;" value="email"
                                        v-model="channel" :disabled="submitting" />
                                    <label class="form-check-label align-items-center d-flex" for="chan-email">
                                        <i class="mdi mdi-email-outline me-1 fs-3"></i> <span>Email</span>
                                    </label>
                                </div>
                                <div class="form-check d-flex align-items-center gap-2">
                                    <input class="form-check-input " type="radio" style="height: 15px; width: 15px;" id="chan-sms" value="sms"
                                        v-model="channel" :disabled="submitting" />
                                    <label class="form-check-label align-items-center d-flex" for="chan-sms">
                                        <i class="mdi mdi-message-text-outline me-1 fs-3"></i> <span>SMS</span>
                                    </label>
                                </div>
                            </div>
                            <small class="text-muted">A 6-digit code will be sent to you (the admin) to confirm this action.</small>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link waves-effect fw-bold btn-lg" @click="close" :disabled="submitting">Cancel</button>
                        <button type="button" class="btn btn-primary fw-semibold btn-lg gap-2 d-flex align-items-center"
                            @click="requestCode" :disabled="submitting">
                            <span v-if="submitting" class="spinner-border spinner-border-sm"></span>
                            <span>{{ submitting ? 'Sending…' : 'Continue' }}</span>
                            <i v-if="!submitting" class="mdi mdi-arrow-right"></i>
                        </button>
                    </div>
                </template>

                <!-- ===== STEP 2: OTP ===== -->
                <template v-else>
                    <div class="modal-header border-bottom-0 px-4 d-flex flex-column">
                        <div class="text-left w-100 d-flex justify-content-between align-items-center mb-4">
                            <button 
                                type="button"
                                 @click="goBack" :class="{ 'disabled-link': submitting }"
                                class="btn btn-link waves-effect text-capitalize d-flex align-items-center">
                                <i class="bx bx-chevron-left fs-2"></i> <span>Change reason</span>
                            </button>
                            <button type="button" class="btn-close " @click="close" :disabled="submitting"></button>

                        </div>
                        <div class="d-flex align-items-center justify-content-center mb-3">
                            <img :src="channel === 'sms' ? smsOtp : emailOtp" alt="OTP Icon" class="img-fluid img" style="max-width: 100px; height: 100px;">
                        </div>
                        <h5 class="modal-title fw-bold text-black fs-4 mb- text-center mt-2">
                            <i class="mdi mdi-map-marker text-primary me-1 d-none"></i>
                            <span>Confirm Deactivation</span>
                        </h5>
                        <button type="button" class="btn-close d-none" @click="close" :disabled="submitting"></button>
                    </div>
                    <div class="modal-body px-4 pt-0">
                        <p class="text-muted text-center pb-3">
                            We sent a 6-digit code to your {{ channel === 'sms' ? 'phone' : 'email' }}
                <strong>{{ maskedDestination }}</strong>. Enter it below to confirm deactivating <strong>{{ user?.full_name }}</strong>.
                        </p>

                        <div class="mb-3 mt-3">
                            <label class="form-label fw-bold d-none">Confirmation code</label>
                            <input type="text" class="form-control form-control-lg text-center"
                                style="letter-spacing: 0.5rem; font-weight: 700;" maxlength="6" inputmode="numeric"
                                v-model="otp" :disabled="submitting" placeholder="------"
                                @keyup.enter="confirm" />
                            <div v-if="errors.otp" class="text-danger small mt-1 text-center">{{ errors.otp }}</div>

                            <div class="text-center mb-2 w-100 d-flex justify-content-center mt-2">
                                <OtpTimer :seconds="900" :reset-key="otpSentCount" @expired="onOtpExpired" />
                            </div>
                        </div>

                        <div class="mt-4">
                            <button @click="confirm" :disabled="submitting || otp.length !== 6"
                                class="btn  fw-semibold btn-lg gap-2  align-items-center w-100 text-center btn-danger d-flex align-items-center justify-content-center">
                                <span v-if="submitting" class="spinner-border spinner-border-sm"></span>
                                <span>{{ submitting ? 'Deactivating…' : 'Deactivate' }}</span>
                            </button>
                            <p class="mt-3 text-center fs-6 text-muted">{{ resending? '' : "Not Received yet?" }} <a href="javascript:void(0);" :class="{ 'disabled-link': submitting || resending }" @click="resendCode"> {{ resending ? 'Resending…' : "Resend Code" }}</a></p>
                        </div>

                        <div class="d-flex justify-content-between align-items-center d-none">
                            <a href="javascript:void(0);" class="small" @click="goBack" :class="{ 'disabled-link': submitting }">
                                <i class="mdi mdi-arrow-left"></i> Change reason
                            </a>
                            <a href="javascript:void(0);" class="small" @click="resendCode"
                                :class="{ 'disabled-link': submitting || resending }">
                                {{ resending ? 'Resending…' : "Didn't get it? Resend" }}
                            </a>
                        </div>
                    </div>
                    <div class="modal-footer d-none">
                        <button type="button" class="btn btn-light" @click="close" :disabled="submitting">Cancel</button>
                        <button type="button" class="btn btn-danger d-flex align-items-center gap-2"
                            @click="confirm" :disabled="submitting || otp.length !== 6">
                            <span v-if="submitting" class="spinner-border spinner-border-sm"></span>
                            <i v-if="!submitting" class="mdi mdi-account-cancel"></i>
                            <span>{{ submitting ? 'Deactivating…' : 'Deactivate' }}</span>
                        </button>
                    </div>
                </template>

            </div>
        </div>
    </div>

    <!-- Backdrop -->
    <div v-if="visible" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import UsersAPI from '@/api/users'

import emailOtp from "../../assets/images/icons/otp/email-otp-black.svg"
import smsOtp from "../../assets/images/icons/otp/phone-otp.svg"
import OtpTimer  from '@/components/OTP/Otptimer.vue'


import emailOtpColor from "../../assets/images/icons/otp/email-otp-color.svg"
import smsOtpColor from "../../assets/images/icons/otp/otp-phone-color.svg"

const props = defineProps({
    user: { type: Object, default: null },     // the user being deactivated
    reasons: { type: Array, default: () => [] }, // [{ key, label }]
    roles: { type: Array, default: () => [] },   // for role label
    admin: { type: Object, default: null },   // acting admin — OTP goes to them
})

const emit = defineEmits(['deactivated', 'close', 'toast', 'error'])

// Visibility — parent opens by setting :user and calling open() via ref, but we
// also expose a simple visible flag toggled by watching `user`.
const visible = ref(false)
const step = ref('reason')

// Form
const reason = ref('')
const notes = ref('')
const channel = ref('email')
const otp = ref('')

// State
const submitting = ref(false)
const resending = ref(false)
const errors = ref({})

// Derived
const initials = computed(() => {
    const f = props.user?.first_name?.charAt(0) || ''
    const l = props.user?.last_name?.charAt(0) || ''
    return (f + l) || 'U'
})
const roleLabel = computed(() => {
    const name = props.user?.role
    if (!name) return ''
    const r = props.roles.find(x => x.name === name)
    return r?.label || name.replace(/_/g, ' ')
})

// The OTP is sent to the ACTING admin. Mask their email/phone for display.
const maskedDestination = computed(() => {
    if (channel.value === 'sms') return maskPhone(props.admin?.phone)
    return maskEmail(props.admin?.email)
})

function maskEmail(email) {
    if (!email) return ''
    const [name, domain] = email.split('@')
    if (!domain) return email
    const visible = name.slice(0, 2)
    const masked = '*'.repeat(Math.max(name.length - 2, 1))
    return `${visible}${masked}@${domain}`
}

function maskPhone(phone) {
    if (!phone) return ''
    const tail = phone.slice(-3)
    const head = phone.slice(0, 4)
    return `${head}${'*'.repeat(Math.max(phone.length - 7, 3))}${tail}`
}

// Open/close — exposed to parent via defineExpose
function open() {
    reset()
    visible.value = true
}
function close() {
    if (submitting.value) return
    visible.value = false
    emit('close')
}
function reset() {
    step.value = 'reason'
    reason.value = ''
    notes.value = ''
    channel.value = 'email'
    otp.value = ''
    errors.value = {}
    submitting.value = false
    resending.value = false
}

const otpSentCount = ref(0)  // bump on each send/resend to restart the timer

// Step 1 → request OTP
async function requestCode() {
    errors.value = {}
    if (!reason.value) {
        errors.value.reason = 'Please select a reason.'
        return
    }
    submitting.value = true
    try {
        await UsersAPI.deactivateRequest(props.user.id, {
            reason: reason.value,
            notes: notes.value || null,
            channel: channel.value,
        })
        step.value = 'otp'
        otpSentCount.value++
    } catch (error) {
        emit('error', 'Could Not Send Code', error.response?.data?.message || 'Please try again.')
    } finally {
        submitting.value = false
    }
}

// Step 2 → confirm
async function confirm() {
    errors.value = {}
    if (otp.value.length !== 6) {
        errors.value.otp = 'Enter the 6-digit code.'
        return
    }
    submitting.value = true
    try {
        const { data } = await UsersAPI.deactivateConfirm(props.user.id, {
            reason: reason.value,
            notes: notes.value || null,
            channel: channel.value,
            otp: otp.value,
        })
        visible.value = false
        emit('deactivated', data.data)   // updated user object
        emit('toast', 'User Deactivated', `${props.user.full_name} is now inactive.`)
    } catch (error) {
        errors.value.otp = error.response?.data?.message || 'Invalid or expired code.'
    } finally {
        submitting.value = false
    }
}

// Resend
async function resendCode() {
    if (resending.value) return
    resending.value = true
    try {
        await UsersAPI.deactivateRequest(props.user.id, {
            reason: reason.value,
            notes: notes.value || null,
            channel: channel.value,
        })
        otpSentCount.value++
        emit('toast', 'Code Resent', `A new code was sent to your ${channel.value}.`)
    } catch (error) {
        errors.value.otp = error.response?.data?.message || 'Could not resend.'
    } finally {
        resending.value = false
    }
}

function goBack() {
    if (submitting.value) return
    step.value = 'reason'
    otp.value = ''
    errors.value = {}
}

defineExpose({ open, close })
</script>

<style scoped>
.modal.show {
    background: transparent;
}
.disabled-link {
    pointer-events: none;
    opacity: 0.5;
}
</style>
