import { useEffect } from 'react';
import * as React from 'react';
import { useActiveZones, useRogueZones } from '../hooks/zones.hooks';
import { getCurrentWindow } from '../services/chrome.service';

export const SelectedZone = React.createContext(null);

export function SelectedZoneProvider(props) {
  const [selectedZone, setSelectedZone] = React.useState(null);
  const value = { selectedZone, setSelectedZone };

  const activeZones = useActiveZones();
  const rogueZones = useRogueZones();
  const zones = rogueZones.concat(activeZones);

  useEffect(() => {
    getCurrentWindow()
      .then((activeWindow) => {
        if (!selectedZone && activeWindow) {
          const activeZone = zones.find((zone) => {
            return zone.windowId === activeWindow.id;
          });
          if (activeZone) {
            console.log('activeZone', activeZone);
            setSelectedZone(activeZone);
          }
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, [zones]);

  return (
    <SelectedZone.Provider value={value}>
      {props.children}
    </SelectedZone.Provider>
  );
}
