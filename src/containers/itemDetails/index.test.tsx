import { act, fireEvent, render, screen } from '@testing-library/react';
import { AxiosResponse } from 'axios';
import { BrowserRouter } from 'react-router-dom';
import ItemDetail from '.';
import { itemDetailData1, itemDetailData2 } from '../../mock/itemDetailsData';
import * as apiCalls from '../../utils/apis';
import Inventory from '../inventory';

describe('Item Detail Component test', () => {
  it('tem Detail should be rendered with descriptions ', () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ItemDetail />
      </BrowserRouter>
    );

    expect(getByTestId('dashboard-button')).toBeInTheDocument();
    expect(getByTestId('item-nav-text')).toBeInTheDocument();
    expect(getByTestId('item-name-text')).toBeInTheDocument();
    expect(getByTestId('item-number-text')).toBeInTheDocument();
    expect(getByTestId('delete-buton')).toBeInTheDocument();
    expect(getByTestId('image-header-text')).toBeInTheDocument();
    expect(getByTestId('item-image')).toBeInTheDocument();
    expect(getByTestId('item-details')).toBeInTheDocument();
    expect(getByTestId('line')).toBeInTheDocument();
    expect(getByTestId('item-details-add-info')).toBeInTheDocument();
  });
});

describe('Item details data on load', () => {
  it('Data should display on api call success with more than 0 records -- shoe with subtype', async () => {
    jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
      () =>
        Promise.resolve({
          data: { data: itemDetailData1 }
        }) as Promise<AxiosResponse<unknown>>
    );

    render(
      <BrowserRouter>
        <ItemDetail />
      </BrowserRouter>
    );
    await act(async () => {
      expect(screen.getByTestId('item-details-add-info')).toBeInTheDocument();
    });

    const dashboardButton = screen.queryByRole('button', {
      name: 'Back to Dashboard'
    });
    if (dashboardButton) {
      fireEvent.click(dashboardButton);
      render(<Inventory />);
      await act(async () => {
        // await new Promise((r) => setTimeout(r, 3500));
      });
    }

    expect(screen.getByTestId('inventory-tabs')).toBeInTheDocument();
  });
  it('Data should display on api call success with more than 0 records -- Garment type', async () => {
    jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
      () =>
        Promise.resolve({
          data: { data: itemDetailData2 }
        }) as Promise<AxiosResponse<unknown>>
    );

    render(
      <BrowserRouter>
        <ItemDetail />
      </BrowserRouter>
    );
    await act(async () => {
      expect(screen.getByTestId('item-details-add-info')).toBeInTheDocument();
    });

    const dashboardButton = screen.queryByRole('button', {
      name: 'Back to Dashboard'
    });
    if (dashboardButton) {
      fireEvent.click(dashboardButton);
      render(<Inventory />);
      await act(async () => {
        // await new Promise((r) => setTimeout(r, 3500));
      });
    }

    expect(screen.getByTestId('inventory-tabs')).toBeInTheDocument();
  });
});
