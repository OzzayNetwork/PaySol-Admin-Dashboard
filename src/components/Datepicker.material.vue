<template>

  <div 
    class="d-flex"
     data-bs-toggle="tooltip"  
     data-bs-placement="top" 
     title="Filter content by date range"
    >
    <div class="dp__calenderlabel text-nowrap fw-bold ">
      <span class="text-truncate" style="max-width: 80px;">{{ presetDateTitle }}</span>
    </div>
  
    <div class="datepicker-container">
      <VueDatePicker
        v-model="date"
        range
        multi-calendars
        :enable-time-picker="true"
        placeholder="Select date range"
        class="custom-datepicker"
        :preset-dates="presetDates"
         :formats="{ input: 'dd/MM/yyyy, HH:mm' }"  
        @update:model-value="handleDateChange"
      >
        <template #preset-date-range-button="{ label, value, presetDate }">
          
          <span 
            :class="['preset-button', { 'preset-active': isPresetActive(value) }]"
            @click="() => selectPreset(value)"
          >
            {{ label }}
          </span>
        </template>
      </VueDatePicker>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(['date-change']) // ✅ add this

const date = ref(null)
const activePreset = ref(null)
const presetDateTitle=ref(null)

const presetDates = ref([
  { 
    label: 'Today', 
    value: [new Date(), new Date()] 
  },
  { 
    label: 'Yesterday', 
    value: (() => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      return [yesterday, yesterday]
    })()
  },

  {
  label: 'This Week (Mon–Today)',
  value: (() => {
    const today = new Date()

    // Get the current day of the week (0=Sun, 1=Mon, ...)
    const day = today.getDay()

    // Calculate Monday
    const monday = new Date(today)
    monday.setDate(today.getDate() - ((day + 6) % 7))

    return [monday, today]
  })()
},

{
  label: 'Last Week (Mon–Sun)',
  value: (() => {
    const today = new Date()

    // Get today's weekday (0 = Sun, 1 = Mon, ...)
    const day = today.getDay()

    // Find this week's Monday
    const thisMonday = new Date(today)
    thisMonday.setDate(today.getDate() - ((day + 6) % 7))

    // Last week's Monday = this Monday - 7 days
    const lastWeekMonday = new Date(thisMonday)
    lastWeekMonday.setDate(thisMonday.getDate() - 7)

    // Last week's Sunday = lastWeekMonday + 6 days
    const lastWeekSunday = new Date(lastWeekMonday)
    lastWeekSunday.setDate(lastWeekMonday.getDate() + 6)

    return [lastWeekMonday, lastWeekSunday]
  })()
}
,
  { 
    label: 'Last 7 Days', 
    value: (() => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 6)
      return [start, end]
    })()
  },
  { 
    label: 'Last 28 Days', 
    value: (() => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 27)
      return [start, end]
    })()
  },
  { 
    label: 'Last 30 Days', 
    value: (() => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 29)
      return [start, end]
    })()
  },
  { 
    label: 'This Month', 
    value: (() => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth(), 1)
      return [start, now]
    })()
  },
  { 
    label: 'Last Month', 
    value: (() => {
      const now = new Date()
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const end = new Date(now.getFullYear(), now.getMonth(), 0)
      return [start, end]
    })()
  },

  { 
    label: 'Last 90 Days', 
    value: (() => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 89)
      return [start, end]
    })()
  },

  {
  label: 'Quarter to Date',
  value: (() => {
    const today = new Date();
    const start = new Date(today);

    const month = today.getMonth(); // 0 = Jan, 1 = Feb, ...
    const quarterStartMonth = month - (month % 3); // get first month of current quarter
    start.setMonth(quarterStartMonth, 1); // set to first day of quarter
    start.setHours(0, 0, 0, 0); // start of day

    const end = new Date();
    end.setHours(23, 59, 59, 999); // end of today

    return [start, end];
  })()
},

{
  label: 'This Year (Jan–Today)',
  value: (() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 1); // Jan 1 of current year
    start.setHours(0, 0, 0, 0); // start of the day

    const end = new Date();
    end.setHours(23, 59, 59, 999); // end of today

    return [start, end];
  })()
},
{
  label: 'Last Calendar Year',
  value: (() => {
    const today = new Date();
    const lastYear = today.getFullYear() - 1;

    const start = new Date(lastYear, 0, 1); // Jan 1 of last year
    start.setHours(0, 0, 0, 0);

    const end = new Date(lastYear, 11, 31); // Dec 31 of last year
    end.setHours(23, 59, 59, 999);

    return [start, end];
  })()
},
{
  label: 'Fiscal Year to Date',
  value: (() => {
    const today = new Date();
    const year = today.getFullYear();

    // If today is before July, the FY started last year
    const startYear = today.getMonth() < 6 ? year - 1 : year;
    const start = new Date(startYear, 6, 1); // July 1 of FY start
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999); // today

    return [start, end];
  })()
},
{
  label: 'Last Fiscal Year',
  value: (() => {
    const today = new Date();
    const year = today.getFullYear();

    // Determine the last FY start year
    const lastFYStartYear = today.getMonth() < 6 ? year - 2 : year - 1;

    const start = new Date(lastFYStartYear, 6, 1); // July 1 of last FY
    start.setHours(0, 0, 0, 0);

    const end = new Date(lastFYStartYear + 1, 5, 30); // June 30 of last FY
    end.setHours(23, 59, 59, 999);

    return [start, end];
  })()
}





])

