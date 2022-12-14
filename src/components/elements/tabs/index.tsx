import { Tab, TabProps, Tabs } from '@mui/material';
import React from 'react';
import styles from './styles';
import CustomTabProps from './types';

const CustomTabs = ({
  activeTab,
  tabList,
  style,
  id,
  onTabChange
}: CustomTabProps & TabProps) => {
  return (
    <Tabs
      value={activeTab}
      data-testid={id}
      style={{ ...styles.lookbook_order_tabs, ...style }}
      TabIndicatorProps={{ style: styles.indicator }}
      onChange={(_event: React.SyntheticEvent, newValue: number) =>
        onTabChange(newValue)
      }
    >
      {tabList.map((t) => (
        <Tab
          key={t.value}
          value={t.value}
          style={
            activeTab === t.value
              ? styles.lookbook_order_Active_tab
              : styles.lookbook_order_tab
          }
          label={t.label}
        />
      ))}
    </Tabs>
  );
};
export default CustomTabs;
