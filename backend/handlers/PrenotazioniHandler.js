const User = require("../db/user").User;
const Prenotazione = require("../db/prenotazione").Prenotazione
const FailedDependencyException = require("../exceptions/FailedDependencyException");
const NotFoundException = require("../exceptions/NotFoundException");

class PrenotazioniHandler {

    static async getPrenotazioni(idUser) {

        let query = {};
        // Verifica se l'utente è specificato e se esiste
        if (idUser) {
            let user = await User.findById(idUser);
            if (!user) throw new NotFoundException("User not found");

            query.utente = idUser;
        }
        // Trova tutte le prenotazioni, oppure solo quelle dell'utente specificato
        try{
           return await Prenotazione.find(query);
        } catch (error) {
           throw new NotFoundException("Appointment not found");
        }
    };

    static async getAllPrenotazioni() {
        // Trova tutte le istanze del modello prenotazione
        let prenotazioni = await Prenotazione.find();
        return prenotazioni;
    };


    static async nuovaPrenotazione(idUser, descrizione, dateUtili) {

        let user = await User.findById(idUser);
        if (!user) throw new FailedDependencyException("User not found");

        let prenotazione = await Prenotazione.create({
            utente: user,
            descrizione: descrizione,
            dateUtili: dateUtili,
            stato: "inAttesa",
            dataEffettiva: undefined
        });
        return prenotazione;
    };


    static async modificaPrenotazione(idPrenotazione, nuovoStato, dataEffettiva) {

        let prenotazione = await Prenotazione.findById(idPrenotazione);
        if (!prenotazione) throw new FailedDependencyException("Prenotazione not found");

        prenotazione.stato = nuovoStato;
        // Se la prenotazione è confermata, aggiorna la data effettiva
        if (nuovoStato === "confermata"){
            if (!dataEffettiva) {
                throw new Error("Data effettiva non fornita");
              }
        
              // Verifica se dataEffettiva è compresa in dateUtili
              const isValidDate = prenotazione.dateUtili.some(date => date.getTime() === new Date(dataEffettiva).getTime());
              if (!isValidDate) {
                throw new Error("Data effettiva non compresa nelle date utili");
              }
        
              prenotazione.dataEffettiva = dataEffettiva;
        }

        await prenotazione.save();

        return prenotazione;
    };

}

module.exports = PrenotazioniHandler;