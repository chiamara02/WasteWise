const Tasse = require('../db/tasse').Tasse;
const TasseSchema = require("../db/tasse");
const User = require("../db/user").User;
const WrongPasswordException = require("../exceptions/WrongPasswordException");


class TaxHandler {
    static async getTasse(idUtente, stato = undefined) {
        //check if the user exist
        let user = await User.findById(idUtente);
        if (!user) throw new NotFoundException("User not found");

        let fieldsToSelect = "scadenza stato importo -_id"
        let query = { idUtente: idUtente };
        if (stato) {
            query.stato = stato;
        }

        try {
            return await Tasse.find(query).sort({scadenza: -1}).limit(20).select(fieldsToSelect);
        } catch (error) {
            throw new NotFoundException("Tax not found for given user and with given state");
        }
    }

    static async postTasse(utente, data, stato, importo) {
        let tasse = await Tasse.create({
            idUtente: utente,
            scadenza: data,
            stato: stato,
            importo: importo
        });
        return tasse;
    }
}

module.exports = TaxHandler;
