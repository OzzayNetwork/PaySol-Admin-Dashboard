import apiClient from "./index";

/**
 * API client for MOH (Ministry of Health) facilities reference data.
 *
 * These are the authoritative health-facility registry records synced from
 * the Ministry of Health. They serve as reference data that internal facility
 * records (organizations) point to via their MFL code. The underlying set is
 * imported through a background sync job, so the operations below are primarily
 * search/lookup plus a manual sync trigger (admin-only).
 *
 * Backend reference: routes/api.php under "MOH facilities" (MohFacilityController).
 */
export default {
  /**
   * Paginated MOH facility search.
   * @param {Object} [params]
   *   search     Searches name/code
   *   type       Filter by facility type
   *   owner_type Filter by owner type
   *   county     Filter by county
   *   sub_county Filter by sub-county
   *   per_page   Results per page (default 20, max 100)
   *   page       Page number (1-indexed)
   * @returns Promise<{ data: { data: MohFacility[], meta } }>
   */
  list(params = {}) {
    return apiClient.get("/moh-facilities", { params });
  },

  /** Single facility by DB id. @param {number} id */
  get(id) {
    return apiClient.get(`/moh-facilities/${id}`);
  },

  /** Look up by MFL code. @param {string} mflCode */
  getByMfl(mflCode) {
    return apiClient.get(`/moh-facilities/by-mfl/${mflCode}`);
  },

  /** Quick typeahead over MOH facilities. @param {string} q */
  search(q) {
    return apiClient.get("/moh-facilities/search", { params: { q } });
  },

  /** List facility types. @returns Promise<{ data }> */
  types() {
    return apiClient.get("/moh-facilities/types");
  },

  /** List owner types. @returns Promise<{ data }> */
  ownerTypes() {
    return apiClient.get("/moh-facilities/owner-types");
  },

  /** Trigger an MOH facility sync. Admin-only. */
  sync() {
    return apiClient.post("/moh-facilities/sync");
  },

  /** Latest MOH facility sync status / history. */
  syncStatus() {
    return apiClient.get("/moh-facilities/sync-status");
  },

  /** List facility levels. @returns Promise<{ data }> */
levels() {
  return apiClient.get("/moh-facilities/levels");
},
/** Counties in the registry. @returns Promise<{ data }> */
counties() {
  return apiClient.get("/moh-facilities/counties");
},
/** Sub-counties (optionally scoped to a county). @returns Promise<{ data }> */
subCounties(params) {
  return apiClient.get("/moh-facilities/sub-counties", { params });
},
};
