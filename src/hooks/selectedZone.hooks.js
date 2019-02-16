import { useContext } from 'react';
import { SelectedZone } from '../context/selectedZone.context';

export function useSelectedZoneContext() {
  const { selectedZone, setSelectedZone } = useContext(SelectedZone);

  return {
    selectedZone,
    setSelectedZone,
  };
}

export function useSelectedZone() {
  const { selectedZone } = useSelectedZoneContext();

  return selectedZone;
}

export function useSetSelectedZone() {
  const { setSelectedZone } = useSelectedZoneContext();

  return setSelectedZone;
}

export function useSelectedZoneTabs() {
  const selectedZone = useSelectedZone();
  if (selectedZone && selectedZone.tabs) {
    return selectedZone.tabs;
  }
  return [];
}

export function useSelectedZoneDisplayName() {
  const selectedZone = useSelectedZone();
  if (selectedZone && selectedZone.displayName) {
    return selectedZone.displayName;
  }
  return '';
}
