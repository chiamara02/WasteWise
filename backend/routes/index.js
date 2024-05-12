const passport = require("passport");
require("../auth/passport-auth");

const auth = require("./auth");

const tasse = require("./tasse");

const base_url = "/api";
passport_options = {
  session: false,
};

// Exporting routes
module.exports = (app) => {
  app.use(base_url + "/auth", auth);
  app.use(base_url + "/tasse", passport.authenticate("jwt", passport_options), tasse);
  // Examples:
  // app.use(base_url, route-file-required);
  // app.use(base_url + "/route", passport.authenticate("jwt", passport_options), route-file-required);
};
