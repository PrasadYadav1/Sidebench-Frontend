import { createTheme } from '@mui/material';

const styles = {
  appBar: {
    height: '90px',
    boxShadow: 'none',
    borderBottom: '1px solid #E4E4E4',
    justifyContent: 'center'
  },
  headerTextContainer: {
    display: 'grid',
    flexGrow: 1,
    marginLeft: '10px'
  },
  headerText1: {
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '25px',
    color: '#313131'
  },
  headerText2: {
    fontFamily: 'Jakarta_Text_Regular',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '15px',
    color: '#838383'
  },
  headerActions: {
    display: 'flex',
    gap: '12px'
  },
  inputfield: {
    width: '332px',
    height: '42px',
    borderRadius: '99px'
  },
  line: {
    width: '2px',
    height: '20px',
    marginTop: '10px'
  },
  arrowDown: {
    height: '20px',
    width: '20px',
    marginTop: '12px'
  }
};

export const theme = createTheme({
  palette: {
    secondary: {
      main: '#FFFFFF'
    }
  }
});

export default styles;
