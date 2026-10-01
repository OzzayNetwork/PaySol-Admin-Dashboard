import { adminClient, apiClient } from "./index";

/**
 * Banks & PayBills — /api/v1/admin/banks and /api/v1/banks
 *
 * Master directory of Kenyan commercial banks: shared PayBills, USSD, account
 * number formats, and developer API portals (guide §8.5).
 *
 * Split: apiClient.get('/banks') is public read (POS/onboarding); adminClient
 * gives banks.view/manage and adding paybills under a specific bank.
 *
 * A bank has one primary PayBill and possibly extra ones. When you add a
 * paybill with `is_primary: true`, the backend makes the others non-primary.
 *
 * Banks and paybills are not deleted — record history instead, though the
 * controller currently allows destroying a non-primary paybill. Never delete
 * a bank that has ever been used by a transaction.
 */
export default {
  // Read-only (public)
  publicBanks(params = {}) {
    return apiClient.get("/banks", { params });
  },

  lookupPublic(params = {}) {
    return apiClient.get("/banks/lookup", { params });
  },

  // Admin read
  list(params = {}) {
    return adminClient.get("/banks", { params });
  },

  get(bankId) {
    return adminClient.get(`/banks/${bankId}`);
  },

  lookup(params = {}) {
    return adminClient.get("/banks/lookup", { params });
  },

  // Admin write
  create(payload) {
    return adminClient.post("/banks", payload);
  },

  update(bankId, payload) {
    return adminClient.patch(`/banks/${bankId}`, payload);
  },

  /**
   * Add a PayBill for a bank.
   * @param {number} bankId
   * @param {{paybill_number, is_primary?, kind?, active?}} payload
   */
  addPaybill(bankId, payload) {
    return adminClient.post(`/banks/${bankId}/paybills`, payload);
  },

  /**
   * Remove an extra PayBill. The primary PayBill must remain. If the removed
   * one was primary, the backend will promote another to primary (see controller).
   */
  removePaybill(bankId, paybillId) {
    return adminClient.delete(`/banks/${bankId}/paybills/${paybillId}`);
  },
};
