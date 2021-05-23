import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";
import createConnection from "../database";
import { Transaction } from "../models/Transaction";

describe("Surveys", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await createConnection();
  });

  afterAll(async () => {
    await getConnection().createQueryBuilder().delete();
    process.env.NODE_ENV = "dev";
    let { close } = await createConnection();
    close();
  });

  it("Should be able to create a new transaction", async () => {
    const user = await request(app).post("/users").send({
      name: "User01 Example",
      email: "user01@example.com",
    });

    const response = await request(app).post("/transaction").send({
      title: "Aluguel",
      amount: "1200",
      type: "withdraw",
      category: "Casa",
      email: user.body.email,
    });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new transaction without exists user", async () => {
    const response = await request(app).post("/transaction").send({
      title: "Aluguel",
      amount: "1200",
      type: "withdraw",
      category: "Casa",
    });

    expect(response.status).toBe(400);
  });

  it("Should be able to get all transaction by email", async () => {
    const user = await request(app).post("/users").send({
      name: "User02 Example",
      email: "user02@example.com",
    });

    const transaction = await request(app).post("/transaction").send({
      title: "Tv",
      amount: "800",
      type: "withdraw",
      category: "Casa",
      email: user.body.email,
    });

    expect(transaction.status).toBe(201);

    const response = await request(app).get(`/transaction/${user.body.email}`);

    expect(response.body.length).toBe(1);
  });
});
