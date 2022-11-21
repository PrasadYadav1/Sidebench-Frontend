import { act, fireEvent, render, screen } from '@testing-library/react';
import DeleteAdmin from '.';

describe('Tests for Delete Admin Popup  ', () => {
  const setOpenErrorToast = jest.fn();
  const setOpenSuccessToast = jest.fn();
  const setToastErrorMsg = jest.fn();
  const setToastSuccessMsg = jest.fn();

  it('Should popup close when click on cancel button', async () => {
    const setDeleteAdmin = jest.fn();
    const { getByRole } = render(
      <DeleteAdmin
        deleteAdmin
        selectedId={0}
        setDeleteAdmin={setDeleteAdmin}
        setOpenErrorToast={setOpenErrorToast}
        setOpenSuccessToast={setOpenSuccessToast}
        setToastErrorMsg={setToastErrorMsg}
        setToastSuccessMsg={setToastSuccessMsg}
      />
    );

    expect(screen.getByTestId('admin-cancel')).toBeInTheDocument();
    expect(screen.getByTestId('delete')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete the Admin?')
    ).toBeInTheDocument();

    const cancelButton = getByRole('button', {
      name: /Cancel/i
    });

    fireEvent.click(cancelButton);

    act(() => {
      expect(setDeleteAdmin).toBeCalled();
    });
  });
});
