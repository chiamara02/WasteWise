const mongoose = require("mongoose");

const User = require("./user").Schema

// Segnalazione schema
var SegnalazioneSchema = new mongoose.Schema({
    _idutente:{
        type: Schema.Types.ObjectId,
        ref: 'User',                  
        required: true,
        unique: true,
    },
    descrizione:{
        type: String,
        required : true,
    },
    indirizzo:{
        type: String,
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
