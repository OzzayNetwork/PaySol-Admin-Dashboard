<template>
    <div class="activity-card">
        <div class="timeline">
            <div v-for="(log, index) in displayedLogs" :key="log.id" class="timeline-item">
                <div class="timeline-marker" :class="getMarkerClass(log.type, index)">
                    <span v-if="index === 0" class="marker-dot"></span>
                </div>
                <div class="timeline-content">
                    <div class="log-message text-capitalize">
                        <span v-html="formatMessage(log.message, log.fields)"></span>
                    </div>
                    <div class="log-meta">
                        {{ log.date }} • {{ log.time }}
                        <span v-if="log.user"> • {{ log.user }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="hasMore" class="load-more-container d-none">
            <button @click="loadMore" class="btn btn btn-link waves-effect"> 
                Load more
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed,onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
    logs: {
        type: Array,
        default: () => [],
        required: true
    }
})

const itemsToShow = ref()
const itemsPerPage =null

// Sort logs by most recent first (assuming higher id = more recent)
const sortedLogs = computed(() => {
    return [...props.logs].reverse()
})

const displayedLogs = computed(() => {
    return sortedLogs.value.slice(0, itemsToShow.value)
})

const hasMore = computed(() => {
    return itemsToShow.value < sortedLogs.value.length
})

const loadMore = () => {
    itemsToShow.value += itemsPerPage
}

const formatMessage = (message, fields) => {
    if (!fields || fields.length === 0) {
        return message
    }
    
    let formattedMessage = message
    fields.forEach(field => {
        const regex = new RegExp(field, 'gi')
        formattedMessage = formattedMessage.replace(regex, `<span class="highlight-field">${field}</span>`)
    })
    
    return formattedMessage
}

const getMarkerClass = (type, index) => {
    if (index === 0) return 'marker-active'
    return 'marker-inactive'
}
</script>

<style scoped>
.activity-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
}

.timeline {
    position: relative;
}

.timeline-item {
    display: flex;
    gap: 16px;
    position: relative;
    padding-bottom: 24px;
}

.timeline-item:last-child {
    padding-bottom: 0;
}

.timeline-item:last-child .timeline-marker::after {
    display: none;
}

.timeline-marker {
    position: relative;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.timeline-marker::before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #d1d5db;
    background: white;
    position: relative;
    z-index: 2;
}

.timeline-marker.marker-active::before {
    border-color: #3b82f6;
    border-width: 2px;
}

.timeline-marker .marker-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #3b82f6;
    z-index: 3;
}

.timeline-marker::after {
    content: '';
    position: absolute;
    left: 9px;
    top: 20px;
    width: 2px;
    height: calc(100% + 24px);
    background: #e5e7eb;
    z-index: 1;
}

.timeline-content {
    flex: 1;
    padding-top: 1px;
}

.log-message {
    color: #1f2937;
    line-height: 1.5;
    margin-bottom: 4px;
}

.log-meta {
    color: #9ca3af;
    font-size: 12px;
    line-height: 1.4;
}

.load-more-container {
    margin-top: 24px;
    text-align: center;
    padding-top: 24px;
    border-top: 1px solid #e5e7eb;
}

.btn-load-more {
    background: white;
    border: 1px solid #d1d5db;
    color: #374151;
    padding: 8px 20px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-load-more:hover {
    background: #f9fafb;
    border-color: #9ca3af;
}

.btn-load-more:active {
    transform: scale(0.98);
}

.highlight-field {
    background: #dbeafe;
    color: #1e40af;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
}
</style>