const makeString = require("./utils").makeString;
const makeEmail = require("./utils").makeEmail;
const makePassword = require("./utils").makePassword;
const fetchAPI = require("./utils").fetchAPI;

const generateToken = require("../handlers/UserHandler").generateToken;
const User = require("../db/user").User;

const users = require("../utils/testDataDump/users.json");

const userCittadino = users.find(
    (u) =>
        u.userType === "cittadino" && u.email === "asd@asd.asd"
);
const userEnte = users.find(
    (u) =>
        u.userType === "ente" && u.email === "asd1@asd.asd"
);
const userOperatore = users.find(
    (u) =>
        u.userType === "operatore" && u.email === "asd12@asd.asd"
);

describe("Prenotazioni", () => {

    describe("GET /getPrenotazioni", () => {

        it("should return 401 if user is not logged in", async () => {
            const res = await fetchAPI("/getPrenotazioni", "GET", null);
            return expect(res.statusCode).toEqual(401);
        });

        it("should return 200 if user is a Cittadino", async () => {
            let utenteCittadino = await User.findOne({
                email: userCittadino.email,
            }).exec();
            utenteCittadino = utenteCittadino._id;

            const token = generateToken(utenteCittadino, userCittadino.email);
            const res = await fetchAPI("/getPrenotazioni", "GET", null, token);
            return expect(res.statusCode).toEqual(200);
        });
    });

    describe("GET /getAllPrenotazioni", () => {

        it("should return 401 if user is not logged in", async () => {
            const res = await fetchAPI("/getAllPrenotazioni", "GET", null);
            return expect(res.statusCode).toEqual(401);
        });

        it("should return 200 if user is an Ente", async () => {
            let utenteEnte = await User.findOne({
                email: userEnte.email,
            }).exec();
            utenteEnte = utenteEnte._id;

            const token = generateToken(utenteEnte, userEnte.email);
            const res = await fetchAPI("/getAllPrenotazioni", "GET", null, token);
            return expect(res.statusCode).toEqual(200);
        });
    });

    describe("POST /", () => {

        it("should return 401 if user is not logged in", async () => {
            const res = await fetchAPI("/", "POST", null);
            return expect(res.statusCode).toEqual(401);
        });

        it("should return 424 if required fields are missing", async () => {
            let utenteCittadino = await User.findOne({
                email: userCittadino.email,
            }).exec();
            utenteCittadino = utenteCittadino._id;

            const token = generateToken(utenteCittadino, userCittadino.email);
            const res = await fetchAPI("/", "POST", { descrizione: "Test" }, token);
            return expect(res.statusCode).toEqual(424);
        });

        it("should return 201 if prenotazione is created successfully", async () => {
            let utenteCittadino = await User.findOne({
                email: userCittadino.email,
            }).exec();
            utenteCittadino = utenteCittadino._id;

            const token = generateToken(utenteCittadino, userCittadino.email);
            const res = await fetchAPI("/", "POST", { descrizione: "Test", dateUtili: ["2024-12-31"] }, token);
            return expect(res.statusCode).toEqual(201);
        });
    });

    describe("PUT /:idPrenotazione", () => {

        it("should return 401 if user is not logged in", async () => {
            const res = await fetchAPI("/12345", "PUT", null);
            return expect(res.statusCode).toEqual(401);
        });

        it("should return 424 if required fields are missing", async () => {
            let utenteEnte = await User.findOne({
                email: userEnte.email,
            }).exec();
            utenteEnte = utenteEnte._id;

            const token = generateToken(utenteEnte, userEnte.email);
            const res = await fetchAPI("/12345", "PUT", { nuovoStato: "confermata" }, token);
            return expect(res.statusCode).toEqual(424);
        });

        it("should return 200 if prenotazione is updated successfully", async () => {
            let utenteEnte = await User.findOne({
                email: userEnte.email,
            }).exec();
            utenteEnte = utenteEnte._id;

            const token = generateToken(utenteEnte, userEnte.email);
            const res = await fetchAPI("/12345", "PUT", { nuovoStato: "confermata", dataEffettiva: "2024-12-31" }, token);
            return expect(res.statusCode).toEqual(200);
        });
    });
});
