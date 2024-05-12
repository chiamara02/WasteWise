const LoggedUser = require("./LoggedUser");
const Tasse = require('../db/tasse').tasse;
const TaxHandler = require("../handlers/TaxHandler");

class Cittadino extends LoggedUser {
    constructor() {
        super();
    }

    static async getStoricoTasse(idUser) {
        return TaxHandler.getStoricoTasse(idUser);
    }

    static async getPendingTasse(idUser) {
        return TaxHandler.getTasseByStatus(idUser, "nonPagato");
    }

    static async getPaidTasse(idUser){
        return TaxHandler.getTasseByStatus(idUser, "pagato")
    }
    
}

module.exports = Cittadino;