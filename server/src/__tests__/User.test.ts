import request from "supertest";
import typeorm, { Connection, getConnection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";
import { User } from "../models/User";

// async function Connection(){
//   Connection await createConnection();
// }

describe("User", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await createConnection();
  });

  afterAll(async () => {
    await getConnection().createQueryBuilder().delete().from(User);
    process.env.NODE_ENV = "dev";
    let { close } = await createConnection();
    close();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com",
    });

    expect(response.body).toHaveProperty("email");
    expect(response.status).toBe(201);
  });

  it("Should not be able to create a user with exists email", async () => {
    const response = await request(app).post("/users").send({
      name: "User Example",
      email: "user@example.com",
    });

    expect(response.status).toBe(400);
  });
});
