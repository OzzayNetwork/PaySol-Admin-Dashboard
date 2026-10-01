import apiClient from "./index";

/**
 * Reference data API client — ICD-11 diagnoses, departments, and professions.
 *
 * These are pure reference/lookup catalogs: read-only references that the
 * clinical service catalogues (lab tests, medications, procedures, imaging,
 * etc.) and facility records point to. Most are synced from authoritative
 * sources (WHO, MOH) so they expose search + manual sync rather than CRUD.
 * Departments is editable via the platform Admin routes.
 *
 * Note: MOH facilities live in their own client — see ./mohFacilities.js.
 *
 * Backend reference: routes/api.php "Reference data" section.
 */
export default {
  /* ───────────────────────────────────────────────────────────────────────
   * ICD-11 Diagnosis Codes
   * Endpoints: /api/icd11 (index, show, search, sync, sync-status)
   * ─────────────────────────────────────────────────────────────────────── */
  icd11: {
    /**
     * Paginated ICD-11 MMS code search. Leaf codes (usable-for-coding) by default.
     * @param {Object} [params]
     *   search   Full-text search on title (e.g. "malaria", "diabetes")
     *   code     Exact code match (e.g. "1F40")
     *   chapter  Filter by chapter number (1-27)
     *   kind     Filter by class_kind: 'chapter' | 'block' | 'category'
     *   leaf     'true' = only leaf codes usable for coding
     *   parent   Filter by parent_code
     *   per_page Results per page (default 10, max 100)
     *   page     Page number (1-indexed)
     * @returns Promise<{ data: { data: Icd11Code[], meta } }>
     */
    list(params = {}) {
      return apiClient.get("/icd11", { params });
    },

    /**
     * Look up a single ICD-11 code; response includes its child codes.
     * @param {string} code
     * @returns Promise<{ data: { data: Icd11Code & { children: Icd11Code[] } } }>
     */
    getByCode(code) {
      return apiClient.get(`/icd11/${encodeURIComponent(code)}`);
    },

    /**
     * Quick typeahead — top 20 leaf matches for code or title. Min 2 chars.
     * @param {string} q
     * @returns Promise<{ data: { data: Icd11Code[] } }>
     */
    search(q) {
      return apiClient.get("/icd11/search", { params: { q } });
    },

    /**
     * Trigger an ICD-11 sync from WHO. Admin-only.
     * @returns Promise<{ data: { message, data } }>
     */
    sync() {
      return apiClient.post("/icd11/sync");
    },

    /**
     * Latest ICD-11 sync status / history.
     * @returns Promise<{ data }>
     */
    syncStatus() {
      return apiClient.get("/icd11/sync-status");
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
   * Departments
   * Endpoints: /api/departments (index, show);
   *            /api/platform/departments (store, update, destroy)
   * ─────────────────────────────────────────────────────────────────────── */
  departments: {
    /**
     * List all departments.
     * @returns Promise<{ data: { data: Department[] } }>
     */
    list(params = {}) {
      return apiClient.get("/departments", { params });
    },

    /** Single department by slug. @param {string} slug */
    get(slug) {
      return apiClient.get(`/departments/${slug}`);
    },

    /**
     * Create a department (platform admin only).
     * @param {Object} payload
     *   name         Required
     *   code         Optional unique code
     *   description  Optional
     *   is_active    Optional boolean
     * @returns Promise<{ data: { message, data: Department } }>
     */
    create(payload) {
      return apiClient.post("/platform/departments", payload);
    },

    /** Update a department. @param {string} slug @param {Object} payload */
    update(slug, payload) {
      return apiClient.patch(`/platform/departments/${slug}`, payload);
    },

    /** Delete a department. @param {string} slug */
    destroy(slug) {
      return apiClient.delete(`/platform/departments/${slug}`);
    },
  },

  /* ───────────────────────────────────────────────────────────────────────
   * Professions
   * Endpoints: /api/professions (index, show, categories, clinical)
   * ─────────────────────────────────────────────────────────────────────── */
  professions: {
    /**
     * List professions.
     * @param {Object} [params]
     *   category Filter by profession category
     *   search   Optional text search
     * @returns Promise<{ data: { data: Profession[] } }>
     */
    list(params = {}) {
      return apiClient.get("/professions", { params });
    },

    /** Single profession by id. @param {number} id */
    get(id) {
      return apiClient.get(`/professions/${id}`);
    },

    /** List profession categories. @returns Promise<{ data }> */
    categories() {
      return apiClient.get("/professions/categories");
    },

    /** Only clinical professions. @returns Promise<{ data }> */
    clinical() {
      return apiClient.get("/professions/clinical");
    },
  },
};
