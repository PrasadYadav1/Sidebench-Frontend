const styles = {
  label: {
    fontFamily: 'Jakarta_Text_Bold',
    marginBottom: '8px',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '21px'
  },
  select: {
    [`& fieldset`]: {
      borderRadius: 4,
      border: '1px solid #C3CCD9'
    }
  },
  item: {
    fontSize: 14,
    fontFamily: 'Jakarta_Text_Regular',
    fontWeight: 400,
    lineHeight: '21px',
    padding: '12px',
    color: '#001533'
  },
  placeholder: {
    fontSize: 14,
    fontFamily: 'Jakarta_Text_Regular',
    fontWeight: 400,
    lineHeight: '21px',
    color: '#a2a2a2'
  },
  input: {
    fontSize: 14,
    fontFamily: 'Jakarta_Text_Regular',
    fontWeight: 400,
    lineHeight: '21px',
    padding: '12px'
  },
  select_field_text: {
    background: '#FFFFFF',
    fontFamily: 'Jakarta_Text_light',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '15px',
    color: '#1A1A1A',
    textAlign: 'start' as unknown as 'start'
  },
  error_message: {
    color: '#ED0000',
    fontFamily: 'Jakarta_Text_Regular',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '21px'
  }
};

export default styles;
