const LoggedUser = require("./LoggedUser");
const GestoreSegnalazioni = require("../handlers/SegnalazioniHandler")


class Ente extends LoggedUser {
    constructor() {
        super();
    }
    
    static async mostraSegnalazioni(){
        return GestoreSegnalazioni.mostraSegnalazioni();
    }
}

module.exports = Ente;