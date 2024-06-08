const LoggedUser = require("./LoggedUser");
const TaxHandler = require("../handlers/TaxHandler");
const TrackingHandler = require("../handlers/TrackingHandler");

const GestoreSegnalazioni = require("../handlers/SegnalazioniHandler")

class Cittadino extends LoggedUser {
    constructor() {
        super();
    }

    static async nuovaSegnalazione(utente, descrizione, indirizzo, foto) {
        return GestoreSegnalazioni.nuovaSegnalazione(utente, descrizione, indirizzo, foto);
    }

    static async mostraSegnalazioni() {
        return GestoreSegnalazioni.mostraSegnalazioni();
    }

    static async getTasse(idUser, stato = undefined) {
        return TaxHandler.getTasse(idUser, stato);
    }

    static async getFeedAttuale(zonaId) {
        return await TrackingHandler.getFeedAttuale(zonaId);
    }
}

module.exports = Cittadino;