import ApiBase from "./ApiBase.js";

export default class ItemApi extends ApiBase {
  // Set User Token for any API calls
  setUserToken(token) {
    this._token = token;
  }

  // Load the clothing items from the API
  getClothingItems() {
    return this._makeAPICall({ endpoint: "/items" });
  }

  // Add a new item
  addClothingItem({ name, imageUrl, weather }) {
    return this._makeAPICall({
      endpoint: "/items",
      method: "POST",
      body: JSON.stringify({ name, imageUrl, weather }),
      requireToken: true,
    });
  }

  // Delete an item
  deleteClothingItem(id) {
    return this._makeAPICall({
      endpoint: `/items/${id}`,
      method: "DELETE",
      requireToken: true,
    });
  }

  // Like an item
  likeClothingItem(id) {
    return this._makeAPICall({
      endpoint: `/items/${id}/likes`,
      method: "PUT",
      requireToken: true,
    });
  }

  // Un-like an item
  unlikeClothingItem(id) {
    return this._makeAPICall({
      endpoint: `/items/${id}/likes`,
      method: "DELETE",
      requireToken: true,
    });
  }
}
