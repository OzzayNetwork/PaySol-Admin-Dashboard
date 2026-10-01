// src/api/geography.js
import apiClient from "./index";

/**
 * Geographic hierarchy API client.
 *
 * The hierarchy is:
 *   County (47) → Constituency (290) → Ward (1450) → Polling Station (40,883)
 *
 * Each list endpoint returns name + slug for dropdown population.
 * The slug is what you pass to the next-level endpoint to cascade.
 *
 * All endpoints require authentication (Bearer token via apiClient interceptor).
 */
export default {
  /**
   * All 47 counties.
   *
   * @param {Object} [params]
   * @param {string} [params.year]  Optional — '2013' | '2017' | '2022'. When set,
   *                                each county includes registered_voters and
   *                                polling_stations counts for that year.
   *
   * @returns Promise<{ data: { data: Array<{id, code, name, slug, registered_voters?, polling_stations?}> } }>
   */
  counties(params = {}) {
    return apiClient.get("/counties", { params });
  },

  /**
   * Constituencies in a given county.
   *
   * @param {string} countySlug   e.g. 'mombasa', 'nairobi-city', 'kajiado'
   * @param {Object} [params]
   * @param {string} [params.year]  Optional — adds voter totals per constituency
   *
   * @returns Promise<{ data: { data: Array<{id, code, name, slug, ...}> } }>
   */
  constituencies(countySlug, params = {}) {
    return apiClient.get(`/counties/${countySlug}/constituencies`, { params });
  },

  /**
   * Wards in a given constituency.
   *
   * @param {string} constituencySlug   e.g. 'changamwe', 'kibra', 'kajiado-north'
   * @param {Object} [params]
   * @param {string} [params.year]      Optional — adds voter totals per ward
   *
   * @returns Promise<{ data: { data: Array<{id, code, name, slug, ...}> } }>
   */
  wards(constituencySlug, params = {}) {
    return apiClient.get(`/constituencies/${constituencySlug}/wards`, { params });
  },

  /**
   * Polling stations. Filter to one ward via the `ward` param (recommended for dropdowns).
   *
   * @param {Object} [params]
   * @param {string} [params.ward]     Ward slug — recommended filter for dropdowns
   * @param {string} [params.county]   Optional: filter by county slug or 3-digit code
   * @param {boolean} [params.has_coordinates]  Optional: only stations with GPS
   * @param {number} [params.limit]    Optional: default 100, max 1000
   *
   * @returns Promise<{ data: { data: Array<{code, name, registration_centre_id, ...}> } }>
   */
  pollingStations(params = {}) {
    return apiClient.get("/polling-stations", { params });
  },

  // returning the countries list for the country select component
  countries(params = {}) {
    return apiClient.get("/countries", { params });
  },

  //countries lightweight list for the country select component
   countriesLightweight(params = {}) {
    return apiClient.get("/countries?fields=dropdown", { params });
  },
  /** Canonical sub-counties for one county. @param {number|string} county */
  geoSubCounties(county) {
    return apiClient.get(`/counties/${county}/sub-counties`);
  },
};