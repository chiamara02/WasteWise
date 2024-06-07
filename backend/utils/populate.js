const User = require("../db/user").User;
const users = require("./testDataDump/users.json");
const Zona = require("../db/zona").Zona;
const zone = require("./testDataDump/zone.json");
const Tasse = require("../db/tasse").Tasse;
const tasseData = require("./testDataDump/tasse.json");
const Tappa  = require("../db/tappa").Tappa;
const tappe = require("./testDataDump/tappe.json");
const Percorso = require("../db/percorso").Percorso;
const percorsi = require("./testDataDump/percorsi.json");


const { db } = require("../db");

const options = { maxTimeMS: 30000 };

async function deleteAll() {
  await User.deleteMany({}, options); 
  await Zona.deleteMany({}, options); 
  await Tasse.deleteMany({}, options);
  await Tappa.deleteMany({}, options);
  await Percorso.deleteMany({}, options);
}

async function populateAll() {
  await Zona.create(zone);
  await User.create(users);
  await Tasse.create(tasseData);
  await Tappa.create(tappe);
  await Percorso.create(percorsi);
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