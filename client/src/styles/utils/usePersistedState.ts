import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Cookies from 'js-cookie';

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
    Cookies.set(`${key}`, JSON.stringify(state), { expires: 60 }); //expires in 60 days
  }, [key, state]);

  return [state, setState];
}

export default usePersistedState;
