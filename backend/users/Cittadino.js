const LoggedUser = require("./LoggedUser");
const TaxHandler = require("../handlers/TaxHandler");

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

    static async getAllTasse(idUser) {
        return TaxHandler.getAllTasse(idUser);
    }

    static async getPendingTasse(idUser) {
        return TaxHandler.getTasseByStatus(idUser, "nonPagato");
    }

    static async getPaidTasse(idUser) {
        return TaxHandler.getTasseByStatus(idUser, "pagato")
    }

}

module.exports = Cittadino;