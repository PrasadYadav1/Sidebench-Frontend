import {
  fireEvent,
  render,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LEFT_PANNEL_TEXT } from '../../utils/constants';
import LeftPannel from './index';
import * as tokenUtils from '../../utils/commonHelpers';
import { act } from 'react-dom/test-utils';

describe('LeftPannel Component test', () => {
  it('Left Pannel icons should be rendered when items', () => {
    const { getByText } = render(<LeftPannel />, { wrapper: MemoryRouter });
    expect(getByText(LEFT_PANNEL_TEXT.DASHBOARD)).toBeInTheDocument();
    expect(getByText(LEFT_PANNEL_TEXT.INVENTORY)).toBeInTheDocument();
    expect(getByText(LEFT_PANNEL_TEXT.CUSTOMER_LIST)).toBeInTheDocument();
    expect(getByText(LEFT_PANNEL_TEXT.TEAM)).toBeInTheDocument();
    expect(getByText(LEFT_PANNEL_TEXT.SETTINGS)).toBeInTheDocument();
    expect(getByText(LEFT_PANNEL_TEXT.LOGOUT)).toBeInTheDocument();
  });

  it('Check for logout alert popup', async () => {
    const { getByText } = render(<LeftPannel />, { wrapper: MemoryRouter });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 1000));
      const logoutItem = getByText(LEFT_PANNEL_TEXT.LOGOUT);
      fireEvent.click(logoutItem);
      expect(getByText('Logout')).toBeInTheDocument();
    });
  });

  it('Should close logout alert popup when click on cancel', async () => {
    const { getByText, getByRole, getByTestId, queryByText } = render(
      <LeftPannel />,
      {
        wrapper: MemoryRouter
      }
    );
    const logoutItem = getByText(LEFT_PANNEL_TEXT.LOGOUT);
    fireEvent.click(logoutItem);

    const cancelBtn = getByRole('button', {
      name: /Cancel/i
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
      expect(getByTestId('logout-button')).toBeInTheDocument();
      fireEvent.click(cancelBtn);
      await new Promise((r) => setTimeout(r, 500));
    });
  });

  it('Should clear local storage when click on logout ', async () => {
    const spy = jest
      .spyOn(tokenUtils, 'clearLocalStorage')
      .mockImplementationOnce(() => null);
    const { getByRole, getByText, getByTestId } = render(<LeftPannel />, {
      wrapper: MemoryRouter
    });
    const logoutItem = getByText(LEFT_PANNEL_TEXT.LOGOUT);
    fireEvent.click(logoutItem);

    const logOutBtn = getByRole('button', {
      name: /Logout/i
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 500));
      expect(getByTestId('logout-button')).toBeInTheDocument();
      fireEvent.click(logOutBtn);
      await new Promise((r) => setTimeout(r, 1000));
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
