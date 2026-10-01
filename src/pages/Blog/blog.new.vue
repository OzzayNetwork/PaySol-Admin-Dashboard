<template>
  <div class="container-fluid">
    <!-- 🧭 Page Title -->
    <div class="row">
      <div class="col-12">
        <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 class="mb-sm-0 font-size-18">Create Blog Post</h4>
          <div class="page-title-right">
            <ol class="breadcrumb m-0">
              <li class="breadcrumb-item"><router-link to="/">Dashboard</router-link></li>
              <li class="breadcrumb-item"><router-link to="/blog/list">Blog Posts</router-link></li>
              <li class="breadcrumb-item active">Create Post</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <!-- 🔄 Loader -->
    <div v-if="isLoading">
      <LoaderVue />
    </div>

    <!-- 📝 Main Form -->
    <div v-else class="row justify-content-center">
      <SingleToastVue :toastType="toastType" :toastMessage="toastMessage" />

      <div class="col-md-12 col-xl-10 col-lg-12 col-sm-12">
        <form @submit.prevent="publishPost">
          <div class="card text-dark">
            <div class="card-header d-flex align-items-center justify-content-between flex-wrap p-3">
              <div>
                <h4 class="card-title mb-1">Create New Blog Post</h4>
                <p class="card-title-desc text-muted">
                  Write engaging content, add a cover image, and publish your thoughts to the world.
                </p>
              </div>

              <div class="d-flex gap-3">
                <!-- add category/tags -->
                <button type="button" class="btn btn-light waves-effect fw-semibold d-flex align-items-center"
                  data-bs-toggle="modal" data-bs-target="#addTagModal">
                  <span class="fs-5 me-2">🏷️</span>
                  Tags & Categories
                </button>




              </div>
            </div>

            <div class="card-body">
              <div class="row">
                <div class="col-12 mb-3">
                  <label class="form-label fw-semibold">Blog/Article Title <strong
                      class="text-danger">*</strong></label>
                  <input v-model="formData.title" type="text" class="form-control form-control-lg text-black"
                    placeholder="Enter an engaging title" required>
                </div>

                <div class="col-12 mb-3">
                  <hr class="border-light text-light bg-dark-muted">
                </div>

                <!-- 🖼️ Cover Image Preview + Upload -->
                <div class="col-lg-5 mb-3">
                  <label class="form-label fw-semibold ">Cover Image <strong class="text-danger">*</strong></label>
                  <p class="small text-muted mb-2 d-none">Recommended size: 1200x628 (1.91:1 ratio)</p>
                  <div class="w-100"
                    style="aspect-ratio: 1.91 / 1; overflow: hidden; border-radius: 8px; position: relative; border: 1px dashed #dee2e6;">
                    <img :src="previewUrl"
                      style="width: 100%; height: 100%; object-fit: cover; background-color: #eff2f7;" />

                    <!-- 📷 Upload Button -->
                    <label for="coverImageUpload" class="btn btn-primary waves-effect waves-light rounded-circle"
                      style="position: absolute; top: 5%; left: 5%;" title="Select Cover Image">
                      <i class="bx bx-camera align-middle"></i>
                    </label>

                    <ImageUploader inputId="coverImageUpload" @image-selected="handleImageSelected"
                      @show-toast="handleToast" :aspect-ratio="selectedRatio" />
                  </div>
                </div>

                <!-- 📝 Blog Post Details Form -->
                <div class="col-lg-7">
                  <div class="row">
                    <!-- Title -->


                    <!-- Subtitle -->
                    <div class="col-12 col-md-8 mb-3">
                      <label class="form-label fw-semibold">Subtitle (Optional)</label>
                      <input v-model="formData.subtitle" type="text" class="form-control"
                        placeholder="Add a subtitle or tagline">
                    </div>
                    <div class="col-12 col-md-4 mb-3">
                      <label class="form-label fw-semibold">Visibility <strong class="text-danger">*</strong></label>
                      <select v-model="formData.visibility" class="form-control form-select">
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                      </select>
                    </div>

                    <div class="col-12 mb-3">
                      <label class="form-label fw-semibold">Blog Main Category/Tag</label>
                      <SelectSearchBox :options="availableTags" v-model="selectedCategory"
                        placeholder="Select or add tags" input-class="form-control form-select" :is-multi="false" />
                    </div>

                    <!-- Tags -->
                    <div class="col-12 mb-3">
                      <label class="form-label fw-semibold">Tags</label>
                      <SelectSearchBox :options="availableTags" v-model="selectedTags" placeholder="Select A Category"
                        input-class="form-control form-select" :is-multi="true" />
                    </div>



                  </div>
                </div>

                <div class="col-12 mt-3">
                  <Editor v-model="formData.body" placeholder="Write your blog content here..." />
                  <small class="text-muted">
                    {{ plainTextLength }} characters • {{ readingTime }}
                  </small>


                </div>

                <!-- 📄 Blog Post Body (Full Width) -->
                <div class="col-12  mt-3 d-none">
                  <label class="form-label fw-semibold">Post Content <strong class="text-danger">*</strong></label>
                  <p class="small text-muted mb-2">Write your blog post content here. Rich text editor coming soon!</p>
                  <textarea v-model="formData.body" rows="13" class="form-control"
                    placeholder="Start writing your amazing blog post here..." required></textarea>
                  <small class="text-muted">{{ formData.body.length }} characters</small>
                </div>

                <!-- SEO Section -->
                <div class="col-12 col-12 mt-4">
                  <div class="bg-light">
                    <div class="card-header bg-transparent">
                      <h5 class="mb-0">🔍 SEO Settings (Optional)</h5>
                    </div>
                    <div class="card-body">
                      <div class="row">
                        <div class="col-12 mb-3">
                          <label class="form-label">Meta Description</label>
                          <textarea v-model="formData.metaDescription" rows="2" class="form-control"
                            placeholder="Brief description for search engines (150-160 characters recommended)"
                            maxlength="160"></textarea>
                          <small class="text-muted">{{ formData.metaDescription.length }}/160 characters</small>
                        </div>

                        <div class="col-12">
                          <label class="form-label">Focus Keywords (comma-separated)</label>
                          <input v-model="formData.keywords" type="text" class="form-control"
                            placeholder="e.g., web development, vue.js, javascript">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 🔗 Social Media Links -->
                <div class="col-12 mt-3">
                  <label class="form-label fw-semibold">External Links (Optional)</label>
                  <p class="small text-muted mb-2">Add any related links you want readers to follow</p>

                  <div v-for="(link, index) in socialLinks" :key="index" class="row align-items-center mb-2">

                    <div class="col-12 col-md-4">
                      <input v-model="link.title" class="form-control"
                        placeholder="Link title (e.g., Trailer, Github Repo)">
                    </div>

                    <div class="col-12 col-md-7 mt-2 mt-md-0">
                      <input v-model="link.url" type="url" class="form-control" placeholder="https://example.com">
                    </div>

                    <div class="col-12 col-md-1 d-flex justify-content-end mt-2 mt-md-0">
                      <button v-if="socialLinks.length > 1" type="button" class="btn btn-link text-danger p-0"
                        @click="removeLink(index)">
                        <i class="bx bx-x font-size-18"></i>
                      </button>
                    </div>

                  </div>

                  <button @click="addLink" type="button" class="btn btn-link text-black fw-bold">
                    <i class="bx bx-plus font-size-16 align-middle"></i> Add Link
                  </button>
                </div>

                <!-- document uploading -->
                <div class="col-12 mt-4">
                  <label class="form-label fw-semibold">Attachments (Optional)</label>
                  <p class="small text-muted mb-2">Attach supporting documents (PDF, images, etc.)</p>

                  <div v-for="(doc, index) in attachments" :key="index" class="row align-items-center mb-2">

                    <div class="col-12 col-md-4">
                      <input v-model="doc.title" class="form-control" placeholder="Document title">
                    </div>

                    <div class="col-12 col-md-7 mt-2 mt-md-0">
                      <input type="file" class="form-control" @change="(e) => handleFileChange(e, index)">
                    </div>

                    <div class="col-12 col-md-1 d-flex justify-content-end mt-2 mt-md-0">
                      <button v-if="attachments.length > 1" type="button" class="btn btn-link text-danger p-0"
                        @click="removeAttachment(index)">
                        <i class="bx bx-x font-size-18"></i>
                      </button>
                    </div>

                  </div>

                  <button @click="addAttachment" type="button" class="btn btn-link text-black fw-bold">
                    <i class="bx bx-plus font-size-16 align-middle"></i> Add Another Document
                  </button>
                </div>


              </div>
            </div>

            <!-- 🧾 Footer -->
            <div class="card-footer bg-white border-top d-flex justify-content-between align-items-center py-3">
              <button type="button" class="btn btn-outline-secondary btn-lg px-4" @click="cancelCreate">Cancel</button>

              <div class="d-flex gap-3">
                <button type="button" class="btn btn-outline-primary btn-lg px-4 d-none" @click="previewPost">
                  <i class="bx bx-show me-2"></i>Preview
                </button>
                <button type="submit" class="btn btn-primary btn-lg px-4" @click="publishPost">
                  <i class="bx bx-upload me-2"></i>{{ formData.status === 'published' ? 'Publish Now' : 'Save Post' }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <AddTagModal />
</template>
<script setup>
// 🔧 Core Vue imports
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'

// 🧩 Components
import LoaderVue from '@/layouts/Loader.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import SelectSearchBox from '@/components/SelectSearchBox.vue'
import SingleToastVue from '@/components/SingleToast.vue'
import AddTagModal from './blog.tags.vue'

// 🖼️ Default placeholder image
import placeholderImage from '@/assets/images/image-placeholder.svg'

// importing the editor
import Editor from '@/components/Editor.vue'

// =============================
// ⚙️ REACTIVE DATA
// =============================
const router = useRouter()
const isLoading = ref(true)
const previewUrl = ref(placeholderImage)
const selectedRatio = ref(1.91 / 1) // 1.91:1 ratio for blog cover images

// 📁 Form data
const formData = ref({
  title: '',
  subtitle: '',
  body: '',
  publishDate: new Date().toISOString().slice(0, 16), // Default to now
  slug: '',
  status: 'draft',
  visibility: 'public',
  metaDescription: '',
  keywords: ''
})

//getting text length of body
const plainTextLength = computed(() => {
  const tmp = document.createElement('div')
  tmp.innerHTML = formData.value.body || ''
  return tmp.textContent.length
})

// 🕒 Estimate reading time based on word count
// Uses average reading speed: 200 words per minute
const readingTime = computed(() => {
  const tmp = document.createElement('div')
  tmp.innerHTML = formData.value.body || ''

  // Extract clean text
  const text = tmp.textContent.trim()

  // Count words (ignore empty entries)
  const words = text.split(/\s+/).filter(w => w).length

  // Calculate minutes required to read
  const minutes = Math.ceil(words / 200)

  return `${minutes} min read`
})


// =============================
// 🔥 NEW: META + KEYWORD SIGNALS
// =============================

// Tracks if user manually edits the meta description
// So the system won’t overwrite their custom text
const userModifiedMeta = ref(false)

// Track if the user edits keywords manually,
// preventing our auto-generator from overwriting
const userModifiedKeywords = ref(false)



// Trigger manual-meta flag when user types in metaDescription
watch(() => formData.value.metaDescription, () => {
  userModifiedMeta.value = true // User interacted → stop auto updates
})

// Trigger manual-keyword flag when user edits keywords
watch(() => formData.value.keywords, () => {
  userModifiedKeywords.value = true
})


// =============================
// 🔍 AUTO-GENERATION UTILITIES
// =============================

// Turns text into a keyword set
const generateKeywords = (text) => {
  const stopwords = ["the", "a", "and", "to", "in", "of", "for", "on", "at", "is", "it", "that"]

  return [...new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")         // Remove punctuation
      .split(/\s+/)                    // Break into words
      .filter(w => w.length > 3 && !stopwords.includes(w))
  )]
}

