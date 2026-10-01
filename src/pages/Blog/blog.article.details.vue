<template>
    <div class="container-fluid">
        <!-- Page Title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Blog Details</h4>
                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item">
                                <router-link to="/">Dashboard</router-link>
                            </li>
                            <li class="breadcrumb-item active">
                                <router-link to="/blogs">Blog Articles</router-link>
                            </li>
                            <li class="breadcrumb-item active">Article Details</li>
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
            <div class="col-12 col-md-7 col-lg-8">
                <div class="card">
                    <div class="card-body">
                        <div class="mb-4">
                            <span class="badge badge-soft-dark text-uppercase mb-3 fw-bold">technology</span>
                            <div class="d-flex gap-3 align-items-center mb-4 justify-content-between ">
                                <h4 class="mb-0 text-black text-capitalize m-">{{ readableTitle }}</h4>
                                <div class="d-md-flex d-none gap-3 flex-nowrap">
                                    <button type="button" class="btn btn-light-brand waves-effect btn-sm text-nowrap" data-bs-toggle="tooltip"  data-bs-placement="top" title="View Article activity logs"  @click="openActivityLogs">
                                        <i class="mdi mdi-chart-timeline-variant font-size-16 align-middle me-2"></i>Activity Logs
                                    </button>
                                    <button type="button" class="btn btn-light-brand waves-effect btn-sm text-nowrap" data-bs-toggle="tooltip"  data-bs-placement="top" title="Edit the Article">
                                        <i class="mdi FLoremdi-pencil-outline font-size-16 align-middle me-2"></i>Edit Article
                                    </button>
                                </div>

                                <div class="d-md-none">
                                    <div class="dropdown ms-2">
                                        <a class="text-muted fs-4" href="#" role="button"
                                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="mdi mdi-dots-horizontal"></i>
                                        </a>

                                        <div class="dropdown-menu dropdown-menu-end" style="">
                                            <a class="dropdown-item" href="#">Edit Article</a>
                                            <a class="dropdown-item" href="#" @click="openActivityLogs">View Analytics</a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="d-flex gap-4 align-items-center text-black flex-wrap">
                                <div class="d-flex align-items-center">
                                    <div class="flex-shrink-0 me-3">
                                        <div data-v-0330a191="" class="avatar-xs d-flex active-author border-round"><img
                                                data-v-0330a191="" class="rounded-circle profile-pic-cont"
                                                src="https://randomuser.me/api/portraits/men/0.jpg" alt="Author avatar">
                                        </div>
                                    </div>
                                    <div data-v-0330a191="" class="flex-grow-1 chat-user-box">
                                        <p data-v-0330a191="" class="user-title m-0 fs-6 fw-bold text-truncate d-flex"
                                            style="max-width: 300px;"><span
                                                class="text-muted d-none d-md-flex">By: </span> <span> Lorena Pacheco</span>
                                        </p>

                                    </div>
                                </div>

                                <div class="">
                                    <span class="text-muted d-flex"><i
                                            class="dripicons-calendar align-middle text-muted me-2 fs-5 d-none d-md-block"></i>
                                        12th Mar
                                        2024</span>
                                </div>

                                <div class="">
                                    <span class="text-muted d-flex">
                                        5 Min Read .</span>
                                </div>

                                <div class="">
                                    <span class="text-muted d-flex"><i
                                            class="dripicons-preview align-middle text-muted me-2 fs-5 "></i> <span
                                            class="d-none d-md-block">Views:</span>
                                        56</span>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div>
                                <img src="https://placehold.co/600x400" alt="" class="img-fluid rounded w-100 h-auto" />
                            </div>
                        </div>

                        <div class="pt-3">
                            <div class="article-body">

                                <p>
                                    Good engineering doesn’t shout. It whispers. It slips quietly into the background,
                                    handling the chaos so you don’t have to. The best tech is the kind you almost forget
                                    exists—
                                    not because it’s simple, but because it’s crafted so well that it stops demanding
                                    your attention.
                                </p>

                                <h2>The Invisible Strength Behind Good Design</h2>

                                <p>
                                    When a system works flawlessly, people rarely celebrate it. No alerts. No drama.
                                    Just calm, consistent performance. And that’s the irony—its excellence is measured
                                    by how effortlessly it stays out of your way.
                                </p>

                                <p>
                                    In product teams, we often obsess over features. But the truth is this:
                                    <strong>The real magic lies in the foundation—stability, clarity, and the kind of UX
                                        that doesn’t make a user think twice.</strong>
                                </p>

                                <div class="wide-image">
                                    <img src="https://picsum.photos/1200/600" alt="Tech engineering illustration" />
                                    <small class="caption">Behind every smooth interface is a battlefield of
                                        decisions.</small>
                                </div>

                                <h3>Three Pillars of Quiet Engineering</h3>

                                <ul>
                                    <li><strong>Predictability</strong> — A system that behaves exactly as expected
                                        builds trust.</li>
                                    <li><strong>Resilience</strong> — Failures will happen; great systems absorb the
                                        blow.</li>
                                    <li><strong>Clarity</strong> — Code, design, and decisions should be so clear,
                                        anyone can extend them.</li>
                                </ul>

                                <p>
                                    These aren’t flashy concepts. They don’t trend on Twitter. But they’re the bones
                                    that keep
                                    a product standing long after the hype fades.
                                </p>

                                <blockquote>
                                    “Good technology feels like a well-lit room—warm enough to welcome you,
                                    structured enough to guide you, gentle enough to stay humble.”
                                </blockquote>

                                <h2>The Unseen Work That Really Matters</h2>
                                <p>
                                    A developer shipping a polished feature isn’t showing the hours spent making sure
                                    every edge case behaves. A designer delivering a clean dashboard isn’t revealing
                                    the hundreds of iterations tossed aside.
                                </p>

                                <p>
                                    But that hidden work?
                                    <strong>That’s the real work.</strong>
                                </p>

                                <h3>When Users Notice Nothing, You’ve Done Everything</h3>
                                <p>
                                    Think of the last time you used a feature that was so smooth it didn’t even cross
                                    your mind.
                                    That moment—where you just flow—is the real applause engineers rarely hear.
                                </p>

                                <div class="highlight-box">
                                    <h4>Key Takeaway</h4>
                                    <p>
                                        The best engineering doesn’t shine. It supports. It stabilizes.
                                        It frees people to think about what matters instead of fighting their tools.
                                    </p>
                                </div>

                                <h2>Building for the Future</h2>
                                <p>
                                    Products in 2025 don’t need more clutter. They need more intention.
                                    Every element should have a reason to exist—and every missing element
                                    should be gone on purpose.
                                </p>

                                <ol>
                                    <li>Build systems that age gracefully.</li>
                                    <li>Choose clarity over cleverness.</li>
                                    <li>Make your users feel understood, not overwhelmed.</li>
                                </ol>

                                <p>
                                    At the end of the day, the tech that wins isn’t the loudest.
                                    It’s the one that quietly becomes part of your life—useful, reliable, almost
                                    invisible.
                                </p>

                                <hr />

                                <p class="closing-line">
                                    And maybe that’s the real power of good engineering—it lets the user shine, not the
                                    system.
                                </p>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div class="col-12 col-md-5 col-lg-4">
                <div class="row">
                    <div class="col-12">
                        <div class="card ">
                            <div class="card-body">
                                <h3 class="card-title mb-3 text-black">Links & Attachments</h3>

                                <!-- Links Section -->
                                <div class="mb-3">
                                    <strong>Links</strong>
                                    <ol class="list-unstyled ps-2 mb-0">
                                        <li class="mb-2"><a
                                                href="https://www.linkedin.com/company/craftsiliconglobal/posts/?feedView=all"
                                                target="_blank" class="text-link text-decoration-underline">1. Company
                                                LinkedIn page</a></li>
                                        <li class="mb-2"><a href="https://twitter.com/CraftSilicon" target="_blank"
                                                class="text-link text-decoration-underline">2. Twitter</a></li>
                                        <li class="mb-2"><a href="https://www.instagram.com/craftsilicon/"
                                                target="_blank" class="text-link text-decoration-underline">3.
                                                Instagram</a></li>
                                        <li class="mb-2"><a href="https://portal.craftsilicon.com" target="_blank"
                                                class="text-link text-decoration-underline">4. Self Service Portal</a>
                                        </li>
                                    </ol>
                                </div>

                                <!-- Attachments Section -->
                                <div class="mb-3">
                                    <strong>Attached Documents</strong>
                                    <ol class="list-unstyled ps-2 mb-0">
                                        <li class="mb-2"><a href="https://example.com/brochure.pdf" target="_blank"
                                                class="text-link text-decoration-underline">1. Company Brochure</a></li>
                                        <li class="mb-2"><a href="https://example.com/training-material.pdf"
                                                target="_blank" class="text-link text-decoration-underline">2. Training
                                                Material</a></li>
                                        <li class="mb-2"><a href="https://example.com/blog-guide.docx" target="_blank"
                                                class="text-link text-decoration-underline">3. Blog Writing Guide</a>
                                        </li>
                                        <li class="mb-2"><a href="https://example.com/product-specs.pdf" target="_blank"
                                                class="text-link text-decoration-underline">4. Product
                                                Specifications</a>
                                        </li>
                                    </ol>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-12 ">
                        <div class="card">
                            <div class="card-header bg-transparent border-bottom">
                                <div class="d-flex flex-wrap align-items-start">
                                    <div class="me-2">
                                        <h5 class="card-title mt-1 mb-0">Explore Posts</h5>
                                    </div>
                                    <ul class="nav nav-tabs nav-tabs-custom card-header-tabs ms-auto" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link active" data-bs-toggle="tab" href="#post-recent"
                                                role="tab" aria-selected="true">
                                                Similer
                                            </a>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <a class="nav-link" data-bs-toggle="tab" href="#post-popular" role="tab"
                                                aria-selected="false" tabindex="-1">
                                                Recent
                                            </a>
                                        </li>

                                    </ul>
                                </div>

                            </div>
                            <div class="card-body p-0">
                                <div>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item py-3">
                                            <div class="d-flex">
                                                <div class="me-3">
                                                    <img src="/src/assets/images/small/img-2.jpg" alt=""
                                                        class="avatar-md h-auto d-block rounded">
                                                </div>

                                                <div class="align-self-center overflow-hidden me-auto">
                                                    <div>
                                                        <h5 class="font-size-14 text-truncate"><a
                                                                href="javascript: void(0);" class="text-dark">Beautiful
                                                                Day with Friends</a></h5>
                                                        <p class="text-muted mb-0">10 Nov, 2020</p>
                                                    </div>
                                                </div>

                                                <div class="dropdown ms-2">
                                                    <a class="text-muted font-size-14" href="#" role="button"
                                                        data-bs-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                        <i class="mdi mdi-dots-horizontal"></i>
                                                    </a>

                                                    <div class="dropdown-menu dropdown-menu-end" style="">
                                                        <a class="dropdown-item" href="#">Action</a>
                                                        <a class="dropdown-item" href="#">Another action</a>
                                                        <a class="dropdown-item" href="#">Something else here</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li class="list-group-item py-3">
                                            <div class="d-flex">
                                                <div class="me-3">
                                                    <img src="/src/assets/images/small/img-2.jpg" alt=""
                                                        class="avatar-md h-auto d-block rounded">
                                                </div>
                                                <div class="align-self-center overflow-hidden me-auto">
                                                    <div>
                                                        <h5 class="font-size-14 text-truncate"><a
                                                                href="javascript: void(0);" class="text-dark">Drawing a
                                                                sketch</a></h5>
                                                        <p class="text-muted mb-0">02 Nov, 2020</p>
                                                    </div>
                                                </div>

                                                <div class="dropdown ms-2">
                                                    <a class="text-muted font-size-14" href="#" role="button"
                                                        data-bs-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                        <i class="mdi mdi-dots-horizontal"></i>
                                                    </a>

                                                    <div class="dropdown-menu dropdown-menu-end">
                                                        <a class="dropdown-item" href="#">Action</a>
                                                        <a class="dropdown-item" href="#">Another action</a>
                                                        <a class="dropdown-item" href="#">Something else here</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li class="list-group-item py-3">
                                            <div class="d-flex">
                                                <div class="me-3">
                                                    <img src="/src/assets/images/small/img-2.jpg" alt=""
                                                        class="avatar-md h-auto d-block rounded">
                                                </div>

                                                <div class="align-self-center overflow-hidden me-auto">
                                                    <div>
                                                        <h5 class="font-size-14 text-truncate"><a
                                                                href="javascript: void(0);" class="text-dark">Project
                                                                discussion with team</a></h5>
                                                        <p class="text-muted mb-0">24 Oct, 2020</p>
                                                    </div>
                                                </div>

                                                <div class="dropdown ms-2">
                                                    <a class="text-muted font-size-14" href="#" role="button"
                                                        data-bs-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                        <i class="mdi mdi-dots-horizontal"></i>
                                                    </a>

                                                    <div class="dropdown-menu dropdown-menu-end">
                                                        <a class="dropdown-item" href="#">Action</a>
                                                        <a class="dropdown-item" href="#">Another action</a>
                                                        <a class="dropdown-item" href="#">Something else here</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                        <li class="list-group-item py-3">
                                            <div class="d-flex">
                                                <div class="me-3">
                                                    <img src="/src/assets/images/small/img-1.jpg" alt=""
                                                        class="avatar-md h-auto d-block rounded">
                                                </div>

                                                <div class="align-self-center overflow-hidden me-auto">
                                                    <div>
                                                        <h5 class="font-size-14 text-truncate"><a
                                                                href="javascript: void(0);" class="text-dark">Riding
                                                                bike on road</a></h5>
                                                        <p class="text-muted mb-0">20 Oct, 2020</p>
                                                    </div>
                                                </div>

                                                <div class="dropdown ms-2">
                                                    <a class="text-muted font-size-14" href="#" role="button"
                                                        data-bs-toggle="dropdown" aria-haspopup="true"
                                                        aria-expanded="false">
                                                        <i class="mdi mdi-dots-horizontal"></i>
                                                    </a>

                                                    <div class="dropdown-menu dropdown-menu-end">
                                                        <a class="dropdown-item" href="#">Action</a>
                                                        <a class="dropdown-item" href="#">Another action</a>
                                                        <a class="dropdown-item" href="#">Something else here</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title mb-3 text-black">Tag Cloud</h3>
                                <div class="article-tag d-flex flex-wrap gap-2">
                                    <h4 class="m-0 text-uppercase" v-for="tag in availableTags" :key="tag.value"><span
                                            class="badge-alt2 bg-gray-200 text-dark bg-primary-soft w-auto">{{ tag.label
                                            }}</span></h4>
                                </div>

                                

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <BlogAnalytics :blogId="selectedBlogId" />
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import BlogAnalytics   from '@/pages/Blog/blog.analytics.vue'

