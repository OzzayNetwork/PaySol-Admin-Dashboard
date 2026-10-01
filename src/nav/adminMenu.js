/**
 * Admin console sidebar — the single source of truth for the menu.
 *
 * SHAPE OF AN ENTRY
 *
 *   Leaf    { label, to, icon, iconActive, permissions }
 *   Group   { label, icon, iconActive, children: [...] }
 *   Heading { heading: true, label }        → a menu-title divider
 *   Rule    { divider: true }              → a horizontal <hr>
 *
 * THE ONE RULE THAT MATTERS: `permissions` is ANY-OF, not all-of.
 *
 * The backend's EnsureAdminPermission middleware passes when an admin holds at
 * least one of the listed permissions. So ['leads.view', 'leads.manage'] means
 * "either", and the filter must use some(). Reading it as "both" would make the
 * menu stricter than the API, which is the mistake AGENTS.md warns about when
 * grouping several verbs into one middleware string.
 *
 * `permissions: null` is a decision, not an omission — it means the backend
 * genuinely has no gate on that item, so everyone signed in may see it.
 */

export default [

  // ── Platform administration ──────────────────────────────────────────────

 // { heading: true, label: 'Platform Administration' },

  // Every signed-in admin may see the launcher, so no gate. Note this page has
  // no backend behind it yet — it renders module cards, not stats.
  {
    label: 'Overview',
    to: '/',
    icon: 'boxicons:dashboard-alt',
    iconActive: 'boxicons:dashboard-alt-filled',
    permissions: null,
  },

  {
    label: 'Test Page',
    to: '/test-page',
    icon: 'ri:flask-line',
    iconActive: 'ri:flask-fill',
    permissions: null,
  },

  // All four tenants.* because GET /tenants is OR-gated across them in
  // routes/api.php. Gating on 'tenants.view' alone would hide a list this admin
  // is genuinely allowed to fetch.
  {
    label: 'Tenants',
    to: '/tenants',
    icon: 'ri:store-2-line',
    iconActive: 'ri:store-2-fill',
    permissions: ['tenants.view', 'tenants.create', 'tenants.update', 'tenants.suspend'],
  },

  {
    label: 'Onboard a Tenant',
    to: '/tenants/onboard',
    icon: 'carbon:add-alt',
    iconActive: 'carbon:add-filled',
    permissions: ['tenants.create'],
  },
  { divider: true },

   { heading: true, label: 'Refrencences' },

  {
    label: 'Product Catalogue',
    to: '/catalogue',
    icon: 'ri:price-tag-3-line',
    iconActive: 'ri:price-tag-3-fill',
    permissions: ['catalogue.view', 'catalogue.manage'],
  },

  // Geography corrections only. The area approval queue is a separate
  // permission (areas.approve) and deliberately has no item here — see the
  // note at the bottom of this file.
  {
    label: 'Locations',
    to: '/reference/geography',
    icon: 'ri:map-pin-2-line',
    iconActive: 'ri:map-pin-2-fill',
    permissions: ['geography.manage'],
  },

  // UNRESOLVED: no known permission or endpoint. Left ungated so it shows for
  // everyone until it is decided what this screen is.
  {
    label: 'Business Registry',
    to: '/business-registry',
    icon: 'fluent:briefcase-32-regular',
    iconActive: 'fluent:briefcase-32-filled',
    permissions: null,
  },

  {
    label: 'Client Leads',
    to: '/leads',
    icon: 'boxicons:search-plus',
    iconActive: 'boxicons:search-plus-filled',
    permissions: ['leads.view', 'leads.manage'],
  },

  {
    label: 'Banks & PayBills',
    to: '/reference/banks',
    icon: 'ri:bank-line',
    iconActive: 'ri:bank-fill',
    permissions: ['banks.view', 'banks.manage'],
  },

  // Separator between the platform sections and the leftovers below.
  { divider: true },

  // ═══════════════════════════════════════════════════════════════════════
  // EVERYTHING BELOW THIS LINE HAS NO BACKEND BEHIND IT.
  //
  // These routes exist in the router but have no Laravel tables or endpoints.
  // They split into three groups, and each wants a different decision:
  //
  //   HMIS/health   — /facilities*, Clinical Services, ICD, Insurers, SHA
  //   Website CMS   — Blog, Partners, Media Gallery, File Manager, Site Identity
  //   Tenant POS    — Inventory, Sales, Menu, invoice templates
  //
  // They are kept here rather than deleted so the migration is one decision
  // rather than thirty dead links. Say the word and the whole block goes.
  // ═══════════════════════════════════════════════════════════════════════

  // ── HMIS leftovers ───────────────────────────────────────────────────────

  {
    permissions: ['hide'],
    label: 'Facilities',
    icon: 'ri:hospital-line',
    iconActive: 'ri:hospital-fill',
    children: [
      { label: 'Add Facility', to: '/facilities/add' },
      { label: 'Onboarded Facilities', to: '/facilities' },
      { label: 'Subscriptions Plans', to: '/facilities/subscriptions' },
    ],
     
  },

  // ── Website CMS ──────────────────────────────────────────────────────────

  {
    label: 'Blog posts',
    icon: 'ri:article-line',
    iconActive: 'ri:article-fill',
    children: [
      { label: 'All Articles', to: '/blogs' },
      { label: 'Create Article', to: '/newArticle' },
      { label: 'Categories', to: '/blog/categories' },
      { label: 'Tags', to: '/blog/tags' },
    ],
  },

  {
    label: 'Our Partners',
    icon: 'ri:building-2-line',
    iconActive: 'ri:building-2-fill',
    children: [
      { label: 'All Partners', to: '/partners/list' },
      { label: 'Add Partner', to: '/partners/add' },
    ],
  },

  // ── Tenant POS — belongs in the tenant-facing app, not the console ──────

  {
    label: 'Inventory',
    icon: 'ri:archive-line',
    iconActive: 'ri:archive-fill',
    children: [
      { label: 'Products & Services', to: '/POS-Manager/inventory' },
      { label: 'Add Item', to: '/POS-Manager/new-product' },
    ],
  },

  {
    label: 'Sales',
    icon: 'ri:receipt-line',
    iconActive: 'ri:receipt-fill',
    children: [
      { label: 'View Sales', to: '/MenuProducts' },
      { label: 'Make Sale (POS)', to: '/Sales/POS' },
      { label: 'Open Bills', to: '/coming-soon' },
      { label: 'Quotations', to: '/coming-soon' },
      { label: 'Credit Note', to: '/coming-soon' },
    ],
  },

  

  // ── Website CMS, continued ───────────────────────────────────────────────

  {
    label: 'Media Gallery',
    icon: 'ri:image-2-line',
    iconActive: 'ri:image-2-fill',
    children: [
      { label: 'Media Library', to: '/gallery/view' },
      { label: 'Upload Media', to: '/gallery/upload' },
      { label: 'Media Categories', to: '/gallery/categories' },
    ],
  },

  {
    label: 'File Manager',
    icon: 'ri:folder-3-line',
    iconActive: 'ri:folder-3-fill',
    children: [
      { label: 'Files Library', to: '/file-manager' },
      { label: 'Upload File', to: '/file-manager/file-new' },
    ],
  },

  // ── Reports ──────────────────────────────────────────────────────────────

  { heading: true, label: 'Reports' },

  // Every item in this section points at /coming-soon, which is not a
  // registered route — they all land on the 404. This section is a wish list.
  {
    label: 'Product Sales',
    icon: 'ri:shopping-cart-2-line',
    iconActive: 'ri:shopping-cart-2-fill',
    children: [
      { label: 'Sales Reports', to: '/coming-soon' },
      { label: 'Pending Payments', to: '/coming-soon' },
      { label: 'Product Performance', to: '/coming-soon' },
    ],
  },

  {
    label: 'Cashier Sales Reports',
    to: '/coming-soon',
    icon: 'ri:money-dollar-box-line',
    iconActive: 'ri:money-dollar-box-fill',
  },

  {
    label: 'Stock Movement',
    icon: 'ri:store-2-line',
    iconActive: 'ri:store-2-fill',
    children: [
      { label: 'Materials/Ingredients Stk', to: '/coming-soon' },
      { label: 'Products Stock', to: '/coming-soon' },
    ],
  },

  {
    label: 'Clients Register',
    to: '/coming-soon',
    icon: 'ri:group-2-line',
    iconActive: 'ri:group-2-fill',
  },

  // ── Messenger ────────────────────────────────────────────────────────────

  { heading: true, label: 'Messenger',permissions: ['hide'], },

  // to: null → renders an <a> with a click handler instead of a router-link.
  // The compose offcanvas is mounted globally in App.vue, so it is already in
  // the DOM and this control only has to open it.
  {
    label: 'Compose Message',
    icon: 'ri:edit-2-line',
    to: null,
    permissions: ['hide'],
  },

  {
    label: 'Sent Messages',
    to: '/coming-soon',
    icon: 'ri:mail-send-line',
    iconActive: 'ri:mail-send-fill',
     permissions: ['hide'],
  },

  {
    label: 'Address Book',
    icon: 'ri:contacts-line',
    iconActive: 'ri:contacts-fill',
    children: [
      // Was data-bs-target="#add-contact". That modal does not exist in the DOM,
      // so this needs its own handler before it does anything.
      { label: 'Add Contact', to: null },
      { label: 'Contact Book list', to: '/coming-soon' },
    ],
    permissions: ['hide'],
  },

  // ── Platform ─────────────────────────────────────────────────────────────

  {
    label: 'Site Identity',
    to: '/site-identity',
    icon: 'ri:building-4-line',
    iconActive: 'ri:building-4-fill',
  },

  {
    label: 'Settings',
    to: '/coming-soon',
    icon: 'ri:settings-3-line',
    iconActive: 'ri:settings-3-fill',
  },

  // Gated on team.* now, where it used to be open to everyone. That is a
  // behaviour change: support and finance admins lose the item. It matches the
  // API, which has been refusing them all along, so the menu was lying before.
  {
    label: 'System Users',
    icon: 'humbleicons:users',
    iconActive: 'heroicons:users-solid',
    permissions: ['team.view', 'team.manage'],
    children: [
      // Each leaf repeats its permission rather than inheriting it. An item
      // that inherits can appear on its own — in a search box, a breadcrumb —
      // without the group it belongs to.
      {
        label: 'System Users',
        to: '/team',
        permissions: ['team.view', 'team.manage'],
      },
      {
        label: 'Add a System User',
        to: '/team/invite',
        permissions: ['team.manage'],
      },
    ],
  },

];

/*
 * ── Still to decide ────────────────────────────────────────────────────────
 *
 * 1. "Business Registry" — no known permission or endpoint. Ungated, so every
 *    admin sees it.
 *
 * 2. Area approvals. `areas.approve` has no menu item. It wants to be its own
 *    screen at /reference/areas rather than a tab on "Locations", because
 *    geography.manage can add and rename while only areas.approve can verify —
 *    one combined page would offer a Verify button to someone who cannot press it.
 *
 * 3. The four dead groups above. Also POS: it belongs in the tenant-facing app
 *    and per PROJECT-GUIDE §5.5 it is not built.
 *
 * 4. Seeded permissions with no endpoint, so no item may be gated on them:
 *    support.access, billing.view, billing.manage, audit.view.
 */
