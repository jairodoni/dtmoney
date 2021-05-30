import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useTransactions } from "../../hooks/useTransactions";
import { api } from "../../services/api";
import { EditTransactionModal } from "../EditTransactionModal";
import { Container } from "./styles";

interface Transaction {
  _id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  email: string;
  created_at: string;
}

interface TransactionsTableProps {
  darkMode: boolean;
}

export function TransactionsTable({ darkMode }: TransactionsTableProps) {
  const { transactions, setTransactions, editTransaction, deleteTransaction } = useTransactions();
  const [transaction, setTransaction] = useState({} as Transaction);
  const [session] = useSession();

  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal(transactionSelected: Transaction) {
    setTransaction(transactionSelected)
    const { email } = session.user;

    editTransaction({ ...transactionSelected, email });
    setIsEditTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsEditTransactionModalOpen(false);
  }

  async function GetTransactions() {
    const getTransactions = await api.get(`/transaction/${session.user.email}`)
    // const sortedActivities = getTransactions.data.sort((a, b) => a.created_at - b.created_at)
    setTransactions(getTransactions.data);
  }

  useEffect(() => {
    GetTransactions();
  }, [session])

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Editar</th>
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(transaction.created_at)
                )}
              </td>
              <td>
                <FiEdit size={19} className="edit" onClick={() => handleOpenNewTransactionModal(transaction)} />
              </td>
              <td>
                <FiTrash2 size={19} className="delete" onClick={() => deleteTransaction(transaction._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditTransactionModal
        isOpen={isEditTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        transaction={transaction}
        darkMode={darkMode}
      />
    </Container>
  )
}