"use strict";

const User = use("App/Models/User");

class AuthController {
  async login({ request, response, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);

    response.created(token, "Token generated successfully.");
  }
}

module.exports = AuthController;
