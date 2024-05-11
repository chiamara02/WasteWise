// const passport = require("passport");
require("../auth/passport-auth");

const auth = require("./auth");
const segnalazioni = require("./segnalazioni");

const base_url = "/api";
passport_options = {
  session: false,
};

// Exporting routes
module.exports = (app) => {
  app.use(base_url + "/auth", auth);
  app.use(base_url + "/segnalazioni", passport.authenticate("jwt", passport_options), segnalazioni);
  // Examples:
  // app.use(base_url, route-file-required);
  // app.use(base_url + "/route", passport.authenticate("jwt", passport_options), route-file-required);
};
