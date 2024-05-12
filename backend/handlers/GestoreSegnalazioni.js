const User = require("../db/user").User;
const Zona = require("../db/zona").Zona;
const Segnalazione = require("../db/segnalazione").Segnalazione
const ModelloSegnalazione = require("../db/segnalazione")
const FailedDependencyException = require("../exceptions/FailedDependencyException");


class GestoreSegnalazioni {

    static async nuovaSegnalazione(utente, descrizione, zona, foto) {
        
        let user = await User.findById(utente);
        if (!user) throw new FailedDependencyException("User not found");

        let zona_db = await Zona.findOne({ nome: zona });
        if(!zona_db) throw new FailedDependencyException("Zone not found"); 

        let segnalazione = await Segnalazione.create({
            utente: utente,
            descrizione: descrizione,
            zona: zona_db._id,
            foto: foto
        });
        return segnalazione;
    }

    static async mostraSegnalazioni() {
        // Trova tutte le istanze del modello segnalazione
        segnalazioni = await ModelloSegnalazione.find()
        return segnalazioni;
    }
}

module.exports = GestoreSegnalazioni;