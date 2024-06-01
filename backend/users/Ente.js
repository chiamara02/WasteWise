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

    static async getQuestionarioByUserId(idUtente){
        return SondaggiHandler.getQuestionarioByUserId(idUtente);
    }

    static async getQuestionariById(idQuestionario){
        return SondaggiHandler.getQuestionariById(idQuestionario);
    }

    static async getQuestionarioBySondaggioId(idSondaggio){
        return SondaggiHandler.getQuestionarioBySondaggioId(idSondaggio);
    }

    static async postSondaggio(domande){     
        return SondaggiHandler.postSondaggio(domande);
    }

    static async postDomanda(testo){
        return SondaggiHandler.postDomanda(testo);
    }
}

module.exports = Ente;