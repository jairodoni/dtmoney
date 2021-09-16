import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useTransactions } from '../../hooks/useTransactions';
import { api } from '../../services/api';
import { EditTransactionModal } from '../EditTransactionModal';
import { InputButton } from '../InputSearch';
import { SkeletonForTable } from './SkeletonForTable';
import { Container } from './styles';

interface Transaction {
  _id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  effectuation_date: Date;
  email: string;
  created_at: string;
}

export function TransactionsTable() {
  const [session] = useSession();

  const {
    setTransactions,
    transactionsFiltered,
    searchTransactions,
    deleteTransaction,
  } = useTransactions();

  const [transaction, setTransaction] = useState({} as Transaction);
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] =
    useState(false);
  const [checked, setChecked] = useState(false);

  async function GetTransactions() {
    const getTransactions = await api.get(`/transaction/${session.user.email}`);
    setTransactions(getTransactions.data);
  }

  const handleChangeFade = () => {
    setChecked(prev => !prev);
  };

  function handleOpenNewTransactionModal(transactionSelected: Transaction) {
    if (session) {
      setTransaction(transactionSelected);
      setIsEditTransactionModalOpen(true);
    } else {
      alert('Você não esta logado! Tente fazer seu login antes.');
    }
  }

  function handleCloseNewTransactionModal() {
    setIsEditTransactionModalOpen(false);
  }

  function handleDelete(transactionId: string) {
    if (session) {
      deleteTransaction(transactionId);
    } else {
      alert('Você não esta logado! Tente fazer seu login antes.');
    }
  }

  useEffect(() => {
    if (session) {
      GetTransactions();
    } else {
      alert('Você não esta logado! Tente fazer seu login antes.');
    }
  }, [session]);

  useEffect(() => {
    handleChangeFade();
    if (checked) {
      setChecked(true);
    }
  }, [transactionsFiltered]);

  return (
    <Container>
      <InputButton />
      <table className="transaction-table">
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
        {session && transactionsFiltered ? (
          <tbody className="body-table">
            {searchTransactions.map(transaction => (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat('pt-BR').format(
                    new Date(transaction.effectuation_date)
                  )}
                </td>
                <td className="button-table">
                  <FiEdit
                    size={19}
                    className="edit"
                    onClick={() => handleOpenNewTransactionModal(transaction)}
                  />
                </td>
                <td className="button-table">
                  <FiTrash2
                    size={19}
                    className="delete"
                    onClick={() => handleDelete(transaction._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <SkeletonForTable />
        )}
      </table>
      <EditTransactionModal
        isOpen={isEditTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        transaction={transaction}
      />
    </Container>
  );
}
