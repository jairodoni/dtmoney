import { SingnInButton } from '../SingnInButton';
import { Content, Header } from './styles';

export function HeaderLogin() {
  return (
    <div>
      <Header>
        <Content>
          <img src="/images/logo02.svg" alt="dt money" />
          <SingnInButton />
        </Content>
      </Header>
    </div>
  )
}
