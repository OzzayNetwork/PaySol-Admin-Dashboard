// src/api/users.js
import apiClient from "./index";

/**
 * User management API client.
 *
 * All endpoints require super_admin authentication via Bearer token
 * (handled by apiClient interceptor). Failures return error.response.data
 * with { message, errors: { field: [messages] } } for validation errors.
 *
 * Backend reference: routes/api.php under "User management (super_admin only)"
 */
export default {
  /**
   * Create a new user. Triggers two OTPs — one email, one SMS.
   *
   * Pass a FormData instance when including a profile_photo file; otherwise
   * a plain object works. Do NOT manually set Content-Type for FormData —
   * the browser sets the multipart boundary automatically.
   *
   * @param {Object|FormData} userData
   *   first_name        Required
   *   last_name         Required
   *   national_id       Required (7 or 8 digits)
   *   email             Required, unique
   *   phone             Required (Kenyan: 0712345678 or +254712345678)
   *   role              Required: 'election_agent' | 'viewer'
   *   title             Optional: 'Mr' | 'Mrs' | 'Miss' | 'Ms' | 'Dr' | 'Prof' | 'Hon'
   *   middle_name       Optional
   *   designation       Optional free text
   *   profile_photo     Optional File (jpg/png/webp, max 2MB)
   *   polling_station_id  Required only when role === 'election_agent'
   * @param {Object} [config]  Optional axios config (e.g. AbortController signal)
   *
   * @returns Promise<{ data: { message, data: User } }>
   */
  create(userData, config = {}) {
    return apiClient.post("/users", userData, config);
  },

  /**
   * Update an existing user. All fields optional — only what's sent changes.
   *
   * Accepts a plain object OR FormData (use FormData to replace profile_photo).
   *
   * Note: Laravel + PATCH + multipart can be unreliable. When sending a
   * FormData with a file, this helper spoofs the method through POST so PHP
   * parses the multipart body correctly. For plain-object (JSON) updates,
   * PATCH is used directly.
   *
   * Backend guards: a verified email/phone cannot be changed; cannot promote
   * to super_admin. Stamps updated_by automatically.
   *
   * @param {number} id
   * @param {Object|FormData} userData
   * @param {Object} [config]
   * @returns Promise<{ data: { message, data: User } }>
   */
  update(id, userData, config = {}) {
    if (userData instanceof FormData) {
      userData.append("_method", "PATCH");
      return apiClient.post(`/users/${id}`, userData, config);
    }
    return apiClient.patch(`/users/${id}`, userData, config);
  },

  /**
   * Paginated list of users. All query params optional.
   *
   * @param {Object} [params]
   *   role         Filter: 'super_admin' | 'election_agent' | 'viewer'
   *   is_active    Filter by status: true | false
   *   search       Matches first_name, last_name, email, phone, national_id, designation
   *   sort_by      'first_name' | 'last_name' | 'email' | 'created_at' | 'last_seen_at' | 'last_login_at'
   *   sort_order   'asc' | 'desc' (default: 'desc')
   *   page         Page number (1-indexed)
   *   per_page     Rows per page (defalult 20, clamped 1..100)
   *
   * @returns Promise<{ data: { data: User[], meta: { current_page, last_page, total, per_page, count } } }>
   */
  list(params = {}) {
    return apiClient.get("/users", { params });
  },

  /**
   * Get a single user by ID.
   *
   * @param {number} id
   * @returns Promise<{ data: { data: User } }>
   */
  getById(id) {
    return apiClient.get(`/users/${id}`);
  },

  /**
   * Resend an OTP for a specific channel — admin trigger.
   * Returns 422 if the channel is already verified.
   * Rate-limited to 5 resends per 5 minutes per user.
   *
   * @param {number} id
   * @param {'email' | 'sms'} channel
   * @returns Promise<{ data: { message } }>
   */
  resendOtp(id, channel) {
    return apiClient.post(`/users/${id}/resend-otp`, { channel });
  },

  /**
   * List roles for the create/edit form dropdown.
   * super_admin is excluded by default (can't be assigned via API).
   *
   * @param {boolean} [includeAll=false]  Pass true to also include super_admin
   * @returns Promise<{ data: { data: Array<{id, name, label, description}>, count } }>
   */
  roles(includeAll = false) {
    return apiClient.get("/roles", {
      params: includeAll ? { include_all: true } : {},
    });
  },

  /**
   * Fetch the list of valid deactivation reasons for the dropdown.
   * @returns Promise<{ data: { data: [{ key, label }] } }>
   */
  deactivationReasons() {
    return apiClient.get("/users/deactivation-reasons");
  },

  /**
   * STEP 1 of deactivation — request a step-up OTP sent to the ACTING ADMIN.
   * Nothing changes on the target user yet; this just issues the OTP.
   *
   * @param {number} id        Target user id
   * @param {Object} payload
   * @param {string} payload.reason   One of the reason keys (e.g. 'reassigned')
   * @param {string} [payload.notes]  Optional free-text notes
   * @param {'email'|'sms'} payload.channel  Where to send the admin's OTP
   * @returns Promise<{ data: { message, requires_otp, channel } }>
   */
  deactivateRequest(id, { reason, notes, channel }) {
    return apiClient.post(`/users/${id}/deactivate/request`, {
      reason,
      notes,
      channel,
    });
  },

  /**
   * STEP 2 of deactivation — submit the admin's OTP to confirm. On success
   * the user is deactivated, reason stored, and their sessions revoked.
   *
   * @param {number} id
   * @param {Object} payload
   * @param {string} payload.reason
   * @param {string} [payload.notes]
   * @param {'email'|'sms'} payload.channel  Same channel used in request step
   * @param {string} payload.otp             6-digit code from the admin's inbox
   * @returns Promise<{ data: { message, data: User } }>
   */
  deactivateConfirm(id, { reason, notes, channel, otp }) {
    return apiClient.post(`/users/${id}/deactivate/confirm`, {
      reason,
      notes,
      channel,
      otp,
    });
  },

  /**
   * Reactivate a user — instant, no OTP. Clears the deactivation fields.
   * @param {number} id
   * @returns Promise<{ data: { message, data: User } }>
   */
  reactivate(id) {
    return apiClient.post(`/users/${id}/reactivate`);
  },

  // ── Admin session management ───────────────────────────────────────────

  /**
   * List a user's active device sessions (admin view).
   * @param {number} id
   * @returns Promise<{ data: { data: Session[], meta: { user_id, total_sessions } } }>
   */
  userSessions(id) {
    return apiClient.get(`/users/${id}/sessions`);
  },

  /**
   * Revoke ALL of a user's sessions (force logout everywhere).
   * @param {number} id
   * @returns Promise<{ data: { message, revoked } }>
   */
  revokeUserSessions(id) {
    return apiClient.delete(`/users/${id}/sessions`);
  },

  /**
   * Revoke ONE of a user's sessions by token id.
   * @param {number} id        User id
   * @param {number} tokenId   The session/token id to revoke
   * @returns Promise<{ data: { message } }>
   */
  revokeUserSession(id, tokenId) {
    return apiClient.delete(`/users/${id}/sessions/${tokenId}`);
  },

  // ── Activity log ───────────────────────────────────────────────────────

  /**
   * Paginated activity log for a user, drawn from auth_logs.
   * Returns events newest first. Each entry includes a humanised event_label
   * (e.g. "Logged in", "PIN set") plus the raw event key, channel, ip_address,
   * user_agent, meta (JSON), and created_at.
   *
   * @param {number} id
   * @param {Object} [params]
   *   page      Page number (1-indexed)
   *   per_page  Rows per page (default 20, clamped 1..100)
   *   event     Optional event filter (e.g. 'login_success')
   *
   * @returns Promise<{ data: { data: ActivityLog[], meta: { current_page, last_page, per_page, total } } }>
   */
  userActivity(id, params = {}) {
    return apiClient.get(`/users/${id}/activity`, { params });
  },
};

/* ───────────────────────────────────────────────────────────────────────
 * Endpoint NOT yet exposed (intentionally):
 *
 * - delete(id)  → no DELETE /users/{user} route on the backend. Users are
 *                 soft-disabled via the `is_active` flag using the
 *                 deactivation flow (deactivateRequest + deactivateConfirm)
 *                 rather than hard-deleted. Add a real delete only if/when
 *                 the backend grows a destroy() method.
 * ─────────────────────────────────────────────────────────────────────── */