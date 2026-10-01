<template>
  <div class="d-none"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import ColorThief from 'colorthief'

const props = defineProps({
  image: String,
})

const emit = defineEmits(["color"])

onMounted(() => {
  const img = new Image()
  img.crossOrigin = "anonymous"
  img.src = props.image

  img.onload = () => {
    try {
      const colorThief = new ColorThief()
      const color = colorThief.getColor(img) // → [r,g,b]
      emit("color", `rgb(${color[0]}, ${color[1]}, ${color[2]})`)
    } catch (e) {
      emit("color", null)
    }
  }
})
</script>
