import { Box, Button, Grid, InputAdornment, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import InputField from '../../components/elements/inputField';
import { CustomPagination } from '../../components/elements/pagination';
import CustomTabs from '../../components/elements/tabs';
import Toast from '../../components/elements/toast';
import getAPIUrl from '../../config';
import { getApi } from '../../utils/apis';
import { getApiErrorMessage } from '../../utils/commonHelpers';
import INVENTORY_TAB_LIST from '../../utils/constants';
import styles from './styles';
import { InventoryApiProps, InventoryApiResponse } from './types';

const getInventoryList = async (
  page: number,
  garment: number,
  search?: string
): Promise<Error | InventoryApiResponse> => {
  let url = `admins/items?page=${page}&pageSize=10`;
  if (garment && garment !== 4) {
    url = `${url}&itemTypeId=${garment}`;
  } else if (garment && garment === 4) {
    url = `${url}&itemTypeId=4&itemTypeId=5&itemTypeId=6`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  try {
    const inventoryData: AxiosResponse<InventoryApiResponse> = await getApi(
      `${getAPIUrl()}/${url}`
    );
    return inventoryData.data;
  } catch (error) {
    return error as Error;
  }
};

const Inventory = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [openErrorToast, setErrorToast] = useState(false);
  const [toastErrorMsg, setToastErrorMsg] = useState('');
  const [data, setData] = useState<Array<InventoryApiProps>>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(function onLoad() {
    const getAdmins = async () => {
      const inventoryData = await getInventoryList(page, activeTab, search);
      if (inventoryData instanceof Error) {
        const errMsg = getApiErrorMessage(inventoryData);
        setToastErrorMsg(errMsg);
        setErrorToast(true);
      } else {
        setData(inventoryData.data.rows);
        setTotalCount(20);
      }
    };
    getAdmins();
  }, []);

  const onErrorToastClose = () => {
    setErrorToast(false);
  };

  const onSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    const inventoryData = await getInventoryList(page, activeTab, val);
    if (inventoryData instanceof Error) {
      const errMsg = getApiErrorMessage(inventoryData);
      setToastErrorMsg(errMsg);
      setErrorToast(true);
    } else {
      setData(inventoryData.data.rows);
      setTotalCount(inventoryData.data.count);
    }
  };

  const onPageChange = async (event: ChangeEvent<unknown>, pageNo: number) => {
    setPage(pageNo);
    const inventoryData = await getInventoryList(pageNo, activeTab, search);
    if (inventoryData instanceof Error) {
      const errMsg = getApiErrorMessage(inventoryData);
      setToastErrorMsg(errMsg);
      setErrorToast(true);
    } else {
      setData(inventoryData.data.rows);
      setTotalCount(inventoryData.data.count);
    }
  };

  const onTabChange = async (value: number) => {
    const inventoryData = await getInventoryList(page, value, search);
    if (inventoryData instanceof Error) {
      const errMsg = getApiErrorMessage(inventoryData);
      setToastErrorMsg(errMsg);
      setErrorToast(true);
    } else {
      setData(inventoryData.data.rows);
    }
  };

  return (
    <div style={styles.container}>
      <Grid
        container
        justifyContent="space-between"
        columns={16}
        sx={styles.search_grid}
      >
        <Grid item xs={8}>
          <CustomTabs
            activeTab={activeTab}
            tabList={INVENTORY_TAB_LIST}
            style={styles.tabs}
            id="inventory-tabs"
            onTabChange={(value) => {
              setActiveTab(value);
              onTabChange(value);
            }}
          />
        </Grid>
        <Grid item xs={8} direction="row">
          <Grid container spacing={1}>
            <Grid item xs={8}>
              <InputField
                id="search"
                name="search"
                type="text"
                placeholder="Search item"
                showSearchIcon
                data-testid="inventory-search"
                size="small"
                style={styles.inputfield}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img alt="" src="line.svg" />
                      <img alt="" src="filter.svg" style={styles.filter_icon} />
                      <Typography sx={styles.filters_count}>{11}</Typography>
                    </InputAdornment>
                  )
                }}
                onChange={onSearchChange}
                value={search}
              />
            </Grid>
            <Grid item>
              <Button
                sx={styles.add_products}
                startIcon={<img src="add.svg" alt="" />}
                color="secondary"
                variant="contained"
                data-testid="add-products"
              >
                Add Products
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={2} columns={16}>
        {data.map((d) => (
          <Grid item xs={4} key={d.id}>
            <Box sx={styles.product_box}>
              <div style={styles.image_container}>
                <img alt="" src={d.imageUrl} style={styles.image} />
              </div>
              <div style={styles.product_text_container}>
                <Typography
                  data-testid="product-name"
                  style={styles.product_name}
                >
                  {d.name}
                </Typography>
                <Typography
                  data-testid="product-cost"
                  style={styles.product_cost}
                >
                  {d.currency.symbol}
                  {d.price}
                </Typography>
              </div>
              <div style={styles.product_action_container}>
                <img alt="" src="more-horizontal.svg" />
                <Button
                  data-testid="view-product"
                  color="secondary"
                  variant="contained"
                  style={styles.product_button}
                >
                  View Product
                </Button>
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>

      <div style={styles.pagination}>
        <CustomPagination
          id="inventory"
          count={totalCount}
          page={page ?? 1}
          pageSize={10}
          onChange={onPageChange}
          currentPageDataLength={data.length}
        />
      </div>

      <Toast
        id="inventory-error"
        open={openErrorToast}
        message={toastErrorMsg}
        severity="error"
        onClose={onErrorToastClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        alertStyles={styles.toastText}
      />
    </div>
  );
};
export default Inventory;
