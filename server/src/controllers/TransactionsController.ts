import { getCustomRepository, Transaction } from "typeorm";
import { Request, Response } from "express";
import { TransactionsRepository } from "../repositories/TransactionsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class TransactionsController {
  async create(req: Request, res: Response) {
    const { title, amount, type, category, email } = req.body;

    const transactionRepository = getCustomRepository(TransactionsRepository);
    const usersRepository = getCustomRepository(UsersRepository);

    try {
      const userAlreadExists = await usersRepository.findOne({
        email,
      });

      if (!userAlreadExists) {
        return res.status(400).json({
          error: "Users does not exists.",
        });
      }
      const transaction = transactionRepository.create({
        title,
        amount,
        type,
        category,
        user: userAlreadExists,
      });

      await transactionRepository.save(transaction);

      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to create transaction",
      });
    }
  }

  async show(req: Request, res: Response) {
    const { email } = req.params;

    try {
      const transactionRepository = getCustomRepository(TransactionsRepository);

      const all = await transactionRepository.find({
        where: {
          "user.email": { $eq: email },
        },
      });
      const sortedTransactions = all.sort((a, b) => {
        const date01 = new Date(b.created_at);
        const date02 = new Date(a.created_at);
        return date01 - date02;
      });

      return res.status(200).json(sortedTransactions);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to get all transaction",
      });
    }
  }

  async update(req: Request, res: Response) {
    const { title, amount, type, category, email } = req.body;
    const { id } = req.params;

    try {
      const transactionRepository = getCustomRepository(TransactionsRepository);
      const usersRepository = getCustomRepository(UsersRepository);

      const userAlreadExists = await usersRepository.findOne({
        email,
      });

      if (!userAlreadExists) {
        return res.status(400).json({
          error: "Users does not exists.",
        });
      }

      const updateTransaction = await transactionRepository.update(id, {
        title,
        amount,
        type,
        category,
        user: userAlreadExists,
      });

      return res.status(206).json(updateTransaction);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to update transaction",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const transactionRepository = getCustomRepository(TransactionsRepository);

      const transaction = await transactionRepository.delete(id);

      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(400).json({
        error: "Failed to delete transaction",
      });
    }
  }
}

export { TransactionsController };
