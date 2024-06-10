const populate = require("../utils/populate").manualPopulate;

async function setup() {
  await populate().catch((err) => console.log(err));
}

module.exports = setup;