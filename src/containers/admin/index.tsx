import { useState, useEffect, ChangeEvent } from 'react';
import { AxiosResponse } from 'axios';
import { Chip } from '@mui/material';
import MaterialTable from '../../components/elements/table';
import ToolBar from './toolbar';
import Toast from '../../components/elements/toast';
import styles from './styles';
import { getApi } from '../../utils/apis';
import getAPIUrl from '../../config';
import { AdminApiResponse, AdminApiProps } from './types';
import { getApiErrorMessage } from '../../utils/commonHelpers';

const getAdminsList = async (
  page: number,
  dates: [Date | null, Date | null],
  search?: string
): Promise<Error | AdminApiResponse> => {
  let url = `admins?page=${page}&pageSize=10`;
  if (dates[0] && dates[1]) {
    url = `${url}&activeFrom=${dates[0]}&activeTo=${dates[1]}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  try {
    const adminData: AxiosResponse<AdminApiResponse> = await getApi(
      `${getAPIUrl()}/${url}`
    );
    return adminData.data;
  } catch (error) {
    return error as Error;
  }
};

const Admin = () => {
  const [data, setData] = useState<Array<AdminApiProps>>([]);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState('');
  const [openErrorToast, setErrorToast] = useState(false);
  const [toastErrorMsg, setToastErrorMsg] = useState('');

  const onDateRangeChange = async (dates: [Date | null, Date | null]) => {
    setDateRange((prev) => ({ ...prev, start: dates[0], end: dates[1] }));
    if ((dates[0] && dates[1]) || (!dates[0] && !dates[1])) {
      const adminData = await getAdminsList(page, dates, search);
      if (adminData instanceof Error) {
        const errMsg = getApiErrorMessage(adminData);
        setToastErrorMsg(errMsg);
        setErrorToast(true);
      } else {
        setData(adminData.data.rows);
        setTotalCount(adminData.data.count);
      }
    }
  };

  const onSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
    const adminData = await getAdminsList(
      page,
      [dateRange.start, dateRange.end],
      val
    );
    if (adminData instanceof Error) {
      const errMsg = getApiErrorMessage(adminData);
      setToastErrorMsg(errMsg);
      setErrorToast(true);
    } else {
      setData(adminData.data.rows);
      setTotalCount(adminData.data.count);
    }
  };

  const onPageChange = async (event: ChangeEvent<unknown>, pageNo: number) => {
    setPage(pageNo);
    const adminData = await getAdminsList(
      page,
      [dateRange.start, dateRange.end],
      search
    );
    if (adminData instanceof Error) {
      const errMsg = getApiErrorMessage(adminData);
      setToastErrorMsg(errMsg);
      setErrorToast(true);
    } else {
      setData(adminData.data.rows);
      setTotalCount(adminData.data.count);
    }
  };

  const onErrorToastClose = () => {
    setErrorToast(false);
  };

  useEffect(function onLoad() {
    const getAdmins = async () => {
      const adminData = await getAdminsList(
        page,
        [dateRange.start, dateRange.end],
        search
      );
      if (adminData instanceof Error) {
        const errMsg = getApiErrorMessage(adminData);
        setToastErrorMsg(errMsg);
        setErrorToast(true);
      } else {
        setData(adminData.data.rows);
        setTotalCount(adminData.data.count);
      }
    };
    getAdmins();
  }, []);

  return (
    <div style={styles.container}>
      <ToolBar
        start={dateRange.start}
        end={dateRange.end}
        onDateRangeChange={onDateRangeChange}
        onSearchChange={onSearchChange}
        searchText={search}
        count={totalCount}
      />
      <Toast
        id="admin-error"
        open={openErrorToast}
        message={toastErrorMsg}
        severity="error"
        onClose={onErrorToastClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        alertStyles={styles.errorToast}
      />
      <MaterialTable
        id="admin-table"
        page={page}
        pageSize={10}
        onCustomPageChange={onPageChange}
        totalCount={totalCount}
        columns={[
          {
            title: 'First Name',
            field: 'firstname',
            editable: 'always',
            cellStyle: styles.columnDefault
          },
          {
            title: 'Last Name',
            field: 'firstname',
            editable: 'always',
            cellStyle: styles.columnDefault
          },
          {
            title: 'Role',
            field: 'role.name',
            editable: 'never',
            cellStyle: { ...styles.columnDefault, color: '#313131' },
            render: (rowData) => {
              const { name } = (rowData as AdminApiProps).role;
              return (
                <span>
                  {name.toLocaleLowerCase() === 'super admin' ? 'Admin' : name}
                </span>
              );
            }
          },
          {
            title: 'Email',
            field: 'email',
            editable: 'never',
            cellStyle: styles.columnDefault
          },
          {
            title: 'Last Active',
            field: 'lastActive',
            editable: 'never',
            cellStyle: styles.columnDefault,
            render: (rowData) => (
              <span>
                {new Intl.DateTimeFormat('en-US').format(
                  new Date((rowData as AdminApiProps).lastActive)
                )}
              </span>
            )
          },
          {
            title: 'Status',
            field: 'status.name',
            editable: 'never',
            cellStyle: {
              ...styles.columnDefault,
              fontSize: '12px',
              color: '#313131',
              lineHeight: '15px'
            },
            render: (rowData) => (
              <Chip
                label={(rowData as AdminApiProps).status.name.toUpperCase()}
              />
            )
          }
        ]}
        data={data}
        cellEditable={{
          isCellEditable: () => true,
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve) => {
              console.log(`newValue: ${newValue}`);
              setTimeout(resolve, 4000);
            });
          }
        }}
        // Toolbar={() => (
        //   <ToolBar
        //     start={dateRange.start}
        //     end={dateRange.end}
        //     onDateRangeChange={onDateRangeChange}
        //     onSearchChange={onSearchChange}
        //     searchText={search}
        //   />
        // )}
        actions={[
          (rowData) => ({
            icon: () => (
              <div style={styles.actionMenuBtn}>
                <img src="more-horizontal 1.svg" alt="" />
              </div>
            ),
            onClick: () => console.log('ghhgh')
          })
        ]}
      />
    </div>
  );
};
export default Admin;
