"use strict";

const User = use("App/Models/User");

class UserController {
  async index() {
    return { data: [{ hello: "world" }] };
  }

  async store({ request, response }) {
    let user = await User.create(request.all());

    response.created(user);
  }

  async show({ response, params }) {
    let user = await User.findOrFail(params.id);

    response.show(user);
  }

  async update({ request, response, params }) {
    let user = await User.findOrFail(params.id);

    user.username = request.input("username");
    await user.save();

    response.updated(user);
  }

  async destroy({ response, params }) {
    let user = await User.findOrFail(params.id);
    user.delete();

    response.deleted(user);
  }
}

module.exports = UserController;
