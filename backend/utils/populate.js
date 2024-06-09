const User = require("../db/user").User;
const users = require("./testDataDump/users.json");
const Zona = require("../db/zona").Zona;
const zone = require("./testDataDump/zone.json");
const Tasse = require("../db/tasse").Tasse;
const tasseData = require("./testDataDump/tasse.json");
const Sondaggio = require("../db/sondaggio").Sondaggio;
const sondaggi = require("./testDataDump/sondaggi.json");
const Questionario = require("../db/sondaggio").Questionario;
const questionari = require("./testDataDump/questionari.json");

const { db } = require("../db");

const options = { maxTimeMS: 30000 };

async function deleteAll() {
  await User.deleteMany({}, options); 
  await Zona.deleteMany({}, options); 
  await Tasse.deleteMany({}, options);
  await Sondaggio.deleteMany({}, options);
  await Questionario.deleteMany({}, options);
}

async function populateAll() {
  await Zona.create(zone);
  await User.create(users);
  await Tasse.create(tasseData);
  await Sondaggio.create(sondaggi);
  await Questionario.create(questionari);
}

async function manualPopulate() {
  await deleteAll()
    .then(() => console.log("Database erased"))
    .catch((err) => console.log("Delete err: ", err));
  await populateAll()
    .then(() => console.log("Database populated"))
    .catch((err) => console.log("Insert err: ", err));
}

if (require.main === module) {
  manualPopulate();
}

exports.manualPopulate = manualPopulate;
exports.deleteAll = deleteAll;
exports.populateAll = populateAll;