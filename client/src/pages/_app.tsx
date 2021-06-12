import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ToastContainer } from 'react-toastify';

import usePersistedState from '../styles/utils/usePersistedState';
import GlobalStyles from '../styles/global';
import light from '../styles/light';
import dark from '../styles/dark';


export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light);


  function handleDarkMode() {
    setTheme(theme.title === 'dark' ? light : dark)
  }

  return (
    <NextAuthProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component
          {...pageProps}
          handleDarkMode={handleDarkMode}
          setTheme={setTheme}
          theme={theme}
        />
        <GlobalStyles />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          style={{ fontSize: 16 }}
        />
      </ThemeProvider>
    </NextAuthProvider>
  );
}



