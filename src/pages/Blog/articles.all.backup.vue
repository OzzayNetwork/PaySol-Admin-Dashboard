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
                            <li class="breadcrumb-item active">
                                Blog Articles
                            </li>

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
                    <div class="card-body border-bottom">
                        <div class="row">
                            <div class="col-12 d-flex gap-2">
                                <div class="dropdown  position-relative d-flex">
                                    <button type="button" class="btn btn-light waves-effect fw-bold"
                                        data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                        <i class="bx bx-sort font-size-16 align-middle"></i> <span
                                            class="d-md-inline-block d-none">Sort By</span>
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
                                                <label class="btn btn-outline-dark" for="ascending"><i
                                                        class="bx bx-sort-up"></i> Ascending</label>

                                                <input type="radio" class="btn-check" name="sortOrder" id="descending"
                                                    autocomplete="off" value="desc" v-model="sortOrder">
                                                <label class="btn btn-outline-dark" for="descending"><i
                                                        class="bx bx-sort-down"></i> Descending</label>
                                            </div>

                                            <div class="col-12 mt-4 d-none">
                                                <button type="button"
                                                    class="btn btn-soft-danger waves-effect waves-light w-100 "><i
                                                        class="bx bx-trash me-1 fs-5"></i>
                                                    Clear Sort</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                            <div class="col-12 mt-2">
                                                <button type="button"
                                                    class="btn btn-soft-danger waves-effect waves-light w-100"
                                                    aria-label="Clear all filters">
                                                    <i class="bx bx-trash me-1 fs-5"></i>
                                                    Clear All Filters
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <div class="search-box mb-0 me-0">
                                        <div class="position-relative">
                                            <input type="text" class="form-control bg-light  rounded"
                                                placeholder="Search..." fdprocessedid="husj3l" spellcheck="false"
                                                data-ms-editor="true">
                                            <i class="bx bx-search-alt search-icon"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex position-relative d-none d-lg-flex">
                                    <button type="button" class="btn btn-light waves-effect fw-semibold"
                                        data-bs-toggle="modal" data-bs-target="#addArticleModal"
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
                        <div class="row mb-5">
                            <div class="col-12">
                                <div class="d-flex flex-row flex-nowrap py-2 category-scroll gap-2"
                                    style="overflow-x: auto; overflow-y: hidden; scrollbar-width: none; -ms-overflow-style: none;">
                                    <button type="button"
                                        class="btn btn-light btn-soft-info fw-bold btn-rounded waves-effect px-4 text-nowrap flex-shrink-0 text-black d-non">
                                        <span class="font-size-16 align-middle me-2">➕</span> Add Tag
                                    </button>

                                    <button v-for="cat in categories" :key="cat.value" type="button"
                                        class="btn fw-bold btn-light btn-rounded waves-effect px-4 text-nowrap flex-shrink-0"
                                        :class="{ 'btn-dark text-light': querry === cat.value }"
                                        @click="selectCategory(cat.value)">
                                        {{ cat.name }} <span class="opacity-50">({{ cat.count }})</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-6 col-md-6 col-lg-4 d-none">
                                <div class="card p-1 border shadow-none ">


                                    <div class="position-relative pt-3 px-3">
                                        <img src="../../assets/images/blog-place-holder.jpg" alt=""
                                            class="img-thumbnail p-0 m-0 rounded border-0">
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

                                        <h5 class="mb-0"><a href="blog-details.html" class="text-black fs-5">The Quiet
                                                Power of Good Engineering: Why the Best Tech Feels Invisible</a>
                                        </h5>
                                        <p class="text-muted mb-0 d-none">10 Apr, 2020</p>
                                    </div>

                                    <div class="p-3">

                                        <p class="text-muted">Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                                            amet</p>

                                        <div class="d-none">
                                            <a href="javascript: void(0);" class="text-primary">Read more <i
                                                    class="mdi mdi-arrow-right"></i></a>
                                        </div>
                                    </div>

                                    <div class="p-3">
                                        <div class="d-flex" data-v-80f25f62="">
                                            <div class="flex-shrink-0 me-3" data-v-80f25f62="">
                                                <div class="avatar-sm d-flex active-author border-round"
                                                    data-v-80f25f62=""><img class="rounded-circle profile-pic-cont"
                                                        src="/src/assets/images/users/avatar-2.jpg" alt="Author avatar"
                                                        data-v-80f25f62=""></div>
                                            </div>
                                            <div class="flex-grow-1 chat-user-box" data-v-80f25f62="">
                                                <p class="user-title m-0 fs-5" data-v-80f25f62="">Scott Median <span
                                                        class="text-muted" data-v-80f25f62="">(Author)</span></p>
                                                <p class="text-muted d-flex m-0 text-capitalize" data-v-80f25f62="">2
                                                    Days Ago ·
                                                    1.2M Views <span class="text-black me-2 mx-3 d-flex"
                                                        data-v-80f25f62=""><i class="bx bx-globe fs-5 mx-1"
                                                            data-v-80f25f62=""></i> Public</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6 col-md-6 col-lg-4" v-for="art in articles" :key="art.url">
                                <div class="card p-1 border shadow-none " style="height: calc(100% - 1.7rem);">

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
                                        <div class="d-flex" data-v-80f25f62="">
                                            <div class="flex-shrink-0 me-3" data-v-80f25f62="">
                                                <div class="avatar-sm d-flex active-author border-round"
                                                    data-v-80f25f62=""><img class="rounded-circle profile-pic-cont"
                                                        :src="`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`"
                                                        alt="Author avatar" data-v-80f25f62=""></div>
                                            </div>
                                            <div class="flex-grow-1 chat-user-box" data-v-80f25f62="">
                                                <p class="user-title m-0 fs-6 fw-bold text-truncate"
                                                    style="max-width: 300px;" data-v-80f25f62="">{{ art.author ||
                                                        'Unknown Author' }} <span class="text-muted" data-v-80f25f62=""
                                                        data-v-0330a191="">({{ art.source.name || '' }})</span> <span
                                                        class="text-muted" data-v-80f25f62=""></span></p>
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
                            </div>



                        </div>

                        <div class="row">
                            <div class="col-sm-6 col-md-6 col-lg-4 mb-4"  v-for="n in pageSize" :key="n" v-if="loadingMore" >
                                 <ArticleSkeletonLoader   />
                            </div>                          
                        </div>


                        <div class="row">
                            <div class="col-12 text-center align-items-center justify-content-center">
                                <div class="p-3">
                                    <button class="btn btn-dark btn-lg mt-3" v-if="hasMore && !loadingMore"
                                        @click="fetchArticles()">
                                        Load More Articles
                                    </button>
                                    <div v-else-if="loadingMore" class="spinner-border text-dark mt-3"></div>
                                    <p v-else class="text-muted mt-3 pb-0 mb-0">No more images to load.</p>

                                </div>
                            </div>
                        </div>

                        <div class="row d-none">
                            <div class="d-flex justify-content-between mt-4">
                                <button class="btn btn-dark fw-bold" :disabled="currentPage === 1"
                                    @click="currentPage--; fetchArticles()">
                                    ◀ Prev
                                </button>

                                <span class="fw-bold">Page {{ currentPage }} / {{ totalPages }}</span>

                                <button class="btn btn-dark fw-bold" :disabled="currentPage === totalPages"
                                    @click="currentPage++; fetchArticles()">
                                    Next ▶
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// 🔧 Core Vue imports
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import DominantColor from '@/components/Dominant.color.vue'
import Litepicker from 'litepicker'
import 'litepicker/dist/css/litepicker.css'// import styles
import Datepicker from '@/components/Datepicker.material.vue'
import ArticleSkeletonLoader from '@/pages/Blog/Article.skeleton.loader.vue'

