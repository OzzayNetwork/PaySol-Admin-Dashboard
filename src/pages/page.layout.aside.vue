<template>
    <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        :id="id"
        style="width:500px;"
    >
        <!-- Header -->
        <div class="offcanvas-header border-bottom px-4 py-3">

            <div class="d-flex align-items-center gap-3">

                <div
                    class="avatar-sm  rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style="width:48px;height:48px;"
                >
                    <i
                        :class="icon"
                        class="fs-3 text-dark"
                    ></i>
                </div>

                <div>

                    <h5 class="mb-0 fw-bold">
                        {{ title }}
                    </h5>

                    <small class="text-muted ">
                        {{ subtitle }}
                    </small>

                </div>

            </div>

            <button
                type="button"
                class="btn p-0 border-0"
                data-bs-dismiss="offcanvas"
            >
                <i class="bx bx-x fs-2"></i>
            </button>

        </div>

        <!-- Body -->
        <div class="offcanvas-body p-4">

            <slot />

        </div>

        <!-- Footer -->
        <div class="offcanvas-footer border-top px-4 py-3">

            <slot name="footer">

                <div class="d-flex justify-content-end gap-2">

                    <button
                        class="btn btn-light"
                        data-bs-dismiss="offcanvas"
                    >
                        Cancel
                    </button>

                    <button
                        class="btn btn-primary"
                        @click="save"
                    >
                        Save Changes
                    </button>

                </div>

            </slot>

        </div>

    </div>
</template>

<script setup>
const props = defineProps({

    id: {
        type: String,
        required: true
    },

    title: {
        type: String,
        default: 'Sidebar'
    },

    subtitle: {
        type: String,
        default: ''
    },

    icon: {
        type: String,
        default: 'mdi mdi-cog-outline'
    }

})

const emit = defineEmits([
    'save',
    'cancel'
])

function save() {
    emit('save')
}

function cancel() {
    emit('cancel')
}
</script>