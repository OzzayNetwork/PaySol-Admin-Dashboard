/**
 * Admin console sidebar.
 *
 * One source of truth for the menu. Every `permissions` string here is copied
 * verbatim from the backend's AdminRolesAndPermissionsSeeder — this file does
 * not invent policy, it only says which label sits behind which permission.
 *
 * Rules this array follows, and why:
 *
 *  - `permissions` is ANY-OF, not all-of. `EnsureAdminPermission` passes when an
 *    admin holds one of the listed permissions, so the filter must use `some()`.
 *    Writing ['tenants.suspend', 'tenants.update'] here does NOT mean "both".
 *
 *  - A leaf repeats its parent's permission rather than inheriting it. An item
 *    that inherits is an item that can appear on its own — in a search box, a
 *    command palette, a breadcrumb — without the thing it belongs to.
 *
 *  - `permissions: null` means "no permission gate", which is a decision and not
 *    an omission. It is only correct where the backend really has no gate, and
 *    every such item is listed in the review notes at the bottom of this file.
 *
 *  - `hidden: true` is the old `d-none` from the hand-written markup: kept in
 *    the file rather than deleted, because "we know about it and it is not ready"
 *    is information. Nothing renders it until the flag comes off.
 *
 *  - `action: true` marks a control that is not a navigation target. It opens
 *    something (a modal, an offcanvas) instead of changing route.
 */

/** Permission strings, named so a typo is a missing import rather than a typo in a string. */
export const PERMISSIONS = {
  TENANTS_VIEW: 'tenants.view',
  TENANTS_CREATE: 'tenants.create',
  TENANTS_UPDATE: 'tenants.update',
  TENANTS_SUSPEND: 'tenants.suspend',
  CATALOGUE_VIEW: 'catalogue.view',
  CATALOGUE_MANAGE: 'catalogue.manage',
  LEADS_VIEW: 'leads.view',
  LEADS_MANAGE: 'leads.manage',
  AREAS_APPROVE: 'areas.approve',
  GEOGRAPHY_MANAGE: 'geography.manage',
  BANKS_VIEW: 'banks.view',
  BANKS_MANAGE: 'banks.manage',
  TEAM_VIEW: 'team.view',
  TEAM_MANAGE: 'team.manage',
  // Seeded but with no endpoint behind them, so no item may be gated on these:
  // SUPPORT_ACCESS: 'support.access',
  // BILLING_VIEW: 'billing.view',
  // BILLING_MANAGE: 'billing.manage',
  // AUDIT_VIEW: 'audit.view',
};

