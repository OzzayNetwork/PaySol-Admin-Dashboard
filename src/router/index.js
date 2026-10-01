import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";

// Authentication pages
import Login from "@/pages/Authentication/Auth.login.vue";
import ResetPassword from "@/pages/Authentication/Auth.resetPassword.vue";
import PinResetOtp from "@/pages/Authentication/Auth.Pin.reset.vue"
import AuthVerifyOtp from "../pages/Authentication/Auth.verify.otp.vue";
import AuthChangePassword from "../pages/Authentication/Auth.changePassword.vue";
import ActivationWizard from "@/pages/Authentication/Auth.verify.account.setup.vue";

//user management
import UserAdd from "../pages/SystemUsers/User.Add.vue";
import UsersTable from "../pages/SystemUsers/Users.Table.All.vue";
import UserDetails from "@/pages/SystemUsers/User.details.vue";

// Import views
import Home from "@/pages/Home.vue";
import MenuCategories from "@/pages/PosMenus/MenuCategories.vue";
import TestPage from "@/components/testing.vue";

// Error pages
import NotFound404 from "@/pages/ErrorPages/NotFound404.vue";
import Forbidden403 from "@/pages/ErrorPages/Forbidden403.vue";

import MenuProducts from "@/pages/PosMenus/MenuProducts.vue";

// Partners
import PatnerList from "@/pages/Patners/patnerList.vue";
import PatnerAdd from "@/pages/Patners/patnerAdd.vue";

//gallery pages
import GalleryNew from "../pages/Gallery/gallery.add.vue";
import GalleryTest from "../pages/Gallery/gallery.test.vue";
import GalleryView from "../pages/Gallery/gallery.view.vue";
import MediaAlbums from '../pages/Gallery/gallery.albums.vue'
import MapView from '../pages/Gallery/gallery.map.vue'

//blog article
import ArticleNew from "@/pages/Blog/blog.new.vue";
import Articles from "@/pages/Blog/blog.articles.vue";
import ArticlesDetails from "@/pages/Blog/blog.article.details.vue";
import BlogTest from "@/pages/Blog/blog.test.vue";

//site identity pages
import SiteIdentityCoreVisuals from "@/pages/Site.Identity/Identity.coreVisuals.vue";
import IdentityBrandBasics from "../pages/Site.Identity/Identity.brandBasics.vue";
import IdentityLocalizationFormats from "../pages/Site.Identity/Identity.localization.Formats.vue";
import IdentityCommunicatio from "../pages/Site.Identity/Identity.communicatio.vue";
import IdentityLogos from "../pages/Site.Identity/Identity.logos.vue";
import IdentityDocs from "../pages/Site.Identity/identity.documents.vue";

//file management
import FilesMainPage from "../pages/FileManager/files.main.page.vue";
import filesAdd from "../pages/FileManager/files.add.vue";

//invoices pages
import ProffessionalInvoice from "../components/Invoices/Proffessional.invoice.vue";
import SingleInvoices from '@/pages/Invoices/sigleInvoicesTemplates/Invoices.Templates.container.vue';

//POS INVENTORY paged
import AddProductsPOS from "@/pages/Products.POS/Products.POS.add.vue";
import InventoryTablePOS from "@/pages/Products.POS/Products.inventory.pos.table.vue";  

//sales page
import PosMakeSales from "@/pages/POSSALES/POS.mainpage.vue"


//test pages
import PartnerTestList from "@/pages/Patners/Partner.List.Test.vue";

//MOH Facilities
import MOHFacilities from "@/pages/MOHFacilities/moh.facilities.vue";


//n progress importing into router

// Define routes

