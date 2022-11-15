import { Modal, Box, Typography } from '@mui/material';
import styles from './styles';
import PopupProps from './types';

const Popup = ({
  title,
  description,
  open,
  handleClose,
  handleClickIcon,
  textAlign,
  id,
  style,
  ...props
}: PopupProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      id={id}
      BackdropProps={{
        sx: { ...styles.modal_backdrop }
      }}
    >
      <Box sx={{ ...styles.modal, ...style }}>
        <div style={styles.df}>
          <div>
            <Typography
              id="modal-title"
              variant="h6"
              component="h2"
              sx={[styles.title, { textAlign }]}
            >
              {title}
            </Typography>
            <Typography
              id="modal-description"
              sx={[styles.description, { textAlign }]}
              component="div"
            >
              {description}
            </Typography>
            <Typography sx={styles.buttonsContainer}>
              {props.children}
            </Typography>
          </div>
          {handleClickIcon ? (
            <div>
              <img
                aria-hidden="true"
                alt=""
                src="/images/close.png"
                onClick={handleClickIcon}
                onKeyDown={handleClickIcon}
              />
            </div>
          ) : null}
        </div>
      </Box>
    </Modal>
  );
};

export default Popup;
