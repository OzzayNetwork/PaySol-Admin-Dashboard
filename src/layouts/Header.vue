<template>
    <header id="page-topbar">
        <div class="navbar-header">
            <div class="d-flex">
                <!-- LOGO -->
                <div class="navbar-brand-box">
                    <a href="index.html" class="logo logo-dark">
                        <span class="logo-sm">
                            <img src="../assets/images/logo.svg" alt="" height="22">
                        </span>
                        <span class="logo-lg">
                            <img src="../assets/images/logo-dark.png" alt="" height="17">
                        </span>
                    </a>

                    <a href="index.html" class="logo logo-light">
                        <span class="logo-sm">
                            <img src="../assets/images/logo-light.svg" alt="" height="45px" >
                        </span>
                        <span class="logo-lg">
                            <img src="../assets/images/logo-white.svg" alt="" >
                        </span>
                    </a>
                </div>

                <button type="button" class="btn btn-sm px-3 font-size-16 header-item waves-effect"
                    id="vertical-menu-btn">
                    <i class="fa fa-fw fa-bars"></i>
                </button>
                <!-- logo small -->
                <div class="phone-logo d-md-none d-sm-flex"> <img src="../assets/images/color-log0.svg" alt=""
                        class="img"></div>



                <!-- App Search-->
                <form class="app-search d-none d-lg-block">
                    <div class="position-relative">
                        <input type="text" class="form-control" placeholder="Search...">
                        <span class="bx bx-search-alt"></span>
                    </div>
                </form>


            </div>

            <div class="d-flex">
                <!-- small search -->
                <div class="dropdown d-inline-block d-lg-none ms-2">
                    <button type="button" class="btn header-item noti-icon waves-effect"
                        id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i class="mdi mdi-magnify"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-search-dropdown">

                        <form class="p-3">
                            <div class="form-group m-0">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search ..."
                                        aria-label="Recipient's username">
                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="submit"><i
                                                class="mdi mdi-magnify"></i></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="dropdown  ms-1 d-none">
                    <a href="pricing.html" type="button"
                        class="btn header-item noti-icon waves-effect d-flex align-items-center justify-content-center">
                        <i class="bx bx-dollar"></i> <span class="d-none d-md-inline">Ai Sui</span>
                    </a>
                </div>
                <AIAgentDropdownMenu />
                <div class="dropdown d-none d-lg-inline-block ms-1">
                    <button type="button" class="btn header-item noti-icon waves-effect" data-bs-toggle="fullscreen">
                        <i class="bx bx-fullscreen" data-bs-placement="top" title="Full Screen"></i>
                    </button>
                </div>

                <div class="dropdown d-inline-block">

                    <!-- notifications, i will come to this later -->
                    <button type="button" class="btn header-item noti-icon waves-effect"
                        id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i class="bx bx-bell bx-tada" data-bs-placement="top" title="System Notifications"></i>
                        <span class="badge bg-danger rounded-pill">3</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-notifications-dropdown">
                        <div class="p-3">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h6 class="m-0" key="t-notifications"> Notifications </h6>
                                </div>
                                <div class="col-auto">
                                    <a href="#!" class="small" key="t-view-all"> View All</a>
                                </div>
                            </div>
                        </div>
                        <div data-simplebar style="max-height: 230px;">
                            <a href="javascript: void(0);" class="text-reset notification-item">
                                <div class="d-flex">
                                    <div class="avatar-xs me-3">
                                        <span class="avatar-title bg-primary rounded-circle font-size-16">
                                            <i class="bx bx-cart"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1" key="t-your-order">Your order is placed</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1" key="t-grammer">If several languages coalesce the grammar
                                            </p>
                                            <p class="mb-0"><i class="mdi mdi-clock-outline"></i> <span
                                                    key="t-min-ago">3 min ago</span></p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="javascript: void(0);" class="text-reset notification-item">
                                <div class="d-flex">
                                    <img src="../assets/images/users/avatar-3.jpg" class="me-3 rounded-circle avatar-xs"
                                        alt="user-pic">
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1">James Lemire</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1" key="t-simplified">It will seem like simplified English.</p>
                                            <p class="mb-0"><i class="mdi mdi-clock-outline"></i> <span
                                                    key="t-hours-ago">1 hours ago</span></p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <a href="javascript: void(0);" class="text-reset notification-item">
                                <div class="d-flex">
                                    <div class="avatar-xs me-3">
                                        <span class="avatar-title bg-success rounded-circle font-size-16">
                                            <i class="bx bx-badge-check"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1" key="t-shipped">Your item is shipped</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1" key="t-grammer">If several languages coalesce the grammar
                                            </p>
                                            <p class="mb-0"><i class="mdi mdi-clock-outline"></i> <span
                                                    key="t-min-ago">3 min ago</span></p>
                                        </div>
                                    </div>
                                </div>
                            </a>

                            <a href="javascript: void(0);" class="text-reset notification-item">
                                <div class="d-flex">
                                    <img src="../assets/images/users/avatar-4.jpg" class="me-3 rounded-circle avatar-xs"
                                        alt="user-pic">
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1">Salena Layfield</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1" key="t-occidental">As a skeptical Cambridge friend of mine
                                                occidental.</p>
                                            <p class="mb-0"><i class="mdi mdi-clock-outline"></i> <span
                                                    key="t-hours-ago">1 hours ago</span></p>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="p-2 border-top d-grid">
                            <a class="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                                <i class="mdi mdi-arrow-right-circle me-1"></i> <span key="t-view-more">View
                                    More..</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="dropdown d-inline-block d-none">

                    <!-- packages balances -->
                    <button type="button" class="btn header-item noti-icon waves-effect"
                        id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">
                        <i class="mdi mdi-format-quote-open"></i>
                        <span class="badge bg-success rounded-pill d-none">303</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        aria-labelledby="page-header-notifications-dropdown">
                        <div class="p-3">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h6 class="m-0" key="t-notifications">Your Package Balances</h6>
                                </div>
                                <div class="col-auto">
                                    <a href="#!" class="small" key="t-view-all">Set notification limit</a>
                                </div>
                            </div>
                        </div>
                        <div data-simplebar style="max-height: 230px;">
                            <div href="javascript: void(0);" class="text-reset notification-item">
                                <div class="d-flex">
                                    <div class="avatar-xs me-3">
                                        <span class="avatar-title bg-primary rounded-circle font-size-16">
                                            <i class="mdi mdi-chat-outline text-white"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1" key="t-your-order">SMS Bundles</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1" key="t-grammer">6,503</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div href="javascript: void(0);" class="text-reset notification-item">
                                <div class="d-flex">
                                    <div class="avatar-xs me-3">
                                        <span class="avatar-title bg-pink rounded-circle font-size-16">
                                            <i class="mdi mdi-email-multiple-outline text-white"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1" key="t-your-order">mdi mdi-email-multiple-outline text-white
                                        </h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1" key="t-grammer">180</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div href="javascript: void(0);" class="text-reset notification-item">
                                <div class="d-flex">
                                    <div class="avatar-xs me-3">
                                        <span class="avatar-title bg-whatsApp rounded-circle font-size-16">
                                            <i class="mdi mdi-whatsapp text-white"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1">
                                        <h6 class="mb-1" key="t-your-order">WhatsApp Bundles</h6>
                                        <div class="font-size-12 text-muted">
                                            <p class="mb-1" key="t-grammer">23,203</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-2 border-top d-grid">
                            <a class="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                                <i class="mdi mdi-arrow-up-bold-circle-outline me-1"></i> <span key="t-view-more">Top
                                    up</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div v-if="auth.isAuthenticated" class="dropdown d-inline-block">
                    <button type="button" class="btn header-item waves-effect d-flex align-items-center"
                        id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true"
                        aria-expanded="false">

                        <div v-if="user">
                            <img v-if="user.profile_photo_url" class="rounded-circle header-profile-user avatar-sm"
                               :src="user.profile_photo_url" alt="Header Avatar" />

                           
                            <template v-else>
                                 <div class="avatar-sm header-profile-user d-none d-md-flex" >
                                <span class="avatar-title rounded-circle bg-primary font-size-16 bg-loader">
                                    <strong class="text-uppercase">
                                        {{
                                            (user.first_name?.trim()?.charAt(0) || '?') +
                                            (user.last_name?.trim()?.charAt(0) || '?')
                                        }}
                                    </strong>
                                </span>

                            </div>

                             <div class="avatar-xs header-profile-user d-sm-flex d-xs-flex d-md-none">
                                <span class="avatar-title rounded-circle bg-primary font-size-1 bg-loader">
                                    <strong class="text-uppercase">
                                        {{
                                            (user.first_name?.trim()?.charAt(0) || '?') +
                                            (user.last_name?.trim()?.charAt(0) || '?')
                                        }}
                                    </strong>
                                </span>

                            </div>
                            </template>

                        </div>
                        <div class="avatar-sm placeholder-glow" v-else>
                            <span class="avatar-title rounded-circle bg-dark-muted bg-loader font-size-16 placeholder">
                                <strong class="opacity-25">?</strong>
                            </span>
                        </div>
                        <h5 class="text-left mb-0 mx-3 d-fle d-none d-md-flex  flex-column align-items-star text-capitalize">
                            <div>
                                <!-- User name -->
                                <span v-if="user" class="d-inline-block d-xl-inline-block" key="t-henry">
                                    {{ user.first_name +" "+ user.last_name}}

                                </span>
                                <span v-else class="d-inline-block d-xl-inline-block placeholder-glow overflow-hidden"
                                    style="height: 15px; width: 150px;">
                                    <span class="placeholder  col-8 me-1"></span>
                                    <span class="placeholder  col-3"></span>
                                </span>

                                <i class="mdi mdi-chevron-down d-inline-block d-xl-inline-block"></i>
                            </div>

                            <!-- User email -->
                            <p class="fs-12 mb-0 text-muted text-lowercase" v-if="user">{{ user.email }}</p>
                            <p class="fs-12 mb-0 text-muted placeholder-glow overflow-hidden"
                                style="height: 15px; width: 150px;" v-else>
                                <span class="placeholder col-12"></span>
                            </p>
                        </h5>

                    </button>
                    <div class="dropdown-menu dropdown-menu-end p-0">
                        <!-- profile photo and name here -->
                         <div class="p-2 d-flex align-items-center gap-2 cursor-pointer">
                             <div class="d-flex gap-2 align-items-center cursor-pointer p-2 px-3">  
                                <div v-if="user">
                                <img v-if="user.profile_photo_url" class="rounded-circle header-profile-user avatar-sm"
                                :src="user.profile_photo_url" alt="Header Avatar" />

                            
                                <template v-else>                                  

                                    <div class="avatar-sm header-profile-user d-sm-flex d-flex bg-white">
                                        <span class="avatar-title rounded-circle bg-primary font-size-1 bg-loader">
                                            <strong class="text-uppercase">
                                                {{
                                                    (user.first_name?.trim()?.charAt(0) || '?') +
                                                    (user.last_name?.trim()?.charAt(0) || '?')
                                                }}
                                            </strong>
                                        </span>

                                    </div>
                                </template>

                            </div>

                            <div>
                                 <div v-if="user" class="d-flex flex-column" key="t-henry">
                                    <span class="text-capitalize text-black">{{ user.first_name +" "+ user.last_name}}</span>
                                    <span class="small text-muted">{{ user.email }}</span>
                                </div>
                                <span v-else class="d-inline-block d-xl-inline-block placeholder-glow overflow-hidden"
                                    style="height: 15px; width: 150px;">
                                    <span class="placeholder  col-8 me-1"></span>
                                    <span class="placeholder  col-3"></span>
                                    </span>
                            </div>
                             </div>
                         </div>
                        <!-- Profile -->
                         <div class="p-2 border-top border-1 d-flex flex-column gap-2">
                            <a class="dropdown-item px-3" href="myprofile.html">
                                <i class="bx bx-user font-size-1 align-middle me-1 align-middle me-2 fs-4"></i>
                                <span key="t-profile">My Profile</span>
                            </a>
                             <!-- Logs -->
                            <a class="dropdown-item px-3" href="my-logs.html">
                                <i class="mdi mdi-chart-timeline-variant align-middle me-1 align-middle me-2 fs-4"></i>
                                <span key="t-logs">My Activity Logs</span>
                            </a>

                            <!-- Lock Screen -->
                            <a class="dropdown-item px-3" href="auth-lock-screen.html">
                                <i class="mdi mdi-shield-off-outline align-middle me-1 align-middle me-2 fs-4"></i>
                                <span key="t-lock-screen">Lock Screen</span>
                            </a>
                            <!-- Change Password -->
                            <router-link 
                                class="dropdown-item px-3" 
                                :to="{
                                    path: '/reset-password',
                                    query: {
                                    mode: 'change Password',
                                    email: user?.email || ''
                                    }
                                }"
                            >
                                <i class="mdi mdi-form-textbox-password align-middle me-1 align-middle me-2 fs-4"></i>
                                <span key="t-change-password">Change Password</span>
                            </router-link>
                         </div>
                        

                       

                        <div class="dropdown-divider m-0"></div>

                        <!-- Logout -->
                        <div class="p-2">
                            <a class="dropdown-item  px-3 " href="javascript:void(0)" @click="handleLogout">
                                <i class="mdi mdi-logout align-middle me-1 align-middle me-2 fs-4"></i>
                                <span key="t-logout">Logout</span>
                            </a>
                        </div>
                    </div>

                </div>
                <div class="d-flex align-items-center justify-content-center px-3" v-else>
                    <!-- Show login button / redirect -->
                    <router-link class="btn btn-primary waves-effect waves-light" to="/login">
                        <i class="bx bx-log-in font-size-16 me-1"></i> Account Login
                    </router-link>
                </div>


            </div>
        </div>
    </header>

    


    <ScrollUp/>
