<template>
    <div class="p-3 rounded d-flex gap-3">
        <div 
            class="d-flex align-items-center w-100"
            :class="{ 'cursor-pointer': clickable }"
            
        >

            <!-- Avatar -->
            <div class="flex-shrink-0 me-3">
                <div class=" d-flex active-author border-round"
                :class="avatarSize"
                >

                    <div class="position-relative">
                        <img
                            v-if="user.profile_photo_url"
                            :src="user.profile_photo_url"
                            class="rounded-circle profile-pic-cont"
                            alt="User Avatar"
                        >

                        <div
                            v-else
                            class="avatar-sm rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                        >
                            <span class="fw-bold">
                                {{ initials }}
                            </span>
                        </div>

                        <span
                            v-if="showStatus"
                            class="position-absolute bottom-0 end-0 p-1 border border-white rounded-circle"
                            :class="isOnline ? 'bg-success' : 'bg-secondary'"
                        ></span>

                    </div>

                </div>
            </div>

            <!-- User Details -->
            <div class="flex-grow-1">
                 <p class="m-0 fs-6 fw-bold text-truncate" @click="viewProfile">
                    {{ user.full_name }}
                </p>

                <!-- Email -->
                <p
                    v-if="showEmail"
                    class="text-muted small mb-0"
                >
                    {{ user.email }}
                </p>

                <!-- Role & Category -->
                <p
                    v-if="showRole || showCategory || $slots.meta"
                    class="text-muted small mb-0"
                >

                    <span v-if="showRole && user.role">
                        {{ user.role.name ?? user.role }}
                    </span>

                    <span v-if="showRole && showCategory && user.category">
                        •
                    </span>

                    <span v-if="showCategory && user.category">
                        {{ user.category }}
                    </span>

                    <template v-if="$slots.meta">
                        <span v-if="showRole || showCategory"> • </span>
                        <slot name="meta"></slot>
                    </template>

                </p>

            </div>

            <!-- Actions -->
            <UserActions
                v-if="showActions"
                :user="user"
                @action="handleUserAction"
            />

             <!-- deactivation modal -->
            <DeactivateUserModal 
                ref="deactivateModal" 
                :user="user" 
                :reasons="deactivationReasons"            
                :roles="userRoles" 
                :admin="currentAdmin" 
                @deactivated="onUserDeactivated"
                @close="() => {}" 
                @toast="(t, m) => showToast('success', t, m)"
                @error="(t, m) => showError(t, m)" 
            />

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
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

// API
import UsersAPI from '@/api/users'

//components
import DeactivateUserModal from '../../pages/SystemUsers/DeactivateUserModal.vue'
import ImageToast from '@/components/ImageToast.vue'


const router = useRouter()
import UserActions from './UserActions.vue'
const userRoles = ref([])



const deactivationReasons = ref([])
const deactivateModal = ref(null)
import successImage from '../../assets/images/icons/check.png'
import errorImage from '../../assets/images/icons/error.png'

// Toast
const toastStatus = ref(null)
const toastTitle = ref('')
const toastMessage = ref('')
const toastImage = ref(null)



const props = defineProps({

    /**
     * User object
     */
    user: {
        type: Object,
        required: true
    },

    /**
     * Display avatar
     */
    showAvatar: {
        type: Boolean,
        default: true
    },

    /**
     * sm | md | lg
     */
    avatarSize: {
        type: String,
        default: 'avatar-sm'
    },

    /**
     * Display email
     */
    showEmail: {
        type: Boolean,
        default: true
    },

    /**
     * Display user category
     */
    showCategory: {
        type: Boolean,
        default: true
    },

    /**
     * Display online status
     */
    showStatus: {
        type: Boolean,
        default: true
    },

    /**
     * Make the component clickable
     */
    clickable: {
        type: Boolean,
        default: false
    },

    /**
     * Base profile route
     * Example:
     * /users
     * becomes
     * /users/15
     */
    profileRoute: {
        type: String,
        default: '/users'
    },

    /**
     * Show dropdown actions
     */
    showActions: {
        type: Boolean,
        default: true
    },

    /**
     * Dropdown actions
     */
    actions: {
        type: Array,
        default: () => []
    },

        /**
     * Display user role
     */
    showRole: {
        type: Boolean,
        default: true
    },

    

})

defineEmits(['action'])

const initials = computed(() => {

    return props.user.full_name
        ?.split(' ')
        .map(name => name[0])
        .slice(0,2)
        .join('')
        .toUpperCase()

})

// "Online" = last_seen_at within the last 3 minutes
const isOnline = computed(() => {
    if (!props.user?.is_active) return false
    if (!props.user?.last_seen_at) return false
    const seen = new Date(props.user.last_seen_at).getTime()
    return (Date.now() - seen) < 3 * 60 * 1000
})

const role = computed(() => {
    return (
        props.user.role?.display_name ??
        props.user.role?.name ??
        props.user.role ??
        ''
    )
})

//view profile

function viewProfile() {
    //alert('profile licked')

    if (!props.clickable) return

    router.push(`${props.profileRoute}/${props.user.id}`)

}

//resend OTP
function openResendOtp(user){
    alert('resend OTP clicked')
    resendOtp(user)
}

async function resendOtp(user) {
    showToast('loading', 'Resending OTP', `A new OTP is being resent to ${user.email}.`)

    try {
        await UsersAPI.resendOtp(user.id, 'email')
        showToast('success', 'OTP Resent', `A new OTP was sent to ${user.email}.`)
    } catch (error) {
        showError('Resend Failed', error.response?.data?.message || 'Could not resend OTP.')
    }
}

//handling user actions
function handleUserAction({ action, user }) {

    switch (action.handler) {

        case 'openDeactivate':
            openDeactivate(user)
            break

        case 'openEdit':
            openEdit(user)
            break
        
         case 'profile':
            viewProfile(user)
            break

         case 'resendOtp':
            openResendOtp(user)
            break

        default:
            router.push(action.route.replace(':id', user.id))
    }
}

async function getDeactivationReasons() {
    try {
        const { data } = await UsersAPI.deactivationReasons()
        deactivationReasons.value = data.data || []
    } catch (e) {
        // non-blocking
    }
}

async function getRoles() {
    try {
        const { data } = await UsersAPI.roles(true)
        userRoles.value = data.data || []
    } catch (e) {
        // non-blocking
    }
}

async function getCurrentAdmin() {
    try {
        const { data } = await AuthAPI.me()
        currentAdmin.value = data.data || data.user || null
    } catch (e) {
        // non-blocking
    }
}

// ── Actions ───────────────────────────────────────────────────────────
function openDeactivate() {

    deactivateModal.value?.open()
}

function onUserDeactivated(updatedUser) {
    user.value = { ...user.value, ...updatedUser }
    // Sessions are revoked server-side on deactivation; reflect that here
    sessions.value = []
}

// ── Toast ─────────────────────────────────────────────────────────────
function showToast(status, title, message) {
    toastStatus.value = status
    toastTitle.value = title
    toastMessage.value = message
    toastImage.value = status === 'success' ? successImage : null
}
function showError(title, message) {
    toastStatus.value = 'error'
    toastTitle.value = title
    toastMessage.value = message
    toastImage.value = errorImage
}

onMounted(async()=>{
    await Promise.all([getRoles(), getCurrentAdmin(), getDeactivationReasons()])

})


</script>