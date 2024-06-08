const TrackingHandler = require("../handlers/TrackingHandler");
const LoggedUser = require("./LoggedUser");

class Operatore extends LoggedUser {
    constructor() {
        super();
    }
    static async getPercorsi() {
        return await TrackingHandler.getPercorsi(percorsoId);
    }

    static async updateTappaAttuale(zonaId, nextStop, operatoreId) {
        return await TrackingHandler.updateTappaAttuale(zonaId, nextStop, operatoreId);
    }

    static async getFeedAttuale(zonaId) {
        return await TrackingHandler.getFeedAttuale(zonaId);
    }

    
}


module.exports = Operatore;