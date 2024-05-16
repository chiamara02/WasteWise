const mongoose = require("mongoose");

const User = require("./user").Schema
// Tasse schema
var TasseSchema = new mongoose.Schema({
    idUtente:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                  
        required: true,
    },
    scadenza:{
        type: Date,
        required : true,
    },
    stato:{
        type: String,
        required: true,
        enum : [
            "pagato",
            "nonPagato",
        ],
    },
    importo: {
        type: Number,
        required: true,
    },
});

var tasse = new mongoose.model("Tasse", TasseSchema);

module.exports = {
    Tasse: tasse,
}
