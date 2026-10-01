import apiClient from "./index.js";

export default {
  // Fetch all partners
  getAll() {
    return apiClient.get("/index.php", {
      params: { entity: "partners" }
    });
  },

  // Get single partner by ID
  getById(id) {
    return apiClient.get("/index.php", {
      params: { entity: "partners", id }
    });
  },

  // Create new partner
  create(partner) {
    return apiClient.post("/index.php?entity=partners", partner);
  },

  // Update partner
  update(id, partner) {
    return apiClient.put(`/index.php?entity=partners&id=${id}`, partner);
  },

  // Delete partner
  delete(id) {
    return apiClient.delete(`/index.php?entity=partners&id=${id}`);
  }
};
