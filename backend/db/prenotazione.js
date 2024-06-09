const mongoose = require("mongoose");

const User = require("./user").Schema
const Zona = require("./zona").Schema

var PrenotazioneSchema = new mongoose.Schema({
    utente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                  
        required: true, 
    },
    descrizione:{
        type: String,
        required: true,

    },
    dateUtili:[{
        type: Date,
        required: true, 
    }],
    stato:{
        type: String,
        required: true,
        enum : [
            "confermata",
            "inAttesa",
            "rifiutata",
            "completata"
        ],
    },
    dataEffettiva:{
        type: Date,
    },
})

var Prenotazione = new mongoose.model("Prenotazione", PrenotazioneSchema);

module.exports = {
    Prenotazione: Prenotazione,
}