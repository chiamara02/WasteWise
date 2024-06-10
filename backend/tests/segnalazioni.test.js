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

describe("Segnalazioni", () => {
    describe("POST /segnalazioni", () => {
        it("should return 401 if user is not logged in", async () => {
            const res = await fetchAPI("/segnalazioni", "POST", {
                descrizione: makeString(10),
                indirizzo: makeString(10),
                foto: makeString(10),
            });
            return expect(res.statusCode).toEqual(401);
        });

        it("should return 401 if user is not a Cittadino", async () => {
            let utente = await User.findOne({
                email: userEnte.email,
            }).exec();
            utente = utente._id;

            const token = generateToken(utente, userEnte.email);
            const res = await fetchAPI(
                "/segnalazioni",
                "POST",
                {
                    descrizione: makeString(10),
                    indirizzo: makeString(10),
                    foto: makeString(10),
                },
                token
            );
            return expect(res.statusCode).toEqual(401);
        });

        it("should return 200 and a list of segnalazioni if they exist", async () => {
            // Create a new segnalazione
            let utenteCittadino = await User.findOne({
                email: userCittadino.email,
            }).exec();
            utenteCittadino = utenteCittadino._id;

            const token = generateToken(utenteCittadino, userCittadino.email);

            const newSegnalazione = {
                descrizione: makeString(10),
                indirizzo: makeString(10),
                foto: makeString(10),
            };

            await fetchAPI("/segnalazioni", "POST", newSegnalazione, token);

            // Get the list of segnalazioni
            const res = await fetchAPI("/segnalazioni", "GET", null, token);

            // Check if the list includes the new segnalazione
            expect(res.statusCode).toEqual(200);
            expect(res.body).toContainEqual(expect.objectContaining(newSegnalazione));
        });
    })

    describe("GET /segnalazioni", () => {
        it("should return 200 and an empty list if no segnalazioni exist", async () => {
            let utenteCittadino = await User.findOne({
                email: userCittadino.email,
            }).exec();
            utenteCittadino = utenteCittadino._id;

            const token = generateToken(utenteCittadino, userCittadino.email);

            const res = await fetchAPI("/segnalazioni", "GET", null, token);

            return expect(res.statusCode).toEqual(200) && expect(res.body).toEqual([]);
        });

    })
})