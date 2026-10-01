<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Your Blog Articles</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item active">Blog Articles</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loader -->
        <div v-if="isLoading">
            <LoaderVue />
        </div>

        <div v-else class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-body border-bottom">
                        <div class="row">
                            <div class="col-12 d-flex gap-2">
                                <!-- Sort Dropdown -->
                                <div class="dropdown position-relative d-flex">
                                    <button type="button" class="btn btn-light waves-effect fw-bold"
                                        data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                        <i class="bx bx-sort font-size-16 align-middle"></i>
                                        <span class="d-md-inline-block d-none">Sort: <span
                                                class="text-capitalize text-muted">{{ sortBy }}</span></span>
                                    </button>

                                    <div class="dropdown-menu p-4 text-black" style="width: 400px;"
                                        data-bs-auto-close="outside">
                                        <div class="row">
                                            <div class="col-12">
                                                <h5 class="text-capitalize">Sort by</h5>
                                            </div>
                                            <div class="col-12 mb-2">
                                                <hr class="d-none">
                                            </div>
                                            <div class="col-12">
                                                <div class="mb-3">
                                                    <label for="sort-field-select"
                                                        class="form-label d-none">Field</label>
                                                    <select class="form-select" id="sort-field-select" v-model="sortBy">
                                                        <option value="" disabled>Select field</option>
                                                        <option value="publishedAt">Publish date</option>
                                                        <option value="relevancy">Relevancy</option>
                                                        <option value="popularity">Popularity</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div class="btn-group" role="group" aria-label="Sort order">
                                                <input type="radio" class="btn-check" name="sortOrder" id="ascending"
                                                    autocomplete="off" value="asc" v-model="sortOrder">
                                                <label class="btn btn-outline-dark" for="ascending">
                                                    <i class="bx bx-sort-up"></i> Ascending
                                                </label>

                                                <input type="radio" class="btn-check" name="sortOrder" id="descending"
                                                    autocomplete="off" value="desc" v-model="sortOrder">
                                                <label class="btn btn-outline-dark" for="descending">
                                                    <i class="bx bx-sort-down"></i> Descending
                                                </label>
                                            </div>

                                            <div class="col-12 mt-4 d-none">
                                                <button type="button"
                                                    class="btn btn-soft-danger waves-effect waves-light w-100">
                                                    <i class="bx bx-trash me-1 fs-5"></i>
                                                    Clear Sort
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Filter Dropdown -->
                                <div class="dropdown position-relative d-flex">
                                    <button type="button" class="btn btn-light waves-effect fw-bold"
                                        data-bs-toggle="dropdown" data-bs-auto-close="outside">
                                        <i class="mdi mdi-filter-variant fs-5 align-middle"></i>
                                        <span class="d-md-inline-block d-none">Filter</span>
                                    </button>

                                    <div class="dropdown-menu p-4 text-black" style="width: 400px;">
                                        <div class="row">
                                            <!-- Header Section -->
                                            <div class="col-12">
                                                <h5 class="text-capitalize mb-1">Filter Options</h5>
                                                <p class="text-muted small mb-0">Refine your search results using the
                                                    options below</p>
                                            </div>

                                            <div class="col-12 mb-3">
                                                <hr class="bg-dark-subtle">
                                            </div>

                                            <!-- Author Filter Section -->
                                            <div class="col-12 mb-4">
                                                <div class="mb-3">
                                                    <label for="author-select" class="form-label">
                                                        <h6 class="fs-6 mb-1">Author</h6>
                                                        <p class="text-muted fw-normal small mb-2">Choose to include or
                                                            exclude specific authors from results</p>
                                                    </label>

                                                    <div class="btn-group w-100 mb-3" role="group"
                                                        aria-label="Author filter mode">
                                                        <input type="radio" class="btn-check" name="author-mode"
                                                            id="author-include" autocomplete="off" checked>
                                                        <label class="btn btn-outline-secondary flex-grow-1"
                                                            for="author-include">Include</label>

                                                        <input type="radio" class="btn-check" name="author-mode"
                                                            id="author-exclude" autocomplete="off">
                                                        <label class="btn btn-outline-secondary flex-grow-1"
                                                            for="author-exclude">Exclude</label>
                                                    </div>

                                                    <select class="form-select" id="author-select"
                                                        aria-label="Select author">
                                                        <option value="" selected>Select an author</option>
                                                        <option value="author1">John Doe</option>
                                                        <option value="author2">Jane Smith</option>
                                                        <option value="author3">Michael Johnson</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <!-- Visibility Filter Section -->
                                            <div class="col-12 mb-4">
                                                <div class="mb-3">
                                                    <label class="form-label">
                                                        <h6 class="fs-6 mb-1">Visibility Status</h6>
                                                        <p class="text-muted fw-normal small mb-2">Filter content based
                                                            on its visibility on the company's public website</p>
                                                    </label>

                                                    <div class="btn-group w-100" role="group"
                                                        aria-label="Visibility filter">
                                                        <input type="radio" class="btn-check" name="visibility-status"
                                                            id="visibility-all" autocomplete="off" checked>
                                                        <label class="btn btn-outline-secondary flex-grow-1"
                                                            for="visibility-all">All</label>

                                                        <input type="radio" class="btn-check" name="visibility-status"
                                                            id="visibility-public" autocomplete="off">
                                                        <label class="btn btn-outline-secondary flex-grow-1"
                                                            for="visibility-public">Public</label>

                                                        <input type="radio" class="btn-check" name="visibility-status"
                                                            id="visibility-private" autocomplete="off">
                                                        <label class="btn btn-outline-secondary flex-grow-1"
                                                            for="visibility-private">Private</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Date Range Filter Section -->
                                            <div class="col-12 mb-4">
                                                <div class="mb-3">
                                                    <label for="date-range-picker" class="form-label">
                                                        <h6 class="fs-6 mb-1">Date Range</h6>
                                                        <p class="text-muted fw-normal small mb-2">Filter results by
                                                            selecting a specific date range</p>
                                                    </label>

                                                    <div class="row">
                                                        <div class="col-12">
                                                            <Datepicker id="date-range-picker" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Clear Filters Button -->
                                            <div class="col-12 mt-2 gap-3 d-flex ">
                                                <button class="btn btn-primary waves-effect waves-light ">
                                                     <i class="bx bx-check-double me-1 fs-5"></i>
                                                    Apply Filters
                                                </button>
                                                <button type="button"
                                                    class="btn btn-soft-danger waves-effect waves-light "
                                                    aria-label="Clear all filters">
                                                    <i class="bx bx-trash me-1 fs-5"></i>
                                                    Reset
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Search Box -->
                                <div class="flex-grow-1">
                                    <div class="search-box mb-0 me-0">
                                        <div class="position-relative">
                                            <input type="text" class="form-control bg-light rounded"
                                                placeholder="Search..." fdprocessedid="husj3l" spellcheck="false"
                                                data-ms-editor="true">
                                            <i class="bx bx-search-alt search-icon"></i>
                                        </div>
                                    </div>
                                </div>

                                <!-- Add Article Tag Button -->
                                <div class="d-flex position-relative d-none d-lg-flex">
                                    <button type="button" class="btn btn-light waves-effect fw-semibold"
                                        data-bs-toggle="modal" data-bs-target="#addTagModal"
                                        title="Create a new article">
                                        <span class="font-size-16 align-middle me-2">📝</span> Add Article Tag
                                    </button>
                                </div>

                                <RouterLink to="/newArticle"
                                    class="btn btn-primary d-lg-flex d-none align-items-center fw-bold">
                                    <i class="mdi mdi-file-plus-outline fs-5 me-2"></i> Add Article
                                </RouterLink>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <!-- Categories -->
                        <div class="row mb-5">
                            <div class="col-12">
                                <div class="d-flex flex-row flex-nowrap py-2 category-scroll gap-2"
                                    style="overflow-x: auto; overflow-y: hidden; scrollbar-width: none; -ms-overflow-style: none;">
                                    <button v-for="cat in categories" :key="cat.value" type="button"
                                        class="btn fw-bold btn-light btn-rounded waves-effect px-4 text-nowrap flex-shrink-0"
                                        :class="{ 'btn-dark text-light': querry === cat.value }"
                                        @click="selectCategory(cat.value)">
                                        {{ cat.name }} <span class="opacity-50">({{ cat.count }})</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Articles Grid -->
                        <div class="row">
                            <router-link :to="`/blogs/details/${encodeId(2)}/${slugify(art.title)}`" class="col-sm-6 col-md-6 col-lg-4" v-for="art in articles" :key="art.url">
                                <div class="card p-1 border shadow-none" style="height: calc(100% - 1.7rem);">
                                    <div class="position-relative pt-3 px-3">
                                        <div class="w-100 h-auto d-flex bg-info-subtle">
                                            <img :src="art.urlToImage || '/src/assets/images/blog-place-holder.jpg'"
                                                class="img-thumbnail p-0 m-0 rounded border-0"
                                                :alt="art.title || 'Article Image'">
                                        </div>
                                    </div>

                                    <div class="p-3 pb-0">
                                        <ul class="list-inline mb-1">
                                            <li class="list-inline-item me-3">
                                                <a href="javascript: void(0);" class="text-muted text-capitalize">
                                                    <i class="dripicons-clock align-middle text-muted me-1"></i>
                                                    15-20 Mins read
                                                </a>
                                            </li>
                                        </ul>

                                        <h5 class="mb-0">
                                            <a :href="art.url" target="_blank" class="text-black fs-5">
                                                {{ art.title }}
                                            </a>
                                        </h5>
                                    </div>

                                    <div class="p-3">
                                        <p class="text-muted truncate-multiline">{{ art.description }}</p>
                                    </div>

                                    <div class="p-3">
                                        <div class="d-flex">
                                            <div class="flex-shrink-0 me-3">
                                                <div class="avatar-sm d-flex active-author border-round">
                                                    <img class="rounded-circle profile-pic-cont"
                                                        :src="`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`"
                                                        alt="Author avatar">
                                                </div>
                                            </div>
                                            <div class="flex-grow-1 chat-user-box">
                                                <p class="user-title m-0 fs-6 fw-bold text-truncate"
                                                    style="max-width: 300px;">
                                                    {{ art.author || 'Unknown Author' }}
                                                    <span class="text-muted">({{ art.source.name || '' }})</span>
                                                </p>
                                                <p class="text-muted d-flex m-0 text-capitalize">
                                                    {{ timeAgo(art.publishedAt) }} |
                                                    {{ Math.floor(Math.random() * 10000) }} Views
                                                    <span class="text-black me-2 mx-3 d-flex">
                                                        <i class="bx bx-globe fs-5 mx-1"></i> Public
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>

                        <!-- Intersection Observer trigger -->
                        <div ref="loadTrigger" class="my-5" style="height: 1px;"></div>

                        <!-- Loading Skeletons -->
                        <div class="row" v-if="loadingMore">
                            <div class="col-sm-6 col-md-6 col-lg-4 mb-4" v-for="n in pageSize" :key="n">
                                <ArticleSkeletonLoader />
                            </div>
                        </div>

                        <!-- Load More Button / Status -->
                        <div class="row">
                            <div class="col-12 text-center align-items-center justify-content-center">
                                <div class="p-3">
                                    <button class="btn btn-dark btn-lg mt-3" v-if="hasMore && !loadingMore"
                                        @click="fetchArticles()">
                                        Load More Articles
                                    </button>
                                    <p v-if="!hasMore && articles.length > 0" class="text-muted mt-3 pb-0 mb-0">
                                        No more articles to load.
                                    </p>
                                    <p v-if="articles.length === 0 && !isLoading" class="text-muted mt-3 pb-0 mb-0">
                                        No articles found.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AddTagModal />
