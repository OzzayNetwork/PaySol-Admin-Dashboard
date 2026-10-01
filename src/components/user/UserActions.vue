<template>

    <div class="dropdown">

        <a
            href="#"
            class="text-muted fs-4 p-2 waves-effect "
            data-bs-toggle="dropdown"
            @click.prevent
        >
            <i class="mdi mdi-dots-horizontal"></i>
        </a>

        <div class="dropdown-menu dropdown-menu-end">

            <h6 class="dropdown-header d-none">
                Account Menu
            </h6>

            <button
                v-for="action in actions.filter(a => !a.visible || a.visible(user))"
                :key="action.key"
                class="dropdown-item dropdown-item d-flex py-2 align-items-center"
                :class="action.class"
                @click="emitAction(action)"
            >

                <i
                    class="me-2  me-2 fs-4 "
                    :class="action.icon"
                ></i>

                {{ action.label }}

            </button>

        </div>

    </div>

   

</template>

<script setup>

// components
import DeactivateUserModal from '../../pages/SystemUsers/DeactivateUserModal.vue'


const props = defineProps({

    user: {
        type: Object,
        required: true
    },

    actions: {
        type: Array,
        default: () => ([
            {
                key: 'profile',
                label: 'View Details',
                icon: 'bx bxs-info-circle',
                route: '/users/:id'
            },
            {
                key: 'preview',
                label: 'Account Preview',
                icon: 'bx bxs-user-pin',
                route: '/users/:id/preview'
            },
            {
                key: 'edit',
                label: 'Edit User Profile',
                icon: 'bx bxs-pencil',
                route: '/users/:id/edit'
            },
             {
                key: 'resendOtp',
                label: 'Resend OTP',
                icon: 'mdi mdi-message-reply-text',
                route: '/users/:id/resend-otp',
                handler: 'resendOtp',
                 visible: (user) => !user.verification?.fully_verified
            },
            {
                key: 'deactivate',
                label: 'Deactivate Account',
                icon: 'bx bxs-x-circle',
                class: 'text-danger',
                //route: '/users/:id/deactivate',
                handler: 'openDeactivate'
            }
           
        ])   
     }

})

const emit = defineEmits(['action'])

function emitAction(action) {
    emit('action', {
        action,
        user: props.user
    })

}

</script>