const LoggedUser = require("./LoggedUser");
<<<<<<< HEAD
<<<<<<< HEAD
=======
const Tasse = require('../db/tasse').tasse;
const TaxHandler = require("../handlers/TaxHandler");
<<<<<<< HEAD
>>>>>>> S1-M1
=======
>>>>>>> S1-M1
=======
>>>>>>> parent of 941eb54 (fixed conflicts su api tasse unificate)
const GestoreSegnalazioni = require("../handlers/GestoreSegnalazioni")

class Cittadino extends LoggedUser {
    constructor() {
        super();
    }

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    static async nuovaSegnalazione(utente, descrizione, zona, foto){
        return GestoreSegnalazioni.nuovaSegnalazione(utente, descrizione, zona, foto);
=======
=======
>>>>>>> S1-M1
    static async getAllTasse(idUser) {
        return TaxHandler.getAllTasse(idUser);
    }
    
    static async getPendingTasse(idUser) {
        return TaxHandler.getTasseByStatus(idUser, "nonPagato");
}

    static async getPaidTasse(idUser){
        return TaxHandler.getTasseByStatus(idUser, "pagato")
>>>>>>> S1-M1
=======
    static async nuovaSegnalazione(utente, descrizione, zona, foto){
        return GestoreSegnalazioni.nuovaSegnalazione(utente, descrizione, zona, foto);
>>>>>>> parent of 941eb54 (fixed conflicts su api tasse unificate)
    }
    
}



module.exports = Cittadino;