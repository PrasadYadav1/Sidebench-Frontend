const styles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 280,
    background: '#ffffff',
    p: 3,
    borderRadius: 2,
    outline: 'none'
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '36px',
    color: '#001533',
    mb: 3
  },
  description: {
    fontFamily: 'Jakarta_Text_Regular',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#5C697B',
    mb: 3
  },
  modal_backdrop: {
    backgroundColor: '#00153333'
  }
};

export default styles;
