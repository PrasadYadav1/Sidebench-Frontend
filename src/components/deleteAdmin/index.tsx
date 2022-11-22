import { Button } from '@mui/material';
import getAPIUrl from '../../config';
import { deleteApiWithAuth } from '../../utils/apis';
import { getApiErrorMessage } from '../../utils/commonHelpers';
import Popup from '../elements/popup';
import styles from './styles';
import DeleteAdminProps from './types';

const DeleteAdmin = ({
  deleteAdmin,
  setDeleteAdmin,
  handleDelete
}: DeleteAdminProps) => {
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
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      </>
    </Popup>
  );
};

export default DeleteAdmin;
