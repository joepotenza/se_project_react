import { checkResponse } from "./constants.js";

export default class ItemApi {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._token = "";
  }

  // single internal function for making API calls
  _makeAPICall({ endpoint, method = "GET", body = "", requireToken = false }) {
    const headers = { ...this._headers };

    // Add token if present and required
    if (this._token && requireToken) {
      headers.authorization = `Bearer ${this._token}`;
    }

    const params = {
      method: method,
      headers: headers,
    };

    // Add body parameter when updating or adding content
    if (method === "PATCH" || method === "POST") {
      params.body = body;
    }

    return fetch(`${this._baseUrl}${endpoint}`, params).then(checkResponse);
  }

  // Set User Token for any API calls
  setUserToken(token) {
    this._token = token;
  }

  // User Signup
  registerUser({ name, avatar, email, password }) {
    return this._makeAPICall({
      endpoint: "/signup",
      method: "POST",
      body: JSON.stringify({ name, avatar, email, password }),
    });
  }

  // User Login
  loginUser({ email, password }) {
    return this._makeAPICall({
      endpoint: "/signin",
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // Verify User Token
  getCurrentUser() {
    return this._makeAPICall({
      endpoint: "/users/me",
      method: "GET",
      requireToken: true,
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
