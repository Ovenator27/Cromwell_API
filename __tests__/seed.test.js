const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeAll(() => seed(data));
afterAll(() => db.end());

describe("users table", () => {
  test("create users table", () => {
    return db
      .query(
        `SELECT EXISTS (
            SELECT FROM
            information_schema.tables
            WHERE
            table_name = 'users'
        );`
      )
      .then(({ rows: [{ exists }] }) => {
        expect(exists).toBe(true);
      });
  });
  test("users table has user_id column", () => {
    return db
      .query(
        `SELECT column_name, data_type, column_default
        FROM information_schema.columns
        WHERE table_name = 'users'
        AND column_name = 'user_id';`
      )
      .then(({ rows: [column] }) => {
        expect(column.column_name).toBe("user_id");
      });
  });
  test("users table has username column", () => {
    return db
      .query(
        `SELECT column_name, data_type, column_default
        FROM information_schema.columns
        WHERE table_name = 'users'
        AND column_name = 'username';`
      )
      .then(({ rows: [column] }) => {
        expect(column.column_name).toBe("username");
      });
  });
  test("users table has email column", () => {
    return db
      .query(
        `SELECT column_name, data_type, column_default
        FROM information_schema.columns
        WHERE table_name = 'users'
        AND column_name = 'email';`
      )
      .then(({ rows: [column] }) => {
        expect(column.column_name).toBe("email");
      });
  });
  test("users table has password column", () => {
    return db
      .query(
        `SELECT column_name, data_type, column_default
        FROM information_schema.columns
        WHERE table_name = 'users'
        AND column_name = 'password';`
      )
      .then(({ rows: [column] }) => {
        expect(column.column_name).toBe("password");
      });
  });
});
describe("users table data insertion", () => {
  test("user data correctly inserted", () => {
    return db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
      expect(users).toHaveLength(3);
      users.forEach((user) => {
        expect(user).toMatchObject({
          user_id: expect.any(Number),
          username: expect.any(String),
          email: expect.any(String),
          password: expect.any(String),
        });
      });
    });
  });
});
