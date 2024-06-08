// const passport = require("passport");
require("../auth/passport-auth");
const passport = require("passport");

const auth = require("./auth");
const segnalazioni = require("./segnalazioni");
const zone = require("./zone");
const tasse = require("./tasse");
const tracking = require("./tracking");


const base_url = "/api";
passport_options = {
  session: false,
};

// Exporting routes
module.exports = (app) => {
  app.use(base_url + "/auth", auth);
  app.use(base_url + "/zone", zone);
  app.use(base_url + "/segnalazioni", segnalazioni);
  app.use(base_url + "/tasse", passport.authenticate("jwt", passport_options), tasse);
  app.use(base_url + "/tracking", tracking);
};
