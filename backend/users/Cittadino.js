const LoggedUser = require("./LoggedUser");
const TaxHandler = require("../handlers/TaxHandler");
const GestoreSegnalazioni = require("../handlers/SegnalazioniHandler");
const SondaggiHandler = require("../handlers/SondaggiHandler");

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

    static async compilaSondaggio(sondaggio, utente, risposte) {
        return SondaggiHandler.nuovoQuestionario(sondaggio, utente, risposte);
    }

    static async mostarSondaggi(){
        return SondaggiHandler.mostraSondaggi();
    }

    
}

module.exports = Cittadino;