<template>
  <div 
    class="skeleton-loader" 
    :class="[`skeleton-${type}`, { 'skeleton-rounded': rounded }]"
    :style="{
      width: width,
      height: height,
      'border-radius': customRadius,
      'margin-bottom': marginBottom,
      'margin-top': marginTop
    }"
    aria-hidden="true"
  >
    <div 
      v-if="type === 'text' && lines > 1" 
      class="skeleton-text-lines"
    >
      <div 
        v-for="n in lines" 
        :key="n"
        class="skeleton-text-line"
        :style="{
          width: getLineWidth(n),
          height: textLineHeight,
          'margin-bottom': textLineSpacing
        }"
      ></div>
    </div>
    
    <div 
      v-if="type === 'circle'" 
      class="skeleton-circle"
    ></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  // Size props
  width: {
    type: [String, Number],
    default: '100%'
  },
  height: {
    type: [String, Number],
    default: '20px'
  },
  
  // Type variants
  type: {
    type: String,
    default: 'rectangle', // 'rectangle', 'circle', 'text', 'avatar'
    validator: (value) => ['rectangle', 'circle', 'text', 'avatar'].includes(value)
  },
  
  // Text specific
  lines: {
    type: Number,
    default: 1
  },
  textLineHeight: {
    type: String,
    default: '12px'
  },
  textLineSpacing: {
    type: String,
    default: '8px'
  },
  lastLineWidth: {
    type: String,
    default: '60%'
  },
  
  // Style props
  rounded: {
    type: Boolean,
    default: false
  },
  customRadius: {
    type: String,
    default: null
  },
  marginBottom: {
    type: String,
    default: '0'
  },
  marginTop: {
    type: String,
    default: '0'
  }
})

// Format width and height props
const formattedWidth = computed(() => {
  if (typeof props.width === 'number') {
    return `${props.width}px`
  }
  return props.width
})

const formattedHeight = computed(() => {
  if (typeof props.height === 'number') {
    return `${props.height}px`
  }
  return props.height
})

// Calculate line widths for text skeleton
const getLineWidth = (lineNumber) => {
  if (lineNumber === props.lines && props.lastLineWidth) {
    return props.lastLineWidth
  }
  return '100%'
}
</script>

<style scoped>
.skeleton-loader {
  position: relative;
  overflow: hidden;
  background-color: var(--skeleton-bg, #e0e0e0);
}

.skeleton-loader::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 1.5s infinite;
}

/* .skeleton-rounded {
  border-radius: 4px;
} */

.skeleton-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.skeleton-text-lines {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.skeleton-text-line {
  background-color: var(--skeleton-bg, #e0e0e0);
 
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>