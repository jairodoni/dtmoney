import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";
import { User } from "./User";

@Entity("transactions")
class Transaction {
  @ObjectIdColumn()
  readonly _id: ObjectID;

  @Column()
  title: string;

  @Column()
  amount: number;

  @Column()
  type: number;

  @Column()
  category: number;

  @ManyToOne(() => User, (user) => user.transaction)
  user: User;

  @CreateDateColumn()
  created_at: Date;
}

export { Transaction };
