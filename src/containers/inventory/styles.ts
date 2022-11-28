const styles = {
  container: {
    height: '90%',
    padding: '2%'
  },
  search_grid: {
    alignItems: 'center',
    marginBottom: '34px'
  },
  tabs: {
    width: '95%',
    height: '52px',
    alignItems: 'center'
  },
  filter_icon: {
    marginLeft: 10
  },
  filters_button: {
    height: '40px',
    background: '#848181',
    borderRadius: '100px'
  },
  add_products: {
    height: '40px',
    borderRadius: '100px'
  },
  product_box: {
    background: '#FFFFFF',
    boxShadow: '0px 10px 72px rgba(49, 49, 49, 0.1)',
    borderRadius: '8px',
    padding: '2%'
  },
  image_container: {
    background: '#F7F7F7',
    borderRadius: '8px',
    textAlign: 'center' as unknown as 'center'
  },
  image: {
    height: '100%',
    width: '80%'
  },
  product_text_container: {
    alignItems: 'flex-start',
    display: 'grid',
    gap: '8px',
    marginTop: '10px'
  },
  product_name: {
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#313131'
  },
  product_cost: {
    fontFamily: 'Jakarta_Text_Bold',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '15px',
    color: '#49955A'
  },
  product_action_container: {
    display: 'flex',
    flexDirection: 'row' as unknown as 'row',
    alignItems: 'flex-start' as unknown as 'flex-start',
    gap: '10px',
    marginTop: '20px',
    marginBottom: '20px'
  },
  product_button: {
    borderRadius: '100px',
    width: '100%',
    height: '35px'
  },
  pagination: {
    marginTop: '30px'
  },
  inputfield: {
    height: '40px',
    borderRadius: '100px',
    background: '#FFFFFF'
  },
  filters_count: {
    fontFamily: 'Silka_Bold',
    color: '#FFFFFF',
    backgroundColor: '#8697AB',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    height: 20,
    width: 20,
    borderRadius: 20,
    display: 'flex',
    fontWeight: 700,
    fontSize: 12,
    textTransform: 'uppercase',
    marginLeft: '-7Px',
    marginTop: '-15px',
    position: 'relative'
  }
};

export default styles;
