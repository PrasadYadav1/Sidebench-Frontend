export const LEFT_PANNEL_TEXT = {
  DASHBOARD: 'Dashboard',
  INVENTORY: 'Inventory',
  CUSTOMER_LIST: 'Customer List',
  TEAM: 'Team',
  SETTINGS: 'Settings'
};

export const LEFT_PANNEL_ITEMS = [
  {
    id: 1,
    Icon: '/images/dashboard.png',
    ActiveIcon: '/images/dashboard-active.png',
    text: LEFT_PANNEL_TEXT.DASHBOARD,
    url: '/dashboard'
  },
  {
    id: 2,
    Icon: '/images/inventory.png',
    ActiveIcon: '/images/inventory.png',
    text: LEFT_PANNEL_TEXT.INVENTORY,
    url: '/inventory'
  },
  {
    id: 3,
    Icon: '/images/customer-list.png',
    ActiveIcon: '/images/customer-list.png',
    text: LEFT_PANNEL_TEXT.CUSTOMER_LIST,
    url: '/customer-list'
  },
  {
    id: 4,
    Icon: '/images/team.png',
    ActiveIcon: '/images/team.png',
    text: LEFT_PANNEL_TEXT.TEAM,
    url: '/team'
  },
  {
    id: 5,
    Icon: '/images/settings.png',
    ActiveIcon: '/images/settings.png',
    text: LEFT_PANNEL_TEXT.SETTINGS,
    url: '/settings'
  }
];
