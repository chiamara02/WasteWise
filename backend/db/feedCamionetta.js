const mongoose = require('mongoose');

const feedCamionettaSchema = new mongoose.Schema({
  percorso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Percorso',
    required: true
  },
  operatore: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                  
        required: true,
  },
  data: {
    type: Date,
    default: Date.now,
    required: true
  },
  tappaAttuale: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tappa',
    required: true
  }
});

const FeedCamionetta = mongoose.model('FeedCamionetta', feedCamionettaSchema);
module.exports = {
    FeedCamionetta: FeedCamionetta,
}
