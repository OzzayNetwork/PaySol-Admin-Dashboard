import { createRouter, createWebHistory } from 'vue-router'

// Import your views
import GalleryView from '@/pages/Gallery/gallery.view.vue'
import MediaAlbums from '@/pages/Gallery/gallery.albums.vue'
import MapView from '@/pages/Gallery/gallery.map.vue'

const routes = [
  {
    path: '/gallery/view',
    name: 'GalleryView',
    component: GalleryView,
    children: [
      {
        path: 'media-albums',
        name: 'MediaAlbums',
        component: MediaAlbums,
        meta: { title: 'Media Albums' }
      },
      {
        path: 'map-view',
        name: 'MapView',
        component: MapView,
        meta: { title: 'Map View' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
