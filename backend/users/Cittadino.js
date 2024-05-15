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

    static async getAllTasse(idUser) {
        return TaxHandler.getAllTasse(idUser);
    }
    
    static async getPendingTasse(idUser) {
        return TaxHandler.getTasseByStatus(idUser, "nonPagato");
}

    static async getPaidTasse(idUser){
        return TaxHandler.getTasseByStatus(idUser, "pagato")
    }
 
}



module.exports = Cittadino;