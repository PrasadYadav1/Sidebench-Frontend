import { Button } from '@mui/material';
import getAPIUrl from '../../config';
import { putApiWithAuth } from '../../utils/apis';
import { getApiErrorMessage } from '../../utils/commonHelpers';
import styles from '../deleteAdmin/styles';
import Popup from '../elements/popup';
import DeActiveAdminProps from './types';

const DeactiveAdmin = ({
  selectedId,
  deactiveAdmin,
  setDeactiveAdmin,
  setOpenSuccessToast,
  setToastSuccessMsg,
  setOpenErrorToast,
  setToastErrorMsg
}: DeActiveAdminProps) => {
  return (
    <Popup
      id="deactivate"
      open={deactiveAdmin}
      title="Deactive"
      textAlign="left"
      handleClose={() => setDeactiveAdmin(false)}
      description={<>Are you sure you want to Deactive the Admin?</>}
      style={styles.popup_width}
    >
      <>
        <Button
          id="cancel"
          data-testid="cancel-button"
          onClick={() => setDeactiveAdmin(false)}
          style={styles.cancel}
        >
          Cancel
        </Button>
        <Button
          id="deactive-button"
          data-testid="deactive-button"
          variant="contained"
          color="secondary"
          style={styles.delete}
          onClick={async () => {
            try {
              await putApiWithAuth(`${getAPIUrl()}/admins/deactivate-admin`, {
                id: selectedId
              });
              setToastSuccessMsg('Account has been deactivated');
              setOpenSuccessToast(true);
              setDeactiveAdmin(false);
            } catch (error) {
              if (error instanceof Error) {
                const errMsg = getApiErrorMessage(error);
                setToastErrorMsg(errMsg);
                setOpenErrorToast(true);
                setDeactiveAdmin(false);
              }
            }
          }}
        >
          Deactivate
        </Button>
      </>
    </Popup>
  );
};

export default DeactiveAdmin;
