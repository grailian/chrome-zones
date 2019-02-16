import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { useSelectedZone, useSelectedZoneDisplayName } from '../../hooks/selectedZone.hooks';
import { useRefreshZones } from '../../hooks/zones.hooks';
import { saveZone } from '../../services/zoneService';

export function ZoneNameInput() {
  const selectedZone = useSelectedZone();
  const displayName = useSelectedZoneDisplayName();
  const refreshZones = useRefreshZones();

  const [name, setName] = useState(displayName);

  useEffect(() => {
    setName(displayName);
  }, [selectedZone]);

  function handleChange(event) {
    setName(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await saveZone({
      ...selectedZone,
      displayName: name,
    });
    refreshZones();
  }

  return (
    <div>
      {selectedZone && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            value={name}
            onChange={handleChange}
          />
        </form>
      )}
    </div>
  );
}