</template>

<script setup>
// 🔧 Core Vue imports
import { ref, onMounted, computed, watch, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import DominantColor from '@/components/Dominant.color.vue'
import Litepicker from 'litepicker'
import 'litepicker/dist/css/litepicker.css'
import Datepicker from '@/components/Datepicker.material.vue'
import ArticleSkeletonLoader from '@/pages/Blog/Article.skeleton.loader.vue'
import LoaderVue from '@/layouts/Loader.vue'
import AddTagModal from './blog.tags.vue'

const isLoading = ref(true)
const loadingMore = ref(false)
let observer = null
const encodeId = (id) => btoa(String(id))


const availableTags = [
    { label: 'Technology', value: 'technology' },
    { label: 'Design', value: 'design' },
    { label: 'Business', value: 'business' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Travel', value: 'travel' },
    { label: 'Food', value: 'food' },
    { label: 'Photography', value: 'photography' },
    { label: 'Lifestyle', value: 'lifestyle' },
    { label: 'Health', value: 'health' },
    { label: 'Finance', value: 'finance' },
    { label: 'Sports', value: 'sports' },
    { label: 'All', value: 'a' },
]

const categories = [
    { name: 'All', value: 'a', count: Math.floor(Math.random() * 300) + 50 },
    { name: 'AI & Machine Learning', value: 'ai-ml', count: Math.floor(Math.random() * 100) + 20 },
    { name: 'Gadgets & Devices', value: 'gadgets', count: Math.floor(Math.random() * 80) + 10 },
    { name: 'Software & Apps', value: 'software', count: Math.floor(Math.random() * 100) + 15 },
    { name: 'Cybersecurity', value: 'cybersecurity', count: Math.floor(Math.random() * 90) + 10 },
    { name: 'Internet & Web', value: 'internet', count: Math.floor(Math.random() * 70) + 5 },
    { name: 'Blockchain & Crypto', value: 'blockchain-crypto', count: Math.floor(Math.random() * 60) + 5 },
    { name: 'Tech Business', value: 'tech-business', count: Math.floor(Math.random() * 50) + 5 },
    { name: 'Science & Innovation', value: 'science', count: Math.floor(Math.random() * 40) + 5 },
    { name: 'Telecom & 5G', value: 'telecom', count: Math.floor(Math.random() * 30) + 5 },
    { name: 'Hardware', value: 'hardware', count: Math.floor(Math.random() * 25) + 5 },
    { name: 'Green Tech', value: 'greentech', count: Math.floor(Math.random() * 20) + 5 },
    { name: 'Gaming Tech', value: 'gaming-tech', count: Math.floor(Math.random() * 50) + 5 },
];

const articleDominantColors = ref({})
const articles = ref([])
const currentPage = ref(1)
const pageSize = 15
const totalPages = ref(1)
const totalResults = ref(0)
const randomNum = ref(Math.floor(Math.random() * 100))
const dateFrom = ref(null)
const dateTo = ref(null)
const sortBy = ref('publishedAt')
const sortOrder = ref('desc')
const hasMore = ref(true)
const loadTrigger = ref(null)
const querry = ref('a')

// Computed property to check if more articles are available
const canLoadMore = computed(() => {
    return hasMore.value && !loadingMore.value && currentPage.value <= totalPages.value
})

// Time ago function for converting dates into human readable formats
function timeAgo(dateString) {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    }

    for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(seconds / value)
        if (count >= 1) {
            return `${count} ${unit}${count > 1 ? "s" : ""} ago`
        }
    }

    return "just now"
}

