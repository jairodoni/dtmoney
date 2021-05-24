import request from "supertest";
import { getCustomRepository } from "typeorm";
import { app } from "../app";
import createConnection from "../database";
import { UsersRepository } from "../repositories/UsersRepository";

function Clear() {
  const usersRepository = getCustomRepository(UsersRepository);
  usersRepository.clear();
}

describe("User", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await createConnection();
  });

  afterAll(async () => {
    Clear();
    process.env.NODE_ENV = "dev";
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