const routes = [
  //MOH Facilities
  {
    path: "/Reference-Data/MOH-facilities",
    name: "MOHFacilities",
    component: MOHFacilities,
    meta: { requiresAuth: true, title: "MOH Facilities", screenName: "MOH Facilities", contentGroup: "MOH Facilities"  }, // Password protected
  },

  //POS Pages
   {
    path: "/POS-Manager/new-product",
    name: "ProductNew",
    component: AddProductsPOS,
    meta: { requiresAuth: true, title: "Add New Product", screenName: "POS Manager", contentGroup: "POS Manager"  }, // Password protected
  },

  {
    path: "/POS-Manager/inventory",
    name: "InventoryTable",
    component: InventoryTablePOS,
    meta: { requiresAuth: true, title: "Inventory Table", screenName: "Inventory Table", contentGroup: "POS Manager"  }, // Password protected
  },

  //POS SALES PAGE
   {
    path: "/Sales/POS",
    name: "Sales",
    component: PosMakeSales,
    meta: { requiresAuth: true, title: "POS | Make a sale", screenName: "POS", contentGroup: "POS"  }, // Password protected
  },



  //file manager has started
  {
    path: "/file-manager",
    name: "FileManager",
    component: FilesMainPage,
    meta: { requiresAuth: true, title: "Files Manager", screenName: "Files manager", contentGroup: "Site manager"  }, // Password protected
  },

  {
    path: "/file-manager/file-new",
    name: "FileNew",
    component: filesAdd,
    meta: { requiresAuth: true, title: "New File", screenName: "New File", contentGroup: "Site manager"  }, // Password protected
  },


  // site identity routes
  {
    path: "/site-identity",
    name: "CoreVisuals",
    component: SiteIdentityCoreVisuals,
    meta: { requiresAuth: true, title: "Site Identity Core Visuals", screenName: "Core Visuals", contentGroup: "Site Identity"  }, // Password protected
  },

  {
    path: "/site-identity/Brand-basics",
    name: "BrandBasics",
    component: IdentityBrandBasics,
    meta: { requiresAuth: true, title: "Site Identity Brand Basics", screenName: "Brand Basics", contentGroup: "Site Identity"  }, // Password protected
  },

  {
    path: "/site-identity/localization",
    name: "LocalizationFormats",
    component: IdentityLocalizationFormats,
    meta: { requiresAuth: true, title: "Site Identity Localization Formats", screenName: "Localization Formats", contentGroup: "Site Identity"  }, // Password protected
  },


  {
    path: "/site-identity/communication",
    name: "Communication",
    component: IdentityCommunicatio,
    meta: { requiresAuth: true, title: "Site Identity Communication", screenName: "Communication", contentGroup: "Site Identity"  }, // Password protected
  },

  {
    path: "/site-identity/logo-assets",
    name: "Logos",
    component: IdentityLogos,
    meta: { requiresAuth: true, title: "Site Identity Logo Assets", screenName: "Logo Assets", contentGroup: "Site Identity"  }, // Password protected
  },

  {
    path: "/site-identity/document-identity",
    name: "IdentityDocuments",
    component: IdentityDocs,
    meta: { requiresAuth: true, title: "Site Identity Documents", screenName: "Identity Documents", contentGroup: "Site Identity"  }, // Password protected
  },

 // invoices templates routes
  {
    path: "/invoice/:id",
    name: "InvoiceProffessional",
    component: SingleInvoices,
    meta: {layout: "none", requiresAuth: false, title: "Proffessional Invoice", screenName: "Invoices", contentGroup: "Invoices"  }, // Password protected
  },

  {
    path: "/blogs",
    name: "Articles",
    component: Articles,
    meta: { requiresAuth: true, title: "Blog Articles", screenName: "Articles", contentGroup: "Blog"  }, // Password protected
  },

   {
    path: "/newArticle",
    name: "ArticleNew",
    component: ArticleNew,
    meta: { requiresAuth: true, title: "New Blog Article", screenName: "New Article", contentGroup: "Blog" }, // Password protected
  },

   {
    path: "/blogs/details/:encodedId/:titleBlog",
    name: "ArticlesDetails",
    component: ArticlesDetails,
    meta: { requiresAuth: true, title: "Blog Article Details", screenName: "Article Details", contentGroup: "Blog"  }, // Password protected
  },

  
   {
    path: "/blogs/test",
    name: "BlogTest",
    component: BlogTest,
    meta: { requiresAuth: true, title: "Blog Article Testing", screenName: "Blog Testing", contentGroup: "Blog"  }, // Password protected
  },

  {
    path: "/gallery/upload",
    name: "GalleryNew",
    component: GalleryNew,
    meta: { requiresAuth: true, title: "Add A Gallery", screenName: "Add Gallery", contentGroup: "Gallery"  }, // Password protected
  },

  {
  path: '/gallery/view',
  name: 'GalleryView',
  component: GalleryView,
  meta: { requiresAuth: true, title: 'Media Library', screenName: "Media Library", contentGroup: "Gallery" }
},
{
  path: '/gallery/view/albums',
  name: 'MediaAlbums',
  component: MediaAlbums,
  meta: { requiresAuth: true,title: 'Media Albums', screenName: "Media Albums", contentGroup: "Gallery" }
},
{
  path: '/gallery/view/map',
  name: 'MapView',
  component: MapView,
  meta: { requiresAuth: true, title: 'Gallery Map View', screenName: "Gallery Map View", contentGroup: "Gallery" }
},

  {
    path: "/gallery/test",
    name: "GalleryTest",
    component: GalleryTest,
    meta: { requiresAuth: true, title: "Test Gallery", screenName: "Test Gallery", contentGroup: "Gallery"  }, // Password protected
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { layout: "none",title: "Account Login "  }
  },
  {
    path: "/Reset-Password",
    name: "ReserPassword",
    component: ResetPassword,
    meta: { layout: "none",title: "Account Password Reset",screenName: "Reset Password", contentGroup: "Authentication" }
  },
  {
    path: "/Set-new-password",
    name: "PinResetOtp",
    component: PinResetOtp,
    meta: { layout: "none",title: "Account Change Password",screenName: "Change Password", contentGroup: "Authentication" }
  },
  {
    path: "/Change-Password",
    name: "ChangePassword",
    component: AuthChangePassword,
    meta: { layout: "none",title: "Change your Account's Password", screenName: "Change Password", contentGroup: "Authentication" }
  },
  {
    path: "/Verify-otp",
    name: "OtpVerification",
    component: AuthVerifyOtp,
    meta: { layout: "none",title: "OTP Verrification", screenName: "OTP Verification", contentGroup: "Authentication" }
  },
   {
    path: "/Verify",
    name: "ActivationWizard",
    component: ActivationWizard,
    meta: { layout: "none",title: "Account Activation Wizard", screenName: "Account Activation", contentGroup: "Authentication" }
  },
  {
    path: "/test-page",
    name: "TestPage",
    component: TestPage,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true, title: "Main Dashboard ", screenName: "Main Dashboard", contentGroup: "Dashboard" }, // Password protected
  },
  {
    path: "/partners/list",
    name: "PatnerList",
    component: PatnerList,
     meta: { requiresAuth: true, title: "List of Partners", screenName: "List of Partners", contentGroup: "Partners"  }, // Password protected
  },
  {
    path: "/partners/testList",
    name: "PatnerListTest",
    component: PartnerTestList,
     meta: { requiresAuth: true, title: "Testing List of Partners", screenName: "Testing List of Partners", contentGroup: "Partners" }, // Password protected
  },
  {
    path: "/partners/add",
    name: "PatnerAdd",
    component: PatnerAdd,
     meta: { requiresAuth: true, title: "Add A Partner", screenName: "Add Partner", contentGroup: "Partners"  }, // Password protected
  },

  
  {
    path: "/MenuCategories",
    name: "MenuCategories",
    component: MenuCategories,
    meta: { requiresAuth: true, title: "Menu Categories", screenName: "Menu Categories", contentGroup: "Menu" }, // 🔒 protected
  },
  {
    path: "/MenuProducts",
    name: "MenuProducts",
    component: MenuProducts,
    meta: { requiresAuth: true, title: "Menu Products", screenName: "Menu Products", contentGroup: "Menu" }, // 🔒 protected
  },

  // 403 Forbidden
  {
    path: "/403",
    name: "Forbidden",
    component: Forbidden403,
     meta: {title: "Error 403 Protected Page"}
  },

  // 404 Not Found (catch-all must be last)
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound404,
    meta: {title: "Error 404 Page not Found"}
  },

  // user management pages (Adding User)
  {
    path: "/users/register",
    name: "UserAdd",
    component: UserAdd,
    meta: {requiresAuth: true,title: "Add New System User", screenName: "Add New System User", contentGroup: "User Management"}
  },
  {
    path: "/users/list",
    name: "UsersTable",
    component: UsersTable,
    meta: {requiresAuth: true,title: "System Users", screenName: "System Users", contentGroup: "User Management"}
  },
  {
    path: "/users/:id",
    name: "UserDetails",
    component: UserDetails,
    meta: {requiresAuth: true,title: "User Details", screenName: "User Details", contentGroup: "User Management"}
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Global Navigation Guard
router.beforeEach((to, from, next) => {
  // Example authentication state (replace with real auth logic)
  const isAuthenticated = false; // 🔒 e.g., check localStorage or Vuex

  if (to.meta.protected && !isAuthenticated) {
    next({ name: "Forbidden" });
  } else {
    next();
  }
});

// Initialize Bootstrap components after every route change
router.afterEach(async (to, from) => {
  await nextTick()
  
  // Initialize all popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  popoverTriggerList.forEach(el => new bootstrap.Popover(el))
  
  // Initialize tooltips if you use them
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el))
})
export default router;
