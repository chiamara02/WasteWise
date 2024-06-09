const LoggedUser = require("./LoggedUser");
const GestoreSegnalazioni = require("../handlers/SegnalazioniHandler");
const SondaggiHandler = require("../handlers/SondaggiHandler");


class Ente extends LoggedUser {
    constructor() {
        super();
    }
    
    static async mostraSegnalazioni(){
        return GestoreSegnalazioni.mostraSegnalazioni();
    }

    static async nuovoSondaggio(titolo, domande) {
        return SondaggiHandler.nuovoSondaggio(titolo, domande);
    }

    static async mostraQuestionariCompilati(userId, sondaggioId) {
        return SondaggiHandler.mostraQuestionari(userId, sondaggioId);
    }
}

module.exports = Ente;