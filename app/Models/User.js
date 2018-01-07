"use strict";

const Model = use("Model");

class User extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeCreate", "User.hashPassword");
  }

  static get hidden() {
    return ["password", "updated_at"];
  }

  tokens() {
    return this.hasMany("App/Models/Token");
  }
}

module.exports = User;
