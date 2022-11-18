import { Button } from '@mui/material';
import axios from 'axios';
import getAPIUrl from '../../config';
import { axiosInstanceWithAuth } from '../../utils/axios';
import Popup from '../elements/popup';
import styles from './styles';
import DeleteAdminProps from './types';

const DeleteAdmin = ({
  selectedId,
  deleteAdmin,
  setDeleteAdmin
}: DeleteAdminProps) => {
  return (
    <Popup
      id="delete"
      open={deleteAdmin}
      title="Delete"
      textAlign="left"
      handleClose={() => setDeleteAdmin(false)}
      description={<>Are you sure you want to delete the Admin?</>}
      style={styles.popup_width}
    >
      <>
        <Button
          id="cancel"
          data-testid="cancel-button"
          onClick={() => setDeleteAdmin(false)}
          style={styles.cancel}
        >
          Cancel
        </Button>
        <Button
          id="delete-button"
          data-testid="delete-button"
          variant="contained"
          color="secondary"
          style={styles.delete}
          onClick={async () => {
            try {
              await axiosInstanceWithAuth.delete(
                `${getAPIUrl()}/admins/delete-admin/${selectedId}`
              );
              setDeleteAdmin(false);
            } catch (error: any) {
              console.log(error);
            }
          }}
        >
          Delete
        </Button>
      </>
    </Popup>
  );
};

export default DeleteAdmin;
