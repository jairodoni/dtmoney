import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from './hooks/useTransactions';
import Routes from './routes';

export function App() {
  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Routes />
    </ TransactionsProvider>
  );
}


