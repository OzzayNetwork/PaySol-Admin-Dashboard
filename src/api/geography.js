import { apiClient } from "./index";

/**
 * Location reference data — /api/v1 (public, unauthenticated)
 *
 * The hierarchy is:
 *   Country -> County -> Constituency -> Sub-county -> Ward -> Area
 *
 *   Country      250     ISO2/ISO3, currency, dialling code
 *   County        47     Kajiado is code 034
 *   Constituency 290
 *   Sub-county   334
 *   Ward        1,439
 *   Area         232     PaySol-curated: estates, villages, markets, centres
 *
 * CASCADE BY ID, NOT BY SLUG. Every child route is bound with whereNumber(), so
 * the segment is the row's numeric primary key:
 *
 *   GET /counties/34/constituencies
 *   GET /counties/34/sub-counties
 *   GET /constituencies/12/wards
 *   GET /wards/3/areas
 *
 * A three-digit `code` such as "034" is NOT accepted here — it is a lookup
 * label, not a key. Passing it resolves to a different county, silently.
 *
 * List endpoints answer { data: [...], count, meta? } and need no token.
 */
export default {
  /**
   * All 47 counties, each with its centroid, geo and child counts.
   *
   * @returns Promise<{ data: { data: County[], count: number } }>
   */
  counties(params = {}) {
    return apiClient.get("/counties", { params });
  },

  /** One county by id. @param {number} id */
  county(id) {
    return apiClient.get(`/counties/${id}`);
  },

  /**
   * Constituencies in a county.
   * @param {number} countyId numeric county id
   * @returns { data: { data: Constituency[], count, meta: { county } } }
   */
  constituencies(countyId, params = {}) {
    return apiClient.get(`/counties/${countyId}/constituencies`, { params });
  },

  /** One constituency by id. @param {number} id */
  constituency(id) {
    return apiClient.get(`/constituencies/${id}`);
  },

  /**
   * Wards in a constituency.
   * @param {number} constituencyId numeric constituency id
   */
  wards(constituencyId, params = {}) {
    return apiClient.get(`/constituencies/${constituencyId}/wards`, { params });
  },

  /**
   * Canonical sub-counties in a county.
   *
   * Named `subcounties` because that is what sub-county inputs already call,
   * with `geoSubCounties` kept as an alias for existing callers.
   *
   * @param {number} countyId numeric county id
   */
  subcounties(countyId) {
    return apiClient.get(`/counties/${countyId}/sub-counties`);
  },

  geoSubCounties(countyId) {
    return this.subcounties(countyId);
  },

  /** One sub-county by id. @param {number} id */
  subCounty(id) {
    return apiClient.get(`/sub-counties/${id}`);
  },

  /** One ward by id. @param {number} id */
  ward(id) {
    return apiClient.get(`/wards/${id}`);
  },

  /** Curated areas inside a ward. @param {number} wardId */
  wardAreas(wardId, params = {}) {
    return apiClient.get(`/wards/${wardId}/areas`, { params });
  },

  /**
   * Areas across all of Kenya. Seeded areas are unverified until an admin with
   * areas.approve verifies them, so `is_verified` is worth showing.
   */
  areas(params = {}) {
    return apiClient.get("/areas/search", { params });
  },

  /** One area by id. @param {number} id */
  area(id) {
    return apiClient.get(`/areas/${id}`);
  },

  /** Free-text place search across the whole hierarchy. */
  search(params = {}) {
    return apiClient.get("/geo/search", { params });
  },

  /** Nearest parent regions to a point. */
  locate(params = {}) {
    return apiClient.get("/geo/locate", { params });
  },

  /**
   * All 250 countries, full shape.
   * @returns { data: { data: Country[] } }
   */
  countries(params = {}) {
    return apiClient.get("/countries", { params });
  },

  /**
   * Trimmed country list for a picker: iso2, iso3, name, phone_code only.
   *
   * `fields` goes through axios params rather than being interpolated into the
   * path, so it is properly encoded and cannot be duplicated by `params`.
   */
  countriesLightweight(params = {}) {
    return apiClient.get("/countries", {
      params: { ...params, fields: "dropdown" },
    });
  },

  /**
   * NOT PART OF PAYSOL.
   *
   * Left here because Polling.station.id.vue still imports it. PaySol has no
   * polling stations or voter data — there is no endpoint for this to reach, so
   * every call returns 404. Delete the client and the page together.
   */
  pollingStations(params = {}) {
    return apiClient.get("/polling-stations", { params });
  },
};
