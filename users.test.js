const app = require("./app");
const request = require("supertest");
const mongooose = require("mongoose");
const { default: mongoose } = require("mongoose");

test("test log-in email & password", async () => {
  await request(app).post("/users/signin").send({
    email: "toto@gmail.com",
    password: "toto",
  });
  expect(200)
});

afterAll(() => {
  mongoose.connection.close();
});
