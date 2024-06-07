const mongoose = require('mongoose');

const percorsoSchema = new mongoose.Schema({
    zonaAssociata: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Zona',
        required: true
    },
    tappe: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tappa',
        required: true
    }]
});

const Percorso = mongoose.model('Percorso', percorsoSchema);
module.exports = {
    Percorso: Percorso,
}
