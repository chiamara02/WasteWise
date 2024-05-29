const mongoose = require("mongoose");

// Schema del sondaggio
const sondaggioSchema = new mongoose.Schema({
  domande: [{ type: mongoose.Schema.Types.ObjectId, ref: "Domanda" }],
});

// Schema della domanda
const domandaSchema = new mongoose.Schema({
  idDomanda: Number,
  testo: String,
});

// Schema del questionario
const questionarioSchema = new mongoose.Schema({
  utente: { type: mongoose.Schema.Types.ObjectId, ref: "Utente" },
  sondaggio: { type: mongoose.Schema.Types.ObjectId, ref: "Sondaggio" },
  data: Date,
});

// Schema della risposta
const rispostaSchema = new mongoose.Schema({
  questionario: { type: mongoose.Schema.Types.ObjectId, ref: "Questionario" },
  domanda: { type: mongoose.Schema.Types.ObjectId, ref: "Domanda" },
  risposta: String,
});

// Modelli
const Sondaggio = mongoose.model("Sondaggio", sondaggioSchema);
const Domanda = mongoose.model("Domanda", domandaSchema);
const Questionario = mongoose.model("Questionario", questionarioSchema);
const Risposta = mongoose.model("Risposta", rispostaSchema);
