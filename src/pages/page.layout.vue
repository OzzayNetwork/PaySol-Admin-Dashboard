<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Your Media Gallery</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item">
                                <router-link to="/users/list">Media Gallery</router-link>
                            </li>
                            <li class="breadcrumb-item active">Media Library</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <!-- 🔄 Loader -->
        <div v-if="isLoading">
            <LoaderVue />
        </div>
         <div v-else class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-0">Categories</h4>  
                        <div class="row">

                        </div>      

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 🔧 Core Vue imports
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

import LoaderVue from '@/layouts/Loader.vue'
const isLoading = ref(true)

// 🕓 Simulate page loading
onMounted(() => {
  document.title = 'Upload to Gallery - CSPL CRM'
  setTimeout(() => (isLoading.value = false), 1000)

  
})

</script>

<style lang="scss" scoped></style>