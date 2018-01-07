"use strict";

class UpdateUser {
  get rules() {
    return { username: "string|min:2|max:15|unique:users,username" };
  }
}

module.exports = UpdateUser;
