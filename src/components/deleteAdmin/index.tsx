import { Button } from '@mui/material';
import axios from 'axios';
import getAPIUrl from '../../config';
import { axiosInstanceWithAuth } from '../../utils/axios';
import { getApiErrorMessage } from '../../utils/commonHelpers';
import Popup from '../elements/popup';
import styles from './styles';
import DeleteAdminProps from './types';

const DeleteAdmin = ({
  selectedId,
  deleteAdmin,
  setDeleteAdmin,
  setOpenSuccessToast,
  setToastSuccessMsg,
  setOpenErrorToast,
  setToastErrorMsg
}: DeleteAdminProps) => {
  const handleDelete = async () => {
    try {
      await axiosInstanceWithAuth.delete(
        `${getAPIUrl()}/admins/delete-admin/${selectedId}`
      );
      setToastSuccessMsg('Account has been deactivated');
      setOpenSuccessToast(true);
      setDeleteAdmin(false);
    } catch (error: any) {
      if (error instanceof Error) {
        const errMsg = getApiErrorMessage(error);
        setToastErrorMsg(errMsg);
        setOpenErrorToast(true);
        setDeleteAdmin(false);
      }
    }
  };

  return (
    <Popup
      open={deleteAdmin}
      title="Delete"
      textAlign="left"
      handleClose={() => setDeleteAdmin(false)}
      description={<>Are you sure you want to delete the Admin?</>}
      style={styles.popup_width}
    >
      <>
        <Button
          data-testid="admin-cancel"
          onClick={() => setDeleteAdmin(false)}
          style={styles.cancel}
        >
          Cancel
        </Button>
        <Button
          data-testid="delete"
          variant="contained"
          color="secondary"
          style={styles.delete}
          onClick={() => {
            handleDelete();
          }}
        >
          Delete
        </Button>
      </>
    </Popup>
  );
};

export default DeleteAdmin;
