import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as NextAuthProvider } from 'next-auth/client';
import Cookies from 'js-cookie'

// import { GlobalStyle } from '../styles/global';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';
import themeDark from '../styles/themeDark';




function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(false);

  const typeTheme = darkMode ? themeDark : theme;

  async function handleDarkMode() {
    await setDarkMode(!darkMode)
    const teste = String(darkMode);
    Cookies.set('darkMode', String(darkMode));

    // const status = await Cookies.get('darkMode');





  }

  useEffect(() => {
    const cookie = Cookies.get('darkMode');
    var status = cookie.toLowerCase() == 'true' || cookie.toLowerCase() == 'false';
    if (status) {
      // console.log(cookie.toLowerCase() == 'true')
      // const teste = JSON.stringify(status);
      setDarkMode(Boolean(cookie))
    }
  }, [])

  return (
    <NextAuthProvider session={pageProps.session}>
      <ThemeProvider theme={typeTheme}>
        <Component {...pageProps} handleDarkMode={handleDarkMode} darkMode={darkMode} />
        <GlobalStyles />
      </ThemeProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
