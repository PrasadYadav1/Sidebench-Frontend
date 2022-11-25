const styles = {
  container: {
    height: '90%',
    padding: '2%'
  },
  analytics: {
    width: '23%',
    height: '159px',
    background: '#FFFFFF',
    boxShadow: '0px 7px 32px rgba(49, 49, 49, 0.24)',
    borderRadius: '8px',
    paddingLeft: '18px',
    paddingTop: '9px'
  },
  analytics_image: {
    width: '40px',
    height: '23.38px'
  },
  analytics_text: {
    fontSize: '14px',
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 500,
    lineHeight: '18px',
    color: '#838383',
    marginTop: '5px'
  },
  analytics_number: {
    fontSize: '20px',
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 700,
    lineHeight: '25px',
    color: '#313131',
    marginTop: '5px'
  },
  lookbook_order: {
    marginTop: '54px',
    marginBottom: '34px'
  },
  lookbook_order_text: {
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '30px',
    color: '#000000',
    padding: '8px 16px',
    gap: '8px'
  },
  lookbook_order_tabs: {
    background: '#FFFFFF',
    border: '1px solid #E6E6E6',
    borderRadius: '99px',
    height: '65px'
  },
  lookbook_order_tab: {
    fontFamily: 'Jakarta_Text_Regular',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: '#7F7F7F',
    background: '#FFFFFF',
    height: '20px',
    margin: '8px'
  },
  lookbook_order_Active_tab: {
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '20px',
    background: '#313131',
    borderRadius: '99px',
    height: '36px',
    color: '#FFFFFF',
    margin: '8px'
  },
  indicator: {
    background: 'none'
  },
  app_bar: {
    height: '48px',
    border: '1px solid #E7E5E5',
    borderRadius: '99px',
    justifyContent: 'center',
    background: '#FFFFFF'
  },
  date_filter: {
    display: 'flex',
    gap: '8px',
    padding: '12px'
  },

  line: {
    width: '2px',
    height: '20px'
  },
  search_dashboard_actions: {
    fontFamily: 'Jakarta_Text_Regular',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    color: '#978E8A',
    marginTop: '1px'
  },
  actions_container: {
    display: 'flex',
    gap: '8px'
  },
  look_book_order_container: {
    width: '33%'
  },
  look_book_order_inside_container: {
    width: '100%',
    height: '60px',
    background: '#FFFFFF',
    border: '1px solid #E6E6E6',
    borderRadius: '99px'
  },
  look_book_order_container_text: {
    marginLeft: '16px',
    marginTop: '18px',
    display: 'flex',
    gap: '10px'
  },
  look_book_order_text: {
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '28px',
    color: '#313131'
  },
  look_book_order_text2: {
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '28px',
    color: '#313131',
    marginTop: '-4px'
  },
  look_book_order_text3: {
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#7F7F7F',
    marginTop: '4px'
  },
  orders: {
    background: '#FFFFFF',
    border: '1px solid #E6E6E6',
    boxShadow: '0px 10px 72px rgba(49, 49, 49, 0.1)',
    borderRadius: '8px',
    marginTop: '16px',
    display: 'flex',
    padding: '12px',
    justifyContent: 'space-between'
  },
  order_text_container: {
    display: 'grid',
    marginLeft: '10px'
  },
  order_text1: {
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '26px',
    color: '#313131'
  },
  order_text2: {
    fontFamily: 'Jakarta_Text_Regular',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    color: '#7F7F7F'
  },
  order_text_looks: {
    fontFamily: 'Jakarta_Text_Regular',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
    color: '#313131',
    paddingTop: '12px'
  },
  dg: {
    display: 'grid'
  },
  df: {
    display: 'flex'
  },
  mt: {
    marginTop: '24px'
  },
  empty_look_books: {
    height: '555px',
    background: '#F0F0F0',
    borderRadius: '16px',
    marginTop: '24px',
    justifyContent: 'center' as unknown as 'center'
  },
  empty_look_book_text: {
    paddingTop: '25%',
    height: '30px',
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '30px',
    textAlign: 'center' as unknown as 'center',
    color: '#313131'
  },
  fixed_orders_container: {
    boxSizing: 'border-box' as unknown as 'border-box',
    width: '23%',
    height: '50%',
    border: '1px solid #E6E6E6',
    borderRadius: '8px',
    display: 'flex'
  },
  fixed_orders_image: {
    width: '100%',
    height: '100%'
  },
  fixed_order_image_text1: {
    position: 'absolute' as unknown as 'absolute',
    fontFamily: 'Cormorant',
    fontWeight: 300,
    fontSize: '18px',
    lineHeight: '22px',
    letterSpacing: '-0.5px',
    color: '#FFFFFF',
    marginTop: '16px',
    marginLeft: '14%'
  },
  fixed_order_image_text2: {
    position: 'absolute' as unknown as 'absolute',
    fontFamily: 'Cinzel',
    fontWeight: 700,
    fontSize: '36px',
    lineHeight: '49px',
    textAlign: 'center' as unknown as 'center',
    letterSpacing: '-0.5px',
    color: '#FFFFFF',
    transform: 'rotate(-90deg)',
    marginLeft: '-4%',
    marginTop: '21.5%'
  },
  fixed_order_image_text3: {
    position: 'absolute' as unknown as 'absolute',
    fontFamily: 'Cinzel',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '26px',
    textAlign: 'center' as unknown as 'center',
    color: '#F7F7F7',
    marginTop: '27%',
    marginLeft: '12%'
  },
  fixed_order_image_text4: {
    position: 'absolute' as unknown as 'absolute',
    fontFamily: 'Cinzel',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as unknown as 'center',
    color: '#F8F8F8',
    marginLeft: '12%',
    marginTop: '29%'
  },
  errorToast: {
    fontFamily: 'Jakarta_Text_Light'
  },
  tabs: {
    height: '52px',
    alignItems: 'center'
  }
};
export default styles;
