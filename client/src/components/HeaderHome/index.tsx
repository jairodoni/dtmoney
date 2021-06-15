
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { signOut } from "next-auth/client";
import { Tooltip, Zoom } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CSVLink } from "react-csv";
import { FaFileExport } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { IoSunny } from 'react-icons/io5';
import { RiMoonClearFill } from 'react-icons/ri';
import { useTransactions } from '../../hooks/useTransactions';
import { PopoverComponent } from '../PopoverComponent';
import { ThemeContext } from 'styled-components';
import { Tip } from './Tip'
import { AvatarStyled, Container, Content, Perfil } from './styles';

interface User {
  user: {
    email: string;
    image: string;
    name: string;
  }
}

interface HeaderProps {
  onOpenNewTransactionsModal: () => void;
  handleDarkMode: () => void;
  session: User;
}

export function HeaderHome({
  onOpenNewTransactionsModal,
  handleDarkMode,
  session
}: HeaderProps) {
  const { transactions } = useTransactions();
  const { title } = useContext(ThemeContext);

  const [options, setOptions] = useState<null | HTMLElement>(null);
  const [iconType, setIconType] = useState("");

  const headers = [
    { label: "Titulo", key: "title" },
    { label: "Valor", key: "amount" },
    { label: "Categoria", key: "category" }
  ];



  function handleOpenOptions(event: MouseEvent<HTMLDivElement>) {
    setOptions(event.currentTarget);
  }

  useEffect(() => {
    setIconType(title)
  }, [title])

  const OptionsComponent = () => {
    return (
      <PopoverComponent
        options={options}
        setOptions={setOptions}
      >
        <CSVLink
          data={transactions}
          headers={headers}
          target="my_wallet"
        >
          <button>
            <FaFileExport size={19} />
            Exportar CSV
          </button>
        </CSVLink>
        <button onClick={(): Promise<void> => signOut()}>
          <GoSignOut size={21} />
          Logout
        </button>
      </PopoverComponent >
    )
  }

  return (
    <Container>
      <Content>
        <OptionsComponent />

        <img src="/images/logo02.svg" alt="dt money" />

        <div>
          <Perfil>
            <Tip message="Trocar Tema">
              <button onClick={handleDarkMode} >
                {iconType === "dark"
                  ? <IoSunny size={21} color="#fff" />
                  : <RiMoonClearFill size={18} color="#fff" />
                }

              </button>
            </Tip>
            <div
              className="infoPerfil"
              aria-controls="simple-menu"
              aria-haspopup="true"
            >
              <strong>{session.user.name}</strong>
              <br />
              <span>{session.user.email}</span>
            </div>
            <div className="divider" />
            <Tip message="Opções">
              <AvatarStyled onClick={handleOpenOptions}
              >
                <img
                  alt={session.user.name}
                  src={session.user.image}
                />
              </AvatarStyled>
            </Tip>
          </Perfil>

          <button type="button" onClick={onOpenNewTransactionsModal}>
            Nova transação
          </button>
        </div>
      </Content>
    </Container >
  )
}

