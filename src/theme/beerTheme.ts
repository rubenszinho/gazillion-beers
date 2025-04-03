import { createTheme } from '@mui/material';

export const beerColors = {
  amber: '#f5bc42',
  darkAmber: '#a06e0a',
  lightAmber: '#ffce60',
  foam: '#fff9e6',
  bottle: '#5e3915',
};

const beerTheme = createTheme({
  palette: {
    primary: {
      main: beerColors.amber,
      dark: beerColors.darkAmber,
      light: beerColors.lightAmber,
      contrastText: '#fff',
    },
    secondary: {
      main: beerColors.bottle,
    },
    background: {
      default: beerColors.foam,
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 24px',
          textTransform: 'none',
          fontSize: '1rem',
        },
      },
    },
  },
});

export default beerTheme;
