import { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { toast } from 'react-toastify';
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
  transactionsFiltered: Transaction[];
  setTransactionsFiltered: (transactionsFiltered: Transaction[]) => void;
  inputSearch: string;
  setInputSearch: (inputSearch: string) => void;
  typeTransaction: string;
  setTypeTransaction: (typeTransaction: string) => void;
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  editTransaction: (transaction: Transaction) => Promise<void>;
  deleteTransaction: (transactionId: string) => Promise<void>;
}

// const TransactionsContext = createContext<TransactionsContextData[]>([]);
const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionsFiltered, setTransactionsFiltered] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
  const [typeTransaction, setTypeTransaction] = useState("Todos")

  async function createTransaction(transactionInput: TransactionInput) {
    try {
      await api.post('/transaction', {
        ...transactionInput,
        created_at: new Date(),
      });
      const getTransactions = await api.get(`/transaction/${transactionInput.email}`)


      setTransactions(getTransactions.data)
      toast.success('Transação criada com sucesso!');
    } catch (error) {
      toast.error('Não foi possivel criar a Transação.');
    }
  }


  async function editTransaction(transaction: Transaction) {
    try {
      const response = await api.put(`/transaction/${transaction._id}`, transaction);

      if (response.status === 206) {
        const getTransactions = await api.get(`/transaction/${transaction.email}`)

        setTransactions(getTransactions.data)
        toast.success('Transação editada com sucesso!');
      } else {
        toast.error('Não foi possivel editar.');
      }
    } catch (error) {
      toast.error('Não foi possivel editar.');
    }
  }

  async function deleteTransaction(transactionId: string) {
    const filterTransaction = transactions.filter(item => item._id === transactionId)
    try {
      if (filterTransaction) {
        const filterTransaction = transactions.filter(item => item._id !== transactionId)

        const response = await api.delete(`/transaction/${transactionId}`,);

        if (response.status === 200) {
          setTransactions(filterTransaction)
        } else {
          toast.error('Não foi possivel excluir.');
        }
        toast.success('Transação excluida com sucesso!');
      } else {
        toast.error('Essa transação não existe.');
      }
    } catch (error) {
      toast.error('Não foi possivel excluir.');
    }

  }


  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        createTransaction,
        editTransaction,
        deleteTransaction,
        transactionsFiltered,
        setTransactionsFiltered,
        inputSearch,
        setInputSearch,
        typeTransaction,
        setTypeTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}