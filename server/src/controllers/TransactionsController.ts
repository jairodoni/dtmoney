import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { TransactionsRepository } from "../repositories/TransactionsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

class TransactionsController {
  async create(req: Request, res: Response) {
    const { title, amount, type, category, email } = req.body;

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
    const transaction = transactionRepository.create({
      title,
      amount,
      type,
      category,
      user: userAlreadExists,
    });

    await transactionRepository.save(transaction);

    return res.status(201).json(transaction);
  }

  async show(req: Request, res: Response) {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const { email } = req.params;

    const all = await transactionRepository.find({
      where: {
        "user.email": { $eq: email },
      },
    });

    return res.json(all);
  }
}

export { TransactionsController };
