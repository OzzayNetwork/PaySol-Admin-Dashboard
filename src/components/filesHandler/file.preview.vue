<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
    fileUrl: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        default: ''
    },
    showDebug: {
        type: Boolean,
        default: false
    },
    fileTypeExt: {
        type: String,
        default: ''
    },
})

// State
const loading = ref(true)
const error = ref('')
const status = ref('')
const textContent = ref('')
const copySuccess = ref(false)
const imageInfo = ref(null)
const pdfEmbedFailed = ref(false)

// Helper to extract extension
const fileExtension = computed(() => {
    const url = props.fileUrl
    const clean = url.split('?')[0].split('#')[0]
    const lastPart = clean.split('/').pop() || ''
    const lastDot = lastPart.lastIndexOf('.')
    if(props.fileTypeExt!=''){
        return props.fileTypeExt.toLowerCase();
    }

    if (lastDot === -1) return ''   
   
    return lastPart.substring(lastDot + 1).toLowerCase()
})

// File type detection
const fileType = computed(() => {
    const ext = fileExtension.value

    // Images
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico']
    if (imageExts.includes(ext)) return 'image'

    // PDF
    if (ext === 'pdf') return 'pdf'

    // Videos
    const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'wmv', 'mkv']
    if (videoExts.includes(ext)) return 'video'

    // Audio
    const audioExts = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac']
    if (audioExts.includes(ext)) return 'audio'

    // Text (including code files)
    const textExts = [
        'txt', 'json', 'xml', 'html', 'htm', 'css', 'js', 'jsx', 'ts', 'tsx',
        'md', 'csv', 'log', 'ini', 'cfg', 'conf', 'yaml', 'yml', 'env'
    ]
    if (textExts.includes(ext)) return 'text'

    // Office docs - treat as special category
    const officeExts = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'rtf']
    if (officeExts.includes(ext)) return 'office'

    return 'unsupported'
})

