import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";
import { Container } from "./styles";

interface DashboardProps {
  darkMode: boolean;
}

export function Dashboard({ darkMode }: DashboardProps) {
  return (
    <Container>
      <Summary />
      <TransactionsTable darkMode={darkMode} />
    </Container>
  )
}