const request = require("supertest");
const app = require("../../app");

describe("Test Get /Launches", () => {
  test("it should respond with 200 success", async () => {
    const response = await request(app).get("/launches");
    expect(response.statusCode).toBe(200);
  });
});

describe("Test POST /createLaunch", () => {
  test("it should throuw error Abort Launch if it is Not Exist", async () => {
    const response = await request(app)
      .delete("/abortLaunch/101")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body.message).toBe("Launch is Not Exist");
  });

  test("it should respond with 201 success", async () => {
    //SuperTest Assertion
    const response = await request(app)
      .post("/createLaunch")
      .send({
        mission: "Kepler Exploration X",
        rocket: "Explorer IS1",
        launchDate: new Date("July 30, 2022"),
        target: "Kepler-442 b",
      })
      .expect("Content-Type", /json/)
      .expect(201);

    //Jest Assertion
    expect(response.body).toMatchObject({
      mission: "Kepler Exploration X",
      rocket: "Explorer IS1",
      launchDate: "2022-07-29T18:30:00.000Z",
      target: "Kepler-442 b",
    });
  });
});
