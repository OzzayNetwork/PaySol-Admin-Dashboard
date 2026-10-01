import { adminClient } from "./index";
import { getDeviceUuid, setDeviceUuid } from "./useDeviceUuid";

/**
 * Admin console authentication — /api/v1/admin/auth
 *
 * Flow (all of it real endpoints on the PaySol backend):
 *   1. verifyOtp           POST auth/verify-otp      {email, channel, code}
 *      -> {next_step: 'login'|'set_password', verification, setup_token?}
 *   2. setPin              POST auth/set-password    {email, setup_token, password, password_confirmation}
 *      -> signs in immediately: {token, device_uuid, user}
 *   3. login               POST auth/login           {email, password}
 *      -> {token, device_uuid, user}
 *      -> OR, for a new/untrusted device: {requires_otp, login_challenge_id, ...}
 *   4. verifyLoginOtp      POST auth/verify-login-otp {login_challenge_id, otp}
 *      -> {token, device_uuid, user}
 *
 * Password reset:
 *   forgotPin / resendPasswordResetOtp -> POST auth/forgot-password
 *   resetPin                            POST auth/reset-password
 *
 * TWO THINGS TO KNOW, both about names rather than behaviour:
 *
 *  - The wire field is `password`. The UI screens still call it a PIN and send
 *    `pin`, so every method here accepts `password` or `pin` and always sends
 *    `password`. The screens' `pin_confirmation` is mapped onto the wire's
 *    `password_confirmation`: Laravel's `confirmed` rule is part of
 *    `AdminPasswordRules`, so a new password arrives as a pair and sending only
 *    one is a 422.
 *
 *  - `set-password` requires a `setup_token` that only `verify-otp` returns. The
 *    wizard screen does not carry it across screens, so it is held here from the
 *    last verifyOtp and sent automatically. That is a stopgap — wire the token
 *    through the wizard state and drop the module-level copy.
 */

let setupToken = null;

function authResponse(response) {
  if (response.data?.device_uuid) {
    setDeviceUuid(response.data.device_uuid);
  }
  return response;
}

/** Accepts `password` (preferred) or `pin` (legacy UI wording). */
function passwordOf({ password, pin } = {}) {
  const value = password ?? pin;
  if (!value) {
    throw new Error(
      "No password supplied: pass `password` (the UI's `pin` is also accepted).",
    );
  }
  return value;
}

/**
 * The two fields every "set a new password" endpoint wants.
 *
 * `confirmed` is inside `AdminPasswordRules`, so the confirmation is part of the
 * contract rather than a nicety the screens can skip. A screen that collected
 * only one box gets the same value in both.
 */
function passwordFields({
  password,
  pin,
  password_confirmation,
  pin_confirmation,
} = {}) {
  const value = passwordOf({ password, pin });
  return {
    password: value,
    password_confirmation: password_confirmation ?? pin_confirmation ?? value,
  };
}

