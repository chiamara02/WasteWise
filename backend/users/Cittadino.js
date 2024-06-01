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

    static async getTasse(idUser, stato = undefined) {
        return TaxHandler.getTasse(idUser, stato);
    }

    static async getSondaggio(idSondaggio) {
        return SondaggiHandler.getSondaggio(idSondaggio);
    }

    static async postQuestionario(idUtente, idSondaggio) {
        return SondaggiHandler.postQuestionario(idUtente, idSondaggio);
    }

    static async postRisposta(idQuestionario, idDomanda, risposta) {
        return SondaggiHandler.postRisposta(idQuestionario, idDomanda, risposta);
    }
}

module.exports = Cittadino;