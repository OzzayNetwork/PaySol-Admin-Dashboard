<template>
  <!-- 🧭 Top navigation bar -->
  <div class="d-flex justify-content-between align-items-center mb-0 border-0">
    <!-- Left navigation tabs -->
    <ul class="nav nav-tabs nav-tabs-custom nav-gallery" role="tablist">
      <!-- 📸 Media Gallery tab -->
      <li class="nav-item">
        <RouterLink
          to="/gallery/view"
          class="nav-link"
          :class="{ active: route.path === '/gallery/view' }"
        >
          <!-- Show icon only on small screens -->
          <span class="d-block d-sm-none">
            <i class="mdi mdi-file-image-outline text fs-4"></i>
          </span>
          <!-- Show text on medium+ screens -->
          <span class="d-none d-sm-block">Media Gallery</span>
        </RouterLink>
      </li>

      <!-- 🗂️ Albums tab -->
      <li class="nav-item">
        <RouterLink
          to="/gallery/view/albums"
          class="nav-link"
          :class="{ active: route.path === '/gallery/view/albums' }"
        >
          <span class="d-block d-sm-none">
            <i class="mdi mdi-folder-outline text fs-4"></i>
          </span>
          <span class="d-none d-sm-block">Media Albums</span>
        </RouterLink>
      </li>

      <!-- 📍 Map View tab -->
      <li class="nav-item">
        <RouterLink
          to="/gallery/view/map"
          class="nav-link"
          :class="{ active: route.path === '/gallery/view/map' }"
        >
          <span class="d-block d-sm-none">
            <i class="mdi mdi-map-marker-outline text fs-4"></i>
          </span>
          <span class="d-none d-sm-block">Map View</span>
        </RouterLink>
      </li>
    </ul>

    <!-- Right filter/upload buttons (currently hidden) -->
    <div class="pr-3 h-100 d-flex align-items-center gap-3 d-none">
      <!-- Filter button -->
      <button class="btn btn-light d-flex align-items-center fw-bold btn-sm">
        <i class="mdi mdi-filter-variant fs-5 me-2"></i> Filter
      </button>

      <!-- Upload media shortcut -->
      <RouterLink
        to="/gallery/upload"
        class="btn btn-primary d-flex align-items-center fw-bold btn-sm"
      >
        <i class="mdi mdi-camera-plus-outline fs-5 me-2"></i> Upload Media
      </RouterLink>
    </div>
  </div>

  <!-- ⚙️ Floating action button (FAB) & overlay -->
  <div class="position-fixed bottom-nav-pic">
    <!-- Animate sub-menu with fade-slide -->
    <transition name="fade-slide">
      <!-- Show sub-menu only when showMenu = true -->
      <div v-if="showMenu" class="thesub-menus-pic">
        <div class="d-flex flex-column gap-3 pb-3 text-left">
          <!-- Upload media option -->
          <RouterLink
            to="/gallery/upload"
            type="button"
            class="btn btn-light btn-rounded waves-effect shadow-lg text-left fw-bold py-3 px-4"
          >
            <i class="mdi mdi-camera-plus fs-4 align-middle me-2"></i>
            Upload Media Item
          </RouterLink>

          <!-- Add new album option (opens modal) -->
          <button
            type="button"
            class="btn btn-light btn-rounded waves-effect shadow-lg text-left fw-bold py-3 px-4"
            data-bs-toggle="modal"
            data-bs-target="#addAlbumModal"
            @click="toggleMenu"
          >
            <span class="align-middle fs-4 me-2">🖼️</span>
            Add Album
          </button>

          <!-- Add new category option (opens modal) -->
          <button
            @click="toggleMenu"
            data-bs-toggle="modal"
            data-bs-target="#addCategoryModal"
            title="Create a new gallery category"
            type="button"
            class="btn btn-light btn-rounded waves-effect shadow-lg text-left fw-bold py-3 px-4"
          >
            <span class="align-middle fs-4 me-2">🗂️</span>
            Add Category
          </button>
        </div>
      </div>
    </transition>

    <!-- 🌐 Central floating '+' button -->
    <div class="col-12 bottom-navigator d-flex align-items-center justify-content-center">
      <button
        type="button"
        class="btn btn-primary btn-lg position-relative p-0 avatar-md rounded-circle shadow-lg border-white border-5"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Add an Item"
        @click="toggleMenu"
      >
        <!-- Switch icon depending on menu state -->
        <span class="avatar-title bg-transparent text-reset d-flex align-items-center justify-content-center">
          <i v-if="showMenu" class="mdi mdi-close fs-1"></i>
          <i v-else class="mdi mdi-plus fs-1"></i>
        </span>
      </button>
    </div>
  </div>

  <!-- 🫧 Blurry background overlay (click to close menu) -->
  <transition name="fade">
    <div
      v-if="showMenu"
      class="bottom-nav-overlay"
      @click="toggleMenu"
    ></div>
  </transition>

  <!-- 📦 Dynamic routed content + modals -->
  <RouterView />
  <AddAlbumModal />
  <AddCategoryModal />
</template>

<script setup>
// Import Vue features
import { ref } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

// Import modal components
import AddAlbumModal from '@/pages/Gallery/gallery.album.modal.vue'
import AddCategoryModal from '@/pages/Gallery/gallery.category.modal.vue'

// Get current route for active tab detection
const route = useRoute();

// Controls visibility of the floating sub-menu
const showMenu = ref(false);

// Toggles the menu open/close state
function toggleMenu() {
  showMenu.value = !showMenu.value;
}
</script>

<style scoped>
/* 📍 Positions the floating button container at bottom center */
.bottom-nav-pic {
  left: 50%;
  transform: translateX(-50%);
  bottom: 16px;
  z-index: 1030;
}

/* 🌫️ Semi-transparent dark overlay with blur when menu is active */
.bottom-nav-overlay {
  z-index: 1025;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0 0 0 / 65%); /* Dark translucent background */
  backdrop-filter: blur(10px); /* Frosted blur effect */
  -webkit-backdrop-filter: blur(10px); /* Safari support */
  transition: all 0.3s ease-in-out;
}

/* ⚡ Smooth fade-in/fade-out for overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 🌀 Fade and slide animation for floating sub-menu */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
