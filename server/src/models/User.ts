import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  OneToMany,
} from "typeorm";
import { Transaction } from "./Transaction";

@Entity("users")
class User {
  @ObjectIdColumn()
  readonly _id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transaction: Transaction[];

  @CreateDateColumn()
  created_at: Date;
}

export { User };