export default {
  // ── Verification and first password (public) ───────────────────────

  /**
   * Verify an OTP sent to an email address or phone number.
   *
   * Always answers the same way for "no such account" and "wrong code", so it
   * cannot be used to discover which emails exist.
   *
   * Returns { message, next_step, verification, setup_token?, ... }
   * `next_step` is 'set_password' when no password exists yet, else 'login'.
   * The setup_token is retained for setPin().
   */
  verifyOtp({ email, channel, code }) {
    return adminClient
      .post("/auth/verify-otp", { email, channel, code })
      .then((response) => {
        setupToken = response.data?.setup_token ?? setupToken;
        return response;
      });
  },

  /** Send a fresh verification code. */
  resendVerification({ email, channel }) {
    return adminClient.post("/auth/resend-verification", { email, channel });
  },

  /**
   * Set the first password, which also signs in.
   *
   * Needs the setup_token from verifyOtp(); pass it explicitly or rely on the
   * copy kept by verifyOtp().
   *
   * Returns { message, token, device_uuid, user }
   */
  setPin({
    email,
    password,
    pin,
    password_confirmation,
    pin_confirmation,
    setup_token,
    device_uuid,
  }) {
    return adminClient
      .post("/auth/set-password", {
        email,
        setup_token: setup_token ?? setupToken,
        ...passwordFields({
          password,
          pin,
          password_confirmation,
          pin_confirmation,
        }),
        device_uuid: device_uuid ?? getDeviceUuid(),
      })
      .then(authResponse);
  },

  // ── Sign in (public) ───────────────────────────────────────────────

  /**
   * Sign in with email + password.
   *
   * Sends the stored device_uuid (null on a first login from this browser) so
   * the backend can recognise the device or register a new one. The uuid it
   * issues back is persisted for next time.
   *
   * Returns { token, device_uuid, user }
   * ...or, when the device is new or untrusted:
   * { requires_otp: true, login_challenge_id, channel, masked_destination,
   *   available_channels, expires_in_minutes, max_attempts }
   */
  login({ email, password, pin, device_uuid }) {
    return adminClient
      .post("/auth/login", {
        email,
        password: passwordOf({ password, pin }),
        device_uuid: device_uuid ?? getDeviceUuid(),
      })
      .then(authResponse);
  },

  /** Finish a sign-in that was interrupted by a one-time code. */
  verifyLoginOtp({ login_challenge_id, otp }) {
    return adminClient
      .post("/auth/verify-login-otp", { login_challenge_id, otp })
      .then(authResponse);
  },

  /**
   * Send another code for a pending sign-in, or for a password reset when
   * `login_challenge_id` is omitted.
   *
   * There is no separate "resend reset code" endpoint: calling forgot-password
   * again issues a fresh code, so this dispatches on which id is present.
   *
   * Returns { message, channel, masked_destination,
   *           available_channels, codes_remaining }
   */
  resendPasswordResetOtp({ email, channel }) {
    return adminClient.post("/auth/forgot-password", { email, channel });
  },

  resendLoginOtp({ login_challenge_id, channel }) {
    return adminClient.post(
      `/auth/login-challenge/${login_challenge_id}/resend`,
      { channel },
    );
  },

  // ── PIN / password recovery (public) ───────────────────────────────

  /**
   * Request a reset code. Always 200, to prevent email enumeration.
   */
  forgotPin({ email, channel }) {
    return adminClient.post("/auth/forgot-password", { email, channel });
  },

  /**
   * Submit the reset code + new password. Revokes every existing session.
   *
   * Returns { message } — sign in again afterwards.
   */
  resetPin({
    email,
    channel,
    code,
    password,
    pin,
    password_confirmation,
    pin_confirmation,
  }) {
    return adminClient.post("/auth/reset-password", {
      email,
      channel,
      code,
      ...passwordFields({
        password,
        pin,
        password_confirmation,
        pin_confirmation,
      }),
    });
  },

  // ── Signed in ──────────────────────────────────────────────────────

  /**
   * The current admin, including their resolved permission list — this is what
   * the console gates navigation on.
   *
   * Returns { data: { id, full_name, email, role, permissions, verification,
   *                   security, last_login_at, last_login_location } }
   */
  me() {
    return adminClient.get("/auth/me");
  },

  /**
   * Revoke the current token.
   *
   * The device_uuid is deliberately NOT cleared: the device is still ours, and
   * clearing it would force an OTP challenge on the next sign-in, which is the
   * wrong behaviour for a sign-out.
   */
  logout() {
    return adminClient.post("/auth/logout");
  },

  /**
   * Change your own password. Signs out every other session.
   *
   * Needs the current password, so this is the one screen that collects two
   * boxes of its own: `current_password` is the existing one and `password` the
   * new one.
   */
  changePassword({
    current_password,
    password,
    pin,
    password_confirmation,
    pin_confirmation,
  }) {
    return adminClient.post("/auth/change-password", {
      current_password,
      ...passwordFields({
        password,
        pin,
        password_confirmation,
        pin_confirmation,
      }),
    });
  },

  // ── Self-service session management ────────────────────────────────

  /**
   * This admin's own active sessions. The calling one is flagged is_current.
   * Returns { data: [{ id, device, device_id, last_used_at, created_at, is_current }] }
   */
  sessions() {
    return adminClient.get("/auth/sessions");
  },

  /** Revoke one of your own sessions by token id. @param {number} tokenId */
  revokeSession(tokenId) {
    return adminClient.delete(`/auth/sessions/${tokenId}`);
  },

  /** Sign out every other device, keeping this session. */
  revokeOtherSessions() {
    return adminClient.post("/auth/sessions/revoke-others");
  },

  /**
   * Devices signed in to this account, trusted or not.
   * Returns { data: AdminDevice[] }
   */
  devices() {
    return adminClient.get("/auth/devices");
  },

  /** Stop trusting a device: its next sign-in asks for a code again. */
  untrustDevice(deviceId) {
    return adminClient.delete(`/auth/devices/${deviceId}/trust`);
  },

  /** Drops the retained setup_token — call after setPin() succeeds. */
  clearSetupToken() {
    setupToken = null;
  },
};
