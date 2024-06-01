const Sondaggio = require("../db/sondaggio").Sondaggio;
const Questionario = require("../db/sondaggio").Questionario;
const Utente = require("../db/user").Utente;

class SondaggiHandler {
  static async getQuestionarioByUserId(idUtente) {
    let user = await User.findById(idUtente);
    if (!user) throw new NotFoundException("User not found");
    let questionario = await Questionario.findOne({
      utente: idUtente,
    }).populate("sondaggio");
    return questionario;
  }

  static async getQuestionariById(idQuestionario) {
    let questionario = await Questionario.findById(idQuestionario).populate(
      "sondaggio"
    );
    return questionario;
  }

  static async getQuestionarioBySondaggioId(idSondaggio) {
    let questionario = await Questionario.findOne({
      sondaggio: idSondaggio,
    }).populate("sondaggio");
    return questionario;
  }

  
  static async getSondaggio(idSondaggio) {
    let sondaggio = await Sondaggio.findById(idSondaggio).populate("domande");
    return sondaggio;
  }

  static async postQuestionario(idUtente, idSondaggio) {
    let questionario = await Questionario.create({
      utente: idUtente,
      sondaggio: idSondaggio,
      data: new Date(),
    });
    return questionario;
  }

  static async postRisposta(idQuestionario, idDomanda, risposta) {
    let questionario = await Questionario.findById(idQuestionario);
    if (!questionario) throw new NotFoundException("Questionario not found");
    let domanda = await Domanda.findById(idDomanda);
    if (!domanda) throw new NotFoundException("Domanda not found");
    let risposta = await Risposta.create({
      questionario: idQuestionario,
      domanda: idDomanda,
      risposta: risposta,
    });
    return risposta;
  }

  static async postDomanda(testo) {
    let domanda = await Domanda.create({
      testo: testo,
    });
    return domanda;
  }

  static async postSondaggio(domande) {
    let sondaggio = await Sondaggio.create({
      domande: domande,
    });
    return sondaggio;
  }
}

module.exports = SondaggiHandler;