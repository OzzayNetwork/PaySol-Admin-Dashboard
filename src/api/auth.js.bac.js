import apiClient from "./index";

export default {
  // Login user and get token
  login(credentials) {
    // credentials = { username: "admin", password: "123456" }
    return apiClient.post("/index.php?entity=auth&action=login", credentials);
  },

  // Logout (if supported by backend)
  logout() {
    return apiClient.post("/index.php?entity=auth&action=logout");
  },

  // Refresh token (if supported)
  refreshToken(refreshData) {
    return apiClient.post("/index.php?entity=auth&action=refresh", refreshData);
  }
};
