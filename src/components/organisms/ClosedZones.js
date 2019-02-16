import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelectedZone, useSetSelectedZone } from '../../hooks/selectedZone.hooks';
import { useClosedZones } from '../../hooks/zones.hooks';

export function ClosedZones() {
  const zones = useClosedZones();
  const selectedZone = useSelectedZone();
  const setSelectedZone = useSetSelectedZone();

  function handleListItemClick(event, window) {
    setSelectedZone(window);
  }

  return (
    <React.Fragment>
      <Typography variant="subtitle1">Inactive Zones</Typography>
      <List dense>
        {zones.map((zone) => {
          return (
            <ListItem
              key={zone.zoneId}
              button
              selected={selectedZone === zone}
              onClick={event => handleListItemClick(event, zone)}
            >
              <ListItemText
                primary={`♡ ${zone.displayName || 'Untitled'}`}
              />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
}
