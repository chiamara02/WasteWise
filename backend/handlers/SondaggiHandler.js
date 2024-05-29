const Sondaggio = require("../db/sondaggio").Sondaggio;
const Questionario = require("../db/sondaggio").Questionario;

class SondaggiHandler {
    static async getQuestionario(idUtente) {
        let questionario = await Questionario.findOne({ utente: idUtente }).populate("sondaggio");
        return questionario;
    }

    static async getSondaggi() {
        let sondaggi = await Sondaggio.find().populate("domande");
        return sondaggi;
    }

    static async getSondaggio(idSondaggio) {
        let sondaggio = await Sondaggio.findById(idSondaggio).populate("domande");
        return sondaggio;
    }

    static async postQuestionario(idUtente, idSondaggio) {
        let questionario = await Questionario.create({
            utente: idUtente,
            sondaggio: idSondaggio,
            data: new Date()
        });
        return questionario;
    }
}