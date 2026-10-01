<template>
    <div class="fb-wrapper" ref="wrapper">

        <!-- Trigger -->
        <button class="trigger btn-sm d-lg-flex d-flex align-items-center btn btn-light waves-effect gap-2" @click="toggleDropdown">
            <span class="fw-bold text-black">{{ label }}</span>
            <i  class="mdi mdi-chevron-down fs-4"></i>
        </button>

        <!-- Dropdown -->
        <div v-if="showDropdown" class="dropdown">

            <!-- Presets -->
            <div v-if="!showCalendar" class="fw-semibold">
                <div v-for="p in presets" :key="p.label" class="preset" @click="selectPreset(p)">
                    <span>{{ p.label }}</span>
                    <span class="radio" :class="{ active: isActive(p) }"></span>
                </div>

                <div class="preset custom" @click="openCustom">
                    Custom →
                </div>
            </div>

            <!-- Calendar -->
            <div v-else class="calendar-panel">
                <VueDatePicker 
                    v-model="tempDate" 
                    range 
                    inline 
                    :enable-time-picker="enableTime" 
                    :auto-apply="true"
                    :range-hover="true" 
                    @update:model-value="onInternalUpdate"
                    
                />

                <div class="actions d-flex flex-column  justify-end px-3 pb-3">
                    <div class="range-preview w-100 text-right mb-3 small text-muted fw-normal">
                        {{ previewLabel }}
                    </div>

                    <div class="buttons w-100 text-right display-flex justify-content-end gap-3">
                        <button @click="showCalendar = false" class="btn btn-link text-black waves-effect fw-normal px-3">Back</button>
                        <button class="apply btn btn-primary fw-normal px-4" @click="applyCustom">Apply</button>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { subDays } from 'date-fns';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
  dateFrom: Date,
  dateTo: Date,
  customRangeTitle: {
    type: String,
    default: "Custom"
  }
})
//alert("dateFrom: " + props.dateFrom + ", dateTo: " + props.dateTo)

const emit = defineEmits(["update:dateFrom", "update:dateTo"])

function onDateFromChange(val) {
  emit("update:dateFrom", val)
}

function onDateToChange(val) {
  emit("update:dateTo", val)
}

// 🔥 CONFIG (clock optional)
const enableTime = ref(false);

const wrapper = ref(null);
const showDropdown = ref(false);
const showCalendar = ref(false);

const date = ref([props.dateFrom||subDays(new Date(), 29), props.dateTo||new Date()]);
const tempDate = ref(null);
const selectedPreset = ref(props.customRangeTitle);
const dateRaw = ref(date.value.map(d => d.toISOString()));

const presets = [
    { label: "Today", value: [new Date(), new Date()] },
    { label: "Last 7 days", value: [subDays(new Date(), 6), new Date()] },
    { label: "Last 14 days", value: [subDays(new Date(), 13), new Date()] },
    { label: "Last 28 days", value: [subDays(new Date(), 27), new Date()] },
    { label: "Last 30 days", value: [subDays(new Date(), 29), new Date()] },
    { label: "Last 60 days", value: [subDays(new Date(), 59), new Date()] },
    { label: "Last 90 days", value: [subDays(new Date(), 89), new Date()] }
];

const previewLabel = computed(() => {
    if (!tempDate.value || tempDate.value.length === 0) {
        return "Select date range";
    }

    const [start, end] = tempDate.value;
    return formatRange(start, end);
});

// Toggle
function toggleDropdown() {
    showDropdown.value = !showDropdown.value;
    showCalendar.value = false;
}

// Preset select
function selectPreset(p) {
    date.value = p.value;
    selectedPreset.value = p.label;

    // Emit updated dates
    emit("update:dateFrom", date.value[0]);
    emit("update:dateTo", date.value[1]);

    showDropdown.value = false;
    console.log("Selected date range:", date.value);
}

// Open custom (FIXED)
function openCustom() {
    tempDate.value = [...date.value];
    selectedPreset.value = "Custom";
    showCalendar.value = true;
}

// Apply custom (FIXED)
// Apply custom
function applyCustom() {
    if (!tempDate.value || tempDate.value.length < 2) return;

    date.value = tempDate.value;

    // Emit updated dates
    emit("update:dateFrom", date.value[0]);
    emit("update:dateTo", date.value[1]);

    showDropdown.value = false;
    showCalendar.value = false;
}

// Active state
function isActive(p) {
    return p.label === selectedPreset.value;
}

// Label logic (FIXED for "Custom")
const label = computed(() => {
    if (!date.value) return "Select date";

    const [start, end] = date.value;

    const matchedPreset = presets.find(p =>
        p.value[0].toDateString() === start.toDateString() &&
        p.value[1].toDateString() === end.toDateString()
    );

    const rangeText = formatRange(start, end);

    if (matchedPreset) {
        return `${matchedPreset.label}: ${rangeText}`;
    }

    return `Custom: ${rangeText}`;
});

// ✅ Click outside (FIXED properly)
function handleClickOutside(e) {
    if (!wrapper.value) return;

    if (!wrapper.value.contains(e.target)) {
        showDropdown.value = false;
        showCalendar.value = false;
    }
}

function formatRange(start, end) {
    const currentYear = new Date().getFullYear();

    const format = (date, includeYear = false) => {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            ...(includeYear && { year: "numeric" })
        });
    };

    if (!start) return "Select date range";

    // Only start selected
    if (!end) {
        return `${format(start)} – …`;
    }

    const sameYear = start.getFullYear() === end.getFullYear();
    const isCurrentYear = start.getFullYear() === currentYear;

    // Same year
    if (sameYear) {
        if (isCurrentYear) {
            return `${format(start)} – ${format(end)}`;
        } else {
            return `${format(start)} – ${format(end, true)}`;
        }
    }

    // Different years
    return `${format(start, true)} – ${format(end, true)}`;
}



onMounted(() => {
    document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("mousedown", handleClickOutside);
});
</script>
<style scoped>
.fb-wrapper {
    position: relative;
    width: auto;
}

/* ❌ you had invalid CSS here */
.dp__action_buttons {
    display: none;
}

.dp__menu {
    border: none;
    font-size: 45px;
}

.trigger {    
    cursor: pointer;   
}

.dropdown {
    position: absolute;
    top: 50px;
    width: 300px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 10px;
    z-index: 10;
}

.preset {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    cursor: pointer;
}

.preset:hover {
    background: #f0f2f5;
}

.radio {
    width: 16px;
    height: 16px;
    border: 2px solid #ccc;
    border-radius: 50%;
}

.radio.active {
    border-color: #1877f2;
    background: #1877f2;
}

.custom {
    border-top: 1px solid #eee;
    margin-top: 8px;
}

.calendar-panel {
    padding-top: 0px;
}

.actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.apply {
    background: #1877f2;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
}

.actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

.range-preview {
    font-size: 13px;
    color: #65676b;
}

.buttons {
    display: flex;
    gap: 8px;
}

.range-preview {
    font-weight: 500;
    color: #050505;
}
</style>
