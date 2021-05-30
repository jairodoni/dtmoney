
import { IoSunny } from 'react-icons/io5';
import { RiMoonClearFill } from 'react-icons/ri';
import { Container, Content, Perfil } from './styles';

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
  darkMode: boolean;
  session: User;
}

export function Header({ onOpenNewTransactionsModal, handleDarkMode, darkMode, session }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src="/images/logo02.svg" alt="dt money" />

        <div>
          <Perfil >
            <button onClick={handleDarkMode}>
              {darkMode
                ? <IoSunny size={21} color="#fff" />
                : <RiMoonClearFill size={18} color="#fff" />
              }

            </button>
            <div className="infoPerfil">
              <strong>{session.user.name}</strong>
              <br />
              <span>{session.user.email}</span>
            </div>
            <div className="divider" />
            <div className="imgPerfil">
              <img src={session.user.image} alt="" />
            </div>
          </Perfil>

          <button type="button" onClick={onOpenNewTransactionsModal}>
            Nova transação
        </button>
        </div>
      </Content>
    </Container>
  )
}