// Smart SEO meta description generator
// Combines Title + cleaned Body text
// Trims to 160 chars (Google best practice)
const generateMetaDescription = (title, bodyText) => {
  const cleanBody = bodyText
    .replace(/\s+/g, " ")
    .trim()

  const merged = `${title}. ${cleanBody}` // Merge title + body

  let snippet = merged.slice(0, 157)      // Keep 150–160 chars
  if (merged.length > 157) snippet += "..." // Add ellipsis if cut

  return snippet
}


// =============================
// 🔄 AUTO-KEYWORD LOGIC
// =============================

// Auto-generate keywords from the title if user hasn’t edited keywords
watch(() => formData.value.title, (title) => {
  if (!userModifiedKeywords.value && title) {
    formData.value.keywords = generateKeywords(title).join(", ")
  }
})

// Auto-generate keywords from the body if user hasn’t edited keywords
watch(() => formData.value.body, (body) => {
  if (!userModifiedKeywords.value && body) {
    const tmp = document.createElement('div')
    tmp.innerHTML = body
    const text = tmp.textContent
    formData.value.keywords = generateKeywords(text).slice(0, 7).join(", ")
  }
})


// =============================
// 🔥 AUTO META-DESCRIPTION LOGIC
// =============================

// Watches BOTH the title + body together.
// Every time either changes → regenerate SEO description.
// But ONLY if user hasn’t manually customized it.
watch(
  () => [formData.value.title, formData.value.body],
  ([title, body]) => {
    if (!userModifiedMeta.value && (title || body)) {

      // Extract plain text from editor HTML
      const tmp = document.createElement("div")
      tmp.innerHTML = body || ""
      const bodyText = tmp.textContent || ""

      // Build SEO description
      formData.value.metaDescription = generateMetaDescription(title, bodyText)
    }
  }
)



