"use strict";

const Schema = use("Schema");

class StorySchema extends Schema {
  up() {
    this.create("stories", table => {
      table.increments();
      table
        .string("title")
        .notNullable()
        .default("untitled");
      table.string("abstract");
      table.integer("created_by").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("stories");
  }
}

module.exports = StorySchema;
