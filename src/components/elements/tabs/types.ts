interface CustomTabProps {
  activeTab: number;
  setActiveTab(value: React.SetStateAction<number>): void;
  tabList: Array<{ label: string; value: number }>;
}

export default CustomTabProps;
