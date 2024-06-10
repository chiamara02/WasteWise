const makeString = require("./utils").makeString;
const makeEmail = require("./utils").makeEmail;
const makePassword = require("./utils").makePassword;
const fetchAPI = require("./utils").fetchAPI;

const users = require("../utils/testDataDump/users.json");

const userCittadino = users.find(
    (u) =>
        u.userType === "cittadino" && u.email === "asd@asd.asd"
);
const userEnte = users.find(
    (u) =>
        u.userType === "ente" && u.email === "asd1@asd.asd"
);

describe("Auth", () => {
    describe("POST /signup", () => {
        it("should return 401 if email is not valid", async () => {
            const res = await fetchAPI("/auth/signup", "POST", {
                email: makeString(10),
                password: userCittadino.password,
                nome: makeString(5),
                zona: "Povo"
            });
            return expect(res.statusCode).toEqual(401);
        });
        it("should return 401 if password is not valid", async () => {
            const res = await fetchAPI("/auth/signup", "POST", {
                email: makeEmail(),
                password: makeString(10),
                nome: makeString(5),
                zona: "Povo"
            });
            return expect(res.statusCode).toEqual(401);
        });
        it("should return 401 if email is already in use", async () => {
            const res = await fetchAPI("/auth/signup", "POST", {
                email: userCittadino.email,
                password: makePassword(),
                nome: makeString(5),
                zona: "Povo"
            });
            return expect(res.statusCode).toEqual(401);
        });
        it("should return 200 if email and password are valid", async () => {
            const res = await fetchAPI("/auth/signup", "POST", {
                email: makeEmail(),
                password: userCittadino.password,
                nome: makeString(5),
                zona: "Povo"
            });
            return expect(res.statusCode).toEqual(200);
        });
    });

    describe("POST /login", () => {
        it("should return 401 if email is not valid", async () => {
            const res = await fetchAPI("/auth/login", "POST", {
                email: makeString(10),
                password: userCittadino.password,
            });
            return expect(res.statusCode).toEqual(401);
        });
        it("should return 401 if password is not valid", async () => {
            const res = await fetchAPI("/auth/login", "POST", {
                email: userCittadino.email,
                password: makeString(10),
            });
            return expect(res.statusCode).toEqual(401);
        });
        it("should return 404 if email is not in use", async () => {
            const res = await fetchAPI("/auth/login", "POST", {
                email: makeEmail(),
                password: userCittadino.password,
            });
            return expect(res.statusCode).toEqual(404);
        });
        it("should return 200 if email and password are valid", async () => {
            const res = await fetchAPI("/auth/login", "POST", {
                email: userCittadino.email,
                password: userCittadino.password,
            });
            return expect(res.statusCode).toEqual(200);
        });
    });
});