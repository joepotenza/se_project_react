export default class Api {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // single internal function for making API calls
  _makeAPICall({ endpoint, method = "GET", body = "" }) {
    const params = {
      method: method,
      headers: this._headers,
    };
    // Add body parameter when updating or adding content
    if (method === "PATCH" || method === "POST") {
      params.body = body;
    }
    return fetch(`${this._baseUrl}${endpoint}`, params).then((res) => {
      if (res.ok) {
        // Parse the JSON response on success
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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
    });
  }

  // Delete an item
  deleteClothingItem(id) {
    return this._makeAPICall({
      endpoint: `/items/${id}`,
      method: "DELETE",
    });
  }
}
