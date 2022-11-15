import { render, screen } from '@testing-library/react';
import MaterialTable from './index';
import adminData from '../../../mock/tableData';

describe(' tests', () => {
  it('table renders correctly without toolbar', () => {
    render(
      <MaterialTable
        id="abcdefg"
        columns={[
          {
            title: 'First Name',
            field: 'firstname',
            editable: 'always'
          },
          {
            title: 'Last Name',
            field: 'firstname',
            editable: 'always'
          },
          {
            title: 'Role',
            field: 'role',
            editable: 'never'
          }
        ]}
        data={adminData}
      />
    );
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByTestId('abcdefg-pagination-test')).toBeInTheDocument();
  });
  it('table renders correctly with toolbar', () => {
    render(
      <MaterialTable
        id="abcdefg"
        columns={[
          {
            title: 'First Name',
            field: 'firstname',
            editable: 'always'
          },
          {
            title: 'Last Name',
            field: 'firstname',
            editable: 'always'
          },
          {
            title: 'Role',
            field: 'role',
            editable: 'never'
          }
        ]}
        data={adminData}
        Toolbar={() => <div data-testid="toolbar">Test tool bar</div>}
      />
    );
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByTestId('abcdefg-pagination-test')).toBeInTheDocument();
    const toolBarContent = screen.getByTestId('toolbar');
    expect(toolBarContent).toBeInTheDocument();
    expect(toolBarContent.textContent).toBe('Test tool bar');
  });
});
