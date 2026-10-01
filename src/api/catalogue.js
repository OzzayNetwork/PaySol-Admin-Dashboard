import { adminClient, apiClient } from "./index";

/**
 * Product catalogue — /api/v1/admin/catalogue
 *
 * PaySol's shared reference: the barcoded items a business scans against when it
 * adds its own products. GLOBAL — never filtered by business type.
 *
 * One row is one barcoded item. A crate is its own product pointing at the
 * bottle via contains_product_id + contains_qty; there is no variants table and
 * loops are refused. Prices, tax and stock are NOT here — each shop keeps those
 * on its own product row.
 *
 * PRODUCT IDS ARE ULIDs, not integers. They also appear in image and barcode
 * paths, so keep them as opaque strings and never parse them.
 *
 * Products are NEVER deleted — retire them. `status` only moves through verify
 * and retire, so a plain PATCH must never carry it.
 *
 * Permissions: catalogue.view reads, catalogue.manage writes.
 */
export default {
  /**
   * Category tree. Defaults to nested; `flat` gives a plain list, which is what
   * a parent-filtering dropdown wants.
   *
   * @param {Object} [params]
   *   flat            1 = flat list instead of a nested tree
   *   include_inactive 1 = include deactivated categories (never deleted)
   */
  categories(params = {}) {
    return adminClient.get("/catalogue/categories", { params });
  },

  /** Create a category. attribute_schema declares which product attributes apply. */
  createCategory(payload) {
    return adminClient.post("/catalogue/categories", payload);
  },

  /** Edit a category. A move/rename cascades slugs down the tree. */
  updateCategory(categoryId, payload) {
    return adminClient.patch(`/catalogue/categories/${categoryId}`, payload);
  },

  /**
   * List products.
   *
   * @param {Object} [params]
   *   q          text over barcode, name, brand and keywords
   *   category_id  a parent category includes everything below it
   *   status     unverified | verified | retired
   *   image      1 = only rows with a stored image
   *   type       goods | service
   *   group_key  rows sharing a group are variants of one thing
   *   per_page
   */
  products(params = {}) {
    return adminClient.get("/catalogue/products", { params });
  },

  /**
   * Scan lookup by barcode — the path the till uses. Takes priority over name,
   * brand and keywords when resolving a scan.
   */
  lookupProduct(barcode) {
    return adminClient.get("/catalogue/products/lookup", {
      params: { barcode },
    });
  },

  /** One product by ULID. */
  getProduct(productId) {
    return adminClient.get(`/catalogue/products/${productId}`);
  },

  /** Create a product. New rows start unverified. */
  createProduct(payload) {
    return adminClient.post("/catalogue/products", payload);
  },

  /**
   * Edit a product. Do NOT send `status` here — it moves only through
   * verifyProduct / retireProduct.
   */
  updateProduct(productId, payload) {
    return adminClient.patch(`/catalogue/products/${productId}`, payload);
  },

  /** Confirm a product is correct. @param {boolean} is_verified */
  verifyProduct(productId, is_verified = true) {
    return adminClient.post(`/catalogue/products/${productId}/verify`, {
      is_verified,
    });
  },

  /** Retire a product. Never deleted. @param {boolean} retired */
  retireProduct(productId, retired = true) {
    return adminClient.post(`/catalogue/products/${productId}/retire`, {
      retired,
    });
  },

  /**
   * Upload the product image. Send FormData — apiClient strips any JSON
   * content-type so the browser sets the multipart boundary.
   *
   * @param {string} productId ULID
   * @param {File}   file
   */
  uploadImage(productId, file) {
    const body = new FormData();
    body.append("image", file);
    return adminClient.post(`/catalogue/products/${productId}/image`, body);
  },

  /** Remove a product's image. The product itself stays. */
  deleteImage(productId) {
    return adminClient.delete(`/catalogue/products/${productId}/image`);
  },

  /**
   * Add a barcode besides the main one — an alternate, previous or promo code
   * that must scan to the same product.
   *
   * @param {string} productId ULID
   * @param {Object} payload   { barcode, kind, note?, source? }
   */
  addBarcode(productId, payload) {
    return adminClient.post(`/catalogue/products/${productId}/barcodes`, payload);
  },

  /** Promote an extra barcode to be the product's main code. */
  makeMainBarcode(productId, barcodeId, previous_kind) {
    return adminClient.post(
      `/catalogue/products/${productId}/barcodes/${barcodeId}/make-main`,
      previous_kind ? { previous_kind } : {},
    );
  },

  /** Remove an extra barcode. The product's main barcode cannot be removed here. */
  removeBarcode(productId, barcodeId) {
    return adminClient.delete(
      `/catalogue/products/${productId}/barcodes/${barcodeId}`,
    );
  },

  /**
   * Public bank reference, read-only: GET /api/v1/banks.
   *
   * Banks are editable only through adminClient (see ./banks.js); this exists so
   * a picker can list banks and PayBills without a console token.
   */
  publicBanks(params = {}) {
    return apiClient.get("/banks", { params });
  },
};
