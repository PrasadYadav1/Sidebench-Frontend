import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App test', () => {
  test('renders learn react link', () => {
    const { getByText } = render(<App />);
    expect(getByText('Welcome to Moony')).toBeInTheDocument();
  });
});
