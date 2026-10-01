// ===============================
// main.js - Robust SPA initialization
// ===============================

// Import core Vue functions
import { createApp, nextTick } from 'vue'

// Import Pinia (state management library)
import { createPinia } from "pinia";

// Import root component
import App from './App.vue'

// Import router configuration
import router from './router'

// Import jQuery
import jQuery from 'jquery'

// Import your custom UI script
import { initTestScript } from './assets/js/test.js'

// Utility for dynamic script loading
import { loadScript } from './utils/loadScript.js'

// Import Pinia auth store
import { useAuthStore } from "@/stores/auth";

//select picker styles
import "vue3-select-component/styles"

// ------------------------
// Global jQuery
// ------------------------
window.$ = jQuery
window.jQuery = jQuery

// ------------------------
// Track loaded scripts
// ------------------------
let scriptsLoaded = {
  bootstrap: false,
  metismenu: false,
  simplebar: false,
  waves: false
}

// ------------------------
// UI Initialization
// ------------------------
function initSidebarAndUI() {
    // Initialize MetisMenu (if exists)
    if ($("#side-menu").length && $.fn.metisMenu) {
        $("#side-menu").metisMenu();
    }

    // Fullscreen toggle
    $('[data-bs-toggle="fullscreen"]').off("click").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("fullscreen-enable");
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    });

    // Waves.js initialization (once)
    if (window.Waves && !$("#waves-init").length) {
        Waves.init();
        $('<div id="waves-init"></div>').appendTo('body'); // mark as initialized
    }

    // Bootstrap tooltips
    [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      .forEach(el => new bootstrap.Tooltip(el));

    // Bootstrap popovers
    [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
      .forEach(el => new bootstrap.Popover(el));

    // Offcanvas components
    [].slice.call(document.querySelectorAll(".offcanvas"))
      .forEach(el => new bootstrap.Offcanvas(el));

    // Sidebar active link highlight
    const currentUrl = window.location.href.split(/[?#]/)[0];
    $("#sidebar-menu a").each(function() {
        if (this.href === currentUrl) {
            $(this).addClass("active");
            $(this).parents("li").addClass("mm-active");
            $(this).parents("ul").addClass("mm-show");
        }
    });

    // Scroll sidebar to active link (if exists)
    if ($("#sidebar-menu .mm-active .active").length) {
        const offset = $("#sidebar-menu .mm-active .active").offset()?.top || 0;
        if (offset > 300) {
            $(".vertical-menu .simplebar-content-wrapper").animate({ scrollTop: offset - 300 }, "slow");
        }
    }
}

// ------------------------
// Script loader helper
// ------------------------
function checkAndInitialize() {
    if (scriptsLoaded.bootstrap && scriptsLoaded.metismenu && scriptsLoaded.waves) {
        nextTick(() => {
            initSidebarAndUI();
            initTestScript?.(); // optional custom script
        });
    }
}

// ------------------------
// Load External Scripts
// ------------------------
loadScript('/libs/bootstrap/js/bootstrap.bundle.min.js')
     .then(() => { scriptsLoaded.bootstrap = true; checkAndInitialize(); })
     .catch(err => { console.error('Bootstrap load error', err); scriptsLoaded.bootstrap = true; checkAndInitialize(); });

   loadScript('/libs/metismenu/metisMenu.min.js')
     .then(() => { scriptsLoaded.metismenu = true; checkAndInitialize(); })
     .catch(err => { console.error('MetisMenu load error', err); scriptsLoaded.metismenu = true; checkAndInitialize(); });

   loadScript('/libs/simplebar/simplebar.min.js')
     .then(() => { scriptsLoaded.simplebar = true; })
     .catch(err => console.error('SimpleBar load error', err));

   loadScript('/libs/node-waves/waves.min.js')
     .then(() => { scriptsLoaded.waves = true; checkAndInitialize(); })
     .catch(err => { console.error('Waves load error', err); scriptsLoaded.waves = true; checkAndInitialize(); });
// ------------------------
// Vue App Setup

// ------------------------
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Pinia auth store
const auth = useAuthStore();
auth.initFromLocalStorage();

// Focus directive
app.directive('focus', {
    mounted(el) { el.focus(); }
});

// Mount app
app.mount('#app');

// ------------------------
// Re-initialize UI on route changes
// ------------------------
router.afterEach(() => {
    nextTick(() => {
        console.log("🔄 Re-initializing UI scripts after route change");
        initSidebarAndUI();
    });
});