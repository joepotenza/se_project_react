export default class AuthApi {
  constructor({ baseUrl, headers }) {
    // constructor body
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._token = "";
  }

  // single internal function for making API calls
  _makeAPICall({ endpoint, method = "GET", body = "", requireToken = false }) {
    const params = {
      method: method,
      headers: this._headers,
    };
    // Add body parameter when updating or adding content
    if (method === "PATCH" || method === "POST") {
      params.body = body;
    }
    // Add token if present and required
    if (this._token !== "" && requireToken) {
      params.headers.authorization = `Bearer ${this._token}`;
    }
    return fetch(`${this._baseUrl}${endpoint}`, params).then((res) => {
      if (res.ok) {
        // Parse the JSON response on success
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
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

  // Edit user profile
  editUserProfile({ name, avatar }) {
    return this._makeAPICall({
      endpoint: "/users/me",
      method: "PATCH",
      body: JSON.stringify({ name, avatar }),
      requireToken: true,
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
}
