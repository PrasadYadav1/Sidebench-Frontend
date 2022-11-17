import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material';
import React from 'react';
import InputField from '../../components/elements/inputField';
import { theme } from '../../components/header/styles';
import { ORDERS_DATA } from '../../utils/constants';
import styles from './styles';
import OrdersData from './types';

const LookBookOrders: React.FC<{ ordersData: OrdersData[] }> = ({
  ordersData
}) => {
  return (
    <div style={styles.dg}>
      {ordersData.map(({ date, imgSource, name }) => (
        <div style={styles.orders}>
          <div style={styles.df}>
            <img alt="" src={imgSource} />
            <Typography component="div" sx={styles.order_text_container}>
              <Typography
                data-testid="order-text1"
                component="div"
                sx={styles.order_text1}
              >
                {name}
              </Typography>
              <Typography
                data-testid="order-text2"
                component="div"
                sx={styles.order_text2}
              >
                {date}
              </Typography>
            </Typography>
          </div>
          <Typography component="div">
            <IconButton aria-label="more" id="long-button" aria-haspopup="true">
              <img alt="" src="/images/more-vertical.png" />
            </IconButton>
          </Typography>
        </div>
      ))}
    </div>
  );
};

const EmptyLookBooks = () => {
  return (
    <Box sx={styles.empty_look_books}>
      <Typography component="div" style={styles.empty_look_book_text}>
        No Orders in Queue of LookBooks
      </Typography>
    </Box>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = React.useState<number>(1);
  return (
    <div style={styles.container}>
      <Stack direction="row" spacing={2}>
        <div style={styles.analytics}>
          <img src="/images/people.png" alt="" style={styles.analytics_image} />
          <Typography
            data-testid="lookbook-text"
            component="div"
            style={styles.analytics_text}
          >
            LookBooks in Queue
          </Typography>
          <Typography
            data-testid="lookbook-number"
            component="div"
            style={styles.analytics_number}
          >
            230,290,099
          </Typography>
        </div>
        <div style={styles.analytics}>
          <img src="/images/people.png" alt="" style={styles.analytics_image} />
          <Typography
            data-testid="active-text"
            component="div"
            style={styles.analytics_text}
          >
            Active Subscriptions
          </Typography>
          <Typography
            data-testid="active-count"
            component="div"
            style={styles.analytics_number}
          >
            1120
          </Typography>
        </div>
        <div style={styles.analytics}>
          <img src="/images/people.png" alt="" style={styles.analytics_image} />
          <Typography
            data-testid="totalorders-text"
            component="div"
            style={styles.analytics_text}
          >
            Total Orders (1-time Customers)
          </Typography>
          <Typography
            data-testid="totalorders-count"
            component="div"
            style={styles.analytics_number}
          >
            2290
          </Typography>
        </div>
        <div style={styles.analytics}>
          <img src="/images/people.png" alt="" style={styles.analytics_image} />
          <Typography
            data-testid="total-lookbooks"
            component="div"
            style={styles.analytics_text}
          >
            Total LookBooks Created
          </Typography>
          <Typography
            data-testid="total-lookbooks-count"
            component="div"
            style={styles.analytics_number}
          >
            4390
          </Typography>
        </div>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        style={styles.lookbook_order}
      >
        <Typography
          data-testid="lookbook-order"
          style={styles.lookbook_order_text}
        >
          LookBook Order
        </Typography>
        <Tabs
          value={activeTab}
          style={styles.lookbook_order_tabs}
          TabIndicatorProps={{ style: styles.indicator }}
          onChange={(_event: React.SyntheticEvent, newValue: number) =>
            setActiveTab(newValue)
          }
        >
          <Tab
            value={1}
            style={
              activeTab === 1
                ? styles.lookbook_order_Active_tab
                : styles.lookbook_order_tab
            }
            label="New Orders"
          />
          <Tab
            value={2}
            style={
              activeTab === 2
                ? styles.lookbook_order_Active_tab
                : styles.lookbook_order_tab
            }
            label="Finished Orders"
          />
        </Tabs>
      </Stack>
      <ThemeProvider theme={theme}>
        <AppBar position="sticky" color="secondary" style={styles.app_bar}>
          <Toolbar>
            <Typography
              component="div"
              sx={{
                flexGrow: 1
              }}
            >
              <InputField
                id="search"
                name="search"
                type="text"
                placeholder="Search item"
                showSearchIcon
                variant="standard"
                showBorder={false}
                size="small"
              />
            </Typography>
            <Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                <img alt="" src="/images/line.png" style={styles.line} />
                <div style={styles.actions_container}>
                  <img alt="" src="/images/location.png" />
                  <Typography
                    data-testid="action-test1"
                    style={styles.search_dashboard_actions}
                  >
                    Any occation
                  </Typography>
                  <img alt="" src="/images/arrow-down.png" />
                </div>
                <img alt="" src="/images/line.png" style={styles.line} />
                <div style={styles.actions_container}>
                  <img alt="" src="/images/calendar.png" />
                  <Typography
                    data-testid="action-test2"
                    style={styles.search_dashboard_actions}
                  >
                    Any date
                  </Typography>
                  <img alt="" src="/images/arrow-down.png" />
                </div>
                <img alt="" src="/images/line.png" style={styles.line} />
                <div style={styles.actions_container}>
                  <img alt="" src="/images/eye.png" />
                  <Typography
                    data-testid="action-test3"
                    style={styles.search_dashboard_actions}
                  >
                    Any looks
                  </Typography>
                  <img alt="" src="/images/arrow-down.png" />
                </div>
                <img alt="" src="/images/line.png" style={styles.line} />
                <div style={styles.actions_container}>
                  <img alt="" src="/images/status.png" />
                  <Typography
                    data-testid="action-test4"
                    style={styles.search_dashboard_actions}
                  >
                    Any status
                  </Typography>
                  <img alt="" src="/images/arrow-down.png" />
                </div>
              </Stack>
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <Stack direction="row" spacing={2} style={styles.mt}>
        <div style={styles.look_book_order_container}>
          <div style={styles.look_book_order_inside_container}>
            <Typography
              component="div"
              style={styles.look_book_order_container_text}
            >
              <Typography
                data-testid="to-do"
                style={styles.look_book_order_text}
              >
                To Do
              </Typography>
              <Typography
                data-testid="dot1"
                style={styles.look_book_order_text2}
              >
                .
              </Typography>
              <Typography
                data-testid="to-do-count"
                style={styles.look_book_order_text3}
              >
                15
              </Typography>
            </Typography>
          </div>
          <LookBookOrders ordersData={ORDERS_DATA} />
        </div>
        <div style={styles.look_book_order_container}>
          <div style={styles.look_book_order_inside_container}>
            <Typography style={styles.look_book_order_container_text}>
              <Typography
                data-testid="in-progress"
                style={styles.look_book_order_text}
              >
                In Progress
              </Typography>
              <Typography
                data-testid="dot2"
                style={styles.look_book_order_text2}
              >
                .
              </Typography>
              <Typography
                data-testid="in-progress-count"
                style={styles.look_book_order_text3}
              >
                15
              </Typography>
            </Typography>
          </div>
          <LookBookOrders ordersData={ORDERS_DATA} />
        </div>
        <div style={styles.look_book_order_container}>
          <div style={styles.look_book_order_inside_container}>
            <Typography style={styles.look_book_order_container_text}>
              <Typography
                data-testid="queued"
                style={styles.look_book_order_text}
              >
                Queued
              </Typography>
              <Typography
                data-testid="dot3"
                style={styles.look_book_order_text2}
              >
                .
              </Typography>
              <Typography
                data-testid="queued-count"
                style={styles.look_book_order_text3}
              >
                15
              </Typography>
            </Typography>
          </div>
          <LookBookOrders ordersData={ORDERS_DATA} />
        </div>
      </Stack>
    </div>
  );
};

export default Dashboard;
