import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddNewAdmin from './index';

describe('Add New Admin component test', () => {
  const setAddNewAdmin = jest.fn();
  it('Add New Admin should be render', async () => {
    const { getByTestId } = render(
      <AddNewAdmin addNewAdmin setAddNewAdmin={setAddNewAdmin} />
    );
    expect(getByTestId('admin-text')).toBeInTheDocument();
    expect(getByTestId('admin-sub-text')).toBeInTheDocument();
    expect(getByTestId('fullname')).toBeInTheDocument();
    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('roleId')).toBeInTheDocument();
  });
});
