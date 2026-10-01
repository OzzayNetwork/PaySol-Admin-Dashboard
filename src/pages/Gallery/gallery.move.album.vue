<template>
  <!-- Move to Album Modal -->
  <div
    class="modal fade text-dark"
    id="moveToAlbumModal"
    tabindex="-1"
    aria-labelledby="moveToAlbumModalLabel"
    aria-hidden="true"
    ref="moveToAlbumModal"
  >
    <div class="modal-dialog modal-dialog-centered ">
      <div class="modal-content shadow-lg border-0">
        <!-- Header -->
        <div class="modal-header border-0 p-4">
          <h5 class="modal-title fw-bold" id="moveToAlbumModalLabel">
            ↪️ Move Image to Album
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <!-- Body --> 
        <div class="modal-body p-4">
          <form>
            <div class="mb-3 p-3 bg-light rounded d-flex gap-3 align-items-center">
                <div>
                    <div>
                        <img src="../../assets/images/portfolio/project-1.jpg" class="img rounded" alt="" style="width:100px ;">
                    </div>
                </div>
                <div >
                    <h5 class="mt-2 text-dark">Image Title</h5>
                    <p class="text-muted">This is a brief description of the image.</p>
                </div>
            </div>
            <div class="mb-3">
              <label for="currentAlbum" class="form-label fw-semibold">
                Current Album
              </label>
              <input
                type="text"
                id="currentAlbum"
                class="form-control"
                :value="currentAlbum"
                disabled
              />
            </div>

            <div class="mb-3">
              <label for="newAlbum" class="form-label fw-semibold">
                Select New Album
              </label>
              

              <SelectSearchBox :options="galleryAlbums" v-model="selectedAlbum" placeholder="Select Album"
                      input-class="form-control form-select"
                      ref="newAlbumSelect"
                      id="newAlbum"
                      >
                      <template #footer>
                        <div class="p-2 text-primary cursor-pointer border-top text-center" data-bs-toggle="modal"
                          data-bs-target="#addAlbumModal">➕ Add New Album</div>
                      </template>
                    </SelectSearchBox>
            </div>

            <div class="mb-3">
              <label for="moveNote" class="form-label fw-semibold">
                Note (optional)
              </label>
              <textarea
                id="moveNote"
                class="form-control"
                rows="2"
                placeholder="e.g., Moving to the latest event collection..."
              ></textarea>
            </div>
          </form>
        </div>

        <!-- Footer -->
        <div class="modal-footer border-0 pt-0 px-3">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-primary fw-semibold"
            :disabled="!selectedAlbum"
            @click="moveImage"
          >
            Move Image
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import SelectSearchBox from "@/components/SelectSearchBox.vue";

const moveToAlbumModal = ref(null);
const newAlbumSelect = ref(null);

const currentAlbum = ref("Nature Collection"); // Example — this would be dynamic
const selectedAlbum = ref("");
const galleryAlbums = ref([
   { label: 'Nature', value: 'nature' },
  { label: 'Cities', value: 'cities' },
  { label: 'People', value: 'people' },
  { label: 'Events', value: 'events' }
]);



// Focus select when modal opens
onMounted(() => {
  if (moveToAlbumModal.value) {
    const modalElement = moveToAlbumModal.value;
    const onShown = () => newAlbumSelect.value?.focus();

    modalElement.addEventListener("shown.bs.modal", onShown);

    onBeforeUnmount(() => {
      modalElement.removeEventListener("shown.bs.modal", onShown);
    });
  }
});

// Handle the move action
const moveImage = () => {
  if (!selectedAlbum.value) return;

  console.log(`Image moved from "${currentAlbum.value}" to album ID:`, selectedAlbum.value);
  const modal = bootstrap.Modal.getInstance(moveToAlbumModal.value);
  modal.hide();
};
</script>
