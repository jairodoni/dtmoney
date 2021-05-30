import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  email: string;
  created_at: string;
}

type TransactionInput = Omit<Transaction, '_id' | 'created_at'>;

interface TransactionsProviderProps {
  children: ReactNode
}

interface TransactionsContextData {
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[]) => void;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  editTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (transactionId: string) => Promise<void>;
}

// const TransactionsContext = createContext<TransactionsContextData[]>([]);
const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // async function mirageAPI() {
  //   await ServerAndSeeds()
  //   api.get('/transactions')
  //     .then(response => setTransactions(response.data.transactions));
  // }

  async function createTransaction(transactionInput: TransactionInput) {
    await api.post('/transaction', {
      ...transactionInput,
      created_at: new Date(),
    });
    const getTransactions = await api.get(`/transaction/${transactionInput.email}`)


    setTransactions(getTransactions.data)
  }
  async function editTransaction(transaction: Transaction) {
    try {
      await api.put(`/transaction/${transaction._id}`, transaction);
      const getTransactions = await api.get(`/transaction/${transaction.email}`)

      setTransactions(getTransactions.data)
    } catch (error) {
      alert(error);
    }
  }

  async function deleteTransaction(transactionId: string) {
    const filterTransaction = transactions.filter(item => item._id !== transactionId)
    setTransactions(filterTransaction)
    await api.delete(`/transaction/${transactionId}`,);
  }


  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions, createTransaction, editTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}