// Reset function to clear everything when category changes
function resetPagination() {
    currentPage.value = 1
    articles.value = []
    hasMore.value = true
    totalPages.value = 1
    totalResults.value = 0
}

// Function to change selected category
function selectCategory(value) {
    querry.value = value
    resetPagination()

    // Disconnect observer before fetching new category
    //if (observer) observer.disconnect()

    fetchArticles()
    console.log('Selected category:', value)
}

function slugify(text) {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  

async function fetchArticles() {
    // Prevent duplicate calls
    if (loadingMore.value) return

    try {
        // Show initial loading only on first page
        if (currentPage.value === 1) {
            //isLoading.value = true
            loadingMore.value = true
        } else {
            loadingMore.value = true
        }

        const url = `https://newsapi.org/v2/everything?q=${querry.value}&sortBy=${sortBy.value}&apiKey=8a4ddbaeb90f4c3a9ca1ab6699231dee&page=${currentPage.value}&pageSize=${pageSize}`

        const res = await fetch(url)
        const data = await res.json()

        if (data.status === 'ok') {
            totalResults.value = data.totalResults
            totalPages.value = Math.ceil(data.totalResults / pageSize)

            // On first page, replace articles; otherwise append
            if (currentPage.value === 1) {
                articles.value = data.articles
            } else {
                articles.value = [...articles.value, ...data.articles]
            }

            // Check if there are more pages
            hasMore.value = currentPage.value < totalPages.value

            // Increment page for next load
            if (hasMore.value) {
                currentPage.value++
            }
        }
    } catch (err) {
        console.error("Failed to load articles:", err)
        hasMore.value = false
    } finally {
        isLoading.value = false
        loadingMore.value = false
    }
}

// Setup Intersection Observer for infinite scroll
const setupObserver = () => {
    if (observer) observer.disconnect()

    observer = new IntersectionObserver(
        (entries) => {
            console.log('Observer triggered:', entries[0].isIntersecting, 'canLoadMore:', canLoadMore.value)
            if (entries[0].isIntersecting && canLoadMore.value) {
                console.log('Loading more articles via scroll...')
                fetchArticles()
            }
        },
        {
            root: null, // viewport
            rootMargin: '300px', // trigger earlier
            threshold: 0.1
        }
    )

    if (loadTrigger.value) {
        console.log('Observer attached to trigger element')
        observer.observe(loadTrigger.value)
    } else {
        console.warn('loadTrigger element not found')
    }
}

// Clean up observer when component unmounts
onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})

