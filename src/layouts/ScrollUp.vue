<template>
  <transition name="fade">
    <button
      v-if="show"
      class="scroll-to-top"
      @click="scrollToTop"
      title="Scroll Back Up"
    >
      <i class="bx bx-chevron-up"></i>
    </button>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const show = ref(false)
let ticking = false

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY || document.documentElement.scrollTop

      // Show only after some scrolling
      show.value = scrollY > 600

      ticking = false
    })

    ticking = true
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 30px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #0d6efd;
  border: none;
  color: #fff;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(0,0,0,0.2);
  cursor: pointer;
  z-index: 9999;
}

/* Smooth appearance */
.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
