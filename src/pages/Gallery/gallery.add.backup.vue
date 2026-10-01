<template>
  <div class="container-fluid">
    <!-- 🧭 Page Title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 class="mb-sm-0 font-size-18">Upload to Gallery</h4>
          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link to="/gallery/list">Gallery</router-link></li>
              <li class="breadcrumb-item active">Upload to Gallery</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- 🗂️ Modals -->
    <AddAlbumModal />
    <AddCategoryModal />

    <!-- 🔄 Loader -->
    <div v-if="isLoading">
      <LoaderVue />
    </div>

    <!-- 📸 Main Form -->
    <div v-else class="row justify-content-center">
      <SingleToastVue :toastType="toastType" :toastMessage="toastMessage" />

      <div class="col-md-12 col-xl-9 col-lg-12 col-sm-12">
        <div class="card text-dark">
          <div class="card-header d-flex align-items-center justify-content-between">
            <div>
              <h4 class="card-title mb-1">Upload to Gallery</h4>
              <p class="card-title-desc text-muted">
                Add images, categorize them, and organize albums to keep your gallery fresh and engaging.
              </p>
            </div>

            <div class="d-flex gap-3">
              <!-- Add Category -->
              <button type="button" class="btn btn-light waves-effect fw-semibold" data-bs-toggle="modal"
                data-bs-target="#addCategoryModal" title="Create a new gallery category">
                <span class="font-size-16 align-middle me-2">🗂️</span>
                Add Category
              </button>

              <!-- Add Album -->
              <button type="button" class="btn btn-light waves-effect fw-semibold" data-bs-toggle="modal"
                data-bs-target="#addAlbumModal" title="Create a new photo album">
                <span class="font-size-16 align-middle me-2">🖼️</span>
                Add Album
              </button>
            </div>

          </div>

          <div class="card-body">
            <div class="row">
              <!-- 🖼️ Image Preview + Upload -->
              <div class="col-md-6 mb-3">
                <div class="w-100"
                  style="aspect-ratio: 4 / 5; overflow: hidden; border-radius: 8px; position: relative;">
                  <img :src="previewUrl" style="width: 100%; height: 100%; object-fit: cover; background-color: #eff2f7;" />

                  <!-- 📷 Upload Button -->
                  <label for="galleryPicUpload"
                    class="btn btn-primary waves-effect waves-light rounded-circle profile-pic-btn"
                    style="position: absolute; top: 5%; left: 5%;" title="Select Image">
                    <i class="bx bx-camera align-middle"></i>
                  </label>

                  <ImageUploader inputId="galleryPicUpload" @image-selected="handleImageSelected"
                    @show-toast="handleToast" :aspect-ratio="selectedRatio" />
                </div>
              </div>

              <!-- 📝 Image Details Form -->
              <div class="col-md-6">
                <div class="row">
                  <!-- Title -->
                  <div class="col-12 mb-3">
                    <label>Image Title <strong class="text-danger">*</strong></label>
                    <input v-model="formData.title" type="text" class="form-control" placeholder="Provide a title"
                      required>
                  </div>

                  <!-- 🌍 Location -->
                  <div class="col-12 mb-3">
                    <label class="form-label d-flex justify-content-between align-items-center">
                      <span>Location</span>
                      <button v-if="selectedLocation" type="button" class="btn btn-sm btn-outline-danger d-none"
                        @click="clearLocation">
                        Clear Location
                      </button>
                    </label>

                    <GoogleLocationInput 
                      apiKey="AIzaSyBl3dCvpVQUs04SOTCHgITw4Ts79-dRcfI"
                      @location-selected="handleLocation"
                      @location-cleared="handleClear"
                    />
                  </div>

                  <!-- 🗺️ Map Preview -->
                  <div class="col-12 mb-3">
                    <div v-if="selectedLocation" class="position-relative mt-0">
                      <!-- Loader Overlay -->
                      <div v-if="mapLoading" class="d-flex align-items-center justify-content-center"
                        style="position: absolute; inset: 0; background: rgba(255,255,255,0.7); z-index: 10;">
                        <div class="spinner-border text-primary" role="status" style="width: 2rem; height: 2rem;">
                          <span class="visually-hidden">Loading map...</span>
                        </div>
                      </div>

                      <!-- Map -->
                      <iframe v-if="mapUrl" :src="mapUrl" width="100%" height="180"
                        style="border:2px solid rgb(229 231 235); border-radius: 8px; overflow: hidden;"
                        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                        @load="mapLoaded"></iframe>
                    </div>
                  </div>




                  <!-- Category -->
                  <div class="col-6 mb-3">
                    <label>Select Gallery Category <strong class="text-danger">*</strong></label>
                    <SelectSearchBox :options="galleryCategories" v-model="selectedCategory"
                      placeholder="Select Category" input-class="form-control form-select" :is-multi="true" required />
                  </div>

                  <!-- Album -->
                  <div class="col-6 mb-3">
                    <label>Select Album</label>
                    <SelectSearchBox :options="galleryAlbums" v-model="selectedAlbum" placeholder="Select Album"
                      input-class="form-control form-select">
                      <template #footer>
                        <div class="p-2 text-primary cursor-pointer border-top text-center" data-bs-toggle="modal"
                          data-bs-target="#addAlbumModal">➕ Add New Album</div>
                      </template>
                    </SelectSearchBox>
                  </div>

                  <!-- Description -->
                  <div class="col-12 mb-3">
                    <label>Image Description <strong class="text-danger">*</strong></label>
                    <textarea v-model="formData.description" rows="3" class="form-control"
                      placeholder="Provide a brief description" required></textarea>
                  </div>

                  <!-- Public Display Option -->
                  <div class="col-12 mb-3">
                    <label class="form-label d-block">Display on public website?</label>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" id="activeYes" value="yes" v-model="isActive" />
                      <label class="form-check-label" for="activeYes">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" id="activeNo" value="no" v-model="isActive" />
                      <label class="form-check-label" for="activeNo">No</label>
                    </div>
                  </div>

                  <!-- 🔗 Social Links -->
                  <div class="col-12">
                    <label>Other Platform Links</label>
                    <div v-for="(link, index) in socialLinks" :key="index" class="row align-items-center mb-2">
                      <div class="col-6">
                        <select v-model="link.platform" class="form-control">
                          <option value="" disabled>Select Platform</option>
                          <option v-for="platform in socialMediaPlatforms" :key="platform.value"
                            :value="platform.value">{{ platform.label
                            }}</option>
                        </select>
                      </div>
                      <div class="col-6 d-flex align-items-center gap-2">
                        <input v-model="link.url" type="url" class="form-control" placeholder="Enter the link here">
                        <button v-if="socialLinks.length > 1" @click="removeLink(index)" type="button"
                          class="btn btn-link text-danger p-0">
                          <i class="bx bx-x font-size-18"></i>
                        </button>
                      </div>
                    </div>
                    <button @click="addLink" type="button" class="btn btn-link text-black">
                      <i class="bx bx-plus font-size-16 align-middle"></i> Add Another Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 🧾 Footer -->
          <div class="card-footer bg-white border-top d-flex justify-content-end py-3 gap-3">
            <button type="button" class="btn btn-outline-secondary btn-lg px-4" @click="cancelUpload">Cancel</button>
            <button type="button" class="btn btn-dark btn-lg px-4" @click="uploadImage">Upload to Gallery</button>
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

