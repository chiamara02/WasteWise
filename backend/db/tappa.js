const mongoose = require('mongoose');

const tappaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    }
});

const Tappa = mongoose.model('Tappa', tappaSchema);
module.exports = {
    Tappa: Tappa,
}
