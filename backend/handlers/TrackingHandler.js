const { Percorso } = require('../db/percorso');
const { FeedCamionetta } = require('../db/feedCamionetta');
const NotFoundException = require("../exceptions/NotFoundException");
const FailedDependencyException = require("../exceptions/FailedDependencyException");
const { User } = require('../db/user');

class TrackingHandler {
    // // Funzione per recuperare un percorso
    // static async getPercorso(percorsoId) {
    //     try {
    //         const percorso = await Percorso.findById(percorsoId).populate("tappe").populate("zonaAssociata");
    //         if (!percorso) throw new NotFoundException('Percorso not found');
    //         console.log(percorso)
    //         return percorso;
    //     } catch (error) {
    //         console.error('Errore durante il recupero del percorso:', error);
    //         throw new FailedDependencyException('Recupero percorso fallito');
    //     }
    // };

    // Funzione per recuperare tutti i percorsi
    static async getPercorsi() {
        try {
            const percorso = await Percorso.find().select("zonaAssociata").populate("zonaAssociata");
            if (!percorso) throw new NotFoundException('Percorso not found');
            return percorso;
        } catch (error) {
            console.error('Errore durante il recupero del percorso:', error);
            throw new FailedDependencyException('Recupero percorso fallito');
        }
    };

    // Funzione per aggiornare la tappa attuale della camionetta
    static async updateTappaAttuale(zonaId, nextStop, operatoreId) {
        try {
            let percorsoId = (await Percorso.findOne({zonaAssociata: zonaId}).select("_id"))._id
            let res = await FeedCamionetta.create({
                percorso: percorsoId,
                operatore: operatoreId,
                tappaAttuale: nextStop
            })
            return res;
        } catch (error) {
            console.error('Errore durante l\'aggiornamento della posizione:', error);
            throw new FailedDependencyException('Aggiornamento tappa fallito');
        }
    };

    // Funzione per ottenere il feed attuale
    static async getFeedAttuale(zonaId) {
        try {
            let response = {
                isInProgress: false,
                stops: null,
                lastStop: null,
                lastStopAt: null,
                nextStop:null,
                operator: null
            }

            // Calculate the start of the day in UTC
            const startOfDayUTC = new Date(Date.UTC(
                new Date().getUTCFullYear(),
                new Date().getUTCMonth(),
                new Date().getUTCDate(),
                0, 0, 0, 0
            ));

            // Calculate the end of the day in UTC
            const endOfDayUTC = new Date(Date.UTC(
                new Date().getUTCFullYear(),
                new Date().getUTCMonth(),
                new Date().getUTCDate(),
                23, 59, 59, 999
            ));

            let percorso = await Percorso.findOne({zonaAssociata: zonaId}).populate("tappe", "nome")
            response.stops = percorso.tappe
            
            let query = {
                percorso: percorso._id,
                data: {
                    $gte: startOfDayUTC,
                    $lt: endOfDayUTC
                }
            }

            const feed = await FeedCamionetta.findOne(query)
                .sort({ data: -1 })
                .populate('tappaAttuale', 'nome')
                .populate('operatore', 'nome');

            if (!feed) {
                response.nextStop = percorso.tappe[0]
            } else if (feed.tappaAttuale._id.toString() !== percorso.tappe[percorso.tappe.length - 1]._id.toString()) {
                response.isInProgress = true;
                response.lastStop = feed.tappaAttuale;
                response.lastStopAt = new Date(feed.data).toLocaleTimeString("it-IT");
                let nextStopIndex = percorso.tappe.findIndex(element => element._id.equals(feed.tappaAttuale._id.toString())) + 1
                response.nextStop = (nextStopIndex <= percorso.tappe.length) ? percorso.tappe[nextStopIndex] : null;
                response.operator = feed.operatore;
            } else {
                response.lastStop = feed.tappaAttuale;
                response.operator = feed.operatore;
            }
            // console.log(response)
            return response;
        } catch (error) {
            console.error('Errore durante il recupero del feed attuale:', error);
            throw new FailedDependencyException('Recupero feed fallito');
        }
    };
}

module.exports = TrackingHandler;