// Load text files
const loadTextFile = async () => {
    try {
        status.value = 'Loading text content...'

        // For text files, fetch the content
        const response = await fetch(props.fileUrl)

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`)
        }

        // Check content type
        const contentType = response.headers.get('content-type') || ''

        // If it's a PDF or binary file pretending to be text
        if (contentType.includes('pdf') || contentType.includes('octet-stream')) {
            throw new Error('File is not plain text (binary content detected)')
        }

        const text = await response.text()

        // Check if it's actually binary data (Office files often get misdetected)
        if (isBinary(text)) {
            throw new Error('File appears to be binary (not plain text)')
        }

        // Limit display for very large files
        textContent.value = text.length > 50000
            ? text.substring(0, 50000) + '\n\n... [Content truncated - file too large to display]'
            : text

        onPreviewLoad()
    } catch (err) {
        console.error('Text load error:', err)
        error.value = `Cannot preview text: ${err.message}`
        loading.value = false
    }
}

// Helper to detect binary content
const isBinary = (text) => {
    // Check for null characters or non-printable characters
    return /[\x00-\x08\x0E-\x1F]/.test(text) ||
        text.includes('PK') && text.includes('[Content_Types].xml') // ZIP/Office file signature
}

// Copy text to clipboard
const copyText = async () => {
    try {
        await navigator.clipboard.writeText(textContent.value)
        copySuccess.value = true
        setTimeout(() => {
            copySuccess.value = false
        }, 2000)
    } catch (err) {
        console.error('Copy failed:', err)
        alert('Failed to copy to clipboard. Please try again.')
    }
}

// Preview load handlers
const onPreviewLoad = (event) => {
    console.log(`✅ ${fileType.value.toUpperCase()} loaded successfully!`)

    // Get image dimensions if it's an image
    if (fileType.value === 'image' && event?.target?.naturalWidth) {
        const img = event.target
        imageInfo.value = {
            dimensions: `${img.naturalWidth} × ${img.naturalHeight} px`,
            size: formatFileSize(img.naturalWidth * img.naturalHeight * 3)
        }
    }

    loading.value = false
    error.value = ''
    status.value = 'Loaded successfully'
}

const onPreviewError = (err) => {
    console.error(`❌ ${fileType.value.toUpperCase()} failed to load:`, err)

    loading.value = false
    error.value = `Failed to load ${fileType.value}. The URL may be invalid, blocked by CORS, or the file format is not supported by your browser.`
    status.value = 'Load failed'
}

// PDF embed error handler
const onPdfEmbedError = () => {
    console.log('PDF embed failed, trying iframe fallback')
    pdfEmbedFailed.value = true
}

// Print PDF function
const printPDF = () => {
    try {
        const printWindow = window.open(props.fileUrl, '_blank')
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print()
            }
        }
    } catch (err) {
        console.error('Print failed:', err)
        alert('Cannot print PDF. Please download and print manually.')
    }
}

// Format file size helper
const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size'
    const units = ['B', 'KB', 'MB', 'GB']
    let size = bytes
    let unitIndex = 0

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024
        unitIndex++
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`
}

// Get Office file viewer URL
const getOfficeViewerUrl = () => {
    // Microsoft Office Online Viewer
    return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(props.fileUrl)}`
}

// Initialize preview
const initPreview = () => {
    console.log('🚀 Initializing file preview...')
    console.log('URL:', props.fileUrl)
    console.log('Extension:', fileExtension.value)
    console.log('Type:', fileType.value)

    // Reset state
    loading.value = true
    error.value = ''
    status.value = 'Initializing...'
    textContent.value = ''
    imageInfo.value = null
    copySuccess.value = false
    pdfEmbedFailed.value = false

    // Load based on file type
    switch (fileType.value) {
        case 'text':
            loadTextFile()
            break

        case 'pdf':
        case 'image':
        case 'video':
        case 'audio':
            // These load automatically via HTML elements
            // Set timeout in case they don't load
            setTimeout(() => {
                if (loading.value && !error.value) {
                    console.log('⏰ Timeout - marking as loaded')
                    loading.value = false
                }
            }, 10000)
            break

        case 'office':
            // Office files need special handling
            loading.value = false
            error.value = 'Office documents cannot be previewed directly in browser. Please download or use online viewers.'
            break

        default:
            loading.value = false
            break
    }
}

// Watch for URL changes
watch(() => props.fileUrl, initPreview, { immediate: true })
</script>

<template>
    <div class="complete-file-preview">
        <!-- Debug Info -->
        <div v-if="showDebug" class="debug-info">
            <h4>Debug Info:</h4>
            <p><strong>URL:</strong> {{ props.fileUrl }}</p>
            <p><strong>Extension:</strong> {{ fileExtension }}</p>
            <p><strong>Type:</strong> {{ fileType }}</p>
            <p><strong>Status:</strong> {{ status }}</p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="loading">
            <div class="spinner"></div>
            <p>Loading {{ fileType }} preview...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="error">
            <h3>⚠️ Preview Error</h3>
            <p>{{ error }}</p>
            <div class="action-buttons more-actions">
                <ul class="list-inline font-size-20 contact-links mb-0">
                    <li class="list-inline-item p-2 px-3 border-round m-0">
                        <a :href="props.fileUrl" target="_blank" title="Open in New Tab"
                            class="d-flex gap-2 align-items-center">
                            <i class="bx bx-link-external"></i>
                            <span class="" style="font-size:13px;">Open in New Tab</span>
                        </a>
                    </li>
                    <li class="list-inline-item p-2 px-3 border-round m-0">
                        <a :href="props.fileUrl" :download="props.fileName" title="Download"
                            class="d-flex gap-2 align-items-center">
                            <i class="bx bx-download"></i>
                            <span class="" style="font-size:13px;">Download</span>
                        </a>
                    </li>
                    <li v-if="fileType === 'office'" class="list-inline-item p-2 px-3 border-round m-0">
                        <a :href="getOfficeViewerUrl()" target="_blank" title="Open in Office Online"
                            class="d-flex gap-2 align-items-center">
                            <i class="bx bx-file"></i>
                            <span class="" style="font-size:13px;">Open in Office Online</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- PDF Preview - FIXED -->
        <div v-else-if="fileType === 'pdf'" class="pdf-preview">
            <div class="preview-header">
                <span class="badge">PDF</span>
                <span class="filename">{{ props.fileName || 'document.pdf' }}</span>
            </div>
            <div class="preview-container">
                <!-- Try object tag first (better browser support) -->
                <object v-if="!pdfEmbedFailed" :data="props.fileUrl" type="application/pdf" class="pdf-object"
                    @load="onPreviewLoad" @error="onPdfEmbedError">
                    <p>Your browser doesn't support PDF preview.
                        <a :href="props.fileUrl" target="_blank">Download PDF</a>
                    </p>
                </object>

                <!-- Fallback to iframe -->
                <iframe v-else :src="props.fileUrl" class="pdf-iframe" frameborder="0" @load="onPreviewLoad"></iframe>
            </div>
            <div class="preview-footer">
                <div class="pdf-actions more-actions">
                    <ul class="list-inline font-size-20 contact-links mb-0">
                        <!-- Open in New Tab (for all file types) -->
                        <li class="list-inline-item p-2 px-3 border-round m-0">
                            <a :href="props.fileUrl" target="_blank" :title="`Open ${props.fileName} in New Tab`"
                                class="d-flex gap-2 align-items-center">
                                <i class="bx bx-link-external"></i>
                                <span class="" style="font-size:13px;">Open</span>
                            </a>
                        </li>

                        <!-- Download (for all file types) -->
                        <li class="list-inline-item p-2 px-3 border-round m-0">
                            <a :href="props.fileUrl" :download="props.fileName" :title="`Download ${props.fileName}`"
                                class="d-flex gap-2 align-items-center">
                                <i class="bx bx-download"></i>
                                <span class="" style="font-size:13px;">Download</span>
                            </a>
                        </li>

                        <!-- Print (only for PDF) -->
                        <li v-if="fileType === 'pdf'" class="list-inline-item p-2 px-3 border-round m-0">
                            <a href="javascript:void(0);" @click="printPDF" title="Print PDF"
                                class="d-flex gap-2 align-items-center">
                                <i class="bx bx-printer"></i>
                                <span class="" style="font-size:13px;">Print</span>
                            </a>
                        </li>

                        <!-- Copy Text (only for text files) -->
                        <li v-if="fileType === 'text'" class="list-inline-item p-2 px-3 border-round m-0">
                            <a href="javascript:void(0);" @click="copyText" title="Copy Text"
                                class="d-flex gap-2 align-items-center">
                                <i class="bx bx-copy"></i>
                                <span class="" style="font-size:13px;">Copy</span>
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <!-- Image Preview -->
        <div v-else-if="fileType === 'image'" class="image-preview">
            <div class="preview-header">
                <span class="badge">IMAGE</span>
                <span class="filename">{{ props.fileName || 'image.jpg' }}</span>
            </div>
            <div class="preview-container">
                <img :src="props.fileUrl" :alt="props.fileName || 'Image'" crossorigin="anonymous" @load="onPreviewLoad"
                    @error="onPreviewError" class="preview-image" />
            </div>
            <div v-if="imageInfo" class="preview-footer">
                <p>{{ imageInfo.dimensions }} • {{ imageInfo.size }}</p>
            </div>
        </div>

        <!-- Video Preview -->
        <div v-else-if="fileType === 'video'" class="video-preview">
            <div class="preview-header">
                <span class="badge">VIDEO</span>
                <span class="filename">{{ props.fileName || 'video.mp4' }}</span>
            </div>
            <div class="preview-container">
                <video controls :src="props.fileUrl" @loadeddata="onPreviewLoad" @error="onPreviewError"
                    class="preview-video">
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>

        <!-- Audio Preview -->
        <div v-else-if="fileType === 'audio'" class="audio-preview">
            <div class="preview-header">
                <span class="badge">AUDIO</span>
                <span class="filename">{{ props.fileName || 'audio.mp3' }}</span>
            </div>
            <div class="preview-container">
                <audio controls :src="props.fileUrl" @loadeddata="onPreviewLoad" @error="onPreviewError"
                    class="preview-audio">
                    Your browser does not support the audio element.
                </audio>
            </div>
        </div>

        <!-- Text Preview - FIXED -->
        <div v-else-if="fileType === 'text'" class="text-preview">
            <div class="preview-header more-actions">
                <span class="badge">TEXT</span>
                <span class="filename">{{ props.fileName || 'text.txt' }}</span>

                <ul class="list-inline font-size-20 contact-links mb-0">
                    <li class="list-inline-item p-2 px-3 border-round m-0">
                        <a @click="copyText" href="javascript:void(0);" title="Copy to Clipboard"
                            class="d-flex gap-2 align-items-center copy-master" onclick="copyMagic()">
                            <i class="bx" :class="copySuccess ? 'bx-check' : 'bx-copy'"></i>
                            <span class="" style="font-size:13px;">
                                {{ copySuccess ? 'Copied!' : 'Copy' }}
                            </span>
                            <span class="copy-pulse"></span>
                        </a>
                    </li>
                </ul>



            </div>
            <div class="preview-container">
                <pre class="text-content">{{ textContent }}</pre>
                <div v-if="textContent.includes('truncated')" class="truncated-notice">
                    <p>⚠️ File content truncated for display</p>
                    <a :href="props.fileUrl" :download="props.fileName" class="btn download">Download Full File</a>
                </div>
            </div>
        </div>

        <!-- Office Documents - FIXED -->
        <div v-else-if="fileType === 'office'" class="office-preview">
            <div class="preview-header">
                <span class="badge">{{ fileExtension.toUpperCase() }}</span>
                <span class="filename">{{ props.fileName || 'office-document' }}</span>
            </div>
            <div class="preview-container">
                <div class="office-notice">
                    <div class="office-icon">
                        <span v-if="fileExtension.includes('doc')">📄</span>
                        <span v-else-if="fileExtension.includes('xls')">📊</span>
                        <span v-else-if="fileExtension.includes('ppt')">📽️</span>
                        <span v-else>📎</span>
                    </div>
                    <h3>Office Document</h3>
                    <p>This document cannot be previewed directly in the browser.</p>
                    <p>You can:</p>
                    <ul>
                        <li>Download and open with Microsoft Office or compatible software</li>
                        <li>Use the online viewer below</li>
                        <li>Convert to PDF for browser preview</li>
                    </ul>

                    <!-- Office Online Viewer iframe -->
                    <div class="office-viewer-container">
                        <iframe :src="getOfficeViewerUrl()" class="office-iframe" frameborder="0"
                            title="Office Online Viewer"></iframe>
                        <p class="viewer-note">Note: The online viewer requires the file to be publicly accessible</p>
                    </div>
                </div>
            </div>
            <div class="preview-footer">
                <div class="office-actions">
                    <a :href="props.fileUrl" :download="props.fileName" class="btn download">Download</a>
                    <a :href="getOfficeViewerUrl()" target="_blank" class="btn office-viewer">Open in Office Online</a>
                </div>
            </div>
        </div>

        <!-- Unsupported -->
        <div v-else class="unsupported-preview">
            <div class="preview-header">
                <span class="badge">{{ fileExtension.toUpperCase() || 'FILE' }}</span>
                <span class="filename">{{ props.fileName || 'file' }}</span>
            </div>
            <div class="preview-container">
                <div class="unsupported-content">
                    <div class="unsupported-icon">📄</div>
                    <h3>Preview Not Available</h3>
                    <p>This file type (.{{ fileExtension }}) cannot be previewed in the browser.</p>
                </div>
            </div>
            <div class="preview-footer more-actions">
                <ul class="list-inline font-size-20 contact-links mb-0">
                    <li class="list-inline-item p-2 px-3 border-round m-0">
                        <a :href="props.fileUrl" target="_blank" title="Open in New Tab"
                            class="d-flex gap-2 align-items-center">
                            <i class="bx bx-link-external"></i>
                            <span class="" style="font-size:13px;">Open in New Tab</span>
                        </a>
                    </li>
                    <li class="list-inline-item p-2 px-3 border-round m-0">
                        <a :href="props.fileUrl" :download="props.fileName" title="Download File"
                            class="d-flex gap-2 align-items-center">
                            <i class="bx bx-download"></i>
                            <span class="" style="font-size:13px;">Download File</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.complete-file-preview {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    margin: 0 auto;
}

.debug-info {
    background: #f5f5f5;
    padding: 12px;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    font-family: monospace;
}

.debug-info h4 {
    margin: 0 0 8px 0;
    color: #666;
}

.loading {
    padding: 40px;
    text-align: center;
}

.spinner {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.error {
    padding: 30px;
    text-align: center;
    background: #ffebee;
    border-radius: 8px;
    margin: 20px;
}

.error h3 {
    color: #c62828;
    margin-bottom: 12px;
}

.action-buttons {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 20px;
    flex-wrap: wrap;
}

/* Common Preview Styles */
.preview-header {
    padding: 12px 16px;
    background: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    gap: 10px;
}

.badge {
    background: #3498db;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
    text-transform: uppercase;
}

.filename {
    font-weight: 500;
    color: #333;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.preview-container {
    padding: 20px;
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 300px;
    overflow: hidden;
}

.preview-footer {
    padding: 12px 16px;
    background: #f8f9fa;
    border-top: 1px solid #e0e0e0;
    text-align: center;
    color: #666;
    font-size: 14px;
}

.preview-footer p {
    padding: 0;
    margin: 0;
}

/* PDF Preview */
.pdf-object {
    width: 100%;
    height: 600px;
    border: none;
}

.pdf-iframe {
    width: 100%;
    height: 600px;
    border: none;
}

.pdf-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
}

/* Image Preview */
.preview-image {
    max-width: 100%;
    max-height: 500px;
    display: block;
    margin: 0 auto;
    border-radius: 4px;
}

/* Video Preview */
.preview-video {
    max-width: 100%;
    max-height: 500px;
    display: block;
    margin: 0 auto;
}

/* Audio Preview */
.preview-audio {
    width: 100%;
    max-width: 400px;
}

/* Text Preview */
.text-preview .preview-container {
    display: block;
    padding: 0;
}

.text-content {
    background: #f8f9fa;
    padding: 20px;
    margin: 0;
    max-height: 400px;
    overflow: auto;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-wrap: break-word;
    border-radius: 0;
    border: none;
}

.copy-btn {
    background: #4caf50;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;
}

.copy-btn:hover {
    background: #388e3c;
}

.copy-btn.copied {
    background: #2e7d32;
}

.truncated-notice {
    background: #fff3e0;
    padding: 12px;
    margin: 0;
    border-top: 1px solid #ffb74d;
    text-align: center;
}

.truncated-notice p {
    margin: 0 0 8px 0;
    color: #e65100;
}

/* Office Preview */
.office-preview .preview-container {
    text-align: center;
}

.office-notice {
    max-width: 600px;
    margin: 0 auto;
}

.office-icon {
    font-size: 64px;
    margin-bottom: 20px;
}

.office-notice h3 {
    color: #333;
    margin-bottom: 12px;
}

.office-notice p {
    color: #666;
    margin-bottom: 8px;
}

.office-notice ul {
    text-align: left;
    margin: 16px auto;
    padding-left: 20px;
    max-width: 400px;
}

.office-notice li {
    margin-bottom: 8px;
    color: #555;
}

.office-viewer-container {
    margin-top: 30px;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

.office-iframe {
    width: 100%;
    height: 500px;
    border: none;
}

.viewer-note {
    font-size: 12px;
    color: #999;
    padding: 8px;
    background: #f9f9f9;
    margin: 0;
}

.office-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
}

/* Unsupported Preview */
.unsupported-content {
    text-align: center;
    padding: 40px 20px;
}

.unsupported-icon {
    font-size: 64px;
    margin-bottom: 20px;
}

.unsupported-content h3 {
    color: #333;
    margin-bottom: 12px;
}

.unsupported-content p {
    color: #666;
    margin-bottom: 20px;
}





/* Responsive */
@media (max-width: 768px) {
    .preview-container {
        padding: 10px;
    }

    .pdf-object,
    .pdf-iframe {
        height: 400px;
    }

    .action-buttons,
    .pdf-actions,
    .office-actions {
        flex-direction: column;
        align-items: center;
    }


}
</style>