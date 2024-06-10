const request = require("supertest");
const app = require("../app"); // Assuming your Express app is exported from app.js
const Zona = require("../db/zona").Zona;

describe("GET /zone", () => {

    it('should return 200 and an empty array if no zones exist', async () => {
        await Zona.deleteMany({}); 
    
        const res = await request(app).get('/zone');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });

t

    it('should return 200 and a list of strings representing zone names', async () => {
        await Zona.deleteMany({}); 

        const zones = [{ nome: 'Povo' }, { nome: 'Villazzano' }];
        await Zona.insertMany(zones);
    
        const res = await request(app).get('/zone');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(expect.arrayContaining([expect.any(String)]));
        res.body.forEach(item => {
            expect(typeof item).toBe('string');
        });
    });

});