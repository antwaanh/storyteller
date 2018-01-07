const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
  const Response = use("Adonis/Src/Response");
  const Exception = use("Exception");

  /*
  |--------------------------------------------------------------------------
  | Exception Overrides
  |--------------------------------------------------------------------------
  */

  Exception.handle("HttpException", async (error, { response }) => {
    if (error.status === 404) {
      return response.notFound(error.name, { route: error.message });
    }
  });

  Exception.handle("ValidationException", async (error, { response }) => {
    response.validation(null, error.messages);
  });

  Exception.handle("ModelNotFoundException", async (error, { response }) => {
    response.notFound(error.name, { model: error.message });
  });

  Exception.handle("InvalidJwtToken", async (error, { response }) => {
    response.unauthorzied("Unauthenticated");
  });

  /*
  |--------------------------------------------------------------------------
  | Response Overrides
  |--------------------------------------------------------------------------
  */

  Response.macro("success", function(obj, message) {
    this.status(200).send(blueprint(obj, message));
  });

  Response.macro("show", function(obj) {
    this.status(200).send(blueprint(obj));
  });

  Response.macro("created", function(obj, message = null) {
    let m = message ? message : obj.constructor.name + " created successfully.";

    this.status(201).send(blueprint(obj, m));
  });

  Response.macro("updated", function(obj) {
    this.status(200).send(
      blueprint(obj, obj.constructor.name + " updated successfully.")
    );
  });

  Response.macro("deleted", function(obj) {
    this.status(200).send(
      blueprint(obj, obj.constructor.name + " deleted successfully.")
    );
  });

  Response.macro("notFound", function(message = null, errors) {
    this.status(404).send(blueprint(null, message ? message : null, errors));
  });

  Response.macro("validation", function(message, errors) {
    this.status(422).send(blueprint(null, "Validation Errors", errors));
  });

  Response.macro("unauthorzied", function(message) {
    this.status(401).send(blueprint(null, message ? message : "Unauthorzied"));
  });

  Response.macro("unknown", function() {
    this.status(500).send(blueprint(null, "Unknown Error"));
  });
});

const blueprint = (obj, message = null, errors = null) => {
  return {
    data: obj,
    message,
    errors
  };
};
