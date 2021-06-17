import { GetServerSideProps } from 'next';
import Link from "next/link";
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { GoMarkGithub } from 'react-icons/go';
import { HeaderLogin } from "../components/HeaderLogin";
import { Container } from '../styles/login';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | My Wallet</title>
      </Head>

      <MuiThemeProvider theme={themeUI}>
        <div>

          <HeaderLogin />
          <Container >
            <div>
              <div>
                <h2>O que é o My Wallet?</h2>
                <p>
                  My Wallet é uma plataforma de controle financeiro, onde você pode registrar, calcular e monitorar tanto
                  o dinheiro que entra como o que sai, facilitando para você fazer seu orçamento, se você trabalha como
                  freelancer, comerciante, artista ou autônomo você poderá calcular seu ganhos e investimentos através
                  desta plataforma, caso você só queira calcular seu orçamento no final do mês vendo seus ganhos e gastos
                  também poderá usufruir das utilidades da plataforma, você pode exportar em CSV(Excel) caso queira.
                </p>
                <br />
                <Link href="https://github.com/jairodoni">
                  <a>
                    <span>
                      <GoMarkGithub size={21} />
                      Autor: https://github.com/jairodoni
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            <section>
              <div>
                <iframe
                  width="720"
                  height="415"
                  src="https://www.youtube.com/embed/FFaNjggFbo8"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
              </div>
            </section>
          </Container>
        </div>
      </MuiThemeProvider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: `/home`,
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const themeUI = createMuiTheme({
  palette: {
    primary: {
      main: "#8F62FF",
    },
    secondary: {
      main: "#fff",
    },
  },
});