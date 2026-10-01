<template>
  <div class="container-fluid">
    <!-- 🏷️ Page Title -->
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

    <!-- ✅ Gallery Section -->
    <div v-else class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <!-- Navigation -->
          <div class="card-body px-0 py-3 pt-0 pb-0" style="border-bottom: 2px solid #f6f6f6">
            <GalleryNavigation />
          </div>
          <div class="card-body border-bottom">
            <div class="row">
              <div class="col-12 d-flex gap-2">
                <div class="position-relative d-flex">
                  <button type="button" class="btn btn-light waves-effect fw-bold" data-bs-toggle="dropdown"
                    aria-expanded="false">
                    <i class="bx bx-sort font-size-16 align-middle"></i> <span class="d-md-inline-block d-none">Sort By</span>
                  </button>

                  <div class="dropdown-menu p-4 text-black" style="width: 300px;">
                    <div class="row">
                      <div class="col-12">
                        <h5 class="text-capitalize">Sort by</h5>
                      </div>
                      <div class="col-12 mb-2">
                        <hr class="d-none">
                      </div>
                      <div class="col-12">
                        <div class="mb-3">
                          <label for="sort-field-select" class="form-label d-none">Field</label>
                          <select class="form-select" id="sort-field-select">
                            <option value=""  disabled="">Select field</option>
                            <option value="tagNumber" selected="">Date Added</option>
                            <option value="name">Views</option>                            
                          </select>
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="mb-3">
                          <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" class="btn-check" name="btnradio" id="btnradio4" autocomplete="off"
                              checked="">
                            <label class="btn btn-outline-dark" for="btnradio4"><i class="bx bx-sort-up"></i>
                              Ascending</label>

                            <input type="radio" class="btn-check" name="btnradio" id="btnradio6" autocomplete="off">
                            <label class="btn btn-outline-dark" for="btnradio6"><i class="bx bx-sort-down"></i>
                              Descending</label>
                          </div>
                        </div>
                      </div>
                      <div class="col-12 mt-4">
                        <button type="button" class="btn btn-soft-danger waves-effect waves-light w-100 "><i class="bx bx-trash me-1 fs-5"></i>
                          Clear Sort</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="position-relative d-flex">
                  <button type="button" class="btn btn-light waves-effect fw-bold" data-bs-toggle="dropdown"
                    aria-expanded="false"><i class="mdi mdi-filter-variant fs-5 align-middle"></i> <span class="d-md-inline-block d-none">Filter</span></button>

                  <div class="dropdown-menu p-4 text-black" style="width: 300px;">
                    <div class="row">
                      <div class="col-12">
                        <h5 class="text-capitalize">Filter</h5>
                      </div>
                      <div class="col-12 mb-2">
                        <hr class="d-none">
                      </div>
                      <div class="col-12">
                        <div class="mb-4">
                          <label for="sort-field-select" class="form-label"><h5>Filter By Aurthor</h5></label>
                          <select class="form-select" id="sort-field-select">
                            <option value=""  disabled="">Select field</option>
                            <option value="tagNumber" selected="">Date Added</option>
                            <option value="name">Views</option>                            
                          </select>
                        </div>
                      </div>

                       <div class="col-12">
                        <div class="mb-4">
                          <label for="sort-field-select" class="form-label"><h5>Filter By Website Visibility</h5></label>
                          <div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="formCheck1">
                                <label class="form-check-label" for="formCheck1">
                                    Visible on Website
                                </label>
                            </div>

                            <div class="form-check mb-3">
                                <input class="form-check-input form-check-lg " type="checkbox" id="formCheck22">
                                <label class="form-check-label" for="formCheck22">
                                    Hidden from Website
                                </label>
                            </div>
                          </div>

                        </div>
                      </div>

                     
                      <div class="col-12 mt-4">
                        <button type="button" class="btn btn-soft-danger waves-effect waves-light w-100 "><i class="bx bx-trash me-1 fs-5"></i>
                          Clear Filters</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex-grow-1">
                    <div class="search-box mb-0 me-0">
                        <div class="position-relative">
                            <input type="text" class="form-control bg-light  rounded" placeholder="Search..." fdprocessedid="husj3l" spellcheck="false" data-ms-editor="true">
                            <i class="bx bx-search-alt search-icon"></i>
                        </div>
                    </div>
                </div>
                <div class="d-flex position-relative d-none d-lg-flex">
                  <button type="button" class="btn btn-light waves-effect fw-semibold" data-bs-toggle="modal" data-bs-target="#addAlbumModal" title="Create a new photo album" data-v-22696a1e=""><span class="font-size-16 align-middle me-2" data-v-22696a1e="">🖼️</span> Add Album </button>
                </div>
                <RouterLink to="/gallery/upload" class="btn btn-primary d-lg-flex d-none align-items-center fw-bold ">
                  <i class="mdi mdi-camera-plus-outline fs-5 me-2"></i> Upload Media
                </RouterLink>

              </div>
            </div>
          </div>

          <div class="card-body">
            <h4 class="card-title mb-3 d-none">Categories</h4>

            <!-- Category buttons -->
            <div class="row">
              <div class="col-12">
                <div class="d-flex flex-row flex-nowrap py-2 category-scroll gap-2"
                  style="overflow-x: auto; overflow-y: hidden; scrollbar-width: none; -ms-overflow-style: none;">
                  <button type="button"
                    class="btn btn-light btn-soft-info fw-bold btn-rounded waves-effect px-4 text-nowrap flex-shrink-0 text-black d-non">
                    <span class="font-size-16 align-middle me-2">➕</span> Add Category
                  </button>

                  <button v-for="cat in categories" :key="cat" type="button"
                    class="btn fw-bold btn-light btn-rounded waves-effect px-4 text-nowrap flex-shrink-0"
                    :class="{ 'btn-dark text-light': cat === 'All' }">
                    {{ cat.name }} <span class="opacity-75">({{ cat.count }})</span>
                  </button>
                </div>
              </div>

              <!-- 🖼️ Images Grid -->
              <div class="col-12 mt-3 pt-3">
                <div class="row g-3">
                  <div v-for="(post, index) in posts" :key="post.id"
                    class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-3 col-6 p-1 m-0">
                    <div class="d-flex position-relative image-portfolio-cont bg-light h-100 w-100">
                      <img :src="`https://picsum.photos/1080/1350?random=${post.id}`" :alt="post.title" loading="lazy"
                        class="img-fluid rounded shadow-sm h-auto w-100" />

                      <!-- Overlay info -->
                      <div
                        data-bs-toggle="modal"
                        data-bs-target="#imageDetailsModal"
                        title="Click to view more details"
                        class="img-portfolio-info text-center d-flex flex-column justify-content-center p-5 position-absolute bottom-0 w-100 bg-dark bg-opacity-50 text-light">
                        <h4 class="fw-bold mb-1 img-title text-capitalize">{{ post.title }}</h4>
                        <p class="opacity-75 p-0 m-0 img-description">{{ post.body }}</p>
                      </div>

                      <!-- Views -->
                      <div class="p-3 w-100 gallery-views d-flex justify-content-end align-items-center gap-2 pr-2 pt-2">
                        <div class="d-flex d-flex justify-content-end align-items-center gap-2">
                          <i class="mdi mdi-eye-outline fs-5 text-light"></i>
                          <p class="p-0 m-0 fw-semibold">
                            {{ Math.floor(Math.random() * 900) + 100 }}
                          </p>
                        </div>

                        <div class="btn-group">
                              <button class="btn header-item noti-icon waves-effect text-white py-0 px-2" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="height: 40px !important; z-index: 1020;"
                              title="Click for more actions"
                              >
                                  <i class="mdi mdi-dots-vertical text-white"></i>
                              </button>
                             <div class="dropdown-menu shadow-lg">
                                <a class="dropdown-item d-flex align-items-center gap-3" href="#">
                                  <i class="mdi mdi-pencil-outline  fs-4"></i> Edit Details
                                </a>
                                 <a class="dropdown-item d-flex align-items-center gap-3" 
                                  href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#imageDetailsModal"
                                 >
                                  <i class="mdi mdi-eye-outline  fs-4"></i> Image Details
                                </a>
                                <a class="dropdown-item d-flex align-items-center gap-3" 
                                  href="#"
                                   data-bs-toggle="modal"
                                    data-bs-target="#moveToAlbumModal"
                                >
                                  <i class="mdi mdi-folder-move-outline  fs-4"></i> Move to Album
                                </a>
                                <a class="dropdown-item d-flex align-items-center gap-3" href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#hideImageModal"
                                >
                                  <i class="mdi mdi-eye-off-outline  fs-4"></i> Hide from Website
                                </a>
                                <a class="dropdown-item d-flex align-items-center gap-3" href="#">
                                  <i class="mdi mdi-download-outline  fs-4"></i> Download Image
                                </a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item d-flex align-items-center gap-3 text-danger fw-semibold" href="#"
                                  data-bs-toggle="modal"
                                  data-bs-target="#deleteImageModal"
                                >
                                  <i class="mdi mdi-trash-can-outline fs-4"></i> Delete Image
                                </a>
                            </div>

                          </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Load More Button -->
                <div class="row">
                  <div class="col-12 text-center align-items-center justify-content-center">
                    <div class="p-3">
                      <button class="btn btn-dark btn-lg mt-3" v-if="hasMore && !loadingMore" @click="fetchPosts">
                        Load More Images
                      </button>
                      <div v-else-if="loadingMore" class="spinner-border text-dark mt-3"></div>
                      <p v-else class="text-muted mt-3 pb-0 mb-0">No more images to load.</p>

                    </div>
                  </div>
                </div>

                <!-- Infinite scroll trigger -->
                <div ref="loadTrigger" class="text-center mt-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GalleryMoveAlbum />
    <ImageHide />
    <GalleryImageDelete />
    <GalleryImageDetails />
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import LoaderVue from '@/layouts/Loader.vue'
import GalleryNavigation from '@/pages/Gallery/gallery.navigation.vue'
import GalleryMoveAlbum from '@/pages/Gallery/gallery.move.album.vue'
import ImageHide from '@/pages/Gallery/gallery.image.hide.vue'
import GalleryImageDelete from '@/pages/Gallery/gallery.image.delete.vue'
import GalleryImageDetails from '@/pages/Gallery/gallery.image.details.vue'



