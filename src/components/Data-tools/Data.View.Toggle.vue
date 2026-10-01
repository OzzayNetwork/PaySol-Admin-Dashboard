<template>
  <ul
    class="nav nav-pills p-1 border-1 rounded mb-0 nav-pills-main"
    role="tablist"
  >
    <!-- Stats View -->
    <li v-if="showStats" class="nav-item">
      <a
        :class="activeView === 'stats' ? 'active' : ''"
        class="nav-link d-flex align-items-center gap-1"
        href="#"
        @click.prevent="selectView('stats')"
      >
        <Icon
          :icon="
            activeView === 'stats'
              ? 'bxs:bar-chart-alt-2'
              : 'bx:bar-chart-alt-2'
          "
          class="fs-3"
        />
        <div><div>Stats View</div></div>
      </a>
    </li>
    <!-- Table View -->
    <li v-if="showTable" class="nav-item">
      <a
        :class="activeView === 'table' ? 'active' : ''"
        class="nav-link d-flex align-items-center gap-1"
        href="#"
        @click.prevent="selectView('table')"
      >
        <Icon
          :icon="
            activeView === 'table'
              ? 'boxicons:list-square-filled'
              : 'boxicons:list-square'
          "
          class="fs-3"
        />
        <div><div>Table View</div></div>
      </a>
    </li>
    <!-- Map View -->
    <li v-if="showMap" class="nav-item">
      <a
        :class="activeView === 'map' ? 'active' : ''"
        class="nav-link d-flex align-items-center gap-1"
        href="#"
        @click.prevent="selectView('map')"
      >
        <Icon
          :icon="activeView === 'map' ? 'bxs:map' : 'bx:map'"
          class="fs-3"
        />
        <div><div>Map View</div></div>
      </a>
    </li>
    <!-- List View -->
    <li v-if="showList" class="nav-item">
      <a
        :class="activeView === 'list' ? 'active' : ''"
        class="nav-link d-flex align-items-center gap-1"
        href="#"
        @click.prevent="selectView('list')"
      >
        <Icon
          :icon="activeView === 'list' ? 'bxs:list-ul' : 'bx:list-ul'"
          class="fs-3"
        />
        <div><div>List View</div></div>
      </a>
    </li>
    <!-- Calendar View -->
    <li v-if="showCalendar" class="nav-item">
      <a
        :class="activeView === 'calendar' ? 'active' : ''"
        class="nav-link d-flex align-items-center gap-1"
        href="#"
        @click.prevent="selectView('calendar')"
      >
        <Icon
          :icon="activeView === 'calendar' ? 'bxs:calendar' : 'bx:calendar'"
          class="fs-3"
        />
        <div><div>Calendar View</div></div>
      </a>
    </li>
    <!-- Timeline View -->
    <li v-if="showTimeline" class="nav-item">
      <a
        :class="activeView === 'timeline' ? 'active' : ''"
        class="nav-link d-flex align-items-center gap-1"
        href="#"
        @click.prevent="selectView('timeline')"
      >
        <Icon
          :icon="activeView === 'timeline' ? 'bxs:time' : 'bx:time'"
          class="fs-3"
        />
        <div><div>Timeline View</div></div>
      </a>
    </li>
    <!-- Grid View -->
    <li v-if="showGrid" class="nav-item">
      <a
        :class="activeView === 'grid' ? 'active' : ''"
        class="nav-link d-flex align-items-center gap-1"
        href="#"
        @click.prevent="selectView('grid')"
      >
        <Icon
          :icon="activeView === 'grid' ? 'bxs:grid-alt' : 'bx:grid-alt'"
          class="fs-3"
        />
        <div><div>Grid View</div></div>
      </a>
    </li>
  </ul>
</template>
<script setup>
import { Icon } from '@iconify/vue'
import {
    ref,
    computed,
    onMounted,
    onBeforeUnmount
} from 'vue'

const props = defineProps({ 
    activeView: { type: String, default: 'stats' }, 
    showStats: { type: Boolean, default: true }, 
    showTable: { type: Boolean, default: true }, 
    showMap: { type: Boolean, default: false }, 
    showList: { type: Boolean, default: false }, 
    showCalendar: { type: Boolean, default: false },
     showTimeline: { type: Boolean, default: false }, 
     showGrid: { type: Boolean, default: false } 
    }) 
    const emit = defineEmits(['update:activeView']) 
    const selectView = (view) => { 
    emit('update:activeView', view) 

    }
</script>
