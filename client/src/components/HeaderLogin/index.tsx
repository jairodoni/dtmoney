import { Content, Header } from './styles'
import logoImg from '../../assets/logo.svg'
import { FcGoogle } from 'react-icons/fc'

export function HeaderLogin() {
  return (
    <div>
      <Header>
        <Content>
          <img src={logoImg} alt="dt money" />
          <button type="button" >
            <FcGoogle size={18} />
            Login
          </button>
        </Content>
      </Header>
    </div>
  )
}