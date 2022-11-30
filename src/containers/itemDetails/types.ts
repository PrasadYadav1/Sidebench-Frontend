interface ItemFeature {
  id: number;
  name: string;
}

interface ShoeSizeType {
  id: number;
  usa: string;
  uk: string;
}
interface ClothSizeType {
  id: number;
  name: string;
  usa: string;
  uk: string;
}

interface ItemType {
  id: number;
  name: string;
  typeName: string;
}

export interface ItemDetails {
  id: number;
  itemNumber: string;
  url: string;
  imageUrl: string;
  name: string;
  brand: string;
  currencyId: number;
  currency: {
    id: number;
    country: string;
    name: string;
    code: string;
    symbol: string;
  };
  price: '100';
  description: string | null;
  itemType: ItemType;
  itemSubTypes: [
    {
      itemSubType: {
        id: number;
        name: string;
        itemType: ItemType;
      };
    }
  ];
  itemOnAttireTypes: [
    {
      attireType: ItemFeature;
    }
  ];
  itemOnWearTypes: [
    {
      wearType: ItemFeature;
    }
  ];
  itemOnSeasons: [
    {
      season: ItemFeature;
    }
  ];
  itemOnColors: [
    {
      color: ItemFeature;
    }
  ];
  itemOnFit: [
    {
      fit: ItemFeature;
    }
  ];
  itemOnWaistLocation: [
    {
      waistLocation: ItemFeature;
    }
  ];
  itemOnKeyword: [
    {
      keyword: ItemFeature;
    }
  ];
  itemOnClothSize: [
    {
      clothSize: ClothSizeType;
    }
  ];
  itemOnShoeSize: [
    {
      shoeSize: ShoeSizeType;
    }
  ];
  itemOnShoeHeight: [
    {
      shoeHeight: ItemFeature;
    }
  ];
  itemOnJewelryType: [
    {
      jewelryType: ItemFeature;
    }
  ];
}

export interface ItemDetailsResponse {
  data: ItemDetails;
}
