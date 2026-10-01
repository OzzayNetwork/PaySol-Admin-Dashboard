<script setup>
import { useRoute } from "vue-router";
import LoaderVue from "./layouts/Loader.vue";
import HeaderVue from "./layouts/Header.vue";
import SideBar from "./layouts/Sidebar.vue";
import FooterVue from "./layouts/Footer.vue";
import MessageComposer from "./pages/Messenger/composeMessage.form.vue";
import OfflineBunner from "./pages/ErrorPages/Offline.Bunner.vue"

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import router from "./router"; // your router file

// ✅ Route Guard + Loader
router.beforeEach((to, from, next) => {
  NProgress.start();

  // Check if the route requires authentication
  const isAuthenticated = !!localStorage.getItem("authUser"); // or use Pinia auth store

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: "/login" });
  } else if (to.path === "/login" && isAuthenticated) {
    next({ path: "/" });
  } else {
    next();
  }
});

// ❌ Remove duplicate beforeEach (you already start NProgress above)

// ✅ Stop loader + Set Page Title after route change
router.afterEach((to) => {
  NProgress.done();

  // Set dynamic document title
  const defaultTitle = "CS Payments Dashboard";
  document.title = to.meta.title
    ? `${to.meta.title} | ${defaultTitle}`
    : defaultTitle;
});

const route = useRoute();
</script>

<template>
  <LoaderVue />
  <!-- <OfflineBunner/> -->

  <!-- If route is login, just render the login component -->
  <div v-if="route.meta.layout === 'none'">
    <router-view />
  </div>

  <!-- Otherwise, render full dashboard layout -->
  <div v-else id="layout-wrapper">
    <MessageComposer />
    <HeaderVue />
    <SideBar />

    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <router-view />
        </div>
      </div>
      <FooterVue />
    </div>
  </div>
</template>


