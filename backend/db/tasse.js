const mongoose = require("mongoose");

const User = require("./user").Schema
// Segnalazione schema
var pagamentoTasseSchema = new mongoose.Schema({
    idUtente:{
        type: Schema.Types.ObjectId,
        ref: 'User',                  
        required: true,
        unique: true,
    },
    scadenza:{
        type: Date,
        required : true,
    },
    statoPagamento:{
        type: Stato,
        required: true,
        enum : [
            "pagato",
            "nonPagato",
        ],
    },
    import:[{
        type: Number,
        required: true,
    }],
});

var pagamentoTasse = new mongoose.model("pagamentoTasse", pagamentoTasseSchema);

module.exports = {
    pagamentoTasse: pagamentoTasse,
}