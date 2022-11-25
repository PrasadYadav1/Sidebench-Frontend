import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import InputField from '../../components/elements/inputField';
import Toast from '../../components/elements/toast';
import getAPIUrl from '../../config';
import { getApi } from '../../utils/apis';
import { getApiErrorMessage } from '../../utils/commonHelpers';
import styles from './styles';
import TabPanelProps, {
  LookBooksApiProps,
  LookBooksApiResponse,
  LookBooksApiRows
} from './types';
import DateRangePicker from '../../components/elements/daterangepicker';
import CustomTabs from '../../components/elements/tabs';

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
      {lookBooksData.map(({ dueBy, customerId, noOfLooks }) => (
        <div style={styles.orders} key={customerId}>
          <div style={styles.df}>
            <Typography component="div" sx={styles.order_text_container}>
              <Typography
                data-testid="order-text1"
                component="div"
                sx={styles.order_text1}
              >
                Monica Smith
              </Typography>
              <Typography
                data-testid="order-text2"
                component="div"
                sx={styles.order_text2}
              >
                {`Due by: ${new Intl.DateTimeFormat('en-US').format(
                  new Date(dueBy)
                )}`}
              </Typography>
            </Typography>
          </div>
          <Typography
            data-testid="order-text-looks"
            component="div"
            sx={styles.order_text_looks}
          >{`${noOfLooks} Looks`}</Typography>
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

const getLookBooks = async (
  dates: [Date | null, Date | null],
  searchText?: string
): Promise<Error | LookBooksApiResponse> => {
  try {
    let url = `/admins/lookbooks?`;

    url = searchText ? `${url}&search=${searchText}` : url;

    if (dates[0] && dates[1]) {
      url = `${url}&fromDate=${dates[0]}&toDate=${dates[1]}`;
    }
    const adminData: AxiosResponse<LookBooksApiResponse> = await getApi(
      `${getAPIUrl()}${url}`
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
  const [searchText, setSearchText] = useState<string>('');
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const onErrorToastClose = () => {
    setErrorToast(false);
  };

  const onSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchText(val);
    const lookbooksData = await getLookBooks(
      [dateRange.start, dateRange.end],
      searchText
    );
    if (lookbooksData instanceof Error) {
      const errMsg = getApiErrorMessage(lookbooksData);
      setToastErrorMsg(errMsg);
      setErrorToast(true);
    } else {
      setLookBooksData(lookbooksData.data.rows);
    }
  };

  const onDateRangeChange = async (dates: [Date | null, Date | null]) => {
    setDateRange((prev) => ({ ...prev, start: dates[0], end: dates[1] }));
    if ((dates[0] && dates[1]) || (!dates[0] && !dates[1])) {
      const lookbooksData = await getLookBooks(dates, searchText);
      if (lookbooksData instanceof Error) {
        const errMsg = getApiErrorMessage(lookbooksData);
        setToastErrorMsg(errMsg);
        setErrorToast(true);
      } else {
        setLookBooksData(lookbooksData.data.rows);
      }
    }
  };

  useEffect(function onLoad() {
    const getLookBooksData = async () => {
      const adminData = await getLookBooks(
        [dateRange.start, dateRange.end],
        searchText
      );
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

        <CustomTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabList={[
            { label: 'New Orders', value: 1 },
            { label: 'Finished Orders', value: 2 }
          ]}
          style={styles.tabs}
          id="lookbook-tabs"
        />
      </Stack>
      <div style={styles.actions_container}>
        <Typography component="div" sx={{ ...styles.app_bar, flexGrow: 1 }}>
          <InputField
            id="search"
            name="search"
            type="text"
            placeholder="Search item"
            showSearchIcon
            variant="standard"
            showBorder={false}
            size="small"
            onChange={onSearchChange}
            data-testid="lookbook-search"
          />
        </Typography>
        <div style={styles.app_bar}>
          <DateRangePicker
            customInput={
              <div style={styles.date_filter}>
                <img alt="" src="/images/calendar.png" />
                <Typography
                  data-testid="action-test2"
                  style={styles.search_dashboard_actions}
                >
                  Due date
                </Typography>
                <img alt="" src="/images/arrow-down.png" />
              </div>
            }
            id="due-by"
            startDate={dateRange.start}
            endDate={dateRange.end}
            onChange={onDateRangeChange}
            placeholder="Sort by due date"
            data-testid="due-by-date"
          />
        </div>
      </div>

      <TabPanel value={activeTab} index={1}>
        {lookBooksData?.['In Progress'].length ||
        lookBooksData?.Queued.length ||
        lookBooksData?.['To Do'].length ? (
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
