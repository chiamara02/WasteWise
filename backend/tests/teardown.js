const populate = require("../utils/populate").manualPopulate;

async function teardown() {
  await populate().catch((err) => console.log(err));
}

module.exports = teardown;