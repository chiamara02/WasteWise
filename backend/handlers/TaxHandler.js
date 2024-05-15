const Tasse = require('../db/tasse').Tasse;
const TasseSchema = require("../db/tasse");
const User = require("../db/user").User;
const WrongPasswordException = require("../exceptions/WrongPasswordException");


class TaxHandler {
    static async getAllTasse(idUtente){
        //check if the user exist
        console.log("taxHandler: getAllTasse");
        let user = await User.findById(idUtente);
        if (!user) throw new NotFoundException("User not found");
        
        try {
            //let taxes = await TasseSchema.find({idUtente : idUser });
            //return tax list
            let taxes = await Tasse.find({idUtente : idUtente});
            
            return taxes;
        } catch (error) {
            throw new NotFoundException("Tax not found for given user");
        }
    }

    static async getTasseByStatus(idUtente, stato){
        //check if the user exist
        console.log("taxHandler: getAllTasse" , {stato});
        console.log("taxHandler: getAllTasse" , {idUtente});
        let user = await User.findById(idUtente);
        if (!user) throw new NotFoundException("User not found");
        
        try {
            //let taxes = await TasseSchema.find({idUtente : idUser, statoPagamento : stato});
            let taxes = await Tasse.find({idUtente : idUtente, statoPagamento : stato});
            
            return taxes;
            //return tax list
            
        } catch (error) {
            throw new NotFoundException("Tax not found for given user and with given state");
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
