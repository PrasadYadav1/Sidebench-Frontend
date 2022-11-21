import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react';
import Dashboard from './index';
import * as apiCalls from '../../utils/apis';
import { AxiosResponse } from 'axios';
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
    expect(getByTestId('action-test1')).toBeInTheDocument();
    expect(getByTestId('action-test2')).toBeInTheDocument();
    expect(getByTestId('action-test3')).toBeInTheDocument();
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
