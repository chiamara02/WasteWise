const Sondaggio = require("../db/sondaggio").Sondaggio;
const Questionario = require("../db/sondaggio").Questionario;
const User = require("../db/user").Utente;

class SondaggiHandler {
    
    static async nuovoSondaggio(titolo, domande) {
        let sondaggio = await Sondaggio.create({
            titolo: titolo,
            domande: domande
        });
        return sondaggio;
    }

    static async mostraSondaggi(id) {
        let sondaggio = await Sondaggio.findById(id);
        return sondaggio;
    }

    static async mostraSondaggiDisponibili() {
        //trova tutti i sondaggi non gia compilati dall'utente
        console.log("mostraSondaggiDisponibili - SondaggiHandler.js");
        let sondaggiNonCompilati = await Sondaggio.find({
            _id: { $nin: await Questionario.distinct('sondaggio', { utente: { $exists: true } }) }
        });

        // Trova tutte le istanze del modello sondaggio
        let sondaggi = await Sondaggio.find();
        return sondaggiNonCompilati;
    }

    static async nuovoQuestionario(sondaggio, utente, risposte) {

        let questionario = await Questionario.create({
            sondaggio: sondaggio,
            utente: utente,
            risposte: risposte
        });
        return questionario;
    }

    static async mostraQuestionari(userId, sondaggioId) {
      try {
          let query = {};
  
          // Se è specificato l'userId, filtra per userId
          if (userId) {
              query.utente = userId;
          }
  
          // Se è specificato il sondaggioId, filtra per sondaggioId
          if (sondaggioId) {
              query.sondaggio = sondaggioId;
          }
  
          // Trova i questionari che corrispondono alla query
          let questionari = await Questionario.find(query).populate('sondaggio').populate('utente');
          return questionari;
      } catch (err) {
          throw new Error(err.message);
      }
  }
}

module.exports = SondaggiHandler;
