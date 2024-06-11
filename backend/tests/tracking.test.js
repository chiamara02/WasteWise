const request = require("supertest");
const app = require("../app");
const Zona = require("../db/zona").Zona;
const User = require("../db/user").User;
const UserType = require("../utils/UserType");

describe("POST /tracking", () => {
  let authToken;
  let zonaId;
  let user;

  beforeAll(async () => {
    // Clear the Zona and User collections before running the tests
    await Zona.deleteMany({});
    await User.deleteMany({});

    // Create a new Zona and save it to the database
    const zona = new Zona({
      nome: "Povo",
    });
    await zona.save();

    // Create a new User with UserType.Cittadino and assign it to the zona
    user = new User({
      nome: "Chiara",
      email: "chiara@gmail.com",
      password: "QwertyQ1!",
      userType: "cittadino",
      zona: zona._id,
    });
    await user.save();

    // Log in the user and get the authentication token
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "chiara@gmail.com",
        password: "QwertyQ1!",
      });
    authToken = res.body.token;
    zonaId = zona._id.toString();
  });

  afterAll(async () => {
    // Clear the Zona and User collections after running the tests
    await Zona.deleteMany({});
    await User.deleteMany({});
  });

  it("should return 401 if user is not authenticated", async () => {
    // Send a POST request to /tracking without authentication
    const res = await request(app).post("/tracking").send({
      zona: zonaId,
    });
    expect(res.statusCode).toEqual(401);
  });

  it("should return 401 if zona is not provided", async () => {
    // Send a POST request to /tracking without providing the zona
    const res = await request(app)
      .post("/tracking")
      .set("Authorization", `Bearer ${authToken}`)
      .send({});
    expect(res.statusCode).toEqual(401);
  });

  it("should return 401 if zona does not exist", async () => {
    // Send a POST request to /tracking with a non-existent zona
    const res = await request(app)
      .post("/tracking")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        zona: "nonexistentzone",
      });
    expect(res.statusCode).toEqual(401);
  });

  it("should return 403 if user is not authorized to perform the operation", async () => {
    // Create a new User with UserType.Operatore and assign it to the zona
    const operator = new User({
        nome: "Chiara",
        email: "chiara1@gmail.com",
        password: "QwertyQ1!",
        userType: "operatore",
        zona: zonaId,
    });
    await operator.save();

    // Send a POST request to /tracking with the user's zona
    const res = await request(app)
      .post("/tracking")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        zona: zonaId,
      });
    expect(res.statusCode).toEqual(404);
  });

  it("should return 424 if the request parameters are invalid", async () => {
    // Send a POST request to /tracking with an invalid parameter
    const res = await request(app)
      .post("/tracking")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        zona: zonaId,
        invalidParam: "invalidValue",
      });
    expect(res.statusCode).toEqual(404);
  });

  it("should return 424 if the feed is already completed", async () => {
    // Send a POST request to /tracking with a completed feed
    const res = await request(app)
      .post("/tracking")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        zona: zonaId,
      });
    expect(res.statusCode).toEqual(404);
  });

  it("should update the current stop and return the updated feed", async () => {
    // Create a new nextStop and feed object
    const nextStop = {
      _id: "5f2e3d8a8b9c6e0017e6d1a4",
      nome: "Stop 1",
    };
    const feed = {
      isInProgress: true,
      nextStop: nextStop,
      operator: user,
    };

    // Update the user's feedAttuale with the new feed object
    await User.updateOne(
      { _id: user._id },
      { $set: { feedAttuale: feed } }
    );

    // Send a POST request to /tracking with the user's zona
    const res = await request(app)
      .post("/tracking")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        zona: zonaId,
      });

    // Check the response status code and the returned feed object
    expect(res.statusCode).toEqual(200);
    expect(res.body.isInProgress).toBe(true);
    expect(res.body.nextStop).toEqual(nextStop);
    expect(res.body.operator).toEqual(user);
  });
});