import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/client';
import { useState } from 'react';
// import Modal from 'react-modal';
import { Dashboard } from "../components/Dashboard";
import { Header } from "../components/HeaderHome";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { TransactionsProvider } from '../hooks/useTransactions';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
// Modal.setAppElement('#root')

interface User {
  user: {
    email: string;
    image: string;
    name: string;
  }
}


interface HomeProps {
  handleDarkMode: () => void;
  darkMode: boolean;
  session: User;
}

export default function Home({ handleDarkMode, darkMode, session }: HomeProps) {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (

    <TransactionsProvider>
      <MuiThemeProvider theme={themeUI}>
        <head>
          <title>Home | My Wallet</title>
        </head>
        <div>

          <Header
            onOpenNewTransactionsModal={handleOpenNewTransactionModal}
            handleDarkMode={handleDarkMode}
            darkMode={darkMode}
            session={session}
          />
          <Dashboard darkMode={darkMode} />
          <NewTransactionModal
            isOpen={isNewTransactionModalOpen}
            onRequestClose={handleCloseNewTransactionModal}
            darkMode={darkMode}
          />
        </div>
      </MuiThemeProvider>
    </TransactionsProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      }
    }
  }

  return {
    props: {
      session,
    }
  }
}

const themeUI = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: "#8F62FF",
    },
    secondary: {
      main: "#5429CC",
    },
  },
});