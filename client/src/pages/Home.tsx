import { useState } from 'react'
import Modal from 'react-modal';
import { Dashboard } from "../components/Dashboard";
import { Header } from "../components/HeaderHome";
import { NewTransactionModal } from "../components/NewTransactionModal";

Modal.setAppElement('#root')
export default function Home() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <div>
      <head>
        <title>Home | dtmoney</title>
      </head>
      <Header onOpenNewTransactionsModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </div>
  )
}