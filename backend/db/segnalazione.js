const mongoose = require("mongoose");

const User = require("./user").Schema
const Zona = require("./zona").Schema

// Segnalazione schema
var SegnalazioneSchema = new mongoose.Schema({
    utente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                  
        required: true, 
    },
    descrizione:{
        type: String,
        required : true,
    },
    zona:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zona',
        required: true,
    },
    foto:{
        //data: Buffer,
        Type: String,
    },
});

var Segnalazione = new mongoose.model("Segnalazione", SegnalazioneSchema);

module.exports = {
    Segnalazione: Segnalazione,
}