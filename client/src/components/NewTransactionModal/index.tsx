import { FormEvent, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';
import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ptBR from 'date-fns/locale/pt-BR';
registerLocale('ptBR', ptBR);

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('deposit');
  const [effectuationDate, setEffectuationDate] = useState();

  const [session] = useSession();

  async function handleOpenNewTransactionModal(event: FormEvent) {
    event.preventDefault();

    if (session) {
      const effectuation_date = effectuationDate
        ? effectuationDate
        : new Date();
      await createTransaction({
        title,
        amount: amount ? amount : 0,
        category,
        type,
        effectuation_date,
        email: session.user.email,
      });

      ClearInput();
      onRequestClose();
    } else {
      alert(
        'Você não esta devidamente logado para realizar um novo registro! Faça seu login e tente novamente.'
      );
    }
  }

  function ClearInput() {
    setTitle('');
    setAmount(null);
    setCategory('');
    setType('');
    setEffectuationDate(undefined);
  }

  useEffect(() => {
    ClearInput();
  }, [isOpen]);

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
        <h2>Cadastrar transação</h2>

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
            onClick={() => {
              setType('deposit');
            }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src="/images/income.svg" alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => {
              setType('withdraw');
            }}
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
          onChange={date => setEffectuationDate(date)}
          dateFormat="dd 'de' MMMM, yyyy"
          locale="ptBR"
          openToDate={new Date()}
          popperPlacement="top"
          typeof="date"
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
