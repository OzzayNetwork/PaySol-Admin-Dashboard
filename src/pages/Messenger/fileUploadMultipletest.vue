<template>
  <div class="file-upload-box">
    <!-- Attach Button -->
    <label class="btn btn-outline-primary" for="fileInput">
      <i class="bx bx-paperclip"></i> Attach File
      <input
        id="fileInput"
        type="file"
        hidden
        multiple
        @change="handleFileChange"
      />
    </label>

    <!-- Attached Files -->
    <ul class="list-group mt-3">
      <li
        v-for="(file, index) in uploadedFiles"
        :key="fileKey(file)"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div class="text-truncate" style="max-width: 80%;">
          {{ file.name }} ({{ formatSize(file.size) }})
        </div>
        <button class="btn btn-sm btn-outline-danger" @click="removeFile(index)">
          <i class="bx bx-x"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const uploadedFiles = ref([])

const handleFileChange = (e) => {
  const newFiles = Array.from(e.target.files)

  // Avoid duplicates by checking name and size
  newFiles.forEach(file => {
    const exists = uploadedFiles.value.some(f => f.name === file.name && f.size === file.size)
    if (!exists) {
      uploadedFiles.value.push(file)
    }
  })

  // Reset input so the same file can be added again later
  e.target.value = null
}

const removeFile = (index) => {
  uploadedFiles.value.splice(index, 1)
}

// Helper to format file size
const formatSize = (bytes) => {
  const kb = bytes / 1024
  return kb < 1024 ? `${kb.toFixed(1)} KB` : `${(kb / 1024).toFixed(1)} MB`
}

// Unique key per file for rendering
const fileKey = (file) => `${file.name}-${file.size}-${file.lastModified}`
</script>

<style scoped>
.file-upload-box {
  max-width: 500px;
}
</style>
