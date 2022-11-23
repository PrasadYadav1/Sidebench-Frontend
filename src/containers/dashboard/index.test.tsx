import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import { AxiosResponse } from 'axios';
import Dashboard from './index';
import * as apiCalls from '../../utils/apis';
import lookBooksData from '../../mock/lookBooksData';

describe('Dashboard Component test', () => {
  it('Dashboard should be rendered with descriptions ', () => {
    const { getByText, getByTestId } = render(<Dashboard />);
    expect(getByTestId('lookbook-text')).toBeInTheDocument();
    expect(getByTestId('lookbook-number')).toBeInTheDocument();
    expect(getByTestId('active-text')).toBeInTheDocument();
    expect(getByTestId('active-count')).toBeInTheDocument();
    expect(getByTestId('totalorders-text')).toBeInTheDocument();
    expect(getByTestId('totalorders-count')).toBeInTheDocument();
    expect(getByTestId('total-lookbooks')).toBeInTheDocument();
    expect(getByTestId('total-lookbooks-count')).toBeInTheDocument();
    expect(getByTestId('lookbook-order')).toBeInTheDocument();
    expect(getByText('New Orders')).toBeInTheDocument();
    expect(getByText('Finished Orders')).toBeInTheDocument();
    expect(getByText('Finished Orders')).toBeInTheDocument();
    expect(getByTestId('search')).toBeInTheDocument();
    expect(getByTestId('action-test2')).toBeInTheDocument();
  });

  describe('Lookbooks data on load', () => {
    it('Empty Lookbooks when no data', async () => {
      jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: {
                  'To Do': [],
                  'In Progress': [],
                  Queued: []
                },
                count: 0
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Dashboard />);
      await act(async () => {
        expect(screen.getByTestId('lookbook-tabs')).toBeInTheDocument();
        expect(
          screen.queryByTestId('lookbook-error-snackbar-test')
        ).not.toBeInTheDocument();
        expect(screen.getByTestId('empty-lookbooks')).toBeInTheDocument();
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
      render(<Dashboard />);
      await act(async () => {
        expect(screen.getByTestId('empty-lookbooks')).toBeInTheDocument();
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
                rows: lookBooksData,
                count: 1
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Dashboard />);
      await act(async () => {
        expect(
          screen.queryByText('Something went wrong. Please contact admin.')
        ).not.toBeInTheDocument();
      });
      const orders = screen.getAllByTestId('order-text1');
      expect(orders[0]).toBeInTheDocument();
    });
  });
});
describe('Lookbooks data on search', () => {
  it('Error popup should display when there is error in api call', async () => {
    jest
      .spyOn(apiCalls, 'getApi')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: lookBooksData,
                count: 3
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      )
      .mockImplementationOnce(() =>
        Promise.reject(new Error('Something went wrong. Please contact admin.'))
      );
    render(<Dashboard />);

    const searchInput = screen
      .queryByTestId('lookbook-search')
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
    jest
      .spyOn(apiCalls, 'getApi')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: lookBooksData,
                count: 3
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: lookBooksData,
                count: 3
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
    render(<Dashboard />);

    const searchInput = screen
      .queryByTestId('lookbook-search')
      ?.querySelector('input');
    expect(searchInput).toBeInTheDocument();
    if (searchInput) {
      fireEvent.change(searchInput, { target: { value: 'abcdefgh' } });
      await act(async () => {
        // await new Promise((r) => setTimeout(r, 3500));
      });
      const orders = screen.getAllByTestId('order-text1');
      expect(orders[0]).toBeInTheDocument();
    }
  });
});
describe('Lookbook data on date filter', () => {
  const dateSelect = async () => {
    const firstDay = screen.queryAllByText('1')[0];
    expect(firstDay).toHaveAttribute('aria-disabled', 'false');
    fireEvent.click(firstDay);
    await act(async () => {
      // await new Promise((r) => setTimeout(r, 3500));
    });
    fireEvent.click(firstDay);
    await act(async () => {
      // await new Promise((r) => setTimeout(r, 3500));
    });
  };

  it('Error popup should display when there is error in api call', async () => {
    jest
      .spyOn(apiCalls, 'getApi')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: {
                  'To Do': [],
                  'In Progress': [],
                  Queued: []
                },
                count: 0
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      )
      .mockImplementationOnce(() =>
        Promise.reject(new Error('Something went wrong. Please contact admin.'))
      );
    render(<Dashboard />);
    const filterInput = screen.queryByPlaceholderText('Sort by due date');

    expect(filterInput).toBeInTheDocument();
    if (filterInput) {
      fireEvent.click(filterInput);
      await act(async () => {
        // await new Promise((r) => setTimeout(r, 3500));
      });
      await dateSelect();
      expect(
        screen.queryByText('Something went wrong. Please contact admin.')
      ).toBeInTheDocument();
    }
  });
  it('Data should display on search api call success with more than 0 records', async () => {
    jest
      .spyOn(apiCalls, 'getApi')
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: lookBooksData,
                count: 3
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      )
      .mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: lookBooksData,
                count: 3
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
    render(<Dashboard />);

    const filterInput = screen.queryByPlaceholderText('Sort by due date');

    expect(filterInput).toBeInTheDocument();
    if (filterInput) {
      fireEvent.click(filterInput);
      await act(async () => {
        // await new Promise((r) => setTimeout(r, 3500));
      });
      await dateSelect();
      const orders = screen.getAllByTestId('order-text1');
      expect(orders[0]).toBeInTheDocument();
    }
  });
});
