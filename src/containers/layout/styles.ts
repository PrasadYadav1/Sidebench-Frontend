const styles = {
  layout_conatiner: {
    display: 'flex',
    flexDirection: 'column' as unknown as 'column',
    height: '100%',
    width: '100%',
    background: '#E5E5E5'
  },

  layout_main: {
    display: 'flex',
    flexGrow: 1
  },

  left_pannel: {
    position: 'absolute' as unknown as 'absolute',
    width: '20%',
    height: '90%',
    top: '10%',
    background: '#FFFFFF'
  },
  outlet: {
    position: 'absolute' as unknown as 'absolute',
    flexGrow: 1,
    left: '20%',
    top: '10%',
    right: '0%',
    height: '90%'
  }
};

export default styles;
