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

    static async mostraSondaggi() {
        // Trova tutte le istanze del modello sondaggio
        let sondaggi = await Sondaggio.find();
        return sondaggi;
    }

    static async nuovoQuestionario(sondaggio, utente, risposte) {
        let user = await User.findById(utente);
        if (!user) throw new FailedDependencyException("User not found");

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
