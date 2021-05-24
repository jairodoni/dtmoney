import { Router } from "express";
import { TransactionsController } from "./controllers/TransactionsController";
import { UserController } from "./controllers/UserController";

const router = Router();

const userController = new UserController();
const transactionsCrontroller = new TransactionsController();

//Users
router.post("/users", userController.create);

//Transactions
router.post("/transaction", transactionsCrontroller.create);

router.get("/transaction/:email", transactionsCrontroller.show);

router.put("/transaction/:id", transactionsCrontroller.update);

router.delete("/transaction/:id", transactionsCrontroller.delete);

export { router };
