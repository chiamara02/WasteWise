const User = require("../db/user").User;
const users = require("./testDataDump/users.json");
const Zona = require("../db/zona").Zona;
const zone = require("./testDataDump/zone.json");
const Tasse = require("../db/tasse").Tasse;
const tasseData = require("./testDataDump/tasse.json");

const { db } = require("../db");

const options = { maxTimeMS: 30000 };

async function deleteAll() {
  await User.deleteMany({}, options); 
  await Zona.deleteMany({}, options); 
  await Tasse.deleteMany({}, options);
}

async function populateAll() {
  await Zona.create(zone);
  const createdUsers = [];
  for (const userData of users) {
    try {
      const user = await User.create(userData);
      createdUsers.push(user);
      console.log(`User created: ${user.nome}`);
    } catch (err) {
      console.error(`Error creating user: ${userData.nome}`, err);
    }
  }

  // Update tasseData with user IDs
  for (const tasse of tasseData) {
    const matchingUser = createdUsers.find(
      (user) => user.userType === "cittadino" // Filter by userType
    ); // Find matching Cittadino user
    if (matchingUser) {
      tasse.idUtente = matchingUser._id; // Assign user ID to tasse
    } else {
      console.warn(
        `No Cittadino user found for tasse: ${JSON.stringify(tasse)}`
      );
    }
    }
    await Tasse.create(tasseData);
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