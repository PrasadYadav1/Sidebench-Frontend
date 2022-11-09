const styles = {
  layout_conatiner: {
    display: 'flex',
    flexDirection: 'column' as unknown as 'column',
    height: 1080,
    background: '#E5E5E5'
  },

  layout_main: {
    display: 'flex',
    flexGrow: 1
  },

  left_pannel: {
    position: 'absolute' as unknown as 'absolute',
    width: 240,
    height: 990,
    left: 0,
    top: 90,
    background: '#FFFFFF'
  },
  outlet: {
    flexGrow: 1,
    left: 0,
    right: 0,
    height: 990
  }
};

export default styles;
