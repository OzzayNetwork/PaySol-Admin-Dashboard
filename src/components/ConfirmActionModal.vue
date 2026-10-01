<template>
    <div
        class="modal fade show"
        
        tabindex="-1"
        style="display:block;background:rgba(0,0,0,.55);"
    >
        <div class="modal-dialog modal-dialog-centered ">
            <div 
                class="modal-content border-0 shadow animate__animated animate__fadeInDown animate__faster"
                
            >

                <!-- Header -->
                <div class="modal-header border-bottom d-flex justify-content-between align-items-center">
                    <h5 class="modal-title fw-bold">
                        {{ title }}
                    </h5>

                    <button
                        type="button"
                        class="btn p-0 border-0"
                        @click="closeModal"
                        :disabled="loading"
                        style="width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.05);display:grid;place-items:center;"
                    >
                        <i v-if="!loading" class="bx bx-x text-dark fs-4"></i>
                    </button>
                </div>

                <!-- Body -->
                <div class="modal-body position-relative">
                    <div
                        v-if="loading"
                        class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75"
                        style="z-index:10"
                    >
                        <div class="text-center">
                            <div class="spinner-border text-primary"></div>
                            <p class="mt-2 mb-0">Updating...</p>
                        </div>
                    </div>

                    <!-- User -->
                    <div class="d-flex align-items-center gap-3 p-3 rounded bg-light mb-4">

                        <div class="avatar-sm">

                            <img
                                v-if="user?.profile_photo_url"
                                :src="user.profile_photo_url"
                                class="rounded-circle avatar-sm"
                            >

                            <div
                                v-else
                                class="avatar-sm rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                            >
                                <span class="fw-bold fs-4">
                                    {{ initials }}
                                </span>
                            </div>

                        </div>

                        <div>

                            <div class="fw-semibold">
                                {{ fullName }}
                            </div>

                            <small class="text-muted">
                                {{ user?.email }}
                            </small>

                        </div>

                    </div>

                    <!-- Alert -->
                    <div class="alert alert-warning d-flex align-items-start mb-0">

                        <i
                            :class="`mdi ${icon} fs-3 me-3`"
                        ></i>

                        <div>

                            <h6 class="fw-bold mb-1">
                                {{ title }}
                            </h6>

                            <p class="mb-0 text-muted">
                                {{ message }}
                            </p>
                            

                        </div>

                    </div>

                </div>

                <!-- Footer -->
                <div class="modal-footer">
                    <button 
                        type="button" 
                        class="btn btn-link waves-effect fw-bold btn-lg text-dark"
                         @click="closeModal"
                          :disabled="loading"
                    >
                         Cancel
                    </button>


                    <button
                        class="btn btn-light d-none"
                        @click="closeModal"
                        :disabled="loading"
                        title="Click to cancel"
                    >
                        Cancel
                    </button>

                    <button
                        :title="btnTitle"
                        :class="`btn btn  fw-semibold btn-lg gap-2 d-flex align-items-center ${confirmClass}`"
                        @click="confirmAction"
                        :disabled="loading"
                    >

                        <span
                            v-if="loading"
                            class="spinner-border spinner-border-sm me-2"
                        ></span>

                        {{ loading ? loadingText : confirmText }}

                    </button>

                </div>

            </div>
        </div>
    </div>
</template>

<script setup>

import { computed } from 'vue'

const props = defineProps({

    user: {
        type: Object,
        required: true
    },
    actionKey: {
        type: String,
        required: true,        
        default: 'ConfirmAction'
    },
    test: {
        type: String,
        required: true,        
        default: 'ConfirmAction'
    },

    title: {
        type: String,
        default: 'Confirm Action'
    },

    message: {
        type: String,
        default: 'Are you sure you wish to continue?'
    },

    confirmText: {
        type: String,
        default: 'Confirm'
    },

    confirmClass: {
        type: String,
        default: 'btn-danger'
    },

    icon: {
        type: String,
        default: 'mdi-alert-circle-outline'
    },

    loading: {
        type: Boolean,
        default: false
    },

    loadingText: {
        type: String,
        default: 'Please wait...'
    },

    btnTitle: {
        type: String,
        default: 'Click to confirm'
    }



})

const emit = defineEmits([
    'cancel',
    'confirm'
])

const fullName = computed(() => {

    if (!props.user) return ''

    return (
        props.user.full_name ||
        props.user.name ||
        `${props.user.first_name ?? ''} ${props.user.last_name ?? ''}`
    ).trim()

})

const initials = computed(() => {

    return fullName.value
        .split(' ')
        .filter(Boolean)
        .slice(0,2)
        .map(word => word[0])
        .join('')
        .toUpperCase()

})

const closeModal = () => {
    emit('cancel', {
        action: props.actionKey,
        user: props.user
    })
}

const confirmAction = () => {
    emit('confirm', {
        action: props.actionKey,
        user: props.user
    })
}

</script>