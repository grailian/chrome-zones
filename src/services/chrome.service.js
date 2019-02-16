function getTabsForWindow(windowId) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ windowId }, (tabs) => {
      resolve(tabs);
    });
  });
}

function getAllWindows() {
  return new Promise((resolve, reject) => {
    chrome.windows.getAll({}, (windows) => {
      resolve(windows);
    });
  });
}

export function getCurrentWindow() {
  return new Promise((resolve, reject) => {
    chrome.windows.getCurrent({}, (window) => {
      resolve(window);
    });
  });
}

export async function getAllWindowsAndTabs() {
  const windows = await getAllWindows();
  return Promise.all(windows.map(async (window) => {
    const tabs = await getTabsForWindow(window.id);
    return {
      ...window,
      windowId: window.id,
      tabs,
    };
  }));
}

export function getAllStorage() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(null, function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
}

export function saveWindowAsZone(zone) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [zone.zoneId]: zone }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

export function deleteItem(zoneId) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.remove(zoneId, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

export function openWindowFromZone(zone) {
  return new Promise((resolve, reject) => {
    const window = {
      url: zone.tabs.map(t => t.url),
    };
    chrome.windows.create(window, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result);
      }
    });
  });
}
