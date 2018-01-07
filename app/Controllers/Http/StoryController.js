"use strict";

const Story = use("App/Models/Story");

class StoryController {
  async index({ response }) {
    let stories = await Story.all();

    response.success(stories);
  }

  async store({ request, response, auth }) {
    let story = await Story.create({
      title: request.input("title"),
      abstract: request.input("abstract"),
      created_by: auth.user.id
    });

    response.created(story);
  }

  async show({ request, response, params }) {
    let story = await Story.findOrFail(params.id);

    response.show(story);
  }

  async update({ request, response, params }) {
    let story = await Story.findOrFail(params.id);

    story.merge(request.all());
    await story.save();

    await story.load("author");

    response.updated(story);
  }

  async destroy({ response, params }) {
    let story = await Story.findOrFail(params.id);

    story.delete();

    response.deleted(story);
  }
}

module.exports = StoryController;
