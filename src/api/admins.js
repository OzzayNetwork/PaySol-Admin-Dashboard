import { adminClient } from "./index";

/**
 * Admin team & roles — /api/v1/admin (admins + roles)
 *
 * Admins are staff who access the console. Permissions are OR'ed when checking
 * via `EnsureAdminPermission` middleware: `admin.permission:a,b` passes on
 * either. That means grouping verbs widens access, not narrows it.
 *
 * Roles are system-defined in seed (`super_admin`, `onboarding`, `support`,
 * `finance`, `agent`). `GET /roles` is the canonical list of names and display
 * names to drive the role dropdown.
 *
 * Permissions: team.view reads, team.manage writes.
 */
export default {
  /** List roles. */
  roles() {
    return adminClient.get("/roles");
  },

  /**
   * List admins.
   * @param {Object} [params]
   *   search  name or email
   *   role    onboarding | support | finance | agent | super_admin
   *   status  active | deactivated
   *   per_page
   */
  list(params = {}) {
    return adminClient.get("/admins", { params });
  },

  /** Create an admin. Needs team.manage. */
  create(payload) {
    return adminClient.post("/admins", payload);
  },

  /** Single admin. */
  get(adminId) {
    return adminClient.get(`/admins/${adminId}`);
  },

  /** Update an admin's role/security settings. Needs team.manage. */
  update(adminId, payload) {
    return adminClient.patch(`/admins/${adminId}`, payload);
  },

  /** Deactivate an admin. */
  deactivate(adminId, reason) {
    return adminClient.post(`/admins/${adminId}/deactivate`, { reason });
  },

  /** Reactivate an admin. */
  reactivate(adminId) {
    return adminClient.post(`/admins/${adminId}/reactivate`);
  },

  /**
   * Resend verification to an admin.
   * @param {number} adminId
   * @param {Object} [payload] { channel: 'email'|'sms' }
   */
  resendVerification(adminId, payload = {}) {
    return adminClient.post(
      `/admins/${adminId}/resend-verification`,
      payload,
    );
  },

  /** Admin's recent activity. */
  activity(adminId, params = {}) {
    return adminClient.get(`/admins/${adminId}/activity`, { params });
  },
};
