import { signIn, signOut, useSession } from 'next-auth/client'
import { FcGoogle } from 'react-icons/fc'
import { Loading } from '../Loading';
import { SingnInButton } from '../SingnInButton'
import { Content, Header } from './styles'



export function HeaderLogin() {
  return (
    <div>
      <Header>
        <Content>
          <img src="/images/logo02.svg" alt="dt money" />
          <SingnInButton />
          {/* <span>{session?.name}</span> */}
        </Content>
      </Header>
    </div>
  )
}