// 🧾 Dropdown data
const authors = [
  { label: 'John Doe', value: 'john-doe' },
  { label: 'Jane Smith', value: 'jane-smith' },
  { label: 'Alex Johnson', value: 'alex-johnson' },
  { label: 'Sarah Williams', value: 'sarah-williams' }
]

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
  { label: 'Finance', value: 'finance' }
]

const socialMediaPlatforms = [
  { label: 'Facebook', value: 'facebook' },
  { label: 'Twitter/X', value: 'twitter' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'YouTube', value: 'youtube' },
  { label: 'TikTok', value: 'tiktok' }
]

// Selected options
const selectedAuthor = ref('')
const selectedTags = ref([])
const selectedCategory = ref('')

// Dynamic external links array
const socialLinks = ref([{ title: '', url: '' }])
const addLink = () => socialLinks.value.push({ title: '', url: '' })
const removeLink = (i) => socialLinks.value.splice(i, 1)


// Attachments
const attachments = ref([{ title: '', file: null }])

const addAttachment = () => attachments.value.push({ title: '', file: null })
const removeAttachment = (i) => attachments.value.splice(i, 1)

const handleFileChange = (event, index) => {
  attachments.value[index].file = event.target.files[0]
}


// Image preview update
const handleImageSelected = (newImageUrl) => (previewUrl.value = newImageUrl)


