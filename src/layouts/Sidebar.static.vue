<template>
    <!-- ========== Left Sidebar Start ========== -->

    <div class="vertical-menu">

        <div data-simplebar class="h-100">

            <!--- Sidemenu -->

            <div id="sidebar-menu">

                <!-- Left Menu Start -->

                <ul class="metismenu list-unstyled" id="side-menu">

                    <li class="menu-title" key="t-apps">Platform Administration</li>

                  

                    <!-- ========================= -->
                    <!-- HOME & ANALYTICS -->
                    <!-- ========================= -->

                    <li :class="{ active: isActive('/') }">

                        <router-link
                            to="/"
                            class="waves-effect"
                            :class="{ active: isActive('/') }"
                        >
                            <Icon
                                :icon="isActive('/') ? 'boxicons:dashboard-alt-filled' : 'boxicons:dashboard-alt'"
                                class="menu-icon"
                            />

                            <span>Overview</span>
                        </router-link>

                    </li>


                    <!-- ========================= -->
                    <!-- TEST PAGE -->
                    <!-- ========================= -->

                    <li :class="{ active: isActive('/test-page') }">

                        <router-link
                            to="/test-page"
                            class="waves-effect"
                            :class="{ active: isActive('/test-page') }"
                        >
                            <Icon
                                :icon="isActive('/test-page') ? 'ri:flask-fill' : 'ri:flask-line'"
                                class="menu-icon"
                            />

                            <span>Test Page</span>
                        </router-link>

                    </li>


                    <!-- ========================= -->
                    <!-- TENANT -->
                    <!-- ========================= -->

                    <li :class="{ active: isActive('/hero-landing') }">

                        <router-link
                            to="/hero-landing"
                            class="waves-effect"
                            :class="{ active: isActive('/hero-landing') }"
                        >
                            <Icon
                                :icon="isActive('/hero-landing') ? 'ri:building-2-fill' : 'ri:building-2-line'"
                                class="menu-icon"
                            />

                            <span>Tenants</span>
                        </router-link>

                    </li>
                     <li :class="{ active: isActive('/hero-landing') }">

                        <router-link
                            to="/hero-landing"
                            class="waves-effect"
                            :class="{ active: isActive('/hero-landing') }"
                        >
                            <Icon
                                :icon="isActive('/hero-landing') ? 'carbon:add-filled' : 'carbon:add-alt'"
                                class="menu-icon"
                            />

                            <span>Onboard a Tenant</span>
                        </router-link>

                    </li>
                    <hr>                   

                    <li :class="{ active: isActive('/hero-landing') }">

                        <router-link
                            to="/hero-landing"
                            class="waves-effect"
                            :class="{ active: isActive('/hero-landing') }"
                        >
                            <Icon
                                :icon="isActive('/hero-landing') ? 'ri:price-tag-3-fill' : 'ri:price-tag-3-line'"
                                class="menu-icon"
                            />

                            <span>Product Catalogue</span>
                        </router-link>

                    </li>

                    <li :class="{ active: isActive('/hero-landing') }">

                        <router-link
                            to="/hero-landing"
                            class="waves-effect"
                            :class="{ active: isActive('/hero-landing') }"
                        >
                            <Icon
                                :icon="isActive('/hero-landing') ? 'ri:map-pin-2-fill' : 'ri:map-pin-2-line'"
                                class="menu-icon"
                            />

                            <span>Locations</span>
                        </router-link>

                    </li>

                    <li :class="{ active: isActive('/hero-landing') }">

                        <router-link
                            to="/hero-landing"
                            class="waves-effect"
                            :class="{ active: isActive('/hero-landing') }"
                        >
                            <Icon
                                :icon="isActive('/hero-landing') ? 'fluent:briefcase-32-filled' : 'fluent:briefcase-32-regular'"
                                class="menu-icon"
                            />

                            <span>Business Registry</span>
                        </router-link>

                    </li>

                    <li :class="{ active: isActive('/hero-landing') }">

                        <router-link
                            to="/hero-landing"
                            class="waves-effect"
                            :class="{ active: isActive('/hero-landing') }"
                        >
                            <Icon
                                :icon="isActive('/hero-landing') ? 'boxicons:search-plus-filled' : 'boxicons:search-plus'"
                                class="menu-icon"
                            />

                            <span>Client Leads</span>
                        </router-link>

                    </li>

                    <li :class="{ active: isActive('/hero-landing') }">

                        <router-link
                            to="/hero-landing"
                            class="waves-effect"
                            :class="{ active: isActive('/hero-landing') }"
                        >
                            <Icon
                                :icon="isActive('/hero-landing') ? 'ri:bank-fill' : 'ri:bank-line'"
                                class="menu-icon"
                            />

                            <span>Banks & PayBills</span>
                        </router-link>

                    </li>

                    


                    <!-- ========================= -->
                    <!-- FACILITIES -->
                    <!-- ========================= -->

                    <li
                        :class="{
                            'mm-active': isActiveParent([
                                '/facilities',
                                'facilities/add',
                                '/facilities/subscriptions',
                                '/facilities/moh-register'
                            ])
                        }"
                    >

                        <a
                            href="javascript: void(0);"
                            class="waves-effect has-arrow"
                        >
                            <Icon
                                :icon="isActiveParent([
                                    '/facilities',
                                    'facilities/add',
                                    '/facilities/subscriptions',
                                    '/facilities/moh-register'
                                ])
                                    ? 'ri:hospital-fill'
                                    : 'ri:hospital-line'"
                                class="menu-icon"
                            />

                            <span>Facilities</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li :class="{ active: isCurrentPage('facilities/add') }">
                                <router-link
                                    to="/facilities/add"
                                    class="waves-effect"
                                >
                                    Add Facility
                                </router-link>
                            </li>

                            <li :class="{ active: isCurrentPage('/facilities') }">
                                <router-link
                                    to="/facilities"
                                    class="waves-effect"
                                >
                                    Onboarded Facilities
                                </router-link>
                            </li>

                            <li :class="{ active: isCurrentPage('/facilities/subscriptions') }">
                                <router-link
                                    to="/facilities/subscriptions"
                                    class="waves-effect"
                                >
                                    Subscriptions Plans
                                </router-link>
                            </li>

                        </ul>

                    </li>

                   <hr/>
                    <!-- ========================= -->
                    <!-- BLOG -->
                    <!-- ========================= -->

                    <li
                        :class="{
                            'mm-active': isActiveParent([
                                '/blogs',
                                '/newArticle',
                                '/blog/categories',
                                '/blog/tags'
                            ])
                        }"
                    >

                        <a
                            href="javascript: void(0);"
                            class="waves-effect has-arrow"
                        >
                            <Icon
                                :icon="isActiveParent([
                                    '/blogs',
                                    '/newArticle',
                                    '/blog/categories',
                                    '/blog/tags'
                                ])
                                    ? 'ri:article-fill'
                                    : 'ri:article-line'"
                                class="menu-icon"
                            />

                            <span>Blog posts</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li :class="{ active: isCurrentPage('/blogs') }">
                                <router-link
                                    to="/blogs"
                                    class="waves-effect"
                                >
                                    All Articles
                                </router-link>
                            </li>

                            <li :class="{ active: isCurrentPage('/newArticle') }">
                                <router-link
                                    to="/newArticle"
                                    class="waves-effect"
                                >
                                    Create Article
                                </router-link>
                            </li>

                            <li
                                class="d-none"
                                :class="{ active: isCurrentPage('/blog/categories') }"
                            >
                                <router-link
                                    to="/blog/categories"
                                    class="waves-effect"
                                >
                                    Categories
                                </router-link>
                            </li>

                            <li
                                class="d-none"
                                :class="{ active: isCurrentPage('/blog/tags') }"
                            >
                                <router-link
                                    to="/blog/tags"
                                    class="waves-effect"
                                >
                                    Tags
                                </router-link>
                            </li>

                        </ul>

                    </li>

                   

                    <!-- ========================= -->
                    <!-- PARTNERS -->
                    <!-- ========================= -->

                    <li
                        :class="{
                            'mm-active': isActiveParent([
                                '/partners/list',
                                '/partners/categories',
                                '/partners/add'
                            ])
                        }"
                    >

                        <a
                            href="javascript: void(0);"
                            class="waves-effect has-arrow"
                        >
                           <Icon
                                :icon="isActiveParent([
                                    '/partners/list',
                                    '/partners/categories',
                                    '/partners/add'
                                ])
                                    ? 'ri:building-2-fill'
                                    : 'ri:building-2-line'"
                                class="menu-icon"
                            />

                            <span>Our Partners</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li :class="{ active: isCurrentPage('/partners/list') }">
                                <router-link
                                    to="/partners/list"
                                    class="waves-effect"
                                >
                                    All Partners
                                </router-link>
                            </li>

                            <li :class="{ active: isCurrentPage('/partners/add') }">
                                <router-link
                                    to="/partners/add"
                                    class="waves-effect"
                                >
                                    Add Partner
                                </router-link>
                            </li>

                        </ul>

                    </li>


                    <!-- ========================= -->
                    <!-- INVENTORY -->
                    <!-- ========================= -->

                    <li class="d-none"
                        :class="{
                            'mm-active': isActiveParent([
                                '/POS-Manager/inventory',
                                '/POS-Manager/new-product'
                            ])
                        }"
                    >

                        <a
                            href="javascript: void(0);"
                            class="waves-effect has-arrow"
                        >
                            <Icon
                                :icon="isActiveParent([
                                    '/POS-Manager/inventory',
                                    '/POS-Manager/new-product'
                                ])
                                    ? 'ri:archive-fill'
                                    : 'ri:archive-line'"
                                class="menu-icon"
                            />

                            <span>Inventory</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li :class="{ active: isCurrentPage('/POS-Manager/inventory') }">
                                <router-link
                                    to="/POS-Manager/inventory"
                                    class="waves-effect"
                                >
                                    Products & Services
                                </router-link>
                            </li>

                            <li :class="{ active: isCurrentPage('/POS-Manager/new-product') }">
                                <router-link
                                    to="/POS-Manager/new-product"
                                    class="waves-effect"
                                >
                                    Add Item
                                </router-link>
                            </li>

                        </ul>

                    </li>


                    <!-- ========================= -->
                    <!-- SALES -->
                    <!-- ========================= -->

                    <li class="d-none"
                        :class="{
                            'mm-active': isActiveParent([
                                '/Sales/POS',
                                '/MenuProducts',
                                '/coming-soon'
                            ])
                        }"
                    >

                        <a
                            href="javascript: void(0);"
                            class="waves-effect has-arrow"
                        >
                            <Icon
                                :icon="isActiveParent([
                                    '/Sales/POS',
                                    '/MenuProducts',
                                    '/coming-soon'
                                ])
                                    ? 'ri:receipt-fill'
                                    : 'ri:receipt-line'"
                                class="menu-icon"
                            />

                            <span>Sales</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li :class="{ active: isCurrentPage('/MenuProducts') }">
                                <router-link
                                    to="/MenuProducts"
                                    class="waves-effect"
                                >
                                    View Sales
                                </router-link>
                            </li>

                            <li :class="{ active: isCurrentPage('/Sales/POS') }">
                                <router-link
                                    to="/Sales/POS"
                                    class="waves-effect"
                                >
                                    Make Sale (POS)
                                </router-link>
                            </li>

                            <li>
                                <router-link
                                    to="/coming-soon"
                                    class="waves-effect"
                                >
                                    Open Bills
                                </router-link>
                            </li>

                            <li>
                                <router-link
                                    to="/coming-soon"
                                    class="waves-effect"
                                >
                                    Quotations
                                </router-link>
                            </li>

                            <li>
                                <router-link
                                    to="/coming-soon"
                                    class="waves-effect"
                                >
                                    Credit Note
                                </router-link>
                            </li>

                        </ul>

                    </li>


                    <!-- ========================= -->
                    <!-- MEDIA GALLERY -->
                    <!-- ========================= -->

                    <li
                        :class="{
                            'mm-active': isActiveParent([
                                '/gallery/view',
                                '/gallery/upload',
                                '/gallery/categories'
                            ])
                        }"
                    >

                        <a
                            href="javascript: void(0);"
                            class="waves-effect has-arrow"
                        >
                            <Icon
                                :icon="isActiveParent([
                                    '/gallery/view',
                                    '/gallery/upload',
                                    '/gallery/categories'
                                ])
                                    ? 'ri:image-2-fill'
                                    : 'ri:image-2-line'"
                                class="menu-icon"
                            />

                            <span>Media Gallery</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li :class="{ active: isCurrentPage('/gallery/view') }">
                                <router-link
                                    to="/gallery/view"
                                    class="waves-effect"
                                >
                                    Media Library
                                </router-link>
                            </li>

                            <li :class="{ active: isCurrentPage('/gallery/upload') }">
                                <router-link
                                    to="/gallery/upload"
                                    class="waves-effect"
                                >
                                    Upload Media
                                </router-link>
                            </li>

                            <li :class="{ active: isCurrentPage('/gallery/categories') }">
                                <router-link
                                    to="/gallery/categories"
                                    class="waves-effect"
                                >
                                    Media Categories
                                </router-link>
                            </li>

                        </ul>

                    </li>


                    <!-- ========================= -->
                    <!-- FILE MANAGER -->
                    <!-- ========================= -->

                    <li
                        :class="{
                            'mm-active': isActiveParent([
                                '/file-manager',
                                '/file-manager/file-new'
                            ])
                        }"
                    >

                        <a
                            href="javascript: void(0);"
                            class="waves-effect has-arrow"
                        >
                            <Icon
                                :icon="isActiveParent([
                                    '/file-manager',
                                    '/file-manager/file-new'
                                ])
                                    ? 'ri:folder-3-fill'
                                    : 'ri:folder-3-line'"
                                class="menu-icon"
                            />

                            <span>File Manager</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li :class="{ active: isCurrentPage('/file-manager') }">
                                <router-link
                                    to="/file-manager"
                                    class="waves-effect"
                                >
                                    Files Library
                                </router-link>
                            </li>

                            <li :class="{ active: isCurrentPage('/file-manager/file-new') }">
                                <router-link
                                    to="/file-manager/file-new"
                                    class="waves-effect"
                                >
                                    Upload File
                                </router-link>
                            </li>

                        </ul>

                    </li>


                  

                    <li class="menu-title" key="t-apps">Reports</li>


                    <!-- ========================= -->
                    <!-- PRODUCT SALES -->
                    <!-- ========================= -->

                    <li
                        :class="{
                            'mm-active': isActiveParent(['/coming-soon'])
                        }"
                    >

                        <a
                            href="javascript: void(0);"
                            class="waves-effect has-arrow"
                        >
                            <Icon
                                :icon="isActiveParent(['/coming-soon'])
                                    ? 'ri:shopping-cart-2-fill'
                                    : 'ri:shopping-cart-2-line'"
                                class="menu-icon"
                            />

                            <span>Product Sales</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li>
                                <router-link
                                    to="/coming-soon"
                                    class="waves-effect"
                                >
                                    Sales Reports
                                </router-link>
                            </li>

                            <li>
                                <router-link
                                    to="/coming-soon"
                                    class="waves-effect"
                                >
                                    Pending Payments
                                </router-link>
                            </li>

                            <li>
                                <router-link
                                    to="/coming-soon"
                                    class="waves-effect"
                                >
                                    Product Performance
                                </router-link>
                            </li>

                        </ul>

                    </li>


                    <!-- ========================= -->
                    <!-- CASHIER SALES REPORTS -->
                    <!-- ========================= -->

                    <li :class="{ active: isActive('/coming-soon') }">

                        <router-link
                            to="/coming-soon"
                            class="waves-effect"
                            :class="{ active: isActive('/coming-soon') }"
                        >
                            <Icon
                                :icon="isActive('/coming-soon')
                                    ? 'ri:money-dollar-box-fill'
                                    : 'ri:money-dollar-box-line'"
                                class="menu-icon"
                            />

                            <span>Cashier Sales Reports</span>
                        </router-link>

                    </li>


                    <!-- ========================= -->
                    <!-- STOCK MOVEMENT -->
                    <!-- ========================= -->

                    <li
                        :class="{
                            'mm-active': isActiveParent(['/coming-soon'])
                        }"
                    >

                        <a
                            href="javascript: void(0);"
                            class="waves-effect has-arrow"
                        >
                            <Icon
                                :icon="isActiveParent(['/coming-soon'])
                                    ? 'ri:store-2-fill'
                                    : 'ri:store-2-line'"
                                class="menu-icon"
                            />

                            <span>Stock Movement</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li>
                                <router-link
                                    to="/coming-soon"
                                    class="waves-effect"
                                >
                                    Materials/Ingredients Stk
                                </router-link>
                            </li>

                            <li>
                                <router-link
                                    to="/coming-soon"
                                    class="waves-effect"
                                >
                                    Products Stock
                                </router-link>
                            </li>

                        </ul>

                    </li>


                    <!-- ========================= -->
                    <!-- CLIENTS REGISTER -->
                    <!-- ========================= -->

                    <li :class="{ active: isActive('/coming-soon') }">

                        <router-link
                            to="/coming-soon"
                            class="waves-effect"
                            :class="{ active: isActive('/coming-soon') }"
                        >
                            <Icon
                                :icon="isActive('/coming-soon')
                                    ? 'ri:group-2-fill'
                                    : 'ri:group-2-line'"
                                class="menu-icon"
                            />

                            <span>Clients Register</span>
                        </router-link>

                    </li>


                    <hr>


                    <!-- ========================= -->
                    <!-- MESSENGER -->
                    <!-- ========================= -->

                    <li class="menu-title" key="t-apps">Messenger</li>


                    <!-- Compose Message -->

                    <li>

                        <a
                            href="javascript: void(0);"
                            class="waves-effect write-msg-btn"
                            @click="onComposeClick"
                        >
                            <Icon
                                icon="ri:edit-2-line"
                                class="menu-icon"
                            />

                            <span>Compose Message</span>
                        </a>

                    </li>


                    <!-- Sent Messages -->

                    <li :class="{ active: isActive('/coming-soon') }">

                        <router-link
                            to="/coming-soon"
                            class="waves-effect"
                            :class="{ active: isActive('/coming-soon') }"
                        >
                            <Icon
                                :icon="isActive('/coming-soon')
                                    ? 'ri:mail-send-fill'
                                    : 'ri:mail-send-line'"
                                class="menu-icon"
                            />

                            <span>Sent Messages</span>
                        </router-link>

                    </li>


                    <!-- Address Book -->

                    <li
                        :class="{
                            'mm-active': isActiveParent(['/coming-soon'])
                        }"
                    >

                        <a
                            href="javascript: void(0);"
                            class="waves-effect has-arrow"
                        >
                            <Icon
                                :icon="isActiveParent(['/coming-soon'])
                                    ? 'ri:contacts-fill'
                                    : 'ri:contacts-line'"
                                class="menu-icon"
                            />

                            <span>Address Book</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li>

                                <a
                                    href="#"
                                    data-bs-toggle="modal"
                                    data-bs-target="#add-contact"
                                    class="btn btn-info text-center mx-4 px-3 text-white mb-3"
                                >
                                    <Icon
                                        icon="ri:user-add-line"
                                        class="menu-icon text-white"
                                    />

                                    Add Contact
                                </a>

                            </li>

                            <li>
                                <router-link
                                    to="/coming-soon"
                                    class="waves-effect"
                                >
                                    Contact Book list
                                </router-link>
                            </li>

                        </ul>

                    </li>


                    <hr>


                    <!-- ========================= -->
                    <!-- SITE IDENTITY -->
                    <!-- ========================= -->

                    <li :class="{ active: isActive('/site-identity') }">

                        <router-link
                            to="/site-identity"
                            class="waves-effect"
                            :class="{ active: isActive('/site-identity') }"
                        >
                            <Icon
                                :icon="isActive('/site-identity')
                                    ? 'ri:building-4-fill'
                                    : 'ri:building-4-line'"
                                class="menu-icon"
                            />

                            <span>Site Identity</span>
                        </router-link>

                    </li>


                    <!-- ========================= -->
                    <!-- SETTINGS -->
                    <!-- ========================= -->

                    <li :class="{ active: isActive('/coming-soon') }">

                        <router-link
                            to="/coming-soon"
                            class="waves-effect"
                            :class="{ active: isActive('/coming-soon') }"
                        >
                            <Icon
                                :icon="isActive('/coming-soon')
                                    ? 'ri:settings-3-fill'
                                    : 'ri:settings-3-line'"
                                class="menu-icon"
                            />

                            <span>Settings</span>
                        </router-link>

                    </li>


                    <!-- ========================= -->
                    <!-- SYSTEM USERS -->
                    <!-- ========================= -->

                    <li
                        :class="{
                            'mm-active': isActiveParent([
                                '/users/list',
                                '/users/register'
                            ])
                        }"
                    >

                        <a
                            href="javascript:void(0);"
                            class="waves-effect has-arrow"
                        >
                            <Icon
                                :icon="isActiveParent([
                                    '/users/list',
                                    '/users/register'
                                ])
                                    ? 'heroicons:users-solid'
                                    : 'humbleicons:users'"
                                class="menu-icon"
                            />

                            <span>System Users</span>
                        </a>

                        <ul class="sub-menu" aria-expanded="false">

                            <li :class="{ active: isCurrentPage('/users/list') }">
                                <router-link
                                    to="/users/list"
                                    class="waves-effect"
                                >
                                    System Users
                                </router-link>
                            </li>

                            <li :class="{ active: isCurrentPage('/users/register') }">
                                <router-link
                                    to="/users/register"
                                    class="waves-effect"
                                >
                                    Add a System User
                                </router-link>
                            </li>

                        </ul>

                    </li>

                </ul>

            </div>

            <!-- Sidebar -->

        </div>

    </div>

    <!-- Left Sidebar End -->
