import { act, fireEvent, render, screen } from '@testing-library/react';
import DeactiveAdmin from '.';

describe('Tests for Delete Admin Popup  ', () => {
  it('Should popup close when click on cancel button', async () => {
    const setDeactiveAdmin = jest.fn();
    const setOpenErrorToast = jest.fn();
    const setOpenSuccessToast = jest.fn();
    const setToastErrorMsg = jest.fn();
    const setToastSuccessMsg = jest.fn();
    const { getByRole } = render(
      <DeactiveAdmin
        deactiveAdmin
        selectedId={0}
        setDeactiveAdmin={setDeactiveAdmin}
        setOpenErrorToast={setOpenErrorToast}
        setOpenSuccessToast={setOpenSuccessToast}
        setToastErrorMsg={setToastErrorMsg}
        setToastSuccessMsg={setToastSuccessMsg}
      />
    );

    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
    expect(screen.getByTestId('deactive-button')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to Deactive the Admin?')
    ).toBeInTheDocument();

    const cancelButton = getByRole('button', {
      name: /Cancel/i
    });

    fireEvent.click(cancelButton);

    act(() => {
      expect(setDeactiveAdmin).toBeCalled();
    });
  });
});
