import ApiBase from "./ApiBase.js";

export default class AuthApi extends ApiBase {
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
