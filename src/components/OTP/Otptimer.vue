<template>
    <div class="d-flex align-items-center gap-1 small"
        :class="expired ? 'text-danger' : 'text-muted'">
        <i class="mdi" :class="expired ? 'mdi-clock-alert-outline' : 'mdi-clock-outline'"></i>
        <span v-if="!expired">
            Code expires in <strong>{{ display }}</strong>
        </span>
        <span v-else>
            Code expired — please resend
        </span>
    </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
    // How long the code is valid for, in seconds (default 15 minutes)
    seconds: { type: Number, default: 900 },
    // Flip this to restart the timer (e.g. increment on each (re)send)
    resetKey: { type: [Number, String], default: 0 },
    // Auto-start on mount
    autoStart: { type: Boolean, default: true },
})

const emit = defineEmits(['expired'])

const remaining = ref(props.seconds)
let intervalId = null

const expired = computed(() => remaining.value <= 0)

// mm:ss format
const display = computed(() => {
    const m = Math.floor(remaining.value / 60)
    const s = remaining.value % 60
    return `${m}:${String(s).padStart(2, '0')}`
})

function start() {
    stop()
    remaining.value = props.seconds
    intervalId = setInterval(() => {
        if (remaining.value > 0) {
            remaining.value--
            if (remaining.value === 0) {
                stop()
                emit('expired')
            }
        }
    }, 1000)
}

function stop() {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
}

// Restart whenever resetKey changes (e.g. after a resend)
watch(() => props.resetKey, () => start())

if (props.autoStart) start()

onBeforeUnmount(stop)

// Expose start/stop so a parent can control it via ref if needed
defineExpose({ start, stop })
</script>