// 🧠 State
const isLoading = ref(true)
const posts = ref([])
const page = ref(1)
const totalPages = ref(1)
const limit = ref(12)
const hasMore = ref(true)
const loadingMore = ref(false)
const loadTrigger = ref(null)
let observer = null

// Categories
const categories = [
  { name: 'All', count: 214 },
  { name: 'Light', count: 18 },
  { name: 'Mtacho', count: 9 },
  { name: 'Architecture', count: 22 },
  { name: 'People', count: 31 },
  { name: 'Nature', count: 27 },
  { name: 'Urban Life', count: 19 },
  { name: 'Travel', count: 24 },
  { name: 'Food', count: 14 },
  { name: 'Wildlife', count: 17 },
  { name: 'Abstract', count: 11 },
  { name: 'Events', count: 13 },
  { name: 'Sports', count: 16 },
  { name: 'Technology', count: 20 },
  { name: 'Fashion', count: 8 },
  { name: 'Aerial', count: 6 },
  { name: 'Street', count: 23 },
  { name: 'Black & White', count: 15 },
  { name: 'Portraits', count: 28 },
  { name: 'Editorial', count: 10 },
  { name: 'Product', count: 12 }
]


// 🧩 Fetch posts (appends new data)
const fetchPosts = async () => {
  if (loadingMore.value || !hasMore.value) return
  loadingMore.value = true

  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page.value}&_limit=${limit.value}`
    )
    const data = await res.json()

    totalPages.value = Math.ceil(5000 / limit.value) // JSONPlaceholder fixed 100 posts
    posts.value = [...posts.value, ...data] // append
    page.value++

    if (page.value > totalPages.value) hasMore.value = false
  } catch (err) {
    console.error('Error fetching posts:', err)
  } finally {
    loadingMore.value = false
  }
}

// 👁️ Setup Intersection Observer for infinite scroll
const setupObserver = () => {
  if (observer) observer.disconnect() // prevent duplicate observers

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value && !loadingMore.value) {
        fetchPosts()
      }
    },
    { rootMargin: '200px' }
  )

  if (loadTrigger.value) observer.observe(loadTrigger.value)
}

const handleScroll = () => {
  const bottomReached =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200

  if (bottomReached && !isLoading.value && page.value <= totalPages.value) {
    console.log("we are at the bottom of the page")
    fetchPosts()
  }
}

// 🧹 Clean up observer when component unmounts
onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

// 🚀 Initialize
onMounted(() => {
  // Fake initial loading effect
  setTimeout(() => (isLoading.value = false), 800)
  fetchPosts()
  window.addEventListener('scroll', handleScroll)
  setupObserver()
})
</script>

<style scoped>
.d-flex::-webkit-scrollbar {
  display: none;
}

.img-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.btn-soft-danger:hover{
  background-color: rgb(244 106 106 / 36%);
  font-weight: bold;
  color: red;
}
.gallery-views {
  position: absolute;
  pointer-events: auto;
}

</style>
