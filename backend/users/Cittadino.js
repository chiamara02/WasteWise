const LoggedUser = require("./LoggedUser");
const TaxHandler = require("../handlers/TaxHandler");
const SondaggiHandler = require("../handlers/SondaggiHandler");
const TrackingHandler = require("../handlers/TrackingHandler");
const PrenotazioniHandler = require("../handlers/PrenotazioniHandler")
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


    static async compilaQuestionario(sondaggio, utente, risposte) {
        return SondaggiHandler.nuovoQuestionario(sondaggio, utente, risposte);
    }

    static async mostraSondaggi(){
        return SondaggiHandler.mostraSondaggiDisponibili();
    }

    static async mostraSondaggiById(id){
        return SondaggiHandler.mostraSondaggi(id);
    }

    static async getFeedAttuale(zonaId) {
        return await TrackingHandler.getFeedAttuale(zonaId);
    }

    static async getPrenotazioni(idUser){
        return await PrenotazioniHandler.getPrenotazioni(idUser);
    }

    static async nuovaPrenotazione(idUser, descrizione, dateUtili){
        return await PrenotazioniHandler.nuovaPrenotazione(idUser, descrizione, dateUtili);
    }

}

module.exports = Cittadino;