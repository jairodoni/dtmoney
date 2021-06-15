import { FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import Modal from 'react-modal';

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ptBR from 'date-fns/locale/pt-BR';
registerLocale('ptBR', ptBR)


interface Transaction {
  _id: string;
  title: string;
  amount: number;
  category: string;
  effectuation_date: Date;
  type: string;
  created_at: string;
}

interface EditTransactionModalProps {
  transaction: Transaction;
  isOpen: boolean;
  onRequestClose: () => void;
}

export function EditTransactionModal({ isOpen, onRequestClose, transaction }: EditTransactionModalProps) {
  const { editTransaction } = useTransactions();

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [effectuationDate, setEffectuationDate] = useState<Date>();
  const [type, setType] = useState('')


  const [session] = useSession();

  async function handleOpenNewTransactionModal(event: FormEvent) {
    event.preventDefault();

    const effectuation_date = effectuationDate ? effectuationDate : new Date();

    const data = {
      _id: transaction._id,
      title,
      amount,
      category,
      type,
      effectuation_date,
      email: session.user.email,
      created_at: Date()
    }

    await editTransaction(data);
    onRequestClose();
  }

  useEffect(() => {
    setTitle(transaction.title)
    setAmount(transaction.amount)
    setCategory(transaction.category)
    setType(transaction.type)
    setEffectuationDate(new Date(transaction.effectuation_date))
  }, [transaction])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src="/images/close.svg" alt="Fechar modal" />
      </button>

      <Container onSubmit={handleOpenNewTransactionModal}>
        <h2>Editar transação</h2>

        <input
          placeholder="Titulo"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />


        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src="/images/income.svg" alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src="/images/outcome.svg" alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>


        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <DatePicker
          placeholderText="Data de realização"
          selected={effectuationDate}
          onChange={(date) => setEffectuationDate(date)}
          dateFormat="dd 'de' MMMM, yyyy"
          locale="ptBR"
          openToDate={new Date()}
          popperPlacement="top"
        />

        <button
          type="submit"
        >
          Confirmar Edição
        </button>

      </Container>
    </Modal>
  );
}