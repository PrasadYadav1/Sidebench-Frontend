import {
  AppBar,
  Box,
  createTheme,
  ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material';
import InputField from '../elements/inputField';
import styles, { theme } from './styles';

const Header = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="absolute" color="secondary" sx={styles.appBar}>
        <Toolbar>
          <img alt="" src="header.svg" />
          <Typography component="div" sx={styles.headerTextContainer}>
            <Typography
              data-testid="header-text1"
              component="div"
              sx={styles.headerText1}
            >
              Moony
            </Typography>
            <Typography
              data-testid="header-text2"
              component="div"
              sx={styles.headerText2}
            >
              Admin Dashboard
            </Typography>
          </Typography>

          <Typography style={styles.headerActions}>
            <InputField
              id="search"
              name="search"
              type="text"
              placeholder="Search dashboard"
              showSearchIcon
              size="small"
              style={styles.inputfield}
            />
            <img alt="" src="alerts.svg" />
            <img alt="" src="message.svg" />
            <img alt="" src="line.svg" style={styles.line} />
            <img alt="" src="/images/profile.png" />
            <img alt="" src="arrow-down.svg" style={styles.arrowDown} />
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
