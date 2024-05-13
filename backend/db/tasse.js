const mongoose = require("mongoose");

const User = require("./user").Schema
// Segnalazione schema
var tasseSchema = new mongoose.Schema({
    idUtente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                  
        required: true,
    },
    scadenza:{
        type: Date,
        required : true,
    },
    statoPagamento:{
        type: String,
        required: true,
        enum : [
            "pagato",
            "nonPagato",
        ],
    },
    importo:[{
        type: Number,
        required: true,
    }],
});

var tasse = new mongoose.model("tasse", tasseSchema);

module.exports = {
    tasse: tasse,
}
