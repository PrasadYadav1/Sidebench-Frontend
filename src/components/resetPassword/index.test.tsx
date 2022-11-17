import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResetPassword from './index';

describe('reset password test', () => {
  it('reset password should render', async () => {
    const { getByTestId } = render(<ResetPassword />);
    expect(getByTestId('main-header-text')).toBeInTheDocument();
    expect(getByTestId('header-text')).toBeInTheDocument();
    expect(getByTestId('sub-header-text')).toBeInTheDocument();
    expect(getByTestId('confirm-button')).toBeInTheDocument();
  });
});
