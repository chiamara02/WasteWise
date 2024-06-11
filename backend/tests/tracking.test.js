const request = require('supertest');
const app = require('../app');

describe('Update functionality', () => {
  it('should return 401 when making a POST request to /api/tracking without logging in', async () => {
    const response = await request(app).post('/api/tracking');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Utente non autorizzato');
  });

  it('should return 401 when making a POST request to /api/tracking with a logged in citizen account', async () => {
    const agent = request.agent(app);
    await agent.post('/api/login').send({ username: 'asd@asd.asd', password: 'QwertyQ1!' });
    const response = await agent.post('/api/tracking');
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Utente non autorizzato');
  });
});

describe('Feed functionality', () => {
  it('should return the feed successfully when making a GET request to /api/tracking with a logged in citizen account', async () => {
    const agent = request.agent(app);
    await agent.post('/api/login').send({ username: 'asd@asd.asd', password: 'QwertyQ1!' });
    const response = await agent.get('/api/tracking');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('OK');
    expect(response.body.data).toBeDefined();
  });
});

describe('Percorsi functionality', () => {
  it('should return the percorsi successfully when making a GET request to /api/tracking/percorsi with a logged in operator account', async () => {
    const agent = request.agent(app);
    await agent.post('/api/login').send({ username: 'asd1@asd.asd', password: 'QwertyQ1!' });
    const response = await agent.get('/api/tracking/percorsi');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('OK');
    expect(response.body.data).toBeDefined();
  });
});