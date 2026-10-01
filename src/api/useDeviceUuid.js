// src/composables/useDeviceUuid.js

/**
 * Manages the server-issued device_uuid that identifies this browser to the
 * backend. Stored in localStorage so it persists across page reloads.
 *
 * Lifecycle:
 *   1. On first login, localStorage has no uuid → we send null
 *   2. Server creates a device record + issues a uuid → we store it
 *   3. On subsequent logins, we send the stored uuid → server recognises
 *   4. If the user clears site data, the uuid is lost — server treats next
 *      login as "new device" (correct behaviour: cleared storage = new context)
 *
 * Storage key is namespaced so it can be cleared independently of auth tokens.
 */

const STORAGE_KEY = 'kg.device_uuid';

/**
 * Read the current device_uuid from localStorage. Returns null if not set
 * or if the stored value isn't a valid UUID (defensive — never trust the
 * client to have clean data).
 */
export function getDeviceUuid() {
    try {
        const value = localStorage.getItem(STORAGE_KEY);
        if (!value) return null;
        // UUID v4 shape check — reject anything malformed
        if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
            localStorage.removeItem(STORAGE_KEY);
            return null;
        }
        return value.toLowerCase();
    } catch {
        // localStorage can throw in private mode / when disabled
        return null;
    }
}

/**
 * Persist the device_uuid returned by a successful login. Idempotent —
 * safe to call repeatedly with the same uuid.
 */
export function setDeviceUuid(uuid) {
    if (!uuid) return;
    try {
        localStorage.setItem(STORAGE_KEY, String(uuid).toLowerCase());
    } catch {
        // localStorage unavailable — login still works, but every login from
        // this browser will be treated as "new device" by the server
    }
}

/**
 * Clear the stored device_uuid. Use sparingly — clearing means the next
 * login will register a fresh device (and, in Phase 2, may require OTP).
 *
 * Typical callers:
 *   - "Forget this device" admin action
 *   - Account deletion / hard logout flows
 */
export function clearDeviceUuid() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        // no-op
    }
}
