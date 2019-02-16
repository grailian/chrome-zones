import { useEffect, useState } from 'react';
import { getAllWindowsAndTabs } from '../services/chrome.service';

export function useCurrentWindows() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllWindowsAndTabs()
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [null]);

  return data;
}
