import { adminClient } from "./index";

/**
 * Tenants — /api/v1/admin/tenants
 *
 * A tenant is a business on the platform. Tenants are NEVER deleted: suspend or
 * deactivate them and let existing references keep resolving.
 *
 * Onboarding is one transaction, so POST /tenants takes the business, its owner
 * and its first branch together:
 *
 *   { name, short_name, business_type, plan,
 *     ward_id, area_id, address_line,
 *     owner:  { name, phone },
 *     branch: { name, latitude, longitude } }
 *
 * `business_type` and `plan` are KEYS, not ids — "bar", "supermarket", "free",
 * "standard". That is deliberate: the console never sees business_types.id.
 *
 * Changing plan is not an edit. There is no `plan` field on PATCH, because a
 * plan change is close-one-subscription, open-another, and an UPDATE would erase
 * the fact that the upgrade happened. Same for `business_type`, which is
 * immutable after onboarding.
 *
 * Permissions: tenants.view reads, tenants.create onboards, tenants.update
 * edits, tenants.suspend suspends/reacts.
 */
export default {
  /**
   * Live availability check for a short name. This is what the Onboard screen
   * calls while typing — a short name is user-entered and renameable, and a
   * rename keeps the old name working via a redirect row.
   *
   * @param {string} short_name
   */
  checkShortName(short_name, params = {}) {
    return adminClient.get("/tenants/check-short-name", {
      params: { short_name, ...params },
    });
  },

  /**
   * List tenants.
   *
   * @param {Object} [params]
   *   search           name or short-name text
   *   status           active | suspended | ...
   *   business_type    a type KEY, e.g. bar
   *   county_id        numeric county id
   *   constituency_id  numeric constituency id
   *   ward_id          numeric ward id
   *   area_id          numeric area id
   *   per_page
   */
  list(params = {}) {
    return adminClient.get("/tenants", { params });
  },

  /** One tenant with its branches, owner, memberships and subscription. */
  get(tenantId) {
    return adminClient.get(`/tenants/${tenantId}`);
  },

  /**
   * Onboard a business: tenant + first branch + owner + membership, together.
   * Needs tenants.create.
   */
  create(payload) {
    return adminClient.post("/tenants", payload);
  },

  /**
   * Edit a tenant. Deliberately does NOT accept `plan` or `business_type`.
   * Needs tenants.update.
   */
  update(tenantId, payload) {
    return adminClient.patch(`/tenants/${tenantId}`, payload);
  },

  /** Suspend a tenant. Never deletes. @param {string} reason */
  suspend(tenantId, reason) {
    return adminClient.post(`/tenants/${tenantId}/suspend`, { reason });
  },

  /** Lift a suspension. */
  reactivate(tenantId) {
    return adminClient.post(`/tenants/${tenantId}/reactivate`);
  },

  /** Add another branch to an existing tenant. Needs tenants.create. */
  createBranch(tenantId, payload) {
    return adminClient.post(`/tenants/${tenantId}/branches`, payload);
  },

  /**
   * Edit a branch, e.g. { is_active: false }. Branches are deactivated, never
   * deleted. Needs tenants.update.
   */
  updateBranch(branchId, payload) {
    return adminClient.patch(`/branches/${branchId}`, payload);
  },
};
