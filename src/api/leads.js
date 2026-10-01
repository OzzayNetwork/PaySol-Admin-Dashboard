import { adminClient } from "./index";

/**
 * Business leads — /api/v1/admin/leads
 *
 * A lead is a business that might become a tenant, read out of a county permit
 * register. Leads carry an owner's name and phone number, which is why they have
 * their own permissions (leads.view / leads.manage) instead of borrowing the
 * catalogue's.
 *
 * WATCH THE ASYMMETRY, it is the easiest thing to get wrong here:
 *
 *   filtering   GET  ?business_type=bar          <- a type KEY
 *   writing     POST/PATCH  business_type_id: 7  <- a numeric id
 *
 * The list filter takes the readable key; the create/update body takes the FK.
 * POST /leads/options returns the rows needed for both — business_types with
 * their ids, counties, and the allowed sort orders.
 *
 * Permissions: leads.view reads, leads.manage creates, edits, verifies, retires.
 */
export default {
  /**
   * List leads.
   *
   * @param {Object} [params]
   *   q                 name / owner / phone text
   *   status            unverified | verified | retired
   *   business_type     a type KEY, e.g. bar, or "unmapped" for no type
   *   county_id, constituency_id, ward_id, area_id   numeric ids
   *   outstanding       1 = only leads with money still owing
   *   sort              name | permit_date | total_paid
   *   per_page
   */
  list(params = {}) {
    return adminClient.get("/leads", { params });
  },

  /**
   * Everything a lead screen needs to populate its filters: business_types
   * (id + key + label), counties, and sorts. Call once and cache.
   */
  options() {
    return adminClient.get("/leads/options");
  },

  /** Exact phone lookup, digits normalised. @param {string} phone */
  lookup(phone) {
    return adminClient.get("/leads/lookup", { params: { phone } });
  },

  /** One lead. */
  get(leadId) {
    return adminClient.get(`/leads/${leadId}`);
  },

  /**
   * Add a lead by hand. Needs leads.manage.
   *
   * Note `business_type_id` is an id, not a key. Geography is nullable on
   * create only where the register had no ward — county_id is required.
   */
  create(payload) {
    return adminClient.post("/leads", payload);
  },

  /** Correct a lead. Same field names as create. */
  update(leadId, payload) {
    return adminClient.patch(`/leads/${leadId}`, payload);
  },

  /** Confirm a lead is real. @param {boolean} is_verified */
  verify(leadId, is_verified = true) {
    return adminClient.post(`/leads/${leadId}/verify`, { is_verified });
  },

  /**
   * Retire a lead. Leads are never deleted — the row is the record.
   * @param {boolean} retired
   */
  retire(leadId, retired = true) {
    return adminClient.post(`/leads/${leadId}/retire`, { retired });
  },
};
