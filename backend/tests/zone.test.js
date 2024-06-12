const request = require("supertest");
const Zona = require("../db/zona").Zona;
const fetchAPI = require("./utils").fetchAPI;

describe("GET /zone", () => {

    it('should return 200 and an empty array if no zones exist', async () => {
        await Zona.deleteMany({});

        const res = await fetchAPI("/zone", "GET", null)
        return expect(res.statusCode).toEqual(200) && expect(res.body).toEqual([]);
    });



    it('should return 200 if zona is valid', async () => {
        await Zona.deleteMany({});

        const zones = [{
            "_id": "5f2e3d8a8b9c6e0017e6d1a9",
            "nome": "Povo"
        }, {
            "_id": "5f2e3d8a8b9c6e0017e6d1a8",
            "nome": "Cognola"
        },];
        await Zona.insertMany(zones);

        const res = await fetchAPI("/zone", "GET", null)
        return expect(res.statusCode).toEqual(200);

    });
})