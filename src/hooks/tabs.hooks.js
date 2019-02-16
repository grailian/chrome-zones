import { useEffect, useState } from 'react';

export function useCurrentWindowTabs() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    chrome.tabs.query({
      currentWindow: true,
    }, (res) => {
      setTabs(res);
    });
  }, [null]);

  return tabs;
}
