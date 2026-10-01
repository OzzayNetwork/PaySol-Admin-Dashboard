<template>
  <!-- Image Details Modal -->
  <div class="modal fade portfolio-modal text-dark" id="imageDetailsModal" tabindex="-1"
    aria-labelledby="imageDetailsModalLabel" aria-hidden="true" ref="imageDetailsModal">
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content shadow-lg border-0 rounded-3 overflow-hidden">
        <div class="modal-body p-0 position-relative">
          <span class="p-5 d-none">sssv</span>
          <!-- Close Button -->

          <div>
            <div class="btn-group position-absolute m-3" style="z-index: 1020; right: 30px; top: -8px;">
              <button class="btn header-item noti-icon waves-effectpy-0 px-2 rounded-circle shadow-sm waves-effect" 
                type="button" 
                data-bs-toggle="dropdown"
                title="More actions"
                aria-expanded="false" style="height: 40px !important; z-index: 1020;">
                <i class="mdi mdi-dots-vertical"></i>
              </button>
              <div class="dropdown-menu shadow-lg">
                <a class="dropdown-item d-flex align-items-center gap-3" href="#">
                  <i class="mdi mdi-pencil-outline  fs-4"></i> Edit Details
                </a>               
                <a class="dropdown-item d-flex align-items-center gap-3" href="#" data-bs-toggle="modal"
                  data-bs-target="#moveToAlbumModal">
                  <i class="mdi mdi-folder-move-outline  fs-4"></i> Move to Album
                </a>
                <a class="dropdown-item d-flex align-items-center gap-3" href="#" data-bs-toggle="modal"
                  data-bs-target="#hideImageModal">
                  <i class="mdi mdi-eye-off-outline  fs-4"></i> Hide from Website
                </a>
                <a class="dropdown-item d-flex align-items-center gap-3" href="#">
                  <i class="mdi mdi-download-outline  fs-4"></i> Download Image
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item d-flex align-items-center gap-3 text-danger fw-semibold" href="#"
                  data-bs-toggle="modal" data-bs-target="#deleteImageModal">
                  <i class="mdi mdi-trash-can-outline fs-4"></i> Delete Image
                </a>
              </div>

            </div>

            <button type="button"
              class="btn-close position-absolute top-0 end-0 m-3 bg-light rounded-circle shadow-sm p-2 waves-effect"
              data-bs-dismiss="modal" aria-label="Close" style="z-index: 1000;"></button>
          </div>

          
          <div class="row g-0">
            <!-- Left: Image Preview -->
            <div class="col-lg-6 d-flex align-items-center justify-content-center">
              <div class="image-section w-100 h-100 text-center" ref="imageSection">
                <img
                  id="modalImage"
                  src="https://picsum.photos/1080/1350?random=30"
                  alt="Portfolio Item"
                  class="img-fluid rounded-start"
                  @load="extractDominantColor"
                  ref="modalImage"
                />
              </div>
            </div>


            <!-- Right: Image Details -->
            <div class="col-lg-6 bg-white">
              <div class="details-section p-4">
                <!-- Header -->
                <div class="project-header mb-3 border-bottom pb-2">
                  <div class="d-flex">
                    <div class="flex-shrink-0 me-3">
                      <div class="avatar-sm d-flex">
                        <img class="rounded-circle" src="../../assets/images/users/avatar-2.jpg"
                          alt="Generic placeholder image">

                      </div>
                      <img class="rounded-circle d-none" src="../../assets/images/users/avatar-2.jpg"
                        alt="Generic placeholder image" height="36">
                    </div>
                    <div class="flex-grow-1 chat-user-box">
                      <p class="user-title m-0 fs-5">Scott Median <span class="text-muted">(Aurthor)</span></p>
                      <p class="text-muted d-flex">10 Nov 2025 11:45 AM . 1.2M Views <span
                          class="text-black me-2 mx-3 d-flex "> <i class="bx bx-globe fs-5 mx-1"></i> Public</span></p>
                    </div>
                  </div>

                </div>

                <div class="project-header mb-3 border-bottom pb-2">
                  <h4 id="modalTitle" class="fw-bold mb-0">
                    Sunset Over the Ocean
                  </h4>
                  <small id="modalCategory" class="text-muted">
                    Album: Nature & Landscapes
                  </small>
                </div>

                <!-- Description -->
                <div class="project-content">
                  <div class="project-description mb-3">
                    <p id="modalDescription" class="text-muted pb-2">
                      Captured during an evening shoot along the coast of Mombasa, this photograph highlights the
                      natural beauty of the sea meeting the sky — calm, endless, and breathtaking.
                    </p>
                  </div>

                  <!-- Tags -->
                  <div class="tags clearfix mb-3">
                    <span href="#" v-for="tag in postTags" :key="tag"
                      class="tag  text-dark px-3 me-1 mb-2 text-capitalize me-2">{{ tag }}</span>
                  </div>

                  <div class="mb-3">
                    <h6 class="fw-semibold mb-2 d-flex align-items-center gap-1">
                      <span class="material-icons text-primary text-capitalize">public</span> Map View
                    </h6>
                    <div class="map-container rounded overflow-hidden border border-1 border-light">
                      <iframe width="100%" height="150" style="border:0;" loading="lazy" allowfullscreen
                        referrerpolicy="no-referrer-when-downgrade" class="d-none"
                        src="https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Mombasa,Kenya">
                      </iframe>

                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8374277408257!2d36.79765107582752!3d-1.2705176356108614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f17005adb4827%3A0x23f0ca82e7399bf4!2sCraft%20Silicon%20Payments!5e0!3m2!1sen!2ske!4v1762887497826!5m2!1sen!2ske"
                        width="100%" height="150" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade" class="">

                      </iframe>
                    </div>
                  </div>

                  <div class="mb-4">
                    <div class="alert alert-info d-flex align-items-start gap-3 mb-3" role="alert">
                      <i class="mdi mdi-history fs-4"></i>
                      <div>
                        <h6 class="mb-1 fw-bold">Recent Update</h6>
                        <p class="mb-1">
                          <strong>Mitchell</strong> updated the image title from 
                          <em>"Beach Sunset"</em> to <em>"Diani Sunset Glow"</em> 
                          and changed the visibility status to <strong>Public</strong>.
                        </p>
                        <small class="text-muted">Edited on 9th Nov 2025 at 4:27 PM</small>
                      </div>
                    </div>
                  </div>


                  <!-- Social Links -->
                  <div class="social-links mb-4">
                    <h6 class="fw-semibold mb-2">View on Social Media</h6>
                    <div class="author-social d-flex gap-2">
                      <a href="#" class="d-flex align-items-center justify-content-center" title="Facebook">
                        <i class="mdi mdi-facebook fs-5"></i>
                      </a>
                      <a href="#" class="d-flex align-items-center justify-content-center" title="Twitter">
                        <i class="mdi mdi-twitter fs-5"></i>
                      </a>
                      <a href="#" class="d-flex align-items-center justify-content-center" title="Instagram">
                        <i class="mdi mdi-instagram fs-5"></i>
                      </a>
                      <a href="#" class="d-flex align-items-center justify-content-center" title="LinkedIn">
                        <i class="mdi mdi-linkedin fs-5"></i>
                      </a>
                    </div>
                  </div>
                </div>

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const imageDetailsModal = ref(null);
const modalImage = ref(null);
const imageSection = ref(null);
const postTags = ref(["Art", "Artificial Intelligence", "Revenue", "Tax", "County", "View"]);