// Toast notification logic
const toastType = ref('')
const toastMessage = ref('')
const handleToast = ({ toastType: type, toastMessage: msg }) => {
  toastType.value = type
  toastMessage.value = msg
  setTimeout(() => (toastMessage.value = ''), 3000)
}


// Slug generator
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const regenerateSlug = () => {
  if (formData.value.title) {
    formData.value.slug = generateSlug(formData.value.title)
  }
}


// 💾 Save draft
const saveDraft = () => {
  formData.value.status = 'draft'
  publishPost()
}


// Preview logic
const previewPost = () => {
  handleToast({ toastType: 'info', toastMessage: 'Opening preview...' })
}



// Publish post
const publishPost = () => {
  if (!formData.value.title || !formData.value.body || !selectedAuthor.value) {
    handleToast({ toastType: 'error', toastMessage: 'Please fill in all required fields.' })
    return
  }

  if (previewUrl.value === placeholderImage) {
    handleToast({ toastType: 'error', toastMessage: 'Please upload a cover image.' })
    return
  }

  const payload = {
    title: formData.value.title,
    subtitle: formData.value.subtitle,
    author: selectedAuthor.value,
    coverImage: previewUrl.value,
    body: formData.value.body,
    tags: selectedTags.value,
    category: selectedCategory.value,
    visibility: formData.value.visibility,
    publishDate: formData.value.publishDate,
    slug: formData.value.slug,
    status: formData.value.status,
    metaDescription: formData.value.metaDescription,
    keywords: formData.value.keywords,
    socialLinks: socialLinks.value.filter((l) => l.platform && l.url),
    createdBy: 'current-user',
    updatedBy: 'current-user',

    attachments: attachments.value
      .filter(d => d.title && d.file)
      .map(d => ({
        title: d.title,
        file: d.file
      }))
  }

  console.log('📤 Publishing Blog Post:', payload)

  const message = formData.value.status === 'published'
    ? 'Blog post published successfully!'
    : formData.value.status === 'scheduled'
      ? 'Blog post scheduled successfully!'
      : 'Draft saved successfully!'

  handleToast({ toastType: 'success', toastMessage: message })

  setTimeout(() => {
    router.push('/blog/list')
  }, 1500)
}


// Cancel
const cancelCreate = () => {
  if (confirm('Are you sure? Any unsaved changes will be lost.')) {
    router.push('/blog/list')
  }
}


// Load screen
onMounted(() => {
  setTimeout(() => (isLoading.value = false), 800)
})
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.border-top {
  border-top: 1px solid #e9ecef !important;
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

.input-group-text {
  background-color: #f8f9fa;
  color: #6c757d;
}
</style>