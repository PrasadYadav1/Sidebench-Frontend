import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './index';

describe('Dashboard Component test', () => {
  it('Dashboard should be rendered with descriptions ', () => {
    const { getByText, getByTestId } = render(<Dashboard />, {
      wrapper: MemoryRouter
    });
    expect(getByTestId('lookbook-text')).toBeInTheDocument();
    expect(getByTestId('lookbook-number')).toBeInTheDocument();
    expect(getByTestId('active-text')).toBeInTheDocument();
    expect(getByTestId('active-count')).toBeInTheDocument();
    expect(getByTestId('totalorders-text')).toBeInTheDocument();
    expect(getByTestId('totalorders-count')).toBeInTheDocument();
    expect(getByTestId('total-lookbooks')).toBeInTheDocument();
    expect(getByTestId('total-lookbooks-count')).toBeInTheDocument();
    expect(getByTestId('lookbook-order')).toBeInTheDocument();
    expect(getByText('New Orders')).toBeInTheDocument();
    expect(getByText('Finished Orders')).toBeInTheDocument();
    expect(getByText('Finished Orders')).toBeInTheDocument();
    expect(getByTestId('search')).toBeInTheDocument();
    expect(getByTestId('action-test1')).toBeInTheDocument();
    expect(getByTestId('action-test2')).toBeInTheDocument();
    expect(getByTestId('action-test3')).toBeInTheDocument();
  });
});
