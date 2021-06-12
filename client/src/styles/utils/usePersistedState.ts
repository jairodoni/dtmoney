import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie';

import light from '../light';
import dark from '../dark';

type Response<T> = [T, Dispatch<SetStateAction<T>>];

function usePersistedState<T>(key: string, initialState: T): Response<T> {
  const [state, setState] = useState(() => {
    const cookieValue = Cookies.get('theme');

    if (cookieValue) {
      return JSON.parse(cookieValue);
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    Cookies.set(`${key}`, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
