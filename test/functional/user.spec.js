"use strict";

const { test, trait } = use("Test/Suite")("User");
const User = use("App/Models/User");

trait("Test/ApiClient");
trait("Auth/Client");

const prefix = "api/v1";

test("register/create user", async ({ client }) => {
  let user = {
    username: "batman",
    email: "bruce.wayne@example.com",
    password: "b@t5i9a1"
  };

  const response = await client
    .post(`${prefix}/users`)
    .send(user)
    .accept("application/json")
    .end();

  response.assertStatus(201);
  response.assertJSONSubset({ message: "User created successfully." });
});

test("unauthenticated user can't read resource", async ({ client }) => {
  let user = await User.find(1);

  const response = await client.get(`${prefix}/users/${user.id}`).end();

  response.assertStatus(401);
  response.assertJSONSubset({ message: "Unauthenticated" });
});

test("unauthenticated user can't update resource", async ({ client }) => {
  let user = await User.find(1);

  const response = await client
    .put(`${prefix}/users/${user.id}`)
    .send({
      username: "joker 🤡"
    })
    .end();

  response.assertStatus(401);
  response.assertJSONSubset({ message: "Unauthenticated" });
});

test("unauthenticated user can't destroy resource", async ({ client }) => {
  let user = await User.find(1);

  const response = await client.delete(`${prefix}/users/${user.id}`).end();

  response.assertStatus(401);
  response.assertJSONSubset({ message: "Unauthenticated" });
});

test("authenticated user can read resource", async ({ client }) => {
  let user = await User.find(1);

  const response = await client
    .get(`${prefix}/users/${user.id}`)
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
});

test("authenticated user can update resource", async ({ client }) => {
  let user = await User.find(1);

  const response = await client
    .put(`${prefix}/users/${user.id}`)
    .send({
      username: "joker 🤡"
    })
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({ message: "User updated successfully." });
});

test("authenticated user can destroy resource", async ({ client }) => {
  let user = await User.find(1);

  const response = await client
    .delete(`${prefix}/users/${user.id}`)
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({ message: "User deleted successfully." });
});
