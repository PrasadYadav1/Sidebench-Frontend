import { useState, useEffect, ChangeEvent } from 'react';
import { AxiosResponse } from 'axios';
import { Chip } from '@mui/material';
import MaterialTable from '../../components/elements/table';
import ToolBar from './toolbar';
import Toast from '../../components/elements/toast';
import styles from './styles';
import { deleteApiWithAuth, getApi, putApiWithAuth } from '../../utils/apis';
import getAPIUrl from '../../config';
import { AdminApiResponse, AdminApiProps } from './types';
import DeleteAdmin from '../../components/deleteAdmin';
import AdminTableMenu from '../../components/adminMenuItem';
import { getApiErrorMessage } from '../../utils/commonHelpers';
import DeactiveAdmin from '../../components/deactiveAdmin';

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
  const [deleteAdmin, setDeleteAdmin] = useState<boolean>(false);
  const [deactiveAdmin, setDeactiveAdmin] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(0);
  const [openErrorToast, setErrorToast] = useState(false);
  const [toastErrorMsg, setToastErrorMsg] = useState('');
  const [fetchAgain, setFetchAgain] = useState(false);
  const [openSuccessToast, setOpenSuccessToast] = useState<boolean>(false);
  const [toastSuccessMsg, setToastSuccessMsg] = useState<string>('');

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

  const onSuccessToastClose = () => {
    setOpenSuccessToast(false);
  };

  useEffect(
    function onLoad() {
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
    },
    [fetchAgain]
  );

  const handleDelete = async () => {
    try {
      await deleteApiWithAuth(`${getAPIUrl()}/admins/${selectedId}`);
      setToastSuccessMsg('Account has been deleted');
      setOpenSuccessToast(true);
      setFetchAgain(!fetchAgain);
      setDeleteAdmin(false);
    } catch (error: any) {
      if (error instanceof Error) {
        const errMsg = getApiErrorMessage(error);
        setToastErrorMsg(errMsg);
        setErrorToast(true);
        setDeleteAdmin(false);
      }
    }
  };

  const handleDeactive = async () => {
    try {
      await putApiWithAuth(`${getAPIUrl()}/admins/deactivate-admin`, {
        id: selectedId
      });
      setToastSuccessMsg('Account has been deactivated');
      setOpenSuccessToast(true);
      setFetchAgain(!fetchAgain);
      setDeactiveAdmin(false);
    } catch (error) {
      if (error instanceof Error) {
        const errMsg = getApiErrorMessage(error);
        setToastErrorMsg(errMsg);
        setErrorToast(true);
        setDeactiveAdmin(false);
      }
    }
  };

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
        alertStyles={styles.toastText}
      />
      <Toast
        id="admin-success"
        open={openSuccessToast}
        message={toastSuccessMsg}
        severity="success"
        onClose={onSuccessToastClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        alertStyles={styles.toastText}
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
            field: 'lastname',
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
          onCellEditApproved: async (
            newValue,
            oldValue,
            rowData,
            columnDef
          ) => {
            const { firstname, lastname, id } = rowData as AdminApiProps;
            try {
              await putApiWithAuth(`${getAPIUrl()}/admins/update-admin`, {
                id,
                firstname:
                  columnDef.field === 'firstname' ? newValue : firstname,
                lastname: columnDef.field === 'lastname' ? newValue : lastname
              });
              setFetchAgain(!fetchAgain);
              setToastSuccessMsg('Updated successfully');
              setOpenSuccessToast(true);
            } catch (error) {
              if (error instanceof Error) {
                const errMsg = getApiErrorMessage(error);
                setToastErrorMsg(errMsg);
                setErrorToast(true);
              }
            }
            return new Promise((resolve) => {
              console.log(resolve);
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
            icon: () => {
              return (
                <AdminTableMenu
                  setDeleteAdmin={setDeleteAdmin}
                  setDeactiveAdmin={setDeactiveAdmin}
                  rowData={rowData as AdminApiProps}
                  setSelectedId={setSelectedId}
                />
              );
            },
            onClick: () => {
              console.log('');
            }
          })
        ]}
      />

      <DeleteAdmin
        deleteAdmin={deleteAdmin}
        setDeleteAdmin={setDeleteAdmin}
        handleDelete={handleDelete}
      />

      <DeactiveAdmin
        deactiveAdmin={deactiveAdmin}
        setDeactiveAdmin={setDeactiveAdmin}
        handleDeactive={handleDeactive}
      />
    </div>
  );
};
export default Admin;
