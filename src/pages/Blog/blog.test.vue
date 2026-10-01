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
                    <div class="card-header">
                        <h4 class="card-title">Testing Blogs</h4> 
                    </div>
                    <div class="card-body">
                         
                        <div class="row">
                            <div class="col-12">
                                <Editor 
                                    v-model="form.body" 
                                    placeholder="Write your blog content here..." 
                                />
                                 
                            </div>

                        </div>      

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoaderVue from '@/layouts/Loader.vue'
import Editor from '@/components/Editor.vue'

const isLoading = ref(true)

const form = ref({
  title: '',
  subtitle: '',
  author: '',
  body: '',
  tags: '',
  visibility: 'private',
  publishDate: ''
})


onMounted(() => {
  document.title = 'Create Blog - CSPL CRM'
  setTimeout(() => (isLoading.value = false), 1000)
})
</script>

<style lang="scss" scoped></style>