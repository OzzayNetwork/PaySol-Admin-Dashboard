<template>
    <!-- ========== Left Sidebar Start ========== -->
        <div class="vertical-menu">

            <div data-simplebar class="h-100">

                <!--- Sidemenu -->
                <div id="sidebar-menu">
                    <!-- Left Menu Start -->
                    <ul class="metismenu list-unstyled" id="side-menu">
                        <li class="menu-title d-none" key="t-apps">Website Content</li>
                        <li class="side-bar-button d-none">
                            <a href="#" class="waves-effect btn btn-light btn-rounded text-left write-msg-btn">
                                <i class=""><img src="../assets/images/plus-icon.svg" alt=""></i>
                                <span>Compose</span>
                            </a>
                        </li>

                        <li :class="{ active: isActive('/') }">
                           <router-link to="/" class="waves-effect" :class="{ active: isActive('/') }">
                            <i class="mdi mdi-chart-line"></i><span>Analytics</span>
                            </router-link>
                        </li>

                        <li class="menu-title" key="t-apps">Website Content/Pages</li>
                        <!-- Website Identity & Branding -->
                        <li :class="{ active: isActive('/site-identity') }">
                            <router-link to="/site-identity" class="waves-effect" :class="{ active: isActive('/site-identity') }">
                                <i class="mdi mdi-domain"></i>
                                <span>Site Identity</span>
                            </router-link>
                            <!-- Tooltip/Caption: Manage your brand identity, logo, and company information -->
                        </li>

                        <li :class="{ active: isActive('/hero-landing') }">
                            <router-link to="/test-page" class="waves-effect" :class="{ active: isActive('/hero-landing') }">
                                <i class="mdi mdi-cog-outline"></i>
                                <span>Test Page</span>
                            </router-link>
                            <!-- Tooltip/Caption: Configure homepage content, hero sections, and landing page elements -->
                        </li>

                        <!-- Homepage Management -->
                        <li :class="{ active: isActive('/hero-landing') }">
                            <router-link to="/hero-landing" class="waves-effect" :class="{ active: isActive('/hero-landing') }">
                                <i class="mdi mdi-home-variant-outline"></i>
                                <span>Homepage</span>
                            </router-link>
                            <!-- Tooltip/Caption: Configure homepage content, hero sections, and landing page elements -->
                        </li>

                        <!-- Blog Management -->
                        <li class="" :class="{ 'mm-active': isActiveParent(['/blog/articles', '/blog/categories', '/blog/create', '/blog/tags']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="bx bx-detail"></i>
                                <span>Blog</span>
                            </a>
                            <!-- Tooltip/Caption: Manage blog content, articles, and publications -->
                            <ul class="sub-menu" aria-expanded="false">
                                <li :class="{ active: isCurrentPage('/blogs') }">
                                    <router-link to="/blogs" class="waves-effect" :class="{ active: isCurrentPage('/blogs') }">All Articles</router-link>
                                    <!-- Tooltip: View and manage all published and draft articles -->
                                </li>
                                <li :class="{ active: isCurrentPage('/newArticle') }">
                                    <router-link to="/newArticle" class="waves-effect" :class="{ active: isCurrentPage('/blogs/new') }">Create Article</router-link>
                                    <!-- Tooltip: Write and publish new blog articles -->
                                </li>
                                <li class="d-none" :class="{ active: isCurrentPage('/blog/categories') }">
                                    <router-link to="/blog/categories" class="waves-effect" :class="{ active: isCurrentPage('/blog/categories') }">Categories</router-link>
                                    <!-- Tooltip: Organize articles by topics and categories -->
                                </li>
                                <li class="d-none" :class="{ active: isCurrentPage('/blog/tags') }">
                                    <router-link to="/blog/tags" class="waves-effect" :class="{ active: isCurrentPage('/blog/tags') }">Tags</router-link>
                                    <!-- Tooltip: Manage article tags and keywords -->
                                </li>
                            </ul>
                        </li>

                        <!-- Partners Management -->
                      <li class="" :class="{ 'mm-active': isActiveParent(['/partners/list', '/partners/categories', '/partners/add']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-account-group-outline"></i>
                                <span>Partners</span>
                            </a>
                            <!-- Tooltip/Caption: Manage business partnerships and collaborations -->
                            <ul class="sub-menu" aria-expanded="false">
                                <li :class="{ active: isCurrentPage('/partners/list') }">
                                    <router-link to="/partners/list" class="waves-effect" :class="{ active: isCurrentPage('/partners/list') }">All Partners</router-link>
                                    <!-- Tooltip: View and manage your business partners -->
                                </li>
                               
                                <li :class="{ active: isCurrentPage('/partners/add') }">
                                    <router-link to="/partners/add" class="waves-effect" :class="{ active: isCurrentPage('/partners/add') }">Add Partner</router-link>
                                    <!-- Tooltip: Create new business partnership -->
                                </li>
                            </ul>
                        </li>
                        <!-- Product Catalog Management -->
                        <li class="" :class="{ 'mm-active': isActiveParent(['/products/catalog', '/products/add']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-package-variant-closed dripicons-basket"></i>
                                <span>Inventory</span>
                            </a>
                            <!-- Tooltip/Caption: Manage your product inventory and catalog -->
                            <ul class="sub-menu" aria-expanded="false">
                                <li :class="{ active: isCurrentPage('/POS-Manager/inventory') }">
                                    <router-link to="/POS-Manager/inventory" class="waves-effect" :class="{ active: isCurrentPage('/POS-Manager/inventory') }">Products & Services</router-link>
                                    <!-- Tooltip: Browse and edit your complete product catalog -->
                                </li>
                                <li :class="{ active: isCurrentPage('/POS-Manager/new-product') }">
                                    <router-link to="/POS-Manager/new-product" class="waves-effect" :class="{ active: isCurrentPage('/POS-Manager/new-product') }">Add Item</router-link>
                                    <!-- Tooltip: Create new product listings -->
                                </li>
                            </ul>
                        </li>

                         <li :class="{ 'mm-active': isActiveParent(['/Sales/POS', '/MenuCategories']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="bx bx-receipt"></i>
                                <span>Sales</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">                               
                                <li :class="{ active: isCurrentPage('/SalesReport') }">
                                    <router-link to="/MenuProducts" class="waves-effect" :class="{ active: isCurrentPage('/MenuProducts') }">View Sales</router-link>
                                </li>
                                <li :class="{ active: isCurrentPage('/Sales/POS') }">
                                    <router-link to="/Sales/POS" class="waves-effect" :class="{ active: isCurrentPage('/Sales/POS') }">Make Sale (POS)</router-link> 
                                </li>
                                <li class="" :class="{ active: isCurrentPage('production-all-products.html') }">
                                    <a href="production-all-products.html">Open Bills</a>
                                </li>
                                <li class="" :class="{ active: isCurrentPage('production-all-products.html') }">
                                    <a href="production-all-products.html">Quotations</a>
                                </li>
                                 <li class="" :class="{ active: isCurrentPage('production-all-products.html') }">
                                    <a href="production-all-products.html">Credit Note</a>
                                </li>
                            </ul>
                        </li>

                        <!-- Media Gallery -->
                        <li class="" :class="{ 'mm-active': isActiveParent(['/gallery/view', '/gallery/upload', '/gallery/categories']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-image-multiple-outline"></i>
                                <span>Media Gallery</span>
                            </a>
                            <!-- Tooltip/Caption: Manage images and media assets -->
                            <ul class="sub-menu" aria-expanded="false">
                                <li :class="{ active: isCurrentPage('/gallery/view') }">
                                    <router-link to="/gallery/view" class="waves-effect" :class="{ active: isCurrentPage('/gallery/view') }">Media Library</router-link>
                                    <!-- Tooltip: Browse and organize your media files -->
                                </li>
                                <li :class="{ active: isCurrentPage('/gallery/upload') }">
                                    <router-link to="/gallery/upload" class="waves-effect" :class="{ active: isCurrentPage('/gallery/upload') }">Upload Media</router-link>
                                    <!-- Tooltip: Add new images and media files -->
                                </li>
                                 <li :class="{ active: isCurrentPage('/gallery/categories') }">
                                    <router-link to="/gallery/categories" class="waves-effect" :class="{ active: isCurrentPage('/gallery/categories') }">Media Categories</router-link>
                                    <!-- Tooltip: Organize media by categories -->
                                </li>
                            </ul>
                        </li>

                        <li class="" :class="{ 'mm-active': isActiveParent(['/file-manager', '/file-manager/file-new']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-folder"></i>
                                <span>File Manager</span>
                            </a>
                            <!-- Tooltip/Caption: Manage images and media assets -->
                            <ul class="sub-menu" aria-expanded="false">
                                <li :class="{ active: isCurrentPage('/file-manager') }">
                                    <router-link to="/file-manager" class="waves-effect">Files Liblary</router-link>
                                    <!-- Tooltip: Browse and organize your media files -->
                                </li>
                                <li :class="{ active: isCurrentPage('/file-manager/file-new') }">
                                    <router-link to="/file-manager/file-new" class="waves-effect" :class="{ active: isCurrentPage('/file-manager/file-new') }">Upload File</router-link>
                                    <!-- Tooltip: Add new images and media files -->
                                </li>
                                 
                            </ul>
                        </li>

                         <li class="d-none" :class="{ active: isActive('/site-identity') }">
                            <router-link to="/file-manager" class="waves-effect" :class="{ active: isActive('/site-identity') }">
                                <i class="mdi mdi-folder"></i>
                                <span>File Manager</span>
                            </router-link>
                        </li>

                        <hr>
                        <li :class="{ 'mm-active': isActiveParent(['material-stock.html', 'material-new.html', 'materials-all.html']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-chef-hat"></i>
                                <span>Materials/Ingredients</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li :class="{ active: isCurrentPage('material-stock.html') }">
                                    <a href="material-stock.html" class="waves-effect" :class="{ active: isCurrentPage('material-stock.html') }">Stock Taking</a>
                                </li>
                                <li :class="{ active: isCurrentPage('material-new.html') }">
                                    <a href="material-new.html" class="waves-effect" :class="{ active: isCurrentPage('material-new.html') }">Add New Material</a>
                                </li>
                                <li :class="{ active: isCurrentPage('materials-all.html') }">
                                    <a href="materials-all.html" class="waves-effect" :class="{ active: isCurrentPage('materials-all.html') }">All Materials/Ingredients</a>
                                </li>
                            </ul>
                        </li>
                        <li :class="{ 'mm-active': isActiveParent(['/MenuProducts', '/MenuCategories']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="bx bx-restaurant"></i>
                                <span>Menu Items</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">                               
                                <li :class="{ active: isCurrentPage('/MenuProducts') }">
                                    <router-link to="/MenuProducts" class="waves-effect" :class="{ active: isCurrentPage('/MenuProducts') }">Products</router-link>
                                </li>
                                <li :class="{ active: isCurrentPage('/MenuCategories') }">
                                    <router-link to="/MenuCategories" class="waves-effect" :class="{ active: isCurrentPage('/MenuCategories') }">Catalogue/Categories</router-link> 
                                </li>
                                <li class="d-none" :class="{ active: isCurrentPage('production-all-products.html') }">
                                    <a href="production-all-products.html">Catalogue/Categories</a>
                                </li>
                            </ul>
                        </li>

                        <hr class="">
                        <li class="menu-title" key="t-apps">Reports</li>
                        <li :class="{ 'mm-active': isActiveParent(['product-reports.html', 'product-orders.html', 'product-sales.html']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="bx bx-cart"></i>
                                <span>Product Sales</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li :class="{ active: isCurrentPage('product-reports.html') }">
                                    <a href="product-reports.html" class="waves-effect" :class="{ active: isCurrentPage('product-reports.html') }">Sales Reports</a>
                                </li>
                                <li :class="{ active: isCurrentPage('product-orders.html') }">
                                    <a href="product-orders.html" class="waves-effect" :class="{ active: isCurrentPage('product-orders.html') }">Pending Payments</a>
                                </li>
                                <li :class="{ active: isCurrentPage('product-sales.html') }">
                                    <a href="product-sales.html" class="waves-effect" :class="{ active: isCurrentPage('product-sales.html') }">Product Performance</a>
                                </li>
                            </ul>
                        </li>
                        <li :class="{ active: isCurrentPage('cashier-sales.html') }">
                            <a href="cashier-sales.html" class="waves-effect" :class="{ active: isCurrentPage('cashier-sales.html') }">
                                <i class="mdi mdi-account-cash-outline"></i>
                                <span>Cashier Sales Reports</span>
                            </a>
                        </li>
                        <li class="d-none" :class="{ 'mm-active': isActiveParent(['cashier-sales.html', 'cashier-logs.html']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-account-cash-outline"></i>
                                <span>Cashier Reports</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li :class="{ active: isCurrentPage('cashier-sales.html') }">
                                    <a href="cashier-sales.html" class="waves-effect" :class="{ active: isCurrentPage('cashier-sales.html') }">Cashier Sales</a>
                                </li>
                                <li :class="{ active: isCurrentPage('cashier-logs.html') }">
                                    <a href="cashier-logs.html" class="waves-effect" :class="{ active: isCurrentPage('cashier-logs.html') }">Cashier Logs</a>
                                </li>
                            </ul>
                        </li>
                        <li :class="{ 'mm-active': isActiveParent(['materials-stock-reports.html', 'products-stock-reports.html']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="bx bx-store-alt"></i>
                                <span>Stock Movement</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li :class="{ active: isCurrentPage('materials-stock-reports.html') }">
                                    <a href="materials-stock-reports.html" class="waves-effect" :class="{ active: isCurrentPage('materials-stock-reports.html') }">Materials/Ingredients Stk</a>
                                </li>
                                <li :class="{ active: isCurrentPage('products-stock-reports.html') }">
                                    <a href="products-stock-reports.html" class="waves-effect" :class="{ active: isCurrentPage('products-stock-reports.html') }">Products Stock</a>
                                </li>
                            </ul>
                        </li>

                        <li :class="{ active: isCurrentPage('clients.html') }">
                            <a href="clients.html" class="waves-effect" :class="{ active: isCurrentPage('clients.html') }">
                                <i class="mdi mdi-account-group"></i>
                                <span>Clients Register</span>
                            </a>
                        </li>

                        <hr class="">
                        
                        <li class="menu-title" key="t-apps">Messenger</li>
                        
                        <li>
                            <a href="javascript: void(0);" class="waves-effect write-msg-btn">
                                <i class="bx bx-edit-alt"></i>
                                <span>Compose Message</span>
                            </a>
                        </li>
                        <li :class="{ active: isCurrentPage('messages.html') }">    
                            <a href="messages.html" class="waves-effect" :class="{ active: isCurrentPage('messages.html') }">
                                <i class="mdi mdi-comment-text-multiple-outline"></i>
                                <span>Sent Messages</span>
                            </a>
                        </li>
                        <li :class="{ 'mm-active': isActiveParent(['messanger-contacts.html']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-account-details-outline"></i>
                                <span>Address Book</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li>
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#add-contact" class="btn btn-info text-center mx-4 px-3 text-white  mb-3"><i class="mdi mdi-account-multiple-plus-outline text-white m-0 p-0"></i>Add Contact</a>
                                </li>
                                <li :class="{ active: isCurrentPage('messanger-contacts.html') }">
                                    <a href="messanger-contacts.html" class="waves-effect" :class="{ active: isCurrentPage('messanger-contacts.html') }">Contact Book list</a>
                                </li>
                            </ul>
                        </li>
                       
                        <hr class="">

                        <li class="d-none" :class="{ 'mm-active': isActiveParent(['branch-new.html', 'branch-all.html']) }">
                            <a href="javascript: void(0);" class="waves-effect has-arrow">
                                <i class="mdi mdi-domain"></i>
                                <span>Branches</span>
                            </a>
                            <ul class="sub-menu" aria-expanded="false">
                                <li :class="{ active: isCurrentPage('branch-new.html') }">
                                    <a href="branch-new.html" class="waves-effect" :class="{ active: isCurrentPage('branch-new.html') }">Add A Branch</a>
                                </li>
                                <li :class="{ active: isCurrentPage('branch-all.html') }">
                                    <a href="branch-all.html" class="waves-effect" :class="{ active: isCurrentPage('branch-all.html') }">All Branches</a>
                                </li>
                            </ul>
                        </li>

                        <li :class="{ active: isCurrentPage('settings.html') }">
                            <a href="settings.html" class="waves-effect" :class="{ active: isCurrentPage('settings.html') }">
                                <i class="dripicons-gear"></i>
                                <span>Settings</span>
                            </a>
                        </li>

                       <li :class="{ 'mm-active': isActiveParent(['/users/list', '/users/register']) }">
                        <a href="javascript:void(0);" class="waves-effect has-arrow">
                            <i class="mdi mdi-monitor-multiple"></i>
                            <span>System Users</span>
                        </a>
                        <ul class="sub-menu" aria-expanded="false">
                            <!-- System Users List -->
                            <li :class="{ active: isCurrentPage('/users/list') }">
                            <router-link 
                                to="/users/list" 
                                class="waves-effect" 
                                :class="{ active: isCurrentPage('/users/list') }"
                            >
                                System Users
                            </router-link>
                            </li>

                            <!-- Add a System User -->
                            <li :class="{ active: isCurrentPage('/users/register') }">
                            <router-link 
                                to="/users/register" 
                                class="waves-effect" 
                                :class="{ active: isCurrentPage('/users/register') }"
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

