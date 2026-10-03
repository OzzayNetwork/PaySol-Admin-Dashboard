<template>
    <div class="modal fade" :class="{ show: visible }" tabindex="-1"
        :style="{ display: visible ? 'block' : 'none' }" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered animate__animated animate__zoomInUp animate__faster">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title fw-bold text-black fs-4 mb-1">
                        <span>Deactivate Admin</span>
                    </h5>
                    <button type="button" class="btn p-0 border-0" @click="close" :disabled="submitting"
                        style="width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.05);display:grid;place-items:center;">
                        <i class="bx bx-x text-dark" style="font-size:22px;line-height:1;"></i>
                    </button>
                </div>

                <div class="modal-body">
                    <!-- Who -->
                    <div class="d-flex align-items-center gap-2 mb-3 p-2 bg-light rounded">
                        <div class="avatar-sm d-flex">
                            <img v-if="admin?.profile_photo_url" :src="admin.profile_photo_url" class="rounded-circle avatar-sm" />
                            <div v-else class="avatar-sm rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center">
                                <span class="text-uppercase fw-bold fs-3">{{ initials }}</span>
                            </div>
                        </div>
                        <div>
                            <span class="d-block fw-bold">{{ admin?.full_name }}</span>
                            <span style="font-size: 12px;" class="text-muted text-capitalize">{{ roleName }}</span>
                        </div>
                    </div>

                    <p class="text-muted small">
                        Deactivating signs this admin out of every device immediately. They can be reactivated later.
                    </p>

                    <!-- Reason -->
                    <div class="mb-3">
                        <label class="form-label fw-bold">Reason for deactivation <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" v-model="reason" maxlength="255"
                            :disabled="submitting" placeholder="e.g. Left the company" />
                        <div v-if="errors.reason" class="text-danger small mt-1">{{ errors.reason }}</div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-link waves-effect fw-bold btn-lg" @click="close" :disabled="submitting">Cancel</button>
                    <button type="button" class="btn btn-danger fw-semibold btn-lg gap-2 d-flex align-items-center"
                        @click="confirm" :disabled="submitting">
                        <span v-if="submitting" class="spinner-border spinner-border-sm"></span>
                        <span>{{ submitting ? 'Deactivating…' : 'Deactivate' }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Backdrop -->
    <div v-if="visible" class="modal-backdrop fade show"></div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AdminsAPI from '@/api/admins'

const props = defineProps({
    admin: { type: Object, default: null },   // the admin being deactivated
})

const emit = defineEmits(['deactivated', 'close', 'toast', 'error'])

const visible = ref(false)
const reason = ref('')

const submitting = ref(false)
const errors = ref({})

const initials = computed(() => {
    const f = props.admin?.first_name?.charAt(0) || ''
    const l = props.admin?.last_name?.charAt(0) || ''
    return (f + l) || 'U'
})
const roleName = computed(() => {
    const r = props.admin?.role
    return r?.display_name || r?.name || ''
})

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
    reason.value = ''
    errors.value = {}
    submitting.value = false
}

async function confirm() {
    errors.value = {}
    if (!reason.value.trim()) {
        errors.value.reason = 'Please provide a reason.'
        return
    }
    submitting.value = true
    try {
        await AdminsAPI.deactivate(props.admin.id, reason.value.trim())
        visible.value = false
        emit('deactivated', { admin: props.admin, reason: reason.value.trim() })
        emit('toast', 'Admin Deactivated', `${props.admin.full_name} is now inactive.`)
    } catch (error) {
        emit('error', 'Deactivation Failed', error.response?.data?.message || 'Please try again.')
    } finally {
        submitting.value = false
    }
}

defineExpose({ open, close })
</script>

<style scoped>
.modal.show {
    background: transparent;
}
</style>