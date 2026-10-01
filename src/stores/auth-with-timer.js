// src/stores/auth.js
// Pinia store for authentication (login/logout).
// Extended with session timeout logic:
//   1. Idle timeout (e.g. logout if inactive for 15 minutes)
//   2. Absolute timeout (e.g. force logout after 24 hours even if active)

import { defineStore } from "pinia";
import { setAuthToken } from "@/api/index"; // helper to set axios default header

// --------------------
// TIMEOUT SETTINGS
// --------------------
const IDLE_TIMEOUT = 15 * 60 * 1000;   // 15 minutes (inactivity)
const ABSOLUTE_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours (max session)

export const useAuthStore = defineStore("auth", {
  // --------------------
  // STATE
  // --------------------
  state: () => ({
    token: null,          // JWT/session token
    user: null,           // logged-in user object
    lastActivity: null,   // timestamp of last activity (mouse/keyboard/etc.)
    loginTime: null,      // timestamp when user logged in
    idleCheckInterval: null // interval for checking session expiry
  }),

  // --------------------
  // GETTERS
  // --------------------
  getters: {
    // Quick check if someone is logged in
    isAuthenticated: (state) => !!state.token
  },

  // --------------------
  // ACTIONS
  // --------------------
  actions: {
    /**
     * Save login data (token + user) to store + localStorage,
     * and start watching for inactivity.
     */
    setAuth(token, user) {
      this.token = token;
      this.user = user;
      this.loginTime = Date.now();   // mark login time
      this.lastActivity = Date.now(); // initial last activity

      // Persist session data in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));
      localStorage.setItem("loginTime", this.loginTime.toString());
      localStorage.setItem("lastActivity", this.lastActivity.toString());

      // Attach token to axios for all requests
      setAuthToken(token);

      // Start idle/expiry watcher
      this.startIdleWatcher();
    },

    /**
     * Clear authentication state completely (logout).
     * Called when user logs out, or when session expires.
     */
    clearAuth() {
      this.token = null;
      this.user = null;
      this.loginTime = null;
      this.lastActivity = null;

      // Remove persisted data
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("loginTime");
      localStorage.removeItem("lastActivity");

      // Remove axios token
      setAuthToken(null);

      // Stop the idle check interval if running
      if (this.idleCheckInterval) {
        clearInterval(this.idleCheckInterval);
        this.idleCheckInterval = null;
      }
    },

    /**
     * Restore state from localStorage on app startup.
     * This way, user stays logged in after refreshing the page.
     * Also resumes the idle watcher.
     */
    initFromLocalStorage() {
      const token = localStorage.getItem("authToken");
      const userJson = localStorage.getItem("authUser");
      const loginTime = localStorage.getItem("loginTime");
      const lastActivity = localStorage.getItem("lastActivity");

      // Restore token
      if (token) {
        this.token = token;
        setAuthToken(token); // put token in axios headers
      }

      // Restore user
      if (userJson) {
        try {
          this.user = JSON.parse(userJson);
        } catch {
          this.user = null; // fallback if corrupted
        }
      }

      // Restore login/lastActivity timestamps
      if (loginTime) this.loginTime = parseInt(loginTime);
      if (lastActivity) this.lastActivity = parseInt(lastActivity);

      // Resume idle watcher
      this.startIdleWatcher();
    },

    /**
     * Update lastActivity timestamp whenever user interacts
     * with the system (mousemove, click, keypress, etc.).
     */
    updateActivity() {
      this.lastActivity = Date.now();
      localStorage.setItem("lastActivity", this.lastActivity.toString());
    },

    /**
     * Start the idle watcher:
     * - Add listeners for user activity
     * - Start an interval to periodically check:
     *     1. Idle timeout (inactive too long?)
     *     2. Absolute timeout (max session reached?)
     */
    startIdleWatcher() {
      // Stop any previous interval to avoid duplicates
      if (this.idleCheckInterval) clearInterval(this.idleCheckInterval);

      // Track activity: update lastActivity on user events
      ["mousemove", "keydown", "click"].forEach(event =>
        window.addEventListener(event, this.updateActivity)
      );

      // Check session expiry every 30 seconds
      this.idleCheckInterval = setInterval(() => {
        const now = Date.now();

        if (!this.lastActivity || !this.loginTime) return;

        // 1. Idle timeout check
        if (now - this.lastActivity > IDLE_TIMEOUT) {
          this.clearAuth();
          alert("⏳ You were logged out due to inactivity.");
        }

        // 2. Absolute timeout check
        if (now - this.loginTime > ABSOLUTE_TIMEOUT) {
          this.clearAuth();
          alert("🔒 Your session has expired. Please log in again.");
        }
      }, 30000); // runs every 30 seconds
    }
  }
});
