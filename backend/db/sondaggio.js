const mongoose = require('mongoose');

// Schema per Sondaggio
const SondaggioSchema = new mongoose.Schema({
    titolo: {
        type: String,
        required: true
    },
    domande: {
        type: [String],
        required: true
    }
});

var Sondaggio = mongoose.model('Sondaggio', SondaggioSchema);

// Schema per Questionario
const QuestionarioSchema = new mongoose.Schema({
    sondaggio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sondaggio',
        required: true
    },
    utente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    risposte: {
        type: [String],
        required: true
    }
});

var Questionario = mongoose.model('Questionario', QuestionarioSchema);

module.exports = {
    Sondaggio,
    Questionario
};