</template>


<script setup>

import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import {
    computed,
    onMounted,
    onBeforeUnmount,
    nextTick,
    ref,
    watch
} from 'vue';



import AUTH from '@/api/auth'

// Components
import LoaderVue from '@/layouts/Loader.vue'
import SkeletonLoader from '@/components/Loaders/SkeletonLoader.vue'
import DataViewToggle from '@/components/Data-tools/Data.View.Toggle.vue'

// Utils
import {
    formatDateTime,
    smartDate
} from '@/utils/dates'


// ======================================================
// Page state
// ======================================================

const isLoading = ref(true)

const menuPermissions=ref()
const menuBarItems=ref()



const route = useRoute();


// Reactive current path

const currentPath = computed(() => route.path);


// Helper: exact route match

const isActive = (path) => {
    return currentPath.value === path;
};


// Helper: route match for sub-menu items

const isCurrentPage = (page) => {

    if (page.startsWith('/')) {
        return currentPath.value === page;
    }

    // legacy .html paths fallback
    return currentPath.value.includes(page);
};


// Helper: parent menu active when any child route matches

const isActiveParent = (childPages) => {

    return childPages.some(page => {

        if (page.startsWith('/')) {
            return currentPath.value === page;
        }

        return isCurrentPage(page);

    });

};


// ----------------------------
// Initialize MetisMenu
// ----------------------------

const initMetisMenu = () => {

    const menuEl = document.getElementById('side-menu');

    if (!menuEl) return;

    if (window.jQuery && window.jQuery.fn.metisMenu) {

        try {

            // Dispose previous instance if any
            // avoids double-binding

            window.jQuery(menuEl).metisMenu('dispose');

        } catch (e) {

            // No previous instance — that's fine

        }

        window.jQuery(menuEl).metisMenu();

    } else {

        // jQuery/MetisMenu not loaded yet — retry shortly

        setTimeout(initMetisMenu, 100);

    }

};


onMounted(() => {

    nextTick(() => {

        initMetisMenu();

    });

});


onBeforeUnmount(() => {

    const menuEl = document.getElementById('side-menu');

    if (
        menuEl &&
        window.jQuery &&
        window.jQuery.fn.metisMenu
    ) {

        try {

            window.jQuery(menuEl).metisMenu('dispose');

        } catch (e) {

            // ignore

        }

    }

});


// Click handler for Compose Message

const onComposeClick = () => {

    // Hook up your compose modal / action here

    console.log('Compose clicked');

};

</script>


<style scoped>

.menu-icon {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    margin-right: 10px;
}

</style>