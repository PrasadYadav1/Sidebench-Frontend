import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
      background: '#313131'
    }
  },
  palette: {
    secondary: {
      main: '#313131'
    }
  }
});

export default theme;
