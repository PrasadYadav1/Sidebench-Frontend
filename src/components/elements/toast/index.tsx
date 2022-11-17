import {
  Snackbar,
  Alert,
  SnackbarProps,
  AlertProps,
  SxProps,
  Theme
} from '@mui/material';

export interface ToastProps {
  id: string;
  message: string;
  alertStyles?: SxProps<Theme>;
}

const Toast = ({
  id,
  message,
  icon,
  open,
  autoHideDuration,
  alertStyles,
  anchorOrigin,
  severity,
  variant,
  onClose
}: ToastProps & SnackbarProps & AlertProps) => {
  return (
    <>
      <Snackbar
        id={`${id}-snackbar`}
        data-testid={`${id}-snackbar-test`}
        open={open}
        autoHideDuration={autoHideDuration ?? 3000}
        anchorOrigin={anchorOrigin ?? { vertical: 'top', horizontal: 'right' }}
        onClose={onClose}
        style={{ height: 'auto' }}
      >
        <Alert
          id={`${id}-alert`}
          data-testid={`${id}-alert-test`}
          variant={variant ?? 'filled'}
          severity={severity}
          sx={alertStyles}
          icon={icon}
          onClose={onClose}
        >
          {' '}
          {message}{' '}
        </Alert>
      </Snackbar>
    </>
  );
};
export default Toast;
