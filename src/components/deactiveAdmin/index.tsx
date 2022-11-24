import { Button } from '@mui/material';
import styles from '../deleteAdmin/styles';
import Popup from '../elements/popup';
import DeActiveAdminProps from './types';

const DeactiveAdmin = ({
  deactiveAdmin,
  setDeactiveAdmin,
  handleDeactive
}: DeActiveAdminProps) => {
  return (
    <Popup
      id="deactivate"
      open={deactiveAdmin}
      title="Deactivate"
      textAlign="left"
      handleClose={() => setDeactiveAdmin(false)}
      description={<>Are you sure you want to Deactivate the Admin?</>}
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
          onClick={async () => handleDeactive()}
        >
          Deactivate
        </Button>
      </>
    </Popup>
  );
};

export default DeactiveAdmin;
