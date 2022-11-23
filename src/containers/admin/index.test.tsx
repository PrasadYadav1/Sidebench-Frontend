/* eslint-disable prefer-promise-reject-errors */
import {
  render,
  screen,
  act,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent
} from '@testing-library/react';
import { AxiosResponse } from 'axios';
import * as apiCalls from '../../utils/apis';
import Admin from './index';
import adminData from '../../mock/tableData';

describe('Tests for Admin lists', () => {
  let tableData: {
    role: { name: string };
    status: { name: string };
    firstname: string;
    lastname: string;
    email: string;
    lastActive: string;
  }[] = [];

  beforeAll(() => {
    tableData = adminData.map((d) => ({
      ...d,
      role: { name: d.role },
      status: { name: d.status }
    }));
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  const assertCommonElements = () => {
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Last Active')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Add Admin')).toBeInTheDocument();
  };

  describe('Admin data on load', () => {
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
      render(<Admin />);
      await act(() => {
        assertCommonElements();
        expect(screen.getByText('Total admins: 0')).toBeInTheDocument();
        expect(screen.queryAllByAltText('data-menu').length).toBe(0);
        expect(
          screen.queryByTestId('admin-error-snackbar-test')
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
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
        expect(screen.getByText('Total admins: 0')).toBeInTheDocument();
        expect(screen.queryAllByAltText('data-menu').length).toBe(0);
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
                rows: tableData,
                count: tableData.length
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
        expect(
          screen.queryByText('Something went wrong. Please contact admin.')
        ).not.toBeInTheDocument();
      });
      expect(
        screen.getByText(`Total admins: ${tableData.length}`)
      ).toBeInTheDocument();
      expect(screen.queryAllByAltText('data-menu').length).toBe(
        tableData.length
      );
    });
    it('Menu should open when click on menu icon', async () => {
      jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: tableData,
                count: tableData.length
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      expect(screen.queryAllByTestId('basic-button'));
      const contextMenu = screen.queryAllByTestId('basic-button');
      fireEvent.click(contextMenu[1]);

      await act(async () => {
        expect(screen.getByTestId('delete-item')).toBeInTheDocument();
        expect(screen.getByTestId('deactive-item')).toBeInTheDocument();
      });
    });
    it('Delete Popup should open when click on delete menu item', async () => {
      jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: tableData,
                count: tableData.length
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      expect(screen.queryAllByTestId('basic-button'));
      const contextMenu = screen.queryAllByTestId('basic-button');
      fireEvent.click(contextMenu[1]);

      await act(async () => {
        expect(screen.getByTestId('delete-item')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId('delete-item'));

      await act(async () => {
        expect(
          screen.getByText('Are you sure you want to delete the Admin?')
        ).toBeInTheDocument();
      });
    });
    it('Deactivate Popup should open when click on deactivate menu item', async () => {
      jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: tableData,
                count: tableData.length
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      expect(screen.queryAllByTestId('basic-button'));
      const contextMenu = screen.queryAllByTestId('basic-button');
      fireEvent.click(contextMenu[1]);

      await act(async () => {
        expect(screen.getByTestId('deactive-item')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId('deactive-item'));

      await act(async () => {
        expect(
          screen.getByText('Are you sure you want to Deactivate the Admin?')
        ).toBeInTheDocument();
      });
    });
  });
  describe('Edit Admin data', () => {
    it('firstname and lastname values should dislay when more than 0 records', async () => {
      jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: tableData,
                count: tableData.length
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      const firstName = screen.getAllByText('Toney');
      const lastName = screen.getAllByText('Bekker');
      expect(firstName[0]).toBeInTheDocument();
      expect(lastName[0]).toBeInTheDocument();
    });
    it('Check and Clear icons should display when click on firstname', async () => {
      jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: tableData,
                count: tableData.length
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      const firstName = screen.getAllByText('Toney');
      expect(firstName[0]).toBeInTheDocument();
      fireEvent.click(firstName[0]);
      expect(screen.getByTestId('check')).toBeInTheDocument();
      expect(screen.getByTestId('clear')).toBeInTheDocument();
    });
    it('Check and Clear icons should hide when click on clear icon', async () => {
      jest.spyOn(apiCalls, 'getApi').mockImplementationOnce(
        () =>
          Promise.resolve({
            data: {
              data: {
                rows: tableData,
                count: tableData.length
              }
            }
          }) as Promise<AxiosResponse<unknown>>
      );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      const firstName = screen.getAllByText('Toney');
      expect(firstName[0]).toBeInTheDocument();
      fireEvent.click(firstName[0]);
      expect(screen.getByTestId('check')).toBeInTheDocument();
      expect(screen.getByTestId('clear')).toBeInTheDocument();
      fireEvent.click(screen.getByTestId('clear'));
      expect(screen.queryByTestId('check')).not.toBeInTheDocument();
      expect(screen.queryByTestId('clear')).not.toBeInTheDocument();
    });
  });
  describe('Admin data on search', () => {
    it('Error popup should display when there is error in api call', async () => {
      jest
        .spyOn(apiCalls, 'getApi')
        .mockImplementationOnce(
          () =>
            Promise.resolve({
              data: {
                data: {
                  rows: tableData,
                  count: tableData.length
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        )
        .mockImplementationOnce(() =>
          Promise.reject(
            new Error('Something went wrong. Please contact admin.')
          )
        );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      expect(
        screen.getByText(`Total admins: ${tableData.length}`)
      ).toBeInTheDocument();
      expect(screen.queryAllByAltText('data-menu').length).toBe(
        tableData.length
      );
      const searchInput = screen
        .queryByTestId('admin-search-test')
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
                  rows: tableData,
                  count: tableData.length
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        )
        .mockImplementationOnce(
          () =>
            Promise.resolve({
              data: {
                data: {
                  rows: tableData.slice(0, 4),
                  count: 4
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      expect(
        screen.getByText(`Total admins: ${tableData.length}`)
      ).toBeInTheDocument();
      expect(screen.queryAllByAltText('data-menu').length).toBe(
        tableData.length
      );
      const searchInput = screen
        .queryByTestId('admin-search-test')
        ?.querySelector('input');
      expect(searchInput).toBeInTheDocument();
      if (searchInput) {
        fireEvent.change(searchInput, { target: { value: 'abcdefgh' } });
        await act(async () => {
          // await new Promise((r) => setTimeout(r, 3500));
        });
        expect(screen.getByText(`Total admins: 4`)).toBeInTheDocument();
        expect(screen.queryAllByAltText('data-menu').length).toBe(4);
      }
    });
  });
  describe('Admin data on date filter', () => {
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
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      expect(screen.getByText(`Total admins: 0`)).toBeInTheDocument();
      expect(screen.queryAllByAltText('data-menu').length).toBe(0);
      const filterInput = screen.queryByPlaceholderText('Sort by date');
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
                  rows: tableData,
                  count: tableData.length
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        )
        .mockImplementationOnce(
          () =>
            Promise.resolve({
              data: {
                data: {
                  rows: tableData.slice(0, 4),
                  count: 4
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      expect(screen.getByText(`Total admins: 9`)).toBeInTheDocument();
      expect(screen.queryAllByAltText('data-menu').length).toBe(
        tableData.length
      );
      const filterInput = screen.queryByPlaceholderText('Sort by date');
      expect(filterInput).toBeInTheDocument();
      if (filterInput) {
        fireEvent.click(filterInput);
        await act(async () => {
          // await new Promise((r) => setTimeout(r, 3500));
        });
        await dateSelect();
        expect(screen.getByText(`Total admins: 4`)).toBeInTheDocument();
        expect(screen.queryAllByAltText('data-menu').length).toBe(4);
      }
    });
  });
  describe('Admin data on pagination', () => {
    it('Error popup should display when there is error in api call', async () => {
      jest
        .spyOn(apiCalls, 'getApi')
        .mockImplementationOnce(
          () =>
            Promise.resolve({
              data: {
                data: {
                  rows: tableData.concat(tableData),
                  count: tableData.length * 2
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        )
        .mockImplementationOnce(() =>
          Promise.reject(
            new Error('Something went wrong. Please contact admin.')
          )
        );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      expect(screen.getByText(`Total admins: 18`)).toBeInTheDocument();
      expect(screen.queryAllByAltText('data-menu').length).toBe(10);
      const pageBtn = screen.queryByRole('button', { name: /2/i });
      expect(pageBtn).toBeInTheDocument();
      if (pageBtn) {
        fireEvent.click(pageBtn);
        await act(async () => {
          // await new Promise((r) => setTimeout(r, 3500));
        });
        expect(
          screen.queryByText('Something went wrong. Please contact admin.')
        ).toBeInTheDocument();
      }
    });
    it('paginated data should display when api call is success', async () => {
      jest
        .spyOn(apiCalls, 'getApi')
        .mockImplementationOnce(
          () =>
            Promise.resolve({
              data: {
                data: {
                  rows: tableData.concat(tableData),
                  count: tableData.length * 2
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        )
        .mockImplementationOnce(
          () =>
            Promise.resolve({
              data: {
                data: {
                  rows: tableData.splice(0, 8),
                  count: 18
                }
              }
            }) as Promise<AxiosResponse<unknown>>
        );
      render(<Admin />);
      await act(async () => {
        assertCommonElements();
      });
      expect(screen.getByText(`Total admins: 18`)).toBeInTheDocument();
      expect(screen.queryAllByAltText('data-menu').length).toBe(10);
      const pageBtn = screen.queryByRole('button', { name: /2/i });
      expect(pageBtn).toBeInTheDocument();
      if (pageBtn) {
        fireEvent.click(pageBtn);
        await act(async () => {
          // await new Promise((r) => setTimeout(r, 3500));
        });
        expect(screen.getByText(`Total admins: 18`)).toBeInTheDocument();
        expect(screen.queryAllByAltText('data-menu').length).toBe(8);
      }
    });
  });
});
