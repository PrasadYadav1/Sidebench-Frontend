import { Paper } from '@mui/material';
import MaterialTable, { MaterialTableProps } from '@material-table/core';
import { ComponentType } from 'react';
import { CustomPagination } from '../pagination';
import styles from './styles';

export interface TableAdditionalProps {
  Toolbar?: ComponentType<any>;
  dataTestId: string;
  pageSize?: number;
  onPageChange?: () => void;
}

const Table = ({
  columns,
  data,
  cellEditable,
  Toolbar,
  actions,
  totalCount,
  page,
  pageSize,
  onPageChange,
  dataTestId
}: MaterialTableProps<object> & TableAdditionalProps) => {
  return (
    <MaterialTable
      data-testId={dataTestId}
      actions={actions}
      localization={{
        header: {
          actions: ''
        }
      }}
      options={{
        search: false,
        showTitle: false,
        toolbar: true,
        headerStyle: styles.header,
        pageSize: pageSize ?? 10,
        actionsColumnIndex: -1
      }}
      columns={columns}
      data={data}
      cellEditable={cellEditable}
      components={
        Toolbar
          ? {
              Pagination: (props) => (
                <td>
                  <CustomPagination
                    {...props}
                    dataTestId={dataTestId}
                    count={totalCount ?? 0}
                    page={page ?? 1}
                    pageSize={pageSize}
                    onChange={onPageChange}
                    currentPageDataLength={data.length}
                  />
                </td>
              ),
              Container: (props) => <Paper {...props} sx={styles.table} />,
              Toolbar
            }
          : {
              Pagination: (props) => (
                <td>
                  <CustomPagination
                    {...props}
                    dataTestId={dataTestId}
                    count={totalCount ?? 0}
                    page={page ?? 1}
                    pageSize={pageSize}
                    onChange={onPageChange}
                    currentPageDataLength={data.length}
                  />
                </td>
              ),
              Container: (props) => <Paper {...props} sx={styles.table} />
            }
      }
    />
  );
};

export default Table;
