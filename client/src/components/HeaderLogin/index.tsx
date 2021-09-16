import Link from 'next/link';
import { SingnInButton } from '../SingnInButton';
import { Content, Header } from './styles';

export function HeaderLogin() {
  return (
    <div>
      <Header>
        <Content>
          <Link href="http://localhost:3000">
            <a>
              <img src="/images/logo02.svg" alt="my wallet" />
            </a>
          </Link>
          <SingnInButton />
        </Content>
      </Header>
    </div>
  );
}
