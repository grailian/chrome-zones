import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React from 'react';
import { ZonesProvider } from '../../context/zones.context';
import { ClosedZones } from '../organisms/ClosedZones';
import { Tabs } from '../organisms/Tabs';
import { ZoneLauncher } from '../organisms/ZoneLauncher';
import { ZoneNameInput } from '../organisms/ZoneNameInput';
import { ActiveZones } from '../organisms/ActiveZones';
import { SelectedZoneProvider } from '../../context/selectedZone.context';
import { theme } from '../../styles/theme';

export function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ZonesProvider>
        <SelectedZoneProvider>
          <div>
            <CssBaseline />
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <ActiveZones />
                <ClosedZones />
              </Grid>
              <Grid item xs={8}>
                <ZoneNameInput />
                <ZoneLauncher />
                <Tabs />
              </Grid>
            </Grid>
          </div>
        </SelectedZoneProvider>
      </ZonesProvider>
    </MuiThemeProvider>
  );
}
