import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelectedZone, useSetSelectedZone } from '../../hooks/selectedZone.hooks';
import { useActiveZones, useRogueZones } from '../../hooks/zones.hooks';

export function ActiveZones() {
  const selectedZone = useSelectedZone();
  const setSelectedZone = useSetSelectedZone();
  const activeZones = useActiveZones();
  const rogueZones = useRogueZones();
  const zones = rogueZones.concat(activeZones);


  function handleListItemClick(event, window) {
    setSelectedZone(window);
  }

  function getZoneName(zone) {
    if (zone.zoneId) {
      return `♡ ${zone.displayName || 'Untitled'}`;
    }
    return `✴ Rogue Zone (${zone.tabs.length} tabs)`;
  }

  function isSelected(zone) {
    if (selectedZone) {
      return selectedZone.windowId === zone.windowId;
    }
    return false;
  }

  console.log('selectedZone', selectedZone);

  return (
    <React.Fragment>
      <Typography variant="subtitle1">Active Zones</Typography>
      <List dense>
        {zones.map((zone) => {
          return (
            <ListItem
              key={zone.windowId}
              button
              selected={isSelected(zone)}
              onClick={event => handleListItemClick(event, zone)}
            >
              <ListItemText
                primary={getZoneName(zone)}
              />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
}
