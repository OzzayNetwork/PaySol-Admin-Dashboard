import apiClient from "./index";
import { getDeviceUuid, setDeviceUuid } from "./useDeviceUuid";

export default {
  // ── First-time onboarding ─────────────────────────────────────

  /**
   * Verify an OTP for either email or sms channel.
   * Returns: { message, next_step, verification }
   */
  verifyOtp({ email, channel, code }) {
    return apiClient.post("/auth/verify-otp", { email, channel, code });
  },

  /**
   * Set the 4-digit PIN after at least one channel is verified.
   * Backend issues a token AND a device_uuid (since first PIN set logs the
   * user in immediately). We persist the uuid so subsequent logins from
   * this browser are recognised.
   *
   * Returns: { token, device_uuid, user }
   */
  async setPin({ email, pin, pin_confirmation }) {
    const response = await apiClient.post("/auth/set-password", {
      email,
      pin,
      pin_confirmation,
      device_uuid: getDeviceUuid(),   // null on first-ever request
    });

    if (response.data?.device_uuid) {
      setDeviceUuid(response.data.device_uuid);
    }

    return response;
  },

  // ── Normal auth flow ──────────────────────────────────────────

  /**
   * Log in with email + 4-digit PIN.
   *
   * Sends the stored device_uuid (null on first login from this browser).
   * Backend uses it to recognise the device or register a new one, then
   * returns the uuid so we can persist it for next time.
   *
   * Returns: { token, device_uuid, user }
   */
  async login({ email, pin }) {
    const response = await apiClient.post("/auth/login", {
      email,
      pin,
      device_uuid: getDeviceUuid(),   // null on first login from this browser
    });

    // Persist the uuid issued by the backend so subsequent logins recognise
    // this device. Safe to call even if the uuid is unchanged (idempotent).
    if (response.data?.device_uuid) {
      setDeviceUuid(response.data.device_uuid);
    }

    return response;
  },

  /**
   * Revokes the current token.
   *
   * NOTE: we deliberately do NOT clear the device_uuid here — the device
   * itself is still ours. Clearing it would force an OTP challenge on the
   * next login (Phase 2 behaviour), which is the wrong UX for a logout.
   */
  logout() {
    return apiClient.post("/auth/logout");
  },

  /**
   * Get the currently-authenticated user's profile.
   * Returns: { data: { id, full_name, email, role, polling_station, verification } }
   */
  me() {
    return apiClient.get("/auth/me");
  },

  // ── PIN recovery ──────────────────────────────────────────────

  /**
   * Step 1: Request a reset code via email or sms.
   * Always returns 200 to prevent email enumeration.
   */
  forgotPin({ email, channel }) {
    return apiClient.post("/auth/forgot-pin", { email, channel });
  },

  /**
   * Step 2: Submit the reset code + new PIN.
   * On success, all existing tokens are revoked. The device_uuid in
   * localStorage stays — the next login from this browser will be recognised.
   */
  resetPin({ email, channel, code, pin, pin_confirmation }) {
    return apiClient.post("/auth/reset-pin", {
      email,
      channel,
      code,
      pin,
      pin_confirmation,
    });
  },

  // ── Self-service session management ───────────────────────────

  /**
   * List the current user's own active device sessions.
   * The session making this call is flagged is_current: true.
   * @returns Promise<{ data: { data: Session[] } }>
   */
  sessions() {
    return apiClient.get("/auth/sessions");
  },

  /**
   * Revoke one of my own sessions by token id. Revoking the current one
   * effectively logs this device out.
   * @param {number} tokenId
   * @returns Promise<{ data: { message, was_current } }>
   */
  revokeSession(tokenId) {
    return apiClient.delete(`/auth/sessions/${tokenId}`);
  },

  /**
   * Log out all OTHER devices, keeping the current session active.
   * @returns Promise<{ data: { message, revoked } }>
   */
  revokeOtherSessions() {
    return apiClient.post("/auth/sessions/revoke-others");
  },

  //for verifying OTP during login MFA flow
  verifyLoginOtp({ login_challenge_id, otp }){
      return apiClient.post("/auth/verify-login-otp",{ login_challenge_id, otp })
  },

  //for resending OTP during login

  resendLoginOtp({ login_challenge_id,channel }){
    return apiClient.post(`/auth/login-challenge/${login_challenge_id}/resend`,{ channel })
  }
};