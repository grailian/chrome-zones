import { useEffect, useState } from 'react';
import * as React from 'react';
import { getZones } from '../services/zoneService';

export const Zones = React.createContext(null);

export function ZonesProvider(props) {
  const [zones, setZones] = useState([]);

  useEffect(refresh, [null]);

  function refresh() {
    getZones()
      .then((zones) => {
        setZones(zones);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  const value = { zones, refresh };

  return (
    <Zones.Provider value={value}>
      {props.children}
    </Zones.Provider>
  );
}
