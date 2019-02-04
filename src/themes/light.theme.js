import { createMuiTheme } from '@material-ui/core/styles';
import { red, yellow } from '@material-ui/core/colors/';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Oxygen',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
  },
  palette: {
    type: 'light',
    primary: {
      main: red[500],
      dark: red[600],
    },
    secondary: {
      light: yellow[100],
      main: yellow[400],
      dark: yellow[600],
    },
  },
  overrides: {
    MuiTouchRipple: {
      root: {
        color: '#bdbdbd',
      },
    },
    MuiButton: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(255,255,255,0.08)'
        }
      }
    }
  },
});

// set all instances of font-family to Oxygen
Object.keys(theme.typography).forEach( key => {
  if (typeof key === 'object'){
      key.fontFamily = '"Oxygen", "Helvetica", "Arial", sans-serif"'
  }
});

export default theme;
