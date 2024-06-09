const LoggedUser = require("./LoggedUser");
const GestoreSegnalazioni = require("../handlers/SegnalazioniHandler")
const PrenotazioniHandler = require("../handlers/PrenotazioniHandler")


class Ente extends LoggedUser {
    constructor() {
        super();
    }
    
    static async mostraSegnalazioni(){
        return GestoreSegnalazioni.mostraSegnalazioni();
    }

    static async getAllPrenotazioni(){
        return PrenotazioniHandler.getAllPrenotazioni();
    }

    static async modificaPrenotazione(idPrenotazione, nuovoStato, dataEffettiva){
        return PrenotazioniHandler.modificaPrenotazione(idPrenotazione, nuovoStato, dataEffettiva);
    }
}

module.exports = Ente;