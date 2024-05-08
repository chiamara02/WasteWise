const mongoose = require("mongoose");

var ZonaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require : true
    },
});

var Zona = new mongoose.model("Zona", ZonaSchema);

module.exports = {
    Zona: Zona,
}