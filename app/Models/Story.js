"use strict";

const Model = use("Model");

class Story extends Model {
  static get hidden() {
    return ["created_by"];
  }

  author() {
    return this.belongsTo("App/Models/User", "created_by");
  }
}

module.exports = Story;