<script>
import { useRoute } from 'vue-router';
import { computed, nextTick, watch } from 'vue';  // add nextTick and watch

export default {
    name: 'SideBar',
    setup() {
        const route = useRoute();
        
        // Reactive current path
        const currentPath = computed(() => route.path);
        const currentFullPath = computed(() => route.fullPath);
        
        // Helper function to check if a Vue route is active
        const isActive = (path) => {
            return currentPath.value === path;
        };
        
        // Helper function to check if current page matches (for regular HTML links)
        const isCurrentPage = (page) => {
            // Extract filename from current URL
            const currentPage = window.location.pathname.split('/').pop();
            return currentPage === page || window.location.href.includes(page);
        };
        
        // Helper function to check if parent menu should be active (has active children)
        const isActiveParent = (childPages) => {
            // Check Vue routes
            const hasActiveVueRoute = childPages.some(page => 
                page.startsWith('/') && currentPath.value === page
            );
            
            // Check HTML pages
            const hasActiveHtmlPage = childPages.some(page => 
                !page.startsWith('/') && isCurrentPage(page)
            );
            
            return hasActiveVueRoute || hasActiveHtmlPage;
        };
        
        // Debug helper to see current route info
        const logCurrentRoute = () => {
            console.log('Current route:', {
                path: currentPath.value,
                fullPath: currentFullPath.value,
                name: route.name,
                params: route.params,
                query: route.query
            });
        };

        console.log('Sidebar initialized with current path:', currentPath.value);
        // Inside setup(), after defining currentPath:
watch(currentPath, () => {
  nextTick(() => {
    // Reapply mm-active/mm-show classes if needed
    // Or trigger your initSidebarAndUI function
  })
})
        
        // Call this to debug current route
        // logCurrentRoute();
        
        return {
            isActive,
            isCurrentPage,
            isActiveParent,
            currentPath,
            logCurrentRoute
        };
    }
}
</script>

