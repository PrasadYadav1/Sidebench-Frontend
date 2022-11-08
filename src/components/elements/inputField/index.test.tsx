import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import InputField from '.';

describe('InputField component test', () => {
  it('InputField should be render with label', () => {
    const { getByText } = render(
      <InputField
        id="email"
        type="text"
        label="Email"
        name="email"
        placeholder="Type here..."
        error={false}
        size="small"
      />
    );
    expect(getByText('Email')).toBeInTheDocument();
  });
});
