import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Fade } from "@material-ui/core";
import { EditTransactionModal } from "../EditTransactionModal";
import { InputButton } from "../InputSearch";
import { SkeletonForTable } from "./SkeletonForTable";

import { Container } from "./styles";

import { useTransactions } from "../../hooks/useTransactions";
import { api } from "../../services/api";

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
  const {
    setTransactions,
    transactionsFiltered,
    deleteTransaction,
    inputSearch,
  } = useTransactions();
  const [transaction, setTransaction] = useState({} as Transaction);
  const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleChangeFade = () => {
    setChecked((prev) => !prev);
  };

  function handleOpenNewTransactionModal(transactionSelected: Transaction) {
    setTransaction(transactionSelected)
    setIsEditTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsEditTransactionModalOpen(false);
  }

  async function GetTransactions() {
    const getTransactions = await api.get(`/transaction/${session.user.email}`)
    setTransactions(getTransactions.data);
  }
  const [session] = useSession();

  useEffect(() => {
    if (session) {
      GetTransactions();
    } else {
      alert("Você não esta logado! Tente fazer seu login antes.")
    }
  }, [session])

  useEffect(() => {
    handleChangeFade();
    if (checked) {
      setChecked(true)
    }
  }, [transactionsFiltered]);

  const searchTransaction = transactionsFiltered.filter(transaction => {
    if (inputSearch === "") {
      return transaction;
    } else if (transaction.title.toLowerCase().includes(inputSearch.toLowerCase())) {
      return transaction;
    } else if (transaction.category.toLowerCase().includes(inputSearch.toLowerCase())) {
      return transaction;
    } else if (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
      .format(transaction.amount).toLowerCase()
      .includes(inputSearch.toLowerCase())
    ) {
      return transaction;
    } else if (new Intl.DateTimeFormat('pt-BR')
      .format(new Date(transaction.effectuation_date)).toLowerCase()
      .includes(inputSearch.toLowerCase())
    ) {
      return transaction;
    }
  });

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
        {
          session && transactionsFiltered ?
            (
              <tbody className="body-table">
                {searchTransaction.map(transaction => (
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
                        new Date(transaction.effectuation_date)
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
            ) : (
              <SkeletonForTable />
            )
        }
      </table>
      <EditTransactionModal
        isOpen={isEditTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        transaction={transaction}
      />
    </Container>
  )
}