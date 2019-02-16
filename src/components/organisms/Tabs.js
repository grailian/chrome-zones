import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { SelectedZone } from '../../context/selectedZone.context';
import { useSelectedZoneTabs } from '../../hooks/selectedZone.hooks';
import { saveWindowAsZone } from '../../services/chrome.service';

function getZoneDisplayName(zone) {
  if (zone && zone.displayName) {
    return zone.displayName;
  }
  return '';
}

function getZoneTabs(zone) {
  if (zone && zone.tabs) {
    return zone.tabs;
  }
  return [];
}

export function Tabs() {
  const tabs = useSelectedZoneTabs();

  return (
    <React.Fragment>
      <Typography variant="subtitle1">Tabs</Typography>
      <List dense>
        {tabs.map((tab, i) => {
          return (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar
                  alt={`${tab.title} Icon`}
                  src={tab.favIconUrl}
                />
              </ListItemAvatar>
              <ListItemText
                primary={tab.title}
                secondary={tab.url}
              />
            </ListItem>
          );
        })}
      </List>
    </React.Fragment>
  );
}
