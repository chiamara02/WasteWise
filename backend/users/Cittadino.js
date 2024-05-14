const LoggedUser = require("./LoggedUser");
const GestoreSegnalazioni = require("../handlers/GestoreSegnalazioni")

class Cittadino extends LoggedUser {
    constructor() {
        super();
    }

    static async nuovaSegnalazione(utente, descrizione, zona, foto){
        return GestoreSegnalazioni.nuovaSegnalazione(utente, descrizione, zona, foto);
    }

    static async mostraSegnalazioni(){
        return GestoreSegnalazioni.mostraSegnalazioni();
    }

}



module.exports = Cittadino;