const request = require("supertest");
const app = require("../app");
const Zona = require("../db/zona").Zona;
const User = require("../db/user").User;
const UserType = require("../utils/UserType");
const fetchAPI = require("./utils").fetchAPI;
const generateToken = require("../handlers/UserHandler").generateToken;
const users = require("../utils/testDataDump/users.json");
const zone = require("../utils/testDataDump/zone.json");

let userCittadino = users.find(
  (u) =>
    u.userType === "cittadino" && u.email === "asd@asd.asd"
);

let tokenCittadino = User.findOne({ email: userCittadino.email }).exec().then((data) => {
  return generateToken(data._id, userCittadino.email);
})

let userOperatore = users.find(
  (u) =>
    u.userType === "operatore" && u.email === "asd12@asd.asd"
);
let tokenOperatore = User.findOne({ email: userOperatore.email }).exec().then((data) => {
  return generateToken(data._id, userOperatore.email);
})

let zonaId = zone.find((z) => z.nome === "Povo")._id


describe("Tracking", () => {
  describe("POST /tracking", () => {
    it("should return 401 if user is not authenticated", async () => {
      // Send a POST request to /tracking without authentication
      const res = await fetchAPI("/tracking", "POST", {
        zona: zonaId,
      });
      return expect(res.statusCode).toEqual(401);
    });

    it("should return 401 if user is not authorized to perform the operation", async () => {
      const res = await fetchAPI('/tracking', 'POST', { zona: zonaId }, await tokenCittadino)
      expect(res.statusCode).toEqual(401);
    });

    it("should return 424 if zona is not provided", async () => {
      // Send a POST request to /tracking without providing the zona
      const res = await fetchAPI('/tracking', 'POST', {}, await tokenOperatore)
      expect(res.statusCode).toEqual(424);
    });

    it("should return 424 if zona does not exist", async () => {
      // Send a POST request to /tracking with a non-existent zona
      const res = await fetchAPI('/tracking', 'POST', { zona: "Molise" }, await tokenOperatore)
      expect(res.statusCode).toEqual(424);
    });

    it("should return 424 if the request parameters are invalid", async () => {
      const res = await fetchAPI('/tracking', 'POST', { zono: zonaId }, await tokenOperatore)
      expect(res.statusCode).toEqual(424);
    });

    it("should update the current stop and return the updated feed", async () => {
      const res = await fetchAPI('/tracking', 'POST', { zona: zonaId }, await tokenOperatore)
      expect(res.statusCode).toEqual(200);
    });
  });
})