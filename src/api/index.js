import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
  // NOTE: no global Content-Type. Axios sets it per request automatically:
  //   - plain object  -> application/json
  //   - FormData      -> multipart/form-data; boundary=... (needed for file uploads)
  // Setting a global "application/json" here would break all file uploads.
  headers: {
    Accept: "application/json",
  },
});

// Safety net: if a FormData body slips through with a JSON content-type set
// somewhere, strip it so the browser can apply the correct multipart boundary.
apiClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Remove any explicitly-set JSON content type for multipart requests.
    if (config.headers) {
      delete config.headers["Content-Type"];
      delete config.headers["content-type"];
    }
  }
  return config;
});

// Function to set token dynamically
export function setAuthToken(token) {
  apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default apiClient;