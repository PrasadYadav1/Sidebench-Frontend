import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '.';

describe('SignIn Container test', () => {
  it('title should be present', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(getByTestId('login_title')).toBeInTheDocument();
    expect(getByTestId('login_header')).toBeInTheDocument();
    expect(getByTestId('login_sub_header')).toBeInTheDocument();
    expect(getByTestId('sign_in_remember')).toBeInTheDocument();
    expect(getByTestId('forgot_password')).toBeInTheDocument();
    expect(getByTestId('sign_in')).toBeInTheDocument();
  });

  it('empty credentials should show error message', async () => {
    const { getByRole, getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const email = getByTestId('email') as HTMLInputElement;
    const password = getByTestId('password') as HTMLInputElement;

    fireEvent.change(email, { target: { value: '' } });
    fireEvent.change(password, { target: { value: '' } });

    const signIn = getByRole('button', {
      name: /Sign In/i
    });
    fireEvent.click(signIn);

    expect(
      await screen.findByText('Please provide a valid email address')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Password must be atleast 8 characters long')
    ).toBeInTheDocument();
  });

  it('invalid credentials should show error message', async () => {
    const { getByRole, getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const email = getByTestId('email') as HTMLInputElement;
    const password = getByTestId('password') as HTMLInputElement;

    fireEvent.change(email, { target: { value: 'gopi' } });
    fireEvent.change(password, { target: { value: 'rsdf' } });

    const signIn = getByRole('button', {
      name: /Sign In/i
    });
    fireEvent.click(signIn);

    expect(
      await screen.findByText('Please provide a valid email address')
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Password must be atleast 8 characters long')
    ).toBeInTheDocument();
  });
});