export default [
  // ── Platform administration ───────────────────────────────────────────────
  { heading: true, label: 'Platform Administration' },

  {
    label: 'Overview',
    to: '/',
    icon: 'boxicons:dashboard-alt',
    iconActive: 'boxicons:dashboard-alt-filled',
    // No gate: every signed-in admin may see the launcher.
    permissions: null,
  },

  {
    label: 'Test Page',
    to: '/test-page',
    icon: 'ri:flask-line',
    iconActive: 'ri:flask-fill',
    permissions: null,
  },

  {
    label: 'Tenants',
    to: '/tenants',
    icon: 'ri:building-2-line',
    iconActive: 'ri:building-2-fill',
    // The API's read routes are OR-gated across all four tenants.* permissions,
    // so a stricter check here would hide a list this admin may actually fetch.
    permissions: [
      PERMISSIONS.TENANTS_VIEW,
      PERMISSIONS.TENANTS_CREATE,
      PERMISSIONS.TENANTS_UPDATE,
      PERMISSIONS.TENANTS_SUSPEND,
    ],
  },

  {
    label: 'Onboard a Tenant',
    to: '/tenants/onboard',
    icon: 'carbon:add-alt',
    iconActive: 'carbon:add-filled',
    permissions: [PERMISSIONS.TENANTS_CREATE],
  },

  {
    label: 'Product Catalogue',
    to: '/catalogue',
    icon: 'ri:price-tag-3-line',
    iconActive: 'ri:price-tag-3-fill',
    permissions: [PERMISSIONS.CATALOGUE_VIEW, PERMISSIONS.CATALOGUE_MANAGE],
  },

  {
    // NOTE: this is only the geography corrections screen. The area approval
    // queue is a separate permission (areas.approve) and has no item here yet —
    // see the review notes.
    label: 'Locations',
    to: '/reference/geography',
    icon: 'ri:map-pin-2-line',
    iconActive: 'ri:map-pin-2-fill',
    permissions: [PERMISSIONS.GEOGRAPHY_MANAGE],
  },

  {
    // Unresolved: it is not clear which permission or which endpoint this is.
    // Left ungated and flagged rather than guessed at.
    label: 'Business Registry',
    to: '/business-registry',
    icon: 'fluent:briefcase-32-regular',
    iconActive: 'fluent:briefcase-32-filled',
    permissions: null,
    needsDecision: true,
  },

  {
    label: 'Client Leads',
    to: '/leads',
    icon: 'boxicons:search-plus',
    iconActive: 'boxicons:search-plus-filled',
    permissions: [PERMISSIONS.LEADS_VIEW, PERMISSIONS.LEADS_MANAGE],
  },

  {
    label: 'Banks & PayBills',
    to: '/reference/banks',
    icon: 'ri:bank-line',
    iconActive: 'ri:bank-fill',
    permissions: [PERMISSIONS.BANKS_VIEW, PERMISSIONS.BANKS_MANAGE],
  },

  // ── Facilities (HMIS) ─────────────────────────────────────────────────────
  {
    label: 'Facilities',
    icon: 'ri:hospital-line',
    iconActive: 'ri:hospital-fill',
    groupIsDead: true,
    children: [
      { label: 'Add Facility', to: '/facilities/add', permissions: null },
      { label: 'Onboarded Facilities', to: '/facilities', permissions: null },
      { label: 'Subscriptions Plans', to: '/facilities/subscriptions', permissions: null },
    ],
  },

  // ── Website CMS ───────────────────────────────────────────────────────────
  {
    label: 'Blog posts',
    icon: 'ri:article-line',
    iconActive: 'ri:article-fill',
    groupIsDead: true,
    children: [
      { label: 'All Articles', to: '/blogs', permissions: null },
      { label: 'Create Article', to: '/newArticle', permissions: null },
      { label: 'Categories', to: '/blog/categories', permissions: null, hidden: true },
      { label: 'Tags', to: '/blog/tags', permissions: null, hidden: true },
    ],
  },

  {
    label: 'Our Partners',
    icon: 'ri:building-2-line',
    iconActive: 'ri:building-2-fill',
    groupIsDead: true,
    children: [
      { label: 'All Partners', to: '/partners/list', permissions: null },
      { label: 'Add Partner', to: '/partners/add', permissions: null },
    ],
  },

  {
    label: 'Inventory',
    icon: 'ri:archive-line',
    iconActive: 'ri:archive-fill',
    // Tenant-facing POS, not platform console work. Kept only to keep the
    // migration visible; see the review notes.
    groupIsDead: true,
    children: [
      { label: 'Products & Services', to: '/POS-Manager/inventory', permissions: null },
      { label: 'Add Item', to: '/POS-Manager/new-product', permissions: null },
    ],
  },

  {
    label: 'Sales',
    icon: 'ri:receipt-line',
    iconActive: 'ri:receipt-fill',
    groupIsDead: true,
    children: [
      { label: 'View Sales', to: '/MenuProducts', permissions: null },
      { label: 'Make Sale (POS)', to: '/Sales/POS', permissions: null },
      { label: 'Open Bills', to: '/coming-soon', permissions: null },
      { label: 'Quotations', to: '/coming-soon', permissions: null },
      { label: 'Credit Note', to: '/coming-soon', permissions: null },
    ],
  },

  {
    label: 'Media Gallery',
    icon: 'ri:image-2-line',
    iconActive: 'ri:image-2-fill',
    groupIsDead: true,
    children: [
      { label: 'Media Library', to: '/gallery/view', permissions: null },
      { label: 'Upload Media', to: '/gallery/upload', permissions: null },
      { label: 'Media Categories', to: '/gallery/categories', permissions: null },
    ],
  },

  {
    label: 'File Manager',
    icon: 'ri:folder-3-line',
    iconActive: 'ri:folder-3-fill',
    groupIsDead: true,
    children: [
      { label: 'Files Library', to: '/file-manager', permissions: null },
      { label: 'Upload File', to: '/file-manager/file-new', permissions: null },
    ],
  },

  // ── Reports ───────────────────────────────────────────────────────────────
  { heading: true, label: 'Reports' },

  {
    label: 'Product Sales',
    icon: 'ri:shopping-cart-2-line',
    iconActive: 'ri:shopping-cart-2-fill',
    groupIsDead: true,
    children: [
      { label: 'Sales Reports', to: '/coming-soon', permissions: null },
      { label: 'Pending Payments', to: '/coming-soon', permissions: null },
      { label: 'Product Performance', to: '/coming-soon', permissions: null },
    ],
  },

  {
    label: 'Cashier Sales Reports',
    to: '/coming-soon',
    icon: 'ri:money-dollar-box-line',
    iconActive: 'ri:money-dollar-box-fill',
    permissions: null,
    groupIsDead: true,
  },

  {
    label: 'Stock Movement',
    icon: 'ri:store-2-line',
    iconActive: 'ri:store-2-fill',
    groupIsDead: true,
    children: [
      { label: 'Materials/Ingredients Stk', to: '/coming-soon', permissions: null },
      { label: 'Products Stock', to: '/coming-soon', permissions: null },
    ],
  },

  {
    label: 'Clients Register',
    to: '/coming-soon',
    icon: 'ri:group-2-line',
    iconActive: 'ri:group-2-fill',
    permissions: null,
    groupIsDead: true,
  },

  // ── Messenger ─────────────────────────────────────────────────────────────
  { heading: true, label: 'Messenger' },

  {
    // Opens the compose offcanvas rather than navigating. The composer is
    // mounted globally in App.vue, so it is already in the DOM.
    label: 'Compose Message',
    icon: 'ri:edit-2-line',
    action: 'compose-message',
    permissions: null,
  },

  {
    label: 'Sent Messages',
    to: '/coming-soon',
    icon: 'ri:mail-send-line',
    iconActive: 'ri:mail-send-fill',
    permissions: null,
    groupIsDead: true,
  },

  {
    label: 'Address Book',
    icon: 'ri:contacts-line',
    iconActive: 'ri:contacts-fill',
    groupIsDead: true,
    children: [
      // data-bs-target="#add-contact" — that modal does not exist in the DOM.
      { label: 'Add Contact', action: 'add-contact', permissions: null, needsDecision: true },
      { label: 'Contact Book list', to: '/coming-soon', permissions: null },
    ],
  },

  // ── Platform ──────────────────────────────────────────────────────────────
  {
    label: 'Site Identity',
    to: '/site-identity',
    icon: 'ri:building-4-line',
    iconActive: 'ri:building-4-fill',
    permissions: null,
    groupIsDead: true,
  },

  {
    label: 'Settings',
    to: '/coming-soon',
    icon: 'ri:settings-3-line',
    iconActive: 'ri:settings-3-fill',
    permissions: null,
    groupIsDead: true,
  },

  {
    label: 'System Users',
    icon: 'humbleicons:users',
    iconActive: 'heroicons:users-solid',
    // This is the platform team, so it is gated on team.* — not left open.
    permissions: [PERMISSIONS.TEAM_VIEW, PERMISSIONS.TEAM_MANAGE],
    children: [
      { label: 'System Users', to: '/team', permissions: [PERMISSIONS.TEAM_VIEW, PERMISSIONS.TEAM_MANAGE] },
      { label: 'Add a System User', to: '/team/invite', permissions: [PERMISSIONS.TEAM_MANAGE] },
    ],
  },
];

/*
 * REVIEW NOTES — things this array cannot decide, in the order they will bite.
 *
 * 1. "Business Registry" has no known permission or endpoint. Ask what it is
 *    before gating it; it is currently ungated, so every admin sees it.
 *
 * 2. "Locations" covers only geography corrections (geography.manage). The area
 *    approval queue is `areas.approve` and has no item. A single "Areas" screen
 *    offering Verify to someone who cannot press it is the trap to avoid, so the
 *    two want separate items: /reference/geography and /reference/areas.
 *
 * 3. `groupIsDead: true` marks every group whose routes have no backend behind
 *    them — the HMIS/health group and the website CMS group. Nothing reads this
 *    flag; it exists so they can be deleted in one pass when the decision lands,
 *    rather than one dead link at a time.
 *
 * 4. "System Users" was ungated before. It is now team.view/team.manage, which
 *    is a behaviour change: a support or finance admin will no longer see it.
 *    That matches the API, which has been refusing them all along.
 *
 * 5. Every `to: '/coming-soon'` is a route that does not exist and lands on the
 *    404. The reports section is a wish list, not a menu.
 */
