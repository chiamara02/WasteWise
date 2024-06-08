const UnauthorizedException = require("../exceptions/UnauthorizedException");

class AbstractUser {
    constructor() {
        if (this.constructor === AbstractUser) {
            throw new TypeError(
                "Cannot be instantiated because it is an abstract class"
            );
        }
    }

    static nuovaSegnalazione(utente, descrizione, indirizzo, foto) {
        throw new UnauthorizedException(
            "Unauthorized - Accedi con un account autorizzato e riprova"
        );
    }

    static mostraSegnalazioni() {
        throw new UnauthorizedException(
            "Unauthorized - Accedi con un account autorizzato e riprova"
        );
    }

    static getTasse(idUser, stato = undefined) {
        throw new UnauthorizedException(
            "Unauthorized - Accedi con un account autorizzato e riprova"
        );
    }

    static getFeedAttuale(zonaId) {
        throw new UnauthorizedException(
            "Unauthorized - Accedi con un account autorizzato e riprova"
        );
    }

    static mostraSegnalazioni() {
        throw new UnauthorizedException(
            "Unauthorized - Accedi con un account autorizzato e riprova"
        );
    }

    static getPercorsi() {
        throw new UnauthorizedException(
            "Unauthorized - Accedi con un account autorizzato e riprova"
        );
    }
    static updateTappaAttuale(zonaId, nextStop, operatoreId) {
        throw new UnauthorizedException(
            "Unauthorized - Accedi con un account autorizzato e riprova"
        );
    }
    static getFeedAttuale(zonaId) {
        throw new UnauthorizedException(
            "Unauthorized - Accedi con un account autorizzato e riprova"
        );
    }

}

module.exports = AbstractUser;