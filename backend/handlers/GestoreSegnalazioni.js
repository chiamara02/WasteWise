
const Segnalazione = require("../db/segnalazione").Segnalazione
const ModelloSegnalazione = require("../db/segnalazione")

class GestoreSegnalazioni {

    static async nuovaSegnalazione(utente, descrizione, zona, foto) {

        segnalazione = await Segnalazione.create({
            utente: utente,
            descrizione: descrizione,
            zona: zona,
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