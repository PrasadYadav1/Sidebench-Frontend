import { act, fireEvent, render } from '@testing-library/react';
import DeleteAdmin from '.';

it('Should clear local storage when click on logout ', async () => {
  const setDeleteAdmin = jest.fn();
  const { getByTestId } = render(
    <DeleteAdmin deleteAdmin selectedId={0} setDeleteAdmin={setDeleteAdmin} />
  );
  expect(getByTestId('cancel-button')).toBeInTheDocument();
  expect(getByTestId('delete-button')).toBeInTheDocument();
});