</template>

<script setup>
import { ref, onMounted } from "vue";

import authApi from "@/api/auth";   // API module for authentication requests

import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router"; // needed for redirect
import AIAgentDropdownMenu from "@/pages/AiAgents/AI.agent.dropdown.menu.vue"
import ScrollUp from "@/layouts/ScrollUp.vue"

const user = ref(null);
const auth = useAuthStore();
const router = useRouter(); // access Vue Router

const email=ref(auth.user?.email || localStorage.getItem("authUser") ? JSON.parse(localStorage.getItem("authUser")).email : null);

// Handle logout
const handleLogout = () => {
    try {
        // Clear Pinia store if it has a logout action
        if (auth.logout) {
            auth.logout();
        }

        // Always clear localStorage
        localStorage.removeItem("authUser");
        localStorage.removeItem("authToken");

        const response= authApi.logout(); // Call API to invalidate session if needed

        console.log(response.data);


        // Redirect to login
        router.push("/login");
    } catch (err) {
        console.error("❌ Logout failed:", err);
    }
};

onMounted(() => {
    try {
        const userJson = localStorage.getItem("authUser");
        if (userJson) {
            user.value = JSON.parse(userJson);
            console.log("✅ User loaded from localStorage:", user.value);
        } else {
            console.warn("⚠️ No user found in localStorage");
        }
    } catch (err) {
        console.error("❌ Failed to parse localStorage user:", err);
        user.value = null;
    }
});
</script>

<style lang="scss" scoped></style>