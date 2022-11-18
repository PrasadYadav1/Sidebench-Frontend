import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForgotPassword from './index';

describe('forgot password test', () => {
  it('forgot password should render', async () => {
    const { getByTestId } = render(<ForgotPassword />);
    expect(getByTestId('main-header-text')).toBeInTheDocument();
    expect(getByTestId('header-text')).toBeInTheDocument();
    expect(getByTestId('sub-header-text')).toBeInTheDocument();
    expect(getByTestId('send-email-button')).toBeInTheDocument();
  });
});
