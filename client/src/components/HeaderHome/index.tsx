
import { signOut, useSession } from "next-auth/client";
import { MouseEvent, useContext, useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import { FaFileExport } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { IoSunny } from 'react-icons/io5';
import { RiMoonClearFill } from 'react-icons/ri';
import { ThemeContext } from 'styled-components';
import { useTransactions } from '../../hooks/useTransactions';
import { PopoverComponent } from '../PopoverComponent';
import { AvatarStyled, Container, Content, Perfil } from './styles';
import { Tip } from './Tip';


interface HeaderProps {
  onOpenNewTransactionsModal: () => void;
  handleDarkMode: () => void;
}

export function HeaderHome({
  onOpenNewTransactionsModal,
  handleDarkMode
}: HeaderProps) {
  const [session] = useSession()

  const name = session.user.name.split(' ,');

  const { transactions } = useTransactions();
  const { title } = useContext(ThemeContext);

  const arrayTransactions = transactions.map(item => ({
    Titulo: item.title,
    Valor: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.amount),
    Tipo: item.type === "deposit" ? "Entrada" : "Saida",
    Categoria: item.category,
    Data: new Intl.DateTimeFormat('pt-BR').format(new Date(item.effectuation_date))
  }))

  const [options, setOptions] = useState<null | HTMLElement>(null);
  const [iconType, setIconType] = useState("");

  function handleOpenOptions(event: MouseEvent<HTMLDivElement>) {
    setOptions(event.currentTarget);
  }

  useEffect(() => {
    setIconType(title);
  }, [title])

  const OptionsComponent = () => {
    return (
      <PopoverComponent
        options={options}
        setOptions={setOptions}
      >
        <CSVLink
          data={arrayTransactions}
          filename={`my-wallet-${name}.csv`}
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

