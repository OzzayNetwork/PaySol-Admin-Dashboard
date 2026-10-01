<template>

    
  <div class="image-uploader">
    <input type="file" accept="image/*" @change="onFileChange" :id="inputId" class="d-none"  />
    <div class="d-none" v-if="croppedImage">
      <h4>Cropped Image:</h4>
      <img :src="croppedImage" style="max-width: 100%" />

      <h4>Thumbnail:</h4>
      <img :src="thumbnailImage" style="width: 100px; height: 100px" />
    </div>
  </div>

  <!-- uploading image modal -->
  <!-- Trigger Button -->
  <button
    type="button"
    class="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#imageCropperModal"
  >
    Launch Centered Modal
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    :id="modalName"
    tabindex="-1"
    :aria-labelledby="modalName"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    >

    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="">
            Crop Selected Image
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

       <div class="modal-body">
        <div v-if="isLoadingImage" class="d-flex justify-content-center py-5">
            <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading image...</span>
            </div>
        </div>
        <div v-else-if="imageUrl" class="cropper-container">
            <cropper
            class="cropper"
            :src="imageUrl"
            :stencil-props="{ aspectRatio: props.aspectRatio }"
            @change="onCropChange"
            ref="cropperRef"
            />
        </div>
        </div>


        <div class="modal-footer">
          <button type="button" class="btn btn-primary w-100" @click="cropImage" :disabled="isCropping">
            <div v-if="isCropping" class="spinner-border text-white m-1" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span v-else>Crop Image</span>
            </button>

        </div>
      </div>
    </div>
  </div>

  

  <!-- end of uploading image modal -->
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";




const isCropping = ref(false);
const isLoadingImage = ref(false); // Loader for file reading
const originalMimeType = ref('image/jpeg');

const props = defineProps({
  inputId: {
    type: String,
    required: true,
  },

  aspectRatio: {   // ✅ new prop
    type: [Number, null],
    default: null, // null = free crop
  },
});

const modalName = props.inputId + 'Modal'; // ✅ Fix: now inputId is available



onMounted(() => {
  const modal = document.getElementById(modalName);
  modal?.addEventListener('shown.bs.modal', () => {
    cropperRef.value?.refresh?.();
  });
});

 const emit = defineEmits(['show-toast']);

const onCropSuccess = () => {
  emit('show-toast', {
    toastType: 'success',
    toastMessage: 'Image cropped successfully!',
  });
};



const imageUrl = ref(null);
const cropperRef = ref(null);
const croppedImage = ref(null);
const thumbnailImage = ref(null);

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (!file || !file.type.startsWith('image/')) return;

  isLoadingImage.value = true;
  originalMimeType.value = file.type; // Store MIME type

  const reader = new FileReader();
  reader.onload = async () => {
    imageUrl.value = reader.result;

    await nextTick();

    const modalEl = document.getElementById(modalName);
    if (modalEl) {
      const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
      modal.show();
    }

    isLoadingImage.value = false;
  };
  reader.readAsDataURL(file);
};

const cropImage = async () => {
  isCropping.value = true;
  await nextTick();

  setTimeout(() => {
    const result = cropperRef.value?.getResult();

    if (result && result.canvas) {
      croppedImage.value = result.canvas.toDataURL(originalMimeType.value); // Use original format
      emit('image-selected', croppedImage.value);

      const thumbCanvas = document.createElement("canvas");
      const cropCanvas = result.canvas;
      
      const size = 100;
      thumbCanvas.width = size;
      thumbCanvas.height = size;

      const ctx = thumbCanvas.getContext("2d");
      ctx.drawImage(result.canvas, 0, 0, size, size);
      thumbnailImage.value = thumbCanvas.toDataURL(originalMimeType.value); // Maintain type

      const modalEl = document.getElementById(modalName);
      if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        modal?.hide();
      }
    onCropSuccess();
       


      

      $('#liveToastBtn').click()
    }

    setTimeout(() => {
      isCropping.value = false;
    }, 1000);
  }, 50);
};


</script>

<style scoped>
.image-uploader {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
}

.cropper-container {
  margin-top: 1rem;
}

.cropper {
  width: 100%;
  height: 400px;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}

</style>
