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

describe("GET /sondaggi/sondaggio", () => {
    it("should return 401 if user is not logged in", async () => {
        const res = await fetchAPI("/sondaggi/sondaggio", "GET", null);
        return expect(res.statusCode).toEqual(401);
    });

    it("should return 201 if sondaggi are seen by Cittadino", async () => {
        let utenteCittadino = await User.findOne({
            email: userCittadino.email,
        }).exec();
        utenteCittadino = utenteCittadino._id;

        const token = await generateToken(utenteCittadino, userCittadino.email);

        const res = await fetchAPI("/sondaggi/sondaggio", "GET", {}, token);

        return expect(res.statusCode).toEqual(201);
    });

    it("should return 401 if sondaggi are seen by Ente", async () => {
        let utenteEnte = await User.findOne({
            email: userEnte.email,
        }).exec();
        utenteEnte = utenteEnte._id;

        const token = await generateToken(utenteEnte, userEnte.email);

        const res = await fetchAPI("/sondaggi/sondaggio", "GET", {}, token);
        console.log(res)
        return expect(res.statusCode).toEqual(401);
    });

})

describe("POST /sondaggi/sondaggio", () => {
    it("should return 200 if sondaggi are seen by Ente", async () => {
        let utenteEnte = await User.findOne({
            email: userEnte.email,
        }).exec();
        utenteEnte = utenteEnte._id;

        const token = await generateToken(utenteEnte, userEnte.email);
        const res = await fetchAPI(
            "/sondaggi/sondaggio",
            "POST",
            {
                titolo: makeString(10),
                domande: makeString(10)
            },
            token
        );
    

        return expect(res.statusCode).toEqual(200);
    });


})

describe("GET /sondaggi/sondaggio", () => {

    it("should return 201 if sondaggi are seen by Cittadino", async () => {
        let utenteCittadino = await User.findOne({
            email: userCittadino.email,
        }).exec();
        utenteCittadino = utenteCittadino._id;

        const token = await generateToken(utenteCittadino, userCittadino.email);

        const sondaggioId = '5f8b1b3b9b7e4b0017f3b3b1';

        // Call the API using the fetchAPI utility function
        const res = await fetchAPI(`/sondaggi/sondaggio?id=${sondaggioId}`, "GET", {}, token);

        // Assert that the response status is 201
        return expect(res.statusCode).toEqual(201);
    });
})
