import {
  AppBar,
  Box,
  IconButton,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import InputField from '../../components/elements/inputField';
import Toast from '../../components/elements/toast';
import { theme } from '../../components/header/styles';
import getAPIUrl from '../../config';
import { getApi } from '../../utils/apis';
import { getApiErrorMessage } from '../../utils/commonHelpers';
import styles from './styles';
import TabPanelProps, {
  LookBooksApiProps,
  LookBooksApiResponse,
  LookBooksApiRows
} from './types';

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
};

const LookBookOrders: React.FC<{ lookBooksData: LookBooksApiProps[] }> = ({
  lookBooksData
}) => {
  return (
    <div style={styles.dg}>
      {lookBooksData.map(({ dueBy, customerId }) => (
        <div style={styles.orders} key={customerId}>
          <div style={styles.df}>
            <img alt="" src="" />
            <Typography component="div" sx={styles.order_text_container}>
              <Typography
                data-testid="order-text1"
                component="div"
                sx={styles.order_text1}
              />
              <Typography
                data-testid="order-text2"
                component="div"
                sx={styles.order_text2}
              >
                {new Intl.DateTimeFormat('en-US').format(new Date(dueBy))}
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
      <Typography
        data-testid="empty-lookbooks"
        component="div"
        style={styles.empty_look_book_text}
      >
        No Orders in Queue of LookBooks
      </Typography>
    </Box>
  );
};

const FinishedOrders = () => {
  return (
    <div style={styles.fixed_orders_container}>
      <img
        alt=""
        src="/images/new-order-img.png"
        style={styles.fixed_orders_image}
      />
      <Typography style={styles.fixed_order_image_text1}>3 Looks</Typography>
      <Typography style={styles.fixed_order_image_text2}>Fall 2022</Typography>
      <Typography style={styles.fixed_order_image_text3}>
        Monica Smith
      </Typography>
      <Typography style={styles.fixed_order_image_text4}>09/01/2022</Typography>
    </div>
  );
};

const getLookBooks = async (): Promise<Error | LookBooksApiResponse> => {
  try {
    const adminData: AxiosResponse<LookBooksApiResponse> = await getApi(
      `${getAPIUrl()}/admins/lookbooks`
    );
    return adminData.data;
  } catch (error) {
    return error as Error;
  }
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [openErrorToast, setErrorToast] = useState<boolean>(false);
  const [toastErrorMsg, setToastErrorMsg] = useState<string>('');
  const [lookBooksData, setLookBooksData] = useState<LookBooksApiRows>();

  const onErrorToastClose = () => {
    setErrorToast(false);
  };

  useEffect(function onLoad() {
    const getLookBooksData = async () => {
      const adminData = await getLookBooks();
      if (adminData instanceof Error) {
        const errMsg = getApiErrorMessage(adminData);
        setToastErrorMsg(errMsg);
        setErrorToast(true);
      } else {
        setLookBooksData(adminData.data.rows);
      }
    };
    getLookBooksData();
  }, []);

  return (
    <div style={styles.container}>
      <Toast
        id="lookbook-error"
        open={openErrorToast}
        message={toastErrorMsg}
        severity="error"
        onClose={onErrorToastClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        alertStyles={styles.errorToast}
      />
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
          data-testid="lookbook-tabs"
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

      <TabPanel value={activeTab} index={1}>
        {lookBooksData?.['In Progress'].length &&
        lookBooksData.Queued.length &&
        lookBooksData['To Do'].length ? (
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
                    {lookBooksData?.['To Do'].length}
                  </Typography>
                </Typography>
              </div>
              <LookBookOrders lookBooksData={lookBooksData?.['To Do'] || []} />
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
                    {lookBooksData?.['In Progress'].length}
                  </Typography>
                </Typography>
              </div>
              <LookBookOrders
                lookBooksData={lookBooksData?.['In Progress'] || []}
              />
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
                    {lookBooksData?.Queued.length}
                  </Typography>
                </Typography>
              </div>
              <LookBookOrders lookBooksData={lookBooksData?.Queued || []} />
            </div>
          </Stack>
        ) : (
          <EmptyLookBooks />
        )}
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Stack direction="column" gap="25px" marginTop="24px">
          <Stack direction="row" gap="25px">
            <FinishedOrders />
            <FinishedOrders />
            <FinishedOrders />
            <FinishedOrders />
          </Stack>
          <Stack direction="row" gap="25px">
            <FinishedOrders />
            <FinishedOrders />
            <FinishedOrders />
            <FinishedOrders />
          </Stack>
        </Stack>
      </TabPanel>
    </div>
  );
};

export default Dashboard;
