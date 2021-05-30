import { AppProps } from 'next/app';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as NextAuthProvider } from 'next-auth/client';


// import { GlobalStyle } from '../styles/global';
import GlobalStyles from '../styles/global';
import theme from '../styles/theme';
import themeDark from '../styles/themeDark';




function MyApp({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState(true);
  const typeTheme = darkMode ? themeDark : theme;
  function handleDarkMode() {
    setDarkMode(!darkMode)

  }

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
