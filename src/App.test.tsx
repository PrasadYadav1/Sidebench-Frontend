import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App test', () => {
  test('Should contain email and password', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('email')).toBeInTheDocument();
    expect(getByTestId('password')).toBeInTheDocument();
  });
});
