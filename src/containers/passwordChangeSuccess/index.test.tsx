import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PasswordChangeSuccess from './index';

describe('change password success test', () => {
  it('Change password should render', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <PasswordChangeSuccess />
      </BrowserRouter>
    );
    expect(getByTestId('header-text')).toBeInTheDocument();
    expect(getByTestId('sub-header-text')).toBeInTheDocument();
    expect(getByTestId('continue-button')).toBeInTheDocument();
  });
});
