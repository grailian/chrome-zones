import uuidv4 from 'uuid/v4';
import { getAllStorage, openWindowFromZone, saveWindowAsZone } from './chrome.service';

export async function getZones() {
  const storageItems = await getAllStorage();
  const zones = Object.entries(storageItems).map(([zoneId, zone]) => {
    return {
      ...zone,
      zoneId,
    };
  });
  return zones.sort((a, b) => {
    return b.lastUpdated - a.lastUpdated;
  });
}

export function saveZone(window) {
  const tabs = (window.tabs || []).map((tab) => {
    return {
      id: tab.id,
      favIconUrl: tab.favIconUrl,
      title: tab.title,
      url: tab.url,
    };
  });
  let zone = {
    windowId: window.windowId || window.id,
    zoneId: window.zoneId,
    displayName: window.displayName,
    tabs,
    lastUpdated: Date.now(),
  };
  if (!zone.zoneId) {
    zone.zoneId = uuidv4();
  }
  return saveWindowAsZone(zone);
}

export async function launchZone(zone) {
  const window = await openWindowFromZone(zone);
  await saveZone({
    ...zone,
    windowId: window.id,
  });
}
