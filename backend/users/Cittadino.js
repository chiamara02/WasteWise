const LoggedUser = require("./LoggedUser");
const Tasse = require('../db/tasse').tasse;
const TaxHandler = require("../handlers/TaxHandler");

const GestoreSegnalazioni = require("../handlers/GestoreSegnalazioni")

class Cittadino extends LoggedUser {
    constructor() {
        super();
    }

    static async nuovaSegnalazione(utente, descrizione, zona, foto){
        return GestoreSegnalazioni.nuovaSegnalazione(utente, descrizione, zona, foto);
    }
 
}



module.exports = Cittadino;