// 🧩 Components
import LoaderVue from '@/layouts/Loader.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import SelectSearchBox from '@/components/SelectSearchBox.vue'
import SingleToastVue from '@/components/SingleToast.vue'
import AddAlbumModal from '@/pages/Gallery/gallery.album.modal.vue'
import AddCategoryModal from '@/pages/Gallery/gallery.category.modal.vue'
import GoogleLocationInput from '@/components/GoogleLocationInput.vue'

// 🖼️ Default placeholder image
import placeholderImage from '@/assets/images/image-placeholder.svg'

// =============================
// ⚙️ REACTIVE DATA
// =============================
const router = useRouter()
const isLoading = ref(true)
const previewUrl = ref(placeholderImage)
const selectedRatio = ref(4 / 5) // Maintain 4:5 image ratio (Instagram portrait style)

// 📁 Form data
const formData = ref({
  title: '',
  location: '',
  description: ''
})

//mapping of selected image
// 🌍 Map state
const selectedLocation = ref(null)
const mapLoading = ref(false)


const handleLocation = (locationData) => {
  mapLoading.value = true
  selectedLocation.value = locationData
}

const clearLocation = () => {
  selectedLocation.value = null
  formData.value.location = ''
  mapLoading.value = false
}

const handleClear = () => {
  console.log("Location cleared!");
  clearLocation()
};

const mapLoaded = () => {
  mapLoading.value = false
}

const mapUrl = computed(() => {
  const lat = selectedLocation.value?.latitude
  const lng = selectedLocation.value?.longitude
  if (!lat || !lng) return ''
  return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`
})

// 🧾 Dropdown data
const galleryAlbums = [
  { label: 'Nature', value: 'nature' },
  { label: 'Cities', value: 'cities' },
  { label: 'People', value: 'people' },
  { label: 'Events', value: 'events' }
]

const galleryCategories = [
  { label: 'Landscape', value: 'landscape' },
  { label: 'Portrait', value: 'portrait' },
  { label: 'Street', value: 'street' },
  { label: 'Wildlife', value: 'wildlife' }
]

const socialMediaPlatforms = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'YouTube', value: 'youtube' }
]

// ✅ Selected options
const selectedCategory = ref([])
const selectedAlbum = ref('')
const isActive = ref('yes')

// 🔗 Dynamic social links array
const socialLinks = ref([{ platform: '', url: '' }])
const addLink = () => socialLinks.value.push({ platform: '', url: '' })
const removeLink = (index) => socialLinks.value.splice(index, 1)

// 📸 Image preview update
const handleImageSelected = (newImageUrl) => (previewUrl.value = newImageUrl)

// 🔔 Toast notification
const toastType = ref('')
const toastMessage = ref('')
const handleToast = ({ toastType: type, toastMessage: msg }) => {
  toastType.value = type
  toastMessage.value = msg
  setTimeout(() => (toastMessage.value = ''), 2000)
}

// 💾 Upload action
const uploadImage = () => {
  if (!formData.value.title || !selectedCategory.value.length) {
    handleToast({ toastType: 'error', toastMessage: 'Please fill in required fields.' })
    return
  }

  const payload = {
    title: formData.value.title,
    location: formData.value.location,
    description: formData.value.description,
    categories: selectedCategory.value,
    album: selectedAlbum.value,
    isActive: isActive.value,
    socialLinks: socialLinks.value.filter((l) => l.platform && l.url),
    imageUrl: previewUrl.value
  }

  console.log('📤 Uploading Image Data:', payload)
  handleToast({ toastType: 'success', toastMessage: 'Image uploaded successfully!' })
  router.push('/gallery/list')
}

// 🚫 Cancel upload
const cancelUpload = () => router.push('/gallery/list')

// 🕓 Simulate page loading
onMounted(() => {
  document.title = 'Upload to Gallery - CSPL CRM'
  setTimeout(() => (isLoading.value = false), 1000)
})
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.border-top {
  border-top: 1px solid #e9ecef !important;
}

.text-primary:hover {
  background-color: #f8f9fa;
}
</style>
