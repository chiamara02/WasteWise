const LoggedUser = require("./LoggedUser");
const Tasse = require('../db/tasse').tasse;
const TaxHandler = require("../handlers/TaxHandler");

class Cittadino extends LoggedUser {
    constructor() {
        super();
    }

    static async getStoricoTasse(idUser) {
        return await TaxHandler.getStoricoTasse(idUser);
    }

    static async getPendingTasse(idUser) {
        return await TaxHandler.getTasseByStatus(idUser, "nonPagato");
    }

    static async getPaidTasse(id){
        return await TaxHandler.getTasseByStatus(idUser, "pagato")
    }
    
}

module.exports = Cittadino;