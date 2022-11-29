interface CustomTabProps {
  activeTab: number;
  tabList: Array<{ label: string; value: number }>;
  onTabChange(value: number): void;
}

export default CustomTabProps;
