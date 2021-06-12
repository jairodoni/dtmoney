import { MouseEvent, useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { OptionsComponent } from './OptionsComponent';
import { useTransactions } from '../../hooks/useTransactions';
import { InputSearch } from './styles';

export function InputButton() {
  const {
    transactions,
    typeTransaction,
    setInputSearch,
    setTypeTransaction,
    setTransactionsFiltered
  } = useTransactions();

  const [options, setOptions] = useState<null | HTMLElement>(null);
  const [typeColor, setTypeColor] = useState('');

  async function Filter() {
    if (typeTransaction === "Todos") {
      setTransactionsFiltered(transactions)
      return;
    }
    if (typeTransaction === "Entradas") {
      const filterDeposits = transactions.filter(transaction => transaction.type === "deposit")
      setTransactionsFiltered(filterDeposits)
      return;
    }

    if (typeTransaction === "Saidas") {
      const filterWithdraws = transactions.filter(transaction => transaction.type === "withdraw")
      setTransactionsFiltered(filterWithdraws)
      return;
    }
  }

  useEffect(() => {
    if (typeTransaction === "Todos") {
      setTypeColor("");
    }
    if (typeTransaction === "Entradas") {
      setTypeColor("#33CC95");
    }
    if (typeTransaction === "Saidas") {
      setTypeColor("#E52E40");
    }

    Filter()
  }, [typeTransaction, transactions]);

  function handleOpenOptions(event: MouseEvent<HTMLButtonElement>) {
    setOptions(event.currentTarget);
  }

  return (
    <InputSearch className="input-search">
      <OptionsComponent
        options={options}
        setOptions={setOptions}
        setTypeTransaction={setTypeTransaction}
      />

      <input
        type="text"
        placeholder="Buscar por referencia..."
        onChange={event => setInputSearch(event.target.value)}
      />

      <SearchIcon className="icon" />

      <div className="divider" />

      <button
        type="button"
        onClick={handleOpenOptions}
        style={{ color: typeColor && typeColor }}
      >
        {typeTransaction}

        {
          !options ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />
        }
      </button>
    </InputSearch>
  );
}