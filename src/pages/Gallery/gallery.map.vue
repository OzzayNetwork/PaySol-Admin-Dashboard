<template>
  <div class="container-fluid">
    <!-- Page Title -->
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

    <!-- Loader -->
    <div v-if="isLoading">
      <LoaderVue />
    </div>

    <div v-else class="row justify-content-center">
      <div class="col-12">
        <div class="card">
          <div class="card-body px-0 py-3 pt-0 pb-0" style="border-bottom: 2px solid #f6f6f6">
            <GalleryNavigation />
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col-12 position-relative">

                <!-- Map shimmer overlay -->
                <transition name="fade">
                  <div v-if="isMapLoading" class="map-loader-overlay d-flex flex-column align-items-center justify-content-center">
                    <div class="shimmer"></div>
                    <small class="text-muted mt-2">Loading map...</small>
                  </div>
                </transition>

                <!-- Google Map -->
                <div ref="mapContainer" id="map" class="map-cont"></div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <GalleryImageDetails />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute } from "vue-router";

import LoaderVue from "@/layouts/Loader.vue";
import GalleryNavigation from "@/pages/Gallery/gallery.navigation.vue";
import galleryData from "@/api/mock.APIS/gallery.mockup.data2.json";
import GalleryImageDetails from '@/pages/Gallery/gallery.image.details.vue'

const images = ref(galleryData);
const isLoading = ref(true);
const isMapLoading = ref(true);
const mapContainer = ref(null);

let mapInstance = null;
let markers = [];
let clusterer = null;

// Load Google Maps
async function loadGoogleMaps() {
  if (window.google && window.google.maps) return window.google;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Helper to load image
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

// Build circular photo marker icon
async function buildPhotoIcon(url) {
  try {
    const img = await loadImage(url);
    const canvas = document.createElement("canvas");
    const size = 60;
    const borderWidth = 3;
    
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Draw white border/background circle
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    ctx.fill();

    // Reset shadow for image
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Clip to inner circle for image
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, (size / 2) - borderWidth, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Draw image
    ctx.drawImage(img, borderWidth, borderWidth, size - (borderWidth * 2), size - (borderWidth * 2));
    ctx.restore();

    return {
      url: canvas.toDataURL(),
      scaledSize: new google.maps.Size(size, size),
      anchor: new google.maps.Point(size / 2, size / 2)
    };
  } catch (error) {
    console.error("Error building photo icon:", error);
    // Return default marker if image fails
    return {
      url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%234285F4'/%3E%3C/svg%3E",
      scaledSize: new google.maps.Size(40, 40)
    };
  }
}

// Initialize map
async function initMap() {
  const google = await loadGoogleMaps();
  if (!mapContainer.value) return;

  isMapLoading.value = true;

  mapInstance = new google.maps.Map(mapContainer.value, {
    zoom: 6,
    center: { lat: -1.2921, lng: 36.8219 },
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
  });
  setTimeout(() => (isMapLoading.value = false), 600);

  markers = [];

  // Sample taxi markers
  const sampleMarkers = [
    {
      lat: -1.291,
      lng: 36.821,
      img: "/assets/images/map-assets/ontransit-taxi.svg",
    },
    {
      lat: -1.295,
      lng: 36.825,
      img: "/assets/images/map-assets/available-taxi.svg",
    },
  ];

  sampleMarkers.forEach((m) => {
    const marker = new google.maps.Marker({
      position: { lat: m.lat, lng: m.lng },
      map: mapInstance,
      icon: {
        url: m.img,
        scaledSize: new google.maps.Size(45, 45),
      },
    });
    markers.push(marker);
  });

  // Gallery markers with photo icons
  const photoMarkerPromises = images.value.map(async (img) => {
    if (!img.lat || !img.lng) return null;

    const photoUrl = `https://picsum.photos/200/200?random=${img.id}`;
    const icon = await buildPhotoIcon(photoUrl);

    const marker = new google.maps.Marker({
      position: { lat: parseFloat(img.lat), lng: parseFloat(img.lng) },
      map: mapInstance,
      icon,
      animation: google.maps.Animation.DROP,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="min-width:150px; max-width: 250px;">
          <img src="${photoUrl}" style="width:100%; height:120px; object-fit:cover; border-radius:4px; margin-bottom:8px;" />
          <h6 style="margin:0 0 4px 0; font-weight:600;" class="text-capitalize mb-0">${img.Title}</h6>
          <p style="margin:0 0 4px 0; font-size:13px; color:#666;" class="mb-3">
            Uploaded By ${img.first_name} ${img.last_name} ${img.Public ? "🌐 Public" : "🔒 Private"}
          </p>
          <p style="font-size:12px; color:#888;">
            ${(img.Description || "No description").substring(0, 80)}...
          </p>

          <p>
            <strong>Date:</strong> ${new Date(img.Date).toLocaleDateString()} | <strong>Views:</strong> 789
            <br/>
            <strong>Location:</strong> ${img.Address || "Unknown"} 
        </div>
      `,
    });

    

    marker.addListener("mouseover", () => {
      infoWindow.open(mapInstance, marker);
    });

    marker.addListener("mouseout", () => {
      infoWindow.close();
    });

   marker.addListener("click", () => {
      const modal = new bootstrap.Modal(document.getElementById("imageDetailsModal"));
      modal.show();
    });


    
    return marker;
  });

  // Wait for all photo markers to be created
  const photoMarkers = await Promise.all(photoMarkerPromises);
  markers.push(...photoMarkers.filter(m => m !== null));

  // Clustering
  const { MarkerClusterer } = await import("@googlemaps/markerclusterer");
  
  clusterer = new MarkerClusterer({ 
    map: mapInstance, 
    markers,
    renderer: {
      render: ({ count, position }) => {
        return new google.maps.Marker({
          position,
          icon: {
            url: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Ccircle cx='25' cy='25' r='23' fill='%234285F4' stroke='white' stroke-width='3'/%3E%3Ctext x='25' y='32' text-anchor='middle' font-size='16' font-weight='bold' fill='white'%3E${count}%3C/text%3E%3C/svg%3E`,
            scaledSize: new google.maps.Size(50, 50),
          },
          label: undefined,
          zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        });
      }
    }
  });

  setTimeout(() => (isMapLoading.value = false), 600);
}

// Lifecycle
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
    initMap();
  }, 800);
});

const route = useRoute();
watch(
  () => route.fullPath,
  () => {
    if (route.path.includes("media")) setTimeout(() => initMap(), 300);
  }
);

onBeforeUnmount(() => {
  if (clusterer) {
    clusterer.clearMarkers();
  }
  mapInstance = null;
  markers = [];
  clusterer = null;
});
</script>

<style scoped >


.map-cont {
  height: 80vh;
  width: 100%;
  border-radius: 8px;
  background-color: #f6f6f6;
  overflow: hidden;
  position: relative;
}

.map-loader-overlay {
  inset: 0;
  position: absolute;
  background: rgba(255, 255, 255, 0.88);
  z-index: 20;
  backdrop-filter: blur(3px);
}

.shimmer {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(90deg, #eaeaea 25%, #f3f3f3 50%, #eaeaea 75%);
  animation: shimmerAnim 1.3s infinite linear;
  background-size: 400% 100%;
}

@keyframes shimmerAnim {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>