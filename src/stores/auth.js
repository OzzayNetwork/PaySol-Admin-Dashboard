// src/stores/auth.js
// This Pinia store manages authentication state (token + user data).
// It also handles persistence to localStorage, and sets the axios header
// so all API calls are authenticated after login.

import { defineStore } from "pinia";
import { setAuthToken } from "@/api/index"; // helper function in api/index.js

export const useAuthStore = defineStore("auth", {
  // -------------------
  // STATE
  // -------------------
  state: () => ({
    token: null, // the JWT or session token returned by your backend
    user: null   // user object (e.g. { id, name, email })
  }),

  // -------------------
  // GETTERS
  // -------------------
  getters: {
    // Returns true if we have a token (i.e. user is logged in)
    isAuthenticated: (state) => !!state.token
  },

  // -------------------
  // ACTIONS
  // -------------------
  actions: {
    /**
     * Save token + user to both Pinia state and localStorage,
     * and set axios Authorization header.
     * Call this right after successful login.
     */
    setAuth(token, user) {
      this.token = token;
      this.user = user;

      // Persist to localStorage so data survives page refresh
      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));

      // Update axios header so every request uses this token
      setAuthToken(token);
    },

    /**
     * Clear everything (state + localStorage + axios header).
     * Call this when user logs out or when the token expires.
     */
    clearAuth() {
      this.token = null;
      this.user = null;

      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");

      // Remove Authorization header
      setAuthToken(null);
    },

    /**
     * Rehydrate store from localStorage.
     * Call this once when app starts (in main.js),
     * so user stays logged in after refreshing the page.
     */
    initFromLocalStorage() {
      const token = localStorage.getItem("authToken");
      const userJson = localStorage.getItem("authUser");

      if (token) {
        this.token = token;
        setAuthToken(token); // put token into axios headers
      }

      if (userJson) {
        try {
          this.user = JSON.parse(userJson); // restore user object
        } catch {
          this.user = null; // fallback if JSON is corrupted
        }
      }
    }
  }
});