const normalizeDateString = (dateValue) => {
  if (!dateValue) return null
  const d = new Date(dateValue)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

const isPresetActive = (presetValue) => {
  if (!date.value || !Array.isArray(date.value) || date.value.length !== 2) return false
  if (!presetValue || !Array.isArray(presetValue) || presetValue.length !== 2) return false
  
  const currentStart = normalizeDateString(date.value[0])
  const currentEnd = normalizeDateString(date.value[1])
  const presetStart = normalizeDateString(presetValue[0])
  const presetEnd = normalizeDateString(presetValue[1])
  
  return currentStart === presetStart && currentEnd === presetEnd
}

const selectPreset = (presetValue) => {
  date.value = presetValue
  activePreset.value = presetValue
}

const handleDateChange = (newDate) => {
  if (newDate && Array.isArray(newDate) && newDate.length === 2) {
    const start = new Date(newDate[0]);
    start.setHours(0, 0, 0, 0); // start of day

    const end = new Date(newDate[1]);
    end.setHours(23, 59, 59, 999); // end of day

    date.value = [start, end]; // update v-model with normalized times

    // now activePreset or any API call will use these times
    const matchingPreset = presetDates.value.find(preset => isPresetActive(preset.value))
    activePreset.value = matchingPreset ? matchingPreset.value : null
    //alert(`Selected range: ${start.toLocaleString()} - ${end.toLocaleString()}`)
  }
}

const emitRangeToParent = () => {
  if (!date.value || !Array.isArray(date.value) || date.value.length !== 2) {
    emit('date-change', { dateFrom: null, dateTo: null, label: 'Custom Date' })
    return
  }

  emit('date-change', {
    dateFrom: new Date(date.value[0]).toISOString(),   // already normalized in handleDateChange
    dateTo: new Date(date.value[1]).toISOString(),
    label: presetDateTitle.value || 'Custom Date',
  })
}

watch(date, (newVal) => {
  if (!newVal || newVal.length !== 2) {
    presetDateTitle.value = 'Custom Date'
     emitRangeToParent() 
    return
  }

  const matchingPreset = presetDates.value.find(preset => isPresetActive(preset.value))
  presetDateTitle.value = matchingPreset ? matchingPreset.label : 'Custom Date'

  emitRangeToParent()
}, { immediate: true })

</script>

<style scoped>
.datepicker-container {
  width: 100%;
}

/* Input styling */
.custom-datepicker .dp__input {
  border: 1px solid bllack
  ;
  border-radius: 0px;
  padding: 7px 33px;
  padding-left: 33px;
  font-size: 0.875rem;
  background-color: #eff2f7;
  color: black;
  font-weight: 500;
  font-size:12px
}

.custom-datepicker .dp__input:focus {
  border-color: #3b82f6;
  outline: none;
  background-color: #dbeafe;
}

.custom-datepicker .dp__input::placeholder {
  color: #60a5fa;
}

/* Calendar popup */
.dp__menu {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

/* Preset sidebar */
.dp__preset_ranges {
  border-right: 1px solid #e5e7eb;
  padding-right: 12px;
  margin-right: 12px;
  min-width: 120px;
}

.preset-button {
  display: block;
  width: 100%;
  padding: 8px 12px;
  margin-bottom: 4px;
  color: #3b82f6;
  font-size: 0.875rem;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  text-align: left;
}

.preset-button:hover {
  background-color: #eff6ff;
}

.preset-button.preset-active {
  background-color: #3b82f6;
  color: white;
  font-weight: 500;
}

.preset-button.preset-active:hover {
  background-color: #2563eb;
}

/* Calendar header */
.dp__month_year_select {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
}

/* Day names */
.dp__calendar_header_item {
  font-size: 0.75rem;
  font-weight: 500;
  color: #9ca3af;
  text-transform: capitalize;
}

/* Calendar cells */
.dp__calendar_item {
  font-size: 0.875rem;
  color: #374151;
}

/* Selected range */
.dp__range_start,
.dp__range_end {
  background-color: #3b82f6 !important;
  color: white !important;
  border-radius: 50%;
}

.dp__range_between {
  background-color: #dbeafe !important;
  color: #374151 !important;
}

/* Hover effects */
.dp__cell_inner:hover {
  background-color: #f3f4f6;
  border-radius: 50%;
}

/* Navigation arrows */
.dp__arrow_top,
.dp__arrow_bottom {
  color: #6b7280;
}

.dp__arrow_top:hover,
.dp__arrow_bottom:hover {
  background-color: #f3f4f6;
  border-radius: 4px;
}

.dp__arrow_top {
  top: 0px;
}

/* Multi-calendar spacing */
.dp__instance_calendar {
  padding: 0 8px;
}

/* Outside month dates */
.dp__cell_offset {
  color: #d1d5db;
}

/* Active/Today indicator */
.dp__today {
  border: 1px solid #3b82f6;
}

/* Action buttons */
.dp__action_button {
  font-size: 0.875rem;
  padding: 6px 12px;
  border-radius: 6px;
}

.dp__action_select {
  background-color: #3b82f6;
  color: white;
}

.dp__action_select:hover {
  background-color: #2563eb;
}

.dp__action_cancel:hover {
  background-color: #f3f4f6;
}

.dp__action_buttons {
  padding: 1rem;
  column-gap: 1rem;
}

.dp__action_button {
  font-size: 0.875rem;
  padding: 1rem;
  border-radius: 6px;
}

.dp--preset-dates {
  padding-right: 1.5rem;
  padding-left: 1rem;
}

/* Remove time picker completely */
.dp__time_input,
.dp__time_display,
.dp__time_col,
.dp__time_col_reg_block,
.dp__time_col_block,
.dp__time_picker_overlay {
  /* display: none !important; */
}

/* Ensure calendar stays visible */
.dp__calendar {
  display: block !important;
}

.dp__calenderlabel{
  padding: 7px;
    border: 1px solid #dddddd;
    color: grey;
    background: #dddddd;
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 12px;
}
/* 
.dp__main {
  display: flex !important;
} */
</style>