// Prevent default bootstrap behaviour of drop downs
onMounted(() => {
    document.querySelectorAll('.dropdown-menu').forEach((el) => {
        el.addEventListener('click', (e) => e.stopPropagation())
    })
})

// Initialize
onMounted(async () => {
    await fetchArticles()

    // Setup observer after content is rendered
    await new Promise(resolve => setTimeout(resolve, 500))
    setupObserver()
})

// Watch for sort changes
watch([sortBy, sortOrder], () => {
    resetPagination()
    fetchArticles()
})
</script>

<style
    scoped>
    .profile-pic-cont {
        border: 3px solid transparent
    }

    .active-author {
        position: relative;
        border-radius: 50%;
        display: inline-flex;
    }

    /* Outer animated gradient ring */
    .active-author::before {
        content: "";
        position: absolute;
        inset: -2px;
        /* thickness of outer ring */
        border-radius: 50%;
        background: conic-gradient(#0077be,
                /* deep sea blue */
                #00c8c8,
                /* turquoise */
                #32d690,
                /* sea green */
                #00c8c8, #0077be);
        background: conic-gradient(#ff0050, #ffdd00, #00f2ea, #ff0050);
        /* animation: spin 3s linear infinite; */
        z-index: 1;
        /* Mask trick to hollow the center */
        -webkit-mask: radial-gradient(circle, transparent 52%, #000 55%);
        mask: radial-gradient(circle, transparent 52%, #000 55%);
    }

    /* White inner border hugging the profile picture */
    .active-author::after {
        content: "";
        position: absolute;
        inset: 1px;
        border-radius: 50%;
        background: #fff;
        z-index: 2;
        -webkit-mask: radial-gradient(circle, transparent 60%, #000 62%);
        mask: radial-gradient(circle, transparent 60%, #000 62%);
    }

    /* Make the avatar sit above everything cleanly */
    .active-author img {
        position: relative;
        z-index: 3;
        border-radius: 50%;
    }

    /* Smooth, subtle spin */
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }

        to {
            transform: rotate(360deg);
        }
    }
</style>
