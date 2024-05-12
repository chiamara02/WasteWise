const LoggedUser = require("./LoggedUser");
const Tasse = require('../db/tasse').tasse;
const TaxHandler = require("../handlers/TaxHandler");
const GestoreSegnalazioni = require("../handlers/GestoreSegnalazioni")

class Cittadino extends LoggedUser {
    constructor() {
        super();
    }
    
}

module.exports = Cittadino;