import { render, screen } from '@testing-library/react';
import { CustomPagination } from './index';

describe('Pagination tests', () => {
  it('renders correctly', () => {
    const onChange = jest.fn();
    render(
      <CustomPagination
        id="abcdefg"
        pageSize={10}
        count={100}
        page={3}
        currentPageDataLength={10}
        onChange={onChange}
      />
    );
    const countBox = screen.getByDisplayValue('30');
    expect(countBox).toBeInTheDocument();
    expect(screen.getByText('Showing')).toBeInTheDocument();
    expect(screen.getByText('of 100 entries')).toBeInTheDocument();
    const lstItems = screen.getAllByRole('listitem');
    expect(lstItems.length).toBe(11);
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
