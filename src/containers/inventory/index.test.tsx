import { render } from '@testing-library/react';
import Inventory from '.';

describe('Inventory Component test', () => {
  it('Inventory should be rendered with descriptions ', () => {
    const { getByText, getByTestId, getAllByTestId } = render(<Inventory />);
    expect(getByTestId('inventory-tabs')).toBeInTheDocument();
    expect(getByText('All')).toBeInTheDocument();
    expect(getByText('Tops')).toBeInTheDocument();
    expect(getByText('Bottoms')).toBeInTheDocument();
    expect(getByText('Dresses')).toBeInTheDocument();
    expect(getByText('Shoes')).toBeInTheDocument();
    expect(getByText('Accessories')).toBeInTheDocument();
    const searchInput = getByTestId('inventory-search')?.querySelector('input');
    expect(searchInput).toBeInTheDocument();
    expect(getByTestId('add-products')).toBeInTheDocument();

    const productName = getAllByTestId('add-products');
    const productCost = getAllByTestId('product-cost');
    const viewProduct = getAllByTestId('view-product');

    expect(productName[0]).toBeInTheDocument();
    expect(productCost[0]).toBeInTheDocument();
    expect(viewProduct[0]).toBeInTheDocument();
    expect(getByTestId('inventory-pagination-test')).toBeInTheDocument();
  });
});
