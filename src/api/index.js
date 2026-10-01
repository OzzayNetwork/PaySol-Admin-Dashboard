import axios from "axios";

/**
 * PaySol Admin API clients.
 *
 * Two instances, one token:
 *
 *   apiClient   -> {base}/api/v1           public, unauthenticated reference data
 *                  countries, counties, constituencies, sub-counties,
 *                  wards, areas, banks
 *
 *   adminClient -> {base}/api/v1/admin     the console; Bearer token required
 *                  auth, admins, roles, tenants, catalogue, leads, banks (rw),
 *                  geography corrections
 *
 * The split is not cosmetic. PaySol separates them deliberately: location
 * reference data is public reference, while the catalogue is PaySol-curated and
 * admin-only until tenant sign-in exists. Keeping two clients makes it obvious
 * at the call site which half you are touching, and it stops a public call from
 * silently picking up the admin prefix.
 *
 * It mirrors the Postman collection's `apiUrl` / `baseUrl` pair.
 */

const BASE = (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1").replace(/\/+$/, "");
const ADMIN_BASE = `${BASE}/admin`;

function build(baseURL) {
  const client = axios.create({
    baseURL,
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
  client.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
      // Remove any explicitly-set JSON content type for multipart requests.
      if (config.headers) {
        delete config.headers["Content-Type"];
        delete config.headers["content-type"];
      }
    }
    return config;
  });

  return client;
}

export const apiClient = build(BASE);
export const adminClient = build(ADMIN_BASE);

/** Both clients, so a token or interceptor change only has to happen once. */
const clients = [apiClient, adminClient];

// Function to set token dynamically. Applies to both halves of the API.
export function setAuthToken(token) {
  clients.forEach((client) => {
    if (token) {
      client.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete client.defaults.headers["Authorization"];
    }
  });
}

export default apiClient;
