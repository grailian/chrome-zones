import 'regenerator-runtime/runtime';
import { getAllWindowsAndTabs, getTabsForWindow } from './services/chrome.service';
import { getZones, launchZone, saveZone } from './services/zoneService';

let zones = [];

chrome.omnibox.onInputStarted.addListener(async () => {
  zones = await getZones();
});

chrome.omnibox.onInputChanged.addListener(async (text, suggest) => {
  const suggesstions = zones
    .filter((zone) => {
      const name = zone.displayName.toLowerCase();
      return name.indexOf(text.toLowerCase()) !== -1;
    })
    .map((zone) => {
      return ({
          content: zone.displayName,
          description: `Zone: ${zone.displayName} | Tabs: ${zone.tabs.length}`,
        }
      );
    });
  suggest(suggesstions);
});

function focusWindow(windowId) {
  return new Promise((resolve, reject) => {
    chrome.windows.update(windowId, { focused: true }, (window) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
}

chrome.omnibox.onInputEntered.addListener(async (text) => {
  const zone = zones.find((zone) => zone.displayName === text);
  if (zone) {
    if (!zone.windowId) {
      await launchZone(zone);
    } else {
      focusWindow(zone.windowId);
    }
  }
});


async function updateZone(windowId) {
  zones = await getZones();
  const windows = await getAllWindowsAndTabs();
  const zoneForWindow = zones.find((zone) => zone.windowId === windowId);
  const window = windows.find((window) => window.id === windowId);
  if (zoneForWindow && window) {
    saveZone({
      ...zoneForWindow,
      tabs: window.tabs,
    });
  }
}

chrome.tabs.onUpdated.addListener(async (tabIs, changeInfo, tab) => {
  try {
    await updateZone(tab.windowId);
  } catch (error) {
    console.log('tabs.onUpdated error', error);
  }
});

chrome.tabs.onRemoved.addListener(async (tabIs, removeInfo) => {
  try {
    if (!removeInfo.isWindowClosing) {
      await updateZone(removeInfo.windowId);
    }
  } catch (error) {
    console.log('tabs.onRemoved error', error);
  }
});

chrome.windows.onRemoved.addListener(async (windowId) => {
  zones = await getZones();
  const closedZone = zones.find((zone) => zone.windowId === windowId);
  if (closedZone) {
    await saveZone({
      ...closedZone,
      windowId: null,
    });
  }
});

chrome.windows.onCreated.addListener(async (window) => {
  zones = await getZones();
  const tabs = await getTabsForWindow(window.id);
  let openedZone = zones.find((zone) => zone.windowId === window.id);
  if (!openedZone) {
    openedZone = zones.find((zone) => {
      return tabs.every((tab) => {
        return zone.tabs.some((zTabs) => zTabs.url === tab.url);
      });
    });
  }
  if (openedZone) {
    await saveZone({
      ...openedZone,
      windowId: window.id,
    });
  }
});

