import { MouseEvent, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';

import { IoSunny } from 'react-icons/io5';
import { RiMoonClearFill } from 'react-icons/ri';
import { AvatarStyled, Container, Content, Perfil } from './styles';
import { ThemeContext } from 'styled-components';
import { Tip } from './Tip';
import { PopoverOptions } from './PopoverOptions';

interface HeaderProps {
  onOpenNewTransactionsModal: () => void;
  handleDarkMode: () => void;
}

export function HeaderHome({
  onOpenNewTransactionsModal,
  handleDarkMode,
}: HeaderProps) {
  const { title } = useContext(ThemeContext);
  const [options, setOptions] = useState<null | HTMLElement>(null);
  const [iconType, setIconType] = useState('light');

  const [session] = useSession();

  function handleOpenOptions(event: MouseEvent<HTMLDivElement>) {
    setOptions(event.currentTarget);
  }

  useEffect(() => {
    setIconType(title);
  }, [title]);

  return (
    <Container>
      <Content>
        <PopoverOptions options={options} setOptions={setOptions} />

        <Link href="http://localhost:3000">
          <a>
            <img src="/images/logo02.svg" alt="my wallet" />
          </a>
        </Link>

        <div>
          <Perfil>
            <Tip message="Trocar Tema">
              <button onClick={handleDarkMode}>
                {iconType === 'dark' ? (
                  <IoSunny size={21} color="#fff" />
                ) : (
                  <RiMoonClearFill size={18} color="#fff" />
                )}
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
              <AvatarStyled onClick={handleOpenOptions}>
                <img alt={session.user.name} src={session.user.image} />
              </AvatarStyled>
            </Tip>
          </Perfil>

          <button type="button" onClick={onOpenNewTransactionsModal}>
            Nova transação
          </button>
        </div>
      </Content>
    </Container>
  );
}
