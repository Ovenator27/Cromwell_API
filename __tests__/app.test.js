const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("/api/users/register", () => {
  describe("POST requests", () => {
    test("POST 200: creates a new user and responds with created user", () => {
      return request(app)
        .post("/api/users/register")
        .send({
          username: "test4",
          email: "test4@gmail.com",
          password: "Password4",
        })
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toMatchObject({
            user_id: 4,
            username: "test4",
            email: "test4@gmail.com",
            password: "Password4",
          });
        });
    });
    test('POST 400: responds with error when credentials are missing', () => {
      return request(app)
      .post("/api/users/register")
      .send({
        password: "Password1"
      })
      .expect(400)
      .then(({body: {msg}}) => {
        expect(msg).toBe("Bad Request");
      })
    });
    test('POST 409; responds with error code for email already registered', () => {
      return request(app)
        .post("/api/users/register")
        .send({
          username: "test5",
          email: "test1@gmail.com",
          password: "Password"
        })
        .expect(409)
        .then(({body: {msg}}) => {
          expect(msg).toBe("User Already Exists");
        })
    });
  });
});

describe("/api/users/login", () => {
  describe("POST requests", () => {
    test("POST 200: responds when email and password matches user in database", () => {
      return request(app)
        .post("/api/users/login")
        .send({
          email: "test1@gmail.com",
          password: "Password1",
        })
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toMatchObject({
            username: "test1",
            email: "test1@gmail.com",
            password: "Password1",
          });
        });
    });
    test('POST 401: responds with error code and message when credentials are invalid', () => {
      return request(app)
      .post("/api/users/login")
      .send({
        email: "test1@gmail.com",
        password: "Password2"
      })
      .expect(401)
      .then(({body: {msg}}) => {
        expect(msg).toBe("Unauthorised");
      })
    });
    
  });
});

describe("/api/users/:user_id", () => {
  describe("GET requests", () => {
    test("GET 200: responds with a single user", () => {
      return request(app)
        .get("/api/users/1")
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user).toMatchObject({
            user_id: 1,
            username: "test1",
            email: "test1@gmail.com",
            password: "Password1",
          });
        });
    });
    test("GET 404: responds with appropriate error message when passed valid but non existent id", () => {
      return request(app)
        .get("/api/users/9999")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("User Not Found");
        });
    });
  });
});
