const User = require("../db/user").User;
const Zona = require("../db/zona").Zona;
const Segnalazione = require("../db/segnalazione").Segnalazione
const FailedDependencyException = require("../exceptions/FailedDependencyException");


class GestoreSegnalazioni {

    static async nuovaSegnalazione(utente, descrizione, indirizzo, foto) {
        
        let user = await User.findById(utente);
        if (!user) throw new UnauthorizedException("User not found");


        let segnalazione = await Segnalazione.create({
            utente: utente,
            descrizione: descrizione,
            indirizzo: indirizzo,
            foto: foto
        });
        return segnalazione;
    }

    static async mostraSegnalazioni() {
        // Trova tutte le istanze del modello segnalazione
        let segnalazioni = await Segnalazione.find();
        return segnalazioni;
    }
}

module.exports = GestoreSegnalazioni;