import LoaderVue from '@/layouts/Loader.vue'
const isLoading = ref(true)
const loadingMore = ref(true)
const hasMore = ref(true)

//const hasMore = computed(() => currentPage.value < totalPages.value)


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

// Categories


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


// time ago function flor converting dates into human readable formats
function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
    };

    for (const [unit, value] of Object.entries(intervals)) {
        const count = Math.floor(seconds / value);
        if (count >= 1) {
            return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}








const articles = ref([])
const currentPage = ref(1)
const pageSize = 15
const totalPages = ref(1)
const randomNum = ref(Math.floor(Math.random() * 100))
const dateFrom = ref(null);
const dateTo = ref(null);
const sortBy = ref('publishedAt')        // field to sort by
const sortOrder = ref('desc')   
const page=ref(1)         // 'asc' or 'desc'

//const querry=ref(['a'])
const querry = ref('a')

// Function to change selected category
function selectCategory(value) {
    querry.value = value;
    fetchArticles()
    console.log('Selected category:', value);
    // Here you can trigger your API call based on the selected category
}

function toggleCategory(value) {
    if (value === 'a') {
        // If All is clicked, clear all other selections and select All
        querry.value = ['a'];
    } else {
        // Remove All if it's currently selected
        querry.value = querry.value.filter(cat => cat !== 'a');

        // Toggle the clicked category
        if (querry.value.includes(value)) {
            querry.value = querry.value.filter(cat => cat !== value);
            // If no category is selected, fallback to All
            if (querry.value.length === 0) querry.value = ['a'];
        } else {
            querry.value.push(value);
        }
    }

    // console.log('Selected categories:', querry.value);
    querry.value = querry.value.includes('a') ? 'technology' : querry.value.join(' OR ');
    fetchArticles()
}


async function fetchArticles() {
    try {
        isLoading.value = false
        loadingMore.value = true
        const url = `https://newsapi.org/v2/everything?q=${querry.value}&sortBy=${sortBy.value}&apiKey=8399df546ca04a6992e48876bd99965c&page=${currentPage.value}&pageSize=${pageSize}`

        const res = await fetch(url)
        const data = await res.json()
         totalPages.value = Math.ceil(data.totalResults / pageSize)
        //articles.value = data.articles
         articles.value = [...articles.value,...data.articles] // append
       
       
         page.value++
        if (page.value > totalPages.value) hasMore.value = false
        console.log('Total Pages:', totalPages.value)
    } catch (err) {
        console.error("Failed to load articles:", err)
    } finally {
        isLoading.value = false
        loadingMore.value = false
    }
}

//sorting in ascebding or descending order once results are fetched
articles.value.sort((a, b) => {
    if (sortBy.value === 'publishedAt') {
        const diff = new Date(a.publishedAt) - new Date(b.publishedAt)
        return sortOrder.value === 'asc' ? diff : -diff
    }
    return 0  // for relevancy or popularity, let API handle it
})

//for preventing the default bootstrap behaviour of drop downs
onMounted(() => {
    document.querySelectorAll('.dropdown-menu').forEach((el) => {
        el.addEventListener('click', (e) => e.stopPropagation());
    });
});






// 🕓 Simulate page loading
onMounted(() => {
    //document.title = 'Upload to Gallery - CSPL CRM'
    setTimeout(() => (isLoading.value = false), 1000)


})

onMounted(() => {
    fetchArticles()
})

watch([sortBy, sortOrder], () => {
    fetchArticles()
})




</script>

<style scoped>
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
            #00c8c8,
            #0077be);
    background: conic-gradient(#ff0050,
            #ffdd00,
            #00f2ea,
            #ff0050);


    /* animation: spin 3s linear infinite; */
    z-index: 1;

    /* Mask trick to hollow the center */
    -webkit-mask:
        radial-gradient(circle, transparent 52%, #000 55%);
    mask:
        radial-gradient(circle, transparent 52%, #000 55%);
}

/* White inner border hugging the profile picture */
.active-author::after {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: 50%;
    background: #fff;
    z-index: 2;

    -webkit-mask:
        radial-gradient(circle, transparent 60%, #000 62%);
    mask:
        radial-gradient(circle, transparent 60%, #000 62%);
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