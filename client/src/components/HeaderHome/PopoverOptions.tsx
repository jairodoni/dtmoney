import { MouseEvent, useState } from 'react';
import Link from "next/link";
import { signOut, useSession } from "next-auth/client";
import { CSVLink } from "react-csv";
import { FaFileExport } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { GoMarkGithub } from 'react-icons/go';
import { PopoverComponent } from '../PopoverComponent';
import { useTransactions } from '../../hooks/useTransactions';

interface PopoverOptionsProps {
  options: null | HTMLElement;
  setOptions: (options: null | HTMLElement) => void;
}

export function PopoverOptions({ options, setOptions }: PopoverOptionsProps) {
  const { searchTransactions } = useTransactions();

  const [session] = useSession()

  const arrayTransactions = searchTransactions.map(item => ({
    Titulo: item.title,
    Valor: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.amount),
    Tipo: item.type === "deposit" ? "Entrada" : "Saida",
    Categoria: item.category,
    Data: new Intl.DateTimeFormat('pt-BR').format(new Date(item.effectuation_date))
  }));

  return (
    <PopoverComponent
      options={options}
      setOptions={setOptions}
    >
      <Link href="https://github.com/jairodoni">
        <a>
          <button>
            <GoMarkGithub size={21} />
            Autor
          </button>
        </a>
      </Link>
      <CSVLink
        data={arrayTransactions}
        filename={`My Wallet ${session.user.name}.csv`}
      >
        <button>
          <FaFileExport size={19} />
          Exportar CSV
        </button>
      </CSVLink>
      <button onClick={(): Promise<void> => signOut()}>
        <GoSignOut size={21} />
        Sair
      </button>
    </PopoverComponent >
  )
}