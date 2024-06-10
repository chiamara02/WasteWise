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

describe("Tasse", () => {

    describe("GET /tasse", () => {

        it("should return 401 if user is not logged in", async () => {
            const res = await fetchAPI("/tasse", "GET", null);
            return expect(res.statusCode).toEqual(401);
        });


        it("should return 200 and the user data", async () => {
            const res = await request(app).get("/user");
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data).toHaveProperty("user");
          });

        it("should return 200 and an empty list if no tasse exist", async () => {
            let utenteCittadino = await User.findOne({
                email: userCittadino.email,
            }).exec();
            utenteCittadino = utenteCittadino._id;

            const token = generateToken(utenteCittadino, userCittadino.email);

            const res = await fetchAPI("/tasse", "GET", null, token);

            return expect(res.statusCode).toEqual(200) && expect(res.body).toEqual([]);
        });

    })
})