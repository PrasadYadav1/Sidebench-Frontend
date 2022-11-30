import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import { AxiosResponse } from 'axios';
import Inventory from '.';
import inventoryData from '../../mock/inventoryData';
import * as apiCalls from '../../utils/apis';

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
    expect(getByTestId('inventory-pagination-test')).toBeInTheDocument();
  });

  describe('Inventory data on load', () => {
    it('Empty table when no data', async () => {
      jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: [],
                count: 0
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Inventory />);
      await act(async () => {
        expect(screen.queryAllByTestId('product-name').length).toBe(0);
        expect(screen.queryAllByTestId('product-cost').length).toBe(0);
        expect(screen.queryAllByTestId('view-product').length).toBe(0);
        expect(
          screen.queryByTestId('inventory-error-snackbar-test')
        ).not.toBeInTheDocument();
      });
    });
    it('Error popup should display when there is error in api call', async () => {
      jest
        .spyOn(apiCalls, 'getApi')
        .mockImplementationOnce(() =>
          Promise.reject(
            new Error('Something went wrong. Please contact admin.')
          )
        );
      render(<Inventory />);
      await act(async () => {
        expect(screen.queryAllByTestId('product-name').length).toBe(0);
        expect(screen.queryAllByTestId('product-cost').length).toBe(0);
        expect(screen.queryAllByTestId('view-product').length).toBe(0);
      });
      await waitFor(() => {
        expect(
          screen.queryByText('Something went wrong. Please contact admin.')
        ).toBeInTheDocument();
      });
      await waitForElementToBeRemoved(
        () => screen.queryByText('Something went wrong. Please contact admin.'),
        { timeout: 3500 }
      );
    });
    it('Data should display on api call success with more than 0 records', async () => {
      jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: inventoryData,
                count: inventoryData.length
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Inventory />);
      await act(async () => {
        expect(
          screen.queryByText('Something went wrong. Please contact admin.')
        ).not.toBeInTheDocument();
      });
      expect(screen.getAllByTestId('product-name').length).toBe(1);
      expect(screen.getAllByTestId('product-cost').length).toBe(1);
      expect(screen.getAllByTestId('view-product').length).toBe(1);
    });
  });
  describe('Inventory data on search', () => {
    it('Error popup should display when there is error in api call', async () => {
      jest
        .spyOn(apiCalls, 'getApi')
        .mockImplementationOnce(
          () =>
            Promise.resolve({
              data: {
                data: {
                  rows: inventoryData,
                  count: inventoryData.length
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        )
        .mockImplementationOnce(() =>
          Promise.reject(
            new Error('Something went wrong. Please contact admin.')
          )
        );
      render(<Inventory />);
      expect(screen.queryAllByTestId('product-name').length).toBe(0);
      expect(screen.queryAllByTestId('product-cost').length).toBe(0);
      expect(screen.queryAllByTestId('view-product').length).toBe(0);
      const searchInput = screen
        .queryByTestId('inventory-search')
        ?.querySelector('input');
      expect(searchInput).toBeInTheDocument();
      if (searchInput) {
        fireEvent.change(searchInput, { target: { value: 'abcdefgh' } });
        await act(async () => {
          // await new Promise((r) => setTimeout(r, 3500));
        });
        await waitFor(() => {
          expect(
            screen.queryByText('Something went wrong. Please contact admin.')
          ).toBeInTheDocument();
        });
      }
    });
    it('Data should display on search api call success with more than 0 records', async () => {
      jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: inventoryData,
                count: inventoryData.length
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );

      render(<Inventory />);

      const searchInput = screen
        .queryByTestId('inventory-search')
        ?.querySelector('input');
      expect(searchInput).toBeInTheDocument();

      if (searchInput) {
        fireEvent.change(searchInput, { target: { value: 'abcdefgh' } });
        await act(async () => {
          // await new Promise((r) => setTimeout(r, 3500));
        });
        expect(screen.queryAllByTestId('product-name').length).toBe(1);
        expect(screen.queryAllByTestId('product-cost').length).toBe(1);
        expect(screen.queryAllByTestId('view-product').length).toBe(1);
      }
    });
  });
  describe('Inventory data on garments filter', () => {
    it('Error popup should display when there is error in api call', async () => {
      jest
        .spyOn(apiCalls, 'getApi')
        .mockImplementationOnce(
          () =>
            Promise.resolve({
              data: {
                data: {
                  rows: [],
                  count: 0
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        )
        .mockImplementationOnce(() =>
          Promise.reject(
            new Error('Something went wrong. Please contact admin.')
          )
        );
      render(<Inventory />);

      const garment = screen.getByText('All');
      expect(garment).toBeInTheDocument();
      if (garment) {
        fireEvent.click(garment);
        await act(async () => {
          // await new Promise((r) => setTimeout(r, 3500));
        });
        expect(screen.queryAllByTestId('product-name').length).toBe(0);
        expect(screen.queryAllByTestId('product-cost').length).toBe(0);
        expect(screen.queryAllByTestId('view-product').length).toBe(0);
      }
    });
    it('Data should display on garment api call success with more than 0 records', async () => {
      jest
        .spyOn(apiCalls, 'getApi')
        .mockImplementationOnce(
          () =>
            Promise.resolve({
              data: {
                data: {
                  rows: inventoryData,
                  count: inventoryData.length
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        )
        .mockImplementationOnce(
          () =>
            Promise.resolve({
              data: {
                data: {
                  rows: inventoryData,
                  count: inventoryData.length
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        );
      render(<Inventory />);

      const garment = screen.getByText('All');
      expect(garment).toBeInTheDocument();
      if (garment) {
        fireEvent.click(garment);
        await act(async () => {
          // await new Promise((r) => setTimeout(r, 3500));
        });
        expect(screen.getAllByTestId('product-name').length).toBe(1);
        expect(screen.getAllByTestId('product-cost').length).toBe(1);
        expect(screen.getAllByTestId('view-product').length).toBe(1);
      }
    });
  });
  describe('Inventory data on pagination', () => {
    it('Error popup should display when there is error in api call', async () => {
      jest
        .spyOn(apiCalls, 'getApi')
        .mockImplementationOnce(() =>
          Promise.reject(
            new Error('Something went wrong. Please contact admin.')
          )
        );
      render(<Inventory />);

      await act(async () => {
        // await new Promise((r) => setTimeout(r, 3500));
      });
      await waitFor(() => {
        expect(
          screen.queryByText('Something went wrong. Please contact admin.')
        ).toBeInTheDocument();
      });
    });
  });
});
