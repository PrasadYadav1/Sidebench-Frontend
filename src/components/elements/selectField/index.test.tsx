import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomSelect from '.';

describe('Select component test', () => {
  it('Select should be render with label', () => {
    const { getByTestId } = render(
      <CustomSelect
        id="roleId"
        name="role"
        placeholder="Choose Role"
        items={[]}
        error={false}
        errorMessage=""
      />
    );
    expect(getByTestId('roleId')).toBeInTheDocument();
  });
});
