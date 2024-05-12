const Tasse = require('../db/tasse').tasse;
const User = require("../db/user").User;
const NotFoundException = require("../exceptions/NotFoundException");
const FailedDependencyException = require("../exceptions/FailedDependencyException");
const WrongPasswordException = require("../exceptions/WrongPasswordException");
const user = require('../db/user');

class TaxHandler {
    static async getStoricoTasse(idUser){
        //check if the user exist
        let user = await User.findById(idUser);
        if (!user) throw new NotFoundException("User not found");
        
        try {
            let taxes = await Tasse.find({idUtente : idUser}).exec();
            //return tax list
            return taxes;
        } catch (error) {
            throw new NotFoundException("Tax not found for given user");
        }
    }

    static async getTasseByStatus(idUser, stato){
        //check if the user exist
        let user = await User.findById(idUser);
        if (!user) throw new NotFoundException("User not found");
        
        try {
            let taxes = await Tasse.find({idUtente : idUser, statoPagamento : stato}).exec();
            //return tax list
            return taxes;
        } catch (error) {
            throw new NotFoundException("Tax not found for given user");
        }
    }

    static async postTasse(utente, data, stato, importo){
        let tasse = await Tasse.create({
            idUtente : utente,
            scadenza : data,
            statoPagamento : stato,
            importo : importo
        });
        return tasse;
    }
}

module.exports = TaxHandler;