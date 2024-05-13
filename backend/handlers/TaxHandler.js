const Tasse = require('../db/tasse').tasse;
const TasseSchema = require("../db/tasse");
const User = require("../db/user").User;
const NotFoundException = require("../exceptions/NotFoundException");
const FailedDependencyException = require("../exceptions/FailedDependencyException");
const WrongPasswordException = require("../exceptions/WrongPasswordException");


class TaxHandler {
    static async getAllTasse(idUtente){
        //check if the user exist
        let user = await User.findById(idUtente);
        if (!user) throw new NotFoundException("User not found");
        
        try {
            //let taxes = await TasseSchema.find({idUtente : idUser });
            //return tax list
            let taxes = await Tasse.find();
            let data = [];
            for (let i = 0; i < taxes.length; i++){
                if (taxes[i].idUtente == idUtente){
                    data.push(taxes[i]);
                }
            }
            return data;
        } catch (error) {
            throw new NotFoundException("Tax not found for given user");
        }
    }

    static async getTasseByStatus(idUtente, stato){
        //check if the user exist
        let user = await User.findById(idUtente);
        if (!user) throw new NotFoundException("User not found");
        
        try {
            //let taxes = await TasseSchema.find({idUtente : idUser, statoPagamento : stato});
            let taxes = await Tasse.find();
            let data = [];
            for (let i = 0; i < taxes.length; i++){
                if (taxes[i].idUtente == idUtente && taxes[i].statoPagamento == stato){
                    data.push(taxes[i]);
                }
            }
            return data;
            //return tax list
            return taxes;
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
