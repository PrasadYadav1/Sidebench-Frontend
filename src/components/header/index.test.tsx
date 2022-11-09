import { render } from '@testing-library/react';
import Header from '.';
describe('Header Container test', () => {
  it('title should be present', async () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId('header-text1')).toBeInTheDocument();
    expect(getByTestId('header-text2')).toBeInTheDocument();
    expect(getByTestId('search')).toBeInTheDocument();
  });
});
