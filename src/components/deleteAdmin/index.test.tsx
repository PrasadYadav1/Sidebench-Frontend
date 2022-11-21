import { act, fireEvent, render, screen } from '@testing-library/react';
import DeleteAdmin from '.';

describe('Tests for Delete Admin Popup  ', () => {
  const handleDelete = jest.fn();
  const setDeleteAdmin = jest.fn();

  it('Should popup close when click on cancel button', async () => {
    const { getByRole } = render(
      <DeleteAdmin
        deleteAdmin
        setDeleteAdmin={setDeleteAdmin}
        handleDelete={handleDelete}
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

    await act(async () => {});
    expect(setDeleteAdmin).toHaveBeenCalledTimes(1);
  });

  it('API Should call when click on delete button', async () => {
    const setDeleteAdmin = jest.fn();
    const { getByRole } = render(
      <DeleteAdmin
        deleteAdmin
        setDeleteAdmin={setDeleteAdmin}
        handleDelete={handleDelete}
      />
    );

    expect(screen.getByTestId('delete')).toBeInTheDocument();

    const deleteButton = getByRole('button', {
      name: /Delete/i
    });

    fireEvent.click(deleteButton);

    await act(async () => {});
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
