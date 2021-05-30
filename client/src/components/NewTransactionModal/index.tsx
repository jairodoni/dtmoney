import { useSession } from 'next-auth/client';
import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  darkMode: boolean;
}

export function NewTransactionModal({ isOpen, onRequestClose, darkMode }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(null)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposit')

  const [session] = useSession();

  async function handleOpenNewTransactionModal(event: FormEvent) {
    event.preventDefault();


    await createTransaction({
      title,
      amount: amount ? amount : 0,
      category,
      type,
      email: session.user.email,
    });

    ClearInput();
    onRequestClose();
  }

  function ClearInput() {
    setTitle('')
    setAmount(null)
    setCategory('')
    setType('')
  }

  useEffect(() => {
    ClearInput()
  }, [isOpen])

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

      <Container onSubmit={handleOpenNewTransactionModal} darkMode={darkMode}>
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
            // className={type === 'deposit' ? 'active' : ''}
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

        <button
          type="submit"
        >
          Cadastrar
        </button>

      </Container>
    </Modal>
  );
}