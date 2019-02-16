import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: `'Montserrat', 'Helvetica', 'Arial', sans-serif`,
  },
  overrides: {
    MuiListItemAvatar: {
      // height: 200,
      root: {
        borderRadius: 0,
        height: 20,
        width: 20,
      },
    },
  },
});
