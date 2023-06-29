import { createTheme } from '@mui/material/styles';

export let theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#2a4354',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

theme = createTheme(theme, {
  palette: {
    info: {
      main: theme.palette.secondary.main,
    },
  },
});
