import { Box, Button, Grid, InputAdornment, Typography } from '@mui/material';
import { useState } from 'react';
import InputField from '../../components/elements/inputField';
import { CustomPagination } from '../../components/elements/pagination';
import CustomTabs from '../../components/elements/tabs';
import INVENTORY_TAB_LIST from '../../utils/constants';
import styles from './styles';

const Inventory = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
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
            setActiveTab={setActiveTab}
            tabList={INVENTORY_TAB_LIST}
            style={styles.tabs}
            id="inventory-tabs"
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((it) => (
          <Grid item xs={4}>
            <Box sx={styles.product_box}>
              <div style={styles.image_container}>
                <img alt="" src="inventory-image.svg" style={styles.image} />
              </div>
              <div style={styles.product_text_container}>
                <Typography
                  data-testid="product-name"
                  style={styles.product_name}
                >
                  Single-breasted Velour Coat
                </Typography>
                <Typography
                  data-testid="product-cost"
                  style={styles.product_cost}
                >
                  $120.00
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
          count={0}
          page={1}
          pageSize={10}
          onChange={(_event: React.ChangeEvent<unknown>, page: number) => {
            console.log(page);
          }}
          currentPageDataLength={0}
        />
      </div>
    </div>
  );
};
export default Inventory;