let modalElement;

// 🎨 Extract dominant color dynamically
const extractDominantColor = () => {
  const img = modalImage.value;
  if (!img) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Downscale for speed
  canvas.width = 50;
  canvas.height = 50;
  ctx.drawImage(img, 0, 0, 50, 50);

  let data;
  try {
    data = ctx.getImageData(0, 0, 50, 50).data;
  } catch (err) {
    console.warn("⚠️ Unable to access image data — CORS issue.", err);
    return;
  }

  let r = 0, g = 0, b = 0, count = 0;
  for (let i = 0; i < data.length; i += 40) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    count++;
  }

  r = Math.round(r / count);
  g = Math.round(g / count);
  b = Math.round(b / count);

  if (imageSection.value) {
    imageSection.value.style.transition = "background 1s ease";
    imageSection.value.style.background = `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, 0.9), rgba(${r}, ${g}, ${b}, 0.8))`;
  }
};

// 🧭 Modal event
const onShown = () => {
  console.log("🖼️ Image Details modal opened.");
};

onMounted(() => {
  if (imageDetailsModal.value) {
    modalElement = imageDetailsModal.value;
    modalElement.addEventListener("shown.bs.modal", onShown);
  }
});

onBeforeUnmount(() => {
  modalElement?.removeEventListener("shown.bs.modal", onShown);
});
</script>

<style scoped>
.tags .tag {
  display: inline-block;
  text-align: center;
  padding: 2px 12px;
  line-height: 24px;
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 12px !important;
  border-radius: 14px;
  color: #444;
  background: #eee;
  transition: all .3s;
}

.author-social a {
  display: inline-block;
  margin-right: 5px;
  background-color: #e9e9e9;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 50%;
}

.author-social i {
  cursor: pointer;
  color: #232323;
  font-size: 16px;
  line-height: 40px;
  transition: all .3s;
}
</style>

make this work correctly, what you initially did never worked