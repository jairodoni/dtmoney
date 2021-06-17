import { GetServerSideProps } from "next";
import { getSession } from 'next-auth/client';

import Head from 'next/head';
import { useState } from 'react';
import { Dashboard } from "../components/Dashboard";
import { HeaderHome } from "../components/HeaderHome";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { TransactionsProvider } from '../hooks/useTransactions';
// import Modal from 'react-modal';

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
  session: User;
}

export default function Home({ handleDarkMode }: HomeProps) {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <Head>
        <title>Home | My Wallet</title>
      </Head>

      <TransactionsProvider>
        <MuiThemeProvider theme={themeUI}>
          <div>

            <HeaderHome
              onOpenNewTransactionsModal={handleOpenNewTransactionModal}
              handleDarkMode={handleDarkMode}
            />
            <Dashboard />
            <NewTransactionModal
              isOpen={isNewTransactionModalOpen}
              onRequestClose={handleCloseNewTransactionModal}
            />
          </div>
        </MuiThemeProvider>
      </TransactionsProvider>
    </>
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