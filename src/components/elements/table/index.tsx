import { Paper } from '@mui/material';
import MaterialTable, { MaterialTableProps } from '@material-table/core';
import { ComponentType, ChangeEvent } from 'react';
import { CustomPagination } from '../pagination';
import DataNotFound from '../../noDataFound';
import styles from './styles';

export interface TableAdditionalProps {
  Toolbar?: ComponentType<any>;
  id: string;
  pageSize?: number;
  onCustomPageChange?: (event: ChangeEvent<unknown>, page: number) => void;
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
  onCustomPageChange,
  id
}: MaterialTableProps<object> & TableAdditionalProps) => {
  return (
    <MaterialTable
      data-testId={id}
      actions={actions}
      localization={{
        header: {
          actions: ''
        },
        body: {
          emptyDataSourceMessage: <DataNotFound />
        }
      }}
      options={{
        search: false,
        showTitle: false,
        toolbar: Toolbar !== undefined,
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
                    id={id}
                    count={totalCount ?? 0}
                    page={page ?? 1}
                    pageSize={pageSize}
                    onChange={onCustomPageChange}
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
                    id={id}
                    count={totalCount ?? 0}
                    page={page ?? 1}
                    pageSize={pageSize}
                    onChange={onCustomPageChange}
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
