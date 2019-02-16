import { useContext } from 'react';
import { Zones } from '../context/zones.context';
import { useCurrentWindows } from './windows.hooks';

export function useZonesContext() {
  const { zones, refresh } = useContext(Zones);
  return {
    zones,
    refresh,
  };
}

export function useZones() {
  const { zones } = useZonesContext();
  return zones;
}

export function useRefreshZones() {
  const { refresh } = useZonesContext();
  return refresh;
}

export function useActiveZones() {
  const { zones } = useZonesContext();
  return zones.filter(z => !!z.windowId);
}

export function useClosedZones() {
  const { zones } = useZonesContext();
  return zones.filter(z => !z.windowId);
}

export function useRogueZones() {
  const windows = useCurrentWindows();
  const activeZones = useActiveZones();

  return windows.filter((window) => {
    return !activeZones.find(z => z.windowId === window.id);
  });
}
