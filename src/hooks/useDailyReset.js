import { useEffect } from 'react';

function useDailyReset(key, setValue, initialValue) {
  useEffect(() => {
    const today = new Date().toDateString();
    const lastDate = window.localStorage.getItem(`${key}_date`);
    if (lastDate !== today) {
      setValue(initialValue);
      window.localStorage.setItem(`${key}_date`, today);
    }
  }, [key, setValue, initialValue]);
}

export default useDailyReset;
