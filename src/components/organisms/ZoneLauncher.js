import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import OpenInNew from '@material-ui/icons/OpenInNew';
import Delete from '@material-ui/icons/Delete';
import React from 'react';
import { useSelectedZone, useSetSelectedZone } from '../../hooks/selectedZone.hooks';
import { useRefreshZones } from '../../hooks/zones.hooks';
import { deleteItem } from '../../services/chrome.service';
import { launchZone } from '../../services/zoneService';
import { ShowWhen } from '../utilities/ShowWhen';

export function ZoneLauncher() {
  const selectedZone = useSelectedZone();
  const setSelectedZone = useSetSelectedZone();
  const refreshZones = useRefreshZones();

  async function handleDeleteClick(event) {
    event.preventDefault();
    await deleteItem(selectedZone.zoneId);
    setSelectedZone(null);
    refreshZones();
  }

  async function handleLaunchClick(event) {
    event.preventDefault();
    await launchZone(selectedZone);
    refreshZones();
  }

  if (selectedZone && selectedZone.zoneId) {
    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Button
            fullWidth
            color="secondary"
            variant="outlined"
            onClick={handleDeleteClick}
          >
            Delete
            <Delete style={{ marginLeft: 8 }} />
          </Button>
        </Grid>
        <ShowWhen condition={!selectedZone.windowId}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleLaunchClick}
            >
              Open Zone
              <OpenInNew style={{ marginLeft: 8 }} />
            </Button>
          </Grid>
        </ShowWhen>
      </Grid>
    );
  }
  return null;
}
