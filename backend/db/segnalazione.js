const mongoose = require("mongoose");

const User = require("./user").Schema
const Zona = require("./zona").Schema

// Segnalazione schema
var SegnalazioneSchema = new mongoose.Schema({
    utente:{
        type: Schema.Types.ObjectId,
        ref: 'User',                  
        required: true,
        unique: true,
    },
    descrizione:{
        type: String,
        required : true,
    },
    zona:{
        type: Schema.Types.ObjectId,
        ref: 'Zona',
        required: true,
    },
    foto:[{
        data: Buffer,
        contentType: String,
    }],
});

var Segnalazione = new mongoose.model("Segnalazione", SegnalazioneSchema);

module.exports = {
    Segnalazione: Segnalazione,
}