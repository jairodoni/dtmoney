import request from "supertest";
import { getCustomRepository } from "typeorm";
import { app } from "../app";
import createConnection from "../database";
import { TransactionsRepository } from "../repositories/TransactionsRepository";

function Clear() {
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  transactionsRepository.clear();
}

describe("Transactions", () => {
  beforeAll(async () => {
    process.env.NODE_ENV = "test";
    await createConnection();
  });

  afterAll(async () => {
    Clear();
    process.env.NODE_ENV = "dev";
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

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("Should be able to update transaction", async () => {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const getTransaction = await transactionRepository.findOne({
      where: {
        title: { $eq: "Tv" },
      },
    });

    const response = await request(app)
      .put(`/transaction/${getTransaction._id}`)
      .send({
        title: getTransaction.title,
        amount: "1500",
        type: getTransaction.type,
        category: getTransaction.category,
        email: "user02@example.com",
      });

    expect(response.status).toBe(206);

    const findTransaction = await transactionRepository.findOne(
      getTransaction._id
    );

    expect(findTransaction.amount).toBe("1500");
  });

  it("Should be able to delete transaction", async () => {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const getTransaction = await transactionRepository.findOne({
      where: {
        title: { $eq: "Tv" },
      },
    });

    const response = await request(app).delete(
      `/transaction/${getTransaction._id}`
    );

    expect(response.status).toBe(200);

    const findTransaction = await transactionRepository.findOne(
      getTransaction._id
    );

    expect(findTransaction).toBe(undefined);
  });
});
