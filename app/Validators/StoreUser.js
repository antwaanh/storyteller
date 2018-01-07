"use strict";

class StoreUser {
  get rules() {
    return {
      username: "required|string|min:2|max:15|unique:users,username",
      email: "required|email|unique:users,email",
      password: "required"
    };
  }
}

module.exports = StoreUser;
