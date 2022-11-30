export interface Currency {
  id: number;
  country: string;
  name: string;
  code: string;
  symbol: string;
}

export interface InventoryApiProps {
  id: 1;
  itemNumber: string;
  url: string;
  imageUrl: string;
  name: string;
  brand: string;
  currencyId: number;
  currency: Currency;
  price: string;
  description: string;
  itemTypeId: 1;
  itemType: {
    name: string;
  };
}

export interface InventoryApiResponse {
  data: {
    rows: Array<InventoryApiProps>;
    count: number;
  };
}

export interface IdName {
  id: number;
  name: string;
}

export interface ItemSubtypes {
  id: number;
  name: string;
  jewelryType: Array<IdName>;
}

export interface ItemTypes {
  id: number;
  name: string;
  typeName: string;
  itemSubType: ItemSubtypes;
  shoeHeight: Array<IdName>;
}

export interface ClothSize {
  id: number;
  name: string;
  usa: string;
  uk: string;
  au: string;
  denim: string;
}

export interface ShoeSize {
  id: number;
  usa: string;
  uk: string;
}

export interface MasterData {
  itemTypes: Array<ItemTypes>;
  attireTypes: Array<IdName>;
  wearTypes: Array<IdName>;
  seasons: Array<IdName>;
  colors: Array<IdName>;
  fit: Array<IdName>;
  waistLocations: Array<IdName>;
  keyWords: Array<IdName>;
  clothSizes: Array<ClothSize>;
  shoeSizes: Array<ShoeSize>;
  currencies: Array<Currency>;
}

export interface MasterDataApiResponse {
  data: MasterData;
  status: string;
}
