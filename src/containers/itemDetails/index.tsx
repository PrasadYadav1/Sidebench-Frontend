/* eslint-disable no-nested-ternary */
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import styles from './styles';
import { ItemDetailsResponse, ItemDetails } from './types';
import getAPIUrl from '../../config';
import { getApi } from '../../utils/apis';
import { getApiErrorMessage } from '../../utils/commonHelpers';

const getItemDetails = async (
  id: number
): Promise<Error | ItemDetailsResponse> => {
  try {
    const url = `/admins/items/${id}`;

    const itemDetailsData: AxiosResponse<ItemDetailsResponse> = await getApi(
      `${getAPIUrl()}${url}`
    );

    return itemDetailsData.data;
  } catch (error) {
    return error as Error;
  }
};

const ItemDetail: React.FC = () => {
  const [itemDetailsData, setItemDetailsData] = useState<ItemDetails>();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/inventory');
  };

  const { id } = useParams();

  useEffect(function onLoad() {
    const getLookBooksData = async () => {
      const itemData = await getItemDetails(Number(id));
      if (itemData instanceof Error) {
        const errMsg = getApiErrorMessage(itemData);
        setErrorMsg(errMsg);
      } else {
        setItemDetailsData(itemData.data);
      }
    };
    getLookBooksData();
  }, []);

  const isGarment = itemDetailsData?.itemType.typeName === 'Garment';
  const isShoe = itemDetailsData?.itemType.typeName === 'Shoe';

  if (errorMsg) {
    return <div data-testid="on-error">{errorMsg}</div>;
  }

  return (
    <div style={styles.container}>
      <Button
        sx={styles.dashboard_button}
        data-testid="dashboard-button"
        onClick={handleClick}
        startIcon={
          <img
            style={{ width: '24px', height: '24px' }}
            src="/back-arrow.svg"
            alt=""
          />
        }
      >
        Back to Dashboard
      </Button>

      <div data-testid="item-nav-text" style={styles.header_container}>
        <Typography>Dashboard</Typography>
        <img style={styles.header_arrow_image} src="/arrow-right.svg" alt="" />
        <Typography>Inventory</Typography>
        <img style={styles.header_arrow_image} src="/arrow-right.svg" alt="" />
        <Typography sx={styles.header_item_name}>
          {itemDetailsData?.name}
        </Typography>
      </div>

      <div style={styles.item_container}>
        <Stack direction="row" justifyContent="space-between">
          <div style={styles.item_name_container}>
            <Typography data-testid="item-name-text" sx={styles.item_name}>
              {itemDetailsData?.name}
            </Typography>
            <Typography data-testid="item-number-text" sx={styles.item_id}>
              {itemDetailsData?.itemNumber}
            </Typography>
          </div>
          <div style={styles.actions_container}>
            <Button
              data-testid="delete-buton"
              sx={styles.delete_button}
              color="secondary"
            >
              Delete
            </Button>
            <Button
              data-testid="edit-button"
              sx={styles.edit_button}
              color="secondary"
              variant="contained"
            >
              Edit
            </Button>
          </div>
        </Stack>

        <div style={styles.info_container}>
          <div style={styles.item_image_container}>
            <Typography
              data-testid="image-header-text"
              sx={styles.image_header}
            >
              Product Images
            </Typography>
            <div data-testid="item-image" style={styles.image_container}>
              <img
                style={styles.image}
                src={itemDetailsData?.imageUrl}
                alt=""
              />
            </div>
          </div>

          <div style={styles.details_container}>
            <div data-testid="item-details" style={styles.details}>
              <Box sx={styles.detail_box}>
                <Grid sx={{ margin: '10%' }}>
                  <Typography sx={styles.detail_box_grid_name}>
                    Brand Name
                  </Typography>
                  <Typography sx={styles.detail_box_grid_value}>
                    {itemDetailsData?.brand}
                  </Typography>
                </Grid>
              </Box>
              <Box sx={styles.detail_box}>
                <Grid sx={{ margin: '10%' }}>
                  <Typography sx={styles.detail_box_grid_name}>
                    Price
                  </Typography>
                  <Typography sx={styles.detail_box_grid_value}>
                    {itemDetailsData?.currency.symbol}
                    {itemDetailsData?.price}
                  </Typography>
                </Grid>
              </Box>
              <Box sx={styles.detail_box}>
                <Grid sx={{ margin: '10%' }}>
                  <Typography sx={styles.detail_box_grid_name}>URL</Typography>
                  <Button
                    sx={styles.url_button}
                    data-testid="url-button"
                    startIcon={
                      <img
                        style={{ width: '18px', height: '18px' }}
                        src="/link.svg"
                        alt=""
                      />
                    }
                    variant="contained"
                    color="secondary"
                  >
                    Click Here
                  </Button>
                </Grid>
              </Box>
              <Box sx={styles.detail_box}>
                <Grid sx={{ margin: '10%' }}>
                  <Typography sx={styles.detail_box_grid_name}>
                    Image URL
                  </Typography>
                  <Button
                    sx={styles.url_button}
                    data-testid="url-button"
                    startIcon={
                      <img
                        style={{ width: '18px', height: '18px' }}
                        src="/image.svg"
                        alt=""
                      />
                    }
                    variant="contained"
                    color="secondary"
                  >
                    View Image
                  </Button>
                </Grid>
              </Box>
            </div>

            <hr data-testid="line" style={styles.header} />

            <div data-testid="item-details-add-info">
              <Typography sx={styles.add_info_text}>
                Additional Information
              </Typography>

              <div style={styles.add_info_features}>
                <div style={styles.feature_container}>
                  <Typography sx={styles.feature_type_name}>
                    Item Type
                  </Typography>
                  <Typography sx={styles.feature_type_value}>
                    {itemDetailsData?.itemType.name}
                  </Typography>
                </div>

                <div style={styles.feature_container}>
                  <Typography sx={styles.feature_type_name}>Season</Typography>
                  <Typography sx={styles.feature_type_value}>
                    {itemDetailsData?.itemOnSeasons
                      .map((x) => x.season.name)
                      .join(', ')}
                  </Typography>
                </div>

                <div style={styles.feature_container}>
                  <Typography sx={styles.feature_type_name}>
                    Waist/Hip Location
                  </Typography>
                  <Typography sx={styles.feature_type_value}>
                    {itemDetailsData?.itemOnWaistLocation
                      .map((x) => x.waistLocation.name)
                      .join(', ')}
                  </Typography>
                </div>

                <div style={styles.feature_container}>
                  <Typography sx={styles.feature_type_name}>Colors</Typography>
                  <Typography sx={styles.feature_type_value}>
                    {itemDetailsData?.itemOnColors
                      .map((x) => x.color.name)
                      .join(', ')}
                  </Typography>
                </div>

                <div style={styles.feature_container}>
                  <Typography sx={styles.feature_type_name}>
                    Attire Type
                  </Typography>
                  <Typography sx={styles.feature_type_value}>
                    {itemDetailsData?.itemOnAttireTypes
                      .map((x) => x.attireType.name)
                      .join(', ')}
                  </Typography>
                </div>

                <div style={styles.feature_container}>
                  <Typography sx={styles.feature_type_name}>
                    Condition
                  </Typography>
                  <Typography sx={styles.feature_type_value}>
                    {itemDetailsData?.itemOnWearTypes
                      .map((x) => x.wearType.name)
                      .join(', ')}
                  </Typography>
                </div>

                <div style={styles.feature_container}>
                  <Typography sx={styles.feature_type_name}>Fit</Typography>
                  <Typography sx={styles.feature_type_value}>
                    {itemDetailsData?.itemOnFit
                      .map((x) => x.fit.name)
                      .join(', ')}
                  </Typography>
                </div>

                <div style={styles.feature_container}>
                  <Typography sx={styles.feature_type_name}>
                    Keywords
                  </Typography>
                  <Typography sx={styles.feature_type_value}>
                    {itemDetailsData?.itemOnKeyword
                      .map((x) => x.keyword.name)
                      .join(', ')}
                  </Typography>
                </div>

                {itemDetailsData && itemDetailsData?.itemSubTypes.length > 0 ? (
                  <div style={styles.feature_container}>
                    <Typography sx={styles.feature_type_name}>
                      {itemDetailsData.itemType.name} Type
                    </Typography>
                    <Typography sx={styles.feature_type_value}>
                      {itemDetailsData?.itemSubTypes
                        .map((x) => x.itemSubType.name)
                        .join(', ')}
                    </Typography>
                  </div>
                ) : undefined}

                {isShoe ? (
                  <div style={styles.feature_container}>
                    <Typography sx={styles.feature_type_name}>
                      Shoe Height
                    </Typography>
                    <Typography sx={styles.feature_type_value}>
                      {itemDetailsData?.itemOnShoeHeight
                        .map((x) => x.shoeHeight.name)
                        .join(', ')}
                    </Typography>
                  </div>
                ) : undefined}

                <div style={styles.feature_container}>
                  <Typography sx={styles.feature_type_name}>Size</Typography>
                  <Typography sx={styles.feature_type_value}>
                    {isGarment
                      ? itemDetailsData?.itemOnClothSize
                          .map((x) => x.clothSize.name)
                          .join(', ')
                      : isShoe
                      ? itemDetailsData?.itemOnShoeSize
                          .map((x) => x.shoeSize.usa)
                          .join(', ')
                      : 'NA'}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