import LoaderVue from '@/layouts/Loader.vue'
const isLoading = ref(true)

const selectedBlogId = ref(null)    


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

// ✅ MUST use useRoute(), not useRouter()
const route = useRoute()

// 🟩 Decode masked ID safely
const realId = computed(() => {
    const raw = route.params.encodedId
    if (!raw) return null
    try {
        return atob(raw)
    } catch (e) {
        console.error("Decode error:", e)
        return null
    }
})

// 🟩 Handle slug safely
const slug = computed(() => {
    return (route.params.titleBlog || '').toLowerCase()
})

// Prettify for page title
const pageTitle = computed(() => {
    if (!slug.value) return ""
    return slug.value
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
})


// 🟩 Readable title (optional)
const readableTitle = computed(() => {
    return (route.params.titleBlog || '')
        .replace(/-/g, ' ')     // replace hyphens
        .replace(/\s+/g, ' ')   // clean spacing
        .trim()
})

const openActivityLogs = () => {
  selectedBlogId.value = realId.value;

  // Show the Bootstrap offcanvas
  const offcanvasEl = document.getElementById('activityLogsAside');
  const bsOffcanvas = new bootstrap.Offcanvas(offcanvasEl);
  bsOffcanvas.show();
};



// Update the browser page title
watch(pageTitle, (newTitle) => {
    if (newTitle) {
        document.title = `${newTitle} | Blog Article`
    }
}, { immediate: true })

// 🕓 Simulate page loading + alert ID and title
onMounted(() => {
    setTimeout(async () => {  // Make this async
        isLoading.value = false
        
        // Wait for Vue to finish rendering the DOM
        await nextTick();
        
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        console.log('Found popovers:', popoverTriggerList.length);
        
        [...popoverTriggerList].map(el => new bootstrap.Popover(el));
    }, 1000)
})
</script>

<style lang="scss" scoped>
.article-body img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 6px;
}

.article-body h2 {
    font-size: 19px;
    color: black;
    font-weight: bold;
}

.article-body h2 {
    font-size: 19px;
}

.article-body h3 {
    font-size: 17px;
}

.article-body h4 {
    font-size: 15px;
    font-weight: bold;
}

.article-body blockquote {
    font-size: 15px;
    padding-right: 25%;
    margin-bottom: 20px;
    line-height: 30px;
    border-left: 2px solid #2c95e1;
    padding-left: 20px;
    background: #f8f5f2;
    padding-bottom: 20px;
    padding-top: 20px;
    color: black;
    background-color: #f8f5f2 !important;
    margin-top: 30px;
}

.article-body hr {
    background: #d3d3d4bf;
}